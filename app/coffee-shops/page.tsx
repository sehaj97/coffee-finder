"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
  rating: number;
}

interface CoffeeShopsProps {
  initialCoffeeShops?: CoffeeShop[];
}

export default function CoffeeShops({
  initialCoffeeShops = [],
}: CoffeeShopsProps) {
  const [coffeeShops, setCoffeeShops] =
    useState<CoffeeShop[]>(initialCoffeeShops);
  const [isLoading, setIsLoading] = useState(initialCoffeeShops.length === 0);

  useEffect(() => {
    // Skip fetching if we already have data from props
    if (initialCoffeeShops.length > 0) {
      return;
    }

    // Only fetch if no initial data was provided
    const fetchCoffeeShops = () => {
      setTimeout(() => {
        const mockShops = [
          {
            id: "1",
            name: "Brew Haven",
            address: "123 Main Street",
            imgUrl:
              "https://images.unsplash.com/photo-1493857671505-72967e2e2760?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.8,
          },
          {
            id: "2",
            name: "Coffee Culture",
            address: "456 Oak Avenue",
            imgUrl:
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.3,
          },
          {
            id: "3",
            name: "Espresso Express",
            address: "789 Pine Street",
            imgUrl:
              "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            rating: 4.6,
          },
        ];

        setCoffeeShops(mockShops);
        setIsLoading(false);
      }, 800);
    };

    fetchCoffeeShops();
  }, [initialCoffeeShops]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-14">
        <p className="text-lg">Loading coffee shops...</p>
      </main>
    );
  }

  // Rest of your component remains the same...
  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <h1 className="text-4xl font-bold mb-8">Local Coffee Shops</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {coffeeShops.map((shop) => (
          <Link
            href={`/coffee-shops/${shop.id}`}
            key={shop.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={shop.imgUrl}
                alt={shop.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{shop.name}</h2>
              <p className="text-gray-600 mt-1">{shop.address}</p>
              <div className="mt-2 flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{shop.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
