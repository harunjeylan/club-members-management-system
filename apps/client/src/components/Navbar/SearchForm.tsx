import { BiSearchAlt } from "react-icons/bi";
function SearchForm() {
  return (
    <form className="relative flex w-auto">
      <input className="input hidden md:block " placeholder="search..."  />
      <button className="md:absolute right-0 inset-y-0 md:text-slate-700 pt-1 md:pt-0">
        <BiSearchAlt size={28} />
      </button>
    </form>
  );
}

export default SearchForm;
