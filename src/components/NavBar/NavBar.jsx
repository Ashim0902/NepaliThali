import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ShoppingCart, User, UserPlus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (window.location.pathname !== "/menu") {
      navigate("/menu");
    }
  };

  return (
    <nav className="fixed z-50 top-2 left-2 right-2 lg:left-4 lg:right-4 rounded-2xl shadow-xl bg-white/95 backdrop-blur-lg text-black border border-orange-100 ">
      <div className="flex items-center justify-between w-full h-16 px-3 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 min-w-max">
          <div className="flex items-center relative">
            <div className="ml-2">
              <img
                src="logo.png"
                alt="NepaliThali"
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
              />
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 flex-grow justify-evenly">
          <div className="flex space-x-8 whitespace-nowrap">
            {["Home", "Menu", "About", "Contact"].map((link) => (
              <Link
                key={link}
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium relative group py-2"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-80 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 z-50 -translate-y-1/2 text-orange-400 w-5 h-5 pointer-events-none" />
            <input
              type="search"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-orange-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Cart */}
          <button
            onClick={handleCartClick}
            className="relative text-orange-500 hover:text-orange-600 transition-colors p-2.5 rounded-xl hover:bg-orange-50 group"
            title="Cart"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Sign In */}
          <button
            onClick={handleSignInClick}
            className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition-all font-medium"
          >
            <User size={16} />
            <span className="hidden xl:block">Sign In</span>
          </button>

          {/* Sign Up */}
          <button
            onClick={handleSignUpClick}
            className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all font-medium shadow-lg"
          >
            <UserPlus size={16} />
            <span className="hidden xl:block">Sign Up</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-orange-600 hover:bg-orange-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-orange-100 shadow-lg rounded-b-2xl">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5 pointer-events-none" />
              <input
                type="search"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-orange-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white/80"
              />
            </div>

            {/* Nav links */}
            {["Home", "Menu", "About", "Contact"].map((link) => (
              <Link
                key={link}
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="block text-gray-700 hover:text-orange-600 transition-colors px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </Link>
            ))}

            {/* Cart */}
            <button
              onClick={() => {
                handleCartClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-orange-100 text-orange-600 rounded-xl font-medium hover:bg-orange-200 transition-colors"
            >
              <ShoppingCart size={20} />
              Cart ({totalItems})
            </button>

            {/* Sign In / Sign Up */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => {
                  handleSignInClick();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 text-center text-sm px-4 py-2.5 rounded-xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition-all font-medium"
              >
                <User size={16} />
                Sign In
              </button>
              <button
                onClick={() => {
                  handleSignUpClick();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 text-center text-sm px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all font-medium"
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
