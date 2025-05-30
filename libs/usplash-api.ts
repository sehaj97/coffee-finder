import { createApi } from "unsplash-js";
const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
if (!accessKey) {
  throw new Error(
    "NEXT_PUBLIC_UNSPLASH_ACCESS_KEY environment variable is not set"
  );
}
export const unsplash = createApi({
  accessKey,
});
export const setUnsplashImages = async (): Promise<void> => {
  // Fetch a random image from Unsplash API
  let images: string[] = [];
  try {
    console.log(
      "Access key exists:",
      !!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    );
    // Direct call to Unsplash API
    const response = await unsplash.search.getPhotos({
      query: "coffee shop",
      page: 1,
      perPage: 10,
      color: "green",
      orientation: "landscape",
    });

    images =
      response.response?.results.map((result) => result.urls.regular) || [];
  } catch (error) {
    console.error("Error fetching Unsplash image:", error);
    // Will fall back to provided imageUrl or placeholder
  }
  sessionStorage.setItem("unsplashImages", JSON.stringify(images));
  console.log("Unsplash images set in sessionStorage:", images);
};
