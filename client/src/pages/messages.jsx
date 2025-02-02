import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Messages = () => {
    return (
        <div className="messages-page">
            <h1>📨 Your Messages</h1>
            <p>Message functionality will go here.</p>
            <Link to="/dashboard" className="back-button">← Back to Dashboard</Link>
        </div>
    );
};

export default Messages;
