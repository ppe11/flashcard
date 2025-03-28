'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Shelters = () => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');

  useEffect(() => {
    async function fetchShelters() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/shelters');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched shelters:', { 
          shelterCount: data.shelters?.length || 0,
          pagination: data.pagination,
          firstShelter: data.shelters && data.shelters.length > 0 ? data.shelters[0] : 'No shelters found'
        });
        
        if (data.shelters && Array.isArray(data.shelters)) {
          setShelters(data.shelters);
        } else {
          console.error('Invalid shelters data format:', data);
          setShelters([]);
        }
      } catch (err) {
        console.error('Error fetching shelters:', err);
        setError(err.message);
        setShelters([]);
      } finally {
        setLoading(false);
      }
    }

    fetchShelters();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build the URL with search parameters
      const queryParams = new URLSearchParams();
      if (locationSearch) queryParams.set('location', locationSearch);
      if (nameSearch) queryParams.set('name', nameSearch);
      
      const url = `/api/shelters${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log(`Searching shelters with URL: ${url}`);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.shelters && Array.isArray(data.shelters)) {
        setShelters(data.shelters);
      } else {
        console.error('Invalid shelters data format:', data);
        setShelters([]);
      }
    } catch (err) {
      console.error('Error searching shelters:', err);
      setError(err.message);
      setShelters([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-20 pt-[100px] 2xl:pt-[150px]">
      {/* Search Section */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">Search nearby pet shelters</h2>
        <div className="flex w-full max-w-2xl gap-3">
            {/* By location search */}
          <Input 
            placeholder="Location" 
            className="flex-1 bg-white border border-orange-400 hover:border-2" 
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
          />
          <span className="self-center">or</span>
          {/* By shelter name search */}
          <Input 
            placeholder="Shelter name" 
            className="flex-1 bg-white border border-orange-400 hover:border-2"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 text-lg rounded-2xl"
            onClick={handleSearch}
          >
            Search
          </Button>
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
      
      {/* Loading and Error States */}
      {loading ? (
        <div className="text-center py-10">Loading shelters...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          Error: {error}
        </div>
      ) : shelters.length === 0 ? (
        <div className="text-center py-10">No shelters found. Try a different search.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
          {shelters.map((shelter) => (
            <div 
              key={shelter.id} 
              className='flex flex-col hover:shadow-xl h-fit hover:scale-105 transition duration-400 rounded-2xl'
            >
              <Card className="flex bg-orange-100 p-4 rounded-2xl shadow-md ">
                <div className="flex items-center gap-2">
                  {/* Shelter Image */}
                  <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center border">
                    {shelter.photos && shelter.photos.length > 0 ? (
                      <img 
                        src={shelter.photos[0].medium} 
                        alt={shelter.name}
                        className="w-full h-14/12 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/150x150?text=🏠';
                        }}
                      />
                    ) : (
                      <span className="text-4xl">🏠</span>
                    )}
                  </div>
                  {/* Shelter Info */}
                  <CardContent className="flex-1 p-2">
                    <h4 className="text-lg font-semibold">{shelter.name}</h4>
                    <p className="text-sm">Contact: {shelter.contact}</p>
                    <p className="text-sm">Location: {shelter.location}</p>
                    <p className="text-sm">Open: {shelter.hours}</p>
                    <Button 
                      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white w-full text-md rounded-2xl"
                      onClick={() => window.open(shelter.website || `https://www.petfinder.com/member/us/shelters/${shelter.id}`, '_blank')}
                    >
                      View
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Shelters
