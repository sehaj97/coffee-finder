import { createApi } from "unsplash-js";
const accessKey = process.env.NEXT_UNSPLASH_ACCESS_KEY;
if (!accessKey) {
  throw new Error("NEXT_UNSPLASH_ACCESS_KEY environment variable is not set");
}
export const unsplash = createApi({
  accessKey: accessKey,
});
