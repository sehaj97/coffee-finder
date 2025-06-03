import Link from "next/link";
import { Suspense } from "react";
import DetailedInfoCard from "@/components/client/detailed-info-card.client";
import { fetchCoffeeStore, fetchCoffeeStores } from "@/libs/coffee-stores-api";
import CoffeeHomeLink from "@/components/client/coffee-link.client";
import { createCoffeeStore, fetchAirtableCoffeeStores } from "@/libs/airtable-api";

const DEFAULT_IMG_URL =
  "https://images.unsplash.com/photo-1697724779999-c9e1697bea17?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export async function generateStaticParams(): Promise<{ id: string[] }[]> {
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
  let store = null;
  let localImageUrl = false;
  try {
      const coffeeStoreAirtable = await fetchAirtableCoffeeStores(id?.[0]);
      console.log("coffeeStoreAirtable", coffeeStoreAirtable);
      if (coffeeStoreAirtable && coffeeStoreAirtable.length > 0) {
        // If store exists in Airtable, use that data
        store = coffeeStoreAirtable[0] || {};
        console.log("Found store in Airtable:", store);

      } else {
        // If not in Airtable, fetch from Mapbox
        const coffeeStoreMapbox = await fetchCoffeeStore(id?.[0]);  
        await createCoffeeStore(coffeeStoreMapbox, id?.[0]); 
        store = coffeeStoreMapbox[0] || {};
        localImageUrl = true;
        console.log("Fetched store from Mapbox:", store);
      }
  } catch (error) {
    console.error("Error fetching coffee store data:", error);
  }

  // const hasBranches = coffeeStore?.branches?.length > 0;

  return (
    <div className="flex min-h-screen flex-col items-center p-14">
      <div className="w-full max-w-4xl backdrop-blur-md rounded-lg shadow-lg p-8">
        {id?.[0] && (
          <Suspense fallback={<div>Loading...</div>}>
            <CoffeeHomeLink />
          </Suspense>
        )}
        {id?.[1] && (
          <Link
            href={`/coffee-stores/${id[0]}`}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-5 py-2 px-5 inline-block bg-blue-100 text-blue-700"
          >
            {store.name}
          </Link>
        )}
        <Suspense fallback={<div>Loading store details...</div>}>
          {id?.[0] && (
            <DetailedInfoCard
              name={store.name || "Unknown Name"}
              address={store.address || "Unknown Address"}
              rating={store.rating || 0}
              imageUrlTxt={store.imgUrl || DEFAULT_IMG_URL}
              localImageUrl={localImageUrl}
              id={id[0]}
            />
          )}
        </Suspense>
        {/* {hasBranches && (
          <Suspense fallback={<div>Loading branches...</div>}>
            <BranchCard
              coffeeShop={coffeeStore}
              hasBranches={hasBranches}
              id={id}
            />
          </Suspense>
        )} */}
      </div>
    </div>
  );
}
