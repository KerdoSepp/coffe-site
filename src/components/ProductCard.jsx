import { Link } from 'react-router-dom';
import { formatPrice } from '../data/Products.js';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/detail/${product.id}`}
      className="group block min-w-0 rounded-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="aspect-[1.68/1] overflow-hidden rounded-[10px] bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-1 leading-tight">
        <h3 className="truncate text-[15.75px] font-semibold text-white">
          {product.name}
        </h3>
        <p className="truncate text-xs tracking-[0.01em] text-secondary">
          {product.description}
        </p>
        <p className="text-xs tracking-[0.01em] text-secondary">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
