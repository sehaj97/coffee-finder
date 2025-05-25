// app/components/CoffeeShops.client.tsx
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/server/info-card.server";
import { mockShops } from "@/app/mocks/mock-coffee-stores";

type CoffeeShop = {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
  rating: number;
  branches: { id: string; name: string }[];
};

type CoffeeShopsProps = {
  coffeeShopData?: CoffeeShop[];
};

export default function InfoCardList({
  coffeeShopData = [],
}: CoffeeShopsProps) {
  if (coffeeShopData.length === 0) {
    // const data = await getData();
    coffeeShopData = mockShops;
  }
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>(coffeeShopData);
  const [isLoading, setIsLoading] = useState(coffeeShopData.length === 0);

  useEffect(() => {
    if (coffeeShopData.length > 0) return;

    const fetchCoffeeShops = () => {
      setTimeout(() => {
        // Simulating delayed data
        setCoffeeShops([]);
        setIsLoading(false);
      }, 800);
    };

    fetchCoffeeShops();
  }, [coffeeShopData]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-14">
        <p className="text-lg">Loading coffee shops...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-left p-14">
      <h1 className="text-4xl font-bold mb-8 text-left">Local Coffee Shops</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {coffeeShops.map((shop) => (
          <Card
            href={`/coffee-stores/${shop?.id}/`}
            key={shop?.id}
            imageUrl={shop?.imgUrl}
            name={shop?.name}
          />
        ))}
      </div>
    </main>
  );
}
