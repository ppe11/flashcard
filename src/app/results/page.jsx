'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ResultsPage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const storedPets = localStorage.getItem('pets');
    if (storedPets) {
      try {
        const allPets = JSON.parse(storedPets);
        // ✅ Only keep pets with at least 1 photo
        const petsWithPhotos = allPets.filter(pet => pet.photos && pet.photos.length > 0);
        setPets(petsWithPhotos);
      } catch (err) {
        console.error('Failed to parse stored pets:', err);
        setPets([]);
      }
    }
  }, []);

  return (
    <div className="w-full text-center min-h-screen pt-32 px-4">
      <h2 className="text-3xl font-semibold mb-8">Your Perfect Pet Awaits! 🐾</h2>

      {pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {pets.map((pet) => (
            <Card
              key={pet.id}
              className="shadow-md hover:shadow-lg transition duration-300 rounded-xl bg-orange-50"
            >
              <CardHeader className="flex justify-center p-4">
                <img
                  src={pet.photos?.[0]?.medium || 'https://via.placeholder.com/300x300?text=No+Image'}
                  alt={pet.name}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </CardHeader>

              <CardContent className="text-center">
                <h3 className="text-xl font-semibold">{pet.name}</h3>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>• Breed: {pet.breed}</li>
                  <li>• Age: {pet.age}</li>
                  <li>• Gender: {pet.gender}</li>
                  <li>• Size: {pet.size}</li>
                </ul>
              </CardContent>

              <CardFooter className="flex justify-center p-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 text-md">
                  Adopt me!
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-10">No pets found. Try retaking the quiz.</p>
      )}

      <div className="mt-10">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white text-md rounded-full shadow-xl px-8 py-3"
          onClick={() => window.location.href = '/'}
        >
          Retake Quiz
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
