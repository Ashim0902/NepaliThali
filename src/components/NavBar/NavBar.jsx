import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ShoppingCart, User, UserPlus } from "lucide-react";
import { useCart } from "../../context/CartContext";

const NavBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="fixed z-50 top-2 left-4 right-4 rounded-2xl shadow-xl bg-white/80 backdrop-blur-md text-black border border-orange-100">
      <div className="flex items-center justify-between w-full h-16 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 min-w-max">
          <div className="flex">
            <img className="h-20 w-20" src="logo.png" alt="NepaliThali" />
            <span className="absolute ml-14 mt-14 text-xs text-gray-500">
              Authentic & Fresh
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-6 whitespace-nowrap flex-grow justify-center">
          {["Home", "Menu", "About", "Contact"].map((link) => (
            <Link
              key={link}
              to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              className="text-black hover:text-orange-600 transition font-medium relative group"
            >
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Desktop search bar */}
        <div className="hidden md:flex max-w-xl flex-grow ml-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5 pointer-events-none" />
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Nepali dishes..."
            className="w-full pl-10 rounded-lg border border-orange-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition bg-white/70"
          />
        </div>

        {/* Buttons & Cart */}
        <div className="hidden md:flex items-center space-x-3 min-w-max ml-4">
          <button
            onClick={handleCartClick}
            className="relative text-orange-500 hover:text-orange-600 transition text-2xl cursor-pointer p-2 rounded-lg hover:bg-orange-50"
            title="Cart"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={handleSignInClick}
            className="cursor-pointer flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-50 transition"
          >
            <User size={16} />
            Sign In
          </button>
          <button
            onClick={handleSignUpClick}
            className="cursor-pointer flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            <UserPlus size={16} />
            Sign Up
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-orange-600 hover:bg-orange-100 transition"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-orange-100 shadow-lg rounded-b-2xl">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5 pointer-events-none" />
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Nepali dishes..."
                className="w-full pl-10 rounded-lg border border-orange-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition bg-white/70"
              />
            </div>

            {/* Nav links */}
            {["Home", "Menu", "About", "Contact"].map((link) => (
              <Link
                key={link}
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="block text-black hover:text-orange-600 transition px-2 py-2 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </Link>
            ))}

            {/* Cart button for mobile */}
            <button
              onClick={() => {
                handleCartClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-orange-100 text-orange-600 rounded-lg font-medium"
            >
              <ShoppingCart size={20} />
              Cart ({totalItems})
            </button>

            {/* Buttons */}
            <div className="flex space-x-3 justify-center mt-2">
              <button
                onClick={handleSignInClick}
                className="flex-1 flex items-center justify-center gap-2 text-center text-sm px-4 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-50 transition font-medium"
              >
                <User size={16} />
                Sign In
              </button>
              <button
                onClick={handleSignUpClick}
                className="flex-1 flex items-center justify-center gap-2 text-center text-sm px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition font-medium"
              >
                <UserPlus size={16} />
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
