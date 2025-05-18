"use client";

import React from "react";
import Link from "next/link";
import { mockShops } from "../page";
import { use } from "react";

function CoffeeShopPage({ params }: { params: Promise<{ id: string[] }> }) {
  const { id } = use(params); // Unwrapping the promise
  const coffeeShop = mockShops?.find((shop) => shop.id === id[0]) as
    | { id: string; name: string; branches: { id: string; name: string }[] }
    | undefined;

  const branchShop: { id: string; name: string } | undefined =
    coffeeShop?.branches.find(
      (branch: { id: string; name: string }) => branch.id === id[1]
    );

  return (
    <div className="flex min-h-screen flex-col items-center p-14">
      <Link
        href={`/`} // Could also go to /coffee-shops if needed
        className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 m-5 py-2 px-5"
      >
        Home
      </Link>
      <h1 className="text-2xl font-bold mt-6">{coffeeShop?.name}</h1>
      <h3>Number of branches</h3>
      <p>{coffeeShop?.branches?.length || 0}</p>
      {branchShop ? (
        <div>
          <h3>Branch Name</h3>
          <p>{branchShop.name}</p>
        </div>
      ) : (
        coffeeShop?.branches?.map((branch: { id: string; name: string }) => (
          <Link
            key={branch.id}
            href={`/coffee-shops/${coffeeShop?.id}/${branch.id}`}
            className="text-gray-500 hover:underline m-5 py-2 px-5 bg-amber-100 border rounded-lg overflow-hidden hover:shadow-2xl shadow-blue-900 transition duration-300"
          >
            Click to view branch
          </Link>
        ))
      )}
    </div>
  );
}

export default CoffeeShopPage;
