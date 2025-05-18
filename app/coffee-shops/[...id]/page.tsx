"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockShops } from "../page";
import { use } from "react";

function CoffeeShopPage({ params }: { params: Promise<{ id: string[] }> }) {
  const { id } = use(params); // Unwrapping the promise
  const coffeeShop = mockShops?.find((shop) => shop.id === id[0]) as
    | { id: string; name: string; branches: { id: string; name: string }[] }
    | undefined;

  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const branchShop =
    coffeeShop?.branches.find((branch) => branch.id === id[1]) || null;

  const hasBranches = coffeeShop?.branches && coffeeShop.branches.length > 0;

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

      {hasBranches && !selectedBranch && !id[1] && (
        <button
          onClick={() => setSelectedBranch("showBranches")}
          className="text-gray-500 hover:underline m-5 py-2 px-5 bg-amber-100 border rounded-lg overflow-hidden hover:shadow-2xl shadow-blue-900 transition duration-300"
        >
          View All Branches
        </button>
      )}

      {id[1] && (
        <Link
          href={`/coffee-shops/${id[0]}`}
          className="text-gray-500 hover:underline m-5 py-2 px-5 bg-red-100 border rounded-lg overflow-hidden hover:shadow-2xl shadow-blue-900 transition duration-300"
        >
          Go Back
        </Link>
      )}

      {selectedBranch === "showBranches" &&
        coffeeShop?.branches?.map((branch, index) => (
          <Link
            key={branch.id}
            href={`/coffee-shops/${id[0]}/${branch.id}`}
            className="text-gray-500 hover:underline m-2 py-2 px-5 bg-blue-100 border rounded-lg overflow-hidden hover:shadow-2xl shadow-blue-900 transition duration-300 inline-block text-center"
          >
            Branch {index + 1}
          </Link>
        ))}

      {branchShop && (
        <div>
          <h3>Branch Name</h3>
          <p>{branchShop.name}</p>
          <p>You are now on {branchShop.name} page.</p>
        </div>
      )}
    </div>
  );
}

export default CoffeeShopPage;
