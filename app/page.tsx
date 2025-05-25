import Banner from "@/components/client/top-banner.client";
import { fetchCoffeeStores, fetchCoffeeStore } from "@/libs/coffee-stores-api";
import CoffeeShopsServer from "./coffee-stores/page";
import { mockShops } from "./mocks/mock-coffee-stores";
import { CoffeeShopType } from "@/types/coffee-store-types";

export async function getData() {
  return await fetchCoffeeStores();
}

export async function getDataId(id: string) {
  return await fetchCoffeeStore(id);
}

export default async function Home() {
  const coffeeStores: CoffeeShopType[] = (await getData()) || mockShops;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-14">
      <Banner buttonText="View Your Local Coffee Shops" />

      <section className="w-full max-w-6xl mt-16">
        <div className="w-full max-w-6xl">
          <CoffeeShopsServer coffeeStores={coffeeStores} />
        </div>
      </section>
    </main>
  );
}
