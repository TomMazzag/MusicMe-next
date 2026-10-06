import { Metadata } from 'next';
import Image from 'next/image';
import WhatIsZenekio from './components/WhatIsZenekio';
import WhyUsePlatform from './components/WhyUsePlatform';
import Footer from './components/Footer';
import FutureGoals from './components/FutureGoals';
import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import Naming from './components/Naming';
import { Button } from '@MusicMe/components/Buttons';

export const metadata: Metadata = {
  description:
    'Find out more about the Zenekio platform. Learn about how you can share music, our long term goals and why you should use our platform.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WegPage',
            name: 'Zenekio About',
            url: 'https://zenekio.co.uk/about',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Zenekio',
              url: 'https://zenekio.co.uk/',
            },
            about: {
              '@type': 'Organization',
              name: 'Zenekio',
              url: 'https://zenekio.co.uk/',
            },
          }),
        }}
      />
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <WhatIsZenekio />
        <WhyUsePlatform />
        <FutureGoals />
        <Naming />

        <div className="flex justify-center my-5">
          <a href="/discover">
            <Button>Take a look at our discover page</Button>
          </a>
        </div>

        <Footer />
      </div>
    </>
  );
}

interface ImageTileProps {
  src: string;
  width: number;
  height: number;
}

export const ImageTile = ({ src, width, height }: ImageTileProps) => {
  return (
    <div className="flex items-center md:mx-14 my-6 md:px-10  py-2 md:py-6 rounded-xl border border-accent bg-base-100">
      <Image src={src} alt="" width={width} height={height} />
    </div>
  );
};
