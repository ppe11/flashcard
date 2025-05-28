'use client'

import React from 'react'
import Flashcard from '../../components/Flashcardform'

const GeneratePage = () => {
  return (
    <>
      <div className="min-h-screen bg-[#11001f] text-white pt-32 px-6 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Generate Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Flashcards
          </span>
        </h1>

        {/* This div centers the Flashcard horizontally */}
        <div className="w-full max-w-2xl">
          <Flashcard />
        </div>
      </div>
    </>
  )
}

export default GeneratePage
