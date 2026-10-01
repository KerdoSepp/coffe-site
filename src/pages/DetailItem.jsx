import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import beanIcon from '../assets/figma/feature-bean.png';
import bikeIcon from '../assets/figma/feature-bike.png';
import milkIcon from '../assets/figma/feature-milk.png';
import starIcon from '../assets/figma/detail-star.svg';
import QuantityControl from '../components/QuantityControl.jsx';
import {
  coffeeProducts,
  featuredProduct,
  formatPrice,
} from '../data/Products.js';
import useCart from '../hooks/useCart.js';

const sizes = ['S', 'M', 'L'];

export default function DetailItem() {
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { productId } = useParams();
  const { addItem } = useCart();
  const product =
    coffeeProducts.find((coffee) => coffee.id === productId) ?? featuredProduct;

  const addToCart = () => {
    addItem(product, size, quantity);
    navigate('/order');
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-5xl pb-44 md:flex md:items-center md:gap-10 md:px-8 md:py-12">
      <div className="relative h-[238px] overflow-hidden rounded-b-[20px] md:h-[560px] md:flex-1 md:rounded-[24px]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        <button
          onClick={() => navigate('/')}
          aria-label="Close details"
          className="absolute top-[max(12px,env(safe-area-inset-top))] right-3 grid size-7 place-items-center rounded-full bg-white text-xl leading-none text-[#727272]"
        >
          ×
        </button>
      </div>

      <div className="px-[22px] pt-4 md:flex-1 md:px-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              {product.name}
            </h1>
            <p className="mt-1 text-lg text-secondary">Ice/Hot</p>
          </div>
          <div className="mt-1 flex items-center gap-1.5 whitespace-nowrap">
            <img src={starIcon} alt="" className="size-5" />
            <span className="font-semibold text-white">{product.rating}</span>
            <span className="text-xs text-secondary">({product.reviews})</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-[32px] leading-tight font-semibold text-white">
            {formatPrice(product.price).replace(' ', '')}
          </p>
          <div className="flex gap-3">
            {[
              { src: bikeIcon, label: 'Fast delivery' },
              { src: beanIcon, label: 'Quality beans' },
              { src: milkIcon, label: 'Fresh milk' },
            ].map((feature) => (
              <div
                key={feature.label}
                title={feature.label}
                className="grid size-11 place-items-center rounded-full bg-surface"
              >
                <img
                  src={feature.src}
                  alt={feature.label}
                  className="icon-accent size-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 max-w-xl text-lg leading-[1.25] text-secondary">
          A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of
          espresso coffee and 85ml of fresh milk.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Size</h2>
          <div className="mt-6 grid grid-cols-3 gap-2.5">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSize(option)}
                className={`h-12 rounded-full border text-xl transition ${size === option ? 'border-accent bg-accent text-white' : 'border-surface bg-[#171717] text-white hover:border-muted'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-[72px] z-40 border-t border-elevated bg-page/95 px-5 py-2.5 backdrop-blur-xl md:bottom-6 md:left-1/2 md:max-w-xl md:-translate-x-1/2 md:rounded-full md:border">
        <div className="mx-auto flex max-w-md items-center gap-4">
          <QuantityControl value={quantity} onChange={setQuantity} />
          <button
            onClick={addToCart}
            className="h-[54px] flex-1 rounded-full bg-accent text-center text-lg font-semibold text-white transition hover:bg-[#d58857]"
          >
            <span className="block leading-5">Add</span>
            <span className="block leading-5">
              {formatPrice(product.price * quantity).replace(' ', '')}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
