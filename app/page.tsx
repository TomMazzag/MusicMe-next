import { SignInButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex md:grid md:grid-cols-2 h-full overflow-hidden justify-center">
        <div className="flex flex-col justify-evenly items-center">
          <div className="text-center mt-10">
            <h1 className="bg-linear-to-r from-[#4cd7f6] to-[#4be277] bg-clip-text text-transparent text-6xl font-bold mb-4">
              MusicMe
            </h1>
            <p className="text-xl italic">Social media for music</p>
          </div>

          <div className="flex flex-col gap-6 text-center">
            <SignInButton forceRedirectUrl="/post-auth">
              <button className="btn btn-outline btn-primary">
                Click here to begin
              </button>
            </SignInButton>

            <div className="w-full mt-8">
              <p className="pb-2 opacity-75">
                Dont have an account? <br></br> Sign up for the beta below!
              </p>
              <a href="/register" className="text-accent">
                <button className="btn btn-outline btn-accent w-full">Sign up for the beta</button>
              </a>
            </div>
          </div>
          <div className="flex gap-8">
            <HomepageLink link="/about" title="About" />
            <HomepageLink link="/discover" title="Discover" />
            <HomepageLink link="/search" title="Search" />
          </div>
        </div>

        <div className="overflow-hidden">
          <Image
            src="/platform.webp"
            alt="Platform image"
            width={1920}
            height={1080}
            className="h-full border-l-4 border-accent object-cover object-left hidden md:block"
          />
        </div>
      </div>
    </div>
  );
}

function HomepageLink({ link, title }: { link: string; title: string }) {
  return (
    <a href={link} className="text-accent hover:text-[#4be277] transition-colors duration-700">
      {title}
    </a>
  );
}
