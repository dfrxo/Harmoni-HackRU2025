import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Start Swiping</h1>

            {/* Swiping Section */}
            <div className="swiping-area">
                <p>🔀 Swiping Feature Will Go Here 🔀</p>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="dashboard-nav">
                <Link to="/messages" className="nav-button">💬 Messages</Link>
                <Link to="/profile" className="nav-button">👤 Profile</Link>
            </div>
        </div>
    );
};

export default Dashboard;
