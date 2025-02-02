import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config"; // Import backend URL
import "../styles.css";

const ProfileCompletion = () => {
    const [profileData, setProfileData] = useState({ name: "", age: "", gender: "", images: [] });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (event) => {
        if (profileData.images.length < 3) {
            const file = event.target.files[0];
            setProfileData({ ...profileData, images: [...profileData.images, file] });
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${config.BACKEND_URL}/api/profile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                navigate("/dashboard"); // Redirect after profile completion
            } else {
                console.error("Profile update failed");
            }
        } catch (error) {
            console.error("Profile update error:", error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-title">Complete Your Profile</h2>
                <input type="text" name="name" placeholder="Your Name" className="input" onChange={handleChange} required />
                <input type="number" name="age" placeholder="Your Age" className="input" onChange={handleChange} required />
                <input type="file" onChange={handleImageUpload} multiple />
                <button className="button" onClick={handleSubmit}>Finish & Start Swiping</button>
            </div>
        </div>
    );
};

export default ProfileCompletion;
