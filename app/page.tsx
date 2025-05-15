import Banner from "@/components/banner.client";
import Link from "next/link";
import Image from "next/image";
import CoffeeShops from "./coffee-shops/page";

// Define the CoffeeShop interface
interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
  rating: number;
}

export default function Home() {
  // Initial empty coffee shops array
  const coffeeShops: CoffeeShop[] = [];

  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <Banner buttonText="View Your Local Coffee Shops" />

      <section className="w-full max-w-6xl mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Coffee Shops</h2>
          <Link href="/coffee-shops" className="text-blue-600 hover:underline">
            View all →
          </Link>
        </div>

        <div className="w-full max-w-6xl">
          <CoffeeShops />
        </div>
      </section>

      <section className="w-full max-w-6xl mt-16">
        <h2 className="text-2xl font-bold mb-6">Why CofFind?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">Discover Local Gems</h3>
            <p className="text-gray-600">
              Find unique coffee shops in your area that match your taste and
              style.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">Community Reviews</h3>
            <p className="text-gray-600">
              See what other coffee enthusiasts think about each location.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">Save Favorites</h3>
            <p className="text-gray-600">
              Keep track of your favorite spots for quick access later.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
