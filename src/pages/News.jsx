import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import AOS from "aos";
import "aos/dist/aos.css";
import Sponsors from "../components/Sponsors";
import { Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const SkeletonCard = () => (
  <div className="relative overflow-hidden rounded-lg shadow-lg animate-pulse">
    <div className="bg-gray-300 h-48 sm:h-56 lg:h-64 w-full" />
    <div
      className="absolute inset-0 bg-black bg-opacity-50 opacity-0
     hover:opacity-100 transition-opacity duration-500 flex flex-col 
     justify-center items-center p-4"
    >
      <div className="bg-gray-400 h-6 w-3/4 mb-2" />
      <div className="bg-gray-400 h-4 w-5/6 mb-4" />
      <div className="bg-gray-400 h-6 w-1/2" />
    </div>
  </div>
);

const News = () => {
  const { t, i18n } = useTranslation(); // Extract i18n
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [sortOption, setSortOption] = useState("mostRecent"); // State to manage sort option

  const language = i18n.language || "en"; // Get current language
  const getLanguagePrefix = (path) => `/${language}${path}`; // Function to add language prefix

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  const newsItems = [
    {
      id: 1,
      title: t("news.breakingNewsTitle"),
      image: "/Coach.webp",
      description: t("news.breakingNewsDescription"),
      link: "/news/2024-2025-academy-registration",
    },
    {
      id: 2,
      title: t("news.womensTeamTitle"),
      image: "/flippers-women.webp",
      description: t("news.womensTeamDescription"),
      link: "/news/womens-team-update/major-changes-to-our-female-squad",
    },
    {
      id: 3,
      title: t("news.matchUpdatesTitle"),
      image: "/game1.webp",
      description: t("news.matchUpdatesDescription"),
      link: "/matches",
    },
    {
      id: 4,
      title: t("news.getToKnowOurClubTitle"),
      image: "/Flippers.png",
      description: t("news.getToKnowOurClubDescription"),
      link: "/about-us",
    },
    {
      id: 5,
      title: t("news.derbyMatch"),
      image: "/derby2.webp",
      description: t("news.derbyDescription"),
      link: "/news/clash-of-the-derby-2024-2025",
    },
    {
      id: 6,
      title: t("news.dennisMolembeTitle"),
      image: "/injury.webp",
      description: t("news.dennisMolembeDescription"),
      link: "/news/dennis-molembe-injury-update",
    },
    {
      id: 7,
      title: t("news.announcement"),
      image: "/men13.jpg",
      description: t("news.playerOfTheMonth"),
      link: "/news/fred-sommer-player-of-the-month",
    },
    {
      id: 8,
      title: t("news.youthWin"),
      image: "/pic_slide.jpg",
      description: t("news.tournament"),
      link: "/news/u17-team-wins-first-match",
    },
    {
      id: 9,
      title: t("news.coachingCourse"),
      image: "/tactics-board.webp",
      description: t("news.body"),
      link: "/news/fc-flippers-announces-coaching-course",
    },
    {
      id: 10,
      title: t("news.knightsGame"),
      image: "/pic_slide2.webp",
      description: t("news.knightsInfo"),
      link: "/news/recap-of-fc-knights-game",
    },
    {
      id: 11,
      title: t("news.youthInfo"),
      image: "/flippers.jpg",
      description: t("news.youth"),
      link: "/news/youth-team-wins-4-team-tournament-2024",
    },
    {
      id: 12,
      title: t("news.womensGame"),
      image: "/girls-game.jpg",
      description: t("news.womensDescr"),
      link: "/news/fc-flippers-women-suffer-defeat-against-brennan-fc-womens-team",
    },
  ];

  // Sorting logic
  const sortNewsItems = (items) => {
    switch (sortOption) {
      case "oldestNews":
        return items; // Assuming newsItems is already in order of most recent
      case "recentNews":
        return [...items].reverse(); // Reverse the array to show oldest first
      case "title":
        return [...items].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return items;
    }
  };

  // Apply search filter and sorting
  const filteredAndSortedNewsItems = sortNewsItems(
    newsItems.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }),
  );

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 bg-blue-50">
      <h1
        className="text-3xl sm:text-xl md:text-3xl lg:text-4xl font-extrabold 
        text-left font-custom uppercase mt-2"
        data-aos="flip-down"
        data-aos-delay="500"
      >
        {t("news.latest")}
      </h1>
      {/* Search Bar with Icon and Clear Button */}
      <div className="flex justify-end items-center relative mb-4 font-custom">
        <button onClick={toggleSearch} className="focus:outline-none">
          {isSearchOpen ? (
            <FiX
              className="text-2xl sm:text-3xl text-gray-600"
              data-tooltip-id={t("toolTip.close")}
              data-tooltip-content={t("toolTip.close")}
            />
          ) : (
            <FiSearch
              className="text-2xl sm:text-3xl text-gray-600"
              data-tooltip-id={t("toolTip.open")}
              data-tooltip-content={t("toolTip.open")}
            />
          )}
          <Tooltip
            id={t("toolTip.open")}
            place="bottom"
            style={{ backgroundColor: "rgb(31 41 55)" }}
          />
          <Tooltip
            id={t("toolTip.close")}
            place="top"
            style={{ backgroundColor: "rgb(31 41 55)" }}
          />
        </button>

        {/* Animated Search Input */}
        <div className="relative ml-2">
          <input
            type="text"
            placeholder={t("searchNews.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`transition-width duration-1000 ease-in-out border-b-2 border-gray-200
              p-4 focus:outline-none ${
                isSearchOpen ? "w-[80vw] sm:w-[80vw] md:w-[500px]" : "w-0"
              }`}
            style={{
              visibility: isSearchOpen ? "visible" : "hidden",
            }}
          />
          {/* Clear Button */}
          {searchTerm && isSearchOpen && (
            <FiX
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer 
              text-gray-700 bg-gray-200 rounded-full"
              onClick={clearSearch}
            />
          )}
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4 font-custom flex justify-start items-start">
        <label htmlFor="sort" className="mr-2 font-bold text-xl">
          {t("news.sortBy")}:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-200 rounded-md outline-none"
        >
          <option value="" className="text-gray-500 font-custom">
            {t("news.choose")}
          </option>
          <option value="oldestNews" className="font-custom">
            {t("news.oldest")}
          </option>
          <option value="recentNews" className="font-custom">
            {t("news.recent")}
          </option>
          <option value="title" className="font-custom">
            {t("news.titleAlphabetical")}
          </option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 font-custom mb-10 w-full">
        {loading ? (
          // Render skeletons if loading
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          <>
            {filteredAndSortedNewsItems.length === 0 && searchTerm && (
              <div className="col-span-full text-center text-red-600 text-xl font-semibold uppercase">
                {t("search.noResults")}
              </div>
            )}
            {filteredAndSortedNewsItems.map((item, index) => (
              <div
                key={item.id}
                className={`relative overflow-hidden rounded-lg shadow-lg ${
                  index === 0 || index === 5 ? "lg:col-span-2" : "lg:col-span-1"
                }`}
                data-aos="fade-up"
                data-aos-delay={`${100 * (index + 1)}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 
                    transition-opacity duration-500 flex flex-col justify-center items-center p-4"
                >
                  <h2 className="text-yellow-400 text-xl sm:text-2xl lg:text-3xl font-bold mb-4 uppercase text-center">
                    {item.title}
                  </h2>
                  <p className="text-white text-center text-sm sm:text-base lg:text-lg px-2 lg:px-4 mb-4">
                    {item.description}
                  </p>
                  <Link
                    to={getLanguagePrefix(item.link)} // Use language prefix here
                    className="text-white font-bold hover:text-yellow-400 text-sm sm:text-lg lg:text-xl"
                  >
                    {t("explore.read")}...
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Sponsors />
    </div>
  );
};

export default News;
