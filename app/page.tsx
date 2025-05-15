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
        <div className="w-full max-w-6xl">
          <CoffeeShops />
        </div>
      </section>
    </main>
  );
}
