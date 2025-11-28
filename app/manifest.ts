import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ratee.me - Automatise ton feedback client',
    short_name: 'ratee.me',
    description: 'Collecte automatiquement les feedbacks NPS de tes clients, obtiens des témoignages authentiques et affiche ton badge de satisfaction client.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#667eea',
    icons: [
      {
        src: '/icon?size=192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon?size=512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
