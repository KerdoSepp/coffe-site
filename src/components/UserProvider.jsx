import { useEffect, useMemo, useState } from 'react';

import UserContext from '../context/user-context.js';
import { currentUser } from '../data/User.js';

const ADDRESS_STORAGE_KEY = 'kohtu-coffee-address';
const METHOD_STORAGE_KEY = 'kohtu-coffee-fulfillment';

function loadAddress() {
  try {
    const storedAddress = JSON.parse(localStorage.getItem(ADDRESS_STORAGE_KEY));

    if (
      storedAddress?.street &&
      storedAddress?.city &&
      storedAddress?.postalCode
    ) {
      return storedAddress;
    }
  } catch {
    // Use the default address if saved data cannot be read.
  }

  return currentUser.address;
}

function loadFulfillmentMethod() {
  const storedMethod = localStorage.getItem(METHOD_STORAGE_KEY);
  return storedMethod === 'pickup' ? 'pickup' : 'deliver';
}

export default function UserProvider({ children }) {
  const [deliveryAddress, setDeliveryAddress] = useState(loadAddress);
  const [fulfillmentMethod, setFulfillmentMethod] = useState(
    loadFulfillmentMethod
  );

  useEffect(() => {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(deliveryAddress));
  }, [deliveryAddress]);

  useEffect(() => {
    localStorage.setItem(METHOD_STORAGE_KEY, fulfillmentMethod);
  }, [fulfillmentMethod]);

  const value = useMemo(
    () => ({
      deliveryAddress,
      setDeliveryAddress,
      fulfillmentMethod,
      setFulfillmentMethod,
    }),
    [deliveryAddress, fulfillmentMethod]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
