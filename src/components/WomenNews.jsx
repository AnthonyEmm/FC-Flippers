import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import AOS from "aos";
import "aos/dist/aos.css";
import Sponsors from "./Sponsors";
import { Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { LiaFacebookMessenger } from "react-icons/lia";
import { FaXTwitter } from "react-icons/fa6";
import RelatedNews from "./RelatedNews";

const WomenNews = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true); // Loading state
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = () => {
      fetch("/WomensNewsData/playersData.json")
        .then((response) => response.json())
        .then((data) => {
          // Fetch the data and use the current language to display translations
          const lang = i18n.language; // Get the current language
          const translatedPlayers = data.players.map((player) => ({
            id: player.id,
            name: player.name[lang], // Use the correct translation
            position: player.position[lang],
            description: player.description[lang],
            image: player.image,
          }));
          setPlayers(translatedPlayers);
          setLoading(false); // Set loading to false after fetching
        })
        .catch((error) => {
          console.error("Error fetching player data:", error);
        });
    };
    AOS.init();
    AOS.init({ once: true });
    fetchPlayers();
  }, [t, i18n]);

  return (
    <div className="container mx-auto p-6 sm:p-8 font-custom bg-blue-50">
      <h1
        className="text-3xl sm:text-4xl font-extrabold text-left uppercase mb-4"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        {t("womenNews.title")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? // Skeleton Loader
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-300 p-4 sm:p-6 rounded-lg shadow-lg animate-pulse"
              >
                <div
                  className="relative w-full h-48 sm:h-72 lg:h-96 overflow-hidden
                 rounded-t-lg mb-4 bg-gray-400"
                ></div>
                <div className="h-6 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 rounded mb-4"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
              </div>
            ))
          : players.map((player) => (
              <div
                key={player.id}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col items-center transform 
              transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={`${500 * player.id}`}
              >
                <div className="relative w-full h-48 sm:h-72 lg:h-96 overflow-hidden rounded-t-lg mb-4">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out 
                  transform hover:scale-110 hover:brightness-90"
                  />
                </div>
                <h2
                  className="text-xl sm:text-2xl font-bold mb-2 uppercase"
                  data-aos="zoom-in"
                  data-aos-delay="1000"
                >
                  {player.name}
                </h2>
                <p
                  className="text-lg sm:text-xl font-bold mb-4 text-cyan-950 uppercase"
                  data-aos="zoom-out"
                  data-aos-delay="1000"
                >
                  {player.position}
                </p>
                <p
                  className="text-gray-800 text-base sm:text-lg font-semibold"
                  data-aos="zoom-in"
                  data-aos-delay="1000"
                >
                  {player.description}
                </p>
              </div>
            ))}
      </div>
      <div
        className="flex flex-col sm:flex-row justify-center items-center 
        space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
        data-aos="fade-down"
        data-aos-delay="800"
      >
        <h2 className="font-custom font-semibold text-lg sm:text-xl text-center">
          {t("share.article")}
        </h2>
        <div className="flex space-x-4">
          <Link
            to="https://www.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            id={t("socials.whatsapp")}
            className="hover:text-green-500"
            data-tooltip-id={t("socials.whatsapp")}
            data-tooltip-content={t("socials.whatsapp")}
          >
            <Tooltip
              id={t("socials.whatsapp")}
              place="bottom"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
            <FaWhatsapp size={30} />
          </Link>
          <Link
            to="https://www.x.com"
            target="_blank"
            id={t("socials.xshare")}
            rel="noopener noreferrer"
            className="hover:text-black"
            data-tooltip-id={t("socials.xshare")}
            data-tooltip-content={t("socials.xshare")}
          >
            <Tooltip
              id={t("socials.xshare")}
              place="bottom"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
            <FaXTwitter size={30} />
          </Link>
          <Link
            to="https://www.messenger.com/"
            target="_blank"
            rel="noopener noreferrer"
            id={t("socials.messenger")}
            className="hover:text-indigo-600"
            data-tooltip-id={t("socials.messenger")}
            data-tooltip-content={t("socials.messenger")}
          >
            <Tooltip
              id={t("socials.messenger")}
              place="bottom"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
            <LiaFacebookMessenger size={30} />
          </Link>
          <Link
            to="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            id={t("socials.shareFacebook")}
            className="hover:text-blue-700"
            data-tooltip-id={t("socials.shareFacebook")}
            data-tooltip-content={t("socials.shareFacebook")}
          >
            <Tooltip
              id={t("socials.shareFacebook")}
              place="bottom"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
            <FaFacebook size={30} />
          </Link>
        </div>
      </div>
      <RelatedNews />
      <Sponsors />
    </div>
  );
};

export default WomenNews;
