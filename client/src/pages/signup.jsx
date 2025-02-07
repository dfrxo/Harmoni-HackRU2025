import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault(); // Prevent page refresh
        console.log("✅ Redirecting to Profile Completion..."); // Debugging log
        navigate("/profile-completion"); // Redirect immediately
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <Link to="/" className="back-arrow">❮</Link>

                <h2 className="auth-title">Sign Up</h2>
                <form className="auth-form" onSubmit={handleSignup}>
                    <input type="text" placeholder="Username" className="input" required />
                    <input type="email" placeholder="Email" className="input" required />
                    <input type="password" placeholder="Password" className="input" required />
                    <button type="submit" className="button">Sign Up</button>
                </form>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;
