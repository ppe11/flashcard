'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const QuizComponent = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    if (selectedAnswers[currentQuestion]) {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  return (
    <div className="flex justify-center gap-50">
        <div className="w-1/2 flex justify-center items-center">
            <Image
                src={questions[currentQuestion].image} 
                alt="Pet"
                className="w-100 h-100 object-contain"
            />
        </div>

        <div className="w-[800px] h-[500px] max-w-2xl bg-orange-100 p-10 rounded-xl shadow-md text-center">
            {showResults ? (
            <div>
            <h2 className="text-xl font-semibold mb-4">Recommended Pets</h2>
            
            {/* Placeholder for PetFinder API Integration */}
            <div className="text-gray-500 text-sm mb-4">
                Pet results will be fetched here based on the quiz answers.
            </div>

            {/* Example of where API data will be mapped */}
            <div className="grid grid-cols-1 gap-4">
                {[
                { name: "Buddy", breed: "Golden Retriever", age: "2 years", image: "/dog1.png" },
                { name: "Bella", breed: "Labrador", age: "3 years", image: "/dog2.png" }
                ].map((pet, index) => (
                <div key={index} className="p-4 bg-white shadow-md rounded-lg flex items-center gap-4">
                    <img src={pet.image} alt={pet.name} className="w-16 h-16 object-cover rounded-full" />
                    <div>
                    <h3 className="font-semibold">{pet.name}</h3>
                    <p className="text-sm">{pet.breed} - {pet.age}</p>
                    </div>
                </div>
                ))}
            </div>

            <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white" onClick={() => window.location.reload()}>
                Retake Quiz
            </Button>
            </div>
        ) : (
            <div>
            <h2 className="text-2xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
            <p className="text-lg text-gray-600 text-left mb-4">
                Question {currentQuestion + 1} out of {questions.length}
            </p>
            <div className="flex flex-col gap-6 text-left">
                {questions[currentQuestion].options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option.value}
                    checked={selectedAnswers[currentQuestion] === option.value}
                    onChange={() => handleAnswerChange(option.value)}
                    className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-gray-500 rounded-md flex items-center justify-center peer-checked:bg-orange-500 peer-checked:border-orange-500">
                    {selectedAnswers[currentQuestion] === option.value && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                </div>
                <span className="text-md font-medium">{option.label}</span> 
                </label>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
                <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-3xl shadow-2xl text-md"
                    disabled={currentQuestion === 0}
                    onClick={handlePrevious}
                    >
                    Previous
                    </Button>

                    <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-3xl shadow-2xl text-md"
                    disabled={!selectedAnswers[currentQuestion]}
                    onClick={handleNext}
                    >
                    {currentQuestion + 1 < questions.length ? 'Next' : 'See Results'}
                </Button>
            </div>
            </div>
        )}
        </div>
    </div>
  );
};

export default QuizComponent;
