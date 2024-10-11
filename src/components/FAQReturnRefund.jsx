import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const FAQReturnRefund = () => {
  const [returnsFaqs, setReturnsFaqs] = useState([]);
  const [refundFaqs, setRefundFaqs] = useState([]);
  const [openReturns, setOpenReturns] = useState(null);
  const [openRefunds, setOpenRefunds] = useState(null);
  const { t, i18n } = useTranslation();
  const returnsRef = useRef(null);
  const refundsRef = useRef(null);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    fetch("/src/ReturnRefundFaqData/faq_combined.json")
      .then((response) => response.json())
      .then((data) => {
        const currentLang = i18n.language;
        const faqData = data[currentLang]?.faq || data["en"].faq;
        setReturnsFaqs(faqData.returns_refunds);
        setRefundFaqs(faqData.refund_policy);
      })
      .catch((error) => console.error("Error fetching FAQ data:", error));
  }, [i18n.language]);

  // Toggle for Returns section
  const toggleReturnsFAQ = (index) => {
    setOpenReturns(openReturns === index ? null : index);
  };

  // Toggle for Refunds section
  const toggleRefundsFAQ = (index) => {
    setOpenRefunds(openRefunds === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        returnsRef.current &&
        !returnsRef.current.contains(event.target) &&
        refundsRef.current &&
        !refundsRef.current.contains(event.target)
      ) {
        setOpenReturns(null); // Close Returns if clicked outside
        setOpenRefunds(null); // Close Refunds if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [returnsRef, refundsRef]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2
        data-aos="fade-in"
        data-aos-delay="500"
        className="text-lg sm:text-2xl md:text-3xl 
        lg:text-3xl font-bold text-center 
        mb-6 md:mb-8 font-custom uppercase mt-16"
      >
        {t("faq.header")} {/* Header */}
      </h2>

      {/* Returns FAQ Section */}
      <h3 className="text-lg font-bold mt-8 uppercase mb-2">
        {t("returns.return")}
      </h3>
      <div className="space-y-4" ref={returnsRef}>
        {returnsFaqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border dark:border-gray-800 dark:shadow-lg"
          >
            <button
              className="w-full flex justify-between items-center 
              p-4 text-left shadow-lg dark:shadow-xl"
              onClick={() => toggleReturnsFAQ(index)}
            >
              <span className="text-lg font-semibold font-custom">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  openReturns === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                openReturns === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="p-4 border-t font-custom font-semibold">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Refunds FAQ Section */}
      <h3 className="text-lg font-bold mt-8 uppercase mb-2">
        {t("returns.refund")}
      </h3>
      <div className="space-y-4" ref={refundsRef}>
        {refundFaqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border dark:border-gray-800 dark:shadow-lg"
          >
            <button
              className="w-full flex justify-between items-center 
              p-4 text-left shadow-lg dark:shadow-xl"
              onClick={() => toggleRefundsFAQ(index)}
            >
              <span className="text-lg font-semibold font-custom">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  openRefunds === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                openRefunds === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="p-4 border-t font-custom font-semibold">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQReturnRefund;
