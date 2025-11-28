import { ImageResponse } from 'next/og';

// Génération de l'image Open Graph dynamique
export const runtime = 'edge';

export const alt = 'ratee.me - Automatise ton feedback client et NPS';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 120,
              marginRight: 20,
            }}
          >
            ⭐
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-0.05em',
            }}
          >
            ratee.me
          </div>
        </div>
        <div
          style={{
            fontSize: 40,
            color: 'white',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
            opacity: 0.95,
            fontWeight: 500,
          }}
        >
          Automatise ton feedback client et NPS
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'white',
            textAlign: 'center',
            maxWidth: 800,
            marginTop: 20,
            opacity: 0.85,
          }}
        >
          Feedbacks, témoignages, badge NPS - Tout en pilote automatique
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
