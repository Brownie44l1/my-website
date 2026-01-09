import { incrementKudos } from '../library/db';
import type { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.body;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug is required' });
  }

  try {
    const metrics = incrementKudos(slug);
    return res.status(200).json(metrics);
  } catch (error) {
    console.error('Error incrementing kudos:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}