import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/actions/updateProfile";
import { db } from "@/lib/drizzle/drizzle";
import { profiles } from "@/lib/drizzle/schema";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const profile = await getProfile(user.id);

        if (!profile) {
          const provider = user.app_metadata.provider;
          const metadata = user.user_metadata;

          if (provider === "google") {
            const fullName = metadata.full_name as string | undefined;
            const firstName = metadata.first_name as string | undefined;
            const lastName = metadata.last_name as string | undefined;

            const name = firstName || (fullName?.split(" ")[0]) || "";
            const surname = lastName || (fullName?.split(" ").slice(1).join(" ")) || "";

            if (name && surname) {
              await db.insert(profiles).values({
                userId: user.id,
                name,
                surname,
              });
              next = "/dashboard";
            } else {
              next = "/auth/complete-profile";
            }
          } else {
            next = "/auth/complete-profile";
          }
        }

        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
