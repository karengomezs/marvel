// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { limit } from "@/constant";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RootObject>
) {
  const offset = req.query.offset;

  const urlBase = `${process.env.API}/characters?apikey=${process.env.API_KEY}&hash=${process.env.HASH}&ts=${process.env.TS}&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(urlBase);
    const data: RootObject = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
}

export interface RootObject {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data;
}

interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result[];
}

export interface Result {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Comics;
  stories: Stories;
  events: Comics;
  urls: Url[];
}

interface Url {
  type: string;
  url: string;
}

interface Stories {
  available: number;
  collectionURI: string;
  items: Item2[];
  returned: number;
}

interface Item2 {
  resourceURI: string;
  name: string;
  type: string;
}

interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

interface Item {
  resourceURI: string;
  name: string;
}

interface Thumbnail {
  path: string;
  extension: string;
}
