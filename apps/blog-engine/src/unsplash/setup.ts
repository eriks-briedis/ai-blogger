import { createApi } from 'unsplash-js'
import * as nodeFetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

export const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch.default as unknown as typeof fetch,
} as any)
