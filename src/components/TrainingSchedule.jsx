import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import clubLogo from "/Flippers.png";

const TrainingSchedule = () => {
  const { t, i18n } = useTranslation();
  const [schedules, setSchedules] = useState({});
  const [translations, setTranslations] = useState({}); // Default to empty object

  useEffect(() => {
    // Fetch training schedule data
    fetch("/src/TrainingScheduleData/training_schedule.json")
      .then((response) => response.json())
      .then((data) => setSchedules(data.schedules))
      .catch((error) =>
        console.error("Error fetching training schedule:", error),
      );

    // Fetch translation data
    fetch("/src/TrainingScheduleData/training_schedule_translations.json")
      .then((response) => response.json())
      .then((data) => setTranslations(data.training || {})) // Ensure it's an object
      .catch((error) => console.error("Error fetching translations:", error));
  }, [t, i18n]);

  const currentLanguage = i18n.language; // Get the current language

  return (
    <div
      className="max-w-3xl mx-auto p-6 bg-blue-50 border-blue-200 shadow-lg 
        rounded-lg mb-16 font-custom mt-16"
    >
      <img
        src={clubLogo}
        alt="FC Flippers Logo"
        className="mx-auto mb-6 w-38 h-32"
      />
      <h2
        className="text-2xl sm:text-2xl md:text-3xl font-bold text-center mb-6 
        text-gray-800 uppercase"
      >
        {translations.title
          ? translations.title[currentLanguage]
          : t("training.title")}
      </h2>
      {Object.keys(schedules).length > 0 ? (
        Object.keys(schedules).map((team) => (
          <div key={team} className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {translations[team] ? translations[team][currentLanguage] : team}
            </h3>
            <table
              className="min-w-full border-collapse border border-gray-600
               bg-gray-50 rounded-lg 
                overflow-hidden shadow-md"
            >
              <thead className="bg-gray-800 text-yellow-400">
                <tr>
                  <th className="border border-gray-300 p-4">
                    {t("training.day")} {/* Now using the t() function */}
                  </th>
                  <th className="border border-gray-300 p-4">
                    {t("training.time")} {/* Now using the t() function */}
                  </th>
                  <th className="border border-gray-300 p-4">
                    {t("training.location")} {/* Now using the t() function */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedules[team]?.map((schedule, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-100 transition-colors font-medium"
                  >
                    <td className="border border-gray-300 p-4 text-center">
                      {translations.day?.[schedule.day.toLowerCase()] // Use optional chaining
                        ? translations.day[schedule.day.toLowerCase()][
                            currentLanguage
                          ]
                        : schedule.day}
                    </td>
                    <td className="border border-gray-300 p-4 text-center">
                      {Object.values(translations.time || {}).find(
                        (time) => time.en === schedule.time,
                      )
                        ? Object.values(translations.time || {}).find(
                            (time) => time.en === schedule.time,
                          )[currentLanguage]
                        : schedule.time}
                    </td>
                    <td className="border border-gray-300 p-4 text-center">
                      {Object.values(translations.location || {}).find(
                        (location) => location.en === schedule.location,
                      )
                        ? Object.values(translations.location || {}).find(
                            (location) => location.en === schedule.location,
                          )[currentLanguage]
                        : schedule.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 text-xl font-semibold">
          {t("training.noTraining")}
        </p>
      )}
    </div>
  );
};

export default TrainingSchedule;
