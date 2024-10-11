import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSwipeable } from "react-swipeable";

const TournamentHonors = () => {
  const [honorsData, setHonorsData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4); // Default to 4 cards for large screens
  const [containerWidth, setContainerWidth] = useState(0);
  const { t, i18n } = useTranslation();

  const cardWidth = 320; // Width of each card
  const cardGap = 16; // Gap between cards
  const containerRef = useRef(null);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch("/TournamentHonorsData/tournamentHonors.json")
      .then((response) => response.json())
      .then((data) => setHonorsData(data))
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);

        if (width <= 640) {
          setCardsPerPage(1); // Mobile (1 card)
        } else if (width <= 1024) {
          setCardsPerPage(2); // Tablet (2 cards)
        } else {
          setCardsPerPage(4); // Desktop (4 cards)
        }
      }
    };

    updateDimensions(); // Initial setup
    window.addEventListener("resize", updateDimensions); // Listen for window resizing
    return () => window.removeEventListener("resize", updateDimensions);
  }, [containerRef]);

  const totalCards = honorsData.length;
  const totalSections = Math.ceil(totalCards / cardsPerPage); // Number of scrollable sections

  const slideLeft = () => {
    setScrollPosition((prev) =>
      Math.max(prev - cardsPerPage * (cardWidth + cardGap), 0),
    );
  };

  const slideRight = () => {
    const maxScrollPosition = Math.max(
      0,
      totalCards * (cardWidth + cardGap) - containerWidth,
    );
    setScrollPosition((prev) =>
      Math.min(prev + cardsPerPage * (cardWidth + cardGap), maxScrollPosition),
    );
  };

  // Calculate current section based on scroll position
  const currentSection = Math.floor(
    scrollPosition / (cardsPerPage * (cardWidth + cardGap)),
  );

  // Swipeable configurations
  const handlers = useSwipeable({
    onSwipedLeft: () => slideRight(),
    onSwipedRight: () => slideLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="p-10 bg-blue-50 font-custom mt-20" {...handlers}>
      <h2
        className="text-2xl sm:text-xl md:text-3xl lg:text-3xl font-extrabold text-left mb-4 md:mb-4 
          font-custom uppercase"
        data-aos="fade-in"
        data-aos-delay="500"
      >
        {t("clubHonors.honors")}
      </h2>
      <div className="relative">
        {/* Left Arrow */}
        {scrollPosition > 0 && (
          <button
            onClick={slideLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2
             text-yellow-400 hover:text-white p-2 rounded-full focus:outline-none z-20"
          >
            &#9664;
          </button>
        )}

        {/* Cards Container */}
        <div className="overflow-hidden" ref={containerRef}>
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              gap: `${cardGap}px`,
            }}
          >
            {honorsData.map((honor, index) => (
              <div
                key={index}
                className="bg-blue-100 shadow-lg rounded-lg overflow-hidden flex-shrink-0"
                style={{ width: cardWidth }} // Card width
              >
                <img
                  src={honor.image}
                  alt={honor.title[i18n.language]}
                  className="w-full h-60 object-contain p-6"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    {honor.title[i18n.language]}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">
                    {honor.description[i18n.language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {scrollPosition <
          totalCards * (cardWidth + cardGap) - containerWidth && (
          <button
            onClick={slideRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2
             text-yellow-400 hover:text-white p-2 rounded-full focus:outline-none z-20"
          >
            &#9654;
          </button>
        )}
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalSections }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-sm ${
              index === currentSection ? "bg-yellow-400" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TournamentHonors;
