import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Content Vault',
    short_name: 'Content Vault',
    description: 'A platform to create, store, and share various types of content.',
    start_url: '/',
    display: 'standalone',
    background_color: 'oklch(100% 0 0)',
    theme_color: 'oklch(100% 0 0)',
    orientation: "portrait-primary",
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
