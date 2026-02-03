import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import HomePage from "./Components/HomePage";
import AchievementsPage from "./Components/AchievementsPage";
import ProfilePage from "./Components/ProfilePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userLanguage, setUserLanguage] = useState("en");

  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(userLanguage);
  }, [userLanguage, i18n]);

  function handleLogin(email, language) {
    setIsLoggedIn(true);
    setUsername(email);
    setUserLanguage(language || "en");
    navigate("/home");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUsername("");
    setUserLanguage("en");
    navigate("/");
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
      <Route path="/signup" element={<SignupPage handleLogin={handleLogin} />} />
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <HomePage
              userLanguage={userLanguage}
              handleLogout={handleLogout}
            />
          ) : (
            <LoginPage handleLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/achievements"
        element={isLoggedIn ? <AchievementsPage /> : <LoginPage handleLogin={handleLogin} />}
      />
      <Route
        path="/profile"
        element={isLoggedIn ? <ProfilePage /> : <LoginPage handleLogin={handleLogin} />}
      />
    </Routes>
  );
}

export default App;
