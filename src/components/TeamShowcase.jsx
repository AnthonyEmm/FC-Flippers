import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TeamShowcase = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  // Get the current language
  const language = i18n.language || "en"; // Default to 'en' if not set

  const getLanguagePrefix = (path) => `/${language}${path}`;

  const fetchTeams = async () => {
    try {
      const response = await fetch("/src/TeamsShowcaseData/teams.json");
      const data = await response.json();
      const currentLang = i18n.language;

      // Map the fetched data to include translated titles and descriptions
      const teamsWithTranslations = data.teams.map((team) => ({
        ...team,
        title: team.title[currentLang], // Get the title based on the current language
        description: team.description[currentLang], // Get the description based on the current language
        alt: team.alt[currentLang], // Get the alt text based on the current language
      }));
      setTeams(teamsWithTranslations);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [i18n.language]); // Fetch teams whenever the language changes

  if (loading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-1
       gap-6 p-8 mt-20 font-custom cursor-pointer mb-4"
      >
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg
             shadow-lg bg-gray-300 animate-pulse h-80"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          md:grid-cols-1 gap-6 p-8 mt-20 font-custom cursor-pointer mb-16"
    >
      {teams.map((team) => (
        <Link key={team.id} to={getLanguagePrefix(team.link)}>
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={team.image}
              alt={team.alt} // Use the alt text based on the current language
              className="w-full h-80 object-cover transition-transform
               duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-50
               opacity-0 group-hover:opacity-100 transition-opacity 
              duration-500 flex items-center justify-center"
            >
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold uppercase text-yellow-400">
                  {team.title} {/* Translated title */}
                </h2>
                <p className="text-lg uppercase font-semibold">
                  {team.description}
                </p>{" "}
                {/* Translated description */}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TeamShowcase;
