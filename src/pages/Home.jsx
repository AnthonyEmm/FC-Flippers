import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Sponsors from "../components/Sponsors";
import Fixtures from "../components/Fixtures";
import TeamShowcase from "../components/TeamShowcase";
import VideoShowcase from "../components/VideoShowcase";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import TournamentHonors from "../components/TournamentHonors";
import Countdown from "../components/Countdown";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [images, setImages] = useState([]);
  const [cardImages, setCardImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the current language
  const language = i18n.language || "en"; // Default to 'en' if not set

  const getLanguagePrefix = (path) => `/${language}${path}`;

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/HomeImagesData/images.json");
        const data = await response.json();
        setImages(data.images);
        setCardImages(data.cardImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // Show 3 images at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  const renderImageCards = () => {
    return loading
      ? Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-300 h-60 sm:h-72 md:h-80 lg:h-96"
          ></div>
        ))
      : cardImages.map((card, index) => (
          <Link
            to={getLanguagePrefix("/news")}
            key={index}
            className="group block relative"
          >
            <img
              src={card.src}
              alt={t("cardImages.cardAlt")}
              loading="lazy"
              className="w-full h-60 sm:h-72 md:h-80 lg:h-96 px-2 py-2 object-cover
                shadow-lg transition-transform transform group-hover:scale-104
                 group-hover:bg-blue-300 rounded-xl"
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-black
             bg-opacity-55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
            >
              <button className="px-4 py-2 bg-transparent text-white font-bold rounded-lg hover:bg-transparent">
                <span className="text-yellow-400 font-bold text-lg sm:text-xl md:text-2xl font-custom">
                  {t("explore.read")}
                </span>
              </button>
            </div>
          </Link>
        ));
  };

  return (
    <div className="px-4 md:px-8 bg-blue-50">
      {/* Image Slider */}
      <div className="absoluteoverflow-hidden w-full">
        {loading ? (
          <div
            className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[85vh] animate-pulse
            bg-gray-300 rounded-lg"
          ></div>
        ) : (
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className="relative group w-full">
                <img
                  src={image.src}
                  alt={image.alt[i18n.language]}
                  loading="lazy"
                  className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[85vh] object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100
                  transition-opacity duration-500 bg-black bg-opacity-50 w-full text-left font-custom"
                >
                  {/* Title */}
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-white uppercase">
                    {image.title[i18n.language]}
                  </h2>

                  {/* Description */}
                  <p className="mt-1 text-xs sm:text-sm md:text-base lg:text-lg text-yellow-400 font-bold">
                    {image.description[i18n.language]}
                  </p>

                  {/* Button */}
                  <Link
                    to={getLanguagePrefix(image.link)}
                    className="inline-block mt-2"
                  >
                    <button
                      className="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-3 
                    bg-cyan-950 text-white font-bold rounded-lg text-xs sm:text-sm md:text-base lg:text-lg"
                    >
                      {t("explore.learn")}
                    </button>
                  </Link>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 font-custom hidden lg:block">
                  <div
                    className="animate-bounce cursor-pointer"
                    data-tooltip-id="scrollDownTooltip" // Tooltip ID
                  >
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600"
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

                  {/* Tooltip component */}
                  <Tooltip
                    id="scrollDownTooltip"
                    place="top"
                    style={{ backgroundColor: "rgb(31 41 55)" }} // gray-800 background color
                  >
                    {t("scroll.toDown")}
                  </Tooltip>
                </div>
              </div>
            ))}
          </Slider>
        )}
        <h1
          className="text-3xl sm:text-xl md:text-3xl lg:text-4xl font-extrabold 
          font-custom text-center uppercase mt-10 md:mt-16"
        >
          {t("home.welcome")}
        </h1>
      </div>
      <Countdown />
      {/* Image Cards Section */}
      <div className="mt-10 sm:mt-24 lg:mt-36">
        <h2
          className="text-2xl sm:text-xl md:text-3xl lg:text-3xl font-extrabold text-left mb-4 md:mb-4 
          font-custom uppercase"
        >
          {t("news.latest")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {renderImageCards()}
        </div>
      </div>
      <Fixtures />
      <TeamShowcase />
      <VideoShowcase />
      <TournamentHonors />
      <FAQ />
      <Newsletter />
      <Sponsors />
    </div>
  );
};

export default Home;
