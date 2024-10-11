import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HiMiniShoppingCart } from "react-icons/hi2";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState("4rem");

  // Helper function to construct the route path with the language prefix
  const getLanguagePrefix = (path) => {
    const lang = i18n.language || "en"; // Fallback to 'en' if language is undefined
    return `/${lang}${path}`;
  };

  const navDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const closeButtonRef = useRef(null); // Reference for the close button

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageDropdownOpen(false); // Closes language dropdown after selection
  };

  const toggleNavDropdown = () => {
    setNavDropdownOpen(!navDropdownOpen);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const handleClickOutside = (event) => {
    // Ensures the click did not happen on the close button or inside the dropdown
    if (
      navDropdownRef.current &&
      !navDropdownRef.current.contains(event.target) &&
      !closeButtonRef.current.contains(event.target) // Excludes close button clicks
    ) {
      setNavDropdownOpen(false);
    }
    if (
      languageDropdownRef.current &&
      !languageDropdownRef.current.contains(event.target)
    ) {
      setLanguageDropdownOpen(false);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarHeight("3.5rem");
    } else {
      setNavbarHeight("5rem");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className="bg-gray-800 text-white sticky top-0 z-50 transition-all duration-300"
      style={{ height: navbarHeight }}
    >
      <div className="container mx-auto flex justify-between items-center relative px-4">
        <Link to={getLanguagePrefix("/")}>
          <img
            src="/Flippers.png"
            alt="club logo"
            className="w-16 h-14 md:w-28 md:h-16 transition-all duration-300"
          />
        </Link>

        {/* Desktop and Tablet Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6 text-md md:text-base font-custom">
          <li>
            <Link
              to={getLanguagePrefix("/")}
              className="hover:underline underline-offset-4 transition-all duration-500"
              style={{ textDecorationColor: "#facc15" }}
            >
              {t("navbar.home")}
            </Link>
          </li>
          <li>
            <Link
              to={getLanguagePrefix("/matches")}
              className="hover:underline underline-offset-4 transition-all duration-500"
              style={{ textDecorationColor: "#facc15" }}
            >
              {t("navbar.matches")}
            </Link>
          </li>
          <li>
            <Link
              to={getLanguagePrefix("/news")}
              className="hover:underline underline-offset-4 transition-all duration-500"
              style={{ textDecorationColor: "#facc15" }}
            >
              {t("navbar.news")}
            </Link>
          </li>
          <li>
            <Link
              to={getLanguagePrefix("/stadium")}
              className="hover:underline underline-offset-4 transition-all duration-500"
              style={{ textDecorationColor: "#facc15" }}
            >
              {t("navbar.stadium")}
            </Link>
          </li>
          <li>
            <Link
              to={getLanguagePrefix("/team")}
              className="hover:underline underline-offset-4 transition-all duration-500"
              style={{ textDecorationColor: "#facc15" }}
            >
              {t("navbar.team")}
            </Link>
          </li>
          <li>
            <Link
              to={getLanguagePrefix("/store")}
              className="flex items-center hover:underline underline-offset-4 transition-all duration-500 gap-1"
              style={{ textDecorationColor: "#facc15" }} // Tailwind's yellow-400
            >
              {t("navbar.store")}
              <HiMiniShoppingCart size={24} className="mr-2 text-yellow-400" />
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleNavDropdown} // Close button toggle
            className="text-white focus:outline-none"
            ref={closeButtonRef} // Attached ref here to handle its click
          >
            {navDropdownOpen ? (
              // Close button
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger button
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Dropdown Menu for Nav Links on Small Screens */}
        {navDropdownOpen && (
          <div
            ref={navDropdownRef}
            className="md:hidden absolute top-16 right-20 bg-gray-800 rounded-lg 
            max-w-xs text-yellow-400 shadow-lg z-10"
          >
            <ul className="flex flex-col p-2 font-custom text-sm">
              <li className="w-full">
                <Link
                  to={getLanguagePrefix("/")}
                  className="block w-full text-center hover:bg-gray-700 px-4 py-2"
                  onClick={toggleNavDropdown}
                >
                  {t("navbar.home")}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to={getLanguagePrefix("/matches")}
                  className="block w-full text-center hover:bg-gray-700 px-24 py-2"
                  onClick={toggleNavDropdown}
                >
                  {t("navbar.matches")}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to={getLanguagePrefix("/news")}
                  className="block w-full text-center hover:bg-gray-700 px-4 py-2"
                  onClick={toggleNavDropdown}
                >
                  {t("navbar.news")}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to={getLanguagePrefix("/stadium")}
                  className="block w-full text-center hover:bg-gray-700 px-4 py-2"
                  onClick={toggleNavDropdown}
                >
                  {t("navbar.stadium")}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to={getLanguagePrefix("/team")}
                  className="block w-full text-center hover:bg-gray-700 px-4 py-2"
                  onClick={toggleNavDropdown}
                >
                  {t("navbar.team")}
                </Link>
                <li className="w-full">
                  <Link
                    to={getLanguagePrefix("/store")}
                    className="block w-full text-center hover:bg-gray-700 px-4 py-2"
                    onClick={toggleNavDropdown}
                  >
                    <HiMiniShoppingCart
                      size={20}
                      className="inline-block mr-2 color:yellow"
                    />
                    {t("navbar.store")}
                  </Link>
                </li>
                <div></div>
              </li>
            </ul>
          </div>
        )}

        {/* Language Dropdown - Visible on all screens */}
        <div className="relative">
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center text-sm font-custom text-yellow-400 hover:text-white focus:outline-none"
          >
            {i18n.language.toUpperCase()}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {languageDropdownOpen && (
            <div
              ref={languageDropdownRef}
              className="absolute right-0 top-full mt-2 bg-gray-800 text-yellow-400 rounded-lg shadow-lg w-32 z-10"
            >
              <div className="p-2">
                <button
                  onClick={() => changeLanguage("en")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => changeLanguage("de")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  DEUTSCH
                </button>
                <button
                  onClick={() => changeLanguage("fr")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  FRANÇAIS
                </button>
                <button
                  onClick={() => changeLanguage("es")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  ESPAÑOL
                </button>
                <button
                  onClick={() => changeLanguage("it")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  ITALIANO
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
