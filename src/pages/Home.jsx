import SearchBlock from '../components/SearchBlock.jsx';
import CoffeeContent from '../components/CoffeeContent.jsx';

function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="shrink-0">
        <SearchBlock />
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <CoffeeContent />
        <h1>Home</h1>
      </main>
    </div>
  );
}

export default Home;
