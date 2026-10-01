import { useState } from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../assets/figma/delivery-back.svg';
import bikeIcon from '../assets/figma/delivery-bike.png';
import callIcon from '../assets/figma/delivery-call.svg';
import gpsIcon from '../assets/figma/delivery-gps.svg';
import courierImage from '../assets/figma/courier.png';
import DeliveryMap from '../components/DeliveryMap.jsx';
import { coffeeShop } from '../data/Shop.js';
import useUser from '../hooks/useUser.js';

export default function Delivery() {
  const [recenterSignal, setRecenterSignal] = useState(0);
  const { deliveryAddress, fulfillmentMethod } = useUser();
  const displayedAddress =
    fulfillmentMethod === 'deliver' ? deliveryAddress : coffeeShop.address;
  const addressText = `${displayedAddress.street}, ${displayedAddress.city} ${displayedAddress.postalCode}`;
  const fallbackDestination = {
    lat: coffeeShop.coordinates.lat - 0.006,
    lng: coffeeShop.coordinates.lng - 0.012,
  };
  const destination =
    fulfillmentMethod === 'deliver'
      ? (deliveryAddress.coordinates ?? fallbackDestination)
      : coffeeShop.coordinates;

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#f9f9f9] pb-[394px] md:pb-0">
      <div className="absolute inset-0 z-0 isolate bottom-[300px] md:bottom-0">
        <DeliveryMap
          destination={destination}
          recenterSignal={recenterSignal}
        />

        <div className="pointer-events-none absolute inset-x-6 top-[max(24px,env(safe-area-inset-top))] z-20 flex justify-between md:inset-x-10">
          <Link
            to="/order"
            aria-label="Back to order"
            className="pointer-events-auto grid size-11 place-items-center rounded-full bg-page shadow-md"
          >
            <img src={backIcon} alt="" className="h-3 w-5 rotate-90" />
          </Link>
          <button
            type="button"
            aria-label="Center map"
            onClick={() => setRecenterSignal((current) => current + 1)}
            className="pointer-events-auto grid size-11 place-items-center rounded-full bg-page shadow-md"
          >
            <img src={gpsIcon} alt="" className="size-6" />
          </button>
        </div>
      </div>

      <section className="fixed inset-x-0 bottom-[72px] z-40 rounded-t-[24px] bg-page px-6 pt-4 pb-5 md:inset-y-6 md:right-40 md:left-auto md:w-[375px] md:rounded-[24px] md:border md:border-elevated">
        <div className="mx-auto h-1.5 w-11 rounded-full bg-[#e3e3e3]" />
        <div className="mt-8 text-center">
          <h1 className="text-base font-semibold text-white">
            10 minutes left
          </h1>
          <p className="mt-1 text-xs text-secondary">
            {fulfillmentMethod === 'deliver' ? 'Delivery to' : 'Pickup from'}{' '}
            <strong className="text-white">{addressText}</strong>
          </p>
        </div>

        <div className="mt-6 flex gap-2.5">
          {[true, true, true, false].map((complete, index) => (
            <span
              key={index}
              className={`h-1 flex-1 rounded-full ${complete ? 'bg-accent' : 'bg-[#e3e3e3]'}`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#e3e3e3] py-2 pr-4 pl-3">
          <div className="grid size-14 shrink-0 place-items-center rounded-xl border border-[#e3e3e3]">
            <img src={bikeIcon} alt="" className="icon-accent size-11" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Delivered your order
            </h2>
            <p className="mt-1 text-xs leading-normal text-secondary">
              We will deliver your goods to you in the shortes possible time.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={courierImage}
              alt="Brooklyn Simmons"
              className="size-14 rounded-[14px] object-cover"
            />
            <div>
              <h2 className="text-sm font-semibold text-white">
                Brooklyn Simmons
              </h2>
              <p className="mt-1 text-xs text-secondary">Personal Courier</p>
            </div>
          </div>
          <a
            href="tel:+3725550123"
            aria-label="Call courier"
            className="grid size-11 place-items-center rounded-full border border-[#e3e3e3]"
          >
            <img src={callIcon} alt="" className="size-6" />
          </a>
        </div>
      </section>
    </main>
  );
}
