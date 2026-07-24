export default function Footer() {
  return (
    <footer className="md:mt-10">
      <div className="bg-base-300 flex justify-between px-10 py-8">
        Created by Thomas Mazzag
        <div aria-label="links" className="flex gap-2">
          <a href="https://www.linkedin.com/in/thomas-mazzag/" target="_blank" rel="noopener noreferrer">
            <i
              className="fa-brands fa-linkedin fa-2xl hover:text-accent transition-colors duration-300"
              aria-hidden="true"
            ></i>
          </a>
          <a href="https://github.com/TomMazzag" target="_blank" rel="noopener noreferrer">
            <i
              className="fa-brands fa-github fa-2xl hover:text-accent transition-colors duration-300"
              aria-hidden="true"
            ></i>
          </a>
        </div>
      </div>
      <div className="bg-base-300 border-t border-base-content/10 px-10 py-4 text-sm opacity-70 space-y-1">
        <p>
          Song data is collected using the{' '}
          <a
            href="https://musicbrainz.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            MusicBrainz API
          </a>
          .
        </p>
        <p>
          Images may be provided by{' '}
          <a
            href="https://www.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Spotify
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
