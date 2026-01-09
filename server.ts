import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import getMetricsHandler from './api/metrics/get';
import readMetricsHandler from './api/metrics/read';
import kudosMetricsHandler from './api/metrics/kudos';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API Routes
app.get('/api/metrics/get', getMetricsHandler);
app.post('/api/metrics/read', readMetricsHandler);
app.post('/api/metrics/kudos', kudosMetricsHandler);

// Serve HTML files
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/blog/blogs', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'blog', 'blogs.html'));
});

app.get('/blog/:slug', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'blog', `${req.params.slug}.html`));
});

app.get('/papers/paper', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'papers', 'paper.html'));
});

app.get('/papers/:slug', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'papers', `${req.params.slug}.html`));
});

app.get('/projects/project', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'projects', 'project.html'));
});

app.get('/projects/:slug', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'projects', `${req.params.slug}.html`));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});