import { Category } from "@prisma/client";
import { host } from "../../config/host.config";
import "server-only";

async function getCategories() {
  const url = `${host}/api/categories?populate[0]=thumbnail`;
  const res = await fetch(url, {
    method: "GET",
    next: { tags: ["categories"] },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json() as Category[];
  return data;
}

export default getCategories;
