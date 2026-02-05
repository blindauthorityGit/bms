// lib/sanity.js
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "rs5t3rus",
    dataset: "production",
    apiVersion: "2026-01-01",
    //   useCdn: process.env.NODE_ENV === 'production',
});
