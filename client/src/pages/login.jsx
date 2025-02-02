import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../config"; // Import backend URL
import "../styles.css";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                navigate("/dashboard"); // Redirect after successful login
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleSpotifyLogin = () => {
        window.location.href = `${config.BACKEND_URL}/auth/spotify`; // Redirect to backend for Spotify login
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <Link to="/" className="back-arrow">❮</Link>

                <h2 className="auth-title">Login</h2>
                <form className="auth-form" onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />
                    <button type="submit" className="button">Login</button>
                </form>

                <p>Or</p>
                <button onClick={handleSpotifyLogin} className="spotify-button">
                    Log In with Spotify
                </button>

                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
