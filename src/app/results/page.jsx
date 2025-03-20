'use client';

import React, { useState, useEffect } from 'react';
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
    <div className="w-full text-center bg-orange-50 min-h-screen p-10">
      <h2 className="text-xl font-semibold mb-6">Recommended Pets</h2>

      {pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-6 px-16">
          {pets.map((pet, index) => (
            <div key={index} className="shadow-sm hover:shadow-xl transition duration-600 bg-white rounded-xl p-6 text-center">
              <div className="flex justify-center">
                <img src={pet.image} alt={pet.name} className="w-32 h-32 object-contain rounded-md" />
              </div>
              <h3 className="text-lg font-semibold mt-4">{pet.name}</h3>
              <ul className="text-sm text-gray-600 mt-2">
                {pet.description.map((desc, i) => (
                  <li key={i}>• {desc}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg border rounded-3xl p-5">
                  Adopt me!
                </Button>
              </div>
            </div>
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
