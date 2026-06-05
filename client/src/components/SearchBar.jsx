import { useState } from "react";

function SearchBar({ setSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setSearch(input);
  };

  return (
    <div className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Search courses..."
        className="border px-4 py-2 w-1/2 rounded-l"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 rounded-r"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;