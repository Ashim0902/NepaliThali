import React from "react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/Modal/ConfirmModal";

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(full)].map((_, i) => (
        <AiFillStar key={i} className="text-yellow-400" />
      ))}
      {half && <FaStarHalfAlt className="text-yellow-400" />}
      {[...Array(empty)].map((_, i) => (
        <AiOutlineStar key={i + full + 1} className="text-yellow-400" />
      ))}
    </div>
  );
};

const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    type: "warning"
  });

  const handleQuantityDecrease = (item) => {
    if (item.quantity === 1) {
      setConfirmModal({
        isOpen: true,
        title: "Remove Item",
        message: `Are you sure you want to remove "${item.name}" from your cart?`,
        onConfirm: () => updateQuantity(item.id, item.quantity - 1),
        type: "warning"
      });
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemoveItem = (item) => {
    setConfirmModal({
      isOpen: true,
      title: "Remove Item",
      message: `Are you sure you want to remove "${item.name}" from your cart? This action cannot be undone.`,
      onConfirm: () => removeFromCart(item.id),
      type: "danger"
    });
  };

  const handleClearCart = () => {
    setConfirmModal({
      isOpen: true,
      title: "Clear Cart",
      message: `Are you sure you want to remove all ${totalItems} items from your cart? This action cannot be undone.`,
      onConfirm: () => clearCart(),
      type: "danger"
    });
  };

  const closeModal = () => {
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  if (items.length === 0) {
    return (
      <div className="h-120 max-w-4xl mx-auto mt-24 p-4 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any delicious items to your cart yet.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-24 p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Your Cart</h1>
              <p className="text-orange-100">{totalItems} items in your cart</p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Cart Items */}
        <div className="p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <StarRating rating={item.rating} />
                  <p className="text-sm text-gray-600">
                    {item.mealType.join(", ")}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityDecrease(item)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <p className="font-bold text-gray-800">
                    Rs. {(item.caloriesPerServing * item.quantity)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-800">
                Total Price:
              </span>
              <span className="text-2xl font-bold text-orange-600">
                Rs. {totalPrice}
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClearCart}
                className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Clear Cart
              </button>

              <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        confirmText={confirmModal.type === "danger" ? "Delete" : "Remove"}
        cancelText="Cancel"
      />
    </div>
  );
};

export default CartPage;
