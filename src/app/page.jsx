'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const LandingPage = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#11001f] text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-4xl space-y-8">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Learn Smarter with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 animate-pulse">
            AI Flashcards
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Boost your memory and study efficiently.{' '}
          <span className="font-semibold text-indigo-400">SmarterAI</span> helps
          you generate smart flashcards instantly using AI. Type your topic, and
          let the brainwork begin!
        </p>

        <button
          onClick={() => router.push('/generate')}
          className="bg-indigo-600 text-white text-lg md:text-xl font-semibold py-4 px-8 rounded-full shadow-md hover:bg-indigo-800 transition"
        >
          Generate Flashcards
        </button>
      </div>
    </div>
  )
}

export default LandingPage
