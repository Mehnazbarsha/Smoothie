import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import "./HomePage.css";
import Lesson1 from "../EnglishLessons/Lesson1";

import enFlag from "../united-states.png";
import frFlag from "../france.png";
import esFlag from "../spain.png";
import jaFlag from "../japan.png";

import Streak1 from "../Streak1.png";
import Streak2 from "../Streak2.png";
import Streak3 from "../Streak3.png";
import Streak4 from "../Streak4.png";
import Streak5 from "../Streak5.png";
import Streak6 from "../Streak6.png";
import Streak7 from "../Streak7.png";

import strawberry from "../strawberry.png";
import blueberry from "../blueberry.png";
import banana from "../banana.png";

import HomeIcon from "../Home.svg";
import AcheivementIcon from "../Achievement.svg";
import ProfileIcon from "../Profile.svg";
import PointsIcon from "../Points.svg";
import StreakIcon from "../Streak.svg";

function HomePage(props) {
  const { t, i18n } = useTranslation();

  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [showLogoutButton, setShowLogoutButton] = useState(true);
  const [currentPracticeLanguage, setCurrentPracticeLanguage] = useState(null);
  const [streakCount, setStreakCount] = useState(0);
  const [lastLessonDate, setLastLessonDate] = useState(null);
  const [streakStartDate, setStreakStartDate] = useState(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [userProfile, setUserProfile] = useState(null);
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(1000);

  // Calculate XP and Level based on completed lessons
  const calculateXPAndLevel = (completedLessonsSet) => {
    const totalXP = completedLessonsSet.size * 100; // 100 XP per lesson
    const level = Math.floor(totalXP / 1000) + 1; // 1000 XP per level, starting at level 1
    const currentLevelXP = totalXP % 1000; // XP progress in current level
    
    return {
      totalXP,
      level,
      currentLevelXP,
      xpToNextLevel: 1000
    };
  };

  // Check if streak should be reset due to missing a day
  const checkStreakValidity = (lastDate, currentStreak) => {
    if (!lastDate || currentStreak === 0) return 0;
    
    const today = new Date();
    const lastLessonDate = new Date(lastDate);
    
    // Calculate days since last lesson
    const timeDiff = today.getTime() - lastLessonDate.getTime();
    const daysSinceLastLesson = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // If more than 1 day has passed, streak is broken
    if (daysSinceLastLesson > 1) {
      return 0;
    }
    
    return currentStreak;
  };

  useEffect(() => {
    if (props.userLanguage) {
      i18n.changeLanguage(props.userLanguage);
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      const fetchUserProfile = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();

      const hasLoggedInBefore = localStorage.getItem(`loggedInBefore_${userId}`);

      if (hasLoggedInBefore) {
        setIsFirstLogin(false);
      } else {
        setIsFirstLogin(true);
        localStorage.setItem(`loggedInBefore_${userId}`, "true");
      }

      // Load streak data
      const savedStreakCount = localStorage.getItem(`streakCount_${userId}`);
      const savedLastLessonDate = localStorage.getItem(`lastLessonDate_${userId}`);
      const savedStreakStartDate = localStorage.getItem(`streakStartDate_${userId}`);

      if (savedStreakCount && savedLastLessonDate && savedStreakStartDate) {
        const streakNum = parseInt(savedStreakCount);
        const lastDate = new Date(savedLastLessonDate);
        const startDate = new Date(savedStreakStartDate);
        
        // Check if streak is still valid
        const validStreak = checkStreakValidity(lastDate, streakNum);
        
        if (validStreak === 0) {
          // Streak broken, reset to 0
          setStreakCount(0);
          setLastLessonDate(null);
          setStreakStartDate(null);
          localStorage.removeItem(`streakCount_${userId}`);
          localStorage.removeItem(`lastLessonDate_${userId}`);
          localStorage.removeItem(`streakStartDate_${userId}`);
        } else {
          setStreakCount(validStreak);
          setLastLessonDate(lastDate);
          setStreakStartDate(startDate);
        }
      }

      const savedCompletedLessons = localStorage.getItem(`completedLessons_${userId}`);
      if (savedCompletedLessons) {
        const lessonsSet = new Set(JSON.parse(savedCompletedLessons));
        setCompletedLessons(lessonsSet);
        
        // Calculate and set XP/Level based on completed lessons
        const xpData = calculateXPAndLevel(lessonsSet);
        setUserXP(xpData.currentLevelXP);
        setUserLevel(xpData.level);
        setXpToNextLevel(xpData.xpToNextLevel);
      }
    }
  }, [props.userLanguage, i18n]);

  const allLanguages = [
    { code: "en", label: t("english", "English"), flag: enFlag },
    { code: "fr", label: t("french", "French"), flag: frFlag },
    { code: "ja", label: t("japanese", "Japanese"), flag: jaFlag },
    { code: "es", label: t("spanish", "Spanish"), flag: esFlag },
  ];

  const normalizeCode = (code) => (code ? code.toLowerCase().trim().slice(0, 2) : "");
  const userLangCode = normalizeCode(props.userLanguage);
  const filteredLanguages = allLanguages.filter((lang) => lang.code !== userLangCode);

  const lessonsByLanguage = {
    en: [
      { id: "lesson1", title: t("lesson1", "Basic Greetings and Polite Phrases") },
      { id: "lesson2", title: t("lesson2", "TBD") },
      { id: "lesson3", title: t("lesson3", "TBD") }
    ],
    es: [{ id: "lesson1", title: t("lesson1", "Saludos básicos y frases de cortesía") }],
    fr: [{ id: "lesson1", title: t("lesson1", "Salutations de base et formules de politesse") }],
    ja: [{ id: "lesson1", title: t("lesson1", "基本的な挨拶と丁寧な表現") }],
  };

  const getLanguageName = (langCode) => {
    switch (langCode) {
      case "en": return "english";
      case "fr": return "french";
      case "es": return "spanish";
      case "ja": return "japanese";
      default: return langCode;
    }
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "?";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getProgressPercentage = () => {
    return (userXP / xpToNextLevel) * 100;
  };

  const handleDropdownToggle = () => setShowDropdown((prev) => !prev);

  const handlePracticeLanguageSelect = (langCode) => {
    setCurrentPracticeLanguage(langCode);
    setShowDropdown(false);
    setCurrentPage("lessons");
  };

  const handleLessonClick = (lessonId) => {
    const lessonKey = `${currentPracticeLanguage}_${lessonId}`;
    if (completedLessons.has(lessonKey)) return;
    setCurrentPage(lessonId);
    setShowLogoutButton(false);
  };

  const handleLessonComplete = (lessonId, passed) => {
    if (passed) {
      const lessonKey = `${currentPracticeLanguage}_${lessonId}`;
      const newCompletedLessons = new Set(completedLessons);
      newCompletedLessons.add(lessonKey);
      setCompletedLessons(newCompletedLessons);

      // Calculate and update XP/Level
      const xpData = calculateXPAndLevel(newCompletedLessons);
      setUserXP(xpData.currentLevelXP);
      setUserLevel(xpData.level);
      setXpToNextLevel(xpData.xpToNextLevel);

      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        localStorage.setItem(
          `completedLessons_${user.uid}`,
          JSON.stringify([...newCompletedLessons])
        );

        // Handle streak logic
        const today = new Date();
        const todayDateString = today.toDateString();
        const lastLessonDateString = lastLessonDate ? lastLessonDate.toDateString() : null;

        // Check if user already completed a lesson today
        if (lastLessonDateString !== todayDateString) {
          let newStreakCount = streakCount;
          let newStreakStartDate = streakStartDate;

          if (streakCount === 0) {
            // Starting a new streak
            newStreakCount = 1;
            newStreakStartDate = today;
          } else {
            // Check if this is consecutive day
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayDateString = yesterday.toDateString();

            if (lastLessonDateString === yesterdayDateString) {
              // Consecutive day - increment streak (max 7)
              newStreakCount = Math.min(streakCount + 1, 7);
              
              // If we reach 7, start a new cycle
              if (newStreakCount === 7 && streakCount === 6) {
                // Keep the streak at 7 but update start date for new cycle
                newStreakStartDate = today;
              }
            } else {
              // Gap in streak - reset to 1
              newStreakCount = 1;
              newStreakStartDate = today;
            }
          }

          setStreakCount(newStreakCount);
          setLastLessonDate(today);
          setStreakStartDate(newStreakStartDate);

          // Save streak data
          localStorage.setItem(`streakCount_${user.uid}`, newStreakCount.toString());
          localStorage.setItem(`lastLessonDate_${user.uid}`, today.toISOString());
          localStorage.setItem(`streakStartDate_${user.uid}`, newStreakStartDate.toISOString());
        }
      }
    }

    setCurrentPage("lessons");
    setShowLogoutButton(true);
  };

  const handleBackFromLesson = () => {
    setCurrentPage("lessons");
    setShowLogoutButton(true);
  };

  const handleBackFromLessons = () => {
    setCurrentPage("home");
    setCurrentPracticeLanguage(null);
    setShowLogoutButton(true);
  };

  const handleLogout = () => {
    if (props.handleLogout) props.handleLogout();
  };

  const isLessonCompleted = (lessonId) => {
    const lessonKey = `${currentPracticeLanguage}_${lessonId}`;
    return completedLessons.has(lessonKey);
  };

  const getNextAvailableLesson = () => {
    if (!currentPracticeLanguage) return null;
    const lessons = lessonsByLanguage[currentPracticeLanguage] || [];
    return lessons.find(lesson => !isLessonCompleted(lesson.id));
  };

  const renderLessonContent = () => {
    if (!currentPracticeLanguage) return null;

    if (currentPracticeLanguage === "en") {
      switch (currentPage) {
        case "lesson1":
          return (
            <Lesson1
              onComplete={(passed) => handleLessonComplete("lesson1", passed)}
            />
          );
        default:
          return <div>{t("lessonNotFound", "Lesson not found")}</div>;
      }
    }

    return (
      <div>
        {t("lessonsComingSoon", "Lessons coming soon for this language! Please check back later.")}
      </div>
    );
  };

  return (
    <div className="home-page">
      {currentPracticeLanguage && (
        <div className="top-left-flag">
          <img
            src={allLanguages.find((lang) => lang.code === currentPracticeLanguage)?.flag}
            alt="Selected Language Flag"
            className="flag-icon"
          />
        </div>
      )}

      {currentPage === "home" && (
        <>
          <h1 className="homepage-title">Smoothie</h1>

          <div className="welcome-message">
            <h2>
              {isFirstLogin
                ? t("welcome", "Welcome to Smoothie!")
                : t("welcomeBack", "Welcome back to Smoothie!")}
            </h2>

            <div className="practice-button">
            <button onClick={handleDropdownToggle} className="language-select-button">
              {t("select_language", "Select Language")}
              <span className="dropdown-arrow" />
            </button>

              {showDropdown && (
                <ul className="dropdown-menu">
                  {filteredLanguages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => handlePracticeLanguageSelect(lang.code)}
                        className="language-option"
                      >
                        <img src={lang.flag} alt={`${lang.label} flag`} className="flag-icon" />
                        {lang.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mint-box">
            <div className="profile-strip">
              <div className="profile-header">
                <div className="profile-picture">
                  {userProfile ? getInitials(userProfile.firstName, userProfile.lastName) : "?"}
                </div>
                <div className="profile-greeting">
                  {userProfile 
                    ? `Hello, ${userProfile.firstName} ${userProfile.lastName}` 
                    : "Hello, User"}
                </div>
              </div>
              
              <div className="progress-section">
                <div className="level-section">
                  <div className="level-circle">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle
                        cx="30"
                        cy="30"
                        r="25"
                        fill="none"
                        stroke="#ffffff" 
                        strokeWidth="10"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="25"
                        fill="none"
                        stroke="#ffa6a6"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 25}
                        strokeDashoffset={2 * Math.PI * 25 * (1 - getProgressPercentage() / 100)}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.3s ease" }}
                      />
                    </svg>
                  </div>
                  <div className="level-label">Level {userLevel}</div>
                </div>

                <div className="stats-section">
                  <div className="stat-bar">
                    <div className="stat-content">
                      <img src={PointsIcon} alt="Points" className="stat-icon stat-img" />
                      <span className="stat-number">{userXP}</span>
                      <span className="stat-label">XP Points</span>
                    </div>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-content">
                      <img src={StreakIcon} alt="Streak" className="stat-icon stat-img" />
                      <span className="stat-number">{streakCount}</span>
                      <span className="stat-label">Day Streak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="second-strip">
              <div className="second-strip-content">
                <div className="fruit-item">
                  <img src={banana} alt="Banana" className="fruit-image" />
                  <p className="fruit-text">Banana Basics</p>
                  <button className="fruit-button">Learn</button>
                </div>
                <div className="fruit-item">
                  <img src={strawberry} alt="Strawberry" className="fruit-image" />
                  <p className="fruit-text">Strawberry Stories</p>
                  <button className="fruit-button">Read</button>
                </div>
                <div className="fruit-item">
                  <img src={blueberry} alt="Blueberry" className="fruit-image" />
                  <p className="fruit-text">Blueberry Blends</p>
                  <button className="fruit-button">Write</button>
                </div>
              </div>
            </div>
          </div>

          <div className="icon-row">
            <div className="icon-item">
              <img src={HomeIcon} alt="Home" className="icon-svg icon-img" />
            </div>
            <div className="icon-item">
              <img src={AcheivementIcon} alt="Achievement" className="icon-svg icon-img" />
            </div>
            <div className="icon-item">
              <img src={ProfileIcon} alt="Profile" className="icon-svg icon-img" />
            </div>
          </div>

          <div className="streak-bar">
            <div className="streak-fruits">
              {[Streak1, Streak2, Streak3, Streak4, Streak5, Streak6, Streak7].map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Day ${index + 1}`}
                    className={`streak-fruit ${index < streakCount ? "active" : ""}`}
                  />
                )
              )}
            </div>
            <div className="streak-counter">
              {streakCount} / 7 days
            </div>
          </div>
        </>
      )}

      {currentPage === "lessons" && currentPracticeLanguage && (
        <div className="lessons-popup">
          <h3>
            {t("selectLesson", {
              language: t(getLanguageName(currentPracticeLanguage)),
            })}
          </h3>

          {lessonsByLanguage[currentPracticeLanguage]?.length > 0 ? (
            <div className="lesson-list">
              {lessonsByLanguage[currentPracticeLanguage].map((lesson, index) => {
                const isCompleted = isLessonCompleted(lesson.id);
                const isAvailable =
                  !isCompleted &&
                  (index === 0 ||
                    isLessonCompleted(
                      lessonsByLanguage[currentPracticeLanguage][index - 1]?.id
                    ));

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson.id)}
                    className="lesson-button"
                    disabled={!isAvailable}
                  >
                    <span className="lesson-title">{lesson.title}</span>
                  </button>
                );
              })}

              {lessonsByLanguage[currentPracticeLanguage].every((lesson) =>
                isLessonCompleted(lesson.id)
              ) && (
                <div className="all-complete-message">
                  {t("allLessonsComplete", "Congratulations! You've completed all lessons!")}
                </div>
              )}
            </div>
          ) : (
            <p>{t("noLessons", "No lessons available for this language.")}</p>
          )}

          <button className="back-from-lessons" onClick={handleBackFromLessons}>
            {t("back", "Back")}
          </button>
        </div>
      )}

      {currentPage !== "home" && currentPage !== "lessons" && (
        <div className="lesson-page">
          {renderLessonContent()}
          <button className="back-from-lessons" onClick={handleBackFromLesson}>
            {t("back", "Back")}
          </button>
        </div>
      )}

      {showLogoutButton && (
        <button className="logout" onClick={handleLogout}>
          {t("logout", "Log Out")}
        </button>
      )}
    </div>
  );
}

export default HomePage;