import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ImageTile } from '../page';

export default function WhatIsMusicMe() {
  return (
    <section id="what-is-music-me">
      <div className="flex my-8 px-4 gap-4 lg:gap-0 lg:px-0 lg:my-16 flex-col lg:flex-row">
        <div className="lg:w-1/2 lg:px-12 flex flex-col justify-center gap-4">
          <h1 className="text-[2rem] lg:text-[4rem] leading-none">
            What is{' '}
            <span className="bg-linear-to-r from-[#4cd7f6] to-[#4be277] bg-clip-text text-transparent">MusicMe?</span>
          </h1>
          <p className="lg:w-5/6 lg:text-xl">
            MusicMe is an online social media platform aimed at allow users to share their music taste with others,
            discover new music, gain and share insights into their music taste.
          </p>
          <div className="pl-2">
            <div className="flex">
              <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 mr-2 w-4" />
              <p>Share your music taste</p>
            </div>
            <div className="flex">
              <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 mr-2 w-4" />
              <p>Discover new music</p>
            </div>
            <div className="flex">
              <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 mr-2 w-4" />
              <p>Find hidden events</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <ImageTile src={'/exampleProfilePage.webp'} width={2880} height={1550} />
        </div>
      </div>
    </section>
  );
}
