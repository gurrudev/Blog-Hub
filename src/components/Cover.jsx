import React from "react";
import "./Cover.css";
import coverImg from "../assets/img/cover.jpeg";
import { useNavigate } from "react-router-dom";

const Cover = () => {
    const navigate = useNavigate();

    return (
        <div className="cover-section hidden lg:block md:block">
            <div className="cover-inner">
                {/* Left text panel */}
                <div className="cover-content">
                    <p className="cover-eyebrow">✦ Share Your Ideas</p>
                    <h2 className="cover-heading">
                        Got something
                        <br />
                        worth saying?
                    </h2>
                    <p className="cover-sub">
                        Join thousands of writers who publish their ideas,
                        expertise and stories on Blogiefy every day. Your
                        audience is waiting.
                    </p>
                    <div className="cover-actions">
                        <button
                            className="cover-btn-primary"
                            onClick={() => navigate("/create-post")}
                        >
                            Start Writing
                        </button>
                        <button
                            className="cover-btn-ghost"
                            onClick={() => navigate("/signup")}
                        >
                            Create Account →
                        </button>
                    </div>
                    <div className="cover-meta">
                        <span>🖊 Free forever</span>
                        <span>·</span>
                        <span>📖 500+ published articles</span>
                        <span>·</span>
                        <span>🌍 Read worldwide</span>
                    </div>
                </div>

                {/* Right image */}
                <div className="cover-img-wrap">
                    <img src={coverImg} alt="Write on Blogiefy" />
                    <div className="cover-img-overlay" />
                    {/* Floating badge */}
                    <div className="cover-badge">
                        <span className="cover-badge-num">10K+</span>
                        <span className="cover-badge-label">
                            Monthly readers
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cover;
