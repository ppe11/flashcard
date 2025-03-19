'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Replace with API integration
 */

const shelters = [
    { id: 1, name: "##Shelter Name##", contact: "(888) 888-888", location: "8888 88 Ave", hours: "8am - 8pm" },
    { id: 2, name: "##Shelter Name##", contact: "(888) 888-888", location: "8888 88 Ave", hours: "8am - 8pm" },
    { id: 3, name: "##Shelter Name##", contact: "(888) 888-888", location: "8888 88 Ave", hours: "8am - 8pm" },
    { id: 4, name: "##Shelter Name##", contact: "(888) 888-888", location: "8888 88 Ave", hours: "8am - 8pm" },
    { id: 5, name: "##Shelter Name##", contact: "(888) 888-888", location: "8888 88 Ave", hours: "8am - 8pm" },
    { id: 6, name: "##Shelter Name##", contact: "(888) 888-888", location: "8888 88 Ave", hours: "8am - 8pm" },
    { id: 7, name: "##Shelter Name##", contact: "(888) 888-888", location: "8888 88 Ave", hours: "8am - 8pm" },
    { id: 8, name: "##Shelter Name##", contact: "(888) 888-888", location: "8888 88 Ave", hours: "8am - 8pm" },
    { id: 9, name: "##Shelter Name##", contact: "(888) 888-888", location: "8888 88 Ave", hours: "8am - 8pm" },
  ];


const Shelters = () => {
  return (
    <div className="w-full mx-auto p-20 pt-[100px] 2xl:pt-[150px]">
      {/* Search Section */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">Search nearby pet shelters</h2>
        <div className="flex w-full max-w-2xl gap-3">
            {/* By location search */}
          <Input placeholder="Location" className="flex-1 bg-white border border-orange-400 hover:border-2 " />
          <span className="self-center">or</span>
          {/* By shelter name search */}
          <Input placeholder="Shelter name" className="flex-1 bg-white border border-orange-400 hover:border-2" />
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 text-lg rounded-2xl">Search</Button>
        </div>
      </div>

      {/* Interactive Map */}
      <div 
        className="w-full h-64 bg-gray-200 rounded-lg mt-6 overflow-hidden shadow-lg"
        >
        {/* Replace this div with map integration */}
        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
          Interactive Map Here
        </div>
      </div>

      {/* Results Section */}
      <h3 className="text-center text-xl font-semibold mt-8">Here are the results:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-6">
        {shelters.map((shelter) => (
          <div 
            key={shelter.id} 
            className='flex flex-col hover:shadow-xl hover:scale-105 transition duration-400 rounded-2xl'
          >
            <Card className="flex bg-orange-100 p-6 rounded-2xl shadow-md ">
              <div className="flex items-center gap-8">
                {/* Shelter Image Placeholder */}
                <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center">
                  <span>🐶</span>
                </div>
                {/* Shelter Info */}
                <CardContent className="flex-1 p-2">
                  <h4 className="text-lg font-semibold">{shelter.name}</h4>
                  <p className="text-sm">Contact: {shelter.contact}</p>
                  <p className="text-sm">Location: {shelter.location}</p>
                  <p className="text-sm">Open: {shelter.hours}</p>
                  <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white w-full text-md rounded-2xl">View</Button>
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shelters
