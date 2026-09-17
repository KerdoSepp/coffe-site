import arrowRightIcon from '../assets/ArrowRightIcon.svg';
import ProductItem from './ProductItem';

export default function CoffeeContent() {
  return (
    <section className="flex flex-col gap-10 px-4 py-4 md:px-12 md:py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-primary text-[21px] font-semibold leading-none">
          Explore offers
        </h1>
        <div className="flex gap-3">
          <h1 className="text-primary text-[18px] font-semibold leading-none">
            All
          </h1>
          <img
            src={arrowRightIcon}
            alt=""
            aria-hidden="true"
            className="h-[17px] w-auto shrink-0"
          />
        </div>
      </div>
      <div>
        <ProductItem />
      </div>
    </section>
  );
}
