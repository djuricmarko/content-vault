import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Content Vault — Secure & Organized Content Storage';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f1117',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(88, 101, 242, 0.35) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-200px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(88, 101, 242, 0.2) 0%, transparent 70%)',
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #4f6df5 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            boxShadow: '0 0 60px rgba(79, 109, 245, 0.5)',
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M12 4v16" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
          </svg>
        </div>

        {/* App name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '-2px',
            marginBottom: '16px',
            lineHeight: '1',
          }}
        >
          Content Vault
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.6)',
            fontWeight: '400',
            letterSpacing: '-0.5px',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          Secure &amp; Organized Content Storage
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '48px',
          }}
        >
          {['Images & Rich Text', 'Smart Categories', 'Encrypted Vaults', 'Free Tier'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '100px',
                padding: '8px 20px',
                fontSize: '18px',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: '500',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
