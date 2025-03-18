'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Pets = () => {
    const [activeCategory, setActiveCategory] =useState("all");

    // Handle category change
    const handleCategoryChange = (value) => {
        setActiveCategory(value);
        console.log(`Selected category: ${value}`);
        // You would handle navigation here in a real app
    };

  return (
    <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
      <TabsList className="bg-transparent p-0 h-auto space-x-2">
        <TabsTrigger 
          value="all" 
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
            ${activeCategory === "all" 
              ? "bg-orange-500 text-white border-orange-500" 
              : "bg-white text-black border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"}`}
        >
          All Pets
        </TabsTrigger>
        <TabsTrigger 
          value="cats" 
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
            ${activeCategory === "cats" 
              ? "bg-orange-500 text-white border-orange-500" 
              : "bg-white text-black border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"}`}
        >
          Cats
        </TabsTrigger>
        <TabsTrigger 
          value="dogs" 
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
            ${activeCategory === "dogs" 
              ? "bg-orange-500 text-white border-orange-500" 
              : "bg-white text-black border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"}`}
        >
          Dogs
        </TabsTrigger>
        <TabsTrigger 
          value="fish" 
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
            ${activeCategory === "fish" 
              ? "bg-orange-500 text-white border-orange-500" 
              : "bg-white text-black border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"}`}
        >
          Fish
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default Pets
