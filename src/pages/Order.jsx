import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import discountIcon from '../assets/figma/order-discount.svg';
import editIcon from '../assets/figma/order-edit.svg';
import noteIcon from '../assets/figma/order-note.svg';
import walletIcon from '../assets/figma/order-wallet.svg';
import AddressEditor from '../components/AddressEditor.jsx';
import PageHeader from '../components/PageHeader.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import { coffeeShop } from '../data/Shop.js';
import useCart from '../hooks/useCart.js';
import useUser from '../hooks/useUser.js';

export default function Order() {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  const { cartItems, updateQuantity } = useCart();
  const {
    deliveryAddress,
    setDeliveryAddress,
    fulfillmentMethod,
    setFulfillmentMethod,
  } = useUser();
  const hasItems = cartItems.length > 0;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const deliveryFee = hasItems && fulfillmentMethod === 'deliver' ? 1 : 0;
  const total = subtotal + deliveryFee;
  const displayedAddress =
    fulfillmentMethod === 'deliver' ? deliveryAddress : coffeeShop.address;

  const selectMethod = (value) => {
    setFulfillmentMethod(value);
    setIsEditingAddress(false);
  };

  const saveAddress = (address) => {
    setDeliveryAddress(address);
    setIsEditingAddress(false);
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-6 pt-[max(12px,env(safe-area-inset-top))] pb-52">
      <PageHeader title="Order" backTo="/" />

      <div className="mt-2 flex gap-[11px] rounded-xl bg-surface p-1">
        {[
          ['deliver', 'Deliver'],
          ['pickup', 'Pick Up'],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => selectMethod(value)}
            className={`h-9 flex-1 rounded-lg text-base transition ${fulfillmentMethod === value ? 'bg-accent font-semibold text-white' : 'bg-[#ededed] text-[#242424]'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="mt-6">
        <h2 className="text-base font-semibold text-white">
          {fulfillmentMethod === 'deliver'
            ? 'Delivery Address'
            : 'Pickup Address'}
        </h2>
        <div className="mt-4">
          <p className="text-sm font-semibold text-white">
            {fulfillmentMethod === 'pickup'
              ? coffeeShop.name
              : displayedAddress.street}
          </p>
          <p className="mt-1 text-xs text-secondary">
            {fulfillmentMethod === 'pickup' && `${displayedAddress.street}, `}
            {displayedAddress.city} {displayedAddress.postalCode}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          {fulfillmentMethod === 'deliver' && (
            <button
              type="button"
              onClick={() => setIsEditingAddress(true)}
              className="flex items-center gap-1 rounded-full border border-[#a2a2a2] bg-white px-3 py-1.5 text-xs text-[#313131]"
            >
              <img src={editIcon} alt="" className="size-3.5" />
              Edit Address
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowNote((current) => !current)}
            className="flex items-center gap-1 rounded-full border border-[#a2a2a2] bg-white px-3 py-1.5 text-xs text-[#313131]"
          >
            <img src={noteIcon} alt="" className="size-3.5" />
            {note ? 'Edit Note' : 'Add Note'}
          </button>
        </div>
        {showNote && (
          <label className="mt-3 block text-xs text-secondary">
            Order note
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add delivery or pickup instructions"
              rows={3}
              className="mt-2 w-full resize-none rounded-input border border-elevated bg-surface p-3 text-sm text-white outline-none placeholder:text-muted focus:border-accent"
            />
          </label>
        )}
      </section>

      <div className="mx-4 mt-4 border-t border-elevated pt-4">
        {hasItems ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="size-[54px] rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-secondary">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#a2a2a2]">
                      {item.product.description} · Size {item.size}
                    </p>
                  </div>
                </div>
                <QuantityControl
                  value={item.quantity}
                  onChange={(quantity) =>
                    updateQuantity(item.product.id, item.size, quantity)
                  }
                  compact
                  min={0}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-24 items-center justify-between gap-4 rounded-card bg-surface px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Your cart is empty
              </h2>
              <p className="mt-1 text-xs text-secondary">
                Add a coffee before placing an order.
              </p>
            </div>
            <Link
              to="/"
              className="shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white"
            >
              Browse
            </Link>
          </div>
        )}
      </div>

      <div className="-mx-6 mt-4 h-1 bg-elevated" />

      <button
        type="button"
        disabled={!hasItems}
        className="mt-4 flex h-14 w-full items-center justify-between rounded-2xl border border-[#ededed] bg-white px-4 text-[#313131] transition enabled:hover:bg-[#ededed] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="flex items-center gap-4 text-sm font-semibold">
          <img src={discountIcon} alt="" className="size-5" />1 Discount is
          Applies
        </span>
        <span className="text-2xl font-light">›</span>
      </button>

      <section className="mt-6">
        <h2 className="text-base font-semibold text-white">Payment Summary</h2>
        <dl className="mt-4 space-y-2 text-sm text-white">
          <div className="flex justify-between">
            <dt>Price</dt>
            <dd className="font-semibold">$ {subtotal.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Delivery Fee</dt>
            <dd>
              {hasItems && fulfillmentMethod === 'deliver' && (
                <span className="mr-2 text-secondary line-through">$ 2.0</span>
              )}
              <span className="font-semibold">$ {deliveryFee.toFixed(1)}</span>
            </dd>
          </div>
        </dl>
      </section>

      <div className="fixed inset-x-0 bottom-[72px] z-40 border-t border-elevated bg-page/95 px-6 pt-4 pb-3 backdrop-blur-xl md:bottom-6 md:left-1/2 md:max-w-xl md:-translate-x-1/2 md:rounded-[24px] md:border">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            className="mb-3 flex w-full items-center justify-between px-0 text-left"
          >
            <span className="flex items-center gap-4">
              <img src={walletIcon} alt="" className="size-5" />
              <span>
                <strong className="block text-sm text-white">
                  Cash/Wallet
                </strong>
                <span className="text-xs font-semibold text-accent">
                  $ {total.toFixed(2)}
                </span>
              </span>
            </span>
            <span className="text-xl text-secondary">⌄</span>
          </button>
          <button
            type="button"
            disabled={!hasItems}
            onClick={() => hasItems && navigate('/delivery')}
            className="h-14 w-full rounded-full bg-accent text-base font-semibold text-white transition enabled:hover:bg-[#d58857] disabled:cursor-not-allowed disabled:bg-elevated disabled:text-muted"
          >
            Order
          </button>
        </div>
      </div>

      {isEditingAddress && (
        <AddressEditor
          address={deliveryAddress}
          onClose={() => setIsEditingAddress(false)}
          onSave={saveAddress}
        />
      )}
    </main>
  );
}
