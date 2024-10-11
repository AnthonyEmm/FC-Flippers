import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CookiePopup = () => {
  const { t, i18n } = useTranslation();
  const [cookies, setCookie] = useCookies(["userConsent"]);
  const [showPopup, setShowPopup] = useState(!cookies.userConsent);

  // Get the current language
  const language = i18n.language || "en"; // Default to 'en' if not set

  const getLanguagePrefix = (path) => `/${language}${path}`;

  const [preferences, setPreferences] = useState({
    strictlyNecessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  const handleAcceptAll = () => {
    setPreferences({
      strictlyNecessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    setCookie(
      "userConsent",
      JSON.stringify({
        strictlyNecessary: true,
        functional: true,
        analytics: true,
        marketing: true,
      }),
      { path: "/", maxAge: 2592000 },
    );
    setShowPopup(false);
  };

  const handleSavePreferences = () => {
    setCookie("userConsent", JSON.stringify(preferences), {
      path: "/",
      maxAge: 2592000,
    });
    setShowPopup(false);
  };

  const handleDecline = () => {
    setShowPopup(false);
  };

  const handleToggle = (preference) => {
    setPreferences({ ...preferences, [preference]: !preferences[preference] });
  };

  return (
    showPopup && (
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        p-6 bg-gray-800 font-custom text-white rounded-lg shadow-lg z-50
        flex flex-col space-y-4 w-full max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        {/* Text Section */}
        <div className="text-xs md:text-sm lg:text-base">
          <h1 className="text-xl mb-4 font-bold">{t("cookies.settings")}</h1>
          {t("cookies.consent")}{" "}
          <Link
            to={getLanguagePrefix("/privacy-policy")}
            className="text-blue-400 hover:underline text-xs"
          >
            {t("cookies.learn")}
          </Link>
        </div>

        {/* Preferences with Toggle Buttons */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span>{t("cookies.strictly")}</span>
            <span className="text-xs ml-auto">{t("cookies.always")}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t("cookies.functional")}</span>
            <button
              onClick={() => handleToggle("functional")}
              className={`${
                preferences.functional ? "bg-cyan-800" : "bg-gray-400"
              } relative inline-flex items-center h-6 rounded-full w-11
               transition-colors focus:outline-none ml-auto`}
            >
              <span
                className={`${
                  preferences.functional ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span>{t("cookies.analytics")}</span>
            <button
              onClick={() => handleToggle("analytics")}
              className={`${
                preferences.analytics ? "bg-cyan-800" : "bg-gray-400"
              } relative inline-flex items-center h-6 rounded-full w-11
               transition-colors focus:outline-none ml-auto`}
            >
              <span
                className={`${
                  preferences.analytics ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span>{t("cookies.marketing")}</span>
            <button
              onClick={() => handleToggle("marketing")}
              className={`${
                preferences.marketing ? "bg-cyan-800" : "bg-gray-400"
              } relative inline-flex items-center h-6 rounded-full w-11 
                  transition-colors focus:outline-none ml-auto`}
            >
              <span
                className={`${
                  preferences.marketing ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col md:flex-row md:justify-between 
        items-center space-y-2 md:space-y-0"
        >
          <div className="flex justify-center space-x-2">
            <button
              onClick={handleAcceptAll}
              className="bg-green-500 hover:bg-green-600 text-white 
              font-semibold py-1 px-4 rounded-md text-xs md:text-sm"
            >
              {t("cookies.accept")}
            </button>
            <button
              onClick={handleSavePreferences}
              className="bg-gray-600 hover:bg-gray-500 text-white 
              font-semibold py-1 px-4 rounded-md text-xs md:text-sm"
            >
              {t("cookies.preferences")}
            </button>
            <button
              onClick={handleDecline}
              className="bg-red-500 hover:bg-red-600 text-white 
              font-semibold py-1 px-4 rounded-md text-xs md:text-sm"
            >
              {t("cookies.reject")}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CookiePopup;
