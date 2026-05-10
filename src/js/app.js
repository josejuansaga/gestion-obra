// ================================================================
// CONSTANTS
// ================================================================

const TRADES = {
    albanileria:  { name:'Albañilería',           color:'#8D6E63', icon:'🧱' },
    fontaneria:   { name:'Fontanería',             color:'#1976D2', icon:'🔧' },
    electricidad: { name:'Electricidad',           color:'#F9A825', icon:'⚡' },
    yeseria:      { name:'Yesería / Tabiques',     color:'#78909C', icon:'🪣' },
    alicatado:    { name:'Alicatado / Solado',     color:'#43A047', icon:'▫️' },
    carpinteria:  { name:'Carpintería',            color:'#5D4037', icon:'🪵' },
    pintura:      { name:'Pintura',                color:'#8E24AA', icon:'🖌️' },
    sanitarios:   { name:'Sanitarios / Griferías', color:'#00838F', icon:'🚿' },
};

// ud=unidad, m2=metro cuadrado, ml=metro lineal, m3=metro cúbico, kg, l=litro, h=hora, pa=partida alzada
const UNITS = [
    { v:'ud', l:'ud'  },
    { v:'m2', l:'m²'  },
    { v:'ml', l:'ml'  },
    { v:'m3', l:'m³'  },
    { v:'kg', l:'kg'  },
    { v:'l',  l:'l'   },
    { v:'h',  l:'h'   },
    { v:'pa', l:'pa'  },
];
const UNIT_LABEL = Object.fromEntries(UNITS.map(u => [u.v, u.l]));

const ROOM_TEMPLATES = {
    salon:       { name:'Salón',          icon:'🛋️', trades:{ albanileria:['Demolición y retirada de escombros','Reparación de grietas y paredes','Preparación y saneado de suelo'], electricidad:['Canalización y tendido de cables','Cajas de mecanismos','Enchufes (bases)','Interruptores / Conmutadores','Puntos de luz','Revisión / conexión al cuadro'], yeseria:['Guarnecido de paredes','Enlucido fino de paredes','Falso techo (si aplica)','Remates y ángulos'], alicatado:['Nivelación y preparación de suelo','Colocación de suelo','Rodapié','Rejuntado'], carpinteria:['Marco de puerta','Puerta interior','Rodapié de madera (si aplica)'], pintura:['Masillado y lijado previo','Imprimación','Primera mano','Segunda mano / Acabado final'] }},
    cocina:      { name:'Cocina',         icon:'🍳', trades:{ albanileria:['Demolición y retirada','Reparación de paredes','Preparación de suelo'], fontaneria:['Toma de agua fría fregadero','Toma de agua caliente fregadero','Desagüe fregadero','Preinstalación lavavajillas','Preinstalación lavadora (si aplica)'], electricidad:['Circuito independiente cocina','Enchufes zona encimera / muebles','Puntos de luz','Extractor / Campana','Horno y vitrocerámica'], alicatado:['Colocación suelo','Rodapié','Alicatado pared / salpicadero','Rejuntado'], carpinteria:['Muebles bajos','Muebles altos','Encimera','Zócalos y ajustes finales'], pintura:['Masillado y lijado (zonas sin alicatar)','Imprimación','Acabado final'] }},
    dormitorio:  { name:'Dormitorio',     icon:'🛏️', trades:{ albanileria:['Demolición y retirada de escombros','Reparación de grietas y paredes'], electricidad:['Canalización y tendido','Enchufes','Interruptores / Conmutadores','Puntos de luz'], yeseria:['Guarnecido de paredes','Enlucido fino','Remates y ángulos'], alicatado:['Nivelación y preparación de suelo','Colocación de suelo','Rodapié','Rejuntado'], carpinteria:['Marco de puerta','Puerta interior','Armario empotrado (si aplica)','Rodapié de madera'], pintura:['Masillado y lijado','Imprimación','Primera mano','Segunda mano / Acabado final'] }},
    bano:        { name:'Baño',           icon:'🚿', trades:{ albanileria:['Demolición completa','Tabiques (si aplica)','Impermeabilización suelo y paredes','Preparación para alicatado'], fontaneria:['Toma fría ducha / bañera','Toma caliente ducha / bañera','Toma fría lavabo','Toma caliente lavabo','Desagüe ducha / bañera','Desagüe lavabo','Conexión inodoro / cisterna'], electricidad:['Puntos de luz','Ventilación mecánica','Enchufe con protección diferencial'], alicatado:['Colocación suelo','Alicatado paredes','Rejuntado','Sellado con silicona en encuentros'], sanitarios:['Inodoro + cisterna','Lavabo','Ducha + plato / Bañera','Grifería ducha','Grifería lavabo','Accesorios (toallero, jabonera, espejo)'], carpinteria:['Marco de puerta','Puerta (ciega / ventilada)','Mueble de lavabo','Espejo / Botiquín'] }},
    aseo:        { name:'Aseo',           icon:'🚽', trades:{ albanileria:['Demolición','Tabiques (si aplica)','Impermeabilización','Preparación para alicatado'], fontaneria:['Toma fría lavabo','Toma caliente lavabo','Desagüe lavabo','Conexión inodoro / cisterna'], electricidad:['Puntos de luz','Ventilación mecánica','Enchufe (si aplica)'], alicatado:['Colocación suelo','Alicatado paredes','Rejuntado','Sellado silicona'], sanitarios:['Inodoro + cisterna','Lavabo','Grifería lavabo','Accesorios (toallero, jabonera, espejo)'], carpinteria:['Marco de puerta','Puerta','Mueble lavabo (si aplica)'] }},
    pasillo:     { name:'Pasillo',        icon:'🚪', trades:{ albanileria:['Demolición y retirada','Reparación de paredes'], electricidad:['Canalización y tendido','Puntos de luz','Interruptores / Conmutadores'], yeseria:['Guarnecido de paredes','Enlucido fino','Remates y ángulos'], alicatado:['Nivelación y preparación de suelo','Colocación de suelo','Rodapié','Rejuntado'], carpinteria:['Marcos de puertas','Puertas interiores','Rodapié'], pintura:['Masillado y lijado','Imprimación','Primera mano','Segunda mano / Acabado'] }},
    salon_cocina:{ name:'Salón-Cocina',   icon:'🏠', trades:{ albanileria:['Demolición y retirada','Eliminación de tabique (si aplica)','Reparación de paredes','Preparación suelo'], fontaneria:['Toma fría fregadero','Toma caliente fregadero','Desagüe fregadero','Preinstalación lavavajillas'], electricidad:['Canalización y tendido','Circuito independiente cocina','Enchufes zona cocina','Enchufes zona salón','Interruptores / Conmutadores','Puntos de luz','Extractor / Campana'], yeseria:['Guarnecido de paredes','Enlucido fino','Falso techo (si aplica)','Remates'], alicatado:['Nivelación y preparación de suelo','Colocación suelo zona cocina','Colocación suelo zona salón','Alicatado salpicadero cocina','Rodapié','Rejuntado'], carpinteria:['Marcos de puertas','Muebles cocina bajos','Muebles cocina altos','Encimera','Rodapié madera zona salón'], pintura:['Masillado y lijado','Imprimación','Primera mano','Acabado final'] }},
    general:     { name:'General / Común',icon:'🏗️', trades:{ albanileria:['Demolición general / Vaciado','Refuerzo de estructura (si aplica)','Reparaciones generales','Saneado de humedades','Limpieza de obra final'], fontaneria:['Llave de paso general','Instalación calentador / caldera','Distribución principal','Bajantes y saneamiento'], electricidad:['Cuadro eléctrico general','Toma de tierra','Acometida eléctrica','Distribución principal por vivienda'], carpinteria:['Puerta de entrada','Ventanas (si aplica)','Persianas / Cierres exteriores'], pintura:['Zonas comunes / Escaleras','Fachada interior (si aplica)'] }},
};

// ================================================================
// STATE
// Task: { id, text, done, notes, qty, unit, price }
// ================================================================

const PROJECT_COLORS = ['#e67e22','#1976D2','#27ae60','#8E24AA','#c0392b','#2c3e50','#00838F','#F57C00','#546E7A'];

const state = {
    view: 'dashboard',
    portalView: 'control',
    currentRoom: null,
    currentTrade: null,
    // ── Project index ──
    projects: [],          // [{ id, name, address, description, color, createdAt }]
    currentProjectId: null,
    // ── Active project data ──
    rooms: [],
    collapsed: {},
    tradeInfo: {},
    companies: [],
    suppliers: [],
    projectNotes: [],
    projectCalendar: [],
    sectionPhotos: {},
    projectGalleries: {},
    documents: { arquitecto:[], planos:[], permisos:[], presupuesto:[] },
    projectBudget: {},
    projectFinishes: [],
    projectFurniture: [],
    currentUser: null,
    settings: {},
};

function uid()  { return 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function pctColor(p) { return p === 100 ? '#27ae60' : '#e67e22'; }
function slugify(s) {
    return String(s || '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        || 'proyecto';
}
function emptyDocuments() { return { arquitecto:[], planos:[], permisos:[], presupuesto:[] }; }
function emptyProjectBudget() {
    return {
        clientBudget: '',
        repercutedBudget: '',
        targetMargin: '',
        approvedDate: '',
        notes: '',
    };
}
function emptyCalendar() { return []; }
function emptyProjectGalleries() {
    return { during: [], final: [], recreation3d: [] };
}
function defaultFinishSpecs() {
    return [
        { key:'wallColor', label:'Color de paredes', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'floorType', label:'Tipo de suelo', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'kitchenType', label:'Cocina', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'countertop', label:'Encimera', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'kitchenTiles', label:'Azulejos cocina', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'bathroomTiles', label:'Azulejos ba?o', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'bathroomFurniture', label:'Mueble de ba?o', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'faucets', label:'Grifer?a', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'screen', label:'Mampara', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'showerTray', label:'Plato de ducha', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
        { key:'showerFaucet', label:'Grifo de ducha', selection:'', status:'pendiente', providerUrl:'', photoUrl:'', techUrl:'', renderUrl:'', notes:'' },
    ];
}
function normalizeFinishSpecs(items) {
    const incoming = Array.isArray(items) ? items : [];
    const map = new Map(incoming.map(item => [item.key, item]));
    return defaultFinishSpecs().map(base => ({ ...base, ...(map.get(base.key) || {}) }));
}
function emptyProjectData() {
    return {
        rooms: [],
        tradeInfo: {},
        projectNotes: [],
        projectCalendar: emptyCalendar(),
        sectionPhotos: {},
        projectGalleries: emptyProjectGalleries(),
        documents: emptyDocuments(),
        projectBudget: emptyProjectBudget(),
        projectFinishes: defaultFinishSpecs(),
        projectFurniture: [],
    };
}
function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
    catch(e) { return fallback; }
}
function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function buildProjectStorageId(project) {
    const safeId = String(project.id || uid()).replace(/[^a-z0-9]/gi, '').toLowerCase().slice(-8) || 'obra';
    return `${slugify(project.name)}-${safeId}`;
}
function normalizeProject(project) {
    const storageId = project.storageId || buildProjectStorageId(project);
    return {
        ...project,
        storageVersion: 2,
        storageId,
        folder: project.folder || `data/proyectos/${storageId}/`,
    };
}
function projectKeys(projectId) {
    const project = state.projects.find(p => p.id === projectId);
    const storageId = project?.storageId || String(projectId || 'default');
    return {
        core:   `obra_project_${storageId}_core_v2`,
        docs:   `obra_project_${storageId}_docs_v2`,
        photos: `obra_project_${storageId}_photos_v2`,
    };
}
const COMPANIES_KEY = 'obra_companies_v1';
const SUPPLIERS_KEY = 'obra_suppliers_v1';
const USERS_KEY = 'obra_users_v1';
const SESSION_KEY = 'obra_session_v1';
const SETTINGS_KEY = 'obra_settings_v1';
const DEFAULT_ADMIN_HASH = 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270';
function normalizeCompany(company) {
    return {
        id: company?.id || uid(),
        name: company?.name || '',
        trades: Array.isArray(company?.trades) ? company.trades : [],
        phone: company?.phone || '',
        cif: company?.cif || '',
        email: company?.email || '',
        address: company?.address || '',
        notes: company?.notes || '',
        people: Array.isArray(company?.people) ? company.people.map(person => ({
            id: person?.id || uid(),
            area: person?.area || 'gerencia',
            name: person?.name || '',
            role: person?.role || '',
            phone: person?.phone || '',
            whatsapp: person?.whatsapp || '',
            email: person?.email || '',
        })) : [],
        history: Array.isArray(company?.history) ? company.history.map(entry => ({
            id: entry?.id || uid(),
            date: entry?.date || new Date().toISOString(),
            project: entry?.project || '',
            status: entry?.status || 'pendiente',
            text: entry?.text || '',
        })) : [],
    };
}
function normalizeSupplier(supplier) {
    return {
        id: supplier?.id || uid(),
        name: supplier?.name || '',
        categories: Array.isArray(supplier?.categories) ? supplier.categories : [],
        phone: supplier?.phone || '',
        cif: supplier?.cif || '',
        email: supplier?.email || '',
        address: supplier?.address || '',
        notes: supplier?.notes || '',
        people: Array.isArray(supplier?.people) ? supplier.people.map(person => ({
            id: person?.id || uid(),
            area: person?.area || 'gerencia',
            name: person?.name || '',
            role: person?.role || '',
            phone: person?.phone || '',
            whatsapp: person?.whatsapp || '',
            email: person?.email || '',
        })) : [],
        history: Array.isArray(supplier?.history) ? supplier.history.map(entry => ({
            id: entry?.id || uid(),
            date: entry?.date || new Date().toISOString(),
            project: entry?.project || '',
            status: entry?.status || 'pendiente',
            text: entry?.text || '',
        })) : [],
    };
}
function getGlobalCompanies() {
    return readJSON(COMPANIES_KEY, []).map(normalizeCompany);
}
function saveGlobalCompanies() {
    state.companies = (state.companies || []).map(normalizeCompany);
    writeJSON(COMPANIES_KEY, state.companies);
    saveEmergencyBackup();
    queueFolderPersist('companies');
}
function getGlobalSuppliers() {
    return readJSON(SUPPLIERS_KEY, []).map(normalizeSupplier);
}
function saveGlobalSuppliers() {
    state.suppliers = (state.suppliers || []).map(normalizeSupplier);
    writeJSON(SUPPLIERS_KEY, state.suppliers);
    saveEmergencyBackup();
    queueFolderPersist('suppliers');
}
function getUsers() {
    return readJSON(USERS_KEY, []);
}
function saveUsers(users) {
    writeJSON(USERS_KEY, users);
}
function getSettings() {
    return readJSON(SETTINGS_KEY, {
        appName: 'Gestion de Obra',
        primaryColor: '#e67e22',
    });
}
function saveSettings() {
    writeJSON(SETTINGS_KEY, state.settings || getSettings());
    applyAppSettings();
}
function ensureAdminUser() {
    const users = getUsers();
    if (users.length) return users;
    const adminUser = {
        id: uid(),
        username: 'administrador',
        name: 'Administrador',
        role: 'admin',
        active: true,
        mustChangePassword: true,
        passwordHash: DEFAULT_ADMIN_HASH,
        createdAt: new Date().toISOString(),
    };
    saveUsers([adminUser]);
    return [adminUser];
}
function restoreSessionUser() {
    const session = readJSON(SESSION_KEY, null);
    const users = ensureAdminUser();
    state.currentUser = users.find(user => user.id === session?.userId && user.active !== false) || null;
}
function applyAppSettings() {
    state.settings = getSettings();
    const root = document.documentElement;
    root.style.setProperty('--primary', state.settings.primaryColor || '#e67e22');
    root.style.setProperty('--primary-dark', '#d35400');
    document.title = `${state.settings.appName || 'Gestion de Obra'} - App`;
}
async function sha256(text) {
    const bytes = new TextEncoder().encode(String(text || ''));
    const buffer = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
    state.currentUser = null;
    state.currentProjectId = null;
    state.portalView = 'control';
    state.view = 'projects';
    renderAll();
}
async function loginUser() {
    const username = document.getElementById('loginUser')?.value.trim().toLowerCase();
    const password = document.getElementById('loginPass')?.value || '';
    const errorEl = document.getElementById('loginError');
    if (errorEl) errorEl.style.display = 'none';
    const user = getUsers().find(item => item.username.toLowerCase() === username && item.active !== false);
    if (!user) {
        if (errorEl) { errorEl.textContent = 'Usuario o contrasena incorrectos.'; errorEl.style.display = 'block'; }
        return;
    }
    const passwordHash = await sha256(password);
    if (passwordHash !== user.passwordHash) {
        if (errorEl) { errorEl.textContent = 'Usuario o contrasena incorrectos.'; errorEl.style.display = 'block'; }
        return;
    }
    state.currentUser = user;
    writeJSON(SESSION_KEY, { userId: user.id });
    state.portalView = 'control';
    state.view = user.mustChangePassword ? 'admin' : 'projects';
    renderAll();
}
function initAccess() {
    ensureAdminUser();
    state.settings = getSettings();
    applyAppSettings();
    restoreSessionUser();
}
function renderLoginLayout() {
    return `
        <div class="login-page">
            <div class="login-card">
                <div class="login-brand">${esc(state.settings.appName || 'Gestion de Obra')}</div>
                <div class="login-sub">Acceso privado al gestor. El usuario inicial es <strong>administrador</strong>.</div>
                <div id="loginError" class="login-error" style="display:none"></div>
                <div class="modal-field">
                    <label class="modal-label" for="loginUser">Usuario</label>
                    <input class="modal-input" id="loginUser" type="text" value="administrador" onkeydown="if(event.key==='Enter') loginUser()">
                </div>
                <div class="modal-field">
                    <label class="modal-label" for="loginPass">Contrasena</label>
                    <input class="modal-input" id="loginPass" type="password" placeholder="Introduce tu contrasena" onkeydown="if(event.key==='Enter') loginUser()">
                </div>
                <div class="login-actions">
                    <button class="btn btn-primary" onclick="loginUser()">Entrar</button>
                </div>
                <div class="login-foot">Clave inicial: <strong>admin1234</strong>. Cambiala desde Administracion en cuanto entres.</div>
            </div>
        </div>`;
}
const fsState = {
    supported: typeof window.showDirectoryPicker === 'function' && typeof indexedDB !== 'undefined',
    handle: null,
    status: 'Navegador',
    saving: false,
    lastSavedAt: '',
    error: '',
    booted: false,
};
var _persistTimer = null;
var _persistPromise = Promise.resolve();
const BACKUP_KEY = 'obra_backup_latest_v1';
const BACKUP_FILE_VERSION = 1;
function storageStatusText() {
    if (!fsState.supported) return 'Datos en navegador';
    if (!fsState.handle) return 'Datos en navegador';
    if (fsState.saving) return 'Guardando en carpeta...';
    if (fsState.lastSavedAt) return `Carpeta conectada · ${fsState.lastSavedAt}`;
    return 'Carpeta conectada';
}
function refreshStorageStatusUI() {
    const text = storageStatusText();
    document.querySelectorAll('[data-storage-status]').forEach(el => { el.textContent = text; });
    document.querySelectorAll('[data-storage-connect]').forEach(el => {
        el.textContent = fsState.handle ? 'Carpeta conectada' : 'Conectar carpeta';
    });
}
function formatTimeNow() {
    return new Date().toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' });
}
function openIdb() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open('gestion-obra', 1);
        req.onupgradeneeded = () => req.result.createObjectStore('kv');
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
async function idbGet(key) {
    const db = await openIdb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('kv', 'readonly');
        const req = tx.objectStore('kv').get(key);
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => reject(req.error);
    });
}
async function idbSet(key, value) {
    const db = await openIdb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('kv', 'readwrite');
        tx.objectStore('kv').put(value, key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}
async function idbDelete(key) {
    const db = await openIdb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('kv', 'readwrite');
        tx.objectStore('kv').delete(key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}
async function ensurePermission(handle, write = false) {
    if (!handle) return false;
    const opts = write ? { mode:'readwrite' } : {};
    if ((await handle.queryPermission(opts)) === 'granted') return true;
    return (await handle.requestPermission(opts)) === 'granted';
}
async function ensureChildDir(parent, name) {
    return parent.getDirectoryHandle(name, { create:true });
}
async function writeFileJson(dirHandle, fileName, data) {
    const fileHandle = await dirHandle.getFileHandle(fileName, { create:true });
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
}
async function readFileJson(dirHandle, fileName, fallback = null) {
    try {
        const fileHandle = await dirHandle.getFileHandle(fileName);
        const file = await fileHandle.getFile();
        return JSON.parse(await file.text());
    } catch (err) {
        return fallback;
    }
}
async function folderHasProjectData(handle) {
    const index = await readFileJson(handle, 'index.json', null);
    return !!(index && Array.isArray(index.projects));
}
async function writeFolderPayload(payload) {
    if (!fsState.handle) return false;
    if (!await ensurePermission(fsState.handle, true)) throw new Error('Sin permiso de escritura en la carpeta.');
    const proyectosDir = await ensureChildDir(fsState.handle, 'proyectos');
    const expectedDirs = new Set((payload.index.projects || []).map(project => project.storageId || buildProjectStorageId(project)));
    await writeFileJson(fsState.handle, 'index.json', payload.index);
    for (const project of payload.index.projects || []) {
        const entry = (payload.projectData || []).find(item => item.projectId === project.id) || {};
        const projectDir = await ensureChildDir(proyectosDir, project.storageId || buildProjectStorageId(project));
        await writeFileJson(projectDir, 'core.json', entry.core || emptyProjectData());
        await writeFileJson(projectDir, 'docs.json', entry.docs || { entries: emptyDocuments(), blobs: {} });
        await writeFileJson(projectDir, 'photos.json', entry.photos || { blobs: {} });
    }
    if (typeof proyectosDir.values === 'function' && typeof proyectosDir.removeEntry === 'function') {
        for await (const entry of proyectosDir.values()) {
            if (entry.kind === 'directory' && !expectedDirs.has(entry.name)) {
                await proyectosDir.removeEntry(entry.name, { recursive:true }).catch(() => null);
            }
        }
    }
    return true;
}
async function readFolderPayload() {
    if (!fsState.handle) return null;
    if (!await ensurePermission(fsState.handle, false)) throw new Error('Sin permiso para leer la carpeta.');
    const index = await readFileJson(fsState.handle, 'index.json', null);
    if (!index?.projects || !Array.isArray(index.projects)) return null;
    const projects = index.projects.map(normalizeProject);
    const proyectosDir = await fsState.handle.getDirectoryHandle('proyectos', { create:false }).catch(() => null);
    const projectData = [];
    for (const project of projects) {
        const projectDir = proyectosDir
            ? await proyectosDir.getDirectoryHandle(project.storageId || buildProjectStorageId(project), { create:false }).catch(() => null)
            : null;
        projectData.push({
            projectId: project.id,
            core: projectDir ? await readFileJson(projectDir, 'core.json', emptyProjectData()) : emptyProjectData(),
            docs: projectDir ? await readFileJson(projectDir, 'docs.json', { entries: emptyDocuments(), blobs: {} }) : { entries: emptyDocuments(), blobs: {} },
            photos: projectDir ? await readFileJson(projectDir, 'photos.json', { blobs: {} }) : { blobs: {} },
        });
    }
    return {
        version: BACKUP_FILE_VERSION,
        exportedAt: new Date().toISOString(),
        index: {
            projects,
            currentProjectId: index.currentProjectId || null,
            companies: Array.isArray(index.companies) ? index.companies : [],
            suppliers: Array.isArray(index.suppliers) ? index.suppliers : [],
        },
        projectData,
    };
}
function queueFolderPersist(reason = 'save') {
    if (!fsState.handle) return;
    clearTimeout(_persistTimer);
    _persistTimer = setTimeout(() => { persistToFolder(reason); }, 450);
}
function persistToFolder(reason = 'save') {
    if (!fsState.handle) return Promise.resolve(false);
    _persistPromise = _persistPromise.then(async () => {
        fsState.saving = true;
        fsState.error = '';
        refreshStorageStatusUI();
        try {
            await writeFolderPayload(buildBackupPayload(true));
            fsState.lastSavedAt = `guardado ${formatTimeNow()}`;
            return true;
        } catch (err) {
            fsState.error = err?.message || String(err);
            console.error(err);
            return false;
        } finally {
            fsState.saving = false;
            refreshStorageStatusUI();
        }
    });
    return _persistPromise;
}
async function loadFromConnectedFolder(silent = false) {
    if (!fsState.handle) return false;
    try {
        const payload = await readFolderPayload();
        if (!payload) {
            if (!silent) alert('La carpeta aun no tiene datos del gestor.');
            return false;
        }
        applyBackupPayload(payload);
        saveEmergencyBackup();
        initState();
        renderAll();
        fsState.lastSavedAt = `cargado ${formatTimeNow()}`;
        refreshStorageStatusUI();
        return true;
    } catch (err) {
        fsState.error = err?.message || String(err);
        refreshStorageStatusUI();
        if (!silent) alert('No se han podido leer los datos de la carpeta.');
        return false;
    }
}
async function connectDataFolder() {
    if (!fsState.supported) {
        alert('Este navegador no permite guardar en carpeta real. Usa Chrome o Edge.');
        return;
    }
    try {
        const handle = await window.showDirectoryPicker({ mode:'readwrite' });
        if (!await ensurePermission(handle, true)) {
            alert('Necesito permiso para leer y escribir en esa carpeta.');
            return;
        }
        fsState.handle = handle;
        await idbSet('dataFolderHandle', handle);
        const hasFolderData = await folderHasProjectData(handle);
        if (hasFolderData) {
            const loadFolder = !state.projects.length || confirm('La carpeta ya tiene datos. Aceptar = cargar lo de la carpeta. Cancelar = conservar lo actual y sobrescribir la carpeta.');
            if (loadFolder) {
                await loadFromConnectedFolder(true);
            } else {
                await persistToFolder('connect');
            }
        } else {
            await persistToFolder('connect');
        }
        refreshStorageStatusUI();
    } catch (err) {
        if (err?.name === 'AbortError') return;
        fsState.error = err?.message || String(err);
        refreshStorageStatusUI();
        alert('No se ha podido conectar la carpeta.');
    }
}
async function disconnectDataFolder() {
    fsState.handle = null;
    fsState.lastSavedAt = '';
    fsState.error = '';
    await idbDelete('dataFolderHandle').catch(() => null);
    refreshStorageStatusUI();
}
async function bootFolderPersistence() {
    if (fsState.booted || !fsState.supported) {
        refreshStorageStatusUI();
        return;
    }
    fsState.booted = true;
    try {
        const handle = await idbGet('dataFolderHandle');
        if (!handle) { refreshStorageStatusUI(); return; }
        if (!await ensurePermission(handle, false)) { refreshStorageStatusUI(); return; }
        fsState.handle = handle;
        await loadFromConnectedFolder(true);
    } catch (err) {
        console.error(err);
    } finally {
        refreshStorageStatusUI();
    }
}
function buildBackupPayload(includeBlobs = true) {
    const projects = (state.projects || []).map(normalizeProject);
    return {
        version: BACKUP_FILE_VERSION,
        exportedAt: new Date().toISOString(),
        includesBlobs: includeBlobs,
        index: {
            projects,
            currentProjectId: state.currentProjectId,
            companies: state.companies || [],
            suppliers: state.suppliers || [],
        },
        companies: state.companies || [],
        suppliers: state.suppliers || [],
        projectData: projects.map(project => {
            const keys = projectKeys(project.id);
            const docsStore = readJSON(keys.docs, { entries: emptyDocuments(), blobs: {} });
            const photosStore = readJSON(keys.photos, { blobs: {} });
            return {
                projectId: project.id,
                core: readJSON(keys.core, {
                    rooms: [],
                    tradeInfo: {},
                    projectNotes: [],
                    projectCalendar: [],
                    sectionPhotos: {},
                    projectGalleries: emptyProjectGalleries(),
                    projectBudget: emptyProjectBudget(),
                    projectFinishes: defaultFinishSpecs(),
                    projectFurniture: [],
                }),
                docs: {
                    entries: docsStore.entries || emptyDocuments(),
                    blobs: includeBlobs ? (docsStore.blobs || {}) : {},
                },
                photos: {
                    blobs: includeBlobs ? (photosStore.blobs || {}) : {},
                },
            };
        }),
    };
}
function applyBackupPayload(payload) {
    if (!payload?.index?.projects || !Array.isArray(payload.index.projects)) {
        throw new Error('La copia no tiene un formato valido.');
    }
    const projects = payload.index.projects.map(normalizeProject);
    state.projects = projects;
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('obra_project_')) localStorage.removeItem(key);
    });
    projects.forEach(project => {
        const entry = (payload.projectData || []).find(item => item.projectId === project.id) || {};
        const keys = {
            core: `obra_project_${project.storageId}_core_v2`,
            docs: `obra_project_${project.storageId}_docs_v2`,
            photos: `obra_project_${project.storageId}_photos_v2`,
        };
        writeJSON(keys.core, {
            rooms: entry.core?.rooms || [],
            tradeInfo: entry.core?.tradeInfo || {},
            projectNotes: entry.core?.projectNotes || [],
            projectCalendar: entry.core?.projectCalendar || [],
            sectionPhotos: entry.core?.sectionPhotos || {},
            projectGalleries: entry.core?.projectGalleries || emptyProjectGalleries(),
            projectBudget: entry.core?.projectBudget || emptyProjectBudget(),
            projectFinishes: entry.core?.projectFinishes || defaultFinishSpecs(),
            projectFurniture: entry.core?.projectFurniture || [],
        });
        writeJSON(keys.docs, {
            entries: entry.docs?.entries || emptyDocuments(),
            blobs: entry.docs?.blobs || {},
        });
        writeJSON(keys.photos, {
            blobs: entry.photos?.blobs || {},
        });
    });
    writeJSON('obra_index_v2', {
        projects,
        currentProjectId: payload.index.currentProjectId || null,
    });
    writeJSON(COMPANIES_KEY, Array.isArray(payload.companies)
        ? payload.companies
        : Array.isArray(payload.index?.companies)
            ? payload.index.companies
            : []);
    writeJSON(SUPPLIERS_KEY, Array.isArray(payload.suppliers)
        ? payload.suppliers
        : Array.isArray(payload.index?.suppliers)
            ? payload.index.suppliers
            : []);
}
function saveEmergencyBackup() {
    try {
        writeJSON(BACKUP_KEY, buildBackupPayload(true));
        return true;
    } catch (err) {
        try {
            const lightPayload = buildBackupPayload(false);
            lightPayload.includesBlobs = false;
            lightPayload.partial = true;
            writeJSON(BACKUP_KEY, lightPayload);
            return true;
        } catch (fallbackErr) {
            return false;
        }
    }
}
function restoreEmergencyBackup() {
    const payload = readJSON(BACKUP_KEY, null);
    if (!payload) {
        alert('No hay copia de seguridad local todavia.');
        return;
    }
    try {
        applyBackupPayload(payload);
        initState();
        renderAll();
        alert(payload.partial
            ? 'Copia local restaurada. La estructura de proyectos ha vuelto, pero puede faltar contenido pesado.'
            : 'Copia local restaurada correctamente.');
    } catch (err) {
        alert('No se ha podido restaurar la copia local.');
    }
}
function exportBackupFile() {
    try {
        const payload = buildBackupPayload(true);
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gestor-obra-copia-${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 500);
    } catch (err) {
        alert('No se ha podido exportar la copia.');
    }
}
function openBackupImport() {
    document.getElementById('backupImportInput')?.click();
}
function importBackupFile(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        try {
            const payload = JSON.parse(ev.target.result);
            applyBackupPayload(payload);
            saveEmergencyBackup();
            initState();
            renderAll();
            alert('Copia importada correctamente.');
        } catch (err) {
            alert('El archivo no es una copia valida.');
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsText(file);
}
function collectProjectDocIds(data) {
    return Object.values(data.documents || {})
        .flat()
        .map(entry => entry?.docId)
        .filter(Boolean);
}
function collectProjectPhotoIds(data) {
    const photoIds = [];
    Object.values(data.sectionPhotos || {}).forEach(entries =>
        (entries || []).forEach(entry => { if (entry?.photoId) photoIds.push(entry.photoId); }));
    (data.rooms || []).forEach(room =>
        Object.values(room.trades || {}).forEach(tasks =>
            (tasks || []).forEach(task => { if (task?.certPhotoId) photoIds.push(task.certPhotoId); })));
    return photoIds;
}
function getActiveProjectKeys() { return projectKeys(state.currentProjectId); }
function getProjectData(projectId) {
    const keys = projectKeys(projectId);
    const core = readJSON(keys.core, null);
    const docsStore = readJSON(keys.docs, { entries: emptyDocuments(), blobs: {} });
    return {
        rooms: Array.isArray(core?.rooms) ? core.rooms : [],
        tradeInfo: core?.tradeInfo || {},
        projectNotes: Array.isArray(core?.projectNotes) ? core.projectNotes : [],
        projectCalendar: Array.isArray(core?.projectCalendar) ? core.projectCalendar : emptyCalendar(),
        sectionPhotos: core?.sectionPhotos || {},
        projectGalleries: core?.projectGalleries || emptyProjectGalleries(),
        documents: docsStore?.entries || emptyDocuments(),
        projectBudget: core?.projectBudget || emptyProjectBudget(),
        projectFinishes: normalizeFinishSpecs(core?.projectFinishes),
        projectFurniture: Array.isArray(core?.projectFurniture) ? core.projectFurniture : [],
    };
}
function deleteProjectStorage(projectId) {
    const keys = projectKeys(projectId);
    localStorage.removeItem(keys.core);
    localStorage.removeItem(keys.docs);
    localStorage.removeItem(keys.photos);
}
function migrateProjectStorageIfNeeded(projects) {
    const legacyDocs = readJSON('obra_docs_v1', {});
    const legacyPhotos = readJSON('obra_photos_v1', {});
    projects.forEach(project => {
        const normalized = normalizeProject(project);
        const keys = {
            core:   `obra_project_${normalized.storageId}_core_v2`,
            docs:   `obra_project_${normalized.storageId}_docs_v2`,
            photos: `obra_project_${normalized.storageId}_photos_v2`,
        };
        if (localStorage.getItem(keys.core)) return;
        const legacyData = readJSON('obra_proj_' + normalized.id, null);
        if (!legacyData) return;
        const coreData = {
            rooms: legacyData.rooms || [],
            tradeInfo: legacyData.tradeInfo || {},
            companies: legacyData.companies || [],
            projectNotes: legacyData.projectNotes || [],
            projectCalendar: legacyData.projectCalendar || [],
            sectionPhotos: legacyData.sectionPhotos || {},
            projectGalleries: legacyData.projectGalleries || emptyProjectGalleries(),
            projectBudget: legacyData.projectBudget || emptyProjectBudget(),
            projectFinishes: normalizeFinishSpecs(legacyData.projectFinishes),
            projectFurniture: legacyData.projectFurniture || [],
        };
        const docIds = new Set(collectProjectDocIds(legacyData));
        const photoIds = new Set(collectProjectPhotoIds(legacyData));
        const docBlobs = {};
        const photoBlobs = {};
        docIds.forEach(id => { if (legacyDocs[id]) docBlobs[id] = legacyDocs[id]; });
        photoIds.forEach(id => { if (legacyPhotos[id]) photoBlobs[id] = legacyPhotos[id]; });
        writeJSON(keys.core, coreData);
        writeJSON(keys.docs, { entries: legacyData.documents || emptyDocuments(), blobs: docBlobs });
        writeJSON(keys.photos, { blobs: photoBlobs });
    });
}
function migrateLegacyCompaniesToGlobal(projects) {
    if (state.companies.length) return;
    const seen = new Set();
    const merged = [];
    projects.forEach(project => {
        const keys = projectKeys(project.id);
        const core = readJSON(keys.core, null);
        (core?.companies || []).forEach(company => {
            if (!company?.id || seen.has(company.id)) return;
            seen.add(company.id);
            merged.push(company);
        });
    });
    if (merged.length) {
        state.companies = merged;
        saveGlobalCompanies();
    }
}

function formatEur(n) {
    if (n === null || n === undefined || n === '' || isNaN(n)) return '—';
    return Number(n).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}
function formatShortDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('es-ES', { day:'2-digit', month:'short' });
}
function taskCost(task) {
    const q = parseFloat(task.qty), p = parseFloat(task.price);
    return (!isNaN(q) && !isNaN(p) && q > 0 && p > 0) ? q * p : null;
}
function taskBadgeText(task) {
    const q  = parseFloat(task.qty);
    const ul = UNIT_LABEL[task.unit] || task.unit || '';
    const c  = taskCost(task);
    const parts = [];
    if (!isNaN(q) && q > 0 && ul) parts.push(`${q} ${ul}`);
    if (c !== null) parts.push(formatEur(c));
    return parts.join(' · ');
}

function saveIndex() {
    state.projects = state.projects.map(normalizeProject);
    writeJSON('obra_index_v2', {
        projects: state.projects,
        currentProjectId: state.currentProjectId,
    });
    saveEmergencyBackup();
    queueFolderPersist('index');
}
function saveCurrentProject() {
    if (!state.currentProjectId) return;
    const keys = getActiveProjectKeys();
    writeJSON(keys.core, {
        rooms: state.rooms, tradeInfo: state.tradeInfo,
        projectNotes: state.projectNotes,
        projectCalendar: state.projectCalendar,
        sectionPhotos: state.sectionPhotos,
        projectGalleries: state.projectGalleries,
        projectBudget: state.projectBudget,
        projectFinishes: state.projectFinishes,
        projectFurniture: state.projectFurniture,
    });
    const docsStore = readJSON(keys.docs, { entries: emptyDocuments(), blobs: {} });
    docsStore.entries = state.documents;
    writeJSON(keys.docs, docsStore);
    saveEmergencyBackup();
    queueFolderPersist('project');
}
function saveState() { saveCurrentProject(); }

function loadProject(projectId) {
    saveCurrentProject();
    state.currentProjectId = projectId;
    try {
        const d = getProjectData(projectId);
        state.rooms         = d.rooms;
        state.tradeInfo     = d.tradeInfo;
        state.projectNotes  = d.projectNotes;
        state.projectCalendar = d.projectCalendar;
        state.sectionPhotos = d.sectionPhotos;
        state.projectGalleries = d.projectGalleries || emptyProjectGalleries();
        state.documents     = d.documents;
        state.projectBudget = d.projectBudget || emptyProjectBudget();
        state.projectFinishes = normalizeFinishSpecs(d.projectFinishes);
        state.projectFurniture = d.projectFurniture || [];
    } catch(e) {
        state.rooms=[]; state.tradeInfo={};
        state.projectNotes=[]; state.projectCalendar=[]; state.sectionPhotos={}; state.projectGalleries=emptyProjectGalleries();
        state.documents=emptyDocuments();
        state.projectBudget=emptyProjectBudget();
        state.projectFinishes=defaultFinishSpecs(); state.projectFurniture=[];
    }
    state.collapsed = {};
    state.view = 'dashboard';
    _photoMode = 'before'; _photoRoomId = null;
    saveIndex();
}

function initState() {
    state.companies = getGlobalCompanies();
    state.suppliers = getGlobalSuppliers();
    // Load index
    try {
        const idx = readJSON('obra_index_v2', null) || readJSON('obra_index_v1', {});
        if (Array.isArray(idx.projects) && idx.projects.length) {
            state.projects = idx.projects.map(normalizeProject);
            migrateProjectStorageIfNeeded(state.projects);
            migrateLegacyCompaniesToGlobal(state.projects);
            saveIndex();
            if (idx.currentProjectId && state.projects.find(p => p.id === idx.currentProjectId)) {
                loadProject(idx.currentProjectId);
                return;
            }
            state.view = 'projects';
            state.portalView = 'control';
            return;
        }
    } catch(e) {}
    // Migration: old obra_v3 single-project data
    try {
        const old = readJSON('obra_v3', {});
        if (Array.isArray(old.rooms) && old.rooms.length) {
            const projId = uid();
            state.projects = [normalizeProject({ id:projId, name:'Mi Obra', address:'', description:'', color:'#e67e22', createdAt:new Date().toISOString() })];
            const keys = projectKeys(projId);
            writeJSON(keys.core, {
                rooms: old.rooms, tradeInfo: old.tradeInfo || {},
                projectNotes: old.projectNotes || [],
                projectCalendar: old.projectCalendar || [],
                sectionPhotos: old.sectionPhotos || {},
            });
            if (!state.companies.length && Array.isArray(old.companies) && old.companies.length) {
                state.companies = old.companies;
                saveGlobalCompanies();
            }
            writeJSON(keys.docs, { entries: old.documents || emptyDocuments(), blobs: {} });
            writeJSON(keys.photos, { blobs: {} });
            saveIndex();
            loadProject(projId);
            return;
        }
    } catch(e) {}
    // Fresh start
    if (!state.projects.length) {
        applyBackupPayload(createDemoProjects());
        state.companies = getGlobalCompanies();
        state.suppliers = getGlobalSuppliers();
        const idx = readJSON('obra_index_v2', null);
        state.projects = Array.isArray(idx?.projects) ? idx.projects.map(normalizeProject) : [];
        if (idx?.currentProjectId && state.projects.find(p => p.id === idx.currentProjectId)) {
            loadProject(idx.currentProjectId);
            return;
        }
    }
    state.view = 'projects';
    state.portalView = 'control';
}

// ================================================================
// DOCUMENT STORAGE
// ================================================================

const DOC_CATEGORIES = {
    arquitecto: { label:'Proyecto Arquitecto',     icon:'ARQ', desc:'Proyecto basico, de ejecucion, memoria descriptiva...' },
    planos:     { label:'Planos',                  icon:'PLN', desc:'Plantas, alzados, secciones y detalles constructivos...' },
    permisos:   { label:'Ayuntamiento y Permisos', icon:'LIC', desc:'Licencias de obra, cedulas y permisos municipales...' },
    presupuesto:{ label:'Presupuesto de obra',     icon:'EUR', desc:'Oferta al cliente, revisiones y control economico.' },
};

function _getDocStore() {
    const keys = getActiveProjectKeys();
    return readJSON(keys.docs, { entries: emptyDocuments(), blobs: {} });
}
function storeDoc(docId, base64) {
    const store = _getDocStore();
    store.blobs[docId] = base64;
    try { writeJSON(getActiveProjectKeys().docs, store); return true; }
    catch(e) { alert('Sin espacio para guardar el documento. Prueba con un archivo más pequeño.'); return false; }
}
function removeDoc(docId) {
    const store = _getDocStore();
    delete store.blobs[docId];
    writeJSON(getActiveProjectKeys().docs, store);
}
function getDoc(docId) { return _getDocStore().blobs[docId] || null; }

function dataURLToBlob(dataURL) {
    const arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]); let n = bstr.length;
    const u8 = new Uint8Array(n);
    while (n--) u8[n] = bstr.charCodeAt(n);
    return new Blob([u8], { type: mime });
}
function saveDocumentFile(catKey, file) {
    const reader = new FileReader();
    reader.onload = ev => {
        const docId = uid();
        if (!storeDoc(docId, ev.target.result)) return;
        if (!state.documents[catKey]) state.documents[catKey] = [];
        state.documents[catKey].push({
            id: uid(), docId, notes: '',
            name: file.name.replace(/\.[^.]+$/, ''),
            fileType: file.type,
            date: new Date().toISOString(),
        });
        saveState();
        renderAll();
    };
    reader.readAsDataURL(file);
}
function processDocumentFiles(catKey, fileList) {
    const files = Array.from(fileList || []).filter(Boolean);
    if (!files.length) return;
    let pending = files.length;
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = ev => {
            const docId = uid();
            if (storeDoc(docId, ev.target.result)) {
                if (!state.documents[catKey]) state.documents[catKey] = [];
                state.documents[catKey].push({
                    id: uid(), docId, notes: '',
                    name: file.name.replace(/\.[^.]+$/, ''),
                    fileType: file.type,
                    date: new Date().toISOString(),
                });
            }
            pending--;
            if (pending === 0) { saveState(); renderAll(); }
        };
        reader.readAsDataURL(file);
    });
}
function uploadDocument(catKey) {
    const input = document.createElement('input');
    input.multiple = true;
    input.type = 'file'; input.accept = 'image/*,application/pdf,.doc,.docx,.xls,.xlsx';
    input.onchange = e => {
        processDocumentFiles(catKey, e.target.files);
    };
    input.click();
}
function handleDocDragOver(event, catKey) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    document.getElementById(`docdrop_${catKey}`)?.classList.add('drag-over');
}
function handleDocDragLeave(catKey) {
    document.getElementById(`docdrop_${catKey}`)?.classList.remove('drag-over');
}
function handleDocDrop(event, catKey) {
    event.preventDefault();
    handleDocDragLeave(catKey);
    processDocumentFiles(catKey, event.dataTransfer.files);
}
function deleteDocument(catKey, entryId) {
    if (!confirm('¿Eliminar este documento?')) return;
    const arr = state.documents[catKey] || [];
    const entry = arr.find(e => e.id === entryId);
    if (entry) removeDoc(entry.docId);
    state.documents[catKey] = arr.filter(e => e.id !== entryId);
    saveState(); renderAll();
}
function viewDocument(docId) {
    const data = getDoc(docId); if (!data) return;
    const url = URL.createObjectURL(dataURLToBlob(data));
    window.open(url, '_blank');
}
function saveDocField(catKey, entryId, field, value) {
    const entry = (state.documents[catKey] || []).find(e => e.id === entryId);
    if (entry) { entry[field] = value; saveState(); }
}
function processTradeDocumentFiles(tid, fileList) {
    if (!state.tradeInfo[tid]) state.tradeInfo[tid] = getTradeInfo(tid);
    const files = Array.from(fileList || []).filter(Boolean);
    if (!files.length) return;
    let pending = files.length;
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = ev => {
            const docId = uid();
            if (storeDoc(docId, ev.target.result)) {
                if (!Array.isArray(state.tradeInfo[tid].tradeDocuments)) state.tradeInfo[tid].tradeDocuments = [];
                state.tradeInfo[tid].tradeDocuments.push({
                    id: uid(),
                    docId,
                    notes: '',
                    name: file.name.replace(/\.[^.]+$/, ''),
                    fileType: file.type,
                    date: new Date().toISOString(),
                });
            }
            pending--;
            if (pending === 0) { saveState(); renderAll(); }
        };
        reader.readAsDataURL(file);
    });
}
function uploadTradeDocument(tid) {
    const input = document.createElement('input');
    input.multiple = true;
    input.type = 'file';
    input.accept = 'image/*,application/pdf,.doc,.docx,.xls,.xlsx';
    input.onchange = e => processTradeDocumentFiles(tid, e.target.files);
    input.click();
}
function deleteTradeDocument(tid, entryId) {
    if (!confirm('Eliminar este documento del oficio?')) return;
    if (!state.tradeInfo[tid]) state.tradeInfo[tid] = getTradeInfo(tid);
    const arr = state.tradeInfo[tid].tradeDocuments || [];
    const entry = arr.find(item => item.id === entryId);
    if (entry) removeDoc(entry.docId);
    state.tradeInfo[tid].tradeDocuments = arr.filter(item => item.id !== entryId);
    saveState();
    renderAll();
}
function saveTradeDocumentField(tid, entryId, field, value) {
    if (!state.tradeInfo[tid]) state.tradeInfo[tid] = getTradeInfo(tid);
    const entry = (state.tradeInfo[tid].tradeDocuments || []).find(item => item.id === entryId);
    if (entry) { entry[field] = value; saveState(); }
}

// ================================================================
// PHOTO STORAGE  (separate localStorage key to avoid bloating state)
// ================================================================

function _getPhotoStore() {
    const keys = getActiveProjectKeys();
    return readJSON(keys.photos, { blobs: {} });
}
function storePhoto(photoId, dataUrl) {
    const store = _getPhotoStore();
    store.blobs[photoId] = dataUrl;
    try { writeJSON(getActiveProjectKeys().photos, store); return true; }
    catch(e) { alert('Sin espacio para guardar la foto. Prueba con una imagen más pequeña.'); return false; }
}
function removePhoto(photoId) {
    const store = _getPhotoStore();
    delete store.blobs[photoId];
    writeJSON(getActiveProjectKeys().photos, store);
}
function getPhoto(photoId) { return _getPhotoStore().blobs[photoId] || null; }

function resizeAndUpload(callback) {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            const img = new Image();
            img.onload = () => {
                const MAX = 1400;
                let w = img.width, h = img.height;
                if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
                const canvas = document.createElement('canvas');
                canvas.width = w; canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                callback(canvas.toDataURL('image/jpeg', 0.78));
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

function openLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }

// ================================================================
// SECTION PHOTO ACTIONS
// ================================================================

var _photoMode   = 'before'; // 'before' | 'certs'
var _photoRoomId = null;

function addSectionPhoto(roomId) {
    resizeAndUpload(dataUrl => {
        const photoId = uid();
        if (!storePhoto(photoId, dataUrl)) return;
        if (!state.sectionPhotos[roomId]) state.sectionPhotos[roomId] = [];
        state.sectionPhotos[roomId].push({ id: uid(), photoId, caption: '', date: new Date().toISOString() });
        saveState(); renderAll();
    });
}
function deleteSectionPhoto(roomId, entryId) {
    const arr = state.sectionPhotos[roomId] || [];
    const entry = arr.find(e => e.id === entryId);
    if (entry) removePhoto(entry.photoId);
    state.sectionPhotos[roomId] = arr.filter(e => e.id !== entryId);
    saveState(); renderAll();
}
function saveSectionCaption(roomId, entryId, caption) {
    const entry = (state.sectionPhotos[roomId] || []).find(e => e.id === entryId);
    if (entry) { entry.caption = caption; saveState(); }
}

function ensureGallery(kind) {
    if (!state.projectGalleries) state.projectGalleries = emptyProjectGalleries();
    if (!Array.isArray(state.projectGalleries[kind])) state.projectGalleries[kind] = [];
    return state.projectGalleries[kind];
}
function addProjectGalleryPhoto(kind) {
    resizeAndUpload(dataUrl => {
        const photoId = uid();
        if (!storePhoto(photoId, dataUrl)) return;
        ensureGallery(kind).push({ id: uid(), photoId, caption: '', date: new Date().toISOString() });
        saveState(); renderAll();
    });
}
function deleteProjectGalleryPhoto(kind, entryId) {
    const gallery = ensureGallery(kind);
    const entry = gallery.find(item => item.id === entryId);
    if (entry) removePhoto(entry.photoId);
    state.projectGalleries[kind] = gallery.filter(item => item.id !== entryId);
    saveState(); renderAll();
}
function saveProjectGalleryCaption(kind, entryId, caption) {
    const entry = ensureGallery(kind).find(item => item.id === entryId);
    if (entry) { entry.caption = caption; saveState(); }
}

// ================================================================
// CERT PHOTO ACTIONS
// ================================================================

function uploadCertPhoto(roomId, taskId) {
    resizeAndUpload(dataUrl => {
        const photoId = uid();
        if (!storePhoto(photoId, dataUrl)) return;
        const task = Object.values(state.rooms.find(r => r.id === roomId)?.trades || {}).flat().find(t => t.id === taskId);
        if (!task) return;
        if (task.certPhotoId) removePhoto(task.certPhotoId);
        task.certPhotoId  = photoId;
        task.certStatus   = 'pending';
        task.certComment  = task.certComment || '';
        task.certDate     = new Date().toISOString();
        saveState(); renderAll();
    });
}
function approveCert(roomId, taskId) {
    const task = Object.values(state.rooms.find(r => r.id === roomId)?.trades || {}).flat().find(t => t.id === taskId);
    if (!task) return;
    task.done = true; task.certStatus = 'approved'; task.certComment = '';
    saveState(); renderAll();
}
function requestRevision(roomId, taskId, comment) {
    const task = Object.values(state.rooms.find(r => r.id === roomId)?.trades || {}).flat().find(t => t.id === taskId);
    if (!task) return;
    task.done = false; task.certStatus = 'revision'; task.certComment = comment || '';
    saveState(); renderAll();
}
function openRevisionPrompt(roomId, taskId) {
    const comment = prompt('¿Qué falta o hay que corregir?', '') ;
    if (comment === null) return;
    requestRevision(roomId, taskId, comment);
}
function deleteCertPhoto(roomId, taskId) {
    const task = Object.values(state.rooms.find(r => r.id === roomId)?.trades || {}).flat().find(t => t.id === taskId);
    if (!task) return;
    removePhoto(task.certPhotoId);
    task.certPhotoId = null; task.certStatus = null; task.certComment = ''; task.certDate = null;
    saveState(); renderAll();
}
function initRoomTrades(type) {
    const trades = {};
    Object.entries(ROOM_TEMPLATES[type].trades).forEach(([tid, tasks]) => {
        trades[tid] = tasks.map(text => ({ id: uid(), text, done: false, notes: '', qty: '', unit: 'ud', price: '' }));
    });
    return trades;
}
function getTradeInfo(tid) {
    return state.tradeInfo[tid] || {
        company:'', phone:'', budget:'', companyId:'',
        startDate:'', endDate:'', durationDays:'', scheduleNotes:'',
        tradeDocuments:[]
    };
}
function tradeScheduleText(info) {
    if (!info) return '';
    const parts = [];
    if (info.startDate) parts.push(`Inicio ${formatShortDate(info.startDate)}`);
    if (info.endDate) parts.push(`Fin ${formatShortDate(info.endDate)}`);
    if (info.durationDays) parts.push(`${info.durationDays} d`);
    return parts.join(' · ');
}

// ================================================================
// PROJECT ACTIONS
// ================================================================

var _editProjectId = null;
var _selProjColor  = PROJECT_COLORS[0];
var _projectCoverImage = '';

function renderProjectCoverPreview() {
    const box = document.getElementById('projCoverPreview');
    if (!box) return;
    box.innerHTML = _projectCoverImage
        ? `<div class="project-cover-preview"><img src="${_projectCoverImage}" alt="Portada del proyecto"></div>`
        : `<div class="project-cover-empty">Sin foto de portada.</div>`;
}
function uploadProjectCover() {
    resizeAndUpload(dataUrl => {
        _projectCoverImage = dataUrl;
        renderProjectCoverPreview();
    });
}
function clearProjectCover() {
    _projectCoverImage = '';
    renderProjectCoverPreview();
}

function openProjectModal(projectId) {
    _editProjectId = projectId || null;
    const p = projectId ? state.projects.find(p => p.id === projectId) : null;
    _selProjColor = p ? p.color : PROJECT_COLORS[0];
    _projectCoverImage = p ? (p.coverImage || '') : '';
    document.getElementById('projectModalTitle').textContent = p ? 'Editar proyecto' : 'Nuevo proyecto';
    document.getElementById('projName').value    = p ? p.name        : '';
    document.getElementById('projAddress').value = p ? p.address     : '';
    document.getElementById('projLocationNotes').value = p ? (p.locationNotes || '') : '';
    document.getElementById('projDesc').value    = p ? p.description : '';
    document.getElementById('projDeleteBtn').style.display = p ? 'inline-flex' : 'none';
    document.getElementById('projColorPicker').innerHTML = PROJECT_COLORS.map(c =>
        `<button type="button" class="color-dot ${_selProjColor===c?'selected':''}"
            style="background:${c}" data-color="${c}" onclick="selectProjColor('${c}')"></button>`
    ).join('');
    renderProjectCoverPreview();
    document.getElementById('projectModal').classList.add('open');
    setTimeout(() => document.getElementById('projName').focus(), 100);
}
function closeProjectModal(e) {
    if (e && e.target !== document.getElementById('projectModal')) return;
    document.getElementById('projectModal').classList.remove('open');
}
function selectProjColor(c) {
    _selProjColor = c;
    document.querySelectorAll('#projColorPicker .color-dot').forEach(d =>
        d.classList.toggle('selected', d.dataset.color === c));
}
function confirmProject() {
    const name = document.getElementById('projName').value.trim();
    if (!name) { document.getElementById('projName').focus(); return; }
    const data = {
        name, color: _selProjColor,
        address:     document.getElementById('projAddress').value.trim(),
        locationNotes: document.getElementById('projLocationNotes').value.trim(),
        description: document.getElementById('projDesc').value.trim(),
        coverImage: _projectCoverImage,
    };
    if (_editProjectId) {
        const p = state.projects.find(p => p.id === _editProjectId);
        if (p) Object.assign(p, data);
    } else {
        const newProj = { id: uid(), createdAt: new Date().toISOString(), ...data };
        state.projects.push(newProj);
        saveIndex();
        closeProjectModal();
        loadProject(newProj.id);
        renderAll();
        return;
    }
    saveIndex();
    closeProjectModal();
    renderAll();
}
function deleteProjectFromModal() {
    if (!_editProjectId) return;
    const p = state.projects.find(p => p.id === _editProjectId);
    if (!p || !confirm(`¿Eliminar "${p.name}"?\nSe perderán todas las estancias, tareas y fotos del proyecto.`)) return;
    deleteProjectStorage(_editProjectId);
    state.projects = state.projects.filter(p => p.id !== _editProjectId);
    if (state.currentProjectId === _editProjectId) {
        state.currentProjectId = null;
        state.rooms=[]; state.tradeInfo={};
        state.projectNotes=[]; state.projectCalendar=[]; state.sectionPhotos={}; state.projectGalleries=emptyProjectGalleries();
        state.documents=emptyDocuments();
        state.projectBudget=emptyProjectBudget();
        state.projectFinishes=defaultFinishSpecs(); state.projectFurniture=[];
    }
    saveIndex();
    closeProjectModal();
    state.view = 'projects';
    renderAll();
}
function enterProject(projectId) {
    loadProject(projectId);
    state.portalView = 'projects';
    renderAll();
}
function exitToProjects() {
    saveCurrentProject();
    state.currentProjectId = null;
    state.rooms=[]; state.tradeInfo={};
    state.projectNotes=[]; state.projectCalendar=[]; state.sectionPhotos={}; state.projectGalleries=emptyProjectGalleries(); state.collapsed={};
    state.documents=emptyDocuments();
    state.projectBudget=emptyProjectBudget();
    state.projectFinishes=defaultFinishSpecs(); state.projectFurniture=[];
    state.view = 'projects';
    state.portalView = 'projects';
    saveIndex();
    renderAll();
}
function findTask(taskId) {
    for (const room of state.rooms)
        for (const tasks of Object.values(room.trades)) {
            const t = tasks.find(t => t.id === taskId);
            if (t) return t;
        }
    return null;
}

// ================================================================
// PROGRESS
// ================================================================

function roomProgress(room) {
    let total = 0, done = 0;
    Object.values(room.trades).forEach(tasks => tasks.forEach(t => { total++; if (t.done) done++; }));
    return { total, done, pct: total ? Math.round(done/total*100) : 0 };
}
function tradeRoomProgress(room, tid) {
    const tasks = room.trades[tid] || [];
    const done  = tasks.filter(t => t.done).length;
    return { total: tasks.length, done, pct: tasks.length ? Math.round(done/tasks.length*100) : 0 };
}
function tradeGlobalProgress(tid) {
    let total = 0, done = 0;
    state.rooms.forEach(room => (room.trades[tid]||[]).forEach(t => { total++; if (t.done) done++; }));
    return { total, done, pct: total ? Math.round(done/total*100) : 0 };
}
function overallProgress() {
    let total = 0, done = 0;
    state.rooms.forEach(r => { const p = roomProgress(r); total += p.total; done += p.done; });
    return { total, done, pct: total ? Math.round(done/total*100) : 0 };
}

// ================================================================
// MATERIALS AGGREGATION
// ================================================================

function getMaterialsData() {
    let totalCost = 0, doneCost = 0, pendingCost = 0, noCostCount = 0;
    const byTrade = {};
    Object.keys(TRADES).forEach(tid => { byTrade[tid] = { items:[], total:0, done:0, pending:0 }; });

    state.rooms.forEach(room => {
        const tpl = ROOM_TEMPLATES[room.type];
        Object.entries(room.trades).forEach(([tid, tasks]) => {
            if (!byTrade[tid]) byTrade[tid] = { items:[], total:0, done:0, pending:0 };
            tasks.forEach(task => {
                const cost = taskCost(task);
                const c    = cost ?? 0;
                if (cost === null) noCostCount++;
                byTrade[tid].items.push({ task, room, tpl, cost });
                byTrade[tid].total   += c;
                if (task.done) { byTrade[tid].done    += c; doneCost    += c; }
                else           { byTrade[tid].pending += c; pendingCost += c; }
                totalCost += c;
            });
        });
    });
    return { totalCost, doneCost, pendingCost, noCostCount, byTrade };
}

// ================================================================
// DRAG & DROP
// ================================================================

var _drag = null;
function handleDragStart(e, el) {
    _drag = { roomId: el.dataset.room, tradeId: el.dataset.trade, taskId: el.dataset.task };
    el.querySelector('.task-row').classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}
function handleDragOver(e, el) {
    if (!_drag || _drag.roomId !== el.dataset.room || _drag.tradeId !== el.dataset.trade) return;
    e.preventDefault();
    document.querySelectorAll('.task-container').forEach(c => c.classList.remove('drag-over'));
    el.classList.add('drag-over');
}
function handleDragLeave(e, el) {
    if (!e.relatedTarget || !el.contains(e.relatedTarget)) el.classList.remove('drag-over');
}
function handleDrop(e, el) {
    e.preventDefault(); el.classList.remove('drag-over');
    if (!_drag || _drag.taskId === el.dataset.task) { _drag = null; return; }
    if (_drag.roomId !== el.dataset.room || _drag.tradeId !== el.dataset.trade) { _drag = null; return; }
    const room  = state.rooms.find(r => r.id === _drag.roomId);
    if (!room)  { _drag = null; return; }
    const tasks    = room.trades[_drag.tradeId];
    const fromIdx  = tasks.findIndex(t => t.id === _drag.taskId);
    const toIdx    = tasks.findIndex(t => t.id === el.dataset.task);
    if (fromIdx < 0 || toIdx < 0) { _drag = null; return; }
    const [item] = tasks.splice(fromIdx, 1);
    tasks.splice(toIdx, 0, item);
    _drag = null; saveState(); renderAll();
}
function handleDragEnd() {
    _drag = null;
    document.querySelectorAll('.task-container').forEach(c => c.classList.remove('drag-over'));
    document.querySelectorAll('.task-row').forEach(r => r.classList.remove('dragging'));
}

// ================================================================
// TASK ACTIONS
// ================================================================

function toggleTask(roomId, taskId) {
    const room = state.rooms.find(r => r.id === roomId);
    if (!room) return;
    for (const tasks of Object.values(room.trades)) {
        const t = tasks.find(t => t.id === taskId);
        if (t) { t.done = !t.done; break; }
    }
    saveState(); renderAll();
}
function deleteTask(roomId, tradeId, taskId) {
    const room = state.rooms.find(r => r.id === roomId);
    if (!room?.trades[tradeId]) return;
    room.trades[tradeId] = room.trades[tradeId].filter(t => t.id !== taskId);
    saveState(); renderAll();
}
function addTask(roomId, tradeId, inputEl) {
    const text = inputEl.value.trim();
    if (!text) return;
    const room = state.rooms.find(r => r.id === roomId);
    if (!room?.trades[tradeId]) return;
    room.trades[tradeId].push({
        id: uid(), text, done: false, notes: '', qty: '', unit: 'ud', price: '',
        startDate: '', dueDate: ''
    });
    saveState(); renderAll();
    const inp = document.getElementById(`addinp_${roomId}_${tradeId}`);
    if (inp) inp.focus();
}

function saveTaskField(roomId, taskId, field, value) {
    const room = state.rooms.find(r => r.id === roomId);
    if (!room) return;
    const task = Object.values(room.trades).flat().find(t => t.id === taskId);
    if (!task) return;
    task[field] = value;
    saveState();
    // Update badge in DOM without full re-render
    const badge = document.getElementById(`badge_${taskId}`);
    if (badge) {
        const txt = taskBadgeText(task);
        badge.textContent = txt;
        badge.classList.toggle('visible', !!txt);
    }
    // Update detail btn style
    const btn = document.getElementById(`detailbtn_${taskId}`);
    if (btn) btn.classList.toggle('has-data', !!(task.desc || task.notes || task.qty || task.price || task.startDate || task.dueDate));
    // Update cost total display in detail panel
    previewCost(taskId);
}

function toggleDetail(taskId) {
    const wrap = document.getElementById(`detail_${taskId}`);
    if (!wrap) return;
    const visible = wrap.style.display !== 'none';
    wrap.style.display = visible ? 'none' : 'block';
    if (!visible) wrap.querySelector('input,textarea')?.focus();
}

function previewCost(taskId) {
    const detail = document.getElementById(`detail_${taskId}`);
    if (!detail) return;
    const qtyEl   = detail.querySelector('.cost-qty');
    const priceEl = detail.querySelector('.cost-price');
    const totalEl = document.getElementById(`costtotal_${taskId}`);
    if (!totalEl) return;
    const q = parseFloat(qtyEl?.value), p = parseFloat(priceEl?.value);
    totalEl.textContent = (!isNaN(q) && !isNaN(p) && q > 0 && p > 0) ? formatEur(q * p) : '—';
}

// ================================================================
// ROOM + TRADE INFO ACTIONS
// ================================================================

function updateMeasure(roomId, field, val) {
    const room = state.rooms.find(r => r.id === roomId);
    if (!room) return;
    room[field] = val; saveState();
    const el = document.getElementById(`mat_${roomId}`);
    if (el) el.innerHTML = renderMaterialsInner(room);
}
function renameRoom(roomId, name) {
    const room = state.rooms.find(r => r.id === roomId);
    if (!room) return;
    room.name = name; saveState();
    const el = document.getElementById(`sbname_${roomId}`);
    if (el) el.textContent = name;
}
function deleteRoom(roomId) {
    const room = state.rooms.find(r => r.id === roomId);
    if (!room || !confirm(`¿Eliminar "${room.name}"? Se perderá todo su progreso.`)) return;
    state.rooms = state.rooms.filter(r => r.id !== roomId);
    saveState(); state.view = 'dashboard'; state.currentRoom = null; renderAll();
}
function parseIsoDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(`${dateStr}T00:00:00`);
    return isNaN(d) ? null : d;
}
function formatIsoDate(date) {
    if (!(date instanceof Date) || isNaN(date)) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
function calcDurationDays(startDate, endDate) {
    const start = parseIsoDate(startDate);
    const end = parseIsoDate(endDate);
    if (!start || !end || end < start) return '';
    return Math.floor((end - start) / 86400000) + 1;
}
function calcEndDateFromDuration(startDate, durationDays) {
    const start = parseIsoDate(startDate);
    const days = parseInt(durationDays, 10);
    if (!start || !days || days < 1) return '';
    const end = new Date(start);
    end.setDate(end.getDate() + days - 1);
    return formatIsoDate(end);
}
function tradeDurationHelper(info) {
    const days = parseInt(info?.durationDays, 10);
    if (!days || days < 1) return 'Indica los dias para calcular la fecha final.';
    return `${days} día${days === 1 ? '' : 's'} estimado${days === 1 ? '' : 's'}`;
}
function syncTradeScheduleUI(tid) {
    const info = getTradeInfo(tid);
    const endInput = document.getElementById(`tradeEnd_${tid}`);
    const durationInput = document.getElementById(`tradeDuration_${tid}`);
    const endHelp = document.getElementById(`tradeEndHelp_${tid}`);
    const durationHelp = document.getElementById(`tradeDurationHelp_${tid}`);
    if (endInput) endInput.value = info.endDate || '';
    if (durationInput) durationInput.value = info.durationDays || '';
    if (endHelp) endHelp.textContent = info.endDate ? `Fin: ${formatShortDate(info.endDate)}` : 'Pon inicio y días para calcular la fecha final.';
    if (durationHelp) durationHelp.textContent = tradeDurationHelper(info);
}
function updateTradeInfo(tid, field, val) {
    if (!state.tradeInfo[tid]) state.tradeInfo[tid] = getTradeInfo(tid);
    state.tradeInfo[tid][field] = val;
    const info = state.tradeInfo[tid];
    if (field === 'startDate') {
        if (info.startDate && info.durationDays) info.endDate = calcEndDateFromDuration(info.startDate, info.durationDays);
        else if (info.startDate && info.endDate) info.durationDays = calcDurationDays(info.startDate, info.endDate);
    } else if (field === 'endDate') {
        info.durationDays = calcDurationDays(info.startDate, info.endDate);
    } else if (field === 'durationDays') {
        info.endDate = calcEndDateFromDuration(info.startDate, info.durationDays);
    }
    saveState();
    syncTradeScheduleUI(tid);
}
function assignCompanyToTrade(tid, companyId) {
    if (!state.tradeInfo[tid]) state.tradeInfo[tid] = getTradeInfo(tid);
    state.tradeInfo[tid].companyId = companyId;
    if (companyId) {
        const c = state.companies.find(c => c.id === companyId);
        if (c) { state.tradeInfo[tid].company = c.name; state.tradeInfo[tid].phone = c.phone; }
    }
    saveState(); renderAll();
}
function removeCompanyReferencesEverywhere(companyId) {
    state.projects.forEach(project => {
        const keys = projectKeys(project.id);
        const core = readJSON(keys.core, null);
        if (!core?.tradeInfo) return;
        let changed = false;
        Object.values(core.tradeInfo).forEach(info => {
            if (info?.companyId === companyId) {
                delete info.companyId;
                delete info.company;
                delete info.phone;
                changed = true;
            }
        });
        if (changed) writeJSON(keys.core, core);
    });
    Object.values(state.tradeInfo || {}).forEach(info => {
        if (info?.companyId === companyId) {
            delete info.companyId;
            delete info.company;
            delete info.phone;
        }
    });
}

// ================================================================
// COMPANY ACTIONS
// ================================================================

var _editCompanyId = null;
var _cmpSelTrades  = new Set();
var _cmpPeople = [];
var _cmpHistory = [];
var _editSupplierId = null;
var _supSelCategories = new Set();
var _editCollectionItem = null;

function renderCompanyPeopleEditor() {
    const box = document.getElementById('cmpPeopleEditor');
    if (!box) return;
    box.innerHTML = _cmpPeople.length
        ? _cmpPeople.map(person => `
            <div class="company-person-editor">
                <div class="company-person-editor-grid">
                    <select class="modal-input" onchange="updateCompanyPersonField('${person.id}','area',this.value)">
                        <option value="gerencia" ${person.area === 'gerencia' ? 'selected' : ''}>Gerencia</option>
                        <option value="administracion" ${person.area === 'administracion' ? 'selected' : ''}>Administracion</option>
                        <option value="trabajador" ${person.area === 'trabajador' ? 'selected' : ''}>Trabajador</option>
                    </select>
                    <input class="modal-input" value="${esc(person.name)}" placeholder="Nombre" oninput="updateCompanyPersonField('${person.id}','name',this.value)">
                    <input class="modal-input" value="${esc(person.role)}" placeholder="Cargo" oninput="updateCompanyPersonField('${person.id}','role',this.value)">
                    <input class="modal-input" value="${esc(person.phone)}" placeholder="Telefono" oninput="updateCompanyPersonField('${person.id}','phone',this.value)">
                    <input class="modal-input" value="${esc(person.whatsapp)}" placeholder="WhatsApp" oninput="updateCompanyPersonField('${person.id}','whatsapp',this.value)">
                    <input class="modal-input" value="${esc(person.email)}" placeholder="Email" oninput="updateCompanyPersonField('${person.id}','email',this.value)">
                </div>
                <div style="display:flex;justify-content:flex-end;margin-top:8px">
                    <button class="btn btn-danger" type="button" onclick="removeCompanyPerson('${person.id}')" style="padding:8px 12px">Eliminar persona</button>
                </div>
            </div>`).join('')
        : `<div class="admin-mini-note">Todavia no hay personas de contacto.</div>`;
}
function addCompanyPerson() {
    _cmpPeople.push({ id: uid(), area: 'gerencia', name: '', role: '', phone: '', whatsapp: '', email: '' });
    renderCompanyPeopleEditor();
}
function updateCompanyPersonField(personId, field, value) {
    const person = _cmpPeople.find(item => item.id === personId);
    if (!person) return;
    person[field] = value;
}
function removeCompanyPerson(personId) {
    _cmpPeople = _cmpPeople.filter(item => item.id !== personId);
    renderCompanyPeopleEditor();
}
function renderCompanyHistoryEditor() {
    const box = document.getElementById('cmpHistoryEditor');
    if (!box) return;
    box.innerHTML = _cmpHistory.length
        ? _cmpHistory.map(entry => `
            <div class="company-history-editor">
                <div class="company-history-editor-grid">
                    <input class="modal-input" type="date" value="${esc(String(entry.date || '').slice(0,10))}" onchange="updateCompanyHistoryField('${entry.id}','date',this.value)">
                    <input class="modal-input" value="${esc(entry.project)}" placeholder="Obra / contexto" oninput="updateCompanyHistoryField('${entry.id}','project',this.value)">
                    <select class="modal-input" onchange="updateCompanyHistoryField('${entry.id}','status',this.value)">
                        <option value="pendiente" ${entry.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="enviado" ${entry.status === 'enviado' ? 'selected' : ''}>Enviado</option>
                        <option value="revisado" ${entry.status === 'revisado' ? 'selected' : ''}>Revisado</option>
                        <option value="cerrado" ${entry.status === 'cerrado' ? 'selected' : ''}>Cerrado</option>
                    </select>
                </div>
                <textarea class="modal-input" rows="2" style="margin-top:8px;resize:vertical" placeholder="Nota enviada o seguimiento..." oninput="updateCompanyHistoryField('${entry.id}','text',this.value)">${esc(entry.text)}</textarea>
                <div style="display:flex;justify-content:flex-end;margin-top:8px">
                    <button class="btn btn-danger" type="button" onclick="removeCompanyHistoryEntry('${entry.id}')" style="padding:8px 12px">Eliminar nota</button>
                </div>
            </div>`).join('')
        : `<div class="admin-mini-note">Todavia no hay notas enviadas a esta empresa.</div>`;
}
function addCompanyHistoryEntry() {
    _cmpHistory.unshift({ id: uid(), date: new Date().toISOString().slice(0,10), project: '', status: 'pendiente', text: '' });
    renderCompanyHistoryEditor();
}
function updateCompanyHistoryField(entryId, field, value) {
    const entry = _cmpHistory.find(item => item.id === entryId);
    if (!entry) return;
    entry[field] = value;
}
function removeCompanyHistoryEntry(entryId) {
    _cmpHistory = _cmpHistory.filter(item => item.id !== entryId);
    renderCompanyHistoryEditor();
}
function companyContactSummary(company) {
    return (company.people || []).slice(0, 3).map(person => {
        const area = person.area === 'gerencia' ? 'Gerencia' : person.area === 'administracion' ? 'Administracion' : 'Trabajador';
        const role = person.role ? ` · ${person.role}` : '';
        return `<div class="company-contact-line"><strong>${area}</strong>: ${esc(person.name || 'Sin nombre')}${role}</div>`;
    }).join('');
}
function companyStatusLabel(task) {
    if (task.done) return { label: 'Hecho', cls: 'done' };
    if (task.startDate) return { label: 'En curso', cls: 'progress' };
    return { label: 'Pendiente', cls: 'pending' };
}
function getCompanyJobs(companyId) {
    const jobs = [];
    state.projects.forEach(project => {
        const data = project.id === state.currentProjectId
            ? {
                rooms: state.rooms,
                tradeInfo: state.tradeInfo,
            }
            : getProjectData(project.id);
        const relatedTradeIds = Object.entries(data.tradeInfo || {})
            .filter(([, info]) => info?.companyId === companyId)
            .map(([tradeId]) => tradeId);
        if (!relatedTradeIds.length) return;
        (data.rooms || []).forEach(room => {
            relatedTradeIds.forEach(tradeId => {
                const tasks = room.trades?.[tradeId] || [];
                tasks.forEach(task => {
                    jobs.push({
                        id: task.id,
                        projectId: project.id,
                        projectName: project.name,
                        roomName: room.name,
                        tradeName: TRADES[tradeId]?.name || tradeId,
                        taskText: task.text,
                        status: companyStatusLabel(task),
                    });
                });
            });
        });
    });
    return jobs;
}

function openCompanyModal(companyId) {
    _editCompanyId = companyId || null;
    _cmpSelTrades  = new Set();
    const c = companyId ? normalizeCompany(state.companies.find(c => c.id === companyId)) : null;
    _cmpPeople = c?.people ? c.people.map(person => ({ ...person })) : [];
    _cmpHistory = c?.history ? c.history.map(entry => ({ ...entry, date: String(entry.date || '').slice(0,10) })) : [];
    document.getElementById('companyModalTitle').textContent = c ? 'Editar empresa' : 'Nueva empresa';
    document.getElementById('cmpName').value    = c ? c.name    : '';
    document.getElementById('cmpPhone').value   = c ? c.phone   : '';
    document.getElementById('cmpCif').value     = c ? c.cif     : '';
    document.getElementById('cmpEmail').value   = c ? c.email   : '';
    document.getElementById('cmpAddress').value = c ? c.address : '';
    document.getElementById('cmpNotes').value   = c ? c.notes   : '';
    document.getElementById('cmpDeleteBtn').style.display = c ? 'inline-flex' : 'none';
    if (c && c.trades) c.trades.forEach(t => _cmpSelTrades.add(t));
    document.getElementById('cmpTradesGrid').innerHTML = Object.entries(TRADES).map(([tid, trade]) =>
        `<button type="button" class="type-btn" id="ctbtn_${tid}"
            style="flex-direction:row;gap:6px;padding:6px 10px;font-size:12px"
            onclick="toggleCmpTrade('${tid}')">${trade.icon} ${trade.name}</button>`
    ).join('');
    _cmpSelTrades.forEach(tid => document.getElementById(`ctbtn_${tid}`)?.classList.add('selected'));
    renderCompanyPeopleEditor();
    renderCompanyHistoryEditor();
    document.getElementById('companyModal').classList.add('open');
    setTimeout(() => document.getElementById('cmpName').focus(), 100);
}
function closeCompanyModal(e) {
    if (e && e.target !== document.getElementById('companyModal')) return;
    document.getElementById('companyModal').classList.remove('open');
}
function toggleCmpTrade(tid) {
    if (_cmpSelTrades.has(tid)) _cmpSelTrades.delete(tid);
    else _cmpSelTrades.add(tid);
    document.getElementById(`ctbtn_${tid}`)?.classList.toggle('selected', _cmpSelTrades.has(tid));
}
function confirmCompany() {
    const name = document.getElementById('cmpName').value.trim();
    if (!name) { document.getElementById('cmpName').focus(); return; }
    const data = {
        name, trades: [..._cmpSelTrades],
        phone:   document.getElementById('cmpPhone').value.trim(),
        cif:     document.getElementById('cmpCif').value.trim(),
        email:   document.getElementById('cmpEmail').value.trim(),
        address: document.getElementById('cmpAddress').value.trim(),
        notes:   document.getElementById('cmpNotes').value.trim(),
        people:  _cmpPeople.filter(person => person.name || person.phone || person.email || person.role || person.whatsapp),
        history: _cmpHistory.filter(entry => entry.text || entry.project).map(entry => ({ ...entry, date: entry.date || new Date().toISOString().slice(0,10) })),
    };
    if (_editCompanyId) {
        const c = state.companies.find(c => c.id === _editCompanyId);
        if (c) Object.assign(c, normalizeCompany({ ...c, ...data }));
    } else {
        state.companies.push(normalizeCompany({ id: uid(), ...data }));
    }
    saveGlobalCompanies(); closeCompanyModal(); renderAll();
}
function deleteCompanyFromModal() {
    if (!_editCompanyId) return;
    const c = state.companies.find(c => c.id === _editCompanyId);
    if (!c || !confirm(`¿Eliminar "${c.name}"?`)) return;
    state.companies = state.companies.filter(c => c.id !== _editCompanyId);
    removeCompanyReferencesEverywhere(_editCompanyId);
    saveCurrentProject();
    saveGlobalCompanies();
    closeCompanyModal(); renderAll();
}

const SUPPLIER_CATEGORIES = {
    materials: 'Materiales',
    finishes: 'Acabados',
    furniture: 'Mobiliario',
};

function openSupplierModal(supplierId) {
    _editSupplierId = supplierId || null;
    _supSelCategories = new Set();
    const s = supplierId ? normalizeSupplier(state.suppliers.find(item => item.id === supplierId)) : null;
    document.getElementById('supplierModalTitle').textContent = s ? 'Editar proveedor' : 'Nuevo proveedor';
    document.getElementById('supName').value = s ? s.name : '';
    document.getElementById('supPhone').value = s ? s.phone : '';
    document.getElementById('supCif').value = s ? s.cif : '';
    document.getElementById('supEmail').value = s ? s.email : '';
    document.getElementById('supAddress').value = s ? s.address : '';
    document.getElementById('supNotes').value = s ? s.notes : '';
    document.getElementById('supDeleteBtn').style.display = s ? 'inline-flex' : 'none';
    if (s && s.categories) s.categories.forEach(cat => _supSelCategories.add(cat));
    document.getElementById('supCategoriesGrid').innerHTML = Object.entries(SUPPLIER_CATEGORIES).map(([key, label]) =>
        `<button type="button" class="type-btn" id="supbtn_${key}"
            style="flex-direction:row;gap:6px;padding:6px 10px;font-size:12px"
            onclick="toggleSupplierCategory('${key}')">${label}</button>`
    ).join('');
    _supSelCategories.forEach(key => document.getElementById(`supbtn_${key}`)?.classList.add('selected'));
    document.getElementById('supplierModal').classList.add('open');
    setTimeout(() => document.getElementById('supName').focus(), 100);
}
function closeSupplierModal(e) {
    if (e && e.target !== document.getElementById('supplierModal')) return;
    document.getElementById('supplierModal').classList.remove('open');
}
function toggleSupplierCategory(key) {
    if (_supSelCategories.has(key)) _supSelCategories.delete(key);
    else _supSelCategories.add(key);
    document.getElementById(`supbtn_${key}`)?.classList.toggle('selected', _supSelCategories.has(key));
}
function confirmSupplier() {
    const name = document.getElementById('supName').value.trim();
    if (!name) { document.getElementById('supName').focus(); return; }
    const data = normalizeSupplier({
        id: _editSupplierId || uid(),
        name,
        categories: [..._supSelCategories],
        phone: document.getElementById('supPhone').value.trim(),
        cif: document.getElementById('supCif').value.trim(),
        email: document.getElementById('supEmail').value.trim(),
        address: document.getElementById('supAddress').value.trim(),
        notes: document.getElementById('supNotes').value.trim(),
    });
    if (_editSupplierId) {
        const idx = state.suppliers.findIndex(item => item.id === _editSupplierId);
        if (idx >= 0) state.suppliers[idx] = { ...state.suppliers[idx], ...data };
    } else {
        state.suppliers.push(data);
    }
    saveGlobalSuppliers();
    closeSupplierModal();
    renderAll();
}
function deleteSupplierFromModal() {
    if (!_editSupplierId) return;
    const s = state.suppliers.find(item => item.id === _editSupplierId);
    if (!s || !confirm(`¿Eliminar "${s.name}"?`)) return;
    state.suppliers = state.suppliers.filter(item => item.id !== _editSupplierId);
    saveCurrentProject();
    saveGlobalSuppliers();
    closeSupplierModal();
    renderAll();
}

// ================================================================
// NOTE ACTIONS
// ================================================================

function addNote() {
    const text = document.getElementById('noteTextarea')?.value.trim();
    const cat  = document.getElementById('noteCatSel')?.value || 'general';
    if (!text) { document.getElementById('noteTextarea')?.focus(); return; }
    state.projectNotes.unshift({ id: uid(), date: new Date().toISOString(), text, category: cat, author: currentUserLabel() });
    saveState();
    document.getElementById('noteTextarea').value = '';
    renderAll();
}
function addQuickMessage() {
    const text = document.getElementById('quickMessageInput')?.value.trim();
    if (!text) { document.getElementById('quickMessageInput')?.focus(); return; }
    state.projectNotes.unshift({ id: uid(), date: new Date().toISOString(), text, category: 'general', author: currentUserLabel() });
    saveState();
    document.getElementById('quickMessageInput').value = '';
    renderAll();
}
function deleteNote(noteId) {
    if (!confirm('¿Eliminar esta nota?')) return;
    state.projectNotes = state.projectNotes.filter(n => n.id !== noteId);
    saveState(); renderAll();
}

// ================================================================
// CALENDAR ACTIONS
// ================================================================

if (!window.__obraCalendarCursor) {
    window.__obraCalendarCursor = new Date();
    window.__obraCalendarCursor.setDate(1);
    window.__obraCalendarCursor.setHours(0,0,0,0);
}
var _calendarCursor = window.__obraCalendarCursor;

function isoDateLocal(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
function getCalendarItems() {
    const items = [];
    state.projectCalendar.forEach(m => {
        if (!m.date) return;
        items.push({ type:'milestone', id:m.id, title:m.title, date:m.date, done:!!m.done, meta:'Hito de obra' });
    });
    state.rooms.forEach(room => {
        Object.entries(room.trades || {}).forEach(([tradeId, tasks]) => {
            const trade = TRADES[tradeId];
            (tasks || []).forEach(task => {
                const start = task.startDate || task.dueDate;
                if (!start) return;
                items.push({
                    type:'task',
                    id:task.id,
                    title:task.text,
                    date:start,
                    endDate:task.dueDate || '',
                    done:!!task.done,
                    meta:`${room.name} · ${trade?.name || tradeId}`
                });
            });
        });
    });
    return items.sort((a,b) => String(a.date).localeCompare(String(b.date)) || a.title.localeCompare(b.title));
}
function addMilestone() {
    const title = document.getElementById('milestoneTitle')?.value.trim();
    const date  = document.getElementById('milestoneDate')?.value;
    if (!title) { document.getElementById('milestoneTitle')?.focus(); return; }
    if (!date) { document.getElementById('milestoneDate')?.focus(); return; }
    state.projectCalendar.push({ id: uid(), title, date, done:false });
    saveState();
    document.getElementById('milestoneTitle').value = '';
    renderAll();
}
function removeMilestone(id) {
    if (!confirm('¿Eliminar este hito?')) return;
    state.projectCalendar = state.projectCalendar.filter(m => m.id !== id);
    saveState(); renderAll();
}
function toggleMilestoneDone(id) {
    const milestone = state.projectCalendar.find(m => m.id === id);
    if (!milestone) return;
    milestone.done = !milestone.done;
    saveState(); renderAll();
}
function moveCalendarMonth(delta) {
    _calendarCursor = new Date(_calendarCursor.getFullYear(), _calendarCursor.getMonth() + delta, 1);
    renderAll();
}
function renderCalendarPanel() {
    const year = _calendarCursor.getFullYear();
    const month = _calendarCursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const gridStart = new Date(year, month, 1 - startOffset);
    const todayIso = isoDateLocal(new Date());
    const items = getCalendarItems();
    const monthLabel = firstDay.toLocaleDateString('es-ES', { month:'long', year:'numeric' });
    const days = [];
    for (let i = 0; i < 42; i++) {
        const d = new Date(gridStart);
        d.setDate(gridStart.getDate() + i);
        const iso = isoDateLocal(d);
        const matching = items.filter(item => item.date === iso || (item.type === 'task' && item.endDate && item.endDate === iso && item.endDate !== item.date));
        const dayItems = matching.slice(0, 3);
        const extra = matching.length - dayItems.length;
        days.push(`
            <div class="calendar-day ${d.getMonth()!==month?'muted':''} ${iso===todayIso?'today':''}">
                <div class="calendar-day-num">${d.getDate()}</div>
                <div class="calendar-pill-list">
                    ${dayItems.map(item => `<div class="calendar-pill ${item.type} ${item.done?'done':''}">${esc(item.title)}</div>`).join('') || '<div class="calendar-empty">Sin actividad</div>'}
                    ${extra > 0 ? `<div class="calendar-empty">+${extra} más</div>` : ''}
                </div>
            </div>`);
    }
    const upcoming = items
        .filter(item => item.date >= todayIso)
        .slice(0, 8)
        .map(item => `
            <div class="agenda-item">
                <div class="agenda-date">${formatShortDate(item.date)}</div>
                <div class="agenda-text">
                    ${esc(item.title)}
                    <div class="agenda-sub">${esc(item.meta || '')}</div>
                </div>
            </div>`).join('') || '<div class="calendar-empty">Sin próximas fechas.</div>';
    const milestones = [...state.projectCalendar]
        .sort((a,b) => String(a.date).localeCompare(String(b.date)))
        .map(m => `
            <div class="milestone-item">
                <input type="checkbox" ${m.done?'checked':''} onclick="toggleMilestoneDone('${m.id}')">
                <div class="milestone-date">${formatShortDate(m.date)}</div>
                <div class="milestone-text">
                    ${esc(m.title)}
                    <div class="milestone-sub">${m.done ? 'Completado' : 'Pendiente'}</div>
                </div>
                <button class="mini-del-btn" onclick="removeMilestone('${m.id}')">✕</button>
            </div>`).join('') || '<div class="calendar-empty">Todavía no hay hitos.</div>';

    return `
        <div class="dash-header">
            <div><div class="page-title">Calendario de obra</div><div class="page-sub">Planifica tareas, hitos y próximas fechas clave.</div></div>
        </div>
        <div class="calendar-top">
            <div class="calendar-nav">
                <button class="btn btn-ghost" onclick="moveCalendarMonth(-1)">?</button>
                <div class="calendar-month">${esc(monthLabel)}</div>
                <button class="btn btn-ghost" onclick="moveCalendarMonth(1)">?</button>
            </div>
        </div>
        <div class="calendar-grid">
            <div class="calendar-weekday">Lun</div><div class="calendar-weekday">Mar</div><div class="calendar-weekday">Mié</div><div class="calendar-weekday">Jue</div><div class="calendar-weekday">Vie</div><div class="calendar-weekday">Sáb</div><div class="calendar-weekday">Dom</div>
            ${days.join('')}
        </div>
        <div class="calendar-split">
            <div class="milestone-box">
                <div class="section-label">Hitos del proyecto</div>
                <div class="milestone-form">
                    <input class="info-input" id="milestoneTitle" type="text" placeholder="Ej. Inicio de demoliciones">
                    <input class="info-input" id="milestoneDate" type="date">
                    <button class="btn btn-primary" onclick="addMilestone()">Añadir hito</button>
                </div>
                <div class="milestone-list">${milestones}</div>
            </div>
            <div class="agenda-box">
                <div class="section-label">Próximas fechas</div>
                ${upcoming}
            </div>
        </div>`;
}

// ================================================================
// NAVIGATION
// ================================================================

function navigate(view, id) {
    if (view === 'admin' && !isAdmin()) {
        alert('Solo el administrador puede entrar en Administracion.');
        return;
    }
    state.view = view;
    state.currentRoom  = view === 'room'  ? id : null;
    state.currentTrade = view === 'trade' ? id : null;
    renderAll();
    const c = document.getElementById('content');
    if (c) c.scrollTop = 0;
}
function switchPortalView(view) {
    state.portalView = view === 'projects'
        ? 'projects'
        : view === 'companies'
            ? 'companies'
            : view === 'suppliers'
                ? 'suppliers'
                : 'control';
    state.currentProjectId = null;
    state.view = 'projects';
    renderAll();
}
function openGlobalCompanies() {
    saveCurrentProject();
    state.currentProjectId = null;
    state.portalView = 'companies';
    state.view = 'projects';
    renderAll();
}
function openGlobalSuppliers() {
    saveCurrentProject();
    state.currentProjectId = null;
    state.portalView = 'suppliers';
    state.view = 'projects';
    renderAll();
}
function toggleCollapse(key) {
    state.collapsed[key] = !state.collapsed[key];
    const el   = document.getElementById(`body_${key}`);
    const chev = document.getElementById(`chev_${key}`);
    if (el)   el.classList.toggle('collapsed', !!state.collapsed[key]);
    if (chev) chev.textContent = state.collapsed[key] ? '?' : '?';
}

// ================================================================
// MODAL
// ================================================================

var _selType = null;
function openModal() {
    _selType = null;
    document.getElementById('roomNameInput').value = '';
    document.getElementById('addConfirmBtn').disabled = true;
    document.getElementById('typeGrid').innerHTML = Object.entries(ROOM_TEMPLATES).map(([t, tpl]) =>
        `<button class="type-btn" id="tbtn_${t}" onclick="selectType('${t}')">${tpl.icon}<span class="t-name">${tpl.name}</span></button>`
    ).join('');
    document.getElementById('addModal').classList.add('open');
    setTimeout(() => document.getElementById('roomNameInput').focus(), 100);
}
function closeModal(e) {
    if (e && e.target !== document.getElementById('addModal')) return;
    document.getElementById('addModal').classList.remove('open');
}
function selectType(type) {
    const prevType = _selType;
    _selType = type;
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById(`tbtn_${type}`)?.classList.add('selected');
    const inp = document.getElementById('roomNameInput');
    const currentName = inp.value.trim();
    const prevAutoName = prevType ? ROOM_TEMPLATES[prevType]?.name : '';
    if (!currentName || currentName === prevAutoName) inp.value = ROOM_TEMPLATES[type].name;
    validateModal(); inp.focus(); inp.select();
}
function validateModal() {
    document.getElementById('addConfirmBtn').disabled =
        !(_selType && document.getElementById('roomNameInput').value.trim());
}
function confirmAdd() {
    const name = document.getElementById('roomNameInput').value.trim();
    if (!_selType || !name) return;
    const room = { id: uid(), type: _selType, name, m2: '', height: '', trades: initRoomTrades(_selType) };
    state.rooms.push(room); saveState();
    document.getElementById('addModal').classList.remove('open');
    state.view = 'room'; state.currentRoom = room.id; renderAll();
}
function isAdmin() {
    return state.currentUser?.role === 'admin';
}
function currentUserLabel() {
    return state.currentUser?.name || state.currentUser?.username || 'Usuario';
}
function createDemoTradeInfo() {
    return {
        fontaneria: { companyId:'demo-company-1', company:'Aqua Levante', phone:'620 111 111', budget:'6800', startDate:'2026-05-12', endDate:'2026-05-23' },
        electricidad: { companyId:'demo-company-2', company:'Volt Studio', phone:'620 222 222', budget:'5400', startDate:'2026-05-14', endDate:'2026-05-28' },
        pintura: { companyId:'demo-company-3', company:'Color Mediterraneo', phone:'620 333 333', budget:'3200', startDate:'2026-06-08', endDate:'2026-06-15' },
    };
}
function createDemoProjects() {
    const baseProjects = [
        { id:'demo-project-1', name:'Villa Noelia', address:'Guardamar del Segura', description:'Reforma integral premium', color:'#e67e22', createdAt:new Date().toISOString() },
        { id:'demo-project-2', name:'Atico Centro', address:'Alicante centro', description:'Actualizacion de acabados y cocina', color:'#1976D2', createdAt:new Date().toISOString() },
        { id:'demo-project-3', name:'Local Showroom', address:'Elche parque empresarial', description:'Adecuacion comercial en marcha', color:'#27ae60', createdAt:new Date().toISOString() },
    ].map(normalizeProject);
    const payload = {
        version: BACKUP_FILE_VERSION,
        exportedAt: new Date().toISOString(),
        index: {
            projects: baseProjects,
            currentProjectId: baseProjects[0].id,
            companies: [
                normalizeCompany({ id:'demo-company-1', name:'Aqua Levante', phone:'620 111 111', email:'obra@aqualevante.es', address:'Orihuela Costa', cif:'B10000001', trades:['fontaneria','sanitarios'] }),
                normalizeCompany({ id:'demo-company-2', name:'Volt Studio', phone:'620 222 222', email:'tecnico@voltstudio.es', address:'Alicante', cif:'B10000002', trades:['electricidad'] }),
                normalizeCompany({ id:'demo-company-3', name:'Color Mediterraneo', phone:'620 333 333', email:'info@colormediterraneo.es', address:'Elche', cif:'B10000003', trades:['pintura','yeseria'] }),
            ],
            suppliers: [
                normalizeSupplier({ id:'demo-supplier-1', name:'Ceramicas Costa', phone:'966 000 001', categories:['materials','finishes'], address:'Alicante' }),
                normalizeSupplier({ id:'demo-supplier-2', name:'Cocinas Forma', phone:'966 000 002', categories:['finishes','furniture'], address:'Murcia' }),
            ],
        },
        companies: [
            normalizeCompany({ id:'demo-company-1', name:'Aqua Levante', phone:'620 111 111', email:'obra@aqualevante.es', address:'Orihuela Costa', cif:'B10000001', trades:['fontaneria','sanitarios'] }),
            normalizeCompany({ id:'demo-company-2', name:'Volt Studio', phone:'620 222 222', email:'tecnico@voltstudio.es', address:'Alicante', cif:'B10000002', trades:['electricidad'] }),
            normalizeCompany({ id:'demo-company-3', name:'Color Mediterraneo', phone:'620 333 333', email:'info@colormediterraneo.es', address:'Elche', cif:'B10000003', trades:['pintura','yeseria'] }),
        ],
        suppliers: [
            normalizeSupplier({ id:'demo-supplier-1', name:'Ceramicas Costa', phone:'966 000 001', categories:['materials','finishes'], address:'Alicante' }),
            normalizeSupplier({ id:'demo-supplier-2', name:'Cocinas Forma', phone:'966 000 002', categories:['finishes','furniture'], address:'Murcia' }),
        ],
        projectData: [
            {
                projectId:'demo-project-1',
                core: {
                    rooms: [
                        { id:'demo-room-1', type:'cocina', name:'Cocina principal', m2:'18', height:'2.6', trades:initRoomTrades('cocina') },
                        { id:'demo-room-2', type:'bano', name:'Baño suite', m2:'9', height:'2.6', trades:initRoomTrades('bano') },
                    ],
                    tradeInfo: createDemoTradeInfo(),
                    projectNotes: [{ id:uid(), date:new Date().toISOString(), text:'Obra en fase de instalaciones. Cliente pendiente de aprobar encimera.', category:'general', author:'Administrador' }],
                    projectCalendar: [{ id:uid(), title:'Inicio fontaneria', date:'2026-05-12', done:false }, { id:uid(), title:'Revision cliente cocina', date:'2026-05-29', done:false }],
                    sectionPhotos: {},
                    projectGalleries: { during:[], final:[], recreation3d:[] },
                    projectBudget: { clientBudget:'32500', repercutedBudget:'27100', targetMargin:'16', approvedDate:'2026-05-05', notes:'Cliente aprueba extras aparte.' },
                    projectFinishes: normalizeFinishSpecs([{ key:'floorType', selection:'Porcelanico 90x90 mate', status:'aceptado', providerUrl:'https://proveedor-demo.es/suelo', renderUrl:'https://render-demo.es/suelo' }, { key:'countertop', selection:'Dekton claro', status:'propuesto' }]),
                    projectFurniture: [{ id:uid(), name:'Mueble TV salon', space:'Salon', status:'pedido', supplierId:'demo-supplier-2', budget:'1800', notes:'En chapa roble' }],
                },
                docs: { entries: emptyDocuments(), blobs: {} },
                photos: { blobs: {} },
            },
            {
                projectId:'demo-project-2',
                core: {
                    rooms: [{ id:'demo-room-3', type:'salon_cocina', name:'Salon-cocina', m2:'32', height:'2.5', trades:initRoomTrades('salon_cocina') }],
                    tradeInfo: { carpinteria:{ company:'Carpinsa', budget:'4100', startDate:'2026-06-01', endDate:'2026-06-10' }, alicatado:{ company:'Ceramicas Costa', budget:'2800' } },
                    projectNotes: [{ id:uid(), date:new Date().toISOString(), text:'Pendiente definir azulejo de cocina con arquitectura.', category:'df', author:'Administrador' }],
                    projectCalendar: [{ id:uid(), title:'Entrega propuesta acabados', date:'2026-06-02', done:false }],
                    sectionPhotos: {},
                    projectGalleries: { during:[], final:[], recreation3d:[] },
                    projectBudget: { clientBudget:'18400', repercutedBudget:'15100', targetMargin:'18', approvedDate:'2026-05-20', notes:'' },
                    projectFinishes: normalizeFinishSpecs([{ key:'kitchenType', selection:'Cocina lineal lacada', status:'aceptado' }, { key:'kitchenTiles', selection:'Sin azulejo, frente porcelanico', status:'propuesto' }]),
                    projectFurniture: [],
                },
                docs: { entries: emptyDocuments(), blobs: {} },
                photos: { blobs: {} },
            },
            {
                projectId:'demo-project-3',
                core: {
                    rooms: [{ id:'demo-room-4', type:'general', name:'Zona comun', m2:'45', height:'3.2', trades:initRoomTrades('general') }],
                    tradeInfo: { electricidad:{ company:'Volt Studio', budget:'6200', startDate:'2026-05-18', endDate:'2026-06-01' } },
                    projectNotes: [{ id:uid(), date:new Date().toISOString(), text:'Local listo para fase final de instalaciones y pintura.', category:'gestora', author:'Administrador' }],
                    projectCalendar: [{ id:uid(), title:'Apertura prevista', date:'2026-06-20', done:false }],
                    sectionPhotos: {},
                    projectGalleries: { during:[], final:[], recreation3d:[] },
                    projectBudget: { clientBudget:'28900', repercutedBudget:'24600', targetMargin:'15', approvedDate:'2026-05-01', notes:'Hay mobiliario comercial fuera de contrato.' },
                    projectFinishes: normalizeFinishSpecs([{ key:'wallColor', selection:'Gris piedra suave', status:'aceptado' }]),
                    projectFurniture: [{ id:uid(), name:'Mostrador recepcion', space:'Entrada', status:'recibido', supplierId:'demo-supplier-2', budget:'2400', notes:'Listo para montar' }],
                },
                docs: { entries: emptyDocuments(), blobs: {} },
                photos: { blobs: {} },
            },
        ],
    };
    return payload;
}
function loadDemoData() {
    if (state.projects.length && !confirm('Esto añadira una demo sobre la informacion actual. ¿Continuar?')) return;
    applyBackupPayload(createDemoProjects());
    initState();
    renderAll();
}
async function createAdminUser() {
    if (!isAdmin()) {
        alert('Solo el administrador puede crear usuarios.');
        return;
    }
    const name = document.getElementById('newUserName')?.value.trim();
    const username = document.getElementById('newUsername')?.value.trim().toLowerCase();
    const password = document.getElementById('newUserPassword')?.value || '';
    const role = document.getElementById('newUserRole')?.value || 'colaborador';
    if (!name || !username || !password) {
        alert('Completa nombre, usuario y contrasena.');
        return;
    }
    const users = getUsers();
    if (users.some(user => user.username.toLowerCase() === username)) {
        alert('Ese usuario ya existe.');
        return;
    }
    users.push({
        id: uid(),
        username,
        name,
        role,
        active: true,
        mustChangePassword: role !== 'admin',
        passwordHash: await sha256(password),
        createdAt: new Date().toISOString(),
    });
    saveUsers(users);
    ['newUserName','newUsername','newUserPassword'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    renderAll();
}
async function resetUserPassword(userId) {
    if (!isAdmin()) {
        alert('Solo el administrador puede cambiar claves de otros usuarios.');
        return;
    }
    const password = prompt('Nueva contrasena para este usuario:');
    if (!password) return;
    const users = getUsers();
    const user = users.find(item => item.id === userId);
    if (!user) return;
    user.passwordHash = await sha256(password);
    user.mustChangePassword = false;
    saveUsers(users);
    if (state.currentUser?.id === user.id) state.currentUser = user;
    alert('Contrasena actualizada.');
    renderAll();
}
function toggleUserActive(userId) {
    if (!isAdmin()) {
        alert('Solo el administrador puede activar o desactivar usuarios.');
        return;
    }
    if (state.currentUser?.id === userId) {
        alert('No puedes desactivar tu propio usuario.');
        return;
    }
    const users = getUsers();
    const user = users.find(item => item.id === userId);
    if (!user) return;
    user.active = user.active === false ? true : false;
    saveUsers(users);
    renderAll();
}
async function changeMyPassword() {
    const current = document.getElementById('myCurrentPassword')?.value || '';
    const next = document.getElementById('myNewPassword')?.value || '';
    const repeat = document.getElementById('myRepeatPassword')?.value || '';
    if (!current || !next || !repeat) {
        alert('Completa los tres campos de contrasena.');
        return;
    }
    if (next !== repeat) {
        alert('La nueva contrasena no coincide.');
        return;
    }
    const users = getUsers();
    const user = users.find(item => item.id === state.currentUser?.id);
    if (!user) return;
    if (await sha256(current) !== user.passwordHash) {
        alert('La contrasena actual no es correcta.');
        return;
    }
    user.passwordHash = await sha256(next);
    user.mustChangePassword = false;
    saveUsers(users);
    state.currentUser = user;
    ['myCurrentPassword','myNewPassword','myRepeatPassword'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    alert('Contrasena actualizada.');
    renderAll();
}
function saveAdminSettings() {
    const appName = document.getElementById('adminAppName')?.value.trim() || 'Gestion de Obra';
    const primaryColor = document.getElementById('adminPrimaryColor')?.value || '#e67e22';
    state.settings = { ...state.settings, appName, primaryColor };
    saveSettings();
    renderAll();
}
function renderAdminPanel() {
    const users = getUsers();
    const userRows = users.map(user => `
        <div class="admin-user-item">
            <div>
                <div class="admin-user-name">${esc(user.name)}</div>
                <div class="admin-user-meta">${esc(user.username)} · ${user.role === 'admin' ? 'Administrador' : 'Colaborador'} · ${user.active === false ? 'Inactivo' : 'Activo'}${user.mustChangePassword ? ' · Cambio pendiente' : ''}</div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">
                <button class="btn btn-ghost" onclick="resetUserPassword('${user.id}')" style="padding:8px 12px">Clave</button>
                ${state.currentUser?.id !== user.id ? `<button class="btn ${user.active === false ? 'btn-ghost' : 'btn-danger'}" onclick="toggleUserActive('${user.id}')" style="padding:8px 12px">${user.active === false ? 'Activar' : 'Desactivar'}</button>` : ''}
            </div>
        </div>`).join('');
    const usersBlock = isAdmin() ? `
                <div class="admin-card">
                    <div class="section-label">Usuarios</div>
                    <div class="admin-user-list">${userRows}</div>
                </div>
                <div class="admin-card">
                    <div class="section-label">Nuevo usuario</div>
                    <div class="admin-inline-grid" style="margin-top:12px">
                        <div class="modal-field"><label class="modal-label">Nombre</label><input class="modal-input" id="newUserName" type="text" placeholder="Nombre visible"></div>
                        <div class="modal-field"><label class="modal-label">Usuario</label><input class="modal-input" id="newUsername" type="text" placeholder="usuario"></div>
                    </div>
                    <div class="admin-inline-grid">
                        <div class="modal-field"><label class="modal-label">Contrasena inicial</label><input class="modal-input" id="newUserPassword" type="password" placeholder="Temporal"></div>
                        <div class="modal-field"><label class="modal-label">Rol</label><select class="modal-input" id="newUserRole"><option value="colaborador">Colaborador</option><option value="admin">Administrador</option></select></div>
                    </div>
                    <button class="btn btn-primary" onclick="createAdminUser()">Crear usuario</button>
                </div>`
        : `
                <div class="admin-card">
                    <div class="section-label">Usuarios</div>
                    <div class="admin-mini-note">Solo el administrador puede gestionar usuarios.</div>
                </div>`;
    return `
        <div class="dash-header">
            <div><div class="page-title">Panel de control</div><div class="page-sub">Usuarios, copias de seguridad, restauracion y personalizacion general.</div></div>
        </div>
        <div class="admin-grid">
            <div style="display:flex;flex-direction:column;gap:18px">
                <div class="admin-card">
                    <div class="section-label">Resumen rapido</div>
                    <div class="summary-cards" style="margin-top:12px">
                        <div class="summary-card"><div class="sc-label">Obras</div><div class="sc-value">${state.projects.length}</div><div class="sc-pct">Proyectos registrados</div></div>
                        <div class="summary-card"><div class="sc-label">Usuarios</div><div class="sc-value">${users.length}</div><div class="sc-pct">Accesos activos</div></div>
                        <div class="summary-card"><div class="sc-label">Empresas</div><div class="sc-value">${state.companies.length}</div><div class="sc-pct">Directorio global</div></div>
                    </div>
                </div>
                ${usersBlock}
            </div>
            <div style="display:flex;flex-direction:column;gap:18px">
                <div class="admin-card">
                    <div class="section-label">Mi contrasena</div>
                    <div class="modal-field" style="margin-top:12px"><label class="modal-label">Actual</label><input class="modal-input" id="myCurrentPassword" type="password"></div>
                    <div class="modal-field"><label class="modal-label">Nueva</label><input class="modal-input" id="myNewPassword" type="password"></div>
                    <div class="modal-field"><label class="modal-label">Repetir nueva</label><input class="modal-input" id="myRepeatPassword" type="password"></div>
                    <button class="btn btn-primary" onclick="changeMyPassword()">Guardar contrasena</button>
                </div>
                <div class="admin-card">
                    <div class="section-label">Backup y datos</div>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
                        <button class="btn btn-ghost" onclick="connectDataFolder()">${fsState.handle ? 'Cambiar carpeta' : 'Conectar carpeta'}</button>
                        <button class="btn btn-ghost" onclick="persistToFolder('manual')">Guardar carpeta</button>
                        <button class="btn btn-ghost" onclick="loadFromConnectedFolder()">Recargar carpeta</button>
                        <button class="btn btn-ghost" onclick="exportBackupFile()">Exportar copia</button>
                        <button class="btn btn-ghost" onclick="openBackupImport()">Importar copia</button>
                        <button class="btn btn-ghost" onclick="loadDemoData()">Cargar demo</button>
                        <button class="btn btn-danger" onclick="restoreEmergencyBackup()">Restaurar copia local</button>
                    </div>
                    <div class="admin-mini-note">${esc(storageStatusText())}</div>
                </div>
                <div class="admin-card">
                    <div class="section-label">Personalizacion</div>
                    <div class="modal-field" style="margin-top:12px"><label class="modal-label">Nombre de la plataforma</label><input class="modal-input" id="adminAppName" type="text" value="${esc(state.settings.appName || 'Gestion de Obra')}"></div>
                    <div class="modal-field"><label class="modal-label">Color principal</label><input class="modal-input" id="adminPrimaryColor" type="color" value="${esc(state.settings.primaryColor || '#e67e22')}" style="height:48px;padding:6px 10px"></div>
                    <button class="btn btn-primary" onclick="saveAdminSettings()">Guardar personalizacion</button>
                </div>
            </div>
        </div>`;
}

// ================================================================
// RENDER — MATERIALS (room measures)
// ================================================================

function calcRoomMaterials(m2, height) {
    if (!m2 || !height || m2 <= 0 || height <= 0) return null;
    const side = Math.sqrt(m2), perim = 4*side, wall = perim*height;
    return {
        suelo: m2.toFixed(2), sueloMerma: (m2*1.1).toFixed(2),
        paredes: wall.toFixed(2), perimetro: perim.toFixed(1),
        pintParedes: (wall/12).toFixed(1), pintTecho: (m2/12).toFixed(1),
        pint2m: ((wall+m2)/12*2).toFixed(1), alicMerma: (wall*1.1).toFixed(2),
    };
}
function renderMaterialsInner(room) {
    const m = calcRoomMaterials(parseFloat(room.m2), parseFloat(room.height));
    if (!m) return `<span class="mat-empty">Introduce m² y altura para calcular estimaciones.</span>`;
    return `<div class="materials-grid">
        <div class="mat-item"><div class="mat-lbl">Suelo</div><div class="mat-val">${m.suelo} m²</div></div>
        <div class="mat-item"><div class="mat-lbl">Suelo + merma 10%</div><div class="mat-val">${m.sueloMerma} m²</div></div>
        <div class="mat-item"><div class="mat-lbl">Paredes (aprox.)</div><div class="mat-val">${m.paredes} m²</div></div>
        <div class="mat-item"><div class="mat-lbl">Perímetro (aprox.)</div><div class="mat-val">${m.perimetro} m</div></div>
        <div class="mat-item"><div class="mat-lbl">Pintura paredes 1 mano</div><div class="mat-val">~${m.pintParedes} L</div></div>
        <div class="mat-item"><div class="mat-lbl">Pintura techo 1 mano</div><div class="mat-val">~${m.pintTecho} L</div></div>
        <div class="mat-item"><div class="mat-lbl">Pintura total 2 manos</div><div class="mat-val">~${m.pint2m} L</div></div>
        <div class="mat-item"><div class="mat-lbl">Alicatado pared + merma</div><div class="mat-val">${m.alicMerma} m²</div></div>
    </div>`;
}

// ================================================================
// RENDER HELPERS — task rows
// ================================================================

function renderAddTaskRow(roomId, tradeId) {
    return `
    <div class="task-add-row">
        <input class="task-add-inp" id="addinp_${roomId}_${tradeId}" type="text" placeholder="Nueva tarea…"
            onkeydown="if(event.key==='Enter')addTask('${roomId}','${tradeId}',this)"
            onclick="event.stopPropagation()">
        <button class="task-add-btn"
            onclick="addTask('${roomId}','${tradeId}',document.getElementById('addinp_${roomId}_${tradeId}'))">+</button>
    </div>`;
}

function renderTradeSection(roomId, tradeId, tasks, colKey) {
    const trade     = TRADES[tradeId] || { name:tradeId, color:'#999', icon:'🔨' };
    const done      = tasks.filter(t => t.done).length;
    const total     = tasks.length;
    const pct       = total ? Math.round(done/total*100) : 0;
    const key       = `${colKey}_${tradeId}`;
    const collapsed = !!state.collapsed[key];
    return `
    <div class="trade-section">
        <div class="trade-hdr" onclick="toggleCollapse('${key}')">
            <div class="trade-accent" style="background:${trade.color}"></div>
            <span class="trade-icon">${trade.icon}</span>
            <span class="trade-name">${trade.name}</span>
            <span class="trade-count">${done}/${total}</span>
            <span class="trade-chevron" id="chev_${key}">${collapsed?'?':'?'}</span>
        </div>
        <div class="trade-pbar" style="background:#f0f0f0">
            <div class="trade-pbar-fill" style="width:${pct}%;background:${trade.color}"></div>
        </div>
        <div class="trade-tasks ${collapsed?'collapsed':''}" id="body_${key}">
            ${tasks.map(t => renderTaskRow(roomId, tradeId, t)).join('')}
            ${renderAddTaskRow(roomId, tradeId)}
        </div>
    </div>`;
}

// ================================================================
// RENDER — SIDEBAR
// ================================================================

function renderSidebar() {
    const op = overallProgress();
    const inAdminSection = state.view === 'admin';
    const inOficiosSection   = state.view === 'trades' || state.view === 'trade';
    const inMaterialsSection = state.view === 'materials';
    const inCompaniesSection = state.view === 'companies';
    const inNotesSection     = state.view === 'notes';
    const inCalendarSection  = state.view === 'calendar';
    const inFinishesSection  = state.view === 'finishes';
    const inFurnitureSection = state.view === 'furniture';

    let nav = '', addBtn = '', sectionTitle = '';

    if (inAdminSection) {
        sectionTitle = 'Administracion';
        nav = `<div style="padding:12px 16px;font-size:12px;display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-light)">Usuario</span><strong>${esc(currentUserLabel())}</strong></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-light)">Usuarios</span><strong>${getUsers().length}</strong></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-light)">Estado datos</span><strong>${esc(fsState.handle ? 'Carpeta' : 'Navegador')}</strong></div>
        </div>`;
    } else if (!inOficiosSection && !inMaterialsSection && !inCompaniesSection && !inNotesSection && !inCalendarSection && !inFinishesSection && !inFurnitureSection) {
        sectionTitle = 'Estancias';
        addBtn = `<button class="sidebar-add-btn" onclick="openModal()">+ Nueva estancia</button>`;
        nav = state.rooms.map(room => {
            const tpl = ROOM_TEMPLATES[room.type];
            const p = roomProgress(room);
            const active = state.view === 'room' && state.currentRoom === room.id;
            return `<div class="nav-item ${active?'active':''}" onclick="navigate('room','${room.id}')">
                <span class="nav-icon">${tpl ? tpl.icon : 'RM'}</span>
                <div class="nav-info">
                    <div class="nav-name" id="sbname_${room.id}">${esc(room.name)}</div>
                    <div class="nav-sub">${p.done}/${p.total} tareas</div>
                    <div class="nav-mini-bar"><div class="nav-mini-fill" style="width:${p.pct}%"></div></div>
                </div>
            </div>`;
        }).join('') || '<div style="padding:16px;font-size:12px;color:var(--text-light);text-align:center">Sin estancias</div>';
    } else if (inOficiosSection) {
        sectionTitle = 'Oficios';
        nav = Object.entries(TRADES).map(([tid, trade]) => {
            const p = tradeGlobalProgress(tid);
            const info = getTradeInfo(tid);
            const active = state.view === 'trade' && state.currentTrade === tid;
            return `<div class="nav-item ${active?'active':''}" onclick="navigate('trade','${tid}')">
                <div class="nav-trade-dot" style="background:${trade.color}"></div>
                <div class="nav-info">
                    <div class="nav-name">${trade.icon} ${trade.name}</div>
                    <div class="nav-sub">${info.company||'Sin empresa'} ? ${p.done}/${p.total}</div>
                    <div class="nav-mini-bar"><div class="nav-mini-fill" style="width:${p.pct}%;background:${trade.color}"></div></div>
                </div>
            </div>`;
        }).join('');
    } else if (inMaterialsSection) {
        sectionTitle = 'Materiales';
        const data = getMaterialsData();
        nav = `<div style="padding:12px 16px">
            <div style="font-size:12px;color:var(--text-light);margin-bottom:6px">Presupuestado</div>
            <div style="font-size:15px;font-weight:700">${formatEur(data.totalCost)}</div>
            <div style="height:1px;background:var(--border);margin:10px 0"></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                <span style="color:var(--success)">Completado</span>
                <span style="font-weight:600">${formatEur(data.doneCost)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px">
                <span style="color:var(--primary)">Pendiente</span>
                <span style="font-weight:600">${formatEur(data.pendingCost)}</span>
            </div>
        </div>`;
    } else if (state.view === 'docs') {
        sectionTitle = 'Documentos';
        const proj = state.projects.find(p => p.id === state.currentProjectId) || {};
        nav = `<div style="padding:12px 16px;font-size:12px;display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-light)">Direccion</span><strong>${proj.address ? 'OK' : 'Pendiente'}</strong></div>
            <div style="height:1px;background:var(--border)"></div>
            ${Object.entries(DOC_CATEGORIES).map(([key, cat]) => {
                const count = (state.documents[key]||[]).length;
                return `<div style="display:flex;align-items:center;gap:8px">
                    <span>${cat.icon}</span>
                    <span style="flex:1;color:var(--text-light)">${cat.label}</span>
                    <strong>${count}</strong>
                </div>`;
            }).join('')}
        </div>`;
    } else if (state.view === 'photos') {
        sectionTitle = 'Fotos';
        const totalBefore = Object.values(state.sectionPhotos).reduce((n,a) => n + a.length, 0);
        const certTasks = state.rooms.flatMap(r => Object.values(r.trades).flat().filter(t => t.certPhotoId));
        const approved = certTasks.filter(t => t.certStatus === 'approved').length;
        const pending = certTasks.filter(t => t.certStatus === 'pending').length;
        const revision = certTasks.filter(t => t.certStatus === 'revision').length;
        nav = `<div style="padding:12px 16px;font-size:12px;display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-light)">Fotos previas</span><strong>${totalBefore}</strong></div>
            <div style="height:1px;background:var(--border)"></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--success)">Aprobadas</span><strong>${approved}</strong></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--primary)">Pendientes</span><strong>${pending}</strong></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--danger)">Revision</span><strong>${revision}</strong></div>
        </div>`;
    } else if (inCompaniesSection) {
        const assigned = getAssignedCompaniesForProject();
        sectionTitle = 'Empresas de la obra';
        nav = assigned.length === 0
            ? '<div style="padding:16px;font-size:12px;color:var(--text-light);text-align:center">Sin empresas asignadas</div>'
            : assigned.map(c => {
                const icons = (c.trades||[]).slice(0,4).map(tid => TRADES[tid]?.icon||'').join(' ');
                return `<div class="nav-item" onclick="navigate('companies')">
                    <span class="nav-icon">EMP</span>
                    <div class="nav-info">
                        <div class="nav-name">${esc(c.name)}</div>
                        <div class="nav-sub">${c.phone||'Sin telefono'}${icons?' ? '+icons:''}</div>
                    </div>
                </div>`;
            }).join('');
    } else if (inCalendarSection) {
        sectionTitle = 'Calendario';
        const datedTasks = state.rooms.flatMap(r => Object.values(r.trades || {}).flat().filter(t => t.startDate || t.dueDate)).length;
        nav = `<div style="padding:12px 16px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:8px">
                <span style="color:var(--text-light)">Hitos</span>
                <strong>${state.projectCalendar.length}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px">
                <span style="color:var(--text-light)">Tareas con fecha</span>
                <strong>${datedTasks}</strong>
            </div>
        </div>`;
    } else if (inFinishesSection || inFurnitureSection) {
        const key = inFinishesSection ? 'projectFinishes' : 'projectFurniture';
        const items = getCollection(key);
        sectionTitle = inFinishesSection ? 'Acabados finales' : 'Mobiliario';
        addBtn = `<button class="sidebar-add-btn" onclick="addCollectionItem('${key}')">+ A?adir</button>`;
        nav = items.length
            ? items.map(item => `<div class="nav-item">
                <span class="nav-icon">${inFinishesSection ? 'ACB' : 'MOB'}</span>
                <div class="nav-info">
                    <div class="nav-name">${esc(item.name || 'Sin nombre')}</div>
                    <div class="nav-sub">${esc(item.space || 'Sin zona')} ? ${esc(item.status || 'pendiente')}</div>
                </div>
            </div>`).join('')
            : '<div style="padding:16px;font-size:12px;color:var(--text-light);text-align:center">Sin elementos</div>';
    }

    return `
        <div class="sidebar-global">
            <div class="sidebar-label">Progreso global</div>
            <div class="sb-pbar-wrap">
                <div class="sb-pbar"><div class="sb-pbar-fill" style="width:${op.pct}%"></div></div>
                <span class="sb-pct">${op.pct}%</span>
            </div>
        </div>
        ${addBtn}
        <div class="sidebar-section-title">${sectionTitle}</div>
        ${nav}`;
}

function renderDashboard() {
    const overall = overallProgress();
    const proj = state.projects.find(p => p.id === state.currentProjectId) || {};
    const todayIso = isoDateLocal(new Date());
    const upcomingItems = getCalendarItems().filter(item => item.date >= isoDateLocal(new Date())).slice(0, 5);
    const planos = (state.documents.planos || []).slice(0, 3);
    const generalDocs = Object.values(state.documents || {}).flat().slice(0, 4);
    const tradeDocs = Object.entries(state.tradeInfo || {}).flatMap(([tid, info]) =>
        (info.tradeDocuments || []).map(doc => ({ ...doc, tradeName: TRADES[tid]?.name || tid }))).slice(0, 4);
    const latestPhotos = Object.entries(state.sectionPhotos || {}).flatMap(([roomId, entries]) =>
        (entries || []).map(entry => ({ ...entry, roomId })))
        .sort((a,b) => String(b.date).localeCompare(String(a.date)))
        .slice(0, 4);
    const activeTasks = state.rooms.flatMap(room =>
        Object.entries(room.trades || {}).flatMap(([tid, tasks]) =>
            (tasks || []).filter(task => !task.done).map(task => ({
                room, tid, task,
                date: task.startDate || task.dueDate || '9999-12-31'
            }))))
        .sort((a,b) => String(a.date).localeCompare(String(b.date)))
        .slice(0, 6);
    const delayedTasks = state.rooms.flatMap(room =>
        Object.entries(room.trades || {}).flatMap(([tid, tasks]) =>
            (tasks || []).filter(task => !task.done && task.dueDate && task.dueDate < todayIso).map(task => ({
                room, tid, task
            }))))
        .sort((a,b) => String(a.task.dueDate).localeCompare(String(b.task.dueDate)))
        .slice(0, 6);
    const recentMessages = [...state.projectNotes]
        .sort((a,b) => String(b.date).localeCompare(String(a.date)))
        .slice(0, 5);
    const recentRooms = state.rooms.slice(0, 4).map(room => {
        const tpl = ROOM_TEMPLATES[room.type];
        const p = roomProgress(room);
        return `
            <div class="room-card" onclick="navigate('room','${room.id}')">
                <div class="room-card-top">
                    <div class="room-card-icon">${tpl.icon}</div>
                    <div><div class="room-card-name">${esc(room.name)}</div><div class="room-card-type">${tpl.name}</div></div>
                </div>
                <div class="card-pbar-row"><span class="card-pbar-lbl">Progreso</span><span class="card-pct" style="color:${pctColor(p.pct)}">${p.pct}%</span></div>
                <div class="card-pbar"><div class="card-pbar-fill" style="width:${p.pct}%;background:${pctColor(p.pct)}"></div></div>
            </div>`;
    }).join('');

    return `
        ${proj.coverImage ? `<div class="project-hero"><img src="${proj.coverImage}" alt="${esc(proj.name || 'Obra')}"><div class="project-hero-overlay"><div class="project-hero-title">${esc(proj.name || 'Obra')}</div><div class="project-hero-sub">${esc(proj.address || proj.description || 'Vista principal del proyecto')}</div></div></div>` : ''}
        <div class="dash-header">
            <div><div class="page-title">Resumen del proyecto</div><div class="page-sub">${overall.done} de ${overall.total} tareas ? ${state.rooms.length} estancia${state.rooms.length!==1?'s':''} ? Vista r?pida de la obra.</div></div>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
                <button class="btn btn-ghost" onclick="navigate('docs')">Documentos</button>
                <button class="btn btn-ghost" onclick="navigate('calendar')">Calendario</button>
                <button class="btn btn-ghost" onclick="openGlobalCompanies()">Empresas</button>
                <button class="btn btn-ghost" onclick="openProjectModal('${proj.id}')">Portada</button>
                <button class="add-room-btn" onclick="openModal()">+ A?adir estancia</button>
            </div>
        </div>
        <div class="summary-cards">
            <div class="summary-card"><div class="sc-label">Progreso global</div><div class="sc-value">${overall.pct}%</div><div class="sc-pct">${overall.done}/${overall.total} tareas</div></div>
            <div class="summary-card"><div class="sc-label">Documentos</div><div class="sc-value">${generalDocs.length}</div><div class="sc-pct">Acceso rapido a docs y planos</div></div>
            <div class="summary-card"><div class="sc-label">Fotos recientes</div><div class="sc-value">${latestPhotos.length}</div><div class="sc-pct">Ultimas imagenes subidas</div></div>
            <div class="summary-card"><div class="sc-label">Mensajes</div><div class="sc-value">${state.projectNotes.length}</div><div class="sc-pct">Comunicacion interna</div></div>
        </div>
        <div class="admin-grid">
            <div style="display:flex;flex-direction:column;gap:18px">
                <div class="admin-card">
                    <div class="section-label">Avisos de retraso</div>
                    ${delayedTasks.length ? delayedTasks.map(({ room, tid, task }) => `
                        <div class="agenda-item" style="padding-left:0;padding-right:0">
                            <div class="agenda-date" style="color:var(--danger)">${formatShortDate(task.dueDate)}</div>
                            <div class="agenda-text">
                                ${esc(task.text)}
                                <div class="agenda-sub">${esc(room.name)} · ${esc(TRADES[tid]?.name || tid)}</div>
                            </div>
                        </div>`).join('') : `<div class="calendar-empty">No hay tareas retrasadas.</div>`}
                </div>
                <div class="admin-card">
                    <div class="section-label">Trabajos en proceso</div>
                    ${activeTasks.length ? activeTasks.map(({ room, tid, task }) => `
                        <div class="agenda-item" style="padding-left:0;padding-right:0">
                            <div class="agenda-date">${task.startDate ? formatShortDate(task.startDate) : (task.dueDate ? formatShortDate(task.dueDate) : 'Sin fecha')}</div>
                            <div class="agenda-text">
                                ${esc(task.text)}
                                <div class="agenda-sub">${esc(room.name)} · ${esc(TRADES[tid]?.name || tid)}</div>
                            </div>
                        </div>`).join('') : `<div class="calendar-empty">No hay trabajos en curso todavia.</div>`}
                </div>
                <div class="admin-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
                        <div class="section-label" style="margin:0">Documentos y planos</div>
                        <button class="btn btn-ghost" onclick="navigate('docs')" style="padding:8px 12px">Abrir documentos</button>
                    </div>
                    <div style="margin-top:12px">
                        <div style="font-size:12px;font-weight:700;color:var(--text-light);margin-bottom:8px">Planos</div>
                        ${planos.length ? planos.map(d => `<div class="agenda-item" style="padding-left:0;padding-right:0"><div class="agenda-date">PDF</div><div class="agenda-text">${esc(d.name)}<div class="agenda-sub">${d.date ? new Date(d.date).toLocaleDateString('es-ES') : ''}</div></div></div>`).join('') : `<div class="calendar-empty">No hay planos todavia.</div>`}
                    </div>
                    <div style="margin-top:14px">
                        <div style="font-size:12px;font-weight:700;color:var(--text-light);margin-bottom:8px">Ultimos documentos de oficios</div>
                        ${tradeDocs.length ? tradeDocs.map(d => `<div class="agenda-item" style="padding-left:0;padding-right:0"><div class="agenda-date">DOC</div><div class="agenda-text">${esc(d.name)}<div class="agenda-sub">${esc(d.tradeName || '')}</div></div></div>`).join('') : `<div class="calendar-empty">No hay documentos de oficios todavia.</div>`}
                    </div>
                </div>
                <div class="admin-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
                        <div class="section-label" style="margin:0">Ultimas fotos</div>
                        <button class="btn btn-ghost" onclick="navigate('photos')" style="padding:8px 12px">Abrir fotos</button>
                    </div>
                    <div class="photo-grid" style="margin-top:12px">
                        ${latestPhotos.length ? latestPhotos.map(photo => {
                            const src = getPhoto(photo.photoId);
                            if (!src) return '';
                            const room = state.rooms.find(r => r.id === photo.roomId);
                            return `<div class="photo-card"><img src="${src}" onclick="openLightbox('${src}')"><div class="photo-card-body"><div style="font-size:12px;font-weight:700">${esc(room?.name || 'Estancia')}</div><div style="font-size:11px;color:var(--text-light)">${esc(photo.caption || 'Sin texto')}</div></div></div>`;
                        }).join('') : `<div class="calendar-empty">No hay fotos recientes.</div>`}
                    </div>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:18px">
                <div class="admin-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
                        <div class="section-label" style="margin:0">Pequeno calendario</div>
                        <button class="btn btn-ghost" onclick="navigate('calendar')" style="padding:8px 12px">Ver calendario</button>
                    </div>
                    <div style="margin-top:12px">
                        ${upcomingItems.length ? upcomingItems.map(item => `<div class="agenda-item" style="padding-left:0;padding-right:0"><div class="agenda-date">${formatShortDate(item.date)}</div><div class="agenda-text">${esc(item.title)}<div class="agenda-sub">${esc(item.meta || '')}</div></div></div>`).join('') : `<div class="calendar-empty">No hay fechas cercanas.</div>`}
                    </div>
                </div>
                <div class="admin-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
                        <div class="section-label" style="margin:0">Mensajes</div>
                        <button class="btn btn-ghost" onclick="navigate('notes')" style="padding:8px 12px">Ver todos</button>
                    </div>
                    <div class="note-add-row" style="margin-top:12px">
                        <textarea class="note-textarea" id="quickMessageInput" placeholder="Escribe un mensaje rapido para el proyecto..."></textarea>
                        <button class="btn btn-primary" onclick="addQuickMessage()">Enviar</button>
                    </div>
                    <div style="margin-top:12px">
                        ${recentMessages.length ? recentMessages.map(n => `<div class="note-entry" style="padding:14px 0;margin:0;box-shadow:none;border-radius:0;border-bottom:1px solid #f0f0f0"><span class="note-cat-badge ${(NOTE_CATEGORIES[n.category] || NOTE_CATEGORIES.general).cls}">${(NOTE_CATEGORIES[n.category] || NOTE_CATEGORIES.general).label}</span><div class="note-body"><div class="note-date">${new Date(n.date).toLocaleString('es-ES')} · ${esc(n.author || 'Sistema')}</div><div class="note-text">${esc(n.text)}</div></div></div>`).join('') : `<div class="calendar-empty">No hay mensajes todavia.</div>`}
                    </div>
                </div>
                <div class="admin-card">
                    <div class="section-label">Estancias</div>
                    <div class="card-grid" style="margin-top:12px">${recentRooms || `<div class="calendar-empty">No hay estancias todavia.</div>`}</div>
                </div>
            </div>
        </div>`;
}

// ================================================================
// RENDER — ROOM DETAIL
// ================================================================

function renderRoomDetail(roomId) {
    const room = state.rooms.find(r => r.id === roomId);
    if (!room) { navigate('dashboard'); return ''; }
    const tpl   = ROOM_TEMPLATES[room.type];
    const p     = roomProgress(room);
    const color = pctColor(p.pct);

    return `
        <button class="back-btn" onclick="navigate('dashboard')">← Volver al panel</button>
        <div class="detail-header">
            <div class="detail-title-row">
                <span class="detail-big-icon">${tpl.icon}</span>
                <div class="detail-name-wrap">
                    <input class="detail-name-input" type="text" value="${esc(room.name)}"
                        oninput="renameRoom('${roomId}',this.value)" title="Haz clic para renombrar">
                    <div class="detail-room-type">${tpl.name}</div>
                    <div class="detail-room-sub">${p.done} de ${p.total} tareas completadas</div>
                </div>
                <div class="detail-pct-badge" style="color:${color}">${p.pct}%</div>
            </div>
            <div class="detail-pbar"><div class="detail-pbar-fill" style="width:${p.pct}%;background:${color}"></div></div>
            <div class="section-label">Medidas de la estancia</div>
            <div class="measure-row">
                <div class="measure-group">
                    <label class="measure-lbl">Superficie (m²)</label>
                    <input class="measure-inp" type="number" min="0" step="0.1" value="${esc(room.m2)}" placeholder="Ej: 18.5" oninput="updateMeasure('${roomId}','m2',this.value)">
                </div>
                <div class="measure-group">
                    <label class="measure-lbl">Altura (m)</label>
                    <input class="measure-inp" type="number" min="0" step="0.05" value="${esc(room.height)}" placeholder="Ej: 2.60" oninput="updateMeasure('${roomId}','height',this.value)">
                </div>
            </div>
            <div class="materials-box">
                <div class="materials-title">📐 Estimación de materiales</div>
                <div id="mat_${roomId}">${renderMaterialsInner(room)}</div>
            </div>
            <div class="detail-actions">
                <button class="btn btn-danger" onclick="deleteRoom('${roomId}')">🗑 Eliminar estancia</button>
            </div>
        </div>
        ${Object.entries(room.trades).map(([tid, tasks]) => renderTradeSection(roomId, tid, tasks, roomId)).join('')}`;
}

// ================================================================
// RENDER — TRADES LIST
// ================================================================

function renderCertSection(roomId, task) {
    const CERT_LABELS = { pending:'⏳ Pendiente de aprobación', approved:'✅ Aprobado', revision:'⚠️ Requiere revisión' };
    const CERT_CLS    = { pending:'cert-pending', approved:'cert-approved', revision:'cert-revision' };
    const photo = task.certPhotoId ? getPhoto(task.certPhotoId) : null;
    const date  = task.certDate ? new Date(task.certDate).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'}) : '';

    return `<div class="cert-section" onclick="event.stopPropagation()">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <span class="cost-label">Certificación</span>
            ${task.certStatus
                ? `<span class="cert-status-badge ${CERT_CLS[task.certStatus]}">${CERT_LABELS[task.certStatus]}</span>
                   ${date ? `<span style="font-size:11px;color:var(--text-light)">${date}</span>` : ''}`
                : '<span style="font-size:12px;color:var(--text-light)">Sin foto de certificación</span>'}
        </div>
        ${photo ? `<div class="cert-photo-wrap">
            <img src="${photo}" onclick="openLightbox('${photo}')" title="Ver foto">
        </div>` : ''}
        ${task.certStatus === 'revision' && task.certComment
            ? `<div class="cert-comment-display">💬 ${esc(task.certComment)}</div>` : ''}
        <div class="cert-actions">
            <button class="cert-btn cert-btn-photo" onclick="uploadCertPhoto('${roomId}','${task.id}')">
                📷 ${photo ? 'Cambiar foto' : 'Añadir foto'}
            </button>
            ${task.certStatus !== 'approved' ? `
            <button class="cert-btn cert-btn-approve" onclick="approveCert('${roomId}','${task.id}')">✅ Aprobar</button>
            <button class="cert-btn cert-btn-revision" onclick="openRevisionPrompt('${roomId}','${task.id}')">⚠️ Pedir revisión</button>` : `
            <button class="cert-btn cert-btn-revision" onclick="openRevisionPrompt('${roomId}','${task.id}')">⚠️ Reabrir</button>`}
            ${photo ? `<button class="cert-btn" style="color:#ccc;border-color:#eee" onclick="deleteCertPhoto('${roomId}','${task.id}')">✕ Foto</button>` : ''}
        </div>
    </div>`;
}

function renderTaskRow(roomId, tradeId, task) {
    const hasData  = !!(task.desc || task.notes || task.qty || task.price || task.startDate || task.dueDate);
    const badge    = taskBadgeText(task);
    const cost     = taskCost(task);
    const unitSel  = UNITS.map(u =>
        `<option value="${u.v}" ${(task.unit||'ud')===u.v?'selected':''}>${u.l}</option>`
    ).join('');
    const dateLabel = task.startDate || task.dueDate
        ? `<div class="task-date-preview">Fecha: ${task.startDate ? formatShortDate(task.startDate) : ''}${task.startDate && task.dueDate ? ' -> ' : ''}${task.dueDate ? formatShortDate(task.dueDate) : ''}</div>`
        : '';

    return `
    <div class="task-container"
         data-room="${roomId}" data-trade="${tradeId}" data-task="${task.id}"
         ondragover="handleDragOver(event,this)" ondragleave="handleDragLeave(event,this)"
         ondrop="handleDrop(event,this)">
        <div class="task-row" draggable="true"
             ondragstart="handleDragStart(event,this.closest('.task-container'))"
             ondragend="handleDragEnd()"
             onclick="toggleDetail('${task.id}')">
            <span class="drag-handle" onclick="event.stopPropagation()">::</span>
            <div class="task-check ${task.done?'checked':''}" onclick="event.stopPropagation()">OK</div>
            <div style="flex:1;min-width:0">
                <span class="task-text ${task.done?'done':''}">${esc(task.text)}</span>
                ${task.desc ? `<div class="task-desc-preview">${esc(task.desc)}</div>` : ''}
                ${dateLabel}
            </div>
            <span class="task-badge ${badge?'visible':''}" id="badge_${task.id}">${badge}</span>
            ${task.certStatus==='approved' ? '<span class="cert-row-badge" title="Certificado y aprobado">OK</span>'
            : task.certStatus==='revision'  ? '<span class="cert-row-badge" title="Requiere revision">REV</span>'
            : task.certStatus==='pending'   ? '<span class="cert-row-badge" title="Pendiente de aprobacion">PTE</span>' : ''}
            <button id="detailbtn_${task.id}" class="task-detail-btn ${hasData?'has-data':''}"
                title="${hasData?'Ver detalles':'Anadir cantidad / notas'}"
                onclick="event.stopPropagation();toggleDetail('${task.id}')">Ver</button>
            <button class="task-del-btn" title="Eliminar tarea"
                onclick="event.stopPropagation();deleteTask('${roomId}','${tradeId}','${task.id}')">X</button>
        </div>
        ${task.notes && !task.qty && !task.price ? `<div class="task-notes-preview">${esc(task.notes)}</div>` : ''}
        <div id="detail_${task.id}" class="task-detail" style="display:none">
            <div style="margin-bottom:10px">
                <span class="cost-label">Descripcion del trabajo</span>
                <textarea class="task-notes-inp" style="margin-top:4px" placeholder="Describe que se va a realizar, materiales, acabados..."
                    onclick="event.stopPropagation()"
                    onblur="saveTaskField('${roomId}','${task.id}','desc',this.value)">${esc(task.desc||'')}</textarea>
            </div>
            <div class="detail-cost-row">
                <div class="cost-field">
                    <span class="cost-label">Inicio</span>
                    <input class="cost-input" type="date"
                        value="${esc(task.startDate||'')}"
                        onclick="event.stopPropagation()"
                        onblur="saveTaskField('${roomId}','${task.id}','startDate',this.value)">
                </div>
                <div class="cost-field">
                    <span class="cost-label">Fin previsto</span>
                    <input class="cost-input" type="date"
                        value="${esc(task.dueDate||'')}"
                        onclick="event.stopPropagation()"
                        onblur="saveTaskField('${roomId}','${task.id}','dueDate',this.value)">
                </div>
            </div>
            <div class="detail-cost-row">
                <div class="cost-field">
                    <span class="cost-label">Cantidad</span>
                    <input class="cost-input cost-qty" type="number" min="0" step="0.01"
                        value="${esc(task.qty||'')}" placeholder="0"
                        onclick="event.stopPropagation()"
                        oninput="previewCost('${task.id}')"
                        onblur="saveTaskField('${roomId}','${task.id}','qty',this.value)">
                </div>
                <div class="cost-field">
                    <span class="cost-label">Unidad</span>
                    <select class="cost-select" onclick="event.stopPropagation()"
                        onchange="saveTaskField('${roomId}','${task.id}','unit',this.value)">${unitSel}</select>
                </div>
                <span class="cost-sep">x</span>
                <div class="cost-field">
                    <span class="cost-label">EUR / unidad</span>
                    <input class="cost-input cost-price" type="number" min="0" step="0.01"
                        value="${esc(task.price||'')}" placeholder="0,00"
                        onclick="event.stopPropagation()"
                        oninput="previewCost('${task.id}')"
                        onblur="saveTaskField('${roomId}','${task.id}','price',this.value)">
                </div>
                <span class="cost-sep">=</span>
                <div class="cost-total-box">
                    <span class="cost-label">Total</span>
                    <span class="cost-total" id="costtotal_${task.id}">${cost !== null ? formatEur(cost) : '-'}</span>
                </div>
            </div>
            <textarea class="task-notes-inp" placeholder="Notas, empresa responsable, observaciones..."
                onclick="event.stopPropagation()"
                onblur="saveTaskField('${roomId}','${task.id}','notes',this.value)">${esc(task.notes||'')}</textarea>
            ${renderCertSection(roomId, task)}
        </div>
    </div>`;
}

function renderTradesList() {
    const cards = Object.entries(TRADES).map(([tid, trade]) => {
        const p      = tradeGlobalProgress(tid);
        const info   = getTradeInfo(tid);
        const color  = pctColor(p.pct);
        const timing = tradeScheduleText(info);
        return `
            <div class="trade-card" onclick="navigate('trade','${tid}')">
                <div class="trade-card-top">
                    <div class="trade-card-icon" style="background:${trade.color}1a">${trade.icon}</div>
                    <div>
                        <div class="trade-card-name">${trade.name}</div>
                        <div class="trade-card-info">
                            ${info.company ? `Empresa: ${esc(info.company)}<br>` : '<span style="color:#bbb">Sin empresa asignada</span><br>'}
                            ${info.phone ? `Telefono: ${esc(info.phone)}` : ''}
                        </div>
                        ${timing ? `<div class="trade-card-info" style="margin-top:6px">Planificacion: ${esc(timing)}</div>` : ''}
                        ${info.budget ? `<div class="trade-card-budget">${formatEur(info.budget)}</div>` : ''}
                    </div>
                </div>
                <div class="card-pbar-row"><span class="card-pbar-lbl">Progreso</span><span class="card-pct" style="color:${color}">${p.pct}%</span></div>
                <div class="card-pbar"><div class="card-pbar-fill" style="width:${p.pct}%;background:${color}"></div></div>
                <div style="font-size:12px;color:var(--text-light);margin-top:6px">${p.done}/${p.total} tareas</div>
            </div>`;
    }).join('');
    return `
        <div class="dash-header">
            <div><div class="page-title">Oficios</div><div class="page-sub">Gestiona empresas, contactos, presupuesto y tiempos por oficio.</div></div>
        </div>
        <div class="card-grid">${cards}</div>`;
}

function renderTradeDetail(tid) {
    const trade = TRADES[tid];
    if (!trade) { navigate('trades'); return ''; }
    const p      = tradeGlobalProgress(tid);
    const info   = getTradeInfo(tid);
    const color  = pctColor(p.pct);
    const timing = tradeScheduleText(info);
    const roomsWithTrade = state.rooms.filter(r => r.trades[tid]);

    const roomGroups = roomsWithTrade.length === 0
        ? `<div class="empty-state" style="padding:30px 0"><div style="font-size:32px;margin-bottom:8px">Trabajos</div><p>Ninguna estancia tiene trabajos de este oficio.</p></div>`
        : roomsWithTrade.map(room => {
            const tasks = room.trades[tid];
            const done  = tasks.filter(t => t.done).length;
            const total = tasks.length;
            const pct   = total ? Math.round(done/total*100) : 0;
            const key   = `trd_${tid}_${room.id}`;
            const tpl   = ROOM_TEMPLATES[room.type];
            return `
                <div class="room-group">
                    <div class="room-group-hdr" onclick="toggleCollapse('${key}')">
                        <span style="font-size:18px">${tpl?tpl.icon:'Casa'}</span>
                        <span class="room-group-name">${esc(room.name)}</span>
                        <span class="room-group-count">${done}/${total} · ${pct}%</span>
                        <span class="trade-chevron" id="chev_${key}">${state.collapsed[key]?'?':'?'}</span>
                    </div>
                    <div class="trade-pbar" style="background:#f0f0f0">
                        <div class="trade-pbar-fill" style="width:${pct}%;background:${trade.color}"></div>
                    </div>
                    <div class="room-group-tasks ${state.collapsed[key]?'collapsed':''}" id="body_${key}">
                        ${tasks.map(t => renderTaskRow(room.id, tid, t)).join('')}
                        ${renderAddTaskRow(room.id, tid)}
                    </div>
                </div>`;
        }).join('');

    return `
        <button class="back-btn" onclick="navigate('trades')">Volver a oficios</button>
        <div class="detail-header">
            <div class="detail-title-row">
                <span class="detail-big-icon">${trade.icon}</span>
                <div class="detail-name-wrap">
                    <div style="font-size:22px;font-weight:800;padding:2px 4px">${trade.name}</div>
                    <div class="detail-room-sub">${p.done} de ${p.total} tareas en ${roomsWithTrade.length} estancia${roomsWithTrade.length!==1?'s':''}</div>
                    ${timing ? `<div class="detail-room-sub">Planificacion: ${esc(timing)}</div>` : ''}
                </div>
                <div class="detail-pct-badge" style="color:${color}">${p.pct}%</div>
            </div>
            <div class="detail-pbar"><div class="detail-pbar-fill" style="width:${p.pct}%;background:${color}"></div></div>
            <div class="section-label">Datos del oficio</div>
            ${renderTradeInfoSection(tid, info)}
        </div>
        <div class="section-label" style="margin-top:8px">Trabajos por estancia</div>
        ${roomGroups}`;
}

const NOTE_CATEGORIES = {
    df:      { label:'Direccion Facultativa', cls:'note-cat-df' },
    gestora: { label:'Empresa Gestora', cls:'note-cat-gestora' },
    general: { label:'General', cls:'note-cat-general' },
};

function getAssignedCompaniesForProject() {
    const assignedIds = [...new Set(Object.values(state.tradeInfo || {}).map(info => info?.companyId).filter(Boolean))];
    return assignedIds
        .map(id => normalizeCompany(state.companies.find(company => company.id === id)))
        .filter(Boolean);
}

function renderProjectCompaniesPanel() {
    const companies = getAssignedCompaniesForProject();
    return `
        <div class="dash-header">
            <div><div class="page-title">Empresas del proyecto</div><div class="page-sub">Empresas asignadas a los oficios de esta obra.</div></div>
            <button class="btn btn-ghost" onclick="openGlobalCompanies()">Abrir directorio global</button>
        </div>
        ${companies.length ? `<div class="card-grid">${companies.map(c => {
            const jobs = getCompanyJobs(c.id).filter(job => job.projectId === state.currentProjectId);
            return `<div class="company-card">
                <div class="company-card-top">
                    <div class="company-avatar">EMP</div>
                    <div style="flex:1;min-width:0">
                        <div class="company-name">${esc(c.name)}</div>
                        <div class="company-meta">${c.phone ? `Telefono: ${esc(c.phone)}<br>` : ''}${c.email ? `Email: ${esc(c.email)}<br>` : ''}${c.cif ? `CIF/NIF: ${esc(c.cif)}` : ''}</div>
                    </div>
                </div>
                <div class="company-section-title">Trabajos en esta obra</div>
                ${jobs.length ? jobs.map(job => `<div class="company-job-line"><span class="company-status-badge status-${job.status.cls}">${job.status.label}</span><div><div>${esc(job.taskText || 'Trabajo')}</div><div class="company-job-meta">${esc(job.roomName)} - ${esc(job.tradeName)}</div></div></div>`).join('') : `<div class="company-empty-line">Sin trabajos asignados todavia.</div>`}
            </div>`;
        }).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">EMP</div><h2>Sin empresas asignadas</h2><p>Asigna una empresa desde cada oficio para verla aqui.</p></div>`}`;
}

function renderCollectionPanel(listKey, title, subtitle) {
    const items = getCollection(listKey);
    return `
        <div class="dash-header">
            <div><div class="page-title">${title}</div><div class="page-sub">${subtitle}</div></div>
            <button class="add-room-btn" onclick="addCollectionItem('${listKey}')">+ Añadir</button>
        </div>
        ${items.length ? `<div style="display:flex;flex-direction:column;gap:14px">${items.map(item => `
            <div class="admin-card">
                <div class="admin-inline-grid">
                    <input class="modal-input" value="${esc(item.name)}" placeholder="Nombre" oninput="updateCollectionItem('${listKey}','${item.id}','name',this.value)">
                    <input class="modal-input" value="${esc(item.space)}" placeholder="Estancia o zona" oninput="updateCollectionItem('${listKey}','${item.id}','space',this.value)">
                    <select class="modal-input" onchange="updateCollectionItem('${listKey}','${item.id}','status',this.value)">
                        <option value="pendiente" ${item.status==='pendiente'?'selected':''}>Pendiente</option>
                        <option value="pedido" ${item.status==='pedido'?'selected':''}>Pedido</option>
                        <option value="recibido" ${item.status==='recibido'?'selected':''}>Recibido</option>
                        <option value="instalado" ${item.status==='instalado'?'selected':''}>Instalado</option>
                    </select>
                    <select class="modal-input" onchange="updateCollectionItem('${listKey}','${item.id}','supplierId',this.value)">
                        <option value="">Proveedor</option>
                        ${state.suppliers.map(s => `<option value="${s.id}" ${item.supplierId===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}
                    </select>
                </div>
                <div class="admin-inline-grid" style="margin-top:12px">
                    <input class="modal-input" value="${esc(item.budget)}" placeholder="Presupuesto" oninput="updateCollectionItem('${listKey}','${item.id}','budget',this.value)">
                    <button class="btn btn-danger" onclick="deleteCollectionItem('${listKey}','${item.id}')">Eliminar</button>
                </div>
                <textarea class="modal-input" rows="3" style="margin-top:12px;resize:vertical" placeholder="Notas" oninput="updateCollectionItem('${listKey}','${item.id}','notes',this.value)">${esc(item.notes)}</textarea>
            </div>`).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">MOB</div><h2>Sin elementos todavia</h2><p>Puedes registrar aqui mobiliario o equipamiento previsto.</p></div>`}`;
}

function renderFinishesPanel() {
    const items = normalizeFinishSpecs(state.projectFinishes);
    const accepted = items.filter(item => item.status === 'aceptado').length;
    return `
        <div class="dash-header">
            <div><div class="page-title">Acabados finales</div><div class="page-sub">Selecciones propuestas por arquitectura para validacion del cliente.</div></div>
        </div>
        <div class="summary-cards">
            <div class="summary-card"><div class="sc-label">Partidas</div><div class="sc-value">${items.length}</div><div class="sc-pct">Acabados a revisar</div></div>
            <div class="summary-card s-done"><div class="sc-label">Aceptados</div><div class="sc-value">${accepted}</div><div class="sc-pct">Confirmados por cliente</div></div>
            <div class="summary-card s-pending"><div class="sc-label">Pendientes</div><div class="sc-value">${items.length - accepted}</div><div class="sc-pct">Por definir o ajustar</div></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
            ${items.map(item => `<div class="admin-card">
                <div class="dash-header" style="margin-bottom:14px">
                    <div><div style="font-size:18px;font-weight:800">${esc(item.label)}</div><div class="page-sub">Puede apoyarse en proveedor, fotografia, ficha tecnica o render.</div></div>
                    <select class="modal-input" style="max-width:220px" onchange="updateFinishSpec('${item.key}','status',this.value)">
                        <option value="pendiente" ${item.status==='pendiente'?'selected':''}>Pendiente</option>
                        <option value="propuesto" ${item.status==='propuesto'?'selected':''}>Propuesto</option>
                        <option value="aceptado" ${item.status==='aceptado'?'selected':''}>Aceptado</option>
                        <option value="cambiar" ${item.status==='cambiar'?'selected':''}>Cambiar</option>
                    </select>
                </div>
                <div class="admin-inline-grid">
                    <div class="modal-field"><label class="modal-label">Seleccion</label><input class="modal-input" value="${esc(item.selection || '')}" placeholder="Modelo, color o referencia" oninput="updateFinishSpec('${item.key}','selection',this.value)"></div>
                    <div class="modal-field"><label class="modal-label">Proveedor</label><input class="modal-input" value="${esc(item.providerUrl || '')}" placeholder="Link a proveedor" oninput="updateFinishSpec('${item.key}','providerUrl',this.value)"></div>
                </div>
                <div class="admin-inline-grid">
                    <div class="modal-field"><label class="modal-label">Fotografia</label><input class="modal-input" value="${esc(item.photoUrl || '')}" placeholder="Link a foto" oninput="updateFinishSpec('${item.key}','photoUrl',this.value)"></div>
                    <div class="modal-field"><label class="modal-label">Ficha tecnica</label><input class="modal-input" value="${esc(item.techUrl || '')}" placeholder="Link a ficha tecnica" oninput="updateFinishSpec('${item.key}','techUrl',this.value)"></div>
                </div>
                <div class="admin-inline-grid">
                    <div class="modal-field"><label class="modal-label">Render</label><input class="modal-input" value="${esc(item.renderUrl || '')}" placeholder="Link a render" oninput="updateFinishSpec('${item.key}','renderUrl',this.value)"></div>
                    <div class="modal-field"><label class="modal-label">Notas</label><input class="modal-input" value="${esc(item.notes || '')}" placeholder="Observaciones" oninput="updateFinishSpec('${item.key}','notes',this.value)"></div>
                </div>
            </div>`).join('')}
        </div>`;
}

function renderSuppliersPanel() {
    return `
        <div class="dash-header">
            <div><div class="page-title">Proveedores</div><div class="page-sub">Directorio global para materiales, acabados y mobiliario.</div></div>
            <button class="add-room-btn" onclick="openSupplierModal()">+ Nuevo proveedor</button>
        </div>
        ${state.suppliers.length ? `<div class="card-grid">${state.suppliers.map(raw => {
            const s = normalizeSupplier(raw);
            const tags = (s.categories || []).map(key => `<span class="trade-tag">${esc(SUPPLIER_CATEGORIES[key] || key)}</span>`).join('');
            return `<div class="company-card" onclick="openSupplierModal('${s.id}')"><div class="company-card-top"><div class="company-avatar">PRV</div><div style="flex:1;min-width:0"><div class="company-name">${esc(s.name)}</div><div class="company-meta">${s.address ? `${esc(s.address)}<br>` : ''}${s.phone ? `Telefono: ${esc(s.phone)}<br>` : ''}${s.email ? `Email: ${esc(s.email)}` : ''}</div></div></div>${tags ? `<div style="margin-bottom:8px">${tags}</div>` : ''}</div>`;
        }).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">PRV</div><h2>Sin proveedores registrados</h2><p>Desde aqui podras preparar materiales, acabados y mobiliario para varias obras.</p></div>`}`;
}

function renderCompaniesPanel() {
    return `
        <div class="dash-header">
            <div><div class="page-title">Gestion de empresas</div><div class="page-sub">Directorio global de empresas y autonomos.</div></div>
            <button class="add-room-btn" onclick="openCompanyModal()">+ Nueva empresa</button>
        </div>
        ${state.companies.length ? `<div class="card-grid">${state.companies.map(rawCompany => {
            const c = normalizeCompany(rawCompany);
            const jobs = getCompanyJobs(c.id);
            const lastHistory = [...(c.history || [])].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 3);
            return `<div class="company-card" onclick="openCompanyModal('${c.id}')">
                <div class="company-card-top"><div class="company-avatar">EMP</div><div style="flex:1;min-width:0"><div class="company-name">${esc(c.name)}</div><div class="company-meta">${c.address ? `${esc(c.address)}<br>` : ''}${c.cif ? `CIF/NIF: ${esc(c.cif)}<br>` : ''}${c.phone ? `Telefono: ${esc(c.phone)}<br>` : ''}${c.email ? `Email: ${esc(c.email)}` : ''}</div></div></div>
                <div class="company-summary-grid"><div class="company-summary-box"><strong>${(c.people || []).length}</strong><span>personas</span></div><div class="company-summary-box"><strong>${jobs.length}</strong><span>trabajos</span></div><div class="company-summary-box"><strong>${(c.history || []).length}</strong><span>notas</span></div></div>
                <div class="company-section-title">Contactos</div>${companyContactSummary(c) || `<div class="company-empty-line">Sin contactos.</div>`}
                <div class="company-section-title">Historial</div>${lastHistory.length ? lastHistory.map(entry => `<div class="company-history-line"><span class="company-status-badge status-${esc(entry.status || 'pendiente')}">${esc(entry.status || 'pendiente')}</span><div><div>${esc(entry.text || 'Sin texto')}</div><div class="company-job-meta">${esc(entry.project || 'General')}</div></div></div>`).join('') : `<div class="company-empty-line">Sin notas enviadas.</div>`}
            </div>`;
        }).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">EMP</div><h2>Sin empresas registradas</h2><p>Añade aqui las empresas que despues asignaras a cada oficio.</p></div>`}`;
}

function renderProjectsLayout() {
    const cards = state.projects.map(p => {
        let rooms = [];
        try { rooms = getProjectData(p.id).rooms || []; } catch (e) {}
        let total = 0, done = 0;
        rooms.forEach(r => Object.values(r.trades || {}).forEach(tasks => tasks.forEach(t => { total++; if (t.done) done++; })));
        const pct = total ? Math.round(done / total * 100) : 0;
        return `<div class="project-card" style="--proj-color:${p.color}" onclick="enterProject('${p.id}')">
            <button class="project-edit-btn" onclick="event.stopPropagation();openProjectModal('${p.id}')">Editar</button>
            ${p.coverImage ? `<div class="project-card-cover"><img src="${p.coverImage}" alt="${esc(p.name)}"></div>` : ''}
            <div class="project-card-name">${esc(p.name)}</div>
            <div class="project-card-meta">${p.address ? `${esc(p.address)}<br>` : ''}${p.description ? esc(p.description) : ''}</div>
            <div class="project-card-stats">
                <div class="proj-stat"><div class="proj-stat-val">${pct}%</div><div class="proj-stat-lbl">progreso</div></div>
                <div class="proj-stat"><div class="proj-stat-val">${done}/${total}</div><div class="proj-stat-lbl">tareas</div></div>
                <div class="proj-stat"><div class="proj-stat-val">${rooms.length}</div><div class="proj-stat-lbl">estancias</div></div>
            </div>
        </div>`;
    }).join('');
    return `<div class="projects-page">
        ${renderPortalTopbar('projects', true)}
        <input id="backupImportInput" type="file" accept=".json,application/json" onchange="importBackupFile(event)" style="display:none">
        <div class="projects-body">
            <div class="projects-title">Obras</div>
            <div class="projects-sub">${state.projects.length} proyecto${state.projects.length!==1?'s':''} - Selecciona uno para continuar. Usuario activo: ${esc(currentUserLabel())}.</div>
            <div data-storage-status style="font-size:12px;color:var(--text-light);margin:-8px 0 20px">${storageStatusText()}</div>
            <div class="card-grid">${cards}<button class="project-add-card" onclick="openProjectModal()"><span class="pa-icon">+</span><span>Nueva obra</span></button></div>
        </div>
    </div>`;
}

function renderPortalTopbar(activeView, allowNewProject = false) {
    return `<div class="projects-topbar">
        <div class="portal-brand"><span class="portal-logo">GO</span><h1>${esc(state.settings.appName || 'Gestion de Obra')}</h1></div>
        <div class="portal-tabs">
            <button class="btn ${activeView === 'control' ? 'btn-primary' : ''}" onclick="switchPortalView('control')" style="font-size:13px;padding:8px 14px">Panel de control</button>
            <button class="btn ${activeView === 'projects' ? 'btn-primary' : ''}" onclick="switchPortalView('projects')" style="font-size:13px;padding:8px 14px">Obras</button>
            <button class="btn ${activeView === 'companies' ? 'btn-primary' : ''}" onclick="switchPortalView('companies')" style="font-size:13px;padding:8px 14px">Empresas</button>
            <button class="btn ${activeView === 'suppliers' ? 'btn-primary' : ''}" onclick="switchPortalView('suppliers')" style="font-size:13px;padding:8px 14px">Proveedores</button>
        </div>
        <div class="portal-actions"><button class="btn btn-ghost" onclick="logoutUser()" style="font-size:13px;padding:8px 14px">Salir</button>${allowNewProject ? `<button class="btn btn-primary" onclick="openProjectModal()" style="font-size:13px;padding:8px 16px">+ Nueva obra</button>` : ''}</div>
    </div>`;
}

function renderPortalLayout() {
    if (state.portalView === 'projects') return renderProjectsLayout();
    if (state.portalView === 'companies') return `<div class="projects-page">${renderPortalTopbar('companies')}<div class="projects-body">${renderCompaniesPanel()}</div></div>`;
    if (state.portalView === 'suppliers') return `<div class="projects-page">${renderPortalTopbar('suppliers')}<div class="projects-body">${renderSuppliersPanel()}</div></div>`;
    return `<div class="projects-page">${renderPortalTopbar('control')}<input id="backupImportInput" type="file" accept=".json,application/json" onchange="importBackupFile(event)" style="display:none"><div class="projects-body"><div class="projects-title">Panel de control</div><div class="projects-sub">Usuarios, copias, demo y configuracion general.</div><div data-storage-status style="font-size:12px;color:var(--text-light);margin:-8px 0 20px">${storageStatusText()}</div>${renderAdminPanel()}</div></div>`;
}

function updateProjectBudget(field, value) {
    state.projectBudget = { ...emptyProjectBudget(), ...(state.projectBudget || {}), [field]: value };
    saveState();
    renderAll();
}

function renderProjectBudgetPanel() {
    const budget = { ...emptyProjectBudget(), ...(state.projectBudget || {}) };
    const clientBudget = parseMoney(budget.clientBudget);
    const repercutedBudget = parseMoney(budget.repercutedBudget);
    const estimatedCost = getMaterialsData().totalCost;
    const effectiveCost = repercutedBudget !== null ? repercutedBudget : estimatedCost;
    const marginAmount = clientBudget !== null && effectiveCost !== null ? clientBudget - effectiveCost : null;
    const marginPct = clientBudget && marginAmount !== null ? (marginAmount / clientBudget) * 100 : null;
    return `<div class="location-card" style="margin-bottom:16px">
        <div class="dash-header" style="margin-bottom:16px"><div><div class="page-title" style="font-size:20px">Presupuesto de obra</div><div class="page-sub">Control entre presupuesto al cliente y coste repercutido.</div></div></div>
        <div class="summary-cards" style="margin-bottom:18px">
            <div class="summary-card s-total"><div class="sc-label">Presupuesto cliente</div><div class="sc-value">${clientBudget !== null ? formatEur(clientBudget) : '—'}</div><div class="sc-pct">Venta aprobada</div></div>
            <div class="summary-card s-pending"><div class="sc-label">Repercutido / coste</div><div class="sc-value">${effectiveCost !== null ? formatEur(effectiveCost) : '—'}</div><div class="sc-pct">${repercutedBudget !== null ? 'Valor manual' : 'Calculado desde materiales'}</div></div>
            <div class="summary-card ${marginAmount !== null && marginAmount >= 0 ? 's-done' : 's-total'}"><div class="sc-label">Margen estimado</div><div class="sc-value">${marginAmount !== null ? formatEur(marginAmount) : '—'}</div><div class="sc-pct">${marginPct !== null ? `${marginPct.toFixed(1)}% sobre venta` : 'Completa importes'}</div></div>
        </div>
        <div class="admin-inline-grid">
            <div class="modal-field"><label class="modal-label">Presupuesto dado al cliente</label><input class="modal-input" value="${esc(budget.clientBudget || '')}" placeholder="Ej: 18500" oninput="updateProjectBudget('clientBudget',this.value)"></div>
            <div class="modal-field"><label class="modal-label">Presupuesto repercutido</label><input class="modal-input" value="${esc(budget.repercutedBudget || '')}" placeholder="Si lo quieres fijar manualmente" oninput="updateProjectBudget('repercutedBudget',this.value)"></div>
            <div class="modal-field"><label class="modal-label">Margen objetivo (%)</label><input class="modal-input" value="${esc(budget.targetMargin || '')}" placeholder="Ej: 18" oninput="updateProjectBudget('targetMargin',this.value)"></div>
            <div class="modal-field"><label class="modal-label">Fecha de aprobacion</label><input class="modal-input" type="date" value="${esc(budget.approvedDate || '')}" oninput="updateProjectBudget('approvedDate',this.value)"></div>
        </div>
        <div class="modal-field" style="margin-top:14px"><label class="modal-label">Notas de presupuesto</label><textarea class="modal-input" rows="3" style="resize:vertical" placeholder="Condiciones, cambios, observaciones..." oninput="updateProjectBudget('notes',this.value)">${esc(budget.notes || '')}</textarea></div>
    </div>`;
}

function renderDocumentsPanel() {
    const totalDocs = Object.values(state.documents).reduce((n, arr) => n + (arr || []).length, 0);
    const proj = state.projects.find(p => p.id === state.currentProjectId) || {};
    const address = proj.address || '';
    const locationNotes = proj.locationNotes || '';
    const mapsUrl = address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : '';
    const sections = Object.entries(DOC_CATEGORIES).map(([key, cat]) => {
        const docs = state.documents[key] || [];
        const colKey = 'doc_' + key;
        const collapsed = !!state.collapsed[colKey];
        return `<div class="doc-cat-section">
            <div class="doc-cat-hdr" onclick="toggleCollapse('${colKey}')"><span class="doc-cat-icon">${cat.icon}</span><div class="doc-cat-info"><div class="doc-cat-name">${cat.label}</div><div class="doc-cat-desc">${cat.desc}</div></div><span class="doc-cat-count">${docs.length} doc${docs.length !== 1 ? 's' : ''}</span><span class="trade-chevron" id="chev_${colKey}">${collapsed ? '?' : '?'}</span></div>
            <div class="trade-tasks ${collapsed ? 'collapsed' : ''}" id="body_${colKey}" style="padding:0">
                <div class="doc-list">
                    ${docs.map(d => `<div class="doc-item"><span class="doc-type-icon">${d.fileType === 'application/pdf' ? 'PDF' : d.fileType?.startsWith('image/') ? 'IMG' : 'DOC'}</span><input class="doc-name-inp" value="${esc(d.name)}" placeholder="Nombre del documento" onblur="saveDocField('${key}','${d.id}','name',this.value)"><input class="doc-notes-inp" value="${esc(d.notes)}" placeholder="Notas..." onblur="saveDocField('${key}','${d.id}','notes',this.value)"><span class="doc-date">${new Date(d.date).toLocaleDateString('es-ES')}</span><button class="doc-btn doc-btn-view" onclick="viewDocument('${d.docId}')">Ver</button><button class="doc-btn doc-btn-del" onclick="deleteDocument('${key}','${d.id}')">X</button></div>`).join('') || `<div class="doc-empty">Sin documentos en esta categoria.</div>`}
                    <div class="doc-dropzone" id="docdrop_${key}" ondragover="handleDocDragOver(event,'${key}')" ondragleave="handleDocDragLeave('${key}')" ondrop="handleDocDrop(event,'${key}')">Arrastra archivos aqui o usa el boton de añadir</div>
                    <div class="doc-add-row"><button class="btn btn-ghost" style="font-size:13px" onclick="uploadDocument('${key}')">+ Añadir documento</button></div>
                </div>
            </div>
        </div>`;
    }).join('');
    return `<div class="dash-header"><div><div class="page-title">Documentos</div><div class="page-sub">Proyecto, direccion, permisos y presupuesto · ${totalDocs} documento${totalDocs !== 1 ? 's' : ''}.</div></div></div>
        <div class="location-card" style="margin-bottom:16px"><div class="location-main">${address ? `Direccion: ${esc(address)}` : 'Direccion pendiente de completar'}</div><div class="location-sub">${mapsUrl ? `<a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Abrir en Google Maps</a>` : 'Añade la direccion en la ficha del proyecto.'}</div><div class="location-grid"><div class="location-box"><div class="location-box-title">Direccion de obra</div><div class="location-box-text">${address ? esc(address) : 'Sin direccion todavia.'}</div></div><div class="location-box"><div class="location-box-title">Indicaciones de acceso</div><div class="location-box-text">${locationNotes ? esc(locationNotes) : 'Sin indicaciones todavia.'}</div></div></div></div>
        ${renderProjectBudgetPanel()}
        ${sections}`;
}

function renderNotesPanel() {
    const notesList = state.projectNotes.length === 0
        ? `<div class="empty-state" style="padding:30px 0"><div style="font-size:40px;margin-bottom:12px">NOT</div><h2>Sin notas todavia</h2><p>Añade notas de seguimiento, actas o instrucciones del proyecto.</p></div>`
        : state.projectNotes.map(n => {
            const cat = NOTE_CATEGORIES[n.category] || NOTE_CATEGORIES.general;
            const date = new Date(n.date).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
            return `<div class="note-entry"><span class="note-cat-badge ${cat.cls}">${cat.label}</span><div class="note-body"><div class="note-date">${date}</div><div class="note-text">${esc(n.text)}</div></div><button class="note-del-btn" onclick="deleteNote('${n.id}')">X</button></div>`;
        }).join('');
    return `<div class="dash-header"><div><div class="page-title">Notas internas</div><div class="page-sub">Seguimiento para direccion facultativa, gestora y equipo.</div></div></div>
        <div class="note-add-box"><div class="section-label">Nueva nota</div><div class="note-controls"><select class="note-cat-sel" id="noteCatSel"><option value="df">Direccion Facultativa</option><option value="gestora">Empresa Gestora</option><option value="general" selected>General</option></select><span style="font-size:12px;color:var(--text-light)">Ctrl+Enter para guardar</span></div><div class="note-add-row"><textarea class="note-textarea" id="noteTextarea" placeholder="Escribe una nota, incidencia o instruccion..." onkeydown="if(event.key==='Enter'&&(event.ctrlKey||event.metaKey))addNote()"></textarea><button class="btn btn-primary" onclick="addNote()" style="flex-shrink:0">Añadir</button></div></div>
        ${notesList}`;
}

function renderPhotosPanel() {
    const tabs = `<div class="photo-section-tabs"><button class="photo-tab ${_photoMode==='before'?'active':''}" onclick="_photoMode='before';renderAll()">Antes</button><button class="photo-tab ${_photoMode==='during'?'active':''}" onclick="_photoMode='during';renderAll()">Durante</button><button class="photo-tab ${_photoMode==='final'?'active':''}" onclick="_photoMode='final';renderAll()">Finales</button><button class="photo-tab ${_photoMode==='recreation3d'?'active':''}" onclick="_photoMode='recreation3d';renderAll()">Recreacion 3D</button><button class="photo-tab ${_photoMode==='certs'?'active':''}" onclick="_photoMode='certs';renderAll()">Certificaciones</button></div>`;
    if (_photoMode === 'before') {
        if (!state.rooms.length) return `<div class="dash-header"><div><div class="page-title">Fotos</div></div></div>${tabs}<div class="empty-state"><div class="empty-icon">FOT</div><h2>Sin estancias</h2><p>Añade estancias primero para organizar las fotos.</p></div>`;
        if (!_photoRoomId || !state.rooms.find(r => r.id === _photoRoomId)) _photoRoomId = state.rooms[0].id;
        const roomBtns = state.rooms.map(r => `<button class="photo-room-btn ${r.id===_photoRoomId?'active':''}" onclick="_photoRoomId='${r.id}';renderAll()">${ROOM_TEMPLATES[r.type]?.icon||'RM'} ${esc(r.name)}${(state.sectionPhotos[r.id]||[]).length?` <span style="opacity:.6">(${(state.sectionPhotos[r.id]||[]).length})</span>`:''}</button>`).join('');
        const entries = state.sectionPhotos[_photoRoomId] || [];
        return `<div class="dash-header"><div><div class="page-title">Fotos</div><div class="page-sub">Registro visual antes de la obra.</div></div></div>${tabs}<div class="photo-room-selector">${roomBtns}</div><div class="photo-grid">${entries.map(e => {
            const src = getPhoto(e.photoId); if (!src) return '';
            return `<div class="photo-card"><img src="${src}" onclick="openLightbox('${src}')"><button class="photo-del-btn" onclick="deleteSectionPhoto('${_photoRoomId}','${e.id}')">X</button><div class="photo-card-body"><input class="photo-caption-inp" value="${esc(e.caption)}" placeholder="Añade descripcion..." onblur="saveSectionCaption('${_photoRoomId}','${e.id}',this.value)"><div style="font-size:10px;color:#ccc;margin-top:2px">${new Date(e.date).toLocaleDateString('es-ES')}</div></div></div>`;
        }).join('')}<button class="photo-add-btn" onclick="addSectionPhoto('${_photoRoomId}')"><span class="pa-icon">+</span><span>Añadir foto</span></button></div>`;
    }
    if (_photoMode === 'during' || _photoMode === 'final' || _photoMode === 'recreation3d') {
        const galleryKey = _photoMode;
        const titleMap = { during:'Fotos durante la obra', final:'Fotos finales', recreation3d:'Recreacion 3D' };
        const subMap = { during:'Seguimiento visual del avance.', final:'Resultado final para entrega.', recreation3d:'Renders y apoyo visual del estudio.' };
        const entries = ensureGallery(galleryKey);
        return `<div class="dash-header"><div><div class="page-title">${titleMap[galleryKey]}</div><div class="page-sub">${subMap[galleryKey]}</div></div></div>${tabs}<div class="photo-grid">${entries.map(e => {
            const src = getPhoto(e.photoId); if (!src) return '';
            return `<div class="photo-card"><img src="${src}" onclick="openLightbox('${src}')"><button class="photo-del-btn" onclick="deleteProjectGalleryPhoto('${galleryKey}','${e.id}')">X</button><div class="photo-card-body"><input class="photo-caption-inp" value="${esc(e.caption)}" placeholder="Añade descripcion..." onblur="saveProjectGalleryCaption('${galleryKey}','${e.id}',this.value)"><div style="font-size:10px;color:#ccc;margin-top:2px">${new Date(e.date).toLocaleDateString('es-ES')}</div></div></div>`;
        }).join('')}<button class="photo-add-btn" onclick="addProjectGalleryPhoto('${galleryKey}')"><span class="pa-icon">+</span><span>Añadir imagen</span></button></div>`;
    }
    const certTasks = [];
    state.rooms.forEach(room => Object.entries(room.trades).forEach(([tid, tasks]) => tasks.filter(t => t.certPhotoId).forEach(t => certTasks.push({ task:t, room, trade:TRADES[tid] }))));
    const CERT_LABELS = { pending:'Pendiente', approved:'Aprobado', revision:'Revision' };
    const CERT_CLS = { pending:'cert-pending', approved:'cert-approved', revision:'cert-revision' };
    return `<div class="dash-header"><div><div class="page-title">Fotos</div><div class="page-sub">Certificaciones de trabajos realizados.</div></div></div>${tabs}${certTasks.length ? `<div class="photo-grid">${certTasks.map(({task,room,trade}) => {
        const src = getPhoto(task.certPhotoId); if (!src) return '';
        return `<div class="photo-card"><img src="${src}" onclick="openLightbox('${src}')"><div class="photo-card-body"><div style="font-size:12px;font-weight:600;margin-bottom:3px">${esc(task.text)}</div><div style="font-size:11px;color:var(--text-light);margin-bottom:4px">${trade?.name || ''} - ${esc(room.name)}</div><span class="cert-status-badge ${CERT_CLS[task.certStatus]||'cert-pending'}" style="font-size:10px">${CERT_LABELS[task.certStatus]||'Pendiente'}</span>${task.certComment ? `<div style="font-size:11px;color:#888;margin-top:4px;font-style:italic">${esc(task.certComment)}</div>` : ''}</div></div>`;
    }).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">CER</div><h2>Sin certificaciones todavia</h2><p>Sube fotos desde cada tarea para documentar y certificar los trabajos.</p></div>`}`;
}

function renderContent() {
    switch (state.view) {
        case 'admin': return renderAdminPanel();
        case 'dashboard': return renderDashboard();
        case 'room': return renderRoomDetail(state.currentRoom);
        case 'trades': return renderTradesList();
        case 'trade': return renderTradeDetail(state.currentTrade);
        case 'materials': return renderMaterialsPanel();
        case 'docs': return renderDocumentsPanel();
        case 'companies': return renderProjectCompaniesPanel();
        case 'notes': return renderNotesPanel();
        case 'photos': return renderPhotosPanel();
        case 'calendar': return renderCalendarPanel();
        case 'finishes': return renderFinishesPanel();
        case 'furniture': return renderCollectionPanel('projectFurniture', 'Mobiliario', 'Listado de mobiliario previsto, pedido, recibido o instalado.');
        default: return renderDashboard();
    }
}

function showRecoveryScreen(err) {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = `
        <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f0f2f5">
            <div style="max-width:560px;width:100%;background:white;border-radius:18px;padding:28px;box-shadow:0 10px 30px rgba(0,0,0,.08)">
                <div style="font-size:28px;font-weight:800;margin-bottom:8px">La app ha encontrado un error</div>
                <div style="font-size:14px;color:#7f8c8d;line-height:1.6;margin-bottom:18px">Ahora ya no debería quedarse en blanco. Puedes recargar o reiniciar los datos guardados de este navegador.</div>
                <div style="background:#fafafa;border:1px solid #eee;border-radius:12px;padding:14px;font-size:12px;color:#555;white-space:pre-wrap;word-break:break-word;margin-bottom:18px">${esc(err?.message || String(err))}</div>
                <div style="display:flex;gap:10px;flex-wrap:wrap">
                    <button class="btn btn-primary" onclick="location.reload()">Recargar</button>
                    <button class="btn" onclick="restoreEmergencyBackup()">Restaurar copia local</button>
                    <button class="btn btn-danger" onclick="resetAllStorage()">Reiniciar datos guardados</button>
                </div>
            </div>
        </div>`;
}

function resetAllStorage() {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('obra_')) localStorage.removeItem(key);
    });
    location.reload();
}

function renderAll() {
    try {
        if (!state.currentUser) {
            document.getElementById('app').innerHTML = renderLoginLayout();
            return;
        }
        if (!state.currentProjectId && (state.view === 'projects' || state.view === 'admin')) {
            document.getElementById('app').innerHTML = renderPortalLayout();
            return;
        }
        if (state.view === 'admin') {
            const op = overallProgress();
            document.getElementById('app').innerHTML = `
                <div class="header">
                    <button class="proj-back-btn" onclick="exitToProjects()">Proyectos</button>
                    <span class="proj-name-badge">${esc(state.settings.appName || 'Gestion de Obra')}</span>
                    <div class="header-tabs">
                        <button class="header-tab active" onclick="navigate('admin')">Administracion</button>
                    </div>
                    <div class="header-progress">
                        <span data-storage-status style="font-size:11px;color:var(--text-light);margin-right:8px">${storageStatusText()}</span>
                        <span style="font-size:11px;color:rgba(255,255,255,.8)">${esc(currentUserLabel())}</span>
                        <span>${op.done}/${op.total}</span>
                        <div class="hpbar"><div class="hpbar-fill" style="width:${op.pct}%"></div></div>
                        <span class="hpct">${op.pct}%</span>
                        <button class="btn btn-ghost" onclick="logoutUser()" style="padding:6px 10px;font-size:12px">Salir</button>
                    </div>
                </div>
                <div class="main">
                    <div class="sidebar">${renderSidebar()}</div>
                    <div class="content" id="content">${renderContent()}</div>
                </div>`;
            return;
        }
        if (!state.currentProjectId || state.view === 'projects') {
            document.getElementById('app').innerHTML = renderPortalLayout();
            return;
        }

        const contentEl = document.getElementById('content');
        const scrollY   = contentEl ? contentEl.scrollTop : 0;
        const op        = overallProgress();
        const inEst     = state.view === 'dashboard'  || state.view === 'room';
        const inMat     = state.view === 'materials';
        const inDoc     = state.view === 'docs';
        const inFot     = state.view === 'photos';
        const inCal     = state.view === 'calendar';
        const inEmp     = state.view === 'companies';
        const inNot     = state.view === 'notes';
        const inFin     = state.view === 'finishes';
        const inMob     = state.view === 'furniture';
        const proj      = state.projects.find(p => p.id === state.currentProjectId);

        document.getElementById('app').innerHTML = `
            <div class="header">
                <button class="proj-back-btn" onclick="exitToProjects()">Proyectos</button>
                <button class="proj-name-badge" title="${esc(proj?.name||'')}" onclick="navigate('dashboard')">${esc(proj?.name||'Obra')}</button>
                <div class="header-tabs">
                    <button class="header-tab ${inEst?'active':''}" onclick="navigate('dashboard')">Estancias</button>
                    <button class="header-tab ${inDoc?'active':''}" onclick="navigate('docs')">Documentos</button>
                    <button class="header-tab ${inCal?'active':''}" onclick="navigate('calendar')">Calendario</button>
                    <button class="header-tab ${inMat?'active':''}" onclick="navigate('materials')">Materiales</button>
                    <button class="header-tab ${inFin?'active':''}" onclick="navigate('finishes')">Acabados</button>
                    <button class="header-tab ${inMob?'active':''}" onclick="navigate('furniture')">Mobiliario</button>
                    <button class="header-tab ${inFot?'active':''}" onclick="navigate('photos')">Fotos</button>
                    <button class="header-tab ${inEmp?'active':''}" onclick="navigate('companies')">Empresas</button>
                    <button class="header-tab ${inNot?'active':''}" onclick="navigate('notes')">Notas</button>
                </div>
                <div class="header-progress">
                    <span data-storage-status style="font-size:11px;color:var(--text-light);margin-right:8px">${storageStatusText()}</span>
                    <span style="font-size:11px;color:rgba(255,255,255,.8)">${esc(currentUserLabel())}</span>
                    <span>${op.done}/${op.total}</span>
                    <div class="hpbar"><div class="hpbar-fill" style="width:${op.pct}%"></div></div>
                    <span class="hpct">${op.pct}%</span>
                    <button class="btn btn-ghost" onclick="logoutUser()" style="padding:6px 10px;font-size:12px">Salir</button>
                </div>
            </div>
            <div class="main">
                <div class="sidebar">${renderSidebar()}</div>
                <div class="content" id="content">${renderContent()}</div>
            </div>`;

        const newContent = document.getElementById('content');
        if (newContent && scrollY) newContent.scrollTop = scrollY;
    } catch (err) {
        console.error(err);
        showRecoveryScreen(err);
    }
}

// ================================================================
// BOOT
// ================================================================

initAccess();
initState();
renderAll();
bootFolderPersistence();
