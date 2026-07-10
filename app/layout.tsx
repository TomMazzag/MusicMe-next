import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import { UserProvider } from '@MusicMe/context/UserContext';
import { Providers } from '@MusicMe/proviers/QueryClientProvider';
import { BASE_URL } from '@MusicMe/lib/util';

const TITLE = 'Zenekio';
const DESCRIPTION =
  'Zenekio: A social media platform for sharing music taste, discovering new tunes, and connecting with fellow music lovers. Join the beta today!';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  verification: {
    google: '5jbi-eFUsvsUfAQUhKbYR7G4DO1K2AQH7sWiCc1YFWY',
  },
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Zenekio',
                url: 'https://zenekio.co.uk/',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Zenekio',
                url: 'https://zenekio.co.uk/',
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
