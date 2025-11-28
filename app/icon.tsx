import { ImageResponse } from 'next/og';

// Génération du favicon avec "R" blanc sur gradient emerald
export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
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
