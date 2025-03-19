'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const pets = [
  { name: 'Dogs', image: assets.dog_quiz, path: '/quiz/dogs' },
  { name: 'Cats', image: assets.cat_quiz, path: '/quiz/cats' },
  { name: 'Fish', image: assets.fish_quiz, path: '/quiz/fish' },
  { name: 'Birds', image: assets.bird_quiz, path: '/quiz/birds' },
  { name: 'Small pets', image: assets.smallpets_quiz, path: '/quiz/small-pets' },
  { name: 'Reptiles', image: assets.reptiles_quiz, path: '/quiz/reptiles' },
  { name: 'or.....Let us decide!', image: assets.general_quiz, path: '/quiz/random' },
];

const Quiz = () => {
  const router = useRouter();

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-orange-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Choose your desired pet to take a quiz!</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-min">
        {pets.map((pet, index) => (
          <Card
            key={index}
            className={`cursor-pointer shadow-md hover:shadow-xl transition duration-300 bg-orange-100 px-4 pt-3 pb-0 text-center rounded-xl flex flex-col 
              ${pet.name === "or.....Let us decide!" ? "h-49 w-full md:col-span-2" : "h-49 w-44"}`}
            onClick={() => handleClick(pet.path)}
          >
          <CardContent className="text-lg font-medium py-2">{pet.name}</CardContent>
          <div className="flex-grow flex items-end justify-center mt-auto min-h-0">
            <Image 
              src={pet.image} 
              alt={pet.name} 
              width={100}  
              height={100}  
              className="object-contain"
            />
          </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

