'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Client component that uses useSearchParams
const FilterButtonsClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') || 'all';
  
  const handleFilterClick = (type) => {
    if (type === 'all') {
      router.push('/pets_all');
    } else {
      router.push(`/pets_all?type=${type}`);
    }
  };

  return (
    <div className="flex justify-center gap-2 mb-8">
      <button 
        className={`px-4 py-2 rounded-full ${currentType === 'all' || !currentType ? 'bg-[#F26A21] text-white' : 'bg-[#FEF6EC] text-gray-800'}`}
        onClick={() => handleFilterClick('all')}
      >
        All
      </button>
      <button 
        className={`px-4 py-2 rounded-full ${currentType === 'cat' ? 'bg-[#F26A21] text-white' : 'bg-[#FEF6EC] text-gray-800'}`}
        onClick={() => handleFilterClick('cat')}
      >
        Cats
      </button>
      <button 
        className={`px-4 py-2 rounded-full ${currentType === 'dog' ? 'bg-[#F26A21] text-white' : 'bg-[#FEF6EC] text-gray-800'}`}
        onClick={() => handleFilterClick('dog')}
      >
        Dogs
      </button>
      <button 
        className={`px-4 py-2 rounded-full ${currentType === 'bird' ? 'bg-[#F26A21] text-white' : 'bg-[#FEF6EC] text-gray-800'}`}
        onClick={() => handleFilterClick('bird')}
      >
        Birds
      </button>
      <button 
        className={`px-4 py-2 rounded-full ${currentType === 'bird' ? 'bg-[#F26A21] text-white' : 'bg-[#FEF6EC] text-gray-800'}`}
        onClick={() => handleFilterClick('bird')}
      >
        Small Pets
      </button>
      <button 
        className={`px-4 py-2 rounded-full ${currentType === 'bird' ? 'bg-[#F26A21] text-white' : 'bg-[#FEF6EC] text-gray-800'}`}
        onClick={() => handleFilterClick('bird')}
      >
        Reptiles
      </button>
    </div>
  );
};

// Wrapper component with Suspense
const FilterButtons = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center gap-2 mb-8">
        <button className="px-4 py-2 rounded-full bg-[#FEF6EC] text-gray-800">All</button>
        <button className="px-4 py-2 rounded-full bg-[#FEF6EC] text-gray-800">Cats</button>
        <button className="px-4 py-2 rounded-full bg-[#FEF6EC] text-gray-800">Dogs</button>
        <button className="px-4 py-2 rounded-full bg-[#FEF6EC] text-gray-800">Birds</button>
        <button className="px-4 py-2 rounded-full bg-[#FEF6EC] text-gray-800">Small Pets</button>
        <button className="px-4 py-2 rounded-full bg-[#FEF6EC] text-gray-800">Reptiles</button>
      </div>
    }>
      <FilterButtonsClient />
    </Suspense>
  );
};

export default FilterButtons;
