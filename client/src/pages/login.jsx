import React from "react";
import "../styles.css";

const Login = () => {
    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form>
                <input type="email" placeholder="Email" className="input" />
                <input type="password" placeholder="Password" className="input" />
                <button type="submit" className="button">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
};

export default Login;
