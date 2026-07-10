import type { CreateAccountFormData } from "@MusicMe/app/(account)/create-account/page";
import { BACKEND_URL } from "./util";

export const createAccount = async (accountData: CreateAccountFormData) => {
  const {showPublicPlaylists, favoriteGenres} = accountData
  const requiredData = {
    showPublicPlaylists,
    favoriteGenres,
  };
  const response = await fetch(`${BACKEND_URL}/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(requiredData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create account');
  }

  return await response.json();
}
