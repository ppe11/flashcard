import React from 'react';


/**
 * Replace with API integration
 * Sub API data in appropriate places
 * Automatically updates to all Pets{...} pages
 */

const petData = {
    
  all: [
    { name: 'Cat Name #1', description: ['cat’s description #1', 'cat’s description #2', 'cat’s description #3'], image: '/cat.png' },
    { name: 'Dog Name #1', description: ['dog’s description #1', 'dog’s description #2', 'dog’s description #3'], image: '/dog.png' }
  ],
  cats: Array(8).fill({ name: 'Cat Name #1', description: ['cat’s description #1', 'cat’s description #2', 'cat’s description #3'], image: '/cat.png' }),
  dogs: Array(8).fill({ name: 'Dog Name #1', description: ['dog’s description #1', 'dog’s description #2', 'dog’s description #3'], image: '/dog.png' }),
  fish: Array(8).fill({ name: 'Fish Name #1', description: ['fish’s description #1', 'fish’s description #2', 'fish’s description #3'], image: '/fish.png' })
};

const PetGrid = ({ type }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {petData[type].map((pet, index) => (
        <div key={index} className="border rounded-lg bg-orange-100 p-4">
          <img src={pet.image} alt={pet.name} className="w-full h-40 object-contain" />
          <h3 className="text-lg font-semibold">{pet.name}</h3>
          <ul className="text-sm">
            {pet.description.map((desc, i) => (
              <li key={i}>• {desc}</li>
            ))}
          </ul>
          <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md">Adopt me!</button>
        </div>
      ))}
    </div>
  );
};

export default PetGrid;
