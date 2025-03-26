'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import energyDogBreeds from '@/app/pets/Quiz_Breed_questions/Energy Dog breeds.json';
import hypoallergenicDogBreeds from '@/app/pets/Quiz_Breed_questions/Hypoellergenic-Dog-breeds.json';
import energyCatBreeds from '@/app/pets/Quiz_Breed_questions/Energy-Cat-breeds.json';
import dependenceCatBreeds from '@/app/pets/Quiz_Breed_questions/Dependence-Cat-breeds.json';

const QuizComponent = ({ questions, type }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
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
    const updated = [...selectedAnswers];
    updated[currentQuestion] = answer;
    setSelectedAnswers(updated);
  };

  const buildQueryFromAnswers = () => {
    const query = {};
    let breedSet = new Set();

    if (type === 'dog') {
      questions.forEach((q, index) => {
        const key = q.apiKey || q.apiField;
        const answer = selectedAnswers[index];
        if (!key || !answer) return;

        if (key === 'breed') {
          if (answer === 'low-energy') energyDogBreeds.low_energy?.forEach(b => breedSet.add(b));
          else if (answer === 'moderate-energy') energyDogBreeds.medium_energy?.forEach(b => breedSet.add(b));
          else if (answer === 'high-energy') energyDogBreeds.high_energy?.forEach(b => breedSet.add(b));
        } else if (key === 'coat' && answer === 'hypoallergenic') {
          hypoallergenicDogBreeds.hypoallergenic_breeds_akc_in_api?.forEach(b => breedSet.add(b));
        } else {
          if (q.multiple) {
            if (!query[key]) query[key] = [];
            if (Array.isArray(answer)) query[key].push(...answer);
            else query[key].push(answer);
          } else {
            query[key] = answer;
          }
        }
      });
    } else if (type === 'cat') {
      questions.forEach((q, index) => {
        const key = q.apiKey || q.apiField;
        const answer = selectedAnswers[index];
        if (!key || !answer) return;

        if (key === 'breed') {
          if (answer === 'low-energy') energyCatBreeds.energy_level.low?.forEach(b => breedSet.add(b));
          else if (answer === 'medium-energy') energyCatBreeds.energy_level.medium?.forEach(b => breedSet.add(b));
          else if (answer === 'high-energy') energyCatBreeds.energy_level.high?.forEach(b => breedSet.add(b));

          if (answer === 'affectionate') dependenceCatBreeds.dependence_level.dependent?.forEach(b => breedSet.add(b));
          else if (answer === 'independent') dependenceCatBreeds.dependence_level.independent?.forEach(b => breedSet.add(b));
          else if (answer === 'balanced') dependenceCatBreeds.dependence_level.middle_ground?.forEach(b => breedSet.add(b));
        } else {
          if (q.multiple) {
            if (!query[key]) query[key] = [];
            if (Array.isArray(answer)) query[key].push(...answer);
            else query[key].push(answer);
          } else {
            query[key] = answer;
          }
        }
      });
    }

    if (breedSet.size > 0) {
      query['breed'] = Array.from(breedSet).join(',');
    }

    return Object.entries(query)
      .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(',') : v}`)
      .join('&');
  };

  const buildRelaxedQuery = () => {
    const query = {};

    questions.forEach((q, index) => {
      const key = q.apiKey || q.apiField;
      const answer = selectedAnswers[index];
      if (!key || !answer) return;

      if (['tags', 'coat', 'breed', 'good_with'].includes(key)) return;

      if (q.multiple) {
        if (!query[key]) query[key] = [];
        if (Array.isArray(answer)) query[key].push(...answer);
        else query[key].push(answer);
      } else {
        query[key] = answer;
      }
    });

    return Object.entries(query)
      .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(',') : v}`)
      .join('&');
  };

  const fetchRecommendedPets = async () => {
    const query = buildQueryFromAnswers();

    try {
      let res = await fetch(`/pets?type=${type}&${query}`);
      let data = await res.json();

      if (!data?.pets?.length) {
        console.warn('No exact match. Retrying with relaxed filters...');
        const relaxedQuery = buildRelaxedQuery();
        res = await fetch(`/pets?type=${type}&${relaxedQuery}`);
        data = await res.json();
      }

      if (data?.pets?.length) {
        localStorage.setItem('pets', JSON.stringify(data.pets));
        router.push('/results');
      } else {
        alert('Sorry, no matching pets found. Try different preferences.');
      }
    } catch (err) {
      console.error('Error fetching pets:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="flex justify-center gap-50">
      <div className="w-1/2 flex justify-center items-center">
        <Image src={question.image} alt="Pet" className="w-100 h-100 object-contain" />
      </div>

      <div className="w-[800px] h-[500px] max-w-2xl bg-orange-100 p-10 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-6 mt-3">{question.question}</h2>
        <p className="text-lg text-gray-600 text-left mb-6">
          Question {currentQuestion + 1} out of {questions.length}
        </p>
        <div className="flex flex-col gap-8 text-left">
          {question.options.map((option, i) => (
            <label key={i} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option.value}
                checked={selectedAnswers[currentQuestion] === option.value}
                onChange={() => handleAnswerChange(option.value)}
                className="hidden peer"
              />
              <div className="w-5 h-5 border-2 border-gray-500 rounded-md flex items-center justify-center peer-checked:bg-orange-500 peer-checked:border-orange-500">
                {selectedAnswers[currentQuestion] === option.value && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-md font-medium">{option.label}</span>
            </label>
          ))}
        </div>

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
  );
};

export default QuizComponent;
