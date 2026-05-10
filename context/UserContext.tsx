'use client';

import { Profile } from '@MusicMe/types/Profile';
import { createContext, useContext, useEffect, useState } from 'react';

type UserContextType = {
  user: Profile.User | null;
  loading: boolean;
  error: Error | null;
  userNotFound: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    fetch('/api/user/account')
      .then((res) => res.json())
      .then((userData) => {
        if (userData.length === 0) {
          setUserNotFound(true);
          return;
        }
        setUser(userData.userDetails);
      })
      .catch((err) => {
        setError(err);
        setUserNotFound(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return <UserContext.Provider value={{ user, loading, error, userNotFound }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
