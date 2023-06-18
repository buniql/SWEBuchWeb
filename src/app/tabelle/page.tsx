"use client";
import React from 'react';
import { SearchContext } from '../SearchContext';
import DataTable from "../view_model/DataTable";

export default function Home() {
  const searchValue = React.useContext(SearchContext); 

  return (
      <DataTable search={searchValue?.searchValue}></DataTable>
  );
}
