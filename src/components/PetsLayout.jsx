'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const PetsLayoutClient = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'all';

    const handleCategoryChange = (category) => {
      if (category === 'all') {
        router.push('/pets_all');
      } else {
        router.push(`/pets_all?type=${category}`);
      }
    };

    return (
        <div className="w-full pt-[100px]">
          {/*Tabs Navigation */}
          <Tabs value={type} onValueChange={handleCategoryChange} className="w-full flex justify-center items-center ">
          <TabsList className="bg-transparent p-0 h-auto gap-4 flex justify-center">
              {["all", "cat", "dog", "bird"].map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-md font-medium border transition-colors
                    ${
                      type === category
                        ? " bg-orange-500 text-white"
                        : "bg-orange-100 text-black hover:bg-orange-500 hover:text-white"
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            
          </Tabs>

          {/* Render Children Content */}
          <div className="mt-6">{children}</div>
        </div>
      );
};

// Wrapper component with Suspense
const PetsLayout = ({ children }) => {
  return (
    <Suspense fallback={
      <div className="w-full pt-[100px]">
        <div className="w-full flex justify-center items-center">
          <div className="bg-transparent p-0 h-auto gap-4 flex justify-center">
            {["all", "cat", "dog", "bird"].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-md font-medium border bg-orange-100 text-black"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    }>
      <PetsLayoutClient children={children} />
    </Suspense>
  );
};

export default PetsLayout;
