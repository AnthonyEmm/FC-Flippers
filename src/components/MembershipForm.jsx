import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const MembershipForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    position: "",
    profilePicture: null,
  });

  const [fileError, setFileError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState(""); // State to store the selected file name

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    if (type === "file") {
      setFileName(files[0] ? files[0].name : ""); // Update file name
      setFileError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setFileError("");

    if (!formData.profilePicture) {
      setFileError(t("membership.fileError"));
      setIsError(true);
      return;
    }

    setIsSubmitting(true); // Set submitting state to true

    try {
      console.log("Form submitted:", formData);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

      setStatusMessage(t("membership.successMessage"));
      setIsError(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        position: "",
        profilePicture: null,
      });

      setFileName(""); // Reset file name
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => {
        setStatusMessage("");
      }, 4000);
    } catch (error) {
      setStatusMessage(t("membership.errorMessage"));
      setIsError(true);

      setTimeout(() => {
        setStatusMessage("");
      }, 4000);
    } finally {
      setIsSubmitting(false); // Reset submitting state to false
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-blue-50 border-blue-200 rounded-lg shadow-2xl mt-10">
      <img
        src="/Flippers.png"
        alt="Flippers logo"
        className="flex flex-col justify-center items-center w-40 h-auto mx-auto"
      />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase mt-4">
        {t("membership.title")}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="name"
          >
            {t("membership.name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 
            rounded-lg p-3 focus:outline-none"
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="email"
          >
            {t("membership.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 
            rounded-lg p-3 focus:outline-none"
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="phone"
          >
            {t("membership.phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 
            rounded-lg p-3 focus:outline-none"
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="age"
          >
            {t("membership.age")}
          </label>
          <input
            type="tel"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 
            rounded-lg p-3 focus:outline-none"
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-700 font-custom"
            htmlFor="position"
          >
            {t("membership.position")}
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg
             p-3 focus:outline-none"
          >
            <option value="" disabled>
              {t("membership.positionSelect")}
            </option>
            <option value={t("membership.forward")}>
              {t("membership.forward")}
            </option>
            <option value={t("membership.midfielder")}>
              {t("membership.midfielder")}
            </option>
            <option value={t("membership.defender")}>
              {t("membership.defender")}
            </option>
            <option value={t("membership.goalkeeper")}>
              {t("membership.goalkeeper")}
            </option>
          </select>
        </div>

        <div>
          <div>
            <label
              className="block mb-2 font-semibold text-gray-700"
              htmlFor="profilePicture"
            >
              {t("membership.picture")}
            </label>
            <div className="relative">
              <input
                id="profilePicture"
                type="file"
                name="profilePicture"
                onChange={handleChange}
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()} // Triggers file selection dialog
                className="cursor-pointer bg-gray-400 text-gray-700 py-2
               hover:text-white px-4 rounded-lg font-semibold
               hover:bg-gray-500 ease-in-out"
              >
                {t("membership.chooseFile")}
              </button>
              <span className="ml-4 text-gray-600">
                {fileName || t("membership.noFileChosen")}
              </span>
            </div>
            {fileError && (
              <div className="mt-4 text-red-600 font-semibold text-sm">
                {fileError}
              </div>
            )}
          </div>
        </div>

        <h3 className="text-md font-semibold">{t("membership.disclaimer")}</h3>
        <p className="text-xs font-medium">{t("membership.content")}</p>

        <button
          type="submit"
          className="w-full bg-cyan-900 text-white px-4 py-2 rounded-lg
           hover:bg-cyan-950 transition-colors duration-300 mt-4 font-bold uppercase"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? t("membership.sending") : t("membership.submit")}
        </button>

        {statusMessage && (
          <div
            className={`mt-2 font-semibold text-center ${
              isError ? "text-red-700" : "text-green-700"
            }`}
          >
            {t("membership.statusMessage")}
          </div>
        )}
      </form>
    </div>
  );
};

export default MembershipForm;
