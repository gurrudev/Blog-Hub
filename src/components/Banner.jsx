/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import './Banner.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import banner_img from '../assets/img/banner.jpg'
import endpointForUser from "../utils/endpointForUser";

function Banner() {

    const navigate = useNavigate()
    const [user, setUser] = useState({})

    const token = sessionStorage.getItem('token')

    const getUserData = async () => {
        try {
            const userData = await endpointForUser(token);
            setUser(userData)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { getUserData() }, [])

    const isLoggedIn = user && user.message !== 'Invalid token'

    const handlePrimary = () => navigate(isLoggedIn ? '/create-post' : '/login')
    const handleSecondary = () => {
        document.getElementById('blog-cards')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="banner">
            <Navbar />

            <div className="banner-text">
                <p className="banner-category">
                    <span /> Discover · Read · Write <span />
                </p>
                <h1>
                    Experience the beauty<br />of <em>diverse perspectives</em>
                </h1>
                <h3>Explore stories, ideas and expertise from writers on any topic.</h3>

                <div className="banner-btn-row">
                    <button className="banner-btn" onClick={handlePrimary}>
                        {isLoggedIn ? 'Create a Post' : 'Start Reading'}
                    </button>
                    <button className="banner-btn-ghost" onClick={handleSecondary}>
                        Browse Articles ↓
                    </button>
                </div>
            </div>

            <div className="overlay" />
            <div className="custom-clip-path">
                <img src={banner_img} alt="Hero background" />
            </div>

            <div className="banner-stats">
                <div className="banner-stat">
                    <span className="banner-stat-num">500+</span>
                    <span className="banner-stat-label">Articles</span>
                </div>
                <div className="banner-stat">
                    <span className="banner-stat-num">120+</span>
                    <span className="banner-stat-label">Authors</span>
                </div>
                <div className="banner-stat">
                    <span className="banner-stat-num">10K+</span>
                    <span className="banner-stat-label">Readers</span>
                </div>
            </div>
        </div>
    )
}

export default Banner