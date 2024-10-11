import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import Tooltip styles

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [newsletterType, setNewsletterType] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(null); // Reference for dropdown content
  const { t, i18n } = useTranslation();

  const language = i18n.language || "en"; // Default to 'en' if not set

  const getLanguagePrefix = (path) => `/${language}${path}`;

  const handleSubscribe = () => {
    if (!email) {
      setError(t("newsletter.error"));
      return;
    }

    if (!newsletterType) {
      setError(t("newsletter.error2"));
      return;
    }

    setError("");
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setEmail("");
      setNewsletterType("");

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(""); // Clear error when input changes
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="relative flex flex-col items-start p-6 md:p-8 
      space-y-4 text-white font-custom mt-16 h-auto shadow-xl"
      style={{
        backgroundImage: `url("/background.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        borderRadius: "10px",
        backgroundColor: "#001F3F",
        opacity: 20,
      }}
    >
      <h2 className="text-3xl font-bold uppercase text-white">
        {t("newsletter.header")}
      </h2>

      <div className="flex flex-col md:flex-row md:space-x-4 w-full">
        <input
          type="email"
          name="email"
          id="userEmail"
          placeholder={t("newsletter.email")}
          value={email}
          onChange={handleInputChange(setEmail)} // Clear error on change
          className="w-full md:w-auto mb-4 md:mb-0 p-4 text-black rounded-md focus:outline-none"
        />

        <div className="relative w-full md:w-64 lg:w-60">
          <select
            name="newsletter"
            id="chooseNewsletter"
            value={newsletterType}
            onChange={handleInputChange(setNewsletterType)} // Clear error on change
            className="w-full p-5 appearance-none text-black rounded-md focus:outline-none"
          >
            <option value="">{t("newsletter.select")}</option>
            <option value="news">{t("newsletter.news")}</option>
            <option value="offers">{t("newsletter.offers")}</option>
            <option value="events">{t("newsletter.events")}</option>
          </select>
          <button
            onClick={() => document.querySelector("select").focus()}
            className="absolute right-4 top-5 text-black focus:outline-none"
          >
            <FaChevronDown />
          </button>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={isSending}
          className={`mt-4 md:mt-0 p-4 ${
            isSending ? "bg-cyan-800" : "bg-red-600 hover:bg-red-700"
          } text-white rounded-md font-bold text-xl transition-colors w-full md:w-auto`}
        >
          {isSending ? t("newsletter.sending") : t("newsletter.subscribe")}
        </button>
      </div>

      {error && <p className="mt-2 text-red-600 font-bold">{error}</p>}

      {isSuccess && (
        <p className="mt-4 text-green-500 font-bold">
          {t("newsletter.success")}
        </p>
      )}

      <div className="text-sm md:text-base text-white leading-relaxed font-medium text-left">
        <p>
          {t("newsletter.dataProtection")}{" "}
          <span
            className="text-blue-500 cursor-pointer font-semibold hover:underline hover:text-blue-700 ease-in"
            onClick={toggleDropdown}
          >
            {t("newsletter.info")}
            {isDropdownOpen ? (
              <FaChevronUp
                size={18}
                color="#ffff"
                data-tooltip-id="collapseTooltip"
                data-tooltip-content={t("newsletter.collapse")}
              />
            ) : (
              <FaChevronDown
                size={18}
                color="#ffff"
                data-tooltip-id="expandTooltip"
                data-tooltip-content={t("newsletter.expand")}
              />
            )}
            <Tooltip
              id="collapseTooltip"
              place="top"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
            <Tooltip
              id="expandTooltip"
              place="bottom"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
          </span>
        </p>

        {/* Dropdown content with smooth transition */}
        <div
          ref={dropdownRef}
          style={{
            maxHeight: isDropdownOpen
              ? `${dropdownRef.current.scrollHeight}px`
              : "0px",
            transition: "max-height 0.4s ease",
            overflow: "hidden",
          }}
        >
          <div className="mt-2 p-8 bg-gray-800 rounded-md">
            <p className="text-3xl mb-6 mt-8 text-yellow-400">
              <strong>{t("newsletter.dropTitle")}</strong>
            </p>
            <p className="font-bold text-md">{t("newsletter.ourNewsletter")}</p>
            <br />
            <div>
              <strong className="font-bold">
                {t("newsletter.clubNewsletter")}
              </strong>
              <ul className="list-disc ml-5">
                <Link
                  to={getLanguagePrefix("/news")}
                  className="text-blue-500 hover:underline"
                >
                  <li>{t("newsletter.info1")}</li>
                </Link>
                <li>{t("newsletter.info2")}</li>
                <li> {t("newsletter.info3")}</li>
                <li> {t("newsletter.info4")}</li>
                <li>{t("newsletter.info5")}</li>
              </ul>
            </div>
            <br />
            <div>
              <strong className="font-bold">
                {t("newsletter.storeNewsletter")}
              </strong>
              <ul className="list-disc ml-5 mb-10">
                <li>{t("newsletter.storeInfo1")}</li>
                <Link
                  to={getLanguagePrefix("/store")}
                  className="text-blue-500 hover:underline"
                >
                  <li> {t("newsletter.storeInfo2")}</li>
                </Link>
                <li>{t("newsletter.storeInfo3")}</li>
                <li> {t("newsletter.storeInfo4")}</li>
                <li> {t("newsletter.storeInfo5")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
