import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import "react-tooltip/dist/react-tooltip.css";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import News from "./pages/News";
import Matches from "./pages/Matches";
import Stadium from "./pages/Stadium";
import Team from "./pages/Team";
import MensTeam from "./components/MensTeam";
import WomensTeam from "./components/WomensTeam";
import AcademyTeam from "./components/AcademyTeam";
import U17 from "./components/U17";
import CoachingStaff from "./components/CoachingStaff";
import MedicalStaff from "./components/MedicalStaff";
import Registration from "./components/Registration";
import About from "./components/About";
import Injury from "./components/Injury";
import WomenNews from "./components/WomenNews";
import Derby from "./components/Derby";
import PlayerOfTheMonth from "./components/PlayerOfTheMonth";
import Regional from "./components/Regional";
import PressRelease from "./components/PressRelease";
import RecapMatch from "./components/RecapMatch";
import Store from "./components/Store";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import YouthTeamNews from "./components/YouthTeamNews";
import WomenTeamLoss from "./components/WomenTeamLoss";
import TrainingSchedule from "./components/TrainingSchedule";
import CookiePopup from "./components/CookiePopup";
import PrivacyPolicy from "./components/PrivacyPolicy";
import StandingsShowcase from "./components/StandingsShowcase";
import Standings from "./components/Standings";

const App = () => {
  const [basket, setBasket] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Added the Tawk.to live chat script dynamically when the component mounts
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = import.meta.env.VITE_TAWKTO_URL; // Accessing Tawk.to URL from .env
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  // Get the current language from i18next
  const language = i18n.language || "en"; // Default to English if no language is set

  // Utility function to add the language prefix to routes
  const getLanguagePrefix = (path) => {
    return `/${language}${path}`;
  };

  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <ScrollToTop />
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* General Pages */}
              <Route path={getLanguagePrefix("/")} element={<Home />} exact />
              <Route
                path={getLanguagePrefix("/news")}
                element={<News />}
                exact
              />
              <Route
                path={getLanguagePrefix("/matches")}
                element={<Matches />}
                exact
              />
              <Route
                path={getLanguagePrefix("/team")}
                element={<Team />}
                exact
              />
              <Route
                path={getLanguagePrefix("/stadium")}
                element={<Stadium />}
                exact
              />
              <Route
                path={getLanguagePrefix("/training-schedule")}
                element={<TrainingSchedule />}
                exact
              />
              <Route
                path={getLanguagePrefix("/about-us")}
                element={<About />}
                exact
              />

              {/* Team Pages */}
              <Route
                path={getLanguagePrefix("/team/mens")}
                element={<MensTeam />}
                exact
              />
              <Route
                path={getLanguagePrefix("/team/womens")}
                element={<WomensTeam />}
                exact
              />
              <Route
                path={getLanguagePrefix("/team/academy")}
                element={<AcademyTeam />}
                exact
              />
              <Route
                path={getLanguagePrefix("/team/u17")}
                element={<U17 />}
                exact
              />
              <Route
                path={getLanguagePrefix("/team/coaching-staff")}
                element={<CoachingStaff />}
                exact
              />
              <Route
                path={getLanguagePrefix("/team/medical-staff")}
                element={<MedicalStaff />}
                exact
              />

              {/* Store & Checkout Pages */}
              <Route
                path={getLanguagePrefix("/store")}
                element={<Store basket={basket} setBasket={setBasket} />}
                exact
              />
              <Route
                path={getLanguagePrefix("/checkout")}
                element={<Checkout basket={basket} setBasket={setBasket} />}
                exact
              />
              <Route
                path={getLanguagePrefix("/confirmation")}
                element={<Confirmation />}
                exact
              />

              {/* News Pages */}
              <Route
                path={getLanguagePrefix("/news/2024-2025-academy-registration")}
                element={<Registration />}
                exact
              />
              <Route
                path={getLanguagePrefix("/news/dennis-molembe-injury-update")}
                element={<Injury />}
                exact
              />
              <Route
                path={getLanguagePrefix(
                  "/news/womens-team-update/major-changes-to-our-female-squad",
                )}
                element={<WomenNews />}
                exact
              />
              <Route
                path={getLanguagePrefix(
                  "/news/fc-flippers-women-suffer-defeat-against-brennan-fc-womens-team",
                )}
                element={<WomenTeamLoss />}
                exact
              />
              <Route
                path={getLanguagePrefix("/news/clash-of-the-derby-2024-2025")}
                element={<Derby />}
                exact
              />
              <Route
                path={getLanguagePrefix(
                  "/news/youth-team-wins-4-team-tournament-2024",
                )}
                element={<YouthTeamNews />}
                exact
              />
              <Route
                path={getLanguagePrefix(
                  "/news/fred-sommer-player-of-the-month",
                )}
                element={<PlayerOfTheMonth />}
                exact
              />
              <Route
                path={getLanguagePrefix("/news/u17-team-wins-first-match")}
                element={<Regional />}
                exact
              />
              <Route
                path={getLanguagePrefix(
                  "/news/fc-flippers-announces-coaching-course",
                )}
                element={<PressRelease />}
                exact
              />
              <Route
                path={getLanguagePrefix("/news/recap-of-fc-knights-game")}
                element={<RecapMatch />}
                exact
              />
              <Route
                path={getLanguagePrefix("/standings")}
                element={<Standings />}
                exact
              />

              {/* Privacy Policy */}
              <Route
                path={getLanguagePrefix("/privacy-policy")}
                element={<PrivacyPolicy />}
                exact
              />

              {/* Redirect to language-prefixed Home only if no other route matches */}
              <Route
                path="*"
                element={<Navigate to={getLanguagePrefix("/")} replace />}
              />
            </Routes>
            <CookiePopup />
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
