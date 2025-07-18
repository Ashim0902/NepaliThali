import React, { useEffect, useState } from "react";
import Card from "./Card";
import productDataApi from "../../data/productData"; // ✅ correct import

const Product = ({ searchQuery = "", onProductsLoad }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productDataApi((fetchedData) => {
      setProducts(fetchedData);
      onProductsLoad && onProductsLoad(fetchedData);
    });
  }, [onProductsLoad]);

  const filteredProducts = (products || []).filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center text-gray-600">
        No matching items found.
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
