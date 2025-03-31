import { GET } from '../../../../src/app/pets/route';
import { NextResponse } from 'next/server';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

process.env.PETFINDER_KEY = 'test-key';
process.env.PETFINDER_SECRET = 'test-secret';

console.log = jest.fn();
console.error = jest.fn();

global.fetch = jest.fn();

const mockFetch = (response: any, ok = true) => {
  return jest.fn().mockResolvedValueOnce({
    ok,
    json: jest.fn().mockResolvedValueOnce(response),
    statusText: ok ? 'OK' : 'Error',
  });
};

describe('Pets API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (console.error as jest.Mock).mockClear();
    (console.log as jest.Mock).mockClear();
  });

  it('Return simplified pets data on successful response', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        token_type: 'Bearer',
        expires_in: 3600,
        access_token: 'mock-token',
      })
    );

    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        animals: [
          {
            id: 1,
            type: { name: 'Dog' },
            breeds: { primary: 'Labrador', secondary: null, mixed: false, unknown: false },
            age: 'Young',
            name: 'Max',
            gender: 'Male',
            size: 'Large',
            photos: []
          },
          {
            id: 2,
            type: { name: 'Cat' },
            breeds: { primary: 'Siamese', secondary: null, mixed: false, unknown: false },
            age: 'Adult',
            name: 'Felix',
            gender: 'Female',
            size: 'Medium',
            photos: []
          }
        ],
        pagination: {
          count_per_page: 20,
          total_count: 2,
          current_page: 1,
          total_pages: 1,
        },
      })
    );

    const request = new Request('http://localhost:3000/api/pets');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseData = await response.json();
    
    expect(responseData.pets).toEqual([
      {
        id: 1,
        type: 'Dog',
        breed: 'Labrador',
        age: 'Young',
        gender: 'Male',
        size: 'Large',
        name: 'Max',
        photos: []
      },
      {
        id: 2,
        type: 'Cat',
        breed: 'Siamese',
        age: 'Adult',
        gender: 'Female',
        size: 'Medium',
        name: 'Felix',
        photos: []
      }
    ]);
    
    expect(responseData.pagination).toBeDefined();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('Handle query parameters correctly', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        token_type: 'Bearer',
        expires_in: 3600,
        access_token: 'mock-token',
      })
    );

    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        animals: [],
        pagination: {
          count_per_page: 20,
          total_count: 0,
          current_page: 1,
          total_pages: 0,
        },
      })
    );

    const request = new Request('http://localhost:3000/api/pets?type=Dog&breed=Labrador&age=Young');
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.petfinder.com/v2/animals?type=Dog&breed=Labrador&age=Young&page=1&limit=100',
      expect.objectContaining({
        headers: { Authorization: 'Bearer mock-token' },
      })
    );
  });

  it('Handle empty response without volatile failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        token_type: 'Bearer',
        expires_in: 3600,
        access_token: 'mock-token',
      })
    );

    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        animals: [],
        pagination: {
          count_per_page: 20,
          total_count: 0,
          current_page: 1,
          total_pages: 0,
        },
      })
    );

    const request = new Request('http://localhost:3000/api/pets');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData.pets).toEqual([]);
  });

  it('should handle authentication failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({ error: 'invalid_client' }, false)
    );

    const request = new Request('http://localhost:3000/api/pets');
    const response = await GET(request);
    
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: 'Failed to fetch pets' });
  });

  it('Handle Petfinder API failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        token_type: 'Bearer',
        expires_in: 3600,
        access_token: 'mock-token',
      })
    );

    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({ error: 'server_error' }, false)
    );

    const request = new Request('http://localhost:3000/api/pets');
    const response = await GET(request);
    
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: 'Failed to fetch pets' });
  });

  it('Handle network failures', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        token_type: 'Bearer',
        expires_in: 3600,
        access_token: 'mock-token',
      })
    );

    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Network error');
    });

    const request = new Request('http://localhost:3000/api/pets');
    const response = await GET(request);
    
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: 'Failed to fetch pets' });
  });

  it('Properly filter pets by type', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        token_type: 'Bearer',
        expires_in: 3600,
        access_token: 'mock-token',
      })
    );

    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        animals: [
          { 
            id: 1, 
            type: { name: 'Dog' }, 
            breeds: { primary: 'Labrador', secondary: null, mixed: false, unknown: false }, 
            age: 'Young',
            gender: 'Male',
            size: 'Large',
            name: 'Max',
            photos: []
          },
          { 
            id: 3, 
            type: { name: 'Dog' }, 
            breeds: { primary: 'Poodle', secondary: null, mixed: false, unknown: false }, 
            age: 'Puppy',
            gender: 'Female',
            size: 'Small',
            name: 'Bella',
            photos: []
          }
        ],
        pagination: {
          count_per_page: 2,
          total_count: 2,
          current_page: 1,
          total_pages: 1
        }
      })
    );

    const request = new Request('http://localhost:3000/api/pets?type=Dog');
    const response = await GET(request);
    
    expect(response.status).toBe(200);
    const responseData = await response.json();
    
    expect(responseData.pets.length).toBe(2);
    expect(responseData.pets.every(pet => pet.type === 'Dog')).toBe(true);
  });
});
