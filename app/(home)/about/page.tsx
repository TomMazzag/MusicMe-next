import { Metadata } from 'next';
import Image from 'next/image';
import WhatIsMusicMe from './components/WhatIsMusicMe';
import WhyUsePlatform from './components/WhyUsePlatform';
import Footer from './components/Footer';
import FutureGoals from './components/FutureGoals';

export const metadata: Metadata = {
  description:
    'Find out more about the MusicMe platform. Learn about how you can share music, our long term goals and why you should use our platform.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="navbar border-b-2 border-accent">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl md:text-4xl">
            MusicMe
          </a>
        </div>
        <ul className="flex-none gap-2 inline-flex list-none">
          <li>
            <a href="/" className="btn btn-sm md:btn-md btn-ghost md:text-xl">
              Login
            </a>
          </li>
          <li>
            <a href="/register" className="btn btn-sm md:btn-md btn-ghost md:text-xl">
              Sign up for the beta
            </a>
          </li>
        </ul>
      </nav>

      <WhatIsMusicMe />
      <WhyUsePlatform />
      <FutureGoals />

      <div className='flex justify-center my-5'>
        <a href="/discover">
          <button className="border-2 border-accent rounded-md px-4 py-2 hover:bg-accent hover:text-base-100 transition-colors duration-300 hover:cursor-pointer">
            Take a look at our discover page
          </button>
        </a>
      </div>

      <Footer />
    </div>
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
