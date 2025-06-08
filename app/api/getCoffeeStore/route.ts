import { fetchCoffeeStore } from "@/libs/coffee-stores-api";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // Ensures the route is always dynamic
export async function GET(request: NextRequest) {
  try {
    // url looks like: /api/getCoffeeStore?id=2
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id") || "2";

    if (!id ) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      );
    }

    const responseData = await fetchCoffeeStore(id);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.error();
  }
}
