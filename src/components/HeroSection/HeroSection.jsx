import React from "react";
import { ArrowRight, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="m-3 md:m-7 rounded-2xl overflow-hidden relative">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/bgVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Hero Content */}
      <div className="relative h-[500px] md:h-[700px] flex items-center p-6 md:p-10 z-10">
        <div className="relative max-w-4xl text-center md:text-left mx-auto">
          {/* Tagline */}
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <Utensils className="text-yellow-400" size={24} />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wide">
              Authentic Nepali Cuisine
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Order Your{" "}
            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
              Favorite Food
            </span>{" "}
            Here
          </h1>

          {/* Description */}
          <p className="text-white/90 text-base sm:text-lg font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8">
            Discover fresh, delicious meals and ingredients delivered right to
            your door. From farm-fresh produce to ready-to-eat favorites, we
            make ordering authentic Nepali food easy, fast, and affordable.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl px-6 py-3 shadow-lg uppercase tracking-wide text-sm md:text-base">
              🎉 50% OFF First Order
            </div>

            <Link to="/menu" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto mb-2 sm:mb-0 cursor-pointer group bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl px-6 py-3 shadow-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-2">
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
