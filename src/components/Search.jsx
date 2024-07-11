import React from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="flex items-center  gap-2 p-2  border-2 rounded-xl overflow-hidden">
      <label htmlFor="search" className="ml-3">
        <IoSearch />
      </label>
      <input
        id="search"
        placeholder="Search"
        className="focus:outline-none w-full"
      />
    </div>
  );
};

export default Search;
