import { useState } from 'react';

import { coffeeShop } from '../data/Shop.js';
import {
  distanceInKm,
  geocodeAddress,
  reverseGeocode,
} from '../services/geocoding.js';
import AddressMap from './AddressMap.jsx';

const fieldOptions = [
  ['street', 'Street address', 'address-line1'],
  ['city', 'City', 'address-level2'],
  ['postalCode', 'Postal code', 'postal-code'],
];

function getValidationState(coordinates) {
  const distance = distanceInKm(coffeeShop.coordinates, coordinates);
  return distance <= coffeeShop.deliveryRadiusKm ? 'valid' : 'outside';
}

export default function AddressEditor({ address, onClose, onSave }) {
  const [draft, setDraft] = useState(address);
  const [coordinates, setCoordinates] = useState(
    address.coordinates ?? coffeeShop.coordinates
  );
  const [status, setStatus] = useState(
    address.validated && address.coordinates
      ? getValidationState(address.coordinates)
      : 'idle'
  );
  const [message, setMessage] = useState('');

  const updateField = (field, value) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
      validated: false,
    }));
    setStatus('idle');
    setMessage('');
  };

  const applyResult = (result) => {
    const nextAddress = {
      ...draft,
      ...result,
      street: result.street || draft.street,
      city: result.city || draft.city,
      postalCode: result.postalCode || draft.postalCode,
    };
    const nextStatus = getValidationState(result.coordinates);

    setDraft(nextAddress);
    setCoordinates(result.coordinates);
    setStatus(nextStatus);
    setMessage(
      nextStatus === 'valid'
        ? 'Address confirmed and inside the delivery area.'
        : `This address is more than ${coffeeShop.deliveryRadiusKm} km from the shop.`
    );
  };

  const validateAddress = async () => {
    if (!/^\d{5}$/.test(draft.postalCode.trim())) {
      setStatus('invalid');
      setMessage('Enter a valid five-digit Estonian postal code.');
      return;
    }

    setStatus('loading');
    setMessage('Checking the address…');

    try {
      const result = await geocodeAddress(draft);

      if (!result?.street || !result.city || !result.postalCode) {
        setStatus('invalid');
        setMessage(
          'We could not confirm that address. Check the details and try again.'
        );
        return;
      }

      applyResult(result);
    } catch (error) {
      setStatus('invalid');
      setMessage(error.message);
    }
  };

  const selectMapLocation = async (nextCoordinates) => {
    setCoordinates(nextCoordinates);
    setStatus('loading');
    setMessage('Finding the address at this location…');

    try {
      const result = await reverseGeocode(nextCoordinates);
      applyResult(result);
    } catch (error) {
      setStatus('invalid');
      setMessage(error.message);
    }
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus('invalid');
      setMessage('Location services are not available in this browser.');
      return;
    }

    setStatus('loading');
    setMessage('Getting your current location…');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        selectMapLocation({ lat: coords.latitude, lng: coords.longitude }),
      () => {
        setStatus('invalid');
        setMessage('Location access was not allowed.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status !== 'valid') return;
    onSave(draft);
  };

  const isLoading = status === 'loading';
  const canSave = status === 'valid';

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-end bg-black/60 p-0 backdrop-blur-sm sm:place-items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-address-title"
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-dvh w-full overflow-y-auto rounded-t-[24px] border-elevated bg-surface px-6 pt-6 pb-[max(24px,env(safe-area-inset-bottom))] sm:max-h-[calc(100dvh-48px)] sm:max-w-2xl sm:rounded-[24px] sm:border sm:pb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              id="edit-address-title"
              className="text-lg font-semibold text-white"
            >
              Edit delivery address
            </h2>
            <p className="mt-1 text-xs text-secondary">
              Search the address or move the pin to your entrance.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close address editor"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-elevated text-xl text-secondary"
          >
            ×
          </button>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <div>
            <div className="space-y-3">
              {fieldOptions.map(([field, label, autoComplete]) => (
                <label key={field} className="block text-xs text-secondary">
                  {label}
                  <input
                    required
                    value={draft[field] ?? ''}
                    onChange={(event) => updateField(field, event.target.value)}
                    autoComplete={autoComplete}
                    className="mt-1.5 h-11 w-full rounded-input border border-elevated bg-page px-3 text-sm text-white outline-none focus:border-accent"
                  />
                </label>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={validateAddress}
                disabled={isLoading}
                className="h-10 rounded-full bg-accent px-3 text-xs font-semibold text-white disabled:opacity-50"
              >
                {isLoading ? 'Checking…' : 'Check address'}
              </button>
              <button
                type="button"
                onClick={useCurrentLocation}
                disabled={isLoading}
                className="h-10 rounded-full border border-elevated px-3 text-xs font-semibold text-secondary disabled:opacity-50"
              >
                Use my location
              </button>
            </div>

            <p
              aria-live="polite"
              className={`mt-3 min-h-10 rounded-lg px-3 py-2 text-xs leading-5 ${
                status === 'valid'
                  ? 'bg-emerald-500/10 text-emerald-300'
                  : status === 'invalid' || status === 'outside'
                    ? 'bg-red-500/10 text-red-300'
                    : 'bg-page text-secondary'
              }`}
            >
              {message ||
                'The delivery address must be within the marked area.'}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-elevated bg-page">
            <div className="h-[260px] sm:h-full sm:min-h-[330px]">
              <AddressMap
                coordinates={coordinates}
                onSelect={selectMapLocation}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-12 flex-1 rounded-full border border-elevated text-sm font-semibold text-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSave}
            className="h-12 flex-1 rounded-full bg-accent text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-elevated disabled:text-muted"
          >
            Save address
          </button>
        </div>
      </form>
    </div>
  );
}
