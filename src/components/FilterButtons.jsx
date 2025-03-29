'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const FilterButtons = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentType = searchParams.get('type') || 'all';
  const currentSubType = searchParams.get('subType');
  
  const handleFilterClick = (typeWithParams) => {
    const [type, params] = typeWithParams.split('?');
    const paramsObj = new URLSearchParams(params);
    
    if (type === 'all') {
      if (pathname === '/pets_all') {
        router.replace('/pets_all', { scroll: false });
      } else {
        router.push('/pets_all');
      }
    } else {
      const query = new URLSearchParams();
      query.set('type', type);
      if (paramsObj.has('subType')) {
        query.set('subType', paramsObj.get('subType'));
      }
      
      if (pathname === '/pets_all') {
        router.replace(`/pets_all?${query.toString()}`, { scroll: false });
      } else {
        router.push(`/pets_all?${query.toString()}`);
      }
    }
  };

  return (
    <div className="flex justify-center gap-2 mb-8 flex-wrap">
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
        className={`px-4 py-2 rounded-full ${currentType === 'small-pets' ? 'bg-[#F26A21] text-white' : 'bg-[#FEF6EC] text-gray-800'}`}
        onClick={() => handleFilterClick('small-pets')}
      >
        Small Pets
      </button>
      <button 
        className={`px-4 py-2 rounded-full ${currentType === 'scales-fins-other' && currentSubType === 'reptile' ? 'bg-[#F26A21] text-white' : 'bg-[#FEF6EC] text-gray-800'}`}
        onClick={() => handleFilterClick('scales-fins-other?subType=reptile')}
      >
        Reptiles
      </button>
      <button 
        className={`px-4 py-2 rounded-full ${currentType === 'scales-fins-other' && currentSubType === 'fish' ? 'bg-[#F26A21] text-white' : 'bg-[#FEF6EC] text-gray-800'}`}
        onClick={() => handleFilterClick('scales-fins-other?subType=fish')}
      >
        Fish
      </button>
    </div>
  );
};

export default FilterButtons;
