/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Cards.css';
import HomeCardSkeleton from './Skeleton/HomeCardSkeleton';
import truncate from '../utils/Truncate';
import cardDate from '../utils/cardDate';
import strippedString from '../utils/strippedString';
import { BsThreeDots } from 'react-icons/bs';
import { FaEdit, FaArrowRight } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Cards({ cardsData, totalCards, isProfile, isLoading, deleteBlogData }) {

    const [isOpen, setIsOpen] = useState([]);

    const toggleMenu = (cardIndex) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [cardIndex]: !prevState[cardIndex],
        }));
    };

    const getInitials = (name = '') => {
        const parts = name.trim().split(' ');
        return parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : (parts[0]?.[0] || '?').toUpperCase();
    };

    return (
        <>
            <div id="blog-cards">
                <div className="card-container">
                    {isLoading ? (
                        Array(totalCards)
                            .fill(0)
                            .map((_, i) => <HomeCardSkeleton key={i} />)
                    ) : (
                        cardsData
                            ?.filter((_, index) => index < totalCards)
                            ?.map((item, index) => (
                                <div className="card" key={index}>
                                    {/* Image */}
                                    <div className="card-img-wrap">
                                        <img src={item.image_url} alt={item.title} />
                                    </div>

                                    {/* Body */}
                                    <div className="card-body">
                                        {/* Tags */}
                                        {item.blog_tags?.length > 0 && (
                                            <div className="card-tags">
                                                {item.blog_tags.map((tag, tagIndex) => (
                                                    <span key={tagIndex} className="card-tag">{tag}</span>
                                                ))}
                                            </div>
                                        )}

                                        <h2>{item.title}</h2>

                                        <div className="user-details">
                                            <div className="card-author">
                                                <div className="card-author-initials">
                                                    {getInitials(item.username)}
                                                </div>
                                                <span className="card-author-name">{item.username}</span>
                                            </div>
                                            <span className="card-date">{cardDate(item.createdAt)}</span>
                                        </div>

                                        <p className="des">
                                            {truncate(strippedString(item.description))}
                                        </p>

                                        <div className="flex justify-between items-end mt-auto pt-2">
                                            <Link to={`/post/${item._id}`} className="card-read-more">
                                                Read More <FaArrowRight size={9} />
                                            </Link>

                                            {isProfile === true && (
                                                <div className="relative inline-block text-left">
                                                    <button
                                                        onClick={() => toggleMenu(index)}
                                                        className="flex items-center focus:outline-none p-1 rounded hover:bg-gray-100 transition"
                                                    >
                                                        <BsThreeDots className="text-xl text-gray-400" />
                                                    </button>
                                                    {isOpen[index] && (
                                                        <div className="absolute z-10 right-0 bottom-8 w-36 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                            <div className="py-1">
                                                                <Link to={`/edit-post/${item._id}`} className="flex items-center cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm gap-2" style={{ textDecoration: 'none' }}>
                                                                    <FaEdit className="text-gray-500" /> Edit
                                                                </Link>
                                                                <span onClick={() => deleteBlogData(item._id)} className="flex items-center cursor-pointer px-4 py-2 text-red-600 hover:bg-red-50 text-sm gap-2">
                                                                    <MdDeleteForever className="text-red-500 text-base" /> Delete
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Cards;