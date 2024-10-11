import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Matches from "../pages/Matches";

const CoachingStaff = () => {
  const { t } = useTranslation();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      const cachedCoaches = localStorage.getItem("coachingStaff");

      if (cachedCoaches) {
        setCoaches(JSON.parse(cachedCoaches));
        setLoading(false);
      } else {
        try {
          const response = await fetch(
            "/CoachingStaffData/coachingStaffData.json",
          );
          const data = await response.json();
          setCoaches(data.coaches);
          localStorage.setItem("coachingStaff", JSON.stringify(data.coaches));
        } catch (error) {
          console.error("Error loading coaches:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoaches();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-8 font-custom">
        <h1 className="text-4xl font-bold text-left mb-6">
          <div className="h-8 bg-gray-300 rounded animate-pulse w-48"></div>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
          {Array(3)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div className="h-96 bg-gray-300 animate-pulse"></div>{" "}
                  {/* Image Skeleton */}
                </div>
                <div className="p-4 text-left">
                  <div className="h-6 bg-gray-300 animate-pulse mb-2 w-36"></div>{" "}
                  {/* Name Skeleton */}
                  <div className="h-6 bg-gray-300 animate-pulse mb-2 w-36"></div>{" "}
                  {/* Name Skeleton */}
                  <div className="h-4 bg-gray-300 animate-pulse w-24"></div>{" "}
                  {/* Status Skeleton */}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4 md:px-8 font-custom bg-blue-50">
      <h1 className="text-4xl font-extrabold text-left mb-6">
        {t("teams.coaching")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative overflow-hidden">
              <img
                src={coach.image}
                alt={`${coach.firstname} ${coach.lastname}`}
                className="w-full h-96 object-cover transform 
                transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-4 text-left">
              <h2 className="text-4xl font-bold">{coach.firstname}</h2>
              <h2 className="text-4xl font-bold">{coach.lastname}</h2>
              <p className="text-gray-600 font-bold uppercase">
                {t(`statuses.${coach.status}`)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Matches /> {/* Matches component */}
    </div>
  );
};

export default CoachingStaff;
