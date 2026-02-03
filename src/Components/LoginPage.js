import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./LoginPage.css";

function LoginPage({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.exists() ? docSnap.data() : null;

      const userLanguage = userData?.nativeLanguage || "en";

      if (handleLogin) {
        handleLogin(email, userLanguage);
      }
      navigate("/home");
    } catch (error) {
  console.error(
    "Sign in error:",
    error.code,
    error.message
  );
}
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <div className="brand">
            <span className="brand-kicker">Welcome Back</span>
            <h1 className="brand-title">Smoothie</h1>
            <p className="brand-subtitle">
              Pick up your language streak and keep your progress flowing.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="primary-button" type="submit">Log In</button>
          </form>
          <div className="auth-footer">
            <span>Don't have an account?</span>
            <Link className="text-link" to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
