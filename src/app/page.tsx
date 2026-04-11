import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Check, Vault } from 'lucide-react';
import { createClient } from "@/lib/supabase/server";
import { GoogleLogin, MagicLinkForm } from "@/components/login-form";
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Content Vault — Secure & Organized Content Storage",
  description: "Create your Content Vault account. Unified storage for images and rich text with smart categorization and enhanced privacy.",
};

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!error && data?.user) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <div className={styles.logoIcon}>
            <Vault size={48} strokeWidth={1.5} />
          </div>
          <h1 className={styles.title}>Create your Content Vault account</h1>
          <MagicLinkForm />
          <div className={styles.divider}>OR</div>
          <GoogleLogin />
        </div>
        <p className={styles.legalText}>
          By creating an account, you agree to the Terms of Service and Privacy Policy
        </p>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.glow} />
        <div className={styles.rightContent}>
          <h2 className={styles.headingLarge}>
            Your content, <br />
            <span className={styles.gradientText}>Secure & Organized.</span>
          </h2>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <Check className={styles.checkIcon} size={20} />
              <span>Unified storage for high-res images and rich text documents</span>
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.checkIcon} size={20} />
              <span>Smart categorization with custom tags and collections</span>
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.checkIcon} size={20} />
              <span>Enhanced privacy with encrypted vaults and audit logs</span>
            </li>
            <li className={styles.featureItem}>
              <Check className={styles.checkIcon} size={20} />
              <span>Free tier available, no credit card required</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
