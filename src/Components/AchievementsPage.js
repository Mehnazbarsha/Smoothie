import React from "react";
import { useNavigate } from "react-router-dom";
import "./AchievementsPage.css";
import HomeIcon from "../Home.svg";
import AcheivementIcon from "../Achievement.svg";
import ProfileIcon from "../Profile.svg";

function AchievementsPage() {
  const navigate = useNavigate();

  return (
    <div className="achievements-page">
      <header className="achievements-header">
        <div>
          <p className="achievements-kicker">Achievements</p>
          <h1>Your Green Streaks</h1>
          <p className="achievements-subtitle">
            Celebrate milestones and keep your learning momentum growing.
          </p>
        </div>
      </header>

      <section className="achievements-grid">
        <div className="achievement-card">
          <h3>Consistency Leaf</h3>
          <p>Complete 7 days in a row to unlock the next tier.</p>
          <span className="achievement-badge">4 / 7 days</span>
        </div>
        <div className="achievement-card">
          <h3>Fresh Start</h3>
          <p>Finish your first lesson in a new language.</p>
          <span className="achievement-badge">In progress</span>
        </div>
        <div className="achievement-card">
          <h3>Growth Ring</h3>
          <p>Earn 1,000 XP to reach your next level.</p>
          <span className="achievement-badge">Leveling up</span>
        </div>
      </section>

      <section className="progress-strip">
        <div>
          <h4>Next up</h4>
          <p>Keep practicing to unlock your next mint medal.</p>
        </div>
        <button className="primary-action" onClick={() => navigate("/home")}>Practice now</button>
      </section>

      <div className="icon-row">
        <div
          className="icon-item"
          onClick={() => navigate("/home")}
          role="button"
          tabIndex={0}
        >
          <img src={HomeIcon} alt="Home" className="icon-svg icon-img" />
        </div>
        <div className="icon-item active">
          <img src={AcheivementIcon} alt="Achievement" className="icon-svg icon-img" />
        </div>
        <div
          className="icon-item"
          onClick={() => navigate("/profile")}
          role="button"
          tabIndex={0}
        >
          <img src={ProfileIcon} alt="Profile" className="icon-svg icon-img" />
        </div>
      </div>
    </div>
  );
}

export default AchievementsPage;
