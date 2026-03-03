import { LoginButton } from '@MusicMe/components/Login/LoginButton';
import Image from 'next/image';

export default function Home() {
  const SPOTIFY_CLIENT_ID = '5c9346c993f3470284a7ae8623242385';
  return (
    <div className="h-screen">
      <div className="flex md:grid md:grid-cols-2 h-full overflow-hidden justify-center">
        <div className="flex flex-col justify-evenly items-center">
          <div className="text-center mt-10">
            <h1 className="text-6xl font-bold mb-4">MusicMe</h1>
            <p className="text-xl italic">Social media for music</p>
          </div>

          <div className="flex flex-col gap-6 text-center">
            <LoginButton />

            <div className="w-full mt-8">
              <p className="pb-2 opacity-75">
                Dont have an account? <br></br> Sign up for the beta below!
              </p>
              <button className="btn btn-outline btn-accent w-full">Sign up for the beta</button>
            </div>
          </div>
          <a href="/about" className="text-accent">
            About
          </a>
        </div>

        <Image
          src="/platform.webp"
          alt="Platform image"
          width={1920}
          height={1080}
          className="h-full border-l-4 border-accent object-cover object-right hidden md:block"
        />
      </div>
    </div>
  );
}
