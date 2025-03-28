'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Pet = {
  id: number;
  type: string;
  breeds: {
    primary: string;
    secondary: string | null;
    mixed: boolean;
    unknown: boolean;
  };
  age: string;
  name: string;
  gender: string;
  size: string;
  photos?: Array<{
    small: string;
    medium: string;
    large: string;
    full: string;
  }>;
  description?: string;
  status?: string;
  attributes?: Record<string, boolean>;
  contact?: {
    email?: string;
    phone?: string;
    address?: {
      city?: string;
      state?: string;
    };
  };
  url?: string;
};

const PetDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`/api/petfinder/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.pet) {
          throw new Error('Pet data not found in response');
        }
        setPet(data.pet);
      } catch (err) {
        console.error('Error fetching pet:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">Error: {error || 'Pet not found'}</p>
        <Link href="/pets/pets_all" className="text-blue-500 hover:underline">
          Back to all pets
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/pets/pets_all" className="inline-block mb-6 text-blue-500 hover:underline">
        &larr; Back to all pets
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {pet.photos && pet.photos.length > 0 ? (
              <div className="relative h-96 w-full">
                <Image
                  src={pet.photos[0].large || pet.photos[0].medium}
                  alt={pet.name || 'Pet image'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="h-96 w-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800">{pet.name}</h1>
              {pet.status && (
                <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 text-sm font-semibold rounded-full">
                  {pet.status}
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{pet.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Breed</p>
                <p className="font-medium">
                  {pet.breeds.primary || 'Unknown'}
                  {pet.breeds.secondary && ` / ${pet.breeds.secondary}`}
                  {pet.breeds.mixed && ' (Mixed)'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{pet.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{pet.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Size</p>
                <p className="font-medium">{pet.size}</p>
              </div>
            </div>

            {pet.description && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">About {pet.name}</h2>
                <p className="text-gray-700">{pet.description}</p>
              </div>
            )}

            {pet.attributes && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Characteristics</h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(pet.attributes).map(
                    ([key, value]) =>
                      value && (
                        <span
                          key={key}
                          className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
                        >
                          {key.replace(/_/g, ' ')}
                        </span>
                      )
                  )}
                </div>
              </div>
            )}

            {pet.contact && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {pet.contact.email || 'Not available'}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {pet.contact.phone || 'Not available'}
                </p>
                {pet.contact.address && (
                  <p className="text-sm">
                    <span className="font-medium">Location:</span>{' '}
                    {[pet.contact.address.city, pet.contact.address.state]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
              </div>
            )}

            {pet.url && (
              <div className="mt-8">
                <a
                  href={pet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Adopt {pet.name}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage;