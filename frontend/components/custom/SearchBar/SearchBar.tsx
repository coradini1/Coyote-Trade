import React, { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

function SearchBar({ onSearch, loading }: SearchBarProps) {
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleSearch}
        style={{ backgroundColor: "#7287FD" }}
        className="p-2 rounded text-white flex items-center"
        disabled={loading}
      >
        {loading ? (
          <span className="loader"></span> 
        ) : (
          "🔍"
        )}
      </button>
    </div>
  );
}

export default SearchBar;
