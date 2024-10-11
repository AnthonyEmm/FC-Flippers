import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sponsor from "../components/Sponsors";
import { motion } from "framer-motion"; // Animation library
import RelatedNews from "../components/RelatedNews";

const Matches = () => {
  const { t } = useTranslation();
  const [matches, setMatches] = useState({ played: [], upcoming: [] });

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch("/MatchesData/matchesData.json")
      .then((response) => response.json())
      .then((data) => setMatches(data))
      .catch((error) => console.error("Error fetching match data:", error));
  }, []);

  return (
    <div className="w-full py-8 px-4 md:px-8 font-custom bg-blue-50">
      <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold mb-8 text-left uppercase">
        {t("match.game")}
      </h2>
      {/* Upcoming Matches */}
      <div>
        <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold mt-6 mb-6">
          {t("match.upcoming")}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-blue-50 shadow-md rounded-lg table-auto">
            <thead>
              <tr className="bg-gray-800 text-yellow-400">
                <th className="p-4 text-left text-sm sm:text-lg">
                  {t("match.date")}
                </th>
                <th className="p-4 text-left text-sm sm:text-lg">
                  {t("match.opponent")}
                </th>
                <th className="p-4 text-left text-sm sm:text-lg">
                  {t("match.time")}
                </th>
                <th className="p-4 text-left text-sm sm:text-lg">
                  {t("match.aggregate")}
                </th>
              </tr>
            </thead>
            <tbody>
              {matches.upcoming.map((match, index) => (
                <motion.tr
                  key={index}
                  className="border-t transition-all duration-300 hover:bg-blue-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: index * 1 }}
                >
                  <td className="p-4 text-sm sm:text-md font-semibold">
                    {match.date}
                  </td>
                  <td className="p-4 flex items-center">
                    <img
                      src={match.opponentImage}
                      alt={match.opponent}
                      className="w-12 h-12 sm:w-20 sm:h-20 mr-2"
                    />
                    <span className="text-sm sm:text-md font-semibold">
                      {match.opponent}
                    </span>
                  </td>
                  <td className="p-4 text-sm sm:text-md font-semibold">
                    {match.time}
                  </td>
                  <td className="p-4 text-sm sm:text-md font-semibold">
                    {match.aggregate}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Played Matches */}
      <div className="mb-18">
        <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold mb-6 mt-8">
          {t("match.played")}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-blue-50 shadow-md rounded-lg table-auto">
            <thead>
              <tr className="bg-gray-800 text-yellow-400">
                <th className="p-4 text-left text-sm sm:text-lg">
                  {t("match.date")}
                </th>
                <th className="p-4 text-left text-sm sm:text-lg">
                  {t("match.opponent")}
                </th>
                <th className="p-4 text-left text-sm sm:text-lg">
                  {t("match.result")}
                </th>
                <th className="p-4 text-left text-sm sm:text-lg">
                  {t("match.aggregate")}
                </th>
              </tr>
            </thead>
            <tbody>
              {matches.played.map((match, index) => (
                <motion.tr
                  key={index}
                  className="border-t transition-all duration-300 hover:bg-blue-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 5, delay: index * 1 }}
                >
                  <td className="p-4 text-sm sm:text-md font-semibold">
                    {match.date}
                  </td>
                  <td className="p-4 flex items-center">
                    <img
                      src={match.opponentImage}
                      alt={match.opponent}
                      className="w-12 h-12 sm:w-20 sm:h-20 mr-2"
                    />
                    <span className="text-sm sm:text-md font-semibold">
                      {match.opponent}
                    </span>
                  </td>
                  <td className="p-4 text-sm sm:text-md font-semibold">
                    {match.score}
                  </td>
                  <td className="p-4 text-sm sm:text-md font-semibold">
                    {match.aggregate} {t("match.outcome")}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RelatedNews />
      <Sponsor />
    </div>
  );
};

export default Matches;
