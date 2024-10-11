import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ProductReturnInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null); // To reference the collapsible content
  const { t } = useTranslation();

  // Form state management
  const [formData, setFormData] = useState({
    orderNumber: "",
    reason: "",
    email: "",
  });

  const [formStatus, setFormStatus] = useState({ isError: false, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle expanding section
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ isError: false, message: "" });

    // Simple form validation
    if (!formData.orderNumber || !formData.reason || !formData.email) {
      setFormStatus({ isError: true, message: t("returns.formError") });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission process
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({ isError: false, message: t("returns.formSuccess") });
      // Reset form after successful submission
      setFormData({ orderNumber: "", reason: "", email: "" });
    }, 1500);
  };

  // Clear message after 4 seconds
  useEffect(() => {
    if (formStatus.message) {
      const timer = setTimeout(() => {
        setFormStatus({ isError: false, message: "" });
      }, 4000);
      return () => clearTimeout(timer); // Cleanup on unmount or change
    }
  }, [formStatus.message]);

  return (
    <div className="mt-16 font-custom">
      {/* Returns Section */}
      <div>
        <h2 className="text-xl font-bold" onClick={toggleExpand}>
          {/* Toggle icon */}
          <span>
            {t("returns.title")}{" "}
            {isExpanded ? (
              <FaCaretUp
                size={30}
                data-tooltip-id="closeTooltip"
                data-tooltip-content={t("returns.close")}
              />
            ) : (
              <FaCaretDown
                size={30}
                data-tooltip-id="openTooltip"
                data-tooltip-content={t("returns.open")}
              />
            )}
            <Tooltip
              id="closeTooltip"
              place="top"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
            <Tooltip
              id="openTooltip"
              place="bottom"
              style={{ backgroundColor: "rgb(31 41 55)" }}
            />
          </span>
        </h2>
      </div>
      {/* Smoothly collapsing content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-max-height duration-500 ease-in-out"
        style={{
          maxHeight: isExpanded
            ? `${contentRef.current.scrollHeight}px`
            : "0px",
        }}
      >
        <div className="p-2">
          <p className="font-bold mb-2 text-lg uppercase">
            {t("returns.order")}
          </p>
          <p className="font-medium">{t("returns.returnContent")}</p>

          {/* Centered and Limited Width Return Form */}
          <h2
            className="text-4xl mb-4 flex justify-center items-center text-center
           mt-16 uppercase font-extrabold max-w-xl mx-auto"
          >
            {t("returns.request")}
          </h2>
          <p className="text-center mb-4 max-w-lg mx-auto text-lg">
            {t("returns.info1")}
          </p>
          <p className="text-center max-w-lg mx-auto mb-4 text-sm font-semibold">
            {t("returns.info2")}
          </p>
          <div className="flex justify-center mt-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md bg-white p-6 border border-gray-300 rounded shadow-lg"
            >
              <div className="mb-4">
                <label
                  className="block font-bold mb-1"
                  htmlFor="orderNumber"
                ></label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                  placeholder={t("returns.orderNumberLabel")}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block font-bold mb-1"
                  htmlFor="reason outline-none"
                ></label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded outline-none 
                  resize-none"
                  rows="4"
                  placeholder={t("returns.reasonLabel")}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1" htmlFor="email"></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                  placeholder={t("returns.emailLabel")}
                  required
                />
              </div>
              <div className="mb-3 bg-yellow-100 p-4 rounded-lg font-semibold">
                {t("returns.initiate")}
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-cyan-900 text-white font-bold
                 rounded hover:bg-cyan-950"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("returns.submitting") : t("returns.submit")}
              </button>
            </form>
          </div>

          <div
            className={`block mt-4 mb-16 text-center font-bold ${
              formStatus.isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {formStatus.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReturnInfo;
