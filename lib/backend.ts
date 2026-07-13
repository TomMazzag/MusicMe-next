import { auth } from '@clerk/nextjs/server';

export const authenticatedRequest = async (url: string, init: RequestInit) => {
  const { getToken } = await auth();
  const token = await getToken();

  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};
