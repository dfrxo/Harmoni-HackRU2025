import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Home = () => {
    const [showAuthOptions, setShowAuthOptions] = useState(false);

    return (
        <div className={`home ${showAuthOptions ? "expanded-home" : ""}`}>
            <h1 className="home-title">Welcome to Harmony</h1>
            <p className="home-text">The best dating app for music lovers</p>

            {/* Smaller Get Started Button */}
            <button className="button" onClick={() => setShowAuthOptions(!showAuthOptions)}>
                Get Started
            </button>

            {/* Full-Width Authentication Dropdown (Expands Page) */}
            <div className={`auth-dropdown-container ${showAuthOptions ? "show" : ""}`}>
                <div className="auth-dropdown">
                    <h3>Select a Sign-Up Method</h3>
                    <Link to="/signup" className="auth-option">Sign Up with Spotify</Link>
                    <Link to="/signup" className="auth-option">Sign Up with Apple Music</Link>
                    <Link to="/signup" className="auth-option">Sign Up with Email</Link>
                    <hr className="dropdown-divider" />
                    <Link to="/login" className="auth-option login-option">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
