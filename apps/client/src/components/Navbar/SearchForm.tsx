import { AiOutlineSearch } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
function SearchForm() {
  return (
    <form className="relative flex w-auto">
      <input className="input px-4 hidden md:block border-0 outline-0 rounded-r-full rounded-l-full" placeholder="search..."  />
      <button className="md:absolute right-2 inset-y-0 md:text-slate-700 pt-1 md:pt-0">
        <AiOutlineSearch size={28} />
      </button>
    </form>
  );
}

export default SearchForm;
