import { redirect } from "next/navigation";
import { Check, Vault } from 'lucide-react';
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/login-form";
import styles from './page.module.css';

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (!error && data?.claims) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.formContainer}>
          <div className={styles.logoIcon}>
            <Vault size={48} strokeWidth={1.5} color="#fff" />
          </div>
          <h1 className={styles.title}>Create your Content Vault account</h1>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className={styles.input}
            />
          </div>
          <button className={styles.primaryButton}>
            Continue
          </button>
          <div className={styles.divider}>OR</div>
          <LoginForm />
          <p className={styles.footerText}>
            Already have an account? <a href="#" className={styles.link}>Sign in</a>
          </p>
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
