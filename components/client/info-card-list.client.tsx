"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/server/info-card.server";
import { mockShops } from "@/app/mocks/mock-coffee-stores";
import { setUnsplashImages } from "@/libs/usplash-api";
import { CoffeeShopsProps, CoffeeShopType } from "@/types/coffee-store-types";

export default function InfoCardList({ coffeeStores = [] }: CoffeeShopsProps) {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShopType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  // Load coffee shops
  useEffect(() => {
    const loadCoffeeShops = () => {
      const cachedShops = sessionStorage.getItem("coffeeStores");

      if (cachedShops) {
        setCoffeeShops(JSON.parse(cachedShops));
        setIsLoading(false);
        console.log("Using cached coffee shops from sessionStorage");
        return;
      }

      if (coffeeStores.length > 0) {
        sessionStorage.setItem("coffeeStores", JSON.stringify(coffeeStores));
        setCoffeeShops(coffeeStores);
        setIsLoading(false);
        console.log(
          "Using provided coffee shops and setting in sessionStorage"
        );
        return;
      }

      // Fallback to mock shops after delay
      setTimeout(() => {
        sessionStorage.setItem("coffeeStores", JSON.stringify(mockShops));
        setCoffeeShops(mockShops);
        setIsLoading(false);
        console.log(
          "Using mock coffee shops after delay and setting in sessionStorage"
        );
      }, 800);
    };

    loadCoffeeShops();
  }, [coffeeStores]);

  // Load Unsplash images
  useEffect(() => {
    const cachedImages = sessionStorage.getItem("unsplashImages");

    if (cachedImages) {
      setImages(JSON.parse(cachedImages));
      console.log("Using cached Unsplash images from sessionStorage");
    } else {
      setUnsplashImages(); // Fetch and set Unsplash session storage images
      setImages(JSON.parse(sessionStorage.getItem("unsplashImages") || "[]"));
      console.log("Fetching Unsplash images and setting in sessionStorage");
    }
  }, []);

  const getImageUrl = (shop: CoffeeShopType) => {
    if (typeof shop.index === "number" && images[shop.index]) {
      return images[shop.index];
    }

    if (typeof shop.id === "number" && images[shop.id]) {
      return images[shop.id];
    }

    return "https://images.unsplash.com/photo-1697724779999-c9e1697bea17?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-14">
        <p className="text-lg">Loading coffee shops...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-start p-14">
      <h1 className="text-4xl font-bold mb-8">Local Coffee Shops</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {coffeeShops.map((shop) => (
          <Card
            key={shop.id}
            href={`/coffee-stores/${shop.id}/`}
            name={shop.name}
            imageUrl={getImageUrl(shop)}
          />
        ))}
      </div>
    </main>
  );
}
