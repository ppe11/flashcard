import { GET } from '../../../../src/app/pets/route';
import { NextResponse } from 'next/server';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

process.env.PETFINDER_KEY = 'test-key';
process.env.PETFINDER_SECRET = 'test-secret';

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
  });

  it('should return simplified pets data on successful response', async () => {
    // Mock token response
    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        token_type: 'Bearer',
        expires_in: 3600,
        access_token: 'mock-token',
      })
    );

    // Mock pets response
    (global.fetch as jest.Mock).mockImplementationOnce(
      mockFetch({
        animals: [
          {
            id: 1,
            type: { name: 'Dog' },
            breeds: { primary: 'Labrador', secondary: null, mixed: false, unknown: false },
            age: 'Young',
            name: 'Max',
            photos: [],
          },
          {
            id: 2,
            type: { name: 'Cat' },
            breeds: { primary: 'Siamese', secondary: null, mixed: false, unknown: false },
            age: 'Adult',
            name: 'Felix',
            photos: [],
          },
        ],
        pagination: {
          count_per_page: 20,
          total_count: 2,
          current_page: 1,
          total_pages: 1,
        },
      })
    );

    // Create mock request with URL
    const request = new Request('http://localhost:3000/api/pets');
    const response = await GET(request);
    const responseData = await response.json();

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(responseData).toEqual({
      pets: [
        { id: 1, type: 'Dog', breed: 'Labrador', age: 'Young' },
        { id: 2, type: 'Cat', breed: 'Siamese', age: 'Adult' },
      ],
      pagination: {
        count_per_page: 20,
        total_count: 2,
        current_page: 1,
        total_pages: 1,
      },
    });
  });

  it('should handle query parameters correctly', async () => {
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
            photos: [],
          },
        ],
        pagination: {
          count_per_page: 10,
          total_count: 1,
          current_page: 1,
          total_pages: 1,
        },
      })
    );

    const url = 'http://localhost:3000/api/pets?type=Dog&breed=Labrador&age=Young&limit=10';
    
    const request = new Request(url);
    
    await GET(request);

    const fetchCalls = (global.fetch as jest.Mock).mock.calls;
    expect(fetchCalls.length).toBe(2);
    
    const petsApiUrl = fetchCalls[1][0];
    
    expect(petsApiUrl).toContain('type=Dog');
    expect(petsApiUrl).toContain('breed=Labrador');
    expect(petsApiUrl).toContain('age=Young');
    expect(petsApiUrl).toContain('limit=10');
  });

  it('should handle empty response gracefully', async () => {
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
    const responseData = await response.json();

    expect(responseData).toEqual({
      pets: [],
      pagination: {
        count_per_page: 20,
        total_count: 0,
        current_page: 1,
        total_pages: 0,
      },
    });
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

  it('should handle Petfinder API failure', async () => {
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

  it('should handle network failures', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const request = new Request('http://localhost:3000/api/pets');
    const response = await GET(request);
    
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: 'Failed to fetch pets' });
  });
});
