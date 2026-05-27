import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import { UserProvider } from '@MusicMe/context/UserContext';
import { Providers } from '@MusicMe/proviers/QueryClientProvider';
import { BASE_URL } from '@MusicMe/lib/util';

export const metadata: Metadata = {
  title: 'MusicMe',
  description:
    'MusicMe: A social media platform for sharing music taste, discovering new tunes, and connecting with fellow music lovers. Join the beta today!',
  verification: {
    google: '5jbi-eFUsvsUfAQUhKbYR7G4DO1K2AQH7sWiCc1YFWY',
  },
  metadataBase: new URL(BASE_URL),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'MusicMe',
                url: 'https://music-me-next.vercel.app/',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'MusicMe',
                url: 'https://music-me-next.vercel.app/',
              },
            ]),
          }}
        />
      </head>
      <body>
        <Providers>
          <UserProvider>{children}</UserProvider>
        </Providers>
      </body>
    </html>
  );
}
