import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/actions/updateProfile";
import { CompleteProfileForm } from "./complete-profile-form";
import styles from "./complete-profile.module.css";

export const metadata = {
  title: "Complete Your Profile — Content Vault",
  description: "Enter your details to get started with Content Vault.",
};

export default async function CompleteProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const profile = await getProfile(user.id);

  if (profile) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Complete your profile</h1>
          <p className={styles.subtitle}>
            Please enter your details to get started with your content vault.
          </p>
          <CompleteProfileForm />
        </div>
      </div>
    </div>
  );
}
