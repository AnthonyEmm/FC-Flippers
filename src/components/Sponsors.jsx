import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Sponsors = () => {
  const { t } = useTranslation();
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch("/src/SponsorsData/sponsorsData.json")
      .then((response) => response.json())
      .then((data) => setSponsors(data))
      .catch((error) => console.error("Error loading sponsors:", error));
  }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="container mx-auto py-12 px-8 mt-28 font-custom">
      <h1
        className="text-2xl sm:text-xl md:text-3xl lg:text-3xl 
        font-extrabold text-center mb-16 md:mb-10 font-custom uppercase"
        data-aos="fade-in"
        data-aos-delay="500"
      >
        {t("partner.sponsor")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2">
        {sponsors.map((sponsor, index) => (
          <Link
            to={sponsor.link}
            key={index}
            className="block text-center group"
          >
            <div className="relative overflow-hidden flex justify-center items-center">
              <img
                src={sponsor.image}
                alt={`Sponsor ${index + 1}`}
                className="w-28 h-24 object-contain transform transition-transform duration-300 
                hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
