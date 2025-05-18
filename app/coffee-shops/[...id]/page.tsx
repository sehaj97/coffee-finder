"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockShops } from "@/app/mocks/cofee-shops";
import { use } from "react";
import CoffeeCard from "@/components/coffee-card.client";
import BranchCard from "@/components/branch-card.server";

function CoffeeShopPage({ params }: { params: Promise<{ id: string[] }> }) {
  const { id } = use(params); // Unwrapping the promise
  const coffeeShop = mockShops?.find((shop) => shop.id === id[0]) as
    | {
        id: string;
        name: string;
        address: string;
        imgUrl: string;
        rating: number;
        branches: { id: string; name: string }[];
      }
    | undefined;
  const { name, address, imgUrl, rating } = coffeeShop || {};

  const hasBranches = coffeeShop?.branches && coffeeShop.branches.length > 0;

  return (
    <div className="flex min-h-screen flex-col items-center p-14">
      <div className="w-full max-w-4xl backdrop-blur-md rounded-lg shadow-lg p-8">
        {id[0] && (
          <Link
            href={`/`}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-5 py-2 px-5 inline-block bg-blue-100 text-blue-700"
          >
            Home
          </Link>
        )}
        {id[1] && (
          <Link
            href={`/coffee-shops/${id[0]}`}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-5 py-2 px-5 inline-block bg-blue-100 text-blue-700"
          >
            {coffeeShop?.name}
          </Link>
        )}
        {id[0] && (
          <CoffeeCard
            name={name || "Unknown Name"}
            address={address || "Unknown Address"}
            rating={rating || 0}
            imageUrl={
              imgUrl ||
              "https://images.unsplash.com/photo-1697724779999-c9e1697bea17?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          ></CoffeeCard>
        )}
        {hasBranches && (
          <BranchCard
            coffeeShop={coffeeShop}
            hasBranches={hasBranches}
            id={id}
          />
        )}
      </div>
    </div>
  );
}

export default CoffeeShopPage;
