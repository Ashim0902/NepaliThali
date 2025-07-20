import React from "react";
import { ArrowRight, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="m-3 md:m-7 rounded-2xl overflow-hidden relative">
      <div
        className="relative h-[500px] md:h-[700px] bg-cover bg-center flex items-center p-6 md:p-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('./bg.jpg')`,
        }}
      >
        <div className="relative z-10 max-w-4xl text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <Utensils className="text-yellow-400" size={24} />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wide">
              Authentic Nepali Cuisine
            </span>
          </div>

          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Order Your{" "}
            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
              Favorite Food
            </span>{" "}
            Here
          </h1>

          <p className="text-white/90 text-base md:text-lg font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8">
            Discover fresh, delicious meals and ingredients delivered right to
            your door. From farm-fresh produce to ready-to-eat favorites, we
            make ordering authentic Nepali food easy, fast, and affordable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl px-6 py-3 shadow-lg uppercase tracking-wide text-sm md:text-base">
              🎉 50% OFF First Order
            </div>

            <Link to="/menu">
              <button className="mb-4 sm:mb-0 cursor-pointer group bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl px-6 py-3 shadow-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 uppercase tracking-wide flex items-center gap-2">
                Order Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
