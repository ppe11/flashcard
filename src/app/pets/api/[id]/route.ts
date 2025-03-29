import { fetchPetDetails } from '@/lib/petfinder';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest, 
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id; // Correct way to access params

    const data = await fetchPetDetails(id);

    console.log("API Response:", data);
    
    return new Response(JSON.stringify({ pet: data.animal }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
