"use client";
import { mockShops } from "../page";

async function CoffeeShopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coffeeShop = mockShops?.find((shop) => shop.id === id[0]) as
    | { id: string; name: string; branches: { id: string; name: string }[] }
    | undefined;
  const branchShop = coffeeShop?.branches.find(
    (branch: { id: string; name: string }) => branch.id === id[1]
  );
  console.log(id[1]);
  return (
    <div>
      My Post: {coffeeShop?.name} {branchShop && branchShop.name}
    </div>
  );
}

export default CoffeeShopPage;
