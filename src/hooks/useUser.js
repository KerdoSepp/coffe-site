import { useContext } from 'react';

import UserContext from '../context/user-context.js';

export default function useUser() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useUser must be used inside UserProvider');
  }

  return user;
}
