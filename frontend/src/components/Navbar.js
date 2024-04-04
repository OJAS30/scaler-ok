import React, { useContext } from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css';
import { MentorDetails } from "../App";

function Navbar() {
    const { mentorData, handleChange } = useContext(MentorDetails);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-logo">
                        Mentor Dashboard
                    </Link>
                </div>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">All Students</Link>
                    <Link to="/assignedstudents" className="navbar-link">Assigned Students</Link>
                </div>
                <div className="mentor-section">
                    {mentorData.ismentorSet ? (
                        <div className="mentor-info">
                            <span className="mentor-name">Welcome, {mentorData.mentorid}</span>
                        </div>
                    ) : (
                        <div className="mentor-input">
                            <input
                                type="text"
                                placeholder="Enter Mentor Name"
                                className="mentor-input-field"
                                onChange={(e) => handleChange("mentorid", e.target.value)}
                            />
                            <button className="mentor-submit-btn" onClick={(e) => handleChange("ismentorSet", true)}>Submit</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
