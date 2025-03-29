'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FilterButtons = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentType = searchParams.get('type') || 'all';
  const currentSubType = searchParams.get('subType');
  const [tempLocation, setTempLocation] = useState('');

  const handleFilterClick = (typeWithParams) => {
    const [type, params] = typeWithParams.split('?');
    const paramsObj = new URLSearchParams(params);

    const newParams = new URLSearchParams(searchParams.toString());

    if (type === 'all') {
      newParams.delete('type');
      newParams.delete('subType');
    } else {
      newParams.set('type', type);
      if (paramsObj.has('subType')) {
        newParams.set('subType', paramsObj.get('subType'));
      } else {
        newParams.delete('subType');
      }
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleLocationInputChange = (event) => {
    setTempLocation(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const locationValue = document.getElementById('location').value.trim();
    const newParams = new URLSearchParams(searchParams.toString());

    if (locationValue) {
      newParams.set('location', locationValue);
    } else {
      newParams.delete('location');
    }
    router.push(`${pathname}?${newParams.toString()}`);
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
      
      <div className="flex items-center justify-center w-full">
        <Input
          type="text"
          id="location"
          className="shadow appearance-none border rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-[450px]"
          placeholder="Enter location"
          onChange={handleLocationInputChange}
        />
        <Button
          className="ml-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default FilterButtons;
