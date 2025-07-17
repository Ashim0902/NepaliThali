import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getProducts, searchProducts } from "../../data/productData";
import { Loader2 } from "lucide-react";

const Product = ({
  searchQuery = "",
  onProductsLoad,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const transformedData = await getProducts();

        setProducts(transformedData);
        onProductsLoad && onProductsLoad(transformedData);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
        onProductsLoad && onProductsLoad([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [onProductsLoad]);

  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery, products);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-orange-500" size={48} />
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">
          {searchQuery
            ? `No results for "${searchQuery}"`
            : "No products available"}
        </p>
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
