import { HighlightText } from '@MusicMe/components/Text/Title';
import { ImageTile } from '../page';

export default function WhyUsePlatform() {
  return (
    <section id="why-use-platform" className="flex flex-col gap-8 bg-base-200 py-8 px-6 lg:px-0">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-[2rem] lg:text-[3rem]">Why use our platform?</h1>
        <p className="lg:px-[30%] opacity-80">
          Our platform is designed for the music community, built for music lovers and focused on your personal music
          experience.
        </p>
      </div>

      <div className="md:grid md:grid-cols-2">
        <ImageTile src={'/profileAnalytics.webp'} width={2270} height={1530} />

        <div className="flex flex-col justify-center lg:w-4/5">
          <p>Our platform is a way to give your opinion on songs and give them a rating</p>
          <br />
          <p>
            In the start we will aim to create as many new features as users feel necessary. We want to create a
            platform for the music community
          </p>
          <br />
          <p>Some of the things were actively working on are:</p>
          <ul className="ml-3 list-disc">
            <li>
              <HighlightText bold={true}>Dedicated pages</HighlightText> for genres where you can find out about events
              happening neaby, new trending music for a specific genre and some of the top reccomended songs recently
              for a genre
            </li>
            <li>
              Showing you <HighlightText bold={true}>live analytics</HighlightText> of what the top searched songs on
              the platform are each day as well as the top artists and top reviews and providing you as much insight
              into these songs as possible
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
