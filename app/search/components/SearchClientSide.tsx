'use client';

import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export type Category = 'Track' | 'Artist' | 'Album' | 'Username';
type Params = 'query' | 'category';

export type UpdateSearchParameter = (parameter: Params, value: string) => void;

export default function SearchClientSide() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = (searchParams.get('category') as Category) || 'Track';
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    updateSearchParameter('query', inputValue);
  }, [inputValue]);

  const updateSearchParameter = (parameter: Params, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(parameter, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <>
      <SearchBar category={category} query={inputValue} updateSearchParameter={updateSearchParameter} setInputValue={setInputValue} />
      <SearchResults category={category} query={inputValue} />
    </>
  );
}
