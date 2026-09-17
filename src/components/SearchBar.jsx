import searchIcon from '../assets/SearchIcon.svg';
import filtersIcon from '../assets/FiltersIcon.svg';

export default function SearchBar() {
  return (
    <section className="flex w-full items-center text-primary">
      <div className="flex w-full items-center gap-3 rounded-input bg-elevated p-3 pl-5 pr-5">
        <img
          src={searchIcon}
          alt=""
          aria-hidden="true"
          className="h-[34px] w-7 shrink-0"
        />
        <input
          className="min-w-0 flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search coffee"
        />
        <img
          src={filtersIcon}
          alt=""
          aria-hidden="true"
          className="h-[34px] w-7 shrink-0"
        />
      </div>
    </section>
  );
}
