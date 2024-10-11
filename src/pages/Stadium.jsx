import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "aos/dist/aos.css";
import AOS from "aos";
import { Tooltip } from "react-tooltip";
import Sponsor from "../components/Sponsors";
import MembershipForm from "../components/MembershipForm";

const SkeletonCard = () => (
  <div className="relative bg-gray-300 animate-pulse rounded-lg shadow-lg overflow-hidden">
    <div className="h-56 sm:h-72 lg:h-80 w-full" />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-left px-4">
      <div className="bg-gray-400 h-6 w-3/4 mb-2" />
      <div className="bg-gray-400 h-4 w-5/6" />
    </div>
  </div>
);

const Stadium = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  const gridItems = [
    {
      id: 1,
      title: t("cards.vip.title"),
      description: t("cards.vip.description"),
      image: "/pic_slide2.webp",
    },
    {
      id: 2,
      title: t("cards.training.title"),
      description: t("cards.training.description"),
      image: "/training.jpg",
    },
    {
      id: 3,
      title: t("cards.fanzone.title"),
      description: t("cards.fanzone.description"),
      image: "/fanzone.png",
    },
    {
      id: 4,
      title: t("cards.press.title"),
      description: t("cards.press.description"),
      image: "/Press.jpg",
    },
  ];

  return (
    <div className="w-full font-custom bg-blue-50">
      {/* Stadium Image */}
      <div className="relative w-full h-72 sm:h-96 md:h-[40vh] lg:h-screen">
        <img
          src="/Stad.webp"
          alt="Stadium"
          className="w-full h-full object-cover object-center"
          style={{ margin: 0 }}
        />
      </div>

      {/* Animated Scroll Down Icon */}
      <div
        className="absolute bottom-14 sm:bottom-8 md:bottom-8 left-1/2 
      transform -translate-x-1/2 font-custom hidden lg:block"
      >
        <div
          className="animate-bounce cursor-pointer"
          data-tooltip-id="scrollDownTooltip"
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <Tooltip
          id="scrollDownTooltip"
          place="top"
          style={{ backgroundColor: "rgb(31 41 55)" }}
        >
          {t("scroll.toDown")}
        </Tooltip>
      </div>

      {/* Stadium Description */}
      <div className="py-4 sm:py-6 mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center font-custom mb-4 sm:mb-8 uppercase mt-6">
          {t("stadium.pitch")}
        </h1>
        <p
          className="text-base sm:text-lg text-center text-gray-700 max-w-full 
      sm:max-w-2xl mx-auto font-custom font-medium"
          data-aos="flip-down"
          data-aos-delay="500"
        >
          {t("ourstadium.text1")}
        </p>
      </div>

      {/* Grid Section with 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-10">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : gridItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-cover bg-center rounded-lg shadow-lg overflow-hidden group"
                style={{
                  backgroundImage: `url(${item.image})`,
                  height: "280px",
                }}
              >
                <div
                  className="absolute inset-0 bg-black bg-opacity-50
              group-hover:bg-opacity-75 transition duration-300"
                ></div>
                <div
                  className="absolute inset-0 flex flex-col items-center
              justify-center text-left px-4"
                >
                  <h2
                    className="text-xl sm:text-2xl md:text-3xl font-bold
                text-white mb-2 group-hover:text-yellow-400 transition duration-300 uppercase"
                  >
                    {item.title}
                  </h2>
                  <p
                    className="text-sm sm:text-base md:text-lg text-gray-200
                group-hover:text-gray-100 transition duration-300 text-center"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
      </div>

      <MembershipForm />
      <Sponsor />
    </div>
  );
};

export default Stadium;
