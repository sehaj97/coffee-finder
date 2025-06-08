import Link from "next/link";
import { Suspense } from "react";
import DetailedInfoCard from "@/components/client/detailed-info-card.client";
import CoffeeHomeLink from "@/components/client/coffee-link.client";
import { fetchAirtableCoffeeStores } from "@/libs/airtable-api";
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export async function generateStaticParams() {
  // when running build, this function is called to generate the static params so make sure in another terminal you run the command "npm run dev" to start the localhost:3000 server to see the changes.
  try {
    const response = await fetch(
      `${baseUrl}/api/getCoffeeStores/getByLocation?longitude=-69.990593&latitude=44.740121&limit=10`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const coffeeStores = await response.json();
    return coffeeStores.map((store: { id: string, name: string, address: string, imgUrl: string, rating: number, votes: number }) => ({
      id: [store.id],
      name: store.name,
      address: store.address,
      imgUrl: store.imgUrl,
      rating: store.rating,
      votes: store.votes,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
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
      const response = await fetch(`${baseUrl}/api/getCoffeeStore?id=${storeId}`);
      const mapboxStores = await response.json();
      if (mapboxStores?.length > 0) {
        store = mapboxStores[0];
        console.log("store", store?.imgUrl);
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
            imageUrlTxt={store?.imgUrl}
            localImageUrl={localImageUrl}
            id={storeId}
            voteCount={store?.voting || 0}
            recordId={store?.recordId || ""}
          />
        </Suspense>
      </div>
    </div>
  );
}
