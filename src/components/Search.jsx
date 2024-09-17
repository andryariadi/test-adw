"use client";

import useSearchStore from "src/libs/storeSearch";

const Search = () => {
  const { query, setQuery } = useSearchStore();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div className="group p-4 overflow-hidden w-[10px] h-[10px] hover:w-[150px] lg:hover:w-[270px] bg-logo shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center justify-center hover:duration-300 duration-300">
        <div className="flex items-center justify-center fill-neutral-200 ">
          <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="12" height="12">
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>
        <input type="text" value={query} onChange={handleInputChange} className="hidden group-hover:flex outline-none text-sm bg-transparent w-full text-neutral-200 px-4" />
      </div>
    </>
  );
};

export default Search;
