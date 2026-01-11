import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface Metrics {
  reads: number;
  kudos: number;
}

export async function getMetrics(slug: string): Promise<Metrics> {
  const metrics = await redis.get<Metrics>(`metrics:${slug}`);
  return metrics || { reads: 0, kudos: 0 };
}

export async function incrementReads(slug: string): Promise<Metrics> {
  const key = `metrics:${slug}`;
  const metrics = (await redis.get<Metrics>(key)) || { reads: 0, kudos: 0 };

  metrics.reads += 1;
  await redis.set(key, metrics);

  return metrics;
}

export async function incrementKudos(slug: string): Promise<Metrics> {
  const key = `metrics:${slug}`;
  const metrics = (await redis.get<Metrics>(key)) || { reads: 0, kudos: 0 };

  metrics.kudos += 1;
  await redis.set(key, metrics);

  return metrics;
}
