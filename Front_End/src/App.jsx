import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import Categories from "./components/Categories/Categories";
import Product from "./components/Product/Product";
import CartPage from "./pages/CartPage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { CartProvider } from "./context/CartContext";
import { scrollToTopInstant } from "./utils/scrollToTop";
import { SearchProvider } from "./context/SearchContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTopInstant();
  }, [pathname]);

  return null;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleRightClick);
    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when changing category
  };

  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <ScrollToTop />
          <div className="bg-gray-50 mt-20">
            <NavBar onSearch={handleSearch} />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HeroSection />
                      <Categories
                        onCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory}
                      />
                      <Product
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                        onProductsLoad={setProducts}
                      />
                    </>
                  }
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </Router>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
