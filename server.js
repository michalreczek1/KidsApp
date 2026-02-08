const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json'
};

function resolveRequestPath(urlPathname) {
  if (urlPathname === '/') return '/family-manager.html';
  if (urlPathname === '/test-cases') return '/TEST-CASES.html';
  return urlPathname;
}

function setCacheHeaders(filePath, res) {
  const fileName = path.basename(filePath);
  if (fileName === 'service-worker.js' || fileName === 'manifest.json') {
    res.setHeader('Cache-Control', 'no-cache');
    return;
  }
  if (fileName.endsWith('.html')) {
    res.setHeader('Cache-Control', 'no-store');
    return;
  }
  res.setHeader('Cache-Control', 'public, max-age=86400');
}

function sendFile(filePath, req, res) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(error.code === 'ENOENT' ? 'Not Found' : 'Internal Server Error');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    setCacheHeaders(filePath, res);
    res.writeHead(200, { 'Content-Type': contentType });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('ok');
    return;
  }

  const resolvedPath = resolveRequestPath(pathname);
  const normalizedPath = path.normalize(resolvedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(ROOT_DIR, normalizedPath);

  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }
    sendFile(filePath, req, res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Family Manager server listening on port ${PORT}`);
});
