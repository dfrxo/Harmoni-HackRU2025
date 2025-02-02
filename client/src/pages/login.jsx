import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Login = () => {
    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Back Arrow to Home */}
                <Link to="/" className="back-arrow">❮</Link>

                <h2 className="auth-title">Login</h2>
                <form className="auth-form">
                    <input type="email" placeholder="Email" className="input" />
                    <input type="password" placeholder="Password" className="input" />
                    <button type="submit" className="button">Login</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
