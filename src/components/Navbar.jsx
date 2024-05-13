import "../App.css";
import { useState } from "react";
export default function header({ getCategory }) {
  const [checkSearch, setCheckSearch] = useState();
  const [search, setSearch] = useState("");

  const searchByCategory = (search) => {
    getCategory(search);
  };
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      searchByCategory(search);
    } else {
      return;
    }
  };
  return (
    <header className="flex items-center justify-between border-b py-2 ">
      <h1 className=" text-2xl font-bold leading-10">News</h1>
      <div className="container">
        <input
          checked={checkSearch}
          onChange={(e) => setCheckSearch(e.checked)}
          className="checkbox"
          type="checkbox"
        />
        <div className="mainbox">
          <div className="iconContainer">
            <svg
              viewBox="0 0 512 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="search_icon"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </div>
          <input
            className="search_input"
            placeholder="search"
            type="text"
            value={search}
            onChange={handleInputChange}
            onKeyDown={(e) => handleSubmit(e)}
          />
        </div>
      </div>
    </header>
  );
}
