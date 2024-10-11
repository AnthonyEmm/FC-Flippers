import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import TrainingSchedule from "../components/TrainingSchedule";
import Sponsors from "../components/Sponsors";

const SkeletonCard = () => (
  <div className="relative overflow-hidden rounded-lg shadow-lg animate-pulse">
    <div className="bg-gray-300 h-64 w-full rounded-lg" />
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0">
      <span className="bg-gray-400 text-3xl font-bold text-center h-8 w-32 rounded" />
    </div>
  </div>
);

const Team = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  // Get the current language
  const language = i18n.language || "en"; // Default to 'en' if not set

  const getLanguagePrefix = (path) => `/${language}${path}`;

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    // Simulate data loading
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="w-full bg-blue-50">
      {/* Ensure bg-blue-50 takes the full width */}
      <div className="container mx-auto py-10 px-8">
        <h1
          className="text-3xl sm:text-xl md:text-3xl lg:text-4xl 
          font-extrabold text-left mb-4 font-custom uppercase"
          data-aos="fade-in"
          data-aos-delay="500"
        >
          {t("team.roster")}
        </h1>

        <div
          className="grid grid-cols-1 md:grid-cols-1 
        lg:grid-cols-3 gap-4 font-custom"
        >
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              {/* Men's Team */}
              <Link
                to={getLanguagePrefix("/team/mens")}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/male_team.jpg"
                    alt="Men's Team"
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black 
                  bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-yellow-400 text-3xl font-bold text-center">
                      {t("teams.men")}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Women's Team */}
              <Link
                to={getLanguagePrefix("/team/womens")}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/female.jpg"
                    alt="Women's Team"
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black 
                  bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-yellow-400 text-3xl font-bold text-center">
                      {t("teams.women")}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Academy Team */}
              <Link
                to={getLanguagePrefix("/team/academy")}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/academy_team.jpg"
                    alt="Academy Team"
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black 
                  bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-yellow-400 text-3xl font-bold text-center">
                      {t("teams.academy")}
                    </span>
                  </div>
                </div>
              </Link>

              {/* U17 Team */}
              <Link to={getLanguagePrefix("/team/u17")} className="block group">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/u17_team.jpg"
                    alt="U17 Team"
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black 
                  bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-yellow-400 text-3xl font-bold text-center">
                      {t("teams.junior")}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Coaching Staff */}
              <Link
                to={getLanguagePrefix("/team/coaching-staff")}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/coaching_team.jpg"
                    alt="Coaching Staff"
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black 
                  bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-yellow-400 text-3xl font-bold text-center">
                      {t("teams.coaching")}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Medical Staff */}
              <Link
                to={getLanguagePrefix("/team/medical-staff")}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/meds.jpg"
                    alt="Medical Staff"
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-yellow-400 text-3xl font-bold text-center">
                      {t("teams.medical")}
                    </span>
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
      <TrainingSchedule />
      <Sponsors />
    </div>
  );
};

export default Team;
