import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchAnyThing = ({ searchTerm, setSearchTerm, handleSearch, label }) => {
  return (
    <div className="flex items-center gap-x-2">
      <input
        type="text"
        className="px-3 caret-lime-300 py-1 box rounded-md border border-neutral-500 focus:ring focus:ring-lime-400 placeholder:text-sm"
        placeholder={`Search ${label}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <HiOutlineMagnifyingGlass
        size={36}
        strokeWidth={2}
        onClick={handleSearch}
        className="box border rounded-md border-neutral-500 p-2 hover:text-lime-400"
      />
    </div>
  );
};

export default SearchAnyThing;
