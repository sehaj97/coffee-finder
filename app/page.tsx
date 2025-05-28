import Banner from "@/components/client/top-banner.client";
import CoffeeShopsServer from "./coffee-stores/page";
import NearbyCoffeeStores from "@/components/client/nearby-coffee-stores.client";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-14">
      <NearbyCoffeeStores />

      <section className="w-full max-w-6xl mt-16">
        <div className="w-full max-w-6xl">
          <CoffeeShopsServer />
        </div>
      </section>
    </main>
  );
}
