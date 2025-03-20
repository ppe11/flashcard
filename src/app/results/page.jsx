'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ResultsPage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const storedPets = localStorage.getItem('pets');
    if (storedPets) {
      setPets(JSON.parse(storedPets));
    }
  }, []);

  return (
    <div className="w-full text-center min-h-screen pt-32">
      <h2 className="text-2xl font-semibold mb-6">Your Perfect Pet Awaits! 🐾</h2>

      {pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-6 px-16">
          {pets.map((pet, index) => (
            <Card key={index} className="shadow-sm hover:shadow-xl transition duration-600 rounded-xl bg-orange-50">
              <CardHeader className="flex items-center justify-center p-4">
                <img src={pet.image} alt={pet.name} className="w-32 h-32 object-contain rounded-md"/>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-lg font-semibold">{pet.name}</h3>
                <ul className="text-sm text-gray-600 mt-2">
                  {pet.description.map((desc, i) => (
                    <li key={i}>• {desc}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center p-4 pb-6">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg border rounded-3xl p-5">
                  Adopt me!
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No pets found. Try a different quiz result.</p>
      )}

      <div className="mt-6">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white text-md rounded-3xl shadow-2xl"
          onClick={() => window.location.href = '/'}>
          Retake Quiz
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
