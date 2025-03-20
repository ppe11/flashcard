'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const QuizComponent = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [pets, setPets] = useState([]);
  const router = useRouter();


  const handleNext = () => {
    if (selectedAnswers[currentQuestion] !== null) {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        fetchRecommendedPets();
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

  const fetchRecommendedPets = async () => {
    setTimeout(() => {
      const pets = [
        { name: 'Buddy', description: ['Friendly and active'], image: '/dog1.png' },
        { name: 'Luna', description: ['Loves cuddles and naps'], image: '/cat1.png' },
        { name: 'Charlie', description: ['Great with kids'], image: '/dog2.png' },
        { name: 'Mittens', description: ['Curious and playful'], image: '/cat2.png' },
        { name: 'Bella', description: ['Loyal and loving'], image: '/dog3.png' },
      ];
  
      localStorage.setItem('pets', JSON.stringify(pets)); // Store pets in localStorage
  
      router.push('/results'); // Navigate to the results page
    }, 1000);
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
            <div>
            <h2 className="text-2xl font-semibold mb-6 mt-3">{questions[currentQuestion].question}</h2>
            <p className="text-lg text-gray-600 text-left mb-6">
                Question {currentQuestion + 1} out of {questions.length}
            </p>
            <div className="flex flex-col gap-8 text-left">
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
        </div>
    </div>
  );
};

export default QuizComponent;
