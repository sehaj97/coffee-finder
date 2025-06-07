import { FieldSet } from "airtable";

export type CoffeeShopType = {
  id: string;
  index?: number;
  name: string;
  address: string;
  imgUrl: string;
  rating: number;
  votes?: number;
  branches: { id: string; name: string }[];
};

export type MapboxType = {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
  rating: number;
  votes?: number;
  branches: { id: string; name: string }[];
};

export type MapboxTypeArray = {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
  rating: number;
  votes?: number;
  branches: { id: string; name: string }[];
}[];

export interface CoffeeShopsProps {
  coffeeStores: CoffeeShopType[];
}