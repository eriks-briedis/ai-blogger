import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

export const postClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-07-01', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})
