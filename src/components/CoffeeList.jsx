import { Link } from 'react-router-dom';

import { formatPrice } from '../data/Products.js';

export default function CoffeeList({ products, query }) {
  if (!products.length) {
    return (
      <div className="grid min-h-64 place-items-center text-center text-secondary">
        {query.trim()
          ? `No coffee matches “${query}” with the current filters.`
          : 'No coffee matches the current filters.'}
      </div>
    );
  }

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {products.map((product) => (
        <li key={product.id}>
          <Link
            to={`/detail/${product.id}`}
            className="group flex min-h-24 items-center gap-4 rounded-card bg-surface p-2 transition hover:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-20 w-24 shrink-0 rounded-[10px] object-cover sm:h-24 sm:w-32"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-white">
                {product.name}
              </h2>
              <p className="mt-1 truncate text-xs text-secondary">
                {product.description}
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">
                  {formatPrice(product.price)}
                </p>
                <p className="text-xs text-secondary">
                  <span className="text-rating">★</span> {product.rating}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
