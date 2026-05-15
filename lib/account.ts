import type { CreateAccountFormData } from "@MusicMe/app/(account)/create-account/page";
import { BACKEND_URL } from "./util";

export const uploadNewProfilePic = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const requestOptions = {
    method: 'POST',
    body: formData,
  };

  const response = await fetch(`${BACKEND_URL}/cloudinary/upload/profile_picture`, requestOptions);

  if (!response.ok) {
    return { success: false, error: 'Failed to upload image' };
  }

  let data = await response.json();
  return {...data, success: true};
};

export const createAccount = async (accountData: CreateAccountFormData) => {
  const response = await fetch(`${BACKEND_URL}/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(accountData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create account');
  }

  return await response.json();
}
