"use client";
import React from 'react';

const SearchContext = React.createContext({
  searchValue: '',
  setSearchValue: (value: string) => {},
});

function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = React.useState<string>('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}

export {SearchContext , SearchProvider};
