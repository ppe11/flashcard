import { fetchPetDetails } from '@/lib/petfinder';
export const dynamic = "auto"
export const revalidate = 3600

export async function GET(request: Request) {
    let id: string | undefined;

    try {
        const url = new URL(request.url);
        const pathname = url.pathname;

        const segments = pathname.split('/');
        if (segments.length > 3 && segments[segments.length - 2] === 'api') {
            id = segments[segments.length - 1];
        }

        if (!id) {
            console.error(`Could not extract pet ID from pathname: ${pathname}`);
            return new Response(JSON.stringify({ message: 'Bad Request: Could not determine pet ID from URL.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const petData = await fetchPetDetails(id);

        if (!petData || !petData.animal) {
            console.log(`Pet not found for ID: ${id}`);
            return new Response(JSON.stringify({ message: `Pet with ID ${id} not found.` }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify({ pet: petData.animal }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: unknown) {
        const errorContextId = id || 'unknown';
        console.error(`Error processing request for pet ID ${errorContextId}:`, error);

        const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';

        // Return a 500 Internal Server Error response
        return new Response(JSON.stringify({ message: 'Failed to process request due to a server error.', details: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}