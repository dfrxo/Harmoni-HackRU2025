import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const ProfileCompletion = () => {
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        if (images.length < 3) {
            const file = event.target.files[0];
            setImages([...images, file]);
        }
    };

    const handleSubmit = () => {
        // Send profile data to backend
        console.log({ name, age, gender, genres, artists, songs, images });
        navigate("/dashboard"); // Redirect to the dashboard after completion
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2 className="auth-title">Complete Your Profile</h2>

                <input type="text" placeholder="Your Name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Your Age" className="input" value={age} onChange={(e) => setAge(e.target.value)} />

                <select className="input" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-Binary</option>
                </select>

                <label className="file-upload">
                    Upload Pictures (1-3)
                    <input type="file" onChange={handleImageUpload} />
                </label>
                <p>{images.length} images uploaded</p>

                <button className="button" onClick={handleSubmit}>Finish & Start Swiping</button>
            </div>
        </div>
    );
};

export default ProfileCompletion;
