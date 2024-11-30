import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const Countdown = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      className="bg-gray-800 text-white text-center py-6 px-4 rounded-lg shadow-lg mt-16
      flex flex-col items-center w-full max-w-4xl mx-auto lg:flex-row lg:justify-between font-custom"
      data-aos="zoom-out"
      data-aos-delay="500"
    >
      {/* Countdown Title at the Top */}
      <h1
        className="text-2xl sm:text-5xl md:text-5xl lg:text-6xl 
        font-extrabold mb-6 uppercase text-yellow-400 w-full"
      >
        {t("countdown.count")}
      </h1>

      {/* FC Flippers Logo */}
      <div className="flex items-center justify-center w-1/3 lg:w-1/4 mb-4 lg:mb-0">
        <img
          src="/Flippers.png"
          alt={t("countdown.imageAlt")}
          className="mx-auto w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36"
        />
      </div>

      {/* Game Score */}
      <div className="w-full lg:w-1/2 text-center mb-6 lg:mb-0">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl 
          font-extrabold mb-2 sm:mb-4 uppercase text-yellow-400"
        >
          4 : 3
        </h1>
      </div>

      {/* FC Golden Stars Logo */}
      <div className="flex items-center justify-center w-1/3 lg:w-1/4">
        <img
          src="/gold.png"
          alt={t("countdown.imageAlt2")}
          className="mx-auto w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36"
        />
      </div>
    </div>
  );
};

export default Countdown;
