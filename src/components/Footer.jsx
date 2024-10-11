import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaArrowUp,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { SlEarphonesAlt } from "react-icons/sl";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [showButton, setShowButton] = useState(false);

  // Helper function to construct the route path with the language prefix
  const getLanguagePrefix = (path) => {
    const lang = i18n.language || "en"; // Fallback to 'en' if language is undefined
    return `/${lang}${path}`;
  };

  // Scroll event to toggle the visibility of the back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-800 text-white p-6 relative font-custom">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link
              to={getLanguagePrefix("/news")}
              className="hover:underline text-yellow-400"
            >
              {t("navbar.news")}
            </Link>
            <Link
              to={getLanguagePrefix("/matches")}
              className="hover:underline text-yellow-400"
            >
              {t("navbar.matches")}
            </Link>
            <Link
              to={getLanguagePrefix("/stadium")}
              className="hover:underline text-yellow-400"
            >
              {t("navbar.stadium")}
            </Link>
            <Link
              to={getLanguagePrefix("/team")}
              className="hover:underline text-yellow-400"
            >
              {t("navbar.team")}
            </Link>
            <Link
              to={getLanguagePrefix("/store")}
              className="flex items-center hover:underline text-yellow-400"
            >
              {t("navbar.store")}
              <HiMiniShoppingCart size={24} className="ml-2" />
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <p className="text-yellow-400 font-semibold text-center md:text-left">
              {t("social.follow")}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start space-x-4">
              <Link
                to="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                id={t("socials.facebook")}
                className="hover:text-blue-600 text-white"
                data-tooltip-id={t("socials.facebook")}
                data-tooltip-content={t("socials.facebook")}
              >
                <FaFacebook size={30} />
              </Link>
              <Tooltip
                id={t("socials.facebook")}
                place="bottom"
                style={{ backgroundColor: "rgb(55 65 81)" }}
              />
              <Link
                to="https://www.x.com"
                target="_blank"
                id={t("socials.x")}
                rel="noopener noreferrer"
                className="hover:text-black"
                data-tooltip-id={t("socials.x")}
                data-tooltip-content={t("socials.x")}
              >
                <FaXTwitter size={30} />
              </Link>
              <Tooltip
                id={t("socials.x")}
                place="bottom"
                style={{ backgroundColor: "rgb(55 65 81)" }}
              />
              <Link
                to="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                id={t("socials.instagram")}
                className="hover:text-rose-600"
                data-tooltip-id={t("socials.instagram")}
                data-tooltip-content={t("socials.instagram")}
              >
                <FaInstagram size={30} />
              </Link>
              <Tooltip
                id={t("socials.instagram")}
                place="bottom"
                style={{ backgroundColor: "rgb(55 65 81)" }}
              />
              <Link
                to="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                id={t("socials.youtube")}
                className="hover:text-red-600"
                data-tooltip-id={t("socials.youtube")}
                data-tooltip-content={t("socials.youtube")}
              >
                <FaYoutube size={24} />
              </Link>
              <Tooltip
                id={t("socials.youtube")}
                place="bottom"
                style={{ backgroundColor: "rgb(55 65 81)" }}
              />
              <Link
                to="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                id={t("socials.tiktok")}
                className="hover:text-black"
                data-tooltip-id={t("socials.tiktok")}
                data-tooltip-content={t("socials.tiktok")}
              >
                <FaTiktok size={30} />
              </Link>
              <Tooltip
                id={t("socials.tiktok")}
                place="bottom"
                style={{ backgroundColor: "rgb(55 65 81)" }}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-yellow-400 flex flex-col items-center md:items-start space-y-2 mb-8">
            <div className="flex items-center">
              <GrMapLocation size={20} className="mr-2" />
              <p className="leading-6 whitespace-nowrap">
                {t("footer.address")}
              </p>
            </div>
            <div className="flex items-center">
              <SlEarphonesAlt size={20} className="mr-2" />
              <p className="leading-6">+123 456 7890</p>
            </div>
            <div className="flex items-center">
              <MdEmail size={20} className="mr-2" />
              <p className="leading-6">contact@fcflippers.com</p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <img
          src="/Flippers.png"
          alt="Logo"
          className="flex flex-col justify-center items-center w-40 h-auto mx-auto"
        />
        <p className="text-yellow-400 text-center mt-4">
          &copy;{`${new Date().getFullYear()} ${t("footer.rights")}`}
        </p>

        {/* Back to Top Button */}
        {showButton && (
          <>
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 left-8 bg-cyan-950 text-white 
            p-3 rounded-full shadow-lg hover:bg-yellow-400 transition ease-in-out z-10"
              aria-label="Back to top"
              data-tooltip-id="backToTopTooltip"
            >
              <FaArrowUp size={20} />
            </button>
            {/* Tooltip component */}
            <Tooltip
              id="backToTopTooltip"
              place="top"
              style={{ backgroundColor: "rgb(55 65 81)" }}
            >
              {t("scroll.toTop")}
            </Tooltip>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
