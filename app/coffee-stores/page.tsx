import InfoCardList from "@/components/client/info-card-list.client";
import { CoffeeShopsProps } from "@/types/coffee-store-types";
import { mockShops } from "../mocks/mock-coffee-stores";
import { getData } from "../page";

export default async function CoffeeShopsServer({
  coffeeStores = [],
}: CoffeeShopsProps) {
  if (!coffeeStores.length) {
    coffeeStores = (await getData()) || mockShops;
  }
  return <InfoCardList coffeeShopData={coffeeStores} />;
}
