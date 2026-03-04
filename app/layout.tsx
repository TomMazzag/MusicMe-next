import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'MusicMe',
  description:
    'MusicMe: A social media platform for sharing music taste, discovering new tunes, and connecting with fellow music lovers. Join the beta today!',
  verification: {
    google: '5jbi-eFUsvsUfAQUhKbYR7G4DO1K2AQH7sWiCc1YFWY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://kit.fontawesome.com/b3cfe25c7d.js" crossOrigin="anonymous" strategy="afterInteractive" />
      </head>
      <body>{children}</body>
    </html>
  );
}
