import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use createRoot instead of render
import App from "./App";

console.log("✅ React is running!"); // Debugging log

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
