import React from "react";
import "./Footer.css";
import { GrInstagram } from "react-icons/gr";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaStackOverflow } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <>
            <footer className="footer-wrap">
                <div className="footer-gradient-line" />
                <div className="footer-inner">
                    <div className="footer-brand">
                        <span className="footer-logo">Blogiefy</span>
                        <p className="footer-tagline">
                            A space where ideas meet curiosity
                        </p>
                    </div>

                    <p className="footer-credit">
                        Designed &amp; Developed by{" "}
                        <a
                            href="https://ashutosh-pawar.me"
                            className="footer-credit-link"
                        >
                            Ashutosh
                        </a>
                    </p>

                    <div className="footer-socials">
                        <a
                            href="https://instagram.com/gurrudev"
                            className="footer-icon"
                            aria-label="Instagram"
                        >
                            <GrInstagram />
                        </a>
                        <a
                            href="https://linkedin.com/in/gurrudev"
                            className="footer-icon"
                            aria-label="LinkedIn"
                        >
                            <IoLogoLinkedin />
                        </a>
                        <a
                            href="https://github.com/gurrudev"
                            className="footer-icon"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://stackoverflow.com/users/20042850/ashutosh-pawar"
                            className="footer-icon"
                            aria-label="StackOverflow"
                        >
                            <FaStackOverflow />
                        </a>
                        <a
                            href="https://x.com/gurrudevs"
                            className="footer-icon"
                            aria-label="X (Twitter)"
                        >
                            <FaXTwitter />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
