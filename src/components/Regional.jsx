import React, { useEffect } from "react";
import Sponsors from "./Sponsors";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tooltip } from "react-tooltip";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { LiaFacebookMessenger } from "react-icons/lia";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RelatedNews from "./RelatedNews";

const Regional = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      {/* Responsive Image Section */}
      <div className="relative w-full h-auto">
        <img
          src="/pic_slide.jpg"
          alt={t("youthnews.title")}
          className="w-full h-auto object-cover max-h-screen sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] xl:max-h-[700px]"
        />
        {/* Animated Scroll Down Icon */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 font-custom hidden lg:block">
          <div
            className="animate-bounce cursor-pointer"
            data-tooltip-id="scrollDownTooltip" // Tooltip ID
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>

          {/* Tooltip component */}
          <Tooltip
            id="scrollDownTooltip"
            place="top"
            style={{ backgroundColor: "rgb(31 41 55)" }} // gray-800 background color
          >
            {t("scroll.article")}
          </Tooltip>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-3xl bg-white p-6 sm:p-8 mt-4 rounded-lg shadow-md font-custom relative">
        <h1
          className="text-3xl font-bold mb-4 uppercase text-center duration-500"
          data-aos="zoom-out"
          data-aos-delay="100"
        >
          {t("youthnews.title")}
        </h1>
        <p className="text-gray-700 text-left mt-4 sm:mt-8 mb-4 font-semibold text-xs sm:text-sm">
          <i>{t("youthnews.articleDate")}</i>
        </p>
        <p className="text-black mb-4 text-left font-semibold text-sm sm:text-lg">
          {t("youthnews.entry")}
        </p>
        <p className="text-black text-left mb-4 font-semibold text-sm sm:text-lg">
          {t("youthnews.peter")}
        </p>
        {/* New Image Section */}
        <div className="mb-1">
          <img
            src="/17-1.jpeg"
            alt="Match Highlights"
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="text-gray-700 text-left mb-8 font-semibold text-sm sm:text-sm">
          <i>{t("youthnews.photo")}</i>
        </p>
        <p className="text-black text-left mb-4 font-semibold text-sm sm:text-lg">
          {t("youthnews.performance")}
        </p>
        <p className="text-black text-left mb-4 font-semibold text-sm sm:text-lg">
          {t("youthnews.finalGoal")}
        </p>
        {/* New Image Section */}
        <div className="mb-1">
          <img
            src="/17-2.png"
            alt="Match Highlights"
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="text-gray-700 text-left mb-8 font-semibold text-sm sm:text-sm">
          <i>{t("youthnews.photo")}</i>
        </p>
        <p className="text-black text-left mb-4 font-semibold text-sm sm:text-lg mt-8">
          {t("youthnews.jude")}
        </p>
        <p className="text-black text-left mb-8 font-semibold text-sm sm:text-lg">
          {t("youthnews.overall")}
        </p>
        <p className="text-gray-700 mb-16 font-bold text-lg sm:text-xl md:text-2xl lg:text-xl text-left">
          <i>{t("youthnews.comment")}</i>
        </p>
        <p className="text-gray-700 mb-20 font-bold text-xs sm:text-sm md:text-base lg:text-md text-right">
          - <i>{t("youthnews.u17Coach")}</i>
        </p>
      </div>

      {/* Social Share Section */}
      <div
        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
        data-aos="fade-down"
        data-aos-delay="500"
      >
        <h2 className="font-custom font-semibold text-xl text-center sm:text-left">
          {t("share.article")}
        </h2>
        <div className="flex justify-center items-center space-x-4 font-custom">
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

export default Regional;
