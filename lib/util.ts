export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const BACKEND_URL_SERVER =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL_SERVER;

/**
 * @param plural (Optional) If no plural is provided this function will return singular + 's'
 */
export function pluraliseAndReturnString(count: number, singular: string, plural?: string) {
    const word = count === 1 ? singular : plural || singular + 's';
    return word;
}

export function shortenString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + '...';
  }
}

export const DEFAULT_GET_OPTIONS: RequestInit = {
  method: 'GET',
  credentials: 'include',
};

export const BASE_URL = 'https://zenekio.co.uk';
export const MUSIC_BRAINZ_UA = `Zenekio/1.0.0 ${BASE_URL}`;
