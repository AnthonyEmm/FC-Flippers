import React, { useState, useEffect, useRef } from "react";
import { CgPlayButtonR } from "react-icons/cg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const VideoModal = ({ isOpen, videoSrc, onClose }) => {
  const { t } = useTranslation();
  const modalBackgroundRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalBackgroundRef.current &&
        modalBackgroundRef.current === event.target
      ) {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalBackgroundRef}
      className="fixed inset-0 flex items-center justify-center bg-black
      bg-opacity-75 z-50"
    >
      <div className="relative w-full max-w-4xl">
        <video src={videoSrc} className="w-full h-auto" controls autoPlay />
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 text-lg font-bold rounded-md
            hover:text-white font-custom"
          >
            {t("video.close")}
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoShowcase = () => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/VideosData/videos.json");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (videoSrc) => {
    setCurrentVideo(videoSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className="flex flex-col items-start p-4 space-y-4 font-custom">
      <h2
        className="text-2xl sm:text-xl md:text-3xl lg:text-3xl font-extrabold text-left
         font-custom uppercase"
        data-aos="fade-out"
        data-aos-delay="500"
      >
        {t("clubVideos.title")}
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg animate-pulse bg-gray-300 h-96"
            >
              <div className="bg-gray-400 h-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Two large videos side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videos.slice(0, 2).map((video, index) => (
              <div
                key={index}
                className="relative cursor-pointer overflow-hidden transition-transform 
                duration-300 ease-in-out transform hover:scale-105 hover:z-10"
                onClick={() => handleOpenModal(video.src)}
              >
                {/* Conditional rendering for video or fallback image */}
                {window.innerWidth <= 768 ? (
                  <img
                    src="/Flippers.png"
                    className="w-full h-[30vh] sm:h-[35vh] md:h-[30vh] lg:h-[55vh] object-cover"
                    alt="Fallback Background"
                  />
                ) : (
                  <video
                    src={video.src}
                    className="w-full h-[30vh] sm:h-[35vh] md:h-[30vh] lg:h-[55vh] object-cover"
                    muted
                    preload="auto"
                    playsInline
                    autoPlay
                    onError={(e) => {
                      e.target.style.backgroundColor = "#FFF0D1";
                    }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                  <span className="text-white text-4xl">
                    <CgPlayButtonR color="#6EC207" />
                  </span>
                </div>
                <div className="p-4 bg-gray-800">
                  <h3 className="text-left font-bold uppercase text-sm text-white mb-2">
                    {t(`clubVideos.video${index + 1}Title`)}
                  </h3>
                  <p className="text-left text-white text-2xl font-bold">
                    {t(`clubVideos.video${index + 1}Description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining medium-sized videos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {videos.slice(2).map((video, index) => (
              <div
                key={index + 2} // Adjust index for the sliced array
                className="relative cursor-pointer overflow-hidden transition-transform 
                duration-300 ease-in-out transform hover:scale-105 hover:z-10"
                onClick={() => handleOpenModal(video.src)}
              >
                <video
                  src={video.src}
                  className="w-full h-55 object-cover"
                  muted
                  preload="auto"
                  playsInline
                  autoPlay
                  onError={(e) => {
                    e.target.style.backgroundColor = "#FFF0D1";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                  <span className="text-white text-4xl">
                    <CgPlayButtonR color="#6EC207" />
                  </span>
                </div>
                <div className="p-4 bg-gray-800">
                  <h3 className="text-left font-bold uppercase text-sm text-white mb-2">
                    {t(`clubVideos.video${index + 3}Title`)}
                  </h3>
                  <p className="text-left text-white text-xl font-bold">
                    {t(`clubVideos.video${index + 3}Description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <VideoModal
        isOpen={isModalOpen}
        videoSrc={currentVideo}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default VideoShowcase;
