import React, { useState } from "react";
import { Star, Clock, Eye } from "lucide-react";
import AddToCart from "../Button/AddToCart";
import ProductModal from "../Modal/ProductModal";

const Card = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={14}
            className={`${
              index < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden w-full max-w-sm transform hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-white transition-colors"
            >
              <Eye size={16} />
              Quick View
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
              {data.category}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-orange-500 uppercase font-semibold tracking-wide">
              {data.mealType[0]}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={12} />
              {data.cookingTime}
            </div>
          </div>

          <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
            {data.name}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 min-h-[2.5rem]">
            {data.description}
          </p>

          <StarRating rating={data.rating} />

          <div className="flex justify-between items-center pt-2">
            <div className="text-lg font-bold text-green-600">
              Rs. {data.caloriesPerServing}
            </div>
            <AddToCart product={data} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <ProductModal data={data} setShowModal={setShowModal} />}
    </>
  );
};

export default Card;
