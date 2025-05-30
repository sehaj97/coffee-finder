import { useEffect, useState } from "react";
import { Card } from "@/components/server/info-card.server";
import { mockShops } from "@/app/mocks/mock-coffee-stores";
import { setUnsplashImages } from "@/libs/usplash-api";
import { CoffeeShopType } from "@/types/coffee-store-types";
import { fetchCoffeeStores } from "@/libs/coffee-stores-api";

export default function InfoCardList({
  location,
}: {
  location: { latitude: number | null; longitude: number | null };
}) {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShopType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadCoffeeShops = async () => {
      if (!location.latitude || !location.longitude) return;

      const locationKey = `${location.latitude},${location.longitude}`;
      sessionStorage.setItem(
        "locationSessionKey",
        JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
      const cachedShops = sessionStorage.getItem(locationKey);

      if (cachedShops) {
        setCoffeeShops(JSON.parse(cachedShops));
        setIsLoading(false);
        return;
      }

      const fetchedShops =
        (await fetchCoffeeStores(location.longitude, location.latitude)) ||
        mockShops;
      setCoffeeShops(fetchedShops);
      sessionStorage.setItem(locationKey, JSON.stringify(fetchedShops));
      setIsLoading(false);
    };

    loadCoffeeShops();
  }, [location]);

  useEffect(() => {
    const cachedImages = sessionStorage.getItem("unsplashImages");

    if (cachedImages) {
      setImages(JSON.parse(cachedImages));
    } else {
      setUnsplashImages();
      setImages(JSON.parse(sessionStorage.getItem("unsplashImages") || "[]"));
    }
  }, []);

  const getImageUrl = (shop: CoffeeShopType) => {
    if (typeof shop.index === "number" && images[shop.index]) {
      return images[shop.index];
    }

    if (typeof shop.id === "number" && images[shop.id]) {
      return images[shop.id];
    }

    return "https://images.unsplash.com/photo-1697724779999-c9e1697bea17";
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-14">
        <p className="text-lg">Loading coffee shops...</p>
      </main>
    );
  }

  return (
    <section className="flex flex-col items-start p-14 w-full max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Local Coffee Shops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {coffeeShops.map((shop) => (
          <Card
            key={shop.id}
            href={`/coffee-stores/${shop.id}/?index=${shop.index}`}
            name={shop.name}
            imageUrl={getImageUrl(shop)}
          />
        ))}
      </div>
    </section>
  );
}
