import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const { t } = useTranslation();

  const handleOpenPdf = () => {
    setPdfUrl(
      "https://drive.google.com/file/d/1kYbdXOIq6dYhdBpGw9SZca8_CyWOzaOi/view?usp=sharing",
    ); // Google Drive direct link
  };

  const handleClosePdf = () => {
    setPdfUrl(null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="text-center">
        {/* FC Flippers Logo */}
        <img
          src="/Flippers.png"
          alt="FC Flippers Logo"
          className="mx-auto mb-4 h-24 w-auto" // Center logo with fixed height
        />

        <h1 className="text-2xl font-bold mb-4 font-custom uppercase">
          {t("privacy.policy")}
        </h1>

        <button
          onClick={handleOpenPdf}
          className="bg-cyan-800 hover:bg-cyan-950 text-white 
          font-semibold py-2 px-4 rounded-md font-custom"
        >
          {t("privacy.view")}
        </button>
      </div>

      {pdfUrl && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center
         items-center bg-black bg-opacity-75 z-50"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
            <button
              onClick={handleClosePdf}
              className="absolute top-4 right-5 text-gray-400 hover:text-white text-lg font-custom font-semibold"
            >
              {t("privacy.close")}
            </button>
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              title="Privacy Policy PDF"
              className="rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
