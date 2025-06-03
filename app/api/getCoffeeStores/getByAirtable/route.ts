import { fetchAirtableCoffeeStores } from "@/libs/airtable-api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // url looks like: /api/getCoffeeStores/getByAirtable
    const searchParams = request.nextUrl.searchParams;

    const idStr = searchParams.get("id");
    if (!idStr) {
      return Response.json({ error: "Missing id" }, { status: 400 });
    }
    
    const responseData = await fetchAirtableCoffeeStores(idStr);
    return Response.json(responseData ?? []);

  } catch (error) {
    console.error("Error in GET request:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
