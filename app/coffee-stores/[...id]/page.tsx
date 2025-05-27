import Link from "next/link";
import DetailedInfoCard from "@/components/server/detailed-info-card.server";
import BranchCard from "@/components/server/branch-card.server";
import { fetchCoffeeStore, fetchCoffeeStores } from "@/libs/coffee-stores-api";

export async function generateStaticParams(): Promise<{ id: string[] }[]> {
  const coffeeStores = await fetchCoffeeStores();

  return coffeeStores.map((coffeeStore: { id: string }) => ({
    id: [coffeeStore.id], // note: this must be an array for [...id]
  }));
}

// Updated Props type to reflect that params is a Promise
export type PageProps = {
  params: Promise<{
    id: string[];
  }>;
};

export default async function CoffeeShopPage({ params }: PageProps) {
  // Await the params Promise
  const resolvedParams = await params;
  const id = resolvedParams.id;
  let coffeeStore = null;

  try {
    coffeeStore = await fetchCoffeeStore(id?.[0]);
  } catch (error) {
    console.error("Error fetching coffee store data:", error);
    coffeeStore = [];
  }
  console.log("Coffee Store:", coffeeStore);
  const { name, address, imgUrl, rating } = coffeeStore[0] || {};
  const hasBranches = coffeeStore?.branches?.length > 0;
  return (
    <div className="flex min-h-screen flex-col items-center p-14">
      <div className="w-full max-w-4xl backdrop-blur-md rounded-lg shadow-lg p-8">
        {id?.[0] && (
          <Link
            href={`/`}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-5 py-2 px-5 inline-block bg-blue-100 text-blue-700"
          >
            Home
          </Link>
        )}
        {id?.[1] && (
          <Link
            href={`/coffee-stores/${id[0]}`}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-5 py-2 px-5 inline-block bg-blue-100 text-blue-700"
          >
            {coffeeStore?.name}
          </Link>
        )}
        {id?.[0] && (
          <DetailedInfoCard
            name={name || "Unknown Name"}
            address={address || "Unknown Address"}
            rating={rating || 0}
            imageUrl={
              imgUrl ||
              "https://images.unsplash.com/photo-1697724779999-c9e1697bea17?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
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
