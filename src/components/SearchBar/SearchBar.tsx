import React, { useState, FormEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

import css from "../SearchBar/SearchBar.module.css";

const notify = () => toast.error("This field cannot be empty!");

interface SearchBarProps {
  onSubmit: (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      notify();
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.inputWrapper}>
          <input
            name="inputSearch"
            type="text"
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleChange}
            className={css.searchInput}
          />
          <button type="submit" className={css.btn}>
            <FaSearch className={css.searchIcon} />
            Search
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </header>
  );
};

export default SearchBar;
