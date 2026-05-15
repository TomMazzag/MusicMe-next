export default function CreateAccountError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-12">
      <h1 className="text-[4rem]">
        <span className="bg-linear-to-r from-[#4cd7f6] to-[#4be277] bg-clip-text text-transparent">MusicMe</span>
      </h1>
      <p className="text-red-500">Failed to load Spotify profile.</p>
      <p>
        Please make sure you're logged in with Spotify and{' '}
        <a href="/" className="underline text-accent">
          try again.
        </a>
      </p>
    </div>
  );
}
