import InfoCardList from "@/components/client/info-card-list.client";
import { CoffeeShopsProps } from "../page"; // this is correct if used from app/page.tsx

export default function CoffeeShopsServer({
  coffeeShopData,
}: CoffeeShopsProps) {
  return <InfoCardList coffeeShopData={coffeeShopData} />;
}
