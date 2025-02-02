import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../config"; // Import backend URL
import "../styles.css";

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.BACKEND_URL}/api/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate("/profile-completion"); // Redirect after successful signup
            } else {
                console.error("Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <Link to="/" className="back-arrow">❮</Link>

                <h2 className="auth-title">Sign Up</h2>
                <form className="auth-form" onSubmit={handleSignup}>
                    <input type="text" name="username" placeholder="Username" className="input" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />
                    <button type="submit" className="button">Sign Up</button>
                </form>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;
