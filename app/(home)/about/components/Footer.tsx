export default function Footer() {
    return (
      <footer className="md:mt-10">
        <div className="bg-base-300 flex justify-between px-10 py-8">
          Created by Thomas Mazzag
          <div aria-label="links" className="flex gap-2">
            <a href="https://www.linkedin.com/in/thomas-mazzag/" target="_blank">
              <i className="fa-brands fa-linkedin fa-2xl hover:text-accent transition-colors duration-300" aria-hidden="true"></i>
            </a>
            <a href="https://github.com/TomMazzag" target="_blank">
              <i className="fa-brands fa-github fa-2xl hover:text-accent transition-colors duration-300" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </footer>
    );
};
