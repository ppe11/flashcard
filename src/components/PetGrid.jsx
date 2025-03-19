'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Replace with API integration
 * Sub API data in appropriate places
 * Automatically updates to all Pets{...} pages
 */

const PetGrid = ({ type }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const placeholderData = {
      all: [
        { name: 'Cat Name #1', description: ['cat’s description #1', 'cat’s description #2'], image: '/cat.png' },
        { name: 'Dog Name #1', description: ['dog’s description #1', 'dog’s description #2'], image: '/dog.png' },
        { name: 'Cat Name #1', description: ['cat’s description #1', 'cat’s description #2'], image: '/cat.png' },
        { name: 'Dog Name #1', description: ['dog’s description #1', 'dog’s description #2'], image: '/dog.png' },
        { name: 'Cat Name #1', description: ['cat’s description #1', 'cat’s description #2'], image: '/cat.png' },
        { name: 'Dog Name #1', description: ['dog’s description #1', 'dog’s description #2'], image: '/dog.png' },
        { name: 'Cat Name #1', description: ['cat’s description #1', 'cat’s description #2'], image: '/cat.png' },
        { name: 'Dog Name #1', description: ['dog’s description #1', 'dog’s description #2'], image: '/dog.png' },
        { name: 'Cat Name #1', description: ['cat’s description #1', 'cat’s description #2'], image: '/cat.png' },
        { name: 'Dog Name #1', description: ['dog’s description #1', 'dog’s description #2'], image: '/dog.png' }
      ],
      cats: Array(5).fill({ name: 'Cat Name', description: ['Loves to sleep', 'Friendly'], image: '/cat.png' }),
      dogs: Array(5).fill({ name: 'Dog Name', description: ['Loyal companion', 'Energetic'], image: '/dog.png' }),
      birds: Array(5).fill({ name: 'Bird Name', description: ['Colorful and vibrant', 'Easy to care'], image: '/bird.png' })
    };

    setPets(placeholderData[type] || []);
  }, [type]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-6 px-16">
      {pets.map((pet, index) => (
        <Card key={index} className="shadow-sm hover:shadow-xl transition duration-600 bg-orange-50">
          <CardHeader className="flex items-center justify-center p-4">
            <img src={pet.image} alt={pet.name} className="w-32 h-32 object-contain" />
          </CardHeader>
          <CardContent className="text-center">
            <h3 className="text-lg font-semibold">{pet.name}</h3>
            <ul className="text-sm text-gray-600 mt-2">
              {pet.description.map((desc, i) => (
                <li key={i}>• {desc}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center p-2 pb-8">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg border rounded-3xl p-5">Adopt me!</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PetGrid;
