import { mockShops } from "@/app/mocks/mock-coffee-stores";
import { CoffeeShopType, MapboxTypeArray } from "@/types/coffee-store-types";
import { MapboxType } from "../types/coffee-store-types";

export const transformMapData = (item: any, index: number) => {
  return {
    id: item.properties?.mapbox_id || index,
    name: item?.properties?.name || "Coffee Shop Not Found",
    address: item?.properties?.address || "Unknown Address",
    imgUrl:
      "https://images.unsplash.com/photo-1697724779999-c9e1697bea17?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 0,
    branches: [],
  };
};

export async function fetchCoffeeStores() {
  // fetch mapbox api
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/forward?q=coffee&limit=6&proximity=-79.3789680885594%2C43.653833032607096&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
    );
    const data = await response.json();
    const formattedData = data.features.map((feature: any, index: number) =>
      transformMapData(feature, index)
    );
    return await formattedData;
  } catch (error) {
    console.log(
      "error while fetching coffee stores, maybe check the api key -  for now returning mock data ",
      error
    );
    return mockShops;
  }
}

export async function fetchCoffeeStore(id: string) {
  // fetch mapbox api
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=06e1f036-ff3a-4196-8f49-c5f400b3d168&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
    );
    const data = await response.json();
    const formattedData = data.features.map((feature: any, index: number) =>
      transformMapData(feature, index)
    );
    return await formattedData;
  } catch (error) {
    console.log(
      "error while fetching coffee stores, maybe check the api key -  for now returning mock data ",
      error
    );
    return mockShops;
  }
}
