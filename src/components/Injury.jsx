import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import AOS from "aos";
import "aos/dist/aos.css";
import Fixtures from "../components/Fixtures";
import Sponsors from "./Sponsors";
import { Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { LiaFacebookMessenger } from "react-icons/lia";
import { FaXTwitter } from "react-icons/fa6";
import RelatedNews from "./RelatedNews";

const Injury = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 font-custom bg-blue-50">
      {/* Applying grid only for large screens */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 md:gap-8">
        {/* Image Section on top for mobile and tablet */}
        <div
          className="flex items-center justify-center mb-6 lg:mb-0"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <img
            src="/injury.webp"
            alt={t("injury.imageAlt")}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Text Section below image for mobile and tablet */}
        <div
          className="flex flex-col justify-center p-2 sm:p-4"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold uppercase">
            {t("injury.title")}
          </h1>
          <p className="text-gray-700 text-left mt-4 sm:mt-6 mb-4 font-semibold text-xs sm:text-sm md:text-base lg:text-sm">
            <i>{t("injury.articleDate")}</i>
          </p>
          <p className="text-black mb-2 font-semibold text-sm sm:text-base md:text-lg lg:text-base text-left">
            {t("injury.description1")}
          </p>
          <p className="text-black mb-2 font-semibold text-sm sm:text-base md:text-lg lg:text-base text-left">
            {t("injury.description2")}
          </p>
          <p className="text-black mb-4 font-semibold text-sm sm:text-base md:text-lg lg:text-base text-left">
            {t("injury.description3")}
          </p>
          <p className="text-gray-700 mb-2 font-bold text-lg sm:text-xl md:text-2xl lg:text-xl text-left">
            <i>{t("injury.quote")}</i>
          </p>
          <p className="text-gray-700 mb-6 font-bold text-xs sm:text-sm md:text-base lg:text-sm text-left">
            <i>{t("injury.quoteCoach")}</i>
          </p>
          <p className="text-black mb-6 font-semibold text-sm sm:text-base md:text-lg lg:text-base text-left">
            {t("injury.wishes")}
          </p>
          <h2 className="font-custom font-semibold text-lg sm:text-xl md:text-2xl lg:text-xl flex justify-center items-center mb-4">
            {t("share.article")}
          </h2>
          <span className="flex flex-row justify-center items-center gap-4 mb-4 font-custom">
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
          </span>
        </div>
      </div>
      <Fixtures />
      <RelatedNews />
      <Sponsors />
    </div>
  );
};

export default Injury;
