import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Sponsors from "../components/Sponsors";

const Standings = () => {
  const [teams, setTeams] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/StandingsData/standings.json");
        const data = await response.json();
        setTeams(data[i18n.language]?.teams || data["en"].teams);
      } catch (error) {
        console.error("Error fetching the standings data:", error);
      }
    };
    fetchData();
  }, [i18n.language]);

  return (
    <div className="w-full py-8 px-4 md:px-8 font-custom bg-blue-50">
      <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold mb-8 text-left uppercase mt-4">
        {t("standings.title")}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-blue-50 shadow-md rounded-lg table-auto">
          <thead>
            <tr className="bg-gray-800 text-yellow-400">
              <th className="px-3 py-4 text-left text-xs sm:text-sm md:text-lg">
                <span className="block sm:hidden">
                  {t("standings.positionShort")}
                </span>
                <span className="hidden sm:block">
                  {t("standings.position")}
                </span>
              </th>
              <th className="px-2 py-3 text-left text-xs sm:text-sm md:text-lg">
                <span className="block sm:hidden">{t("standings.team")}</span>
                <span className="hidden sm:block">{t("standings.team")}</span>
              </th>
              {[
                "played",
                "won",
                "drawn",
                "lost",
                "gf",
                "ga",
                "gd",
                "points",
              ].map((key) => (
                <th
                  key={key}
                  className="px-2 py-3 text-left text-xs sm:text-sm md:text-lg"
                >
                  {t(`standings.${key}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr
                key={team.id}
                className={`hover:bg-blue-100 font-medium ${
                  index % 2 === 0 ? "" : ""
                }`}
              >
                <td className="border px-2 py-2 text-xs sm:text-sm md:text-lg">
                  {index + 1}
                </td>
                <td className="border px-2 py-2 text-xs sm:text-sm md:text-lg flex items-center">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 mr-2"
                  />
                  <span className="truncate max-w-[80px] sm:max-w-[150px] md:max-w-none">
                    {team.name}
                  </span>
                </td>
                {[
                  "played",
                  "won",
                  "drawn",
                  "lost",
                  "gf",
                  "ga",
                  "gd",
                  "points",
                ].map((key) => (
                  <td
                    key={key}
                    className="border px-2 py-2 text-xs sm:text-sm md:text-lg font-medium"
                  >
                    {team[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Sponsors />
    </div>
  );
};

export default Standings;
