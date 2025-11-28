import { ImageResponse } from 'next/og';

// Génération de l'icône Apple avec "R" blanc sur gradient emerald
export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          fontWeight: 700,
          background: 'linear-gradient(to bottom right, #a7f3d0, #047857)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        R
      </div>
    ),
    {
      ...size,
    }
  );
}
