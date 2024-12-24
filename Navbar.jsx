import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleChange = (event) => {
    const query = event.target.value;
    setQuery(query);
  };

  const handleClick = () => {
    if (query) {
      navigate(`/Products?query=${query}`);
    }
  };

  return (
    <nav className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <h1 className="font-bold italic w-48">Best Buy Finder</h1>

        <div
          id="collapseMenu"
          className={`lg:block ${
            menuOpen ? "block" : "hidden"
          } lg:!block lg:static fixed inset-0 lg:inset-auto lg:bg-transparent bg-white z-50`}
        >
          <button
            onClick={closeMenu}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
            </svg>
          </button>

          <ul className="lg:flex gap-x-4 lg:space-y-0 space-y-3 lg:static fixed inset-0 lg:inset-auto bg-white lg:bg-transparent lg:p-0 p-6 h-full lg:h-auto overflow-auto z-50">
            <li className="lg:hidden">
              <h1 className="font-bold italic">Best Buy Finder</h1>
            </li>
            <li className="lg:border-none border-b border-gray-300 py-3 px-3">
              <a
                href="/"
                className="hover:text-[#000] text-[#000] block font-semibold text-[15px]"
                onClick={closeMenu}
              >
                Home
              </a>
            </li>
            <li className="lg:border-none border-b border-gray-300 py-3 px-3">
              <a
                href="/compare"
                className="hover:text-[#000] text-gray-500 block font-semibold text-[15px]"
                onClick={closeMenu}
              >
                Compare Products
              </a>
            </li>
            <li className="lg:border-none border-b border-gray-300 py-3 px-3">
              <a
                href="/"
                className="hover:text-[#000] text-gray-500 block font-semibold text-[15px]"
                onClick={closeMenu}
              >
                Used Products
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center lg:ml-auto space-x-3">
          <div className="relative">
            <input
              onChange={handleChange}
              type="text"
              value={query}
              placeholder="What are you looking for?"
              className="px-4 py-2 border border-gray-300 outline-none rounded-full focus:border-blue-500 w-80"
              style={{ fontSize: "0.875rem" }}
            />

            <button
              className="absolute right-2 top-2 text-gray-500"
              onClick={handleClick}
            >
              <svg
                className="w-5 h-5 mt-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M18.5 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8 8.5z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex lg:ml-auto space-x-3">
          <button className="px-4 py-2 text-sm rounded-full font-bold text-[#000] border-2 border-[#000] bg-[#000] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#000]">
            <a href="/login" className="text-white hover:text-[#000]">
              Login
            </a>
          </button>

          <button className="px-4 py-2 text-sm rounded-full font-bold text-[#000] border-2 border-[#000] bg-[#000] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#000]">
            <a href="/sell" className="block text-white hover:text-[#000]">
              Sell
            </a>
          </button>

          <button id="toggleOpen" onClick={toggleMenu} className="lg:hidden">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
