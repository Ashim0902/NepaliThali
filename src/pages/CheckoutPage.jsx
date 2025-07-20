import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const deliveryFee = 50;
  const finalTotal = totalPrice + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    alert(
      `Order placed successfully!\nPayment Method: ${
        paymentMethod === "cod" ? "Cash on Delivery" : "eSewa (Coming Soon)"
      }`
    );
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/menu")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-orange-600">
        Checkout
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-white w-full md:w-1/2 p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-6">Delivery Details</h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="98XXXXXXXX"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Delivery location"
              rows={4}
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">Payment Method *</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="cursor-pointer"
              />
              <span className="font-medium">Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 text-gray-400 cursor-not-allowed">
              <input type="radio" name="paymentMethod" value="esewa" disabled />
              <span>eSewa (Coming Soon)</span>
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition"
          >
            Place Order
          </button>
        </div>

        <div className="bg-white w-full md:w-1/2 p-6 sm:p-8 rounded-xl shadow-md border">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <ul className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">
                  Rs. {item.caloriesPerServing * item.quantity}
                </p>
              </li>
            ))}
          </ul>

          <div className="border-t mt-6 pt-4 text-sm sm:text-base text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-orange-600">
              <span>Total</span>
              <span>Rs. {finalTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
