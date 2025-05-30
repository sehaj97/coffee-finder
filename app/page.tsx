import CoffeeStoresPage from "./coffee-stores/page";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-14">
      <section className="w-full max-w-6xl mt-16">
        <div className="w-full max-w-6xl">
          <CoffeeStoresPage />
        </div>
      </section>
    </main>
  );
}
