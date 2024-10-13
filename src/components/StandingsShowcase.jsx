import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const StandingsShowcase = () => {
  const [teams, setTeams] = useState([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const getLanguagePrefix = () => {
    const language = window.localStorage.getItem("i18nextLng");
    return language ? `/${language}` : ""; // Return the language prefix or an empty string
  };

  useEffect(() => {
    // Fetch data from standings JSON
    const fetchData = async () => {
      try {
        const response = await fetch("/StandingsShowcaseData/showcase.json");
        const data = await response.json();
        setTeams(
          data[i18n.language]?.teams.slice(0, 5) ||
            data["en"].teams.slice(0, 5),
        ); // Get top 5 teams
      } catch (error) {
        console.error("Error fetching the standings data:", error);
      }
    };
    fetchData();
  }, [i18n.language]);

  const handleViewMore = () => {
    navigate(`${getLanguagePrefix()}/standings`);
  };

  return (
    <div className="w-full py-8 px-4 md:px-8 font-custom bg-blue-50">
      <h2
        className="text-2xl sm:text-xl md:text-3xl lg:text-3xl font-extrabold text-left mb-4 md:mb-4 
          font-custom uppercase"
      >
        {t("standings.top5title")}
      </h2>
      <ul className="space-y-4">
        {teams.map((team, index) => (
          <li
            key={team.id}
            className="flex items-center bg-blue-50 shadow-md p-4 rounded-lg"
          >
            <span className="text-lg font-bold mr-4">{index + 1}</span>
            <img src={team.image} alt={team.name} className="w-10 h-10 mr-4" />
            <div className="flex-1">
              <h3 className="text-md font-semibold truncate text-xl">
                {team.name}
              </h3>
              <p className="text-sm text-gray-800 font-medium">{`${t(
                "standings.points",
              )}: ${team.points}`}</p>
            </div>
            <div className="text-right font-medium">
              <p className="text-sm">{`${t("standings.played")}: ${
                team.played
              }`}</p>
              <p className="text-sm">{`${t("standings.won")}: ${team.won}`}</p>
              <p className="text-sm">{`${t("standings.gd")}: ${team.gd}`}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        <button
          onClick={handleViewMore}
          className="bg-cyan-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-950"
        >
          {t("standings.viewMore")}
        </button>
      </div>
    </div>
  );
};

export default StandingsShowcase;
