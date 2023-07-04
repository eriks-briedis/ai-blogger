import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { defaultRoute } from './src/routes';

dotenv.config();

const app: Express = express();
const port = process.env.BLOG_ENGINE_PORT;

app.use('/', defaultRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
