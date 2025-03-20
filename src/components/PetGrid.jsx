'use client';

import React from 'react';
import Link from 'next/link';

const PetGrid = ({ pets }) => {
  if (!pets || !pets.pets || pets.pets.length === 0) {
    return <div className="text-center py-10">No pets found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pets.pets.map((pet) => (
        <div key={pet.id} className="bg-[#FEF6EC] rounded-lg overflow-hidden shadow-sm">
          <div className="p-4 flex flex-col items-center">
            <div className="relative h-40 w-full mb-3 flex justify-center">
              <img
                src={pet.photos && pet.photos[0]?.medium || '/placeholder-pet.jpg'} 
                alt={`${pet.name}`}
                className="h-full object-cover max-w-full"
                style={{ maxHeight: "160px" }}
              />
            </div>
            
            <h3 className="text-center font-semibold text-lg mb-2">{pet.name}</h3>
            
            <ul className="text-sm w-full">
              <li>• {pet.breed || 'Mixed breed'}</li>
              <li>• {pet.age || 'Unknown age'}</li>
              {pet.gender && <li>• {pet.gender}</li>}
              {pet.size && <li>• {pet.size}</li>}
              <li>• Friendly</li>
            </ul>
            
            <button 
              className="mt-4 bg-[#F26A21] hover:bg-[#E05A11] text-white py-2 px-6 rounded-full transition-colors"
              onClick={() => window.location.href = `/pets/${pet.id}`}
            >
              Adopt me!
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PetGrid;
