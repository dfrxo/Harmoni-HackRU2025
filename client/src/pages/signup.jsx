import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Signup = () => {
    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Back Arrow to Home */}
                <Link to="/" className="back-arrow">❮</Link>

                <h2 className="auth-title">Sign Up</h2>
                <form className="auth-form">
                    <input type="text" placeholder="Username" className="input" />
                    <input type="email" placeholder="Email" className="input" />
                    <input type="password" placeholder="Password" className="input" />
                    <button type="submit" className="button">Sign Up</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;
