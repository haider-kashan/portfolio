import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live"; // <-- You need this import!

import { apiVersion, dataset, projectId } from "../env"; // Ensure the path is correct

// --- 1. Define the BASE Sanity Client Configuration ---
const baseConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  stega: {
    // Matches your .env: NEXT_PUBLIC_SANITY_STUDIO_URL
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
};

export const client = createClient(baseConfig);

// --- 2. Define Live Content ---
export const { sanityFetch, SanityLive } = defineLive({
  client: client,
  
  // 1. Matches your .env: SANITY_SERVER_API_TOKEN
  serverToken: process.env.SANITY_SERVER_API_TOKEN, 
  
  // 2. Matches your .env: NEXT_PUBLIC_SANITY_API_BROWSER_TOKEN
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_BROWSER_TOKEN, 
});
