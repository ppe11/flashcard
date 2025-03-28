
import { NextResponse } from 'next/server';
import { getPetfinderToken } from '@/lib/petfinder';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = await getPetfinderToken();
    const response = await fetch(`https://api.petfinder.com/v2/animals/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ pet: data.animal });
  } catch (error) {
    console.error('Error fetching pet:', error);
    return NextResponse.json({ error: 'Failed to fetch pet' }, { status: 500 });
  }
}