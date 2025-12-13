import { redirect } from "next/navigation";
import { LoginForm } from "./(auth)/_components/login-form";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (!error && data?.claims) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.container}>
      <h1>Content Vault</h1>
      <LoginForm />
    </div>
  );
}
