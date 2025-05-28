'use client'

import React, { useState } from 'react'

const FlipCard = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false)
  
    return (
      <div
        onClick={() => setFlipped(!flipped)}
        className={`flip-card w-full max-w-md h-40 cursor-pointer perspective ${flipped ? 'flipped' : ''}`}
      >
        <div className="flip-card-inner">
          {/* Front */}
          <div className="flip-card-front bg-white shadow-md text-indigo-700 font-semibold text-center">
            {question}
          </div>
  
          {/* Back */}
          <div className="flip-card-back bg-indigo-100 shadow-md text-gray-800 text-center">
            {answer}
          </div>
        </div>
      </div>
    )
  }
  

export default FlipCard
