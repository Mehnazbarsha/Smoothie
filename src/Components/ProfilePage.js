import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import HomeIcon from "../Home.svg";
import AcheivementIcon from "../Achievement.svg";
import ProfileIcon from "../Profile.svg";

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div>
          <p className="profile-kicker">Profile</p>
          <h1>Light Green Profile</h1>
          <p className="profile-subtitle">
            Update your details and keep your Smoothie journey fresh.
          </p>
        </div>
      </header>

      <section className="profile-card">
        <div className="profile-avatar" />
        <div className="profile-details">
          <h2>Welcome back!</h2>
          <p>Swap your photo or update your personal preferences anytime.</p>
          <div className="profile-actions">
            <button className="primary-action">Edit Profile</button>
            <button className="ghost-action">Change Photo</button>
          </div>
        </div>
      </section>

      <section className="profile-grid">
        <div className="profile-info">
          <h3>Learning Goals</h3>
          <p>Set daily streak targets and preferred practice times.</p>
        </div>
        <div className="profile-info">
          <h3>Language Preferences</h3>
          <p>Choose your native and practice languages.</p>
        </div>
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
        <div
          className="icon-item"
          onClick={() => navigate("/achievements")}
          role="button"
          tabIndex={0}
        >
          <img src={AcheivementIcon} alt="Achievement" className="icon-svg icon-img" />
        </div>
        <div className="icon-item active">
          <img src={ProfileIcon} alt="Profile" className="icon-svg icon-img" />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
