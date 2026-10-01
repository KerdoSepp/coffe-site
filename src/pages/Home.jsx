import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import filtersIcon from '../assets/FiltersIcon.svg';
import locationIcon from '../assets/LocationIcon.svg';
import searchIcon from '../assets/SearchIcon.svg';
import AddressEditor from '../components/AddressEditor.jsx';
import CoffeeList from '../components/CoffeeList.jsx';
import ProductSection from '../components/ProductSection.jsx';
import { coffeeProducts } from '../data/Products.js';
import { currentUser } from '../data/User.js';
import useUser from '../hooks/useUser.js';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const { deliveryAddress, setDeliveryAddress } = useUser();
  const query = searchParams.get('q') ?? '';
  const showAll = searchParams.get('view') === 'all';
  const isListView = showAll || query.trim().length > 0;

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return coffeeProducts;
    return coffeeProducts.filter((product) =>
      `${product.name} ${product.description}`.toLowerCase().includes(value)
    );
  }, [query]);

  const updateQuery = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('q', value);
    else next.delete('q');
    setSearchParams(next, { replace: true });
  };

  const showAllCoffees = () => {
    setSearchParams({ view: 'all' });
  };

  const saveAddress = (address) => {
    setDeliveryAddress(address);
    setIsEditingAddress(false);
  };

  return (
    <div className="mx-auto min-h-dvh w-full max-w-7xl px-2 pt-[max(24px,env(safe-area-inset-top))] pb-28 sm:px-5 md:px-8">
      <header className="px-3 pt-4 pb-3 md:px-0">
        <div className="flex items-start justify-between">
          <button
            type="button"
            onClick={() => setIsEditingAddress(true)}
            aria-label="Edit delivery address"
            className="rounded-lg px-1 py-0.5 text-left transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
          >
            <div className="flex items-center gap-1">
              <img src={locationIcon} alt="" className="h-[17px] w-3.5" />
              <p className="text-sm font-semibold text-white">
                {deliveryAddress.street}
              </p>
            </div>
            <p className="mt-1.5 text-xs tracking-[0.01em] text-secondary">
              {deliveryAddress.city} {deliveryAddress.postalCode}
            </p>
          </button>
          <div className="grid size-10 place-items-center rounded-full bg-surface text-sm font-semibold text-accent">
            {currentUser.initials}
          </div>
        </div>

        <label className="mt-5 flex h-[42px] items-center gap-2 rounded-[6px] bg-elevated px-4 focus-within:ring-1 focus-within:ring-accent">
          <img src={searchIcon} alt="" className="size-5" />
          <input
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            type="search"
            placeholder="Search coffee"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-secondary"
          />
          <button
            type="button"
            onClick={() => isListView && setSearchParams({})}
            aria-label={
              isListView ? 'Show coffee categories' : 'Coffee filters'
            }
            className="grid size-7 place-items-center"
          >
            <img src={filtersIcon} alt="" className="size-5" />
          </button>
        </label>
      </header>

      <main className="mt-1 space-y-7 md:space-y-10">
        {isListView ? (
          <CoffeeList products={filtered} query={query} />
        ) : (
          <>
            <ProductSection
              title="Explore offers"
              products={coffeeProducts.slice(0, 4)}
              onShowAll={showAllCoffees}
            />
            <ProductSection
              title="What’s popular"
              products={[...coffeeProducts].reverse().slice(0, 4)}
              onShowAll={showAllCoffees}
            />
            <ProductSection
              title="Made for you"
              products={coffeeProducts.slice(0, 4)}
              onShowAll={showAllCoffees}
            />
          </>
        )}
      </main>

      {isEditingAddress && (
        <AddressEditor
          address={deliveryAddress}
          onClose={() => setIsEditingAddress(false)}
          onSave={saveAddress}
        />
      )}
    </div>
  );
}

export default Home;
