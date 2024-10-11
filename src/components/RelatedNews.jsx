import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const RelatedNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [titles, setTitles] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  // Get the current language
  const language = i18n.language || "en"; // Default to 'en' if not set

  const getLanguagePrefix = (path) => `/${language}${path}`;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    fetch("/RelatedNewsData/relatedNews.json")
      .then((response) => response.json())
      .then((data) => setNewsItems(data))
      .catch((error) => console.error("Error fetching news items:", error));

    fetch("/src/RelatedNewsTitleData/titles.json")
      .then((response) => response.json())
      .then((data) => setTitles(data))
      .catch((error) => console.error("Error fetching titles:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000);
    return () => clearInterval(interval);
  }, [newsItems]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 mt-24 font-custom">
      <h2
        className="text-3xl font-extrabold mb-4 text-left uppercase hidden md:block"
        data-aos="fade-in"
        data-aos-delay="500"
      >
        {t("relatedNews.related")}
      </h2>
      <div className="relative items-center justify-center hidden md:flex">
        <button
          onClick={handlePrevClick}
          className="absolute left-0 top-1/2 transform -translate-y-1/2
             text-yellow-400 hover:text-white p-2 rounded-full focus:outline-none z-20"
        >
          &#9664;
        </button>
        <div className="overflow-hidden w-full max-w-7xl">
          <div
            className="flex transition-transform ease-in-out duration-500"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / newsItems.length)
              }%)`,
            }}
          >
            {newsItems.map((item) => {
              // Get the title in the user's current language
              const currentLang = i18n.language.slice(0, 2); // Get the current language (e.g., "en", "de", "fr")
              const translatedTitle =
                titles[item.id]?.[currentLang] || titles[item.id]?.["en"]; // Fallback to English if no translation exists

              return (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-2/5 lg:w-1/4 p-2"
                >
                  <div
                    className="bg-white border rounded-lg shadow-lg overflow-hidden cursor-pointer 
                    transition-transform transform hover:scale-105"
                    onClick={() =>
                      handleCardClick(getLanguagePrefix(item.link))
                    }
                  >
                    <img
                      src={item.imageUrl}
                      alt={translatedTitle}
                      className="w-full h-80 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold uppercase text-left">
                        {translatedTitle}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 transform -translate-y-1/2
             text-yellow-400 hover:text-white p-2 rounded-full focus:outline-none"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default RelatedNews;
