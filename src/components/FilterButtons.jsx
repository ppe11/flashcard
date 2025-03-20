'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterButtons = () => {
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
    </div>
  );
};

export default FilterButtons;
