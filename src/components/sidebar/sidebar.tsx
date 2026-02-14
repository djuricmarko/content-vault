import { createClient } from "@/lib/supabase/server";
import { getUserCategories } from "@/actions/getUserCategories";
import { getProfile } from "@/actions/updateProfile";
import { SidebarWrapper } from "./sidebar-wrapper";
import { SidebarHeading } from "./sidebar-heading";
import { SidebarItems } from "./sidebar-items";
import { SidebarFooter } from "./sidebar-footer";

export async function Sidebar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { data: sessionData } = await supabase.auth.getSession();

  const categoryList = await getUserCategories();

  const profile = data?.user ? await getProfile(data.user.id) : null;

  return (
    <SidebarWrapper>
      <SidebarHeading />
      <SidebarItems items={categoryList} />
      <SidebarFooter
        userData={data?.user}
        avatar={sessionData.session?.user.user_metadata.avatar_url}
        profile={profile}
      />
    </SidebarWrapper>
  );
}
