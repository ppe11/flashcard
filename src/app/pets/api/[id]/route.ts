import { fetchPetDetails } from '@/lib/petfinder';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Missing pet ID' }, { status: 400 });
    }

    const data = await fetchPetDetails(id);

    if (!data || !data.animal) {
        return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
    }

    return NextResponse.json({ pet: data.animal });

  } catch (error: any) {
    console.error("Error fetching pet details:", error); // Log the error server-side for debugging
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}