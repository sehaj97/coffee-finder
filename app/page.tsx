import Banner from "@/components/client/top-banner.client";
import { fetchCoffeeStores } from "@/libs/coffee-stores-api";
import CoffeeShopsServer from "./coffee-stores/page";

export type CoffeeShop = {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
  rating: number;
  branches: { id: string; name: string }[];
};

export interface CoffeeShopsProps {
  coffeeShopData: CoffeeShop[];
}

export async function getData() {
  return await fetchCoffeeStores();
}

export default async function Home() {
  // Initial empty coffee shops array
  // const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);

  const coffeeShopsApi = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-14">
      <Banner buttonText="View Your Local Coffee Shops" />

      <section className="w-full max-w-6xl mt-16">
        <div className="w-full max-w-6xl">
          <CoffeeShopsServer coffeeShopData={coffeeShopsApi} />
        </div>
      </section>
    </main>
  );
}
