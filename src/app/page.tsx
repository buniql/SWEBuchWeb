"use client";
import React from 'react';
import { SearchContext } from './SearchContext';
import MediaCardGrid from './view_model/MediaCard';


export default function Home({ data }: any) {
  const searchValue = React.useContext(SearchContext); 

  return (
    <main >
      <SearchContext.Provider value={searchValue}>
        <MediaCardGrid search={searchValue?.searchValue}></MediaCardGrid>
      </SearchContext.Provider>
    </main>
  );
}
