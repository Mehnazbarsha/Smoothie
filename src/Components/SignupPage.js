import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import "./SignupPage.css";

function SignupPage({ handleLogin }) {
  const { t, i18n } = useTranslation();
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setNativeLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  async function registerUser(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nativeLanguage,
        email,
        firstName,
        lastName,
      });

      if (handleLogin) {
        handleLogin(email, nativeLanguage);
      }
      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  }

  return (
    <div className="signup-page">
      <h1 className="title">Smoothie</h1>
      <form onSubmit={registerUser} className="form-container">
        {/* Native Language First */}
        <div className="form-group">
          <label htmlFor="nativeLanguage">{t("native_language")}</label>
          <br />
          <select
            id="nativeLanguage"
            value={nativeLanguage}
            onChange={handleLanguageChange}
            required
          >
            <option value="">{t("select_language_option")}</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="ja">Japanese</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <br />
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">{t("email")}</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">{t("password")}</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="signup-button" type="submit">
          {t("register")}
        </button>
      </form>

      <div className="signup-section">
        <p>{t("already_have_account")}</p>
        <button className="signup-button" onClick={() => navigate("/")}>
          {t("log_in")}
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
