import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Home = () => {
    const [showAuthOptions, setShowAuthOptions] = useState(false);
    const navigate = useNavigate();

    const handleSpotifySignup = () => {
        window.location.href = "http://localhost:4000/auth/spotify"; // Redirect to Spotify OAuth
    };

    const handleEmailSignup = () => {
        navigate("/signup"); // Redirect to Signup Page
    };

    return (
        <div className={`home ${showAuthOptions ? "expanded-home" : ""}`}>
            <h1 className="home-title">Welcome to Harmoni</h1>
            <p className="home-text">The best dating app for music lovers</p>

            {/* Get Started Button */}
            <button className="button" onClick={() => setShowAuthOptions(!showAuthOptions)}>
                Get Started
            </button>

            {/* Full-Width Authentication Dropdown */}
            <div className={`auth-dropdown-container ${showAuthOptions ? "show" : ""}`}>
                <div className="auth-dropdown">
                    <h3>Select a Sign-Up Method</h3>
                    <button onClick={handleSpotifySignup} className="auth-option spotify-button">
                        Sign Up with Spotify
                    </button>
                    <button onClick={handleEmailSignup} className="auth-option email-button">
                        Sign Up with Email
                    </button>
                    <hr className="dropdown-divider" />
                    <Link to="/login" className="auth-option login-option">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
