import { NextResponse } from 'next/server';
export const dynamic = "force-static"
export const revalidate = false

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
    const token = await getPetfinderToken();

    const url = new URL(request.url);
    const { searchParams } = url;
    const type = searchParams.get('type') || undefined;
    const breed = searchParams.get('breed') || undefined;
    const age = searchParams.get('age') || undefined;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '50';

    const queryParams = new URLSearchParams();
    if (type) queryParams.append('type', type);
    if (breed) queryParams.append('breed', breed);
    if (age) queryParams.append('age', age);
    queryParams.append('page', page);
    queryParams.append('limit', limit);

    const response = await fetch(`https://api.petfinder.com/v2/animals?${queryParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error(`Failed to fetch pets: ${response.statusText}`);

    const data: PetfinderResponse = await response.json();

    // 🔹 Filter out pets that have no images
    const petsWithImages = data.animals.filter(pet => pet.photos.length > 0);

    // 🔹 Simplify pet data before sending response
    const simplifiedPets: SimplifiedPet[] = petsWithImages.map((pet) => ({
      id: pet.id,
      type: pet.type.name,
      breed: pet.breeds.primary || "Mixed Breed",
      age: pet.age,
      gender: pet.gender,
      size: pet.size,
      name: pet.name,
      photos: pet.photos,
    }));

    return NextResponse.json({ pets: simplifiedPets, pagination: data.pagination });

  } catch (error) {
    console.error('Error fetching pets:', error);
    return NextResponse.json({ error: 'Failed to fetch pets' }, { status: 500 });
  }
}
