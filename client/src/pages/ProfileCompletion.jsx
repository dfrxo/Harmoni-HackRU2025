import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config"; // Import backend URL
import "../styles.css";

const ProfileCompletion = () => {
    const [profileData, setProfileData] = useState({ name: "", age: "", gender: "", customGender: "", images: [] });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleGenderChange = (e) => {
        const selectedGender = e.target.value;
        setProfileData({ ...profileData, gender: selectedGender, customGender: selectedGender === "other" ? "" : selectedGender });
    };

    const handleCustomGenderChange = (e) => {
        setProfileData({ ...profileData, customGender: e.target.value });
    };

    const handleImageUpload = (event) => {
        if (profileData.images.length < 3) {
            const file = event.target.files[0];
            setProfileData({ ...profileData, images: [...profileData.images, file] });
        }
    };

    const handleSubmit = () => {
        console.log({ ...profileData, gender: profileData.customGender || profileData.gender });
        navigate("/dashboard"); // Redirect after profile completion
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-title">Complete Your Profile</h2>

                <input type="text" name="name" placeholder="Your Name" className="input" onChange={handleChange} required />
                <input type="number" name="age" placeholder="Your Age" className="input" onChange={handleChange} required />

                <select className="input" name="gender" onChange={handleGenderChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-Binary</option>
                    <option value="other">Other</option>
                </select>

                {profileData.gender === "other" && (
                    <input
                        type="text"
                        placeholder="Enter your gender"
                        className="input"
                        name="customGender"
                        onChange={handleCustomGenderChange}
                        required
                    />
                )}

                <label className="file-upload">
                    Upload Pictures (1-3)
                    <input type="file" onChange={handleImageUpload} />
                </label>
                <p>{profileData.images.length} images uploaded</p>

                <button className="button" onClick={handleSubmit}>Finish & Start Swiping</button>
            </div>
        </div>
    );
};

export default ProfileCompletion;
