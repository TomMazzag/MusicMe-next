'use client';

import { useEffect, useState } from 'react';

export const useUserId = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  useEffect(() => {
    fetch('/api/user/current/id')
      .then((res) => {
        if (!res.ok) {
          return;
        }
        return res.json();
      })
      .then((data) => setUserId(data.userId));
  }, []);
  return userId;
};
