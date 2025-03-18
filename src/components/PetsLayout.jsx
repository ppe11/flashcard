'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';

const PetsLayout = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const activeCategory = pathname.split('/')[1] || 'pets_all';

    const handleCategoryChange = (category) => {
      router.push(`/${category}`);
    };

    console.log("Active category:", activeCategory); // Debugging

    return (
        <div className="w-full pt-[100px]">
          {/*Tabs Navigation */}
          <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full flex justify-center items-center ">
          <TabsList className="bg-transparent p-0 h-auto gap-4 flex justify-center">
              {["pets_all", "pets_cats", "pets_dogs", "pets_birds"].map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-md font-medium border transition-colors
                    ${
                      activeCategory === category
                        ? " bg-orange-500 text-white"
                        : "bg-orange-100 text-black hover:bg-orange-500 hover:text-white"
                    }`}
                >
                  {category.replace("pets_", "").charAt(0).toUpperCase() + category.replace("pets_", "").slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            
          </Tabs>

          {/* Render Children Content */}
          <div className="mt-6">{children}</div>
        </div>
      );
};

export default PetsLayout;
