#!/usr/bin/env node
// Serves dist/ locally for checking a build.
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const port = Number(process.env.PORT) || 4870;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' };

http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.join(dist, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
  if (!file.startsWith(dist) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    res.end(fs.existsSync(path.join(dist, '404.html')) ? fs.readFileSync(path.join(dist, '404.html')) : 'Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`http://localhost:${port}`));
