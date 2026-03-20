import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaUserAlt, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import endpointForUser from "../utils/endpointForUser";

function Navbar() {
    const [user, setUser] = useState({});
    const [scrolled, setScrolled] = useState(false);

    const token = sessionStorage.getItem("token");

    const getUserData = async () => {
        try {
            const userData = await endpointForUser(token);
            setUser(userData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserData();
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isLoggedIn = user && user.message !== "Invalid token";

    return (
        <header className={`navbar-glass${scrolled ? " scrolled" : ""}`}>
            <Link to="/" className="navbar-logo">
                Blogiefy
            </Link>

            <div className="navbar-actions">
                {isLoggedIn && (
                    <Link to="/create-post" className="navbar-write-btn">
                        <FaPencilAlt size={10} />
                        Write
                    </Link>
                )}
                <Link
                    to={isLoggedIn ? "/profile" : "/login"}
                    className="navbar-avatar"
                >
                    <FaUserAlt size={13} />
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
