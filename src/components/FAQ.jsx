import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);
  const { t, i18n } = useTranslation();
  const faqRef = useRef(null); // Ref to keep track of the FAQ container

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    fetch("/src/FAQData/faq_combined.json")
      .then((response) => response.json())
      .then((data) => {
        const currentLang = i18n.language;
        setFaqs(data[currentLang] || data.en);
      })
      .catch((error) => console.error("Error fetching FAQ data:", error));
  }, [i18n.language]);

  // Toggle FAQ based on index
  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (faqRef.current && !faqRef.current.contains(event.target)) {
        setOpen(null); // Close any open FAQ when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [faqRef]);

  return (
    <div className="max-w-3xl mx-auto p-6" ref={faqRef}>
      <h2
        data-aos="fade-in"
        data-aos-delay="500"
        className="text-lg sm:text-2xl md:text-3xl lg:text-3xl font-extrabold text-center 
        mb-6 md:mb-8 font-custom uppercase mt-16"
      >
        {t("faq.header")}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border dark:border-gray-800 dark:shadow-lg"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left shadow-lg dark:shadow-xl"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-semibold font-custom">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  open === index ? "rotate-180" : ""
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
                open === index ? "max-h-screen" : "max-h-0"
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

export default FAQ;
