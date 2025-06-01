import { Suspense, useEffect, useState } from "react";
import { Card } from "@/components/server/info-card.server";
import { mockShops } from "@/app/mocks/mock-coffee-stores";
import { setUnsplashImages } from "@/libs/usplash-api";
import { CoffeeShopType } from "@/types/coffee-store-types";

const STORAGE_KEYS = {
  UNSPLASH_IMAGES: "unsplashImages",
} as const;

const DEFAULT_LIMIT = 6;
const DEFAULT_HEADING = "Coffee Stores";

type InfoCardListProps = {
  headingText?: string;
  location: { latitude: number | null; longitude: number | null };
  limit?: number;
};

type CachedDataType = {
  timestamp: number;
  data: CoffeeShopType[];
};

const LoadingState = ({ limit }: { limit: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
    {Array.from({ length: limit }).map((_, idx) => (
      <div
        key={idx}
        className="flex justify-center items-center h-64 bg-gray-100 animate-pulse rounded-lg"
      >
        <span className="text-lg text-gray-400">Loading image...</span>
      </div>
    ))}
  </div>
);

const LoadingScreen = () => (
  <main className="flex min-h-screen flex-col items-center justify-center p-14">
    <p className="text-lg">Loading coffee shops...</p>
  </main>
);

async function fetchCoffeeStoresByLocation(
  latitude: number,
  longitude: number,
  limit: number
): Promise<CoffeeShopType[]> {
  try {
    const response = await fetch(
      `/api/getCoffeeStores/getByLocation?longitude=${longitude}&latitude=${latitude}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const fetchedShops = await response.json();
    return fetchedShops || mockShops;
  } catch (error) {
    console.error(
      "Error fetching coffee stores by location, returning mock data",
      error
    );
    return mockShops;
  }
}

function getImageUrl(shop: CoffeeShopType, images: string[]): string | undefined {
  if (typeof shop.index === "number" && images[shop.index]) {
    return images[shop.index];
  }
  if (typeof shop.id === "number" && images[shop.id]) {
    return images[shop.id];
  }
  return undefined;
}

export default function InfoCardList({
  headingText = DEFAULT_HEADING,
  location,
  limit = DEFAULT_LIMIT,
}: InfoCardListProps) {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShopType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadCoffeeShops = async () => {
      const { latitude, longitude } = location;
      if (!latitude || !longitude) return;

      const locationKey = `${latitude},${longitude}`;
      const cachedData = sessionStorage.getItem(locationKey);

      if (cachedData) {
        const parsed = JSON.parse(cachedData) as CachedDataType;
        const now = Date.now();
        // Cache for 1 hour
        if (now - parsed.timestamp < 3600000) {
          setCoffeeShops(parsed.data);
          setIsLoading(false);
          return;
        }
      }

      const fetchedShops = await fetchCoffeeStoresByLocation(
        latitude,
        longitude,
        limit
      );
      setCoffeeShops(fetchedShops);
      
      const cacheData: CachedDataType = {
        timestamp: Date.now(),
        data: fetchedShops,
      };
      sessionStorage.setItem(locationKey, JSON.stringify(cacheData));
      setIsLoading(false);
    };

    const loadUnsplashImages = async () => {
      const cachedImages = sessionStorage.getItem(STORAGE_KEYS.UNSPLASH_IMAGES);
      if (cachedImages) {
        setImages(JSON.parse(cachedImages));
        return;
      }
      
      await setUnsplashImages();
      const newImages = sessionStorage.getItem(STORAGE_KEYS.UNSPLASH_IMAGES);
      setImages(newImages ? JSON.parse(newImages) : []);
    };

    loadCoffeeShops();
    loadUnsplashImages();
  }, [location, limit]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="flex flex-col items-start p-14 w-full max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">{headingText}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <Suspense fallback={<LoadingState limit={limit} />}>
          {coffeeShops.map((shop) => (
            <Card
              key={shop.id}
              href={`/coffee-stores/${shop.id}/?index=${shop.index}`}
              name={shop.name}
              imageUrl={images.length > 0 ? getImageUrl(shop, images) : undefined}
            />
          ))}
        </Suspense>
      </div>
    </section>
  );
}
