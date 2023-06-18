"use client";
import React from 'react';

const SearchContext = React.createContext({
  searchValue: '',
  setSearchValue: (value: string) => {},
});

export default SearchContext;
