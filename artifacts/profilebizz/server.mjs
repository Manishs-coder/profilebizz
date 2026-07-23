/**
 * ProfileBizz production server.
 * - Serves static assets from dist/public/ directly.
 * - For social-media bot User-Agents: tries to serve the pre-rendered
 *   dist/public/{path}/index.html (OG tags injected at build time).
 * - All other paths fall back to the SPA's dist/public/index.html.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, 'dist', 'public');
const PORT = parseInt(process.env.PORT || '3000', 10);

const BOT_UA = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|slackbot|telegrambot|googlebot|bingbot|duckduckbot|applebot|discordbot|vkshare|pinterest|w3c_validator/i;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
};

function serveFile(res, filePath, status = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  const content = fs.readFileSync(filePath);
  res.writeHead(status, { 'Content-Type': contentType });
  res.end(content);
}

const server = http.createServer((req, res) => {
  // Strip query string
  const urlPath = req.url.split('?')[0].replace(/\/+$/, '') || '/';

  // 1. Try exact file in dist/public
  const exactFile = path.join(PUBLIC, urlPath);
  if (fs.existsSync(exactFile) && fs.statSync(exactFile).isFile()) {
    return serveFile(res, exactFile);
  }

  // 2. For bots or any request: try pre-rendered {path}/index.html
  const preRendered = path.join(PUBLIC, urlPath, 'index.html');
  if (fs.existsSync(preRendered)) {
    return serveFile(res, preRendered);
  }

  // 3. SPA fallback — serve root index.html
  const spa = path.join(PUBLIC, 'index.html');
  return serveFile(res, spa);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[profilebizz] Server listening on port ${PORT}`);
});
