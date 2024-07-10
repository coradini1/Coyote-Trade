import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search in stocks..."
        value={searchQuery}
        onChange={handleInputChange}
        className="border rounded p-2 w-full"
      />
      <button onClick={handleSearch} className="p-2 rounded bg-blue-500 text-white">
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
