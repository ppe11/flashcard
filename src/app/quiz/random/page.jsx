'use client';

import React from 'react';
import QuizComponent from '@/components/QuizComponent';
import { assets } from '@/assets/assets';

const randomQuestions = [
  {
    question: "How much time can you spend interacting with your pet daily?",
    options: [
      { label: "Several hours—I want a pet that loves attention!", value: ["dogs", "cats"] },
      { label: "Some interaction is nice, but I also want an independent pet", value: ["cats", "smallpets"] },
      { label: "Occasional interaction, but not daily handling", value: ["reptiles", "fish"] },
    ],
    image: assets.generalpets,
    multiple: false,
    apiKey: "type",
  },
  {
    question: "How much care are you willing to provide?",
    options: [
      { label: "Daily care, playtime, and training!", value: ["dogs", "cats"] },
      { label: "Regular feeding and cleaning, but minimal training", value: ["smallpets", "fish"] },
      { label: "Low maintenance—feeding and occasional habitat upkeep", value: ["reptiles", "fish"] },
    ],
    image: assets.generalpets,
    multiple: false,
    apiKey: "type",
  },
  {
    question: "Do you want a pet that can freely roam your home?",
    options: [
      { label: "Yes! I want a pet that can explore and interact", value: ["dogs", "cats"] },
      { label: "Sometimes—I'd like a pet that can come out occasionally", value: ["smallpets"] },
      { label: "No, I prefer a pet that stays in its enclosure", value: ["reptiles", "fish"] },
    ],
    image: assets.generalpets,
    multiple: false,
    apiKey: "type",
  },
  {
    question: "What kind of companionship are you looking for?",
    options: [
      { label: "A loyal, affectionate companion", value: ["dogs"] },
      { label: "A pet that’s independent but still loving", value: ["cats"] },
      { label: "A quiet pet that I can observe and enjoy", value: ["fish", "reptiles"] },
      { label: "A small, cute pet that’s fun to watch and sometimes handle", value: ["smallpets"] },
    ],
    image: assets.generalpets,
    multiple: false,
    apiKey: "type",
  },
  {
    question: "How important is your pet’s cleanliness to you?",
    options: [
      { label: "Very important—I prefer a pet that is clean and easy to maintain", value: ["dogs", "cats"] },
      { label: "Somewhat important—I don’t mind occasional cleaning but prefer a tidy pet", value: ["reptiles", "fish"] },
      { label: "Not very important—I’m okay with a pet that may require more cleaning", value: ["smallpets"] },
    ],
    image: assets.generalpets,
    multiple: false,
    apiKey: "type",
  },
];

const QuizRandom = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50 p-6">
      <QuizComponent questions={randomQuestions} />
    </div>
  );
};

export default QuizRandom;
