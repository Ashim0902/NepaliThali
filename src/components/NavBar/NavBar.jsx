import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { totalItems } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const performSearch = () => {
    if (window.location.pathname !== "/menu") {
      navigate("/menu");
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleKeyDown = (e) => e.key === "Enter" && performSearch();
  const clearSearch = () => setSearchQuery("");

  return (
    <nav className="fixed top-2 left-2 right-2 lg:left-4 lg:right-4 bg-white/95 backdrop-blur-lg rounded-2xl border border-orange-100 shadow-xl z-50">
      <div className="flex items-center justify-between h-16 px-3 lg:px-8">
        <Link to="/" className="flex items-center min-w-max">
          <img
            src="logo.png"
            alt="NepaliThali"
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center flex-grow justify-evenly">
          <ul className="flex space-x-8 whitespace-nowrap">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-600 font-medium relative group py-2"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className="text-gray-700 hover:text-orange-600 font-medium relative group py-2"
              >
                Menu
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-orange-600 font-medium relative group py-2"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-orange-600 font-medium relative group py-2"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          </ul>

          <div className="relative w-96 flex-shrink-0 rounded-full border-2 border-orange-500 bg-white flex overflow-hidden ml-8 shadow-md">
            {searchFocused && (
              <div className="flex items-center px-4 text-orange-500 pointer-events-none">
                <Search size={20} />
              </div>
            )}

            <input
              type="search"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`flex-grow py-2 text-black placeholder-black focus:outline-none text-base ${
                searchFocused ? "pl-2" : "pl-6"
              }`}
            />

            <div className="w-px h-8 my-auto bg-orange-400"></div>

            {searchQuery && (
              <button
                onClick={clearSearch}
                className="flex items-center justify-center text-red-500 hover:text-red-700 transition-colors focus:outline-none"
                aria-label="Clear search"
                type="button"
              ></button>
            )}

            <button
              onClick={performSearch}
              className="px-5 flex items-center justify-center text-black hover:bg-orange-100 rounded-r-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center ml-6">
          <button
            onClick={() => navigate("/cart")}
            className="relative text-orange-500 hover:text-orange-600 p-2.5 rounded-xl hover:bg-orange-50"
            title="Cart"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-orange-600 hover:bg-orange-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-orange-100 shadow-lg rounded-b-2xl">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <div className="relative w-full rounded-full border-2 border-orange-500 bg-white flex overflow-hidden">
              <input
                type="search"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className="flex-grow px-6 py-2 text-black placeholder-black rounded-l-full focus:outline-none focus:ring-0 text-base"
              />
              <div className="w-px bg-orange-500"></div>
              <button
                onClick={performSearch}
                className="px-5 flex items-center justify-center text-black hover:bg-orange-100 rounded-r-full transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>

            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <button
              onClick={() => {
                navigate("/cart");
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-orange-100 text-orange-600 rounded-xl font-medium hover:bg-orange-200 transition-colors"
            >
              <ShoppingCart size={20} />
              Cart ({totalItems})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
