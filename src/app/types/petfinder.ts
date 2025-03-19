export type PetfinderAuthResponse = {
  token_type: string;
  expires_in: number;
  access_token: string;
};

export type PetfinderPet = {
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
  photos: Array<{
    small: string;
    medium: string;
    large: string;
    full: string;
  }>;
};

export type PetfinderResponse = {
  animals: PetfinderPet[];
  pagination: {
    count_per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
  };
};

export type SimplifiedPet = {
  id: number;
  type: string;
  breed: string;
  age: string;
};
