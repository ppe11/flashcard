'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const pets = [
  { name: 'Dogs', image: '', path: '/quiz/dogs' },
  { name: 'Cats', image: '', path: '/quiz/cats' },
  { name: 'Fish', image: '', path: '/quiz/fish' },
  { name: 'Birds', image: '', path: '/quiz/birds' },
  { name: 'Small pets', image: '', path: '/quiz/small-pets' },
  { name: 'Reptiles', image: '', path: '/quiz/reptiles' },
  { name: 'or.....Let us decide!', image: '', path: '/quiz/random' },
];

const Quiz = () => {
  const router = useRouter();

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-orange-50 p-10">
      <h2 className="text-2xl font-semibold mb-6">Choose your desired pet to take a quiz!</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pets.map((pet, index) => (
          <Card
            key={index}
            className="cursor-pointer shadow-md hover:shadow-xl transition duration-300 bg-orange-100 p-4 text-center rounded-xl"
            onClick={() => handleClick(pet.path)}
          >
            <CardHeader className="flex justify-center">
              <img src={pet.image} alt={pet.name} className="w-24 h-24 object-contain" />
            </CardHeader>
            <CardContent className="text-lg font-medium">{pet.name}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

