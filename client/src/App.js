import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProfileCompletion from "./pages/ProfileCompletion";
import "./styles.css"; // Import global styles

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile-completion" element={<ProfileCompletion />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
