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
      className="bg-gray-900 text-yellow-400 py-8 px-4 rounded-lg shadow-xl mt-16
      w-full max-w-4xl mx-auto font-custom"
      data-aos="zoom-out"
      data-aos-delay="500"
    >
      {/* Match Title */}
      <h1
        className="text-lg sm:text-2xl md:text-3xl lg:text-4xl 
        font-extrabold mb-8 uppercase text-yellow-400 text-center"
      >
        {t("countdown.count")}
      </h1>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* FC Flippers Section */}
        <div className="flex flex-col items-center w-full lg:w-1/3 text-center">
          <img
            src="/Flippers.png"
            alt={t("countdown.imageAlt")}
            className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36"
          />
          <h2 className="text-lg sm:text-xl font-bold mt-4">
            {t("countdown.flippers")}
          </h2>
        </div>

        {/* Game Score Section */}
        <div className="flex flex-col items-center w-full lg:w-1/3">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
            font-extrabold mb-4 uppercase text-yellow-400"
          >
            4 - 3
          </h1>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-300 text-center">
            {/* Scorers FC Flippers */}
            <div className="mb-4">
              <h3 className="font-bold text-yellow-400">
                {t("countdown.scorers")} ({t("countdown.flippers")}):
              </h3>
              <p>{t("countdown.pedro")} (36')</p>
              <p>{t("countdown.fred")} (48', 56')</p>
              <p>{t("countdown.junho")} (89')</p>
            </div>
            <hr className="w-1/2 mx-auto border-gray-700 mb-4" />
            {/* Scorers Golden Stars */}
            <div>
              <h3 className="font-bold text-yellow-400">
                {t("countdown.scorers")} ({t("countdown.golden")}):
              </h3>
              <p>{t("countdown.dmitry")} (19')</p>
              <p>{t("countdown.neeby")} (22')</p>
              <p>{t("countdown.fofana")} (64')</p>
            </div>
          </div>
        </div>

        {/* FC Golden Stars Section */}
        <div className="flex flex-col items-center w-full lg:w-1/3 text-center">
          <img
            src="/gold.png"
            alt={t("countdown.imageAlt2")}
            className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36"
          />
          <h2 className="text-lg sm:text-xl font-bold mt-4">
            {t("countdown.golden")}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
