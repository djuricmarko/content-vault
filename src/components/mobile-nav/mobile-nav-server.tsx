import { createClient } from "@/lib/supabase/server";
import { getUserCategories } from "@/actions/getUserCategories";
import { MobileNav } from "./mobile-nav";

export async function MobileNavServer() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const { data: sessionData } = await supabase.auth.getSession();

    const categoryList = await getUserCategories();

    return (
      <MobileNav
        items={categoryList}
        userData={data?.user ?? null}
        avatar={sessionData?.session?.user.user_metadata.avatar_url ?? null}
      />
    );
  } catch (error) {
    console.error("MobileNavServer: Failed to load navigation data", error);
    return <MobileNav items={[]} userData={null} avatar={null} />;
  }
}
