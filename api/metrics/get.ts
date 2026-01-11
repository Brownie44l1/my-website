import { getMetrics } from "../library/db";
import type { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Slug is required" });
  }

  try {
    const metrics = await getMetrics(slug);
    return res.status(200).json(metrics);
  } catch (error) {
    console.error("Error getting metrics:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
