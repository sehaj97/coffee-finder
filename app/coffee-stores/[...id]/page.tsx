import Link from "next/link";
import DetailedInfoCard from "@/components/client/detailed-info-card.client";
import BranchCard from "@/components/server/branch-card.server";
import { fetchCoffeeStore, fetchCoffeeStores } from "@/libs/coffee-stores-api";
import CoffeeHomeLink from "@/components/client/coffee-link.client";

const DEFAULT_IMG_URL =
  "https://images.unsplash.com/photo-1697724779999-c9e1697bea17?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export async function generateStaticParams(): Promise<{ id: string[] }[]> {
  const coffeeStores = await fetchCoffeeStores(-73.990593, 40.740121);
  return coffeeStores.map((store: { id: string }) => ({
    id: [store.id],
  }));
}

type PageProps = {
  params: Promise<{ id: string[] }>;
};

export default async function CoffeeStorePage({ params }: PageProps) {
  const { id } = await params;
  let coffeeStore = null;

  try {
    coffeeStore = await fetchCoffeeStore(id?.[0]);
  } catch (error) {
    console.error("Error fetching coffee store data:", error);
    coffeeStore = [];
  }

  const store = coffeeStore?.[0] || {};
  const hasBranches = coffeeStore?.branches?.length > 0;

  return (
    <div className="flex min-h-screen flex-col items-center p-14">
      <div className="w-full max-w-4xl backdrop-blur-md rounded-lg shadow-lg p-8">
        {id?.[0] && <CoffeeHomeLink />}
        {id?.[1] && (
          <Link
            href={`/coffee-stores/${id[0]}`}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-5 py-2 px-5 inline-block bg-blue-100 text-blue-700"
          >
            {store.name}
          </Link>
        )}
        {id?.[0] && (
          <DetailedInfoCard
            name={store.name || "Unknown Name"}
            address={store.address || "Unknown Address"}
            rating={store.rating || 0}
            imageUrl={DEFAULT_IMG_URL}
            id={id[0]}
          />
        )}
        {hasBranches && (
          <BranchCard
            coffeeShop={coffeeStore}
            hasBranches={hasBranches}
            id={id}
          />
        )}
      </div>
    </div>
  );
}
