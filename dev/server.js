import http from 'node:http'
import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'

const PORT = 3000
const API_URL = 'https://researchos-form-backend.onrender.com'
const API_KEY = '7025081098'
const DEV_DIR = new URL('.', import.meta.url).pathname

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}

http.createServer((req, res) => {
  if (req.url === '/api/surveys') {
    const apiUrl = new URL('/surveys', API_URL)
    const proxyReq = https.request(
      apiUrl,
      { method: 'GET', headers: { 'X-API-Key': API_KEY } },
      (proxyRes) => {
        let body = ''
        proxyRes.on('data', c => body += c)
        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          })
          res.end(body)
        })
      },
    )
    proxyReq.on('error', () => {
      res.writeHead(502, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'proxy error' }))
    })
    proxyReq.end()
    return
  }

  const filePath = path.join(DEV_DIR, req.url === '/' ? 'stats.html' : req.url)
  const ext = path.extname(filePath)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('not found')
      return
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(data)
  })
}).listen(PORT, () => console.log(`Stats: http://localhost:${PORT}`))
