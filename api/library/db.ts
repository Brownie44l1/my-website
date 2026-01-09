import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');
const METRICS_FILE = join(DATA_DIR, 'metrics.json');

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

interface Metrics {
  [slug: string]: {
    reads: number;
    kudos: number;
  };
}

function readMetrics(): Metrics {
  if (!existsSync(METRICS_FILE)) {
    return {};
  }
  
  try {
    const data = readFileSync(METRICS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading metrics:', error);
    return {};
  }
}

function writeMetrics(metrics: Metrics): void {
  try {
    writeFileSync(METRICS_FILE, JSON.stringify(metrics, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing metrics:', error);
  }
}

export function getMetrics(slug: string) {
  const metrics = readMetrics();
  return metrics[slug] || { reads: 0, kudos: 0 };
}

export function incrementReads(slug: string) {
  const metrics = readMetrics();
  
  if (!metrics[slug]) {
    metrics[slug] = { reads: 0, kudos: 0 };
  }
  
  metrics[slug].reads += 1;
  writeMetrics(metrics);
  
  return metrics[slug];
}

export function incrementKudos(slug: string) {
  const metrics = readMetrics();
  
  if (!metrics[slug]) {
    metrics[slug] = { reads: 0, kudos: 0 };
  }
  
  metrics[slug].kudos += 1;
  writeMetrics(metrics);
  
  return metrics[slug];
}