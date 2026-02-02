import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Lessons.css";

function Lesson1({ onComplete }) {
  const { t } = useTranslation();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showToastType, setShowToastType] = useState(null);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [lessonPassed, setLessonPassed] = useState(false);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  const englishOptions = {
    option_goodbye: "goodbye",
    option_hello: "hello",
    option_thank_you: "thank you",
    option_good_night: "good night",
    option_good_morning: "good morning",
    option_good_evening: "good evening",
    option_how_are_you: "how are you",
    option_see_you_later: "see you later",
    option_im_fine: "I'm fine",
    option_please: "please",
    option_no: "no",
    option_sorry: "sorry",
    option_you_are_welcome: "you're welcome",
  };

  useEffect(() => {
    const generatedQuestions = [
      {
        question: "how_do_you_say_hello",
        options: ["option_goodbye", "option_hello", "option_thank_you"],
        correctAnswer: "option_hello",
        required: true,
      },
      {
        question: "how_do_you_say_good_morning",
        options: ["option_good_night", "option_hello", "option_good_morning"],
        correctAnswer: "option_good_morning",
        required: true,
      },
      {
        question: "how_do_you_say_good_evening",
        options: ["option_good_evening", "option_goodbye", "option_thank_you"],
        correctAnswer: "option_good_evening",
        required: true,
      },
      {
        question: "how_do_you_say_good_night",
        options: ["option_good_night", "option_good_morning", "option_hello"],
        correctAnswer: "option_good_night",
        required: true,
      },
      {
        question: "how_do_you_say_how_are_you",
        options: ["option_how_are_you", "option_see_you_later", "option_thank_you"],
        correctAnswer: "option_how_are_you",
        required: true,
      },
      {
        question: "how_do_you_say_im_fine",
        options: ["option_goodbye", "option_im_fine", "option_hello"],
        correctAnswer: "option_im_fine",
        required: false,
      },
      {
        question: "how_do_you_say_please",
        options: ["option_please", "option_no", "option_thank_you"],
        correctAnswer: "option_please",
        required: false,
      },
      {
        question: "how_do_you_say_thank_you",
        options: ["option_sorry", "option_thank_you", "option_good_night"],
        correctAnswer: "option_thank_you",
        required: false,
      },
      {
        question: "how_do_you_say_you_are_welcome",
        options: ["option_hello", "option_you_are_welcome", "option_good_morning"],
        correctAnswer: "option_you_are_welcome",
        required: false,
      },
      {
        question: "how_do_you_say_goodbye",
        options: ["option_goodbye", "option_thank_you", "option_hello"],
        correctAnswer: "option_goodbye",
        required: false,
      },
    ];

    const shuffled = [...generatedQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, [t]);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (option) => {
    if (!isAnswered) setSelectedOption(option);
  };

  const checkAnswer = () => {
    if (!isAnswered && selectedOption) {
      const correct = selectedOption === currentQuestion.correctAnswer;
      if (correct) setCorrectAnswers((prev) => Math.min(prev + 1, 5));
      setIsAnswered(true);
      setShowContinue(true);
      setShowToastType(correct ? "success" : "error");
    }
  };

  const handleContinue = () => {
    setSelectedOption("");
    setIsAnswered(false);
    setShowContinue(false);
    setShowToastType(null);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length && correctAnswers < 5) {
      setCurrentIndex(nextIndex);
    } else {
      const passed = correctAnswers >= 5;
      setLessonComplete(true);
      setLessonPassed(passed);
    }
  };

  const handleLessonComplete = () => {
    // Call the parent's onComplete callback with the pass/fail status
    if (onComplete) {
      onComplete(lessonPassed);
    }
  };

  const handleRetry = () => {
    // Reset lesson state for retry
    setCurrentIndex(0);
    setSelectedOption("");
    setIsAnswered(false);
    setShowContinue(false);
    setCorrectAnswers(0);
    setShowToastType(null);
    setLessonComplete(false);
    setLessonPassed(false);
    
    // Reshuffle questions
    const generatedQuestions = [
      {
        question: "how_do_you_say_hello",
        options: ["option_goodbye", "option_hello", "option_thank_you"],
        correctAnswer: "option_hello",
        required: true,
      },
      {
        question: "how_do_you_say_good_morning",
        options: ["option_good_night", "option_hello", "option_good_morning"],
        correctAnswer: "option_good_morning",
        required: true,
      },
      {
        question: "how_do_you_say_good_evening",
        options: ["option_good_evening", "option_goodbye", "option_thank_you"],
        correctAnswer: "option_good_evening",
        required: true,
      },
      {
        question: "how_do_you_say_good_night",
        options: ["option_good_night", "option_good_morning", "option_hello"],
        correctAnswer: "option_good_night",
        required: true,
      },
      {
        question: "how_do_you_say_how_are_you",
        options: ["option_how_are_you", "option_see_you_later", "option_thank_you"],
        correctAnswer: "option_how_are_you",
        required: true,
      },
      {
        question: "how_do_you_say_im_fine",
        options: ["option_goodbye", "option_im_fine", "option_hello"],
        correctAnswer: "option_im_fine",
        required: false,
      },
      {
        question: "how_do_you_say_please",
        options: ["option_please", "option_no", "option_thank_you"],
        correctAnswer: "option_please",
        required: false,
      },
      {
        question: "how_do_you_say_thank_you",
        options: ["option_sorry", "option_thank_you", "option_good_night"],
        correctAnswer: "option_thank_you",
        required: false,
      },
      {
        question: "how_do_you_say_you_are_welcome",
        options: ["option_hello", "option_you_are_welcome", "option_good_morning"],
        correctAnswer: "option_you_are_welcome",
        required: false,
      },
      {
        question: "how_do_you_say_goodbye",
        options: ["option_goodbye", "option_thank_you", "option_hello"],
        correctAnswer: "option_goodbye",
        required: false,
      },
    ];

    const shuffled = [...generatedQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  };

  return (
    <div className="lesson-container">
      {lessonComplete && (
        <div className="lesson-complete-overlay">
          <div className="lesson-complete-modal">
            <h2 className="lesson-result-title">
              {lessonPassed ? t("lesson_passed", "Lesson Passed!") : t("lesson_failed", "Try Again!")}
            </h2>
            <p className="lesson-result-message">
              {lessonPassed
                ? t("lesson_passed_message", "Great job! You got {{score}} out of 5 correct.", { score: correctAnswers })
                : t("lesson_failed_message", "You need at least 5 correct answers to pass. You got {{score}} out of 5.", { score: correctAnswers })}
            </p>
            <div className="lesson-complete-buttons">
              <button className="lesson-complete-button" onClick={handleLessonComplete}>
                {lessonPassed ? t("continue_learning", "Continue Learning") : t("back_to_lessons", "Back to Lessons")}
              </button>
              {!lessonPassed && (
                <button className="lesson-complete-button retry-button" onClick={handleRetry}>
                  {t("try_again", "Try Again")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progress Circle */}
      <div className="progress-container" aria-label="progress">
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring-circle-bg"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className="progress-ring-circle"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference - (correctAnswers / 5) * circumference,
              transition: "stroke-dashoffset 0.5s ease-in-out",
            }}
          />
        </svg>
        <div className="progress-text">{Math.round((correctAnswers / 5) * 100)}%</div>
      </div>

      {showToastType && (
        <div className={`toast ${showToastType} show toast-top-right`}>
          <div className="toast-content">
            <div className="toast-title">{t(showToastType === "success" ? "correct" : "incorrect")}</div>
          </div>
        </div>
      )}

      <h1>{t(currentQuestion?.question ?? "loading")}</h1>

      <div className="option-buttons">
        {currentQuestion?.options.map((option) => (
          <button
            key={option}
            className={selectedOption === option ? "selected" : ""}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
          >
            {englishOptions[option] || option}
          </button>
        ))}
      </div>

      {!isAnswered && selectedOption && (
        <button className="check-button" onClick={checkAnswer}>
          {t("check", "Check")}
        </button>
      )}

      {isAnswered && showContinue && (
        <button className="continue-button" onClick={handleContinue}>
          {t("continue", "Continue")}
        </button>
      )}
    </div>
  );
}

export default Lesson1;