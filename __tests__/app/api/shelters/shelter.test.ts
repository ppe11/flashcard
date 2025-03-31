import { GET as getSheltersList } from '../../../../src/app/api/shelters/route';
import { GET as getShelterById } from '../../../../src/app/api/shelters/[id]/route';
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

describe('Shelters API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (console.error as jest.Mock).mockClear();
    (console.log as jest.Mock).mockClear();
  });

  describe('GET /api/shelters', () => {
    it('should return simplified shelters data on successful response', async () => {
      // Mock token response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          token_type: 'Bearer',
          expires_in: 3600,
          access_token: 'mock-token',
        })
      );

      // Mock shelters response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          organizations: [
            {
              id: 'org1',
              name: 'Happy Paws Shelter',
              email: 'info@happypaws.org',
              phone: '123-456-7890',
              address: {
                address1: '123 Main St',
                address2: null,
                city: 'Anytown',
                state: 'CA',
                postcode: '12345',
                country: 'US'
              },
              hours: {
                monday: '9AM-5PM',
                tuesday: '9AM-5PM',
                wednesday: '9AM-5PM',
                thursday: '9AM-5PM',
                friday: '9AM-5PM',
                saturday: '10AM-4PM',
                sunday: 'Closed'
              },
              url: 'https://www.petfinder.com/member/us/ca/anytown/happy-paws-shelter-org1',
              website: 'https://www.happypaws.org',
              mission_statement: 'Finding forever homes for pets',
              adoption: { policy: null, url: null },
              social_media: {
                facebook: null,
                twitter: null,
                youtube: null,
                instagram: null,
                pinterest: null
              },
              photos: [
                {
                  small: 'https://example.com/small.jpg',
                  medium: 'https://example.com/medium.jpg',
                  large: 'https://example.com/large.jpg',
                  full: 'https://example.com/full.jpg'
                }
              ],
              distance: 5.2,
              _links: {
                self: { href: '/v2/organizations/org1' },
                animals: { href: '/v2/animals?organization=org1' }
              }
            }
          ],
          pagination: {
            count_per_page: 20,
            total_count: 1,
            current_page: 1,
            total_pages: 1,
          },
        })
      );

      const request = new Request('http://localhost:3000/api/shelters');
      const response = await getSheltersList(request);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      
      expect(responseData.shelters).toHaveLength(1);
      expect(responseData.shelters[0]).toEqual(expect.objectContaining({
        id: 'org1',
        name: 'Happy Paws Shelter',
        contact: '123-456-7890',
        location: '123 Main St, Anytown, CA, 12345',
        hours: 'Mon: 9AM-5PM, Tue: 9AM-5PM, Wed: 9AM-5PM, Thu: 9AM-5PM, Fri: 9AM-5PM, Sat: 10AM-4PM, Sun: Closed',
        email: 'info@happypaws.org',
        website: 'https://www.happypaws.org',
        mission_statement: 'Finding forever homes for pets',
        photos: expect.any(Array)
      }));
      
      expect(responseData.pagination).toBeDefined();
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should handle location search correctly', async () => {
      // Mock token response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          token_type: 'Bearer',
          expires_in: 3600,
          access_token: 'mock-token',
        })
      );

      // Mock shelters response with location search
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          organizations: [
            {
              id: 'org2',
              name: 'Local Pet Rescue',
              email: 'info@localrescue.org',
              phone: '987-654-3210',
              address: {
                address1: '456 Oak Ave',
                address2: null,
                city: 'San Francisco',
                state: 'CA',
                postcode: '94103',
                country: 'US'
              },
              hours: {
                monday: '10AM-6PM',
                tuesday: '10AM-6PM',
                wednesday: '10AM-6PM',
                thursday: '10AM-6PM',
                friday: '10AM-6PM',
                saturday: '11AM-5PM',
                sunday: 'Closed'
              },
              url: 'https://www.petfinder.com/member/us/ca/san-francisco/local-pet-rescue-org2',
              website: 'https://www.localrescue.org',
              mission_statement: 'Rescuing local pets in need',
              photos: [],
              distance: 2.5,
              _links: {
                self: { href: '/v2/organizations/org2' },
                animals: { href: '/v2/animals?organization=org2' }
              }
            }
          ],
          pagination: {
            count_per_page: 20,
            total_count: 1,
            current_page: 1,
            total_pages: 1,
          },
        })
      );

      const request = new Request('http://localhost:3000/api/shelters?location=San%20Francisco,%20CA');
      const response = await getSheltersList(request);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      
      expect(responseData.shelters).toHaveLength(1);
      expect(responseData.shelters[0].location).toContain('San Francisco');
      
      // Verify the API was called with correct parameters
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        "https://api.petfinder.com/v2/organizations?location=San+Francisco%2C+CA&distance=100&page=1&limit=21&sort=distance",
        {
          headers: {
            Authorization: "Bearer mock-token",
          },
          cache: "no-store",
        }
      );
    });

    it('should handle shelter name search correctly', async () => {
      // Mock token response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          token_type: 'Bearer',
          expires_in: 3600,
          access_token: 'mock-token',
        })
      );

      // Mock shelters response with name search
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          organizations: [
            {
              id: 'org3',
              name: 'Paws and Claws Rescue',
              email: 'contact@pawsandclaws.org',
              phone: '555-123-4567',
              address: {
                address1: '789 Pine St',
                address2: null,
                city: 'Seattle',
                state: 'WA',
                postcode: '98101',
                country: 'US'
              },
              hours: {
                monday: '9AM-5PM',
                tuesday: '9AM-5PM',
                wednesday: '9AM-5PM',
                thursday: '9AM-5PM',
                friday: '9AM-5PM',
                saturday: '10AM-4PM',
                sunday: null
              },
              url: 'https://www.petfinder.com/member/us/wa/seattle/paws-and-claws-rescue-org3',
              website: 'https://www.pawsandclaws.org',
              mission_statement: null,
              photos: [],
              distance: null,
              _links: {
                self: { href: '/v2/organizations/org3' },
                animals: { href: '/v2/animals?organization=org3' }
              }
            }
          ],
          pagination: {
            count_per_page: 20,
            total_count: 1,
            current_page: 1,
            total_pages: 1,
          },
        })
      );

      const request = new Request('http://localhost:3000/api/shelters?name=Paws');
      const response = await getSheltersList(request);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      
      expect(responseData.shelters).toHaveLength(1);
      expect(responseData.shelters[0].name).toContain('Paws');
      
      // Verify the API was called with correct parameters
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('name=Paws'),
        expect.anything()
      );
    });

    it('should handle API errors gracefully', async () => {
      // Mock token response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          token_type: 'Bearer',
          expires_in: 3600,
          access_token: 'mock-token',
        })
      );

      // Mock API error
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({ error: 'server_error' }, false)
      );

      const request = new Request('http://localhost:3000/api/shelters');
      const response = await getSheltersList(request);
      
      // Should return sample data when API fails
      expect(response.status).toBe(200);
      const responseData = await response.json();
      
      // Sample data should be returned
      expect(responseData.shelters).toBeDefined();
      expect(Array.isArray(responseData.shelters)).toBe(true);
      expect(responseData.shelters.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/shelters/[id]', () => {
    it('should return detailed shelter information by ID', async () => {
      // Mock token response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          token_type: 'Bearer',
          expires_in: 3600,
          access_token: 'mock-token',
        })
      );

      // Mock shelter detail response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          organization: {
            id: 'shelter1',
            name: 'Animal Haven',
            email: 'info@animalhaven.org',
            phone: '212-555-1234',
            address: {
              address1: '200 Centre St',
              address2: null,
              city: 'New York',
              state: 'NY',
              postcode: '10013',
              country: 'US'
            },
            hours: {
              monday: '12PM-7PM',
              tuesday: '12PM-7PM',
              wednesday: '12PM-7PM',
              thursday: '12PM-7PM',
              friday: '12PM-7PM',
              saturday: '12PM-5PM',
              sunday: '12PM-5PM'
            },
            url: 'https://www.petfinder.com/member/us/ny/new-york/animal-haven-shelter1',
            website: 'https://www.animalhaven.org',
            mission_statement: 'Finding loving homes for abandoned animals',
            photos: [
              {
                small: 'https://example.com/small.jpg',
                medium: 'https://example.com/medium.jpg',
                large: 'https://example.com/large.jpg',
                full: 'https://example.com/full.jpg'
              }
            ],
            _links: {
              self: { href: '/v2/organizations/shelter1' },
              animals: { href: '/v2/animals?organization=shelter1' }
            }
          }
        })
      );

      const request = new Request('http://localhost:3000/api/shelters/shelter1');
      const context = { params: { id: 'shelter1' } };
      const response = await getShelterById(request, context);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      
      expect(responseData.shelter).toEqual(expect.objectContaining({
        id: 'shelter1',
        name: 'Animal Haven',
        email: 'info@animalhaven.org',
        contact: '212-555-1234',
        location: expect.stringContaining('200 Centre St'),
        hours: expect.stringContaining('Monday: 12PM-7PM'),
        website: 'https://www.animalhaven.org',
      }));
      
      // Verify website is included
      expect(responseData.shelter.website).toBeTruthy();
    });

    it('should handle shelter with missing website', async () => {
      // Mock token response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          token_type: 'Bearer',
          expires_in: 3600,
          access_token: 'mock-token',
        })
      );

      // Mock shelter with no website
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          organization: {
            id: 'shelter2',
            name: 'Local Rescue',
            email: 'info@localrescue.org',
            phone: '555-987-6543',
            address: {
              address1: '123 Rescue Lane',
              address2: null,
              city: 'Chicago',
              state: 'IL',
              postcode: '60601',
              country: 'US'
            },
            hours: {
              monday: '10AM-4PM',
              tuesday: '10AM-4PM',
              wednesday: '10AM-4PM',
              thursday: '10AM-4PM',
              friday: '10AM-4PM',
              saturday: null,
              sunday: null
            },
            url: 'https://www.petfinder.com/member/us/il/chicago/local-rescue-shelter2',
            website: null,
            mission_statement: 'Helping animals in need',
            photos: [],
            _links: {
              self: { href: '/v2/organizations/shelter2' },
              animals: { href: '/v2/animals?organization=shelter2' }
            }
          }
        })
      );

      const request = new Request('http://localhost:3000/api/shelters/shelter2');
      const context = { params: { id: 'shelter2' } };
      const response = await getShelterById(request, context);

      expect(response.status).toBe(200);
      const responseData = await response.json();
      
      // Verify website is null when not available
      expect(responseData.shelter.website).toBeNull();
    });

    it('should handle shelter not found error', async () => {
      // Mock token response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({
          token_type: 'Bearer',
          expires_in: 3600,
          access_token: 'mock-token',
        })
      );

      // Mock 404 response
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({ status: 'not found' }, false)
      );

      const request = new Request('http://localhost:3000/api/shelters/nonexistent');
      const context = { params: { id: 'nonexistent' } };
      const response = await getShelterById(request, context);

      expect(response.status).toBe(404);
      const responseData = await response.json();
      
      expect(responseData.error).toBe('Shelter not found');
    });

    it('should handle authentication failure', async () => {
      // Mock auth failure
      (global.fetch as jest.Mock).mockImplementationOnce(
        mockFetch({ error: 'invalid_client' }, false)
      );

      const request = new Request('http://localhost:3000/api/shelters/shelter1');
      const context = { params: { id: 'shelter1' } };
      const response = await getShelterById(request, context);
      
      expect(response.status).toBe(500);
      const responseData = await response.json();
      expect(responseData.error).toBe('Failed to get Petfinder token');
    });
  });
});