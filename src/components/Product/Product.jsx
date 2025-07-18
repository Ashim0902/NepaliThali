import React, { useEffect, useState } from "react";
import Card from "./Card";
import productDataApi from "../../data/productData";

const Product = ({ searchQuery = "", onProductsLoad }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    productDataApi((fetchedData) => {
      setProducts(fetchedData);
      setLoading(false); // ✅ Turn off loading after data fetched
      onProductsLoad && onProductsLoad(fetchedData);
    });
  }, [onProductsLoad]);

  const filteredProducts = (products || []).filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="px-5 py-3">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Our Menu</h2>
          <span className="text-gray-600">{filteredProducts.length} items</span>
        </div>
        <div className="pt-24 flex flex-col items-center justify-center space-y-6 text-gray-700">
          <img
            className="h-20 w-20 animate-spin"
            src="/logo.png"
            alt="Loading"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Our Menu</h2>
        <span className="text-gray-600">{filteredProducts.length} items</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {filteredProducts.map((product) => (
          <Card key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
