import React, { SyntheticEvent, useState } from "react";
import { GoSearch } from "react-icons/go";

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSearch(search); // Envia a consulta para o componente pai
  };

  return (
    <form
      className="bg-white rounded-lg sm:flex box-border sm:w-auto w-1/3"
      onSubmit={submit}
    >
      <input
        type="text"
        placeholder="Buscar..."
        required
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="sm:px-4 sm:py-2 px-1 py-2 outline-none border-r-2 rounded-lg border-gray-100 sm:w-3/4 w-2/3"
      />
      <button className="w-1/4 flex justify-center items-center">
        <GoSearch className="text-gray-500 text-2xl sm:text-3xl" />
      </button>
    </form>
  );
};
