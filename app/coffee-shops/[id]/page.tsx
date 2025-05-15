"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  neighborhood?: string;
  imgUrl: string;
  websiteUrl?: string;
  rating: number;
  votes?: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CoffeeShopPage({ params }: PageProps) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const [coffeeShop, setCoffeeShop] = useState<CoffeeShop | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Try to use data from URL params first
    const name = searchParams.get("name");
    const address = searchParams.get("address");
    const imgUrl = searchParams.get("imgUrl");
    const rating = searchParams.get("rating");

    if (name && address && imgUrl && rating) {
      // We have all the data we need from URL params
      setCoffeeShop({
        id,
        name,
        address,
        imgUrl,
        rating: parseFloat(rating),
        // Set default values for optional fields
        neighborhood: "Downtown",
        websiteUrl: "https://example.com",
        votes: 123,
      });
      setIsLoading(false);
    } else {
      // Fall back to fetching data
      setTimeout(() => {
        setCoffeeShop({
          id,
          name: `Coffee Shop ${id}`,
          address: "123 Main Street, City",
          neighborhood: "Downtown",
          imgUrl:
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          websiteUrl: "https://example.com",
          rating: 4.5,
          votes: 123,
        });
        setIsLoading(false);
      }, 500);
    }
  }, [id, searchParams]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading coffee shop details...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-6 md:p-14">
      <Link
        href="/coffee-shops"
        className="self-start mb-6 text-blue-600 hover:underline"
      >
        ← Back to all coffee shops
      </Link>

      {coffeeShop && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={coffeeShop.imgUrl}
              alt={coffeeShop.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              {coffeeShop.name}
            </h1>

            <div className="mt-4 text-gray-700">
              <p className="text-lg">{coffeeShop.address}</p>
              {coffeeShop.neighborhood && (
                <p className="mt-1">{coffeeShop.neighborhood}</p>
              )}
            </div>

            <div className="mt-6 flex items-center">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-medium">{coffeeShop.rating}</span>
              </div>
              {coffeeShop.votes && (
                <>
                  <span className="mx-2 text-gray-400">•</span>
                  <span>{coffeeShop.votes} votes</span>
                </>
              )}
            </div>

            {coffeeShop.websiteUrl && (
              <a
                href={coffeeShop.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
