import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import filtersIcon from '../assets/FiltersIcon.svg';
import locationIcon from '../assets/LocationIcon.svg';
import searchIcon from '../assets/SearchIcon.svg';
import AddressEditor from '../components/AddressEditor.jsx';
import CoffeeList from '../components/CoffeeList.jsx';
import ProductSection from '../components/ProductSection.jsx';
import { coffeeProducts } from '../data/Products.js';
import useUser from '../hooks/useUser.js';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const { deliveryAddress, setDeliveryAddress } = useUser();
  const query = searchParams.get('q') ?? '';
  const showAll = searchParams.get('view') === 'all';
  const maxPrice = ['4', '4.5', '5'].includes(searchParams.get('maxPrice'))
    ? searchParams.get('maxPrice')
    : '';
  const minRating = ['4.7', '4.8', '4.9'].includes(
    searchParams.get('minRating')
  )
    ? searchParams.get('minRating')
    : '';
  const hasFilters = Boolean(maxPrice || minRating);
  const isListView = showAll || query.trim().length > 0 || hasFilters;

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return coffeeProducts.filter(
      (product) =>
        `${product.name} ${product.description}`
          .toLowerCase()
          .includes(value) &&
        (!maxPrice || product.price <= Number(maxPrice)) &&
        (!minRating || product.rating >= Number(minRating))
    );
  }, [query, maxPrice, minRating]);

  const updateFilter = (name, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(name, value);
    else next.delete(name);
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('maxPrice');
    next.delete('minRating');
    setSearchParams(next, { replace: true });
  };

  const updateQuery = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('q', value);
    else next.delete('q');
    setSearchParams(next, { replace: true });
  };

  const showAllCoffees = () => {
    const next = new URLSearchParams(searchParams);
    next.set('view', 'all');
    setSearchParams(next);
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
        </div>

        <div className="mt-5 flex h-[42px] items-center gap-2 rounded-[6px] bg-elevated px-4 focus-within:ring-1 focus-within:ring-accent">
          <img src={searchIcon} alt="" className="size-5" />
          <input
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            type="search"
            aria-label="Search coffee"
            placeholder="Search coffee"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-secondary"
          />
          <button
            type="button"
            onClick={() => setAreFiltersOpen((open) => !open)}
            aria-label="Coffee filters"
            aria-expanded={areFiltersOpen}
            aria-controls="coffee-filters"
            className={`grid size-7 place-items-center rounded focus-visible:outline-2 focus-visible:outline-accent ${hasFilters ? 'bg-accent' : ''}`}
          >
            <img src={filtersIcon} alt="" className="size-5" />
          </button>
        </div>
        {areFiltersOpen && (
          <div
            id="coffee-filters"
            className="mt-3 flex flex-wrap items-end gap-4 rounded-card bg-surface p-4"
          >
            <label className="flex flex-1 flex-col gap-2 text-sm">
              Maximum price
              <select
                value={maxPrice}
                onChange={(event) =>
                  updateFilter('maxPrice', event.target.value)
                }
                className="rounded bg-elevated p-2 text-primary focus-visible:outline-accent"
              >
                <option value="">Any price</option>
                <option value="4">€4.00</option>
                <option value="4.5">€4.50</option>
                <option value="5">€5.00</option>
              </select>
            </label>
            <label className="flex flex-1 flex-col gap-2 text-sm">
              Minimum rating
              <select
                value={minRating}
                onChange={(event) =>
                  updateFilter('minRating', event.target.value)
                }
                className="rounded bg-elevated p-2 text-primary focus-visible:outline-accent"
              >
                <option value="">Any rating</option>
                <option value="4.7">4.7 ★ and up</option>
                <option value="4.8">4.8 ★ and up</option>
                <option value="4.9">4.9 ★ and up</option>
              </select>
            </label>
            <button
              type="button"
              onClick={resetFilters}
              disabled={!hasFilters}
              className="rounded px-3 py-2 text-sm text-accent disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-accent"
            >
              Reset filters
            </button>
          </div>
        )}
      </header>

      <main className="mt-1 space-y-7 md:space-y-10">
        {isListView ? (
          <div className="space-y-3">
            <p role="status" className="px-2 text-sm text-secondary">
              {filtered.length} {filtered.length === 1 ? 'coffee' : 'coffees'}{' '}
              found
            </p>
            <CoffeeList products={filtered} query={query} />
          </div>
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
