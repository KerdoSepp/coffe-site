import Location from './Location.jsx';
import SearchBar from './SearchBar.jsx';

export default function SearchBlock() {
  return (
    <section className="flex flex-col gap-10 px-4 py-4 md:px-12 md:py-8">
      <Location />
      <div className="w-full self-center">
        <SearchBar />
      </div>
    </section>
  );
}
