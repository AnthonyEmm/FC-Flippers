import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import Sponsors from "./Sponsors";
import RelatedNews from "./RelatedNews";

const AboutUs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="w-full py-8 px-4 md:px-8 font-custom bg-blue-50">
      {/* For tablets, stack the image above the text by using md:grid-cols-1 */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        {/* Image Section */}
        <div
          className="w-full h-64 sm:h-80 md:h-96 bg-blue-100 rounded-lg overflow-hidden"
          data-aos="fade-left"
          data-aos-duration="1300"
        >
          <img
            src="/president_club.png"
            alt={t("aboutUs.imageAlt")}
            className="w-full h-full object-contain mt-16 bg-blue-100 shadow-xl rounded-lg"
          />
        </div>
        {/* Text Section */}
        <div
          className="p-4 sm:p-6 bg-white shadow-lg rounded-lg mb-8 mt-4"
          data-aos="fade-right"
          data-aos-duration="1300"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 uppercase text-center">
            {t("aboutUs.title")}
          </h1>
          <p className="text-black text-base sm:text-lg mb-4 font-semibold">
            {t("aboutUs.description")}
          </p>
          <p className="text-black text-base sm:text-lg mb-4 font-semibold">
            {t("aboutUs.mission")}
          </p>
          <p className="text-black text-base sm:text-lg font-semibold">
            {t("aboutUs.vision")}
          </p>
          <p className="text-black text-base sm:text-lg font-bold mt-6 text-right italic">
            - {t("aboutUs.president")}
          </p>
          <p className="text-black text-base sm:text-lg font-bold text-right italic">
            {t("aboutUs.office")}
          </p>
        </div>
      </div>

      {/* Section with 6 Cards */}
      <div className="mt-16 font-custom">
        {/* Title above the cards */}
        <h2
          className="text-xl sm:text-xl md:text-3xl lg:text-4xl font-extrabold 
           font-custom text-left uppercase mt-10 md:mt-16 mb-6"
          data-aos="fade-in"
          data-aos-delay="500"
        >
          {t("newsAbout.board")}
        </h2>

        {/* Grid for the cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="bg-blue-100 shadow-xl rounded-lg p-6"
            data-aos="fade-out"
            data-aos-duration="1500"
          >
            <img
              src="/VP.png"
              alt={t("newsAbout.card1Alt")}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-md mb-4"
            />
            <h3 className="text-lg font-bold uppercase text-center">
              {t("newsAbout.name")}
            </h3>
            <p className="text-2xl font-bold uppercase text-center">
              {t("newsAbout.vice")}
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-blue-100 shadow-xl rounded-lg p-6"
            data-aos="fade-out"
            data-aos-duration="1500"
          >
            <img
              src="/general.png"
              alt={t("newsAbout.card2Alt")}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-md mb-4"
            />
            <h3 className="text-lg font-bold uppercase text-center">
              {t("newsAbout.name2")}
            </h3>
            <p className="text-2xl font-bold uppercase text-center">
              {t("newsAbout.manager")}
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-blue-100 shadow-xl rounded-lg p-6"
            data-aos="fade-out"
            data-aos-duration="1500"
          >
            <img
              src="/academy_director.png"
              alt={t("newsAbout.card3Alt")}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-md mb-4"
            />
            <h3 className="text-lg font-bold uppercase text-center">
              {t("newsAbout.name3")}
            </h3>
            <p className="text-2xl font-bold uppercase text-center">
              {t("newsAbout.director")}
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="bg-blue-100 shadow-xl rounded-lg p-6"
            data-aos="fade-out"
            data-aos-duration="1500"
          >
            <img
              src="/finance.png"
              alt={t("newsAbout.card4Alt")}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-md mb-4"
            />
            <h3 className="text-lg font-bold uppercase text-center">
              {t("newsAbout.name4")}
            </h3>
            <p className="text-2xl font-bold uppercase text-center">
              {t("newsAbout.comms")}
            </p>
          </div>

          {/* Card 5 */}
          <div
            className="bg-blue-100 shadow-xl rounded-lg p-6"
            data-aos="fade-out"
            data-aos-duration="1500"
          >
            <img
              src="/coo.png"
              alt={t("newsAbout.card5Alt")}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-md mb-4"
            />
            <h3 className="text-lg font-bold uppercase text-center">
              {t("newsAbout.name5")}
            </h3>
            <p className="text-2xl font-bold uppercase text-center">
              {t("newsAbout.coo")}
            </p>
          </div>

          {/* Card 6 */}
          <div
            className="bg-blue-100 shadow-xl rounded-lg p-6"
            data-aos="fade-out"
            data-aos-duration="1500"
          >
            <img
              src="/director_comm.png"
              alt={t("newsAbout.card6Alt")}
              className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-md mb-4"
            />
            <h3 className="text-lg font-bold uppercase text-center">
              {t("newsAbout.name6")}
            </h3>
            <p className="text-2xl font-bold uppercase text-center">
              {t("newsAbout.cfo")}
            </p>
          </div>
        </div>
      </div>
      <RelatedNews />
      <Sponsors />
    </div>
  );
};

export default AboutUs;
