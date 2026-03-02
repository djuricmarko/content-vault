import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://contentvault.app'),
  title: {
    default: 'Content Vault',
    template: '%s | Content Vault',
  },
  description: 'Secure, organized storage for your images and rich text. Smart categorization, encrypted vaults, and a free tier — no credit card required.',
  applicationName: 'Content Vault',
  authors: [{ name: 'Content Vault' }],
  keywords: ['content storage', 'image storage', 'rich text', 'content management', 'encrypted vault', 'note taking', 'content organizer'],
  creator: 'Content Vault',
  publisher: 'Content Vault',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://contentvault.app',
    siteName: 'Content Vault',
    title: 'Content Vault',
    description: 'Secure, organized storage for your images and rich text. Smart categorization, encrypted vaults, and a free tier — no credit card required.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Content Vault — Secure & Organized Content Storage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Content Vault',
    description: 'Secure, organized storage for your images and rich text. Smart categorization, encrypted vaults, and a free tier — no credit card required.',
    images: ['/opengraph-image.png'],
    creator: '@contentvault',
    site: '@contentvault',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Content Vault',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  category: 'productivity',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#2a2d3e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <ThemeProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
