import { Category, UpdateSearchParameter } from './SearchClientSide';

interface SearchBarParams {
  category: Category;
  query: string;
  updateSearchParameter: UpdateSearchParameter;
  setInputValue: (value: string) => void;
}

export default function SearchBar({ category, query, updateSearchParameter, setInputValue }: SearchBarParams) {
  return (
    <div className="h-12.5 flex items-center justify-center border rounded-[30px] w-[90%] md:w-[60%]">
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="border-none bg-transparent my-0 rounded-bl-full rounded-tl-full h-10 min-h-1 pl-6 pr-2 flex items-center"
        >
          <span className="pr-1">{category}</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-1 menu p-2 shadow-xl bg-base-100 rounded-box w-30 border border-base-200"
        >
          <li
            onClick={() => {
              updateSearchParameter('category', 'Track');
            }}
          >
            <a>Song</a>
          </li>
          <li>
            <a className="cursor-not-allowed">Artist</a>
          </li>
          <li>
            <a className="cursor-not-allowed">Album</a>
          </li>
          <li
            onClick={() => {
              updateSearchParameter('category', 'Username');
            }}
          >
            <a>People</a>
          </li>
        </ul>
      </div>

      <input
        type="text"
        name="category"
        placeholder={`Search by ${category}`}
        value={query}
        className="grow px-5 py-1"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />

      <button className="px-6">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}
