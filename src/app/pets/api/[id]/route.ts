import { fetchPetDetails } from '@/lib/petfinder';
import { NextRequest, NextResponse } from 'next/server';

// Define the expected shape of the context parameter for clarity
interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, context: RouteContext) {

  try {
    const { id } = context.params; // Destructure id from context.params

    // Basic validation: Ensure id exists
    if (!id) {
      return NextResponse.json({ error: 'Missing pet ID' }, { status: 400 });
    }

    const data = await fetchPetDetails(id);

    // Handle case where the pet might not be found by the API
    if (!data || !data.animal) {
        return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
    }

    return NextResponse.json({ pet: data.animal });

  } catch (error: any) {
    console.error("Error fetching pet details:", error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}