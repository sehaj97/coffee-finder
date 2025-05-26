import InfoCardList from "@/components/client/info-card-list.client";
import { mockShops } from "../mocks/mock-coffee-stores";
import { fetchCoffeeStores } from "@/libs/coffee-stores-api";

export default async function CoffeeShopsServer() {
  const coffeeStores = (await fetchCoffeeStores()) || mockShops;

  return <InfoCardList coffeeShopData={coffeeStores} />;
}
