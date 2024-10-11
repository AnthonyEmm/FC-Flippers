import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Sponsors from "./Sponsors";
import MedicalCenter from "./MedicalCenter";

const MedicalStaff = () => {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      const cachedDoctors = localStorage.getItem("medicalStaff");

      if (cachedDoctors) {
        setDoctors(JSON.parse(cachedDoctors));
        setLoading(false);
      } else {
        try {
          const response = await fetch(
            "/MedicalStaffData/medicalStaffData.json",
          );
          const data = await response.json();
          setDoctors(data.doctors);
          localStorage.setItem("medicalStaff", JSON.stringify(data.doctors));
        } catch (error) {
          console.error("Error loading doctors:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-8 font-custom">
        <h1 className="text-4xl font-bold text-left mb-6">
          <div className="h-8 bg-gray-300 rounded animate-pulse w-48"></div>{" "}
          {/* Skeleton for heading */}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(3)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div className="h-96 bg-gray-300 animate-pulse"></div>{" "}
                  {/* Skeleton for image */}
                </div>
                <div className="p-4 text-left">
                  <div className="h-6 bg-gray-300 animate-pulse mb-2 w-36"></div>{" "}
                  {/* Skeleton for first name */}
                  <div className="h-6 bg-gray-300 animate-pulse mb-2 w-36"></div>{" "}
                  {/* Skeleton for last name */}
                  <div className="h-4 bg-gray-300 animate-pulse w-24"></div>{" "}
                  {/* Skeleton for status */}
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
        {t("teams.medical")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-96 object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-4 text-left">
              <h2 className="text-4xl font-bold">{doctor.firstname}</h2>
              <h2 className="text-4xl font-bold">{doctor.lastname}</h2>
              <p className="text-gray-600 font-bold uppercase">
                {t(`health.${doctor.status}`)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <MedicalCenter />
      <Sponsors />
    </div>
  );
};

export default MedicalStaff;
