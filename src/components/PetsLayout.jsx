'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';

const PetsLayout = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const activeCategory = pathname.split('/')[1] || 'pets_all';

    const handleCategoryChange = (category) => {
      router.push(`/${category}`);
    };

    return (
        <div className="w-full p-6">
          {/* Persistent Tabs Navigation */}
          <Tabs value={activeCategory} className="w-full">
            <TabsList className="bg-transparent p-0 h-auto space-x-2 flex">
              {["pets_all", "pets_cats", "pets_dogs", "pets_fish"].map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => handleCategoryChange(category)} // ✅ Fix navigation
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
                    ${
                      activeCategory === category
                        ? "border-purple-500 outline outline-2 outline-purple-500 bg-orange-500 text-white"
                        : "bg-orange-100 text-black hover:bg-orange-500 hover:text-white"
                    }`}
                >
                  {category.replace("pets_", "").charAt(0).toUpperCase() + category.replace("pets_", "").slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Render Children Content (Different Pet Pages) */}
          <div className="mt-15">{children}</div>
        </div>
      );
};

export default PetsLayout;
