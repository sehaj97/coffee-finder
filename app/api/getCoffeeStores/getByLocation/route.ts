import { fetchCoffeeStores } from "@/libs/coffee-stores-api";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // Ensures the route is always dynamic
export async function GET(request: NextRequest) {
  try {
    // url looks like: /api/getCoffeeStores/getByLocation?longitude=123.456&latitude=78.910&limit=6
    const searchParams = request.nextUrl.searchParams;
    const longitudeStr = searchParams.get("longitude") || "-73.990593";
    const latitudeStr = searchParams.get("latitude") || "40.740121";
    const limitStr = searchParams.get("limit") || "6";

    if (!longitudeStr || !latitudeStr) {
      return NextResponse.json(
        { error: "Missing longitude or latitude" },
        { status: 400 }
      );
    }

    const longitude = parseFloat(longitudeStr);
    const latitude = parseFloat(latitudeStr);
    const limit = limitStr ? parseInt(limitStr, 10) : 6;

    const responseData = await fetchCoffeeStores(longitude, latitude, limit);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.error();
  }
}
