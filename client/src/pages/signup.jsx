import React from "react";
import "../styles.css";

const Signup = () => {
    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form>
                <input type="text" placeholder="Username" className="input" />
                <input type="email" placeholder="Email" className="input" />
                <input type="password" placeholder="Password" className="input" />
                <button type="submit" className="button">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
