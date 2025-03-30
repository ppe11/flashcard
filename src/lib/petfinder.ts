// lib/petfinder.ts
export async function getPetfinderToken(): Promise<string> {
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
      cache: 'no-store', // Don't cache auth tokens
    });
  
    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.access_token;
  }
  
  export async function fetchPetDetails(id: string) {
    const token = await getPetfinderToken();
    const response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 } // Cache pet details for an hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pet: ${response.statusText}`);
    }
    
    return response.json();
  }