import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Profile = () => {
    return (
        <div className="profile-page">
            <h1>👤 Your Profile</h1>
            <p>Profile details and edit functionality will go here.</p>
            <Link to="/dashboard" className="back-button">← Back to Dashboard</Link>
        </div>
    );
};

export default Profile;
