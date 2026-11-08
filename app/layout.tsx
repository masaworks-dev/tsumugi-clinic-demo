import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: { default: 'つむぎ内科・こどもクリニック', template: '%s｜つむぎ内科・こどもクリニック' },
  description: 'ポートフォリオ用に制作した、架空の内科・小児科クリニックのデモサイトです。',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const FONTS =
  'https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@400;500&family=Zen+Maru+Gothic:wght@400;500;700&display=swap';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
