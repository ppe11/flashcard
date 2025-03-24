import { NextResponse } from 'next/server';
export const dynamic = "force-dynamic" 
export const revalidate = 0

type PetfinderAuthResponse = {
  token_type: string;
  expires_in: number;
  access_token: string;
};

type PetfinderPet = {
  id: number;
  type: {
    name: string;
  };
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
  photos: Array<{
    small: string;
    medium: string;
    large: string;
    full: string;
  }>;
};

type PetfinderResponse = {
  animals: PetfinderPet[];
  pagination: {
    count_per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
  };
};

type SimplifiedPet = {
  id: number;
  type: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  name: string;
  photos?: Array<{
    small: string;
    medium: string;
    large: string;
    full: string;
  }>;
};

async function getPetfinderToken(): Promise<string> {
  const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.PETFINDER_KEY,
      client_secret: process.env.PETFINDER_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.statusText}`);
  }

  const data: PetfinderAuthResponse = await response.json();
  return data.access_token;
}

export async function GET(request: Request) {
  try {
    // Try to get a token for the Petfinder API
    let token;
    try {
      token = await getPetfinderToken();
    } catch (tokenError) {
      console.error('Error getting Petfinder token:', tokenError);
      // For tests, return a 500 error
      return NextResponse.json({ error: 'Failed to fetch pets' }, { status: 500 });
    }

    const url = new URL(request.url);
    const { searchParams } = url;
    const type = searchParams.get('type') || undefined;
    const breed = searchParams.get('breed') || undefined;
    const age = searchParams.get('age') || undefined;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '100';

    const queryParams = new URLSearchParams();
    if (type) queryParams.append('type', type);
    if (breed) queryParams.append('breed', breed);
    if (age) queryParams.append('age', age);
    queryParams.append('page', page);
    queryParams.append('limit', limit);

    // Log the API request for debugging
    console.log(`Fetching from Petfinder API with params: ${queryParams.toString()}`);

    let response;
    try {
      response = await fetch(`https://api.petfinder.com/v2/animals?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
      });
    } catch (fetchError) {
      console.error('Network error fetching pets:', fetchError);
      // For tests, return a 500 error
      return NextResponse.json({ error: 'Failed to fetch pets' }, { status: 500 });
    }

    if (!response.ok) {
      console.error(`API responded with status: ${response.status} - ${response.statusText}`);
      // For tests, return a 500 error
      return NextResponse.json({ error: 'Failed to fetch pets' }, { status: 500 });
    }

    const data: PetfinderResponse = await response.json();
    
    // Log the raw API response to see what we're getting
    console.log('Raw API response data:', JSON.stringify(data.animals.slice(0, 2), null, 2));

    // Simplify pet data before sending response
    const simplifiedPets: SimplifiedPet[] = data.animals.map((pet) => {
      // Handle the type object with name property correctly
      const petType = pet.type && pet.type.name ? pet.type.name : '';
      
      // When debugging, log each pet's photos
      if (pet.photos && pet.photos.length > 0) {
        console.log(`Pet ${pet.id} has ${pet.photos.length} photos. First photo medium URL: ${pet.photos[0]?.medium || 'undefined'}`);
      } else {
        console.log(`Pet ${pet.id} has no photos`);
      }
      
      return {
        id: pet.id,
        type: petType,
        breed: pet.breeds?.primary || "Unknown",
        age: pet.age || "Unknown",
        gender: pet.gender || "Unknown",
        size: pet.size || "Unknown",
        name: pet.name || `Pet ${pet.id}`,
        photos: pet.photos,
      };
    });

    // Just return all pets without filtering for photos now
    console.log(`Total pets after simplification: ${simplifiedPets.length}`);
    
    return NextResponse.json({ 
      pets: simplifiedPets, 
      pagination: data.pagination 
    });

  } catch (error) {
    console.error('Error fetching pets:', error);
    return NextResponse.json({ error: 'Failed to fetch pets' }, { status: 500 });
  }
}

// Fallback sample data when API fails - uses public URLs instead of local assets
function getSamplePets(filterType?: string | null): SimplifiedPet[] {
  // Create sample pets with proper types to match SimplifiedPet
  const samplePets: SimplifiedPet[] = [
    {
      id: 101,
      type: 'dog',
      breed: 'Mixed Breed',
      age: 'Young',
      gender: 'Male',
      size: 'Large',
      name: 'Buddy',
      photos: [
        {
          small: 'https://placedog.net/100/100',
          medium: 'https://placedog.net/300/300',
          large: 'https://placedog.net/600/600',
          full: 'https://placedog.net/1000/1000'
        }
      ]
    },
    {
      id: 102,
      type: 'cat',
      breed: 'Domestic Short Hair',
      age: 'Adult',
      gender: 'Female',
      size: 'Medium',
      name: 'Whiskers',
      photos: [
        {
          small: 'https://placekitten.com/100/100',
          medium: 'https://placekitten.com/300/300',
          large: 'https://placekitten.com/600/600',
          full: 'https://placekitten.com/1000/1000'
        }
      ]
    },
    {
      id: 103,
      type: 'bird',
      breed: 'Parakeet',
      age: 'Young',
      gender: 'Male',
      size: 'Small',
      name: 'Tweety',
      photos: [
        {
          small: 'https://picsum.photos/id/210/100/100',
          medium: 'https://picsum.photos/id/210/300/300',
          large: 'https://picsum.photos/id/210/600/600',
          full: 'https://picsum.photos/id/210/1000/1000'
        }
      ]
    },
    {
      id: 104,
      type: 'small',
      breed: 'Hamster',
      age: 'Young',
      gender: 'Female',
      size: 'Small',
      name: 'Peanut',
      photos: [
        {
          small: 'https://picsum.photos/id/1074/100/100',
          medium: 'https://picsum.photos/id/1074/300/300',
          large: 'https://picsum.photos/id/1074/600/600',
          full: 'https://picsum.photos/id/1074/1000/1000'
        }
      ]
    },
    {
      id: 105,
      type: 'reptile',
      breed: 'Gecko',
      age: 'Adult',
      gender: 'Male',
      size: 'Small',
      name: 'Rex',
      photos: [
        {
          small: 'https://picsum.photos/id/24/100/100',
          medium: 'https://picsum.photos/id/24/300/300',
          large: 'https://picsum.photos/id/24/600/600',
          full: 'https://picsum.photos/id/24/1000/1000'
        }
      ]
    }
  ];
  
  // Filter by type if specified
  if (filterType && filterType !== 'all') {
    return samplePets.filter(pet => pet.type === filterType);
  }
  
  return samplePets;
}
