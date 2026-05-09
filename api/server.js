'use strict';

const express = require('express');
const fsp     = require('fs').promises;
const path    = require('path');
const multer  = require('multer');

const app      = express();
const PORT     = process.env.PORT     || 3000;
const DATA_DIR = process.env.DATA_DIR || '/data';

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// ─── SSE ──────────────────────────────────────────────────────────────────────
let sseClients = [];

function broadcast(event, payload = {}) {
    const msg = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
    sseClients = sseClients.filter(res => {
        try { res.write(msg); return true; } catch { return false; }
    });
    console.log(`[SSE] ${event} → ${sseClients.length} clientes`);
}

app.get('/api/events', (req, res) => {
    res.writeHead(200, {
        'Content-Type':  'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':    'keep-alive',
        'X-Accel-Buffering': 'no',   // evita que nginx bufferice SSE
    });
    res.write(':connected\n\n');
    sseClients.push(res);
    console.log(`[SSE] cliente conectado (total: ${sseClients.length})`);
    req.on('close', () => {
        sseClients = sseClients.filter(c => c !== res);
        console.log(`[SSE] cliente desconectado (total: ${sseClients.length})`);
    });
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function readJSON(fp) {
    try { return JSON.parse(await fsp.readFile(fp, 'utf8')); }
    catch { return null; }
}
async function writeJSON(fp, data) {
    await fsp.mkdir(path.dirname(fp), { recursive: true });
    await fsp.writeFile(fp, JSON.stringify(data), 'utf8');
}
function makeFileId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ ok: true, clients: sseClients.length, ts: Date.now() });
});

// ─── Índice de proyectos ──────────────────────────────────────────────────────
app.get('/api/index', async (req, res) => {
    const data = await readJSON(path.join(DATA_DIR, 'index.json'));
    res.json(data || { projects: [], currentProjectId: null });
});

app.put('/api/index', async (req, res) => {
    await writeJSON(path.join(DATA_DIR, 'index.json'), req.body);
    broadcast('index-updated');
    res.json({ ok: true });
});

// ─── Datos de proyecto ────────────────────────────────────────────────────────
app.get('/api/projects/:id', async (req, res) => {
    const data = await readJSON(
        path.join(DATA_DIR, 'proyectos', req.params.id, 'core.json')
    );
    if (!data) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(data);
});

app.put('/api/projects/:id', async (req, res) => {
    await writeJSON(
        path.join(DATA_DIR, 'proyectos', req.params.id, 'core.json'),
        req.body
    );
    broadcast('project-updated', { id: req.params.id });
    res.json({ ok: true });
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        await fsp.rm(path.join(DATA_DIR, 'proyectos', req.params.id), { recursive: true, force: true });
    } catch (e) { console.warn('Delete project dir:', e.message); }
    broadcast('index-updated');
    res.json({ ok: true });
});

// ─── Fotos ────────────────────────────────────────────────────────────────────
const photoUpload = multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            const dir = path.join(DATA_DIR, 'archivos', 'fotos');
            await fsp.mkdir(dir, { recursive: true });
            cb(null, dir);
        },
        filename: (req, file, cb) => cb(null, makeFileId() + '.jpg'),
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});

app.post('/api/photos', photoUpload.single('file'), (req, res) => {
    const url = '/api/photos/' + req.file.filename;
    res.json({ id: req.file.filename, url });
});

app.get('/api/photos/:file', (req, res) => {
    const fp = path.join(DATA_DIR, 'archivos', 'fotos', req.params.file);
    res.sendFile(fp, err => { if (err) res.status(404).end(); });
});

app.delete('/api/photos/:file', async (req, res) => {
    try { await fsp.unlink(path.join(DATA_DIR, 'archivos', 'fotos', req.params.file)); }
    catch { /* ya no existe */ }
    res.json({ ok: true });
});

// ─── Documentos ───────────────────────────────────────────────────────────────
const docUpload = multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            const dir = path.join(DATA_DIR, 'archivos', 'documentos');
            await fsp.mkdir(dir, { recursive: true });
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname) || '.bin';
            cb(null, makeFileId() + ext);
        },
    }),
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
});

app.post('/api/documents', docUpload.single('file'), (req, res) => {
    const url = '/api/documents/' + req.file.filename;
    res.json({ id: req.file.filename, url, originalName: req.file.originalname });
});

app.get('/api/documents/:file', (req, res) => {
    const fp = path.join(DATA_DIR, 'archivos', 'documentos', req.params.file);
    res.sendFile(fp, err => { if (err) res.status(404).end(); });
});

app.delete('/api/documents/:file', async (req, res) => {
    try { await fsp.unlink(path.join(DATA_DIR, 'archivos', 'documentos', req.params.file)); }
    catch { /* ya no existe */ }
    res.json({ ok: true });
});

// ─── Arranque ─────────────────────────────────────────────────────────────────
async function ensureDirs() {
    for (const d of ['proyectos', 'archivos/fotos', 'archivos/documentos']) {
        await fsp.mkdir(path.join(DATA_DIR, d), { recursive: true });
    }
}

ensureDirs().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ API escuchando en :${PORT}`);
        console.log(`   Datos en: ${DATA_DIR}`);
    });
});
