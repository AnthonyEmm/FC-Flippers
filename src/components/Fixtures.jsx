import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Fixtures = () => {
  const { t, i18n } = useTranslation();
  const [matches, setMatches] = useState({ played: [], upcoming: [] });
  const [loading, setLoading] = useState(true);

  // Get the current language
  const language = i18n.language || "en"; // Default to 'en' if not set

  const getLanguagePrefix = (path) => `/${language}${path}`;

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch("/FixturesData/fixturesData.json");
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error loading fixtures:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFixtures();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8 mt-20 font-custom">
        <h2
          className="text-3xl sm:text-xl md:text-3xl lg:text-4xl font-bold text-left mb-4 md:mb-8 font-custom 
        uppercase animate-pulse"
        >
          {t("match.played")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="relative bg-gray-300 rounded-lg shadow-lg p-6 flex flex-col items-center h-40 animate-pulse"
            >
              <div className="w-24 h-24 bg-gray-400 mb-4 rounded-full"></div>
              <div className="w-3/4 h-6 bg-gray-400 mb-2 rounded"></div>
              <div className="w-1/2 h-6 bg-gray-400 mb-1 rounded"></div>
              <div className="w-1/3 h-6 bg-gray-400 rounded"></div>
            </div>
          ))}
        </div>

        <h2
          className="text-2xl sm:text-xl md:text-3xl lg:text-3xl font-bold text-left mb-4 md:mb-8 font-custom 
            uppercase mt-8 animate-pulse"
        >
          {t("match.upcoming")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="relative bg-blue-300 rounded-lg shadow-lg p-6 flex flex-col items-center h-40 animate-pulse"
            >
              <div className="w-24 h-24 bg-gray-400 mb-4 rounded-full"></div>
              <div className="w-3/4 h-6 bg-gray-400 mb-2 rounded"></div>
              <div className="w-1/2 h-6 bg-gray-400 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 mt-16 font-custom">
      {/* Upcoming Matches */}
      <h2
        className="text-2xl sm:text-xl md:text-3xl lg:text-3xl font-extrabold text-left mb-4 
        md:mb-8 font-custom uppercase mt-6"
      >
        {t("match.upcoming")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {matches.upcoming.map((match, index) => (
          <div
            key={index}
            className="relative bg-blue-100 rounded-lg shadow-lg p-6 flex flex-col items-center transform 
            transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={match.opponentImage}
              alt={match.opponent}
              className="w-24 h-24 mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{match.opponent}</h3>
            <p className="text-gray-500 mb-1 font-custom font-semibold">
              {match.date}
            </p>
            <p className="text-gray-700 font-custom font-semibold">
              {match.time}
            </p>

            {/* Centered Button with Shadow */}
            <Link
              to={getLanguagePrefix("/matches")}
              className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 
              hover:opacity-100"
            >
              <button className="bg-cyan-950 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                {t("fixture.game")}
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Played Matches */}
      <h2
        className="text-2xl sm:text-xl md:text-3xl lg:text-3xl font-extrabold text-left
       mb-4 md:mb-8 font-custom uppercase mt-8"
      >
        {t("match.played")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {matches.played.map((match, index) => (
          <div
            key={index}
            className="relative bg-blue-100 rounded-lg shadow-lg p-6 flex flex-col items-center transform 
            transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={match.opponentImage}
              alt={match.opponent}
              className="w-24 h-24 mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{match.opponent}</h3>
            <p className="text-gray-500 mb-1 font-custom font-semibold">
              {match.date}
            </p>
            <p className="text-gray-700 mb-2 font-custom font-semibold">
              {match.score}
            </p>
            <span className="py-1 px-3 rounded-full text-sm font-bold bg-green-300 text-green-800">
              {t("match.outcome")}
            </span>
            <Link
              to={getLanguagePrefix("/matches")}
              className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100"
            >
              <button className="bg-cyan-950 text-white font-bold py-2 px-4 rounded-lg shadow-xl">
                {t("fixture.game")}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures;
