import arrowRightIcon from '../assets/ArrowRightIcon.svg';
import ProductCard from './ProductCard.jsx';

export default function ProductSection({ title, products, onShowAll }) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="text-[21px] leading-normal font-semibold text-white md:text-2xl">
          {title}
        </h2>
        <button
          type="button"
          onClick={onShowAll}
          className="flex items-center gap-3 rounded-lg px-1 py-2 text-[17px] font-semibold text-white transition hover:bg-surface"
        >
          All
          <img src={arrowRightIcon} alt="" className="h-4 w-2.5" />
        </button>
      </div>
      <div className="no-scrollbar grid snap-x grid-flow-col auto-cols-[calc(50%-5px)] gap-2.5 overflow-x-auto sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
