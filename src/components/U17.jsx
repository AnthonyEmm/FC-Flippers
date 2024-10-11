import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { FiSearch, FiX } from "react-icons/fi";
import Sponsors from "./Sponsors";

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="bg-gray-300 h-60 md:h-72 w-full" />
    <div className="p-4 text-left">
      <div className="bg-gray-400 h-8 w-16 mb-2" />
      <div className="bg-gray-400 h-6 w-24 mb-2" />
      <div className="bg-gray-400 h-6 w-32" />
    </div>
  </div>
);

const U17 = () => {
  const { t } = useTranslation();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const modalRef = useRef(null); // Reference for the modal

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/src/U17TeamData/u17TeamData.json");
        const data = await response.json();
        setPlayers(data.players);
      } catch (error) {
        console.error("Error loading players:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPlayers();
  }, []);

  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    setIsModalOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const filteredPlayers = players.filter((player) => {
    const translatedPosition = t(`positions.${player.position}`);
    const fullName = `${player.firstname} ${player.lastname}`.toLowerCase();
    const term = searchTerm.toLowerCase();

    return (
      fullName.includes(term) ||
      translatedPosition.toLowerCase().includes(term) ||
      player.age.toString().includes(term) ||
      player.appearances.toString().includes(term)
    );
  });

  return (
    <div className="w-full py-8 px-4 md:px-8 font-custom bg-blue-50">
      <div className="flex justify-end items-center relative">
        <button onClick={toggleSearch} className="focus:outline-none">
          {isSearchOpen ? (
            <FiX
              className="text-2xl md:text-3xl text-gray-600"
              data-tooltip-id={t("toolTip.close")}
              data-tooltip-content={t("toolTip.close")}
            />
          ) : (
            <FiSearch
              className="text-2xl md:text-3xl text-gray-600"
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

        <div className="relative">
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`transition-all duration-1000 ease-in-out border-b-2 border-gray-200
              p-2 md:p-4 ml-2 focus:outline-none ${
                isSearchOpen ? "w-[80vw] sm:w-[80vw] md:w-[500px]" : "w-0"
              }`}
            style={{
              visibility: isSearchOpen ? "visible" : "hidden",
            }}
          />
          {searchTerm && isSearchOpen && (
            <FiX
              className="absolute right-3 top-1 md:top-2 cursor-pointer text-gray-700 bg-gray-200 rounded-full"
              onClick={clearSearch}
            />
          )}
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-left mt-2">
        {t("teams.junior")}
      </h1>

      {filteredPlayers.length === 0 && searchTerm && (
        <div className="flex justify-center items-center mt-10">
          <div className="text-center text-red-600 text-lg md:text-xl font-semibold uppercase">
            {t("search.noResults")}
          </div>
        </div>
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
        xl:grid-cols-4 gap-6 md:gap-8 cursor-pointer mt-4"
      >
        {loading
          ? // Render skeletons if loading
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                onClick={() => openModal(player)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-80 md:h-80 object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 text-left">
                  <h2 className="text-3xl md:text-4xl font-bold underline text-gray-700 mb-2">
                    {player.number}
                  </h2>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {player.firstname}
                  </h2>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {player.lastname}
                  </h2>
                  <p className="text-gray-600 font-bold">
                    {t(`positions.${player.position}`)}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {isModalOpen && selectedPlayer && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 max-w-lg w-full relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl 
            hover:bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full 
            transition-colors duration-300 font-bold"
              onClick={closeModal}
            >
              &#x2715;
            </button>
            <span className="flex flex-col items-start text-gray-700 mb-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-700 underline">
                {selectedPlayer.number}
              </h2>
              <h2 className="text-2xl md:text-3xl font-bold">
                {selectedPlayer.firstname}
              </h2>
              <h2 className="text-2xl md:text-3xl font-bold">
                {selectedPlayer.lastname}
              </h2>
            </span>
            <img
              src={selectedPlayer.image}
              alt="Player Photo"
              className="w-full h-80 md:h-96 object-cover overflow-hidden mb-6 rounded-lg"
            />
            <p className="font-bold text-lg md:text-xl">
              <strong className="uppercase">{t("modal.position")}:</strong>{" "}
              {t(`positions.${selectedPlayer.position}`)}
            </p>
            <p className="font-bold text-lg md:text-xl">
              <strong className="uppercase">{t("modal.age")}:</strong>{" "}
              {selectedPlayer.age}
            </p>
            <p className="font-bold text-lg md:text-xl">
              <strong className="uppercase">{t("modal.goals")}:</strong>{" "}
              {selectedPlayer.goals}
            </p>
            <p className="font-bold text-lg md:text-xl">
              <strong className="uppercase">{t("modal.height")}:</strong>{" "}
              {selectedPlayer.height}
            </p>
            <p className="font-bold text-lg md:text-xl">
              <strong className="uppercase">{t("modal.appearances")}:</strong>{" "}
              {selectedPlayer.appearances}
            </p>
          </div>
        </div>
      )}

      <Sponsors />
    </div>
  );
};

export default U17;
