// app/components/CoffeeShops.client.tsx
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/server/info-card.server";
import { mockShops } from "@/app/mocks/mock-coffee-stores";
import { setUnsplashImages } from "@/libs/usplash-api";
import { CoffeeShopsProps, CoffeeShopType } from "@/types/coffee-store-types";

export default function InfoCardList({ coffeeStores = [] }: CoffeeShopsProps) {
  if (coffeeStores.length === 0) {
    // const data = await getData();
    coffeeStores = mockShops;
  }
  const [coffeeShops, setCoffeeShops] =
    useState<CoffeeShopType[]>(coffeeStores);
  const [isLoading, setIsLoading] = useState(coffeeStores.length === 0);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (coffeeStores.length > 0) return;

    const fetchCoffeeShops = () => {
      setTimeout(() => {
        // Simulating delayed data
        setCoffeeShops([]);
        setIsLoading(false);
      }, 800);
    };

    fetchCoffeeShops();
  }, [coffeeStores]);

  useEffect(() => {
    const imagesStr = sessionStorage.getItem("unsplashImages");
    if (imagesStr) {
      setImages(JSON.parse(imagesStr));
      console.log("Images loaded from sessionStorage:", JSON.parse(imagesStr));
    } else {
      setUnsplashImages();
      setImages([]);
    }
  }, []);
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
            imageUrl={
              typeof shop?.index === "number"
                ? images[shop.index]
                : typeof shop?.id === "number"
                ? images[shop.id]
                : "https://images.unsplash.com/photo-1697724779999-c9e1697bea17?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            name={shop?.name}
          />
        ))}
      </div>
    </main>
  );
}
