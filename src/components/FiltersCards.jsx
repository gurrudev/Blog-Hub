/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import './FiltersCards.css'
import { Link, useNavigate } from 'react-router-dom'
import cardDate from '../utils/cardDate'
import truncate from '../utils/Truncate'
import strippedString from '../utils/strippedString'
import { FaArrowRight } from 'react-icons/fa'

function FiltersCards({ cardData }) {

  const navigate = useNavigate()

  // 4 sub-cards (indices 1–4)
  const filteredData = cardData.slice(1, 5)

  Array.prototype.rev = function () {
    let rev = []
    for (let i = this.length - 1; i > 0; i--) rev.push(this[i])
    return rev
  }

  // Latest sidebar (up to 5)
  const latest = cardData.slice(0, 6).rev()

  return (
    <div className="recommended-section">
      <h2 className="section-heading">Recommended Blogs</h2>

      <div className="filter-container">

        {/* ── Main featured card ── */}
        <div className="main-card">
          <img src={cardData[0]?.image_url} alt={cardData[0]?.title || ''} />
          <div className="main-card-body">
            <h2 className="overflow-wrap">{cardData[0]?.title}</h2>
            <div className="user-details text-xs text-slate-400">
              <span>by {cardData[0]?.username}</span>
              <span>{cardDate(cardData[0]?.createdAt)}</span>
            </div>
            <p className="des">
              {cardData[0]?.description
                ? truncate(strippedString(cardData[0]?.description))
                : 'No description available'}
            </p>
            <Link to={`/post/${cardData[0]?._id}`}>
              Read Article <FaArrowRight size={10} style={{ display: 'inline', marginBottom: '1px' }} />
            </Link>
          </div>
        </div>

        {/* ── 4 Sub-cards ── */}
        <div className="sub-cards">
          {filteredData.map((item, index) => (
            <div
              className="sub-cards-col2"
              onClick={() => navigate(`/post/${item._id}`)}
              key={index}
            >
              <img className="sub-cards-col2-img" src={item.image_url} alt={item.title} />
              <div className="sub-card-title">
                <h3 className="overflow-wrap">{item.title}</h3>
                <span className="text-xs text-slate-400" style={{ fontFamily: 'Inter, sans-serif', marginTop: '4px', display: 'block' }}>
                  {cardDate(item.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Latest sidebar ── */}
        <div className="recent">
          <p className="recent-label">Latest</p>
          {latest.map((item, index) => (
            <div
              className="sub-cards-col"
              onClick={() => navigate(`/post/${item._id}`)}
              key={index}
            >
              <img src={item.image_url} alt={item.title} />
              <div className="sub-card-title">
                <p className="overflow-wrap">{item.title}</p>
                <span className="text-xs text-slate-400" style={{ fontFamily: 'Inter, sans-serif', marginTop: '3px', display: 'block' }}>
                  {cardDate(item.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default FiltersCards