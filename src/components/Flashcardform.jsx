'use client'

import React, { useState } from 'react'
import FlipCard from './Flipcard'
import { useTypewriter } from 'react-simple-typewriter'
import { ClipLoader } from 'react-spinners'

const Flashcard = () => {
  const [topic, setTopic] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(false)

  const [typedPlaceholder] = useTypewriter({
    words: ['Photosynthesis', 'World War II', 'Python Basics', 'Cats', 'The Solar System'],
    loop: 0,
    delaySpeed: 1500,
  })

  const generateFlashcards = async () => {
    if (!topic.trim()) return

    setLoading(true)
    setFlashcards([])

    const response = await fetch('http://127.0.0.1:8000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: topic }),
    })

    const data = await response.json()
    const raw = data.response

    const pairs = raw
      .split(/\n{2,}|\n(?=\*\*Question:)/)
      .map(block => {
        const qMatch = block.match(/\*\*Question:\*\*\s*(.*)/i)
        const aMatch = block.match(/\*\*Answer:\*\*\s*(.*)/i)

        return {
          question: qMatch ? qMatch[1].trim() : '',
          answer: aMatch ? aMatch[1].trim() : '',
        }
      })
      .filter(card => card.question && card.answer)

    setFlashcards(pairs)
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    generateFlashcards()
  }

  return (
    <div className="w-full bg-[#1a0a2b] text-white p-6 rounded-xl shadow-md">
      <form onSubmit={handleSubmit}>
        <label htmlFor="topic" className="block font-semibold mb-2">
          Enter a topic:
        </label>
        <input
          id="topic"
          type="text"
          className="w-full bg-[#2a0f3a] text-white border border-gray-600 rounded px-4 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={`e.g. ${typedPlaceholder}`}
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold py-2 px-6 rounded hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-2"
            disabled={loading || !topic.trim()}
          >
            {loading && (
              <div
                className="flex justify-center mt-6 text-5xl"
                style={{
                  animation: 'dance 0.6s ease-in-out infinite alternate',
                }}
              >
                🤖
                <style jsx>{`
                  @keyframes dance {
                    0% {
                      transform: rotate(-10deg) scale(1.1);
                    }
                    100% {
                      transform: rotate(10deg) scale(1.1);
                    }
                  }
                `}</style>
              </div>
            )}

            {loading ? 'Generating...' : 'Generate Flashcards'}
          </button>
        </div>
      </form>

      {flashcards.length > 0 && (
        <div className="mt-5 flex flex-col items-center gap-6">
          {flashcards.map((card, index) => (
            <div key={index} className="w-full max-w-md">
              <FlipCard question={card.question} answer={card.answer} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Flashcard
