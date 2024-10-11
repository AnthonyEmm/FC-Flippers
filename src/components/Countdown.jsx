import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const Countdown = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-11-30T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div
      className="bg-gray-800 text-white text-center py-6 px-4 rounded-lg shadow-lg mt-16
      flex flex-col items-center w-full max-w-4xl mx-auto lg:flex-row lg:justify-between font-custom"
      data-aos="zoom-out"
      data-aos-delay="500"
    >
      {/* FC Flippers Logo */}
      <div className="w-1/3 lg:w-1/4 mb-4 lg:mb-0">
        <img
          src="/Flippers.png"
          alt={t("countdown.imageAlt")}
          className="mx-auto w-24 h-24 sm:w-38 sm:h-44 md:w-40 md:h-38  lg:w-48 lg:h-40"
        />
      </div>

      {/* Countdown Timer */}
      <div className="w-full lg:w-2/4 text-center mb-6 lg:mb-0">
        <h1
          className="text-2xl sm:text-5xl md:text-5xl lg:text-6xl 
        font-extrabold mb-2 sm:mb-4 uppercase text-yellow-400"
        >
          {t("countdown.count")}
        </h1>
        <h2 className="text-lg sm:text-xl mb-4 sm:mb-6 font-semibold">
          {t("countdown.clubLogo")}
        </h2>
        <div className="flex justify-center space-x-4">
          <div className="flex flex-col items-center">
            <span
              className="text-5xl sm:text-5xl lg:text-6xl 
            md:text-6xl font-bold text-yellow-400"
            >
              {timeLeft.days || "0"}
            </span>
            <span className="text-xs sm:text-lg uppercase font-bold">
              {t("countdown.days")}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span
              className="text-5xl sm:text-5xl lg:text-6xl 
            md:text-6xl font-bold text-yellow-400"
            >
              {timeLeft.hours || "0"}
            </span>
            <span className="text-xs sm:text-lg uppercase font-bold">
              {" "}
              {t("countdown.hours")}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span
              className="text-5xl sm:text-5xl lg:text-6xl 
            md:text-6xl font-bold text-yellow-400"
            >
              {timeLeft.minutes || "0"}
            </span>
            <span className="text-xs sm:text-lg uppercase font-bold">
              {" "}
              {t("countdown.minutes")}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span
              className="text-5xl sm:text-5xl lg:text-6xl 
            md:text-6xl font-bold text-yellow-400"
            >
              {timeLeft.seconds || "0"}
            </span>
            <span className="text-xs sm:text-lg uppercase font-bold">
              {" "}
              {t("countdown.seconds")}
            </span>
          </div>
        </div>
        <p className="mt-4 text-base sm:text-lg font-medium">
          {t("countdown.date")}
        </p>
        <p className="mt-4 text-2xl sm:text-xl font-bold text-yellow-400">
          {t("countdown.time")}
        </p>
      </div>

      {/* FC Golden Stars Logo */}
      <div className="w-1/3 lg:w-1/4">
        <img
          src="/gold.png"
          alt={t("countdown.imageAlt2")}
          className="mx-auto w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40"
        />
      </div>
    </div>
  );
};

export default Countdown;
