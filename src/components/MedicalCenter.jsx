import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const MedicalCenter = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  // Fetch data from JSON file
  useEffect(() => {
    fetch("/MedicalCenterData/medicalData.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  // Close modal if clicking outside of the modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedItem]);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const currentLanguage = i18n.language;

  return (
    <div className="py-12 text-center mt-16 font-custom">
      <h2
        className="text-3xl font-extrabold mb-8 uppercase"
        data-aos="fade-in"
        data-aos-delay="100"
      >
        {t("medCenter.title")}
      </h2>

      {/* Display loading skeleton or content */}
      {loading ? (
        <div className="flex flex-wrap justify-center gap-6">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div key={index} className="w-52 animate-pulse">
                <div className="w-full h-40 bg-gray-300 rounded-lg"></div>{" "}
                {/* Skeleton for image */}
                <div className="h-6 bg-gray-300 rounded mt-4"></div>{" "}
                {/* Skeleton for title */}
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => {
              const translation = item.translations[currentLanguage];
              return (
                <div
                  key={item.id || index}
                  className="w-52 cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto rounded-lg shadow-md 
                    transition-transform transform hover:scale-105"
                    data-aos="zoom-out"
                    data-aos-delay="100"
                  />
                  <h3 className="text-md font-bold mt-4 uppercase">
                    {translation.title}
                  </h3>
                </div>
              );
            })
          ) : (
            <p className="font-semibold text-lg text-red-600">
              {t("medCenter.data")}
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-60 flex 
        justify-center items-center z-50"
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg relative w-11/12 max-w-lg"
          >
            <button
              className="absolute top-1 right-3 text-gray-400 hover:text-black text-3xl 
               hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full 
                transition-colors duration-300 font-semibold"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedItem.image}
              alt={selectedItem.translations[currentLanguage].title}
              className="w-full h-96 rounded-2xl mb-4 z-20 p-2"
            />
            <h3 className="text-2xl font-bold mb-2 uppercase">
              {selectedItem.translations[currentLanguage].title}
            </h3>
            <p className="text-black text-md font-medium">
              {selectedItem.translations[currentLanguage].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalCenter;
