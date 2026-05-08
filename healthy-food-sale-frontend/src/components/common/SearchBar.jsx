import { useEffect, useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState("");

  // Debounce search to avoid too many re-renders/API calls
  useEffect(() => {
    const delay = setTimeout(() => {
      if (onSearch) {
        onSearch(query);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-box">
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          className="searchbar-input"
        />

        {query && (
          <button
            type="button"
            className="searchbar-clear"
            onClick={handleClear}
          >
            ✕
          </button>
        )}

        <span className="searchbar-icon">🔍</span>
      </div>
    </div>
  );
}
