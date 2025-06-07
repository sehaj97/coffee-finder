import Link from "next/link";
import { Suspense } from "react";
import DetailedInfoCard from "@/components/client/detailed-info-card.client";
import { fetchCoffeeStore, fetchCoffeeStores } from "@/libs/coffee-stores-api";
import CoffeeHomeLink from "@/components/client/coffee-link.client";
import { createCoffeeStore, fetchAirtableCoffeeStores } from "@/libs/airtable-api";

const DEFAULT_IMG_URL =
  "https://images.unsplash.com/photo-1697724779999-c9e1697bea17?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export async function generateStaticParams() {
  const coffeeStores = await fetchCoffeeStores(-69.990593, 44.740121);
  return coffeeStores.map((store: { id: string }) => ({
    id: [store.id],
  }));
}

type PageProps = {
  params: Promise<{ id: string[] }>;
};

export default async function CoffeeStorePage({ params }: PageProps) {
  const { id } = await params;
  const storeId = id?.[0];
  
  if (!storeId) return null;

  let store = null;
  let localImageUrl = false;

  try {
    const airtableStores = await fetchAirtableCoffeeStores(storeId);
    
    if (airtableStores?.length > 0) {
      store = airtableStores[0];
    } else {
      const mapboxStores = await fetchCoffeeStore(storeId);
      if (mapboxStores?.length > 0) {
        store = mapboxStores[0];
        await createCoffeeStore(store, storeId);
        localImageUrl = true;
      }
    }
  } catch (error) {
    console.error("Error fetching coffee store data:", error);
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-14">
      <div className="w-full max-w-4xl backdrop-blur-md rounded-lg shadow-lg p-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CoffeeHomeLink />
        </Suspense>

        {id?.[1] && (
          <Link
            href={`/coffee-stores/${storeId}`}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-5 py-2 px-5 inline-block bg-blue-100 text-blue-700"
          >
            {store?.name}
          </Link>
        )}

        <Suspense fallback={<div>Loading store details...</div>}>
          <DetailedInfoCard
            name={store?.name || "Unknown Name"}
            address={store?.address || "Unknown Address"} 
            rating={store?.rating || 0}
            imageUrlTxt={store?.imgUrl || DEFAULT_IMG_URL}
            localImageUrl={localImageUrl}
            id={storeId}
          />
        </Suspense>
      </div>
    </div>
  );
}
