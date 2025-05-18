"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/card.server";
import { mockShops } from "@/app/mocks/cofee-shops";

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

  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <h1 className="text-4xl font-bold mb-8">Local Coffee Shops</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {coffeeShops.map((shop) => (
          <Card
            href={`/coffee-shops/${shop.id}/`}
            key={shop.id}
            imageUrl={shop.imgUrl}
            name={shop.name}
          />
        ))}
      </div>
    </main>
  );
}
