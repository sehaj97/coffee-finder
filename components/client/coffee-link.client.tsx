"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type CoffeeLinkProps = {
  children: React.ReactNode;
  href: string;
  isAnchor?: boolean;
};

export default function CoffeeHomeLink() {
  return (
    <Link
      href={`/`}
      className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-5 py-2 px-5 inline-block bg-blue-100 text-blue-700"
      onClick={() => {
        if (typeof window !== "undefined") {
          const location = sessionStorage.getItem("location");
          if (location) {
            sessionStorage.setItem("persistedLocation", location);
          }
        }
      }}
    >
      Home
    </Link>
  );
}
