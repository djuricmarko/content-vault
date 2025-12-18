'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Upload } from 'lucide-react';
import styles from './page.module.css';

export default function OnboardingPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    console.log({ firstName, lastName, avatar });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <div className={styles.icon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L8 10L16 18L8 26H24L16 18L24 10L16 2Z" fill="white"/>
            </svg>
          </div>
        </div>

        <h1 className={styles.title}>Tell us a bit more about you</h1>

        <div className={styles.avatarSection}>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarUpload}
            className={styles.fileInput}
          />
          <label htmlFor="avatar" className={styles.avatarLabel}>
            {avatar ? (
              <Image src={avatar} alt="Avatar" className={styles.avatarImage} width={80} height={80} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <Upload size={24} />
              </div>
            )}
          </label>
          <span className={styles.avatarText}>Upload photo</span>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="firstName" className={styles.label}>
              First name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="lastName" className={styles.label}>
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className={styles.input}
            />
          </div>
        </div>

        <button onClick={handleContinue} className={styles.button}>
          Continue
          <ArrowRight size={18} />
        </button>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerText}>WorkOS</span>
      </footer>
    </div>
  );
}
