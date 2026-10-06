/* SPINGIII — calisthenics program PWA
   Data: program.json (coach-edited, published to GitHub) + local log (athlete). */
'use strict';

/* ───────────────── constants ───────────────── */
const DAY_IDS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const SKILLS = ['hspu', 'fl', 'pl', 'rest'];

const T = {
  en: {
    week: 'Week', history: 'History', settings: 'Settings', today: 'Today',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    daysLong: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    skill: { hspu: 'Handstand push-ups', fl: 'Front lever', pl: 'Planche', rest: 'Rest' },
    restDay: 'Rest day', recover: 'Recover. Walk, stretch, eat well, sleep.',
    exercises: 'exercises', sets: 'sets', min: 'min',
    warmup: 'Warm-up', warmupHint: '≈ 5 min, every session',
    rest: 'Rest', band: 'Band', bandOpt: 'Band if needed', optional: 'Optional',
    last: 'Last time', set: 'Set', goal: 'Goal',
    notePh: 'How did it feel? Anything to tell the coach?',
    share: 'Share session', shared: 'Copied — paste it in the chat',
    sessions: 'Sessions', thisWeek: 'This week', setsLogged: 'Sets logged',
    progress: 'Progress', recent: 'Recent sessions', best: 'best set',
    noLog: 'Nothing logged yet. Open a training day and type your reps or seconds into the boxes.',
    open: 'Open', date: 'Date', bestH: 'Best', delete: 'Delete session', confirm: 'Tap again to confirm',
    deleted: 'Deleted', back: 'Back',
    language: 'Language', palette: 'Palette', reorder: 'Reorder', done: 'Done', yourOrder: 'Your order', resetOrder: 'Back to coach’s order', orderReset: 'Coach changed the plan — your order was reset', wSame: 'same skill two days in a row', wPush: 'two pushing days in a row (shoulders and wrists)', wStreak: '{n} training days in a row without rest', moveUp: 'Move up', moveDown: 'Move down', dragHint: 'Hold a day and drag it', drag: 'Drag', coachMode: 'Coach mode', coachModeD: 'Edit the program and publish it.',
    data: 'Your log', exportLog: 'Export log', exportLogD: 'Send your log to your coach (JSON file).',
    importLog: 'Import log', importLogD: 'Merge a log file into this device.', imported: 'Log imported',
    resetLog: 'Delete all logs', resetLogD: 'Cannot be undone.', cleared: 'Log cleared',
    keys: 'Keyboard', install: 'Install', installD: 'Add to Home Screen from your browser’s Share menu to use it like an app, offline too.',
    updated: 'Program updated', coach: 'Coach', athlete: 'Athlete',
    editProgram: 'Edit program', unpublished: 'Unpublished changes', publish: 'Publish', publishing: 'Publishing…',
    published: 'Published — live in a minute', discard: 'Discard changes', discarded: 'Changes discarded',
    download: 'Download program.json', github: 'GitHub', ghD: 'Publishing saves program.json to your repo. The token stays on this device only.',
    owner: 'Owner', repo: 'Repository', branch: 'Branch', token: 'Token',
    needToken: 'Add your GitHub details first', bands: 'Bands', addEx: 'Add exercise', addItem: 'Add item',
    name: 'Name', note: 'Note', kind: 'Type', reps: 'Reps', secs: 'Seconds', from: 'Goal', to: 'Up to', plus: 'or more',
    restS: 'Rest (s)', bandUse: 'Band', bandNo: 'No', bandYes: 'Always', bandMaybe: 'If needed',
    title: 'Title', dose: 'Dose', short: 'Short', color: 'Colour',
    offline: 'Offline — showing the saved program', loadFail: 'Couldn’t load the program. Connect to the internet once and reload.',
    newEx: 'New exercise',
  },
  it: {
    week: 'Settimana', history: 'Storico', settings: 'Impostazioni', today: 'Oggi',
    days: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    daysLong: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
    months: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
    skill: { hspu: 'Piegamenti in verticale', fl: 'Front lever', pl: 'Planche', rest: 'Riposo' },
    restDay: 'Giorno di riposo', recover: 'Recupera. Cammina, allunga, mangia bene, dormi.',
    exercises: 'esercizi', sets: 'serie', min: 'min',
    warmup: 'Riscaldamento', warmupHint: '≈ 5 min, ogni sessione',
    rest: 'Recupero', band: 'Elastico', bandOpt: 'Elastico se serve', optional: 'Facoltativo',
    last: 'L’ultima volta', set: 'Serie', goal: 'Obiettivo',
    notePh: 'Com’è andata? Qualcosa da dire al coach?',
    share: 'Condividi sessione', shared: 'Copiato — incollalo in chat',
    sessions: 'Sessioni', thisWeek: 'Questa settimana', setsLogged: 'Serie registrate',
    progress: 'Progressi', recent: 'Sessioni recenti', best: 'serie migliore',
    noLog: 'Ancora niente. Apri un giorno di allenamento e scrivi ripetizioni o secondi nei riquadri.',
    open: 'Apri', date: 'Data', bestH: 'Migliore', delete: 'Elimina sessione', confirm: 'Tocca di nuovo per confermare',
    deleted: 'Eliminata', back: 'Indietro',
    language: 'Lingua', palette: 'Palette', reorder: 'Riordina', done: 'Fatto', yourOrder: 'Il tuo ordine', resetOrder: 'Torna all’ordine del coach', orderReset: 'Il coach ha cambiato il piano: il tuo ordine è stato ripristinato', wSame: 'stessa skill due giorni di fila', wPush: 'due giorni di spinta di fila (spalle e polsi)', wStreak: '{n} giorni di allenamento di fila senza riposo', moveUp: 'Sposta su', moveDown: 'Sposta giù', dragHint: 'Tieni premuto un giorno e trascinalo', drag: 'Trascina', coachMode: 'Modalità coach', coachModeD: 'Modifica il programma e pubblicalo.',
    data: 'Il tuo storico', exportLog: 'Esporta storico', exportLogD: 'Invia lo storico al coach (file JSON).',
    importLog: 'Importa storico', importLogD: 'Unisci un file di storico su questo dispositivo.', imported: 'Storico importato',
    resetLog: 'Elimina tutto lo storico', resetLogD: 'Non si può annullare.', cleared: 'Storico eliminato',
    keys: 'Tastiera', install: 'Installa', installD: 'Aggiungi alla schermata Home dal menu Condividi del browser: funziona come un’app, anche offline.',
    updated: 'Programma aggiornato', coach: 'Coach', athlete: 'Atleta',
    editProgram: 'Modifica programma', unpublished: 'Modifiche non pubblicate', publish: 'Pubblica', publishing: 'Pubblico…',
    published: 'Pubblicato — online tra un minuto', discard: 'Annulla modifiche', discarded: 'Modifiche annullate',
    download: 'Scarica program.json', github: 'GitHub', ghD: 'Pubblicare salva program.json nel tuo repo. Il token resta solo su questo dispositivo.',
    owner: 'Owner', repo: 'Repository', branch: 'Branch', token: 'Token',
    needToken: 'Prima inserisci i dati GitHub', bands: 'Elastici', addEx: 'Aggiungi esercizio', addItem: 'Aggiungi voce',
    name: 'Nome', note: 'Nota', kind: 'Tipo', reps: 'Ripetizioni', secs: 'Secondi', from: 'Obiettivo', to: 'Fino a', plus: 'o più',
    restS: 'Recupero (s)', bandUse: 'Elastico', bandNo: 'No', bandYes: 'Sempre', bandMaybe: 'Se serve',
    title: 'Titolo', dose: 'Dose', short: 'Sigla', color: 'Colore',
    offline: 'Offline — programma salvato', loadFail: 'Impossibile caricare il programma. Connettiti una volta e ricarica.',
    newEx: 'Nuovo esercizio',
  },
};

/* ───────────────── storage ───────────────── */
const store = {
  get(k, d) { try { const v = localStorage.getItem('spingiii.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('spingiii.' + k, JSON.stringify(v)); } catch { } },
  del(k) { try { localStorage.removeItem('spingiii.' + k); } catch { } },
};

/* ───────────────── state ───────────────── */
const S = {
  lang: store.get('lang', (navigator.language || '').toLowerCase().startsWith('it') ? 'it' : 'en'),
  program: store.get('program', null) || window.__PROGRAM__ || null,
  draft: store.get('draft', null),
  coach: store.get('coach', false),
  log: store.get('log', { sessions: {} }),
  gh: store.get('gh', null),
  palette: store.get('palette', 'sardegna'),
  order: store.get('order', null), // athlete's own day order: { ids, base }
  reorder: false,
  route: [],
  ctx: {},
  loaded: false,
};
const t = (k) => T[S.lang][k] ?? T.en[k] ?? k;
const L = (o) => (o && (o[S.lang] || o.en)) || '';
const baseP = () => (S.coach && S.draft) || S.program;
// Coach mode shows the coach's order; otherwise the athlete's own order (if set) sits on top of it.
function P() {
  const b = baseP();
  if (!b || S.coach || !S.order) return b;
  const ids = S.order.ids;
  if (ids.length !== b.days.length || !ids.every((id) => b.days.some((d) => d.id === id))) return b;
  return { ...b, days: ids.map((id) => b.days.find((d) => d.id === id)) };
}
function orderWarnings(days) {
  const w = []; const n = days.length; const push = (s) => s === 'hspu' || s === 'pl';
  for (let i = 0; i < n; i++) {
    const a = days[i], b = days[(i + 1) % n];
    if (a.skill === 'rest' || b.skill === 'rest') continue;
    const pair = `${t('days')[i]} → ${t('days')[(i + 1) % n]}`;
    if (a.skill === b.skill) w.push(`${pair}: ${t('wSame')}`);
    else if (push(a.skill) && push(b.skill)) w.push(`${pair}: ${t('wPush')}`);
  }
  let run = 0, max = 0;
  for (let k = 0; k < 2 * n; k++) { if (days[k % n].skill !== 'rest') max = Math.max(max, ++run); else run = 0; }
  if (max >= 4 && max < 2 * n) w.push(t('wStreak').replace('{n}', Math.min(max, n)));
  return w;
}
const saveLog = () => store.set('log', S.log);
const saveDraft = () => { store.set('draft', S.draft); updateDraftBar(); };
const clone = (o) => JSON.parse(JSON.stringify(o));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ───────────────── palettes ───────────────── */
const PALETTES = [
  { id: 'sardegna', name: 'Sardegna', bg: '#EFE6D6', ink: '#2A231F', c: ['#C4532F', '#17666F', '#D99A2B'] },
  { id: 'munari', name: 'Munari', bg: '#F1ECE3', ink: '#151515', c: ['#E03C24', '#2347C6', '#F2B200'] },
  { id: 'notte', name: 'Notte', bg: '#131313', ink: '#EEEAE2', c: ['#FF5B23', '#9A8CFF', '#C9EE4A'] },
];
function applyPalette() {
  const p = PALETTES.find((x) => x.id === S.palette) || PALETTES[0];
  document.documentElement.dataset.palette = p.id;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', p.bg);
}

/* ───────────────── dates ───────────────── */
const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseYmd = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const dowIdx = (d) => (d.getDay() + 6) % 7; // Mon = 0
const todayStr = () => ymd(new Date());
const fmtDate = (s) => { const d = parseYmd(s); return `${t('days')[dowIdx(d)]} ${d.getDate()} ${t('months')[d.getMonth()]}`; };
function weekStart(d = new Date()) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - dowIdx(x)); return x; }

/* ───────────────── program helpers ───────────────── */
function dose(ex) {
  const u = ex.kind === 'secs' ? 's' : '';
  const r = ex.max != null && ex.max !== '' && Number(ex.max) !== Number(ex.min)
    ? `${ex.min}–${ex.max}${u}` : `${ex.min}${u}${ex.plus ? '+' : ''}`;
  return `${ex.sets} × ${r}`;
}
const fmtRest = (s) => (s >= 60 ? `${Math.floor(s / 60)}:${pad(s % 60)}` : `${s}s`);
const dayById = (id) => P()?.days.find((d) => d.id === id);
const exKey = (ex) => (ex.name?.en || ex.id).trim().toLowerCase();
function estMinutes(day) {
  const s = day.exercises.reduce((a, ex) => a + ex.sets * ((Number(ex.rest) || 90) + 35), 0);
  return Math.round((s + 300) / 300) * 5;
}
function mark(skill, size = 18, color) {
  const c = color || `var(--${skill})`;
  const a = `viewBox="0 0 20 20" width="${size}" height="${size}" aria-hidden="true" class="mk"`;
  if (skill === 'hspu') return `<svg ${a}><circle cx="10" cy="10" r="9" fill="${c}"/></svg>`;
  if (skill === 'fl') return `<svg ${a}><rect x="1.5" y="1.5" width="17" height="17" fill="${c}"/></svg>`;
  if (skill === 'pl') return `<svg ${a}><path d="M10 1.2 L19.2 18.5 H0.8 Z" fill="${c}"/></svg>`;
  return `<svg ${a}><circle cx="10" cy="10" r="8" fill="none" stroke="${color || 'var(--rest)'}" stroke-width="2" stroke-dasharray="3 3"/></svg>`;
}
const skillVars = (s) => (s === 'rest' ? '' : `--skill:var(--${s});--on-skill:var(--on-${s})`);

/* ───────────────── log helpers ───────────────── */
const hasData = (s) => s && (Object.values(s.sets || {}).some((a) => a.some((x) => x && x.v != null)) || (s.note || '').trim());
const sessions = () => Object.values(S.log.sessions).filter(hasData).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
function getSession(date, dayId, create) {
  const id = `${date}_${dayId}`;
  if (!S.log.sessions[id] && create) S.log.sessions[id] = { id, date, dayId, sets: {}, warm: [], note: '' };
  return S.log.sessions[id];
}
function lastFor(exId, excludeId) {
  for (const s of sessions()) {
    if (s.id === excludeId) continue;
    const a = s.sets[exId];
    if (a && a.some((x) => x && x.v != null)) return { s, sets: a };
  }
  return null;
}
const bandById = (id) => P()?.bands.find((b) => b.id === id) || { id: 'none', short: '—', color: '' };
function shownBand(sess, last, exId, i) {
  const a = sess?.sets[exId] || [];
  if (a[i]?.b) return a[i].b;
  for (let j = i - 1; j >= 0; j--) if (a[j]?.b) return a[j].b;
  if (last?.sets[i]?.b) return last.sets[i].b;
  return 'none';
}
const fmtVal = (v, kind) => (v == null ? '·' : `${v}${kind === 'secs' ? 's' : ''}`);

/* ───────────────── toast ───────────────── */
let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ───────────────── views ───────────────── */
function topbar(extra = '') {
  return `<header class="top">
    <a class="wordmark" href="#/"><span class="marks">${mark('hspu', 10)}${mark('fl', 10)}${mark('pl', 10)}</span>SPINGIII</a>
    <div style="display:flex;gap:10px;align-items:center">${extra}
      <div class="lang" role="group" aria-label="${t('language')}">
        <button data-act="lang" data-v="en" aria-pressed="${S.lang === 'en'}">EN</button><button data-act="lang" data-v="it" aria-pressed="${S.lang === 'it'}">IT</button>
      </div></div></header>${draftBar()}`;
}
function draftBar() {
  if (!S.coach || !S.draft) return '<div id="draftbar"></div>';
  return `<div id="draftbar"><div class="draftbar"><span>${t('unpublished')}</span><a href="#/coach">${t('publish')} →</a></div></div>`;
}
function updateDraftBar() { const el = document.getElementById('draftbar'); if (el) el.outerHTML = draftBar(); }

function strip(activeId) {
  const p = P(); const ws = ymd(weekStart()); const today = dowIdx(new Date());
  return `<nav class="strip" aria-label="${t('week')}">${p.days.map((d, i) => {
    const done = sessions().some((s) => s.dayId === d.id && s.date >= ws);
    const rest = d.skill === 'rest';
    const st = rest ? '' : `background:var(--${d.skill});color:var(--on-${d.skill})`;
    return `<a href="#/day/${d.id}" class="${rest ? 'rest' : ''} ${i === today ? 'today' : ''}" style="${st}" ${activeId === d.id ? 'aria-current="page"' : ''} aria-label="${t('daysLong')[i]}">
      <span>${t('days')[i].slice(0, 2)}</span>${done ? '<span class="dot"></span>' : ''}</a>`;
  }).join('')}</nav>`;
}

function viewWeek() {
  const p = P(); const ti = dowIdx(new Date());
  const ws = ymd(weekStart());
  return `${topbar()}
  ${strip()}
  <div class="weekhead"><span class="eyebrow">${t('week')}${!S.coach && S.order ? ` · ${t('yourOrder')}` : ''}</span>
    <button class="btn small ${S.reorder ? '' : 'ghost'}" data-act="reorder" aria-pressed="${S.reorder}">${S.reorder ? t('done') : t('reorder')}</button></div>
  ${S.reorder ? `<p class="small" style="margin:-4px 0 10px">${t('dragHint')}</p>` : ''}
  <ul class="list ${S.reorder ? 'reordering' : ''}">${p.days.map((x, i) => {
    const done = sessions().some((s) => s.dayId === x.id && s.date >= ws);
    const today = i === ti;
    const sub = today ? `<span class="sub">${t('today')}${x.skill === 'rest' ? '' : ` · ≈ ${estMinutes(x)} ${t('min')}`}</span>` : '';
    const label = `<span class="d">${t('days')[i].toUpperCase()}</span>${mark(x.skill, 18, today && x.skill !== 'rest' ? `var(--on-${x.skill})` : undefined)}<span class="t">${esc(L(x.title))}${sub}</span>`;
    const cls = today ? `class="today" style="${skillVars(x.skill)}" aria-current="date"` : '';
    if (S.reorder) return `<li data-i="${i}" ${cls}><div class="row">${label}<span class="c moves">
      <span class="grip" aria-hidden="true" title="${t('drag')}"><i></i><i></i><i></i></span>
      <button class="icon-btn" data-act="day-move" data-i="${i}" data-d="-1" aria-label="${t('moveUp')}" ${i === 0 ? 'disabled' : ''}>↑</button>
      <button class="icon-btn" data-act="day-move" data-i="${i}" data-d="1" aria-label="${t('moveDown')}" ${i === p.days.length - 1 ? 'disabled' : ''}>↓</button></span></div></li>`;
    return `<li ${cls}><a href="#/day/${x.id}">${label}
      <span class="c">${done ? '<span class="done" aria-label="done">✓</span>' : x.skill === 'rest' ? '' : `${x.exercises.length} ${t('exercises')}`}</span></a></li>`;
  }).join('')}</ul>
  ${(() => { const w = orderWarnings(p.days); return w.length ? `<div class="warn" role="status">${w.map((x) => `<p>${esc(x)}</p>`).join('')}</div>` : ''; })()}
  ${!S.coach && S.order ? `<button class="btn ghost small" style="margin-top:14px" data-act="order-reset">${t('resetOrder')}</button>` : ''}
  <p class="small" style="margin-top:22px">${t('coach')}: ${esc(p.coach || '')} · ${t('athlete')}: ${esc(p.athlete || '')} · ${t('updated')} ${p.updated ? fmtDate(ymd(new Date(p.updated))) : ''}</p>`;
}

function viewDay(id) {
  const p = P(); const di = p.days.findIndex((d) => d.id === id);
  if (di < 0) return viewWeek();
  const d = p.days[di]; S.ctx.day = d;
  const prev = p.days[(di + 6) % 7].id, next = p.days[(di + 1) % 7].id;
  const isToday = di === dowIdx(new Date());
  const date = todayStr();
  const sess = getSession(date, d.id, false);
  const head = `${topbar()}${strip(d.id)}
    <div class="navrow"><a class="back" href="#/">← ${t('week')}</a>
      <span class="arrows"><a href="#/day/${prev}" aria-label="prev">←</a><a href="#/day/${next}" aria-label="next">→</a></span></div>
    <div class="dayhead"><div><div class="eyebrow">${t('daysLong')[di]}${isToday ? ' · ' + t('today') : ''}</div>
      <h1 class="h-xl" style="margin-top:8px">${esc(L(d.title))}</h1></div>${mark(d.skill, 64)}</div>`;
  if (d.skill === 'rest') return `${head}<p style="font-size:18px;max-width:30ch">${esc(t('recover'))}</p>`;

  const warm = p.warmup || [];
  const wDone = sess?.warm || [];
  const warmHtml = warm.length ? `<details class="warm" ${wDone.length < warm.length ? '' : ''}>
    <summary><span>${t('warmup')}</span><span class="small">${wDone.length}/${warm.length} · ${t('warmupHint')}</span></summary>
    <ul>${warm.map((w, i) => `<li><label><input type="checkbox" data-warm="${i}" ${wDone.includes(i) ? 'checked' : ''}><span>${esc(L(w.name))}</span><span class="dose">${esc(L(w.dose))}</span></label></li>`).join('')}</ul>
  </details>` : '';

  const exHtml = d.exercises.map((ex, n) => {
    const last = lastFor(ex.id, sess?.id);
    const cur = sess?.sets[ex.id] || [];
    const bandOn = ex.band === 'yes' || ex.band === 'optional';
    const cells = Array.from({ length: Number(ex.sets) }, (_, i) => {
      const v = cur[i]?.v; const lv = last?.sets[i]?.v;
      const hit = v != null && v >= Number(ex.min);
      const b = bandById(shownBand(sess, last, ex.id, i));
      return `<div class="cell ${hit ? 'hit' : ''}">
        <label for="c-${ex.id}-${i}">${t('set')[0]}${i + 1}</label>
        <input id="c-${ex.id}-${i}" data-set="${ex.id}|${i}" inputmode="numeric" pattern="[0-9]*" autocomplete="off" value="${v ?? ''}" placeholder="${lv ?? ''}" aria-label="${esc(L(ex.name))} ${t('set')} ${i + 1}">
        ${bandOn ? `<button class="band ${b.id !== 'none' ? 'on' : ''}" data-act="band" data-ex="${ex.id}" data-i="${i}" style="--bc:${b.color || 'transparent'}" aria-label="${t('band')}: ${esc(L(b.label))}"><i></i>${esc(b.short)}</button>` : ''}
      </div>`;
    }).join('');
    const lastTxt = last ? `${t('last')} (${fmtDate(last.s.date)}): ${last.sets.map((x) => fmtVal(x?.v, ex.kind) + (x?.b && x.b !== 'none' ? ' ' + bandById(x.b).short : '')).join(' · ')}` : '';
    return `<section class="ex" style="${skillVars(d.skill)}">
      <div class="ex-head"><span class="n">${pad(n + 1)}</span><span class="name">${esc(L(ex.name))}</span><span class="dose">${dose(ex)}</span></div>
      <div class="ex-meta"><span>${t('rest')} ${fmtRest(Number(ex.rest) || 0)}</span>
        ${ex.band === 'yes' ? `<span class="tag">${t('band')}</span>` : ex.band === 'optional' ? `<span class="tag">${t('bandOpt')}</span>` : ''}
        ${ex.optional ? `<span class="tag">${t('optional')}</span>` : ''}</div>
      ${L(ex.note) ? `<p class="ex-note">${esc(L(ex.note))}</p>` : ''}
      <div class="sets">${cells}</div>
      ${lastTxt ? `<p class="last">${esc(lastTxt)}</p>` : ''}
    </section>`;
  }).join('');

  return `${head}${warmHtml}${exHtml}
    <textarea class="note" data-note placeholder="${esc(t('notePh'))}">${esc(sess?.note || '')}</textarea>
    <div class="btns"><button class="btn" data-act="share" data-sid="${date}_${d.id}">${t('share')}</button></div>`;
}

function sessionText(s) {
  const d = dayById(s.dayId);
  const lines = [`SPINGIII · ${fmtDate(s.date)}`, d ? L(d.title) : s.dayId, ''];
  (d?.exercises || []).forEach((ex, i) => {
    const a = s.sets[ex.id]; if (!a || !a.some((x) => x?.v != null)) return;
    lines.push(`${pad(i + 1)} ${L(ex.name)} — ${a.map((x) => fmtVal(x?.v, ex.kind) + (x?.b && x.b !== 'none' ? ` (${bandById(x.b).short})` : '')).join(' · ')}   [${dose(ex)}]`);
  });
  if ((s.note || '').trim()) lines.push('', '“' + s.note.trim() + '”');
  return lines.join('\n');
}

/* history */
function progressData() {
  // group by exercise name across days; best set per session
  const p = P(); const groups = new Map();
  p.days.forEach((d) => d.exercises.forEach((ex) => {
    const k = exKey(ex);
    if (!groups.has(k)) groups.set(k, { key: k, name: ex.name, kind: ex.kind, skill: d.skill, ids: new Set(), goal: Number(ex.min), points: [] });
    groups.get(k).ids.add(ex.id);
  }));
  const ss = sessions().slice().reverse();
  for (const g of groups.values()) {
    for (const s of ss) {
      for (const id of g.ids) {
        const a = (s.sets[id] || []).filter((x) => x?.v != null);
        if (!a.length) continue;
        const best = a.reduce((m, x) => (x.v > m.v ? x : m), a[0]);
        g.points.push({ date: s.date, v: best.v, b: best.b, sid: s.id, all: a });
      }
    }
  }
  return [...groups.values()];
}
function spark(points, w = 96, h = 28) {
  if (!points.length) return `<svg width="${w}" height="${h}"></svg>`;
  const max = Math.max(...points.map((p) => p.v)) || 1;
  const xs = (i) => (points.length === 1 ? w / 2 : 4 + (i * (w - 8)) / (points.length - 1));
  const ys = (v) => h - 4 - (v / max) * (h - 8);
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${xs(i).toFixed(1)} ${ys(p.v).toFixed(1)}`).join(' ');
  const lp = points[points.length - 1];
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><path d="${d}" fill="none" stroke="var(--skill)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${xs(points.length - 1)}" cy="${ys(lp.v)}" r="3.5" fill="var(--skill)" stroke="var(--bg)" stroke-width="2"/></svg>`;
}
function viewHistory() {
  const ss = sessions(); const ws = ymd(weekStart());
  const planned = P().days.filter((d) => d.skill !== 'rest').length;
  const setsN = ss.reduce((a, s) => a + Object.values(s.sets).reduce((b, x) => b + x.filter((y) => y?.v != null).length, 0), 0);
  let html = `${topbar()}<h1 class="h-xl">${t('history')}</h1>
  <div class="stats"><div class="stat"><b>${ss.length}</b><span>${t('sessions')}</span></div>
    <div class="stat"><b>${ss.filter((s) => s.date >= ws).length}<small style="font-size:16px;color:var(--muted)">/${planned}</small></b><span>${t('thisWeek')}</span></div>
    <div class="stat"><b>${setsN}</b><span>${t('setsLogged')}</span></div></div>`;
  if (!ss.length) return html + `<p class="empty">${t('noLog')}</p>`;
  const groups = progressData().filter((g) => g.points.length);
  for (const sk of ['hspu', 'fl', 'pl']) {
    const gs = groups.filter((g) => g.skill === sk); if (!gs.length) continue;
    html += `<div class="section">${mark(sk, 16)}<span class="eyebrow" style="color:var(--ink)">${t('skill')[sk]}</span></div>
      <div class="prog" style="${skillVars(sk)}">${gs.map((g) => {
      const lp = g.points[g.points.length - 1];
      return `<a href="#/history/ex/${encodeURIComponent(g.key)}"><span class="t">${esc(L(g.name))}</span>${spark(g.points)}
        <span class="v">${fmtVal(lp.v, g.kind)}<small>${fmtDate(lp.date).split(' ').slice(1).join(' ')}</small></span></a>`;
    }).join('')}</div>`;
  }
  html += `<div class="section"><span class="eyebrow" style="color:var(--ink)">${t('recent')}</span></div>`;
  html += ss.slice(0, 40).map((s) => {
    const d = dayById(s.dayId);
    const n = Object.values(s.sets).reduce((b, x) => b + x.filter((y) => y?.v != null).length, 0);
    return `<a class="sess" href="#/history/s/${s.id}">${mark(d?.skill || 'rest', 14)}<span><b style="font-weight:600">${esc(d ? L(d.title) : s.dayId)}</b><br><span class="small">${fmtDate(s.date)}</span></span><span class="small">${n} ${t('sets')}</span></a>`;
  }).join('');
  return html;
}
function chart(g) {
  const W = 520, H = 200, pl = 34, pr = 14, pt = 14, pb = 26;
  const pts = g.points;
  const t0 = parseYmd(pts[0].date).getTime(), t1 = parseYmd(pts[pts.length - 1].date).getTime();
  const span = Math.max(t1 - t0, 1);
  const maxV = Math.max(g.goal, ...pts.map((p) => p.v));
  const top = Math.max(1, Math.ceil((maxV * 1.15) / 2) * 2);
  const x = (p) => (pts.length === 1 ? (pl + W - pr) / 2 : pl + ((parseYmd(p.date).getTime() - t0) / span) * (W - pl - pr));
  const y = (v) => pt + (1 - v / top) * (H - pt - pb);
  const ticks = [0, top / 2, top].map((v) => Math.round(v));
  const grid = ticks.map((v) => `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/>
    <text x="${pl - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${v}</text>`).join('');
  const goal = `<line x1="${pl}" x2="${W - pr}" y1="${y(g.goal)}" y2="${y(g.goal)}" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="4 4"/>
    <text x="${W - pr}" y="${y(g.goal) - 6}" text-anchor="end" font-size="11" font-weight="700" fill="var(--ink)">${t('goal')} ${fmtVal(g.goal, g.kind)}</text>`;
  const line = pts.length > 1 ? `<path d="${pts.map((p, i) => `${i ? 'L' : 'M'}${x(p).toFixed(1)} ${y(p.v).toFixed(1)}`).join(' ')}" fill="none" stroke="var(--skill)" stroke-width="2" stroke-linejoin="round"/>` : '';
  const dots = pts.map((p, i) => `<circle data-i="${i}" cx="${x(p)}" cy="${y(p.v)}" r="5" fill="var(--skill)" stroke="var(--card)" stroke-width="2"/>`).join('');
  const xl = [pts[0], pts[pts.length - 1]].filter((p, i, a) => i === 0 || a[0] !== p)
    .map((p, i) => `<text x="${x(p)}" y="${H - 6}" text-anchor="${pts.length === 1 ? 'middle' : i ? 'end' : 'start'}" font-size="11" fill="var(--muted)">${fmtDate(p.date).split(' ').slice(1).join(' ')}</text>`).join('');
  const hits = pts.map((p, i) => `<rect data-i="${i}" x="${x(p) - 18}" y="${pt}" width="36" height="${H - pt - pb}" fill="transparent"/>`).join('');
  return `<div class="chart" data-chart>
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(L(g.name))}">${grid}${goal}${line}${dots}${xl}<g class="hits">${hits}</g></svg>
    <div class="tip"></div></div>`;
}
function viewExercise(key) {
  const g = progressData().find((x) => x.key === key);
  if (!g || !g.points.length) return viewHistory();
  S.ctx.chart = g;
  const rows = g.points.slice().reverse().map((p) => `<tr><td><a href="#/history/s/${p.sid}">${fmtDate(p.date)}</a></td>
    <td>${p.all.map((x) => fmtVal(x.v, g.kind) + (x.b && x.b !== 'none' ? ' ' + bandById(x.b).short : '')).join(' · ')}</td>
    <td class="r"><b>${fmtVal(p.v, g.kind)}</b></td></tr>`).join('');
  return `${topbar()}<a class="back" href="#/history">← ${t('history')}</a>
    <div class="dayhead" style="margin-top:10px"><div><div class="eyebrow">${t('skill')[g.skill]} · ${t('progress')}</div>
      <h1 class="h-l" style="margin-top:8px">${esc(L(g.name))}</h1></div>${mark(g.skill, 40)}</div>
    <div style="${skillVars(g.skill)}">${chart(g)}</div>
    <table class="log"><thead><tr><th>${t('date')}</th><th>${t('sets')}</th><th class="r">${t('bestH')}</th></tr></thead><tbody>${rows}</tbody></table>`;
}
function viewSession(sid) {
  const s = S.log.sessions[sid]; if (!s) return viewHistory();
  const d = dayById(s.dayId);
  const rows = (d?.exercises || []).map((ex) => {
    const a = (s.sets[ex.id] || []).filter((x) => x?.v != null); if (!a.length) return '';
    return `<tr><td>${esc(L(ex.name))}<br><span class="small">${dose(ex)}</span></td><td class="r">${a.map((x) => fmtVal(x.v, ex.kind) + (x.b && x.b !== 'none' ? ' ' + bandById(x.b).short : '')).join(' · ')}</td></tr>`;
  }).join('');
  return `${topbar()}<a class="back" href="#/history">← ${t('history')}</a>
    <div class="dayhead" style="margin-top:10px"><div><div class="eyebrow">${fmtDate(s.date)}</div>
    <h1 class="h-l" style="margin-top:8px">${esc(d ? L(d.title) : s.dayId)}</h1></div>${mark(d?.skill || 'rest', 40)}</div>
    <table class="log"><tbody>${rows}</tbody></table>
    ${(s.note || '').trim() ? `<p style="margin-top:18px;font-size:15px">“${esc(s.note.trim())}”</p>` : ''}
    <div class="btns two"><button class="btn" data-act="share" data-sid="${s.id}">${t('share')}</button>
    <button class="btn ghost" data-act="del-session" data-sid="${s.id}">${t('delete')}</button></div>`;
}

/* settings */
function viewSettings() {
  return `${topbar()}<h1 class="h-xl">${t('settings')}</h1>
  <div class="group" style="margin-top:22px">
    <div class="opt"><div><div class="k">${t('language')}</div></div>
      <div class="lang" role="group"><button data-act="lang" data-v="en" aria-pressed="${S.lang === 'en'}">EN</button><button data-act="lang" data-v="it" aria-pressed="${S.lang === 'it'}">IT</button></div></div>
    <div class="opt" style="display:block"><div class="k">${t('palette')}</div>
      <div class="palettes" role="group" aria-label="${t('palette')}">${PALETTES.map((p) => `<button data-act="palette" data-v="${p.id}" aria-pressed="${S.palette === p.id}" style="--pb:${p.bg};--pi:${p.ink}">
        <span class="sw">${p.c.map((c) => `<i style="background:${c}"></i>`).join('')}</span><b>${p.name}</b></button>`).join('')}</div></div>
    <div class="opt"><div><div class="k">${t('install')}</div><div class="d">${t('installD')}</div></div></div>
  </div>
  <div class="eyebrow">${t('data')}</div>
  <div class="group">
    <div class="opt"><div><div class="k">${t('exportLog')}</div><div class="d">${t('exportLogD')}</div></div><button class="btn small ghost" data-act="export">↗</button></div>
    <div class="opt"><div><div class="k">${t('importLog')}</div><div class="d">${t('importLogD')}</div></div>
      <label class="btn small ghost" style="cursor:pointer">↙<input type="file" accept="application/json,.json" data-import hidden></label></div>
    <div class="opt"><div><div class="k">${t('resetLog')}</div><div class="d">${t('resetLogD')}</div></div><button class="btn small ghost" data-act="reset-log">✕</button></div>
  </div>
  <div class="eyebrow">${t('coach')}</div>
  <div class="group">
    <div class="opt"><div><div class="k">${t('coachMode')}</div><div class="d">${t('coachModeD')}</div></div><input type="checkbox" class="switch" data-coach ${S.coach ? 'checked' : ''} aria-label="${t('coachMode')}"></div>
    ${S.coach ? `<div class="opt"><a class="btn" href="#/coach">${t('editProgram')} →</a></div>` : ''}
  </div>
  <div class="eyebrow">${t('keys')}</div>
  <div class="group"><div class="keys">
    <kbd>1–7</kbd><span>${t('days').join(' · ')}</span>
    <kbd>← →</kbd><span>${S.lang === 'it' ? 'Giorno precedente / successivo' : 'Previous / next day'}</span>
    <kbd>T</kbd><span>${t('today')}</span>
    <kbd>W</kbd><span>${t('week')}</span>
    <kbd>H</kbd><span>${t('history')}</span>
    <kbd>S</kbd><span>${t('settings')}</span>
    <kbd>L</kbd><span>${t('language')} EN / IT</span>
    <kbd>P</kbd><span>${t('palette')}</span>
    <kbd>R</kbd><span>${t('reorder')} (${t('week')})</span>
    <kbd>Enter</kbd><span>${S.lang === 'it' ? 'Serie successiva' : 'Next set'}</span>
    <kbd>Esc</kbd><span>${t('back')}</span>
    ${S.coach ? `<kbd>E</kbd><span>${t('editProgram')}</span>` : ''}
  </div></div>`;
}

/* coach editor */
function ensureDraft() { if (!S.draft) { S.draft = clone(S.program); saveDraft(); } return S.draft; }
const fld = (label, path, val, type = 'str', attrs = '') => `<label class="field"><span>${label}</span><input data-path="${path}" data-type="${type}" value="${esc(val ?? '')}" ${attrs}></label>`;
function viewCoach() {
  if (!S.coach) return viewSettings();
  const p = P(); const gh = S.gh || ghDefaults();
  return `${topbar()}<a class="back" href="#/settings">← ${t('settings')}</a>
  <h1 class="h-xl" style="margin:10px 0 18px">${t('editProgram')}</h1>
  <div class="grid-2" style="display:grid;grid-template-columns:1fr 1fr;gap:0 10px">
    ${fld(t('coach'), 'coach', p.coach)}${fld(t('athlete'), 'athlete', p.athlete)}</div>
  <ul class="list" style="margin-top:14px">${p.days.map((d, i) => `<li><a href="#/coach/day/${d.id}"><span class="d">${t('days')[i].toUpperCase()}</span>${mark(d.skill, 18)}
    <span class="t">${esc(L(d.title))}</span><span class="c">✎</span></a></li>`).join('')}</ul>

  <div class="section" style="margin-top:30px"><span class="eyebrow" style="color:var(--ink)">${t('warmup')}</span></div>
  ${(p.warmup || []).map((w, i) => `<div class="edit-ex" style="--skill:var(--line)"><div class="bar"><span class="small">${pad(i + 1)}</span>
    <span class="tools"><button class="icon-btn" data-act="warm-move" data-i="${i}" data-d="-1" aria-label="up">↑</button><button class="icon-btn" data-act="warm-move" data-i="${i}" data-d="1" aria-label="down">↓</button><button class="icon-btn" data-act="warm-del" data-i="${i}" aria-label="delete">✕</button></span></div>
    <div class="fields">${fld('EN', `warmup.${i}.name.en`, w.name.en)}${fld('IT', `warmup.${i}.name.it`, w.name.it)}</div>
    <div class="fields">${fld(t('dose') + ' EN', `warmup.${i}.dose.en`, w.dose.en)}${fld(t('dose') + ' IT', `warmup.${i}.dose.it`, w.dose.it)}</div></div>`).join('')}
  <button class="btn ghost small" style="width:100%;margin-top:6px" data-act="warm-add">+ ${t('addItem')}</button>

  <div class="section" style="margin-top:30px"><span class="eyebrow" style="color:var(--ink)">${t('bands')}</span></div>
  ${p.bands.map((b, i) => `<div class="edit-ex" style="--skill:${b.color || 'var(--line)'}"><div class="fields four">
    ${fld(t('short'), `bands.${i}.short`, b.short, 'str', 'maxlength="2"')}${fld('EN', `bands.${i}.label.en`, b.label.en)}${fld('IT', `bands.${i}.label.it`, b.label.it)}
    ${b.id === 'none' ? '<span></span>' : `<label class="field"><span>${t('color')}</span><input type="color" data-path="bands.${i}.color" data-type="str" data-rerender="1" value="${esc(b.color || '#000000')}" style="padding:2px"></label>`}</div></div>`).join('')}

  <div class="section" style="margin-top:30px"><span class="eyebrow" style="color:var(--ink)">${t('github')}</span></div>
  <p class="small">${t('ghD')}</p>
  <div class="group">
    <div class="fields">${ghf(t('owner'), 'owner', gh.owner)}${ghf(t('repo'), 'repo', gh.repo)}</div>
    <div class="fields">${ghf(t('branch'), 'branch', gh.branch)}${ghf(t('token'), 'token', gh.token, 'type="password" autocomplete="off"')}</div>
  </div>
  <div class="btns">
    <button class="btn" data-act="publish" ${S.draft ? '' : 'disabled'}>${t('publish')}</button>
    <div class="btns two" style="margin:0"><button class="btn ghost" data-act="discard" ${S.draft ? '' : 'disabled'}>${t('discard')}</button>
    <button class="btn ghost" data-act="download-program">${t('download')}</button></div>
  </div>`;
}
const ghf = (label, k, v, attrs = '') => `<label class="field"><span>${label}</span><input data-gh="${k}" value="${esc(v ?? '')}" ${attrs}></label>`;
function ghDefaults() {
  const h = location.hostname; const seg = location.pathname.split('/').filter(Boolean)[0] || '';
  return h.endsWith('.github.io') ? { owner: h.split('.')[0], repo: seg && !seg.includes('.') ? seg : `${h}`, branch: 'main', token: '' } : { owner: '', repo: '', branch: 'main', token: '' };
}
function viewCoachDay(id) {
  if (!S.coach) return viewSettings();
  const p = P(); const di = p.days.findIndex((d) => d.id === id); if (di < 0) return viewCoach();
  const d = p.days[di];
  const prev = p.days[(di + 6) % 7].id, next = p.days[(di + 1) % 7].id;
  const sel = (path, val, opts) => `<select data-path="${path}" data-type="str">${opts.map(([v, l]) => `<option value="${v}" ${String(val) === v ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  return `${topbar()}
  <div class="navrow"><a class="back" href="#/coach">← ${t('editProgram')}</a>
    <span class="arrows"><a href="#/coach/day/${prev}" aria-label="prev">←</a><a href="#/coach/day/${next}" aria-label="next">→</a></span></div>
  <div class="eyebrow" style="margin:8px 0 10px">${t('daysLong')[di]}</div>
  <div class="seg" role="group">${SKILLS.map((s) => `<button data-act="skill" data-v="${s}" aria-pressed="${d.skill === s}">${mark(s, 12, d.skill === s && s !== 'rest' ? `var(--${s})` : undefined)}${t('skill')[s]}</button>`).join('')}</div>
  <div class="fields" style="margin-top:8px">${fld(t('title') + ' EN', `days.${di}.title.en`, d.title.en)}${fld(t('title') + ' IT', `days.${di}.title.it`, d.title.it)}</div>
  ${d.skill === 'rest' ? '' : d.exercises.map((ex, i) => {
    const b = `days.${di}.exercises.${i}`;
    return `<div class="edit-ex" style="${skillVars(d.skill)}">
      <div class="bar"><b class="num">${pad(i + 1)}</b><span class="tools">
        <button class="icon-btn" data-act="ex-move" data-i="${i}" data-d="-1" aria-label="up">↑</button>
        <button class="icon-btn" data-act="ex-move" data-i="${i}" data-d="1" aria-label="down">↓</button>
        <button class="icon-btn" data-act="ex-del" data-i="${i}" aria-label="delete">✕</button></span></div>
      <div class="fields">${fld(t('name') + ' EN', `${b}.name.en`, ex.name.en)}${fld(t('name') + ' IT', `${b}.name.it`, ex.name.it)}</div>
      <div class="fields four">
        ${fld(t('sets'), `${b}.sets`, ex.sets, 'num', 'inputmode="numeric"')}
        ${fld(t('from'), `${b}.min`, ex.min, 'num', 'inputmode="numeric"')}
        ${fld(t('to'), `${b}.max`, ex.max, 'numnull', 'inputmode="numeric" placeholder="—"')}
        ${fld(t('restS'), `${b}.rest`, ex.rest, 'num', 'inputmode="numeric"')}</div>
      <div class="fields mix">
        <label class="field"><span>${t('kind')}</span>${sel(`${b}.kind`, ex.kind, [['reps', t('reps')], ['secs', t('secs')]])}</label>
        <label class="field"><span>${t('bandUse')}</span>${sel(`${b}.band`, ex.band, [['no', t('bandNo')], ['yes', t('bandYes')], ['optional', t('bandMaybe')]])}</label>
        <label class="field"><span>+ ${t('plus')}</span><input type="checkbox" class="switch" data-path="${b}.plus" ${ex.plus ? 'checked' : ''}></label>
        <label class="field"><span>${t('optional')}</span><input type="checkbox" class="switch" data-path="${b}.optional" ${ex.optional ? 'checked' : ''}></label></div>
      <label class="field"><span>${t('note')} EN</span><textarea data-path="${b}.note.en" data-type="str">${esc(ex.note?.en)}</textarea></label>
      <label class="field"><span>${t('note')} IT</span><textarea data-path="${b}.note.it" data-type="str">${esc(ex.note?.it)}</textarea></label>
    </div>`;
  }).join('')}
  ${d.skill === 'rest' ? '' : `<button class="btn ghost" style="margin-top:10px" data-act="ex-add">+ ${t('addEx')}</button>`}
  <div class="btns"><a class="btn" href="#/day/${d.id}">${t('open')} →</a></div>`;
}

/* ───────────────── router ───────────────── */
function parseRoute() { return (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean).map(decodeURIComponent); }
function render() {
  const app = document.getElementById('app');
  S.route = parseRoute(); S.ctx = {};
  const [a, b, c] = S.route;
  if (!P()) { app.innerHTML = S.loaded ? `<p class="empty">${t('loadFail')}</p>` : ''; return; }
  let html;
  if (a === 'day') html = viewDay(b);
  else if (a === 'history' && b === 'ex') html = viewExercise(c);
  else if (a === 'history' && b === 's') html = viewSession(c);
  else if (a === 'history') html = viewHistory();
  else if (a === 'settings') html = viewSettings();
  else if (a === 'coach' && b === 'day') html = viewCoachDay(c);
  else if (a === 'coach') html = viewCoach();
  else html = viewWeek();
  app.innerHTML = html;
  document.documentElement.lang = S.lang;
  const tab = a === 'history' ? 'history' : a === 'settings' || a === 'coach' ? 'settings' : 'week';
  document.querySelectorAll('#tabs a').forEach((el) => {
    el.textContent = t(el.dataset.tab);
    if (el.dataset.tab === tab) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
  });
  if (S.ctx.chart) bindChart();
  if (S.reorder) bindDrag();
}
let lastRoute = '';
window.addEventListener('hashchange', () => {
  const r = location.hash;
  render();
  if (r !== lastRoute) window.scrollTo(0, 0);
  lastRoute = r;
});

/* chart hover */
function bindChart() {
  const box = document.querySelector('[data-chart]'); if (!box) return;
  const svg = box.querySelector('svg'); const tip = box.querySelector('.tip'); const g = S.ctx.chart;
  const show = (i) => {
    const p = g.points[i]; const c = svg.querySelector(`circle[data-i="${i}"]`);
    const r = svg.getBoundingClientRect(), br = box.getBoundingClientRect(); const vb = svg.viewBox.baseVal;
    tip.textContent = `${fmtDate(p.date)} · ${fmtVal(p.v, g.kind)}${p.b && p.b !== 'none' ? ' · ' + L(bandById(p.b).label) : ''}`;
    tip.style.left = `${r.left - br.left + (c.cx.baseVal.value / vb.width) * r.width}px`;
    tip.style.top = `${r.top - br.top + (c.cy.baseVal.value / vb.height) * r.height}px`;
    tip.style.opacity = 1;
    svg.querySelectorAll('circle').forEach((x) => x.setAttribute('r', x.dataset.i == i ? 7 : 5));
  };
  svg.addEventListener('pointerover', (e) => { const i = e.target.dataset?.i; if (i != null) show(+i); });
  svg.addEventListener('pointerleave', () => { tip.style.opacity = 0; svg.querySelectorAll('circle').forEach((x) => x.setAttribute('r', 5)); });
  show(g.points.length - 1); tip.style.opacity = 0;
}

/* ───────────────── actions ───────────────── */
function setPath(obj, path, v) {
  const k = path.split('.'); let o = obj;
  for (let i = 0; i < k.length - 1; i++) o = o[/^\d+$/.test(k[i]) ? +k[i] : k[i]] ??= {};
  o[k[k.length - 1]] = v;
}
function twoTap(btn, fn) {
  if (btn.dataset.armed) { fn(); return; }
  const orig = btn.innerHTML; btn.dataset.armed = 1; btn.textContent = t('confirm');
  setTimeout(() => { if (btn.isConnected) { btn.innerHTML = orig; delete btn.dataset.armed; } }, 3000);
}
async function shareText(text) {
  try { if (navigator.share) { await navigator.share({ text }); return; } } catch (e) { if (e.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText(text); toast(t('shared')); } catch { toast(text.slice(0, 80)); }
}
function downloadFile(name, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' })); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
const b64 = (s) => { const bytes = new TextEncoder().encode(s); let bin = ''; bytes.forEach((x) => (bin += String.fromCharCode(x))); return btoa(bin); };

const ACTS = {
  palette(b) { S.palette = b.dataset.v; store.set('palette', S.palette); applyPalette(); render(); },
  reorder() { S.reorder = !S.reorder; render(); },
  'day-move'(b) {
    const i = +b.dataset.i, d = +b.dataset.d, k = i + d;
    if (k < 0 || k >= P().days.length) return;
    moveDay(i, k); render();
    const nb = document.querySelector(`[data-act="day-move"][data-i="${k}"][data-d="${d}"]`) || document.querySelector(`[data-act="day-move"][data-i="${k}"]`);
    nb?.focus();
  },
  'order-reset'() { S.order = null; store.del('order'); render(); },
  lang(b) { S.lang = b.dataset.v; store.set('lang', S.lang); render(); },
  band(b) {
    const d = S.ctx.day; const exId = b.dataset.ex; const i = +b.dataset.i;
    const sess = getSession(todayStr(), d.id, true);
    const last = lastFor(exId, sess.id);
    const ids = P().bands.map((x) => x.id);
    const cur = shownBand(sess, last, exId, i);
    const nxt = ids[(ids.indexOf(cur) + 1) % ids.length];
    const a = (sess.sets[exId] ||= []);
    while (a.length <= i) a.push({ v: null, b: null });
    a[i].b = nxt; saveLog();
    const band = bandById(nxt);
    b.style.setProperty('--bc', band.color || 'transparent'); b.classList.toggle('on', nxt !== 'none');
    b.innerHTML = `<i></i>${esc(band.short)}`; b.setAttribute('aria-label', `${t('band')}: ${L(band.label)}`);
  },
  share(b) { const s = S.log.sessions[b.dataset.sid]; if (!s || !hasData(s)) { toast(t('noLog').split('.')[0]); return; } shareText(sessionText(s)); },
  'del-session'(b) { twoTap(b, () => { delete S.log.sessions[b.dataset.sid]; saveLog(); toast(t('deleted')); location.hash = '#/history'; }); },
  async export() {
    const name = `spingiii-log-${todayStr()}.json`; const text = JSON.stringify({ app: 'SPINGIII', athlete: P().athlete, exported: new Date().toISOString(), log: S.log }, null, 2);
    try {
      const f = new File([text], name, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: name }); return; }
    } catch (e) { if (e.name === 'AbortError') return; }
    downloadFile(name, text);
  },
  'reset-log'(b) { twoTap(b, () => { S.log = { sessions: {} }; saveLog(); toast(t('cleared')); render(); }); },
  'ex-move'(b) { moveIn(ensureDraft().days[dayIdx()].exercises, +b.dataset.i, +b.dataset.d); },
  'ex-del'(b) { ensureDraft().days[dayIdx()].exercises.splice(+b.dataset.i, 1); saveDraft(); render(); },
  'ex-add'() {
    ensureDraft().days[dayIdx()].exercises.push({ id: 'ex-' + Date.now().toString(36), name: { en: T.en.newEx, it: T.it.newEx }, sets: 3, kind: 'reps', min: 5, max: null, plus: false, rest: 120, band: 'no', optional: false, note: { en: '', it: '' } });
    saveDraft(); render(); const ins = document.querySelectorAll('.edit-ex'); ins[ins.length - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },
  skill(b) { ensureDraft().days[dayIdx()].skill = b.dataset.v; saveDraft(); render(); },
  'warm-add'() { (ensureDraft().warmup ||= []).push({ name: { en: '', it: '' }, dose: { en: '', it: '' } }); saveDraft(); render(); },
  'warm-del'(b) { ensureDraft().warmup.splice(+b.dataset.i, 1); saveDraft(); render(); },
  'warm-move'(b) { moveIn(ensureDraft().warmup, +b.dataset.i, +b.dataset.d); },
  discard(b) { twoTap(b, () => { S.draft = null; store.del('draft'); toast(t('discarded')); render(); }); },
  'download-program'() { downloadFile('program.json', JSON.stringify({ ...P(), updated: new Date().toISOString() }, null, 2) + '\n'); },
  async publish(b) {
    const gh = S.gh || {};
    if (!gh.owner || !gh.repo || !gh.token) { toast(t('needToken')); return; }
    const out = { ...clone(S.draft), updated: new Date().toISOString() };
    b.disabled = true; b.textContent = t('publishing');
    const api = `https://api.github.com/repos/${encodeURIComponent(gh.owner)}/${encodeURIComponent(gh.repo)}/contents/program.json`;
    const headers = { Authorization: `Bearer ${gh.token}`, Accept: 'application/vnd.github+json' };
    try {
      let sha;
      const r0 = await fetch(`${api}?ref=${encodeURIComponent(gh.branch || 'main')}`, { headers, cache: 'no-store' });
      if (r0.ok) sha = (await r0.json()).sha; else if (r0.status !== 404) throw new Error(`GitHub ${r0.status}`);
      const r = await fetch(api, { method: 'PUT', headers, body: JSON.stringify({ message: `Update program — ${out.updated.slice(0, 10)}`, content: b64(JSON.stringify(out, null, 2) + '\n'), sha, branch: gh.branch || 'main' }) });
      if (!r.ok) { const j = await r.json().catch(() => ({})); throw new Error(`GitHub ${r.status}${j.message ? ': ' + j.message : ''}`); }
      S.program = out; store.set('program', out); S.draft = null; store.del('draft');
      toast(t('published')); render();
    } catch (e) { toast(String(e.message || e)); b.disabled = false; b.textContent = t('publish'); }
  },
};
function moveDay(i, k) {
  if (i === k) return;
  if (S.coach) {
    const arr = ensureDraft().days; const [x] = arr.splice(i, 1); arr.splice(k, 0, x); saveDraft();
  } else {
    const ids = P().days.map((x) => x.id); const [x] = ids.splice(i, 1); ids.splice(k, 0, x);
    const base = S.program.days.map((x) => x.id);
    S.order = ids.join() === base.join() ? null : { ids, base };
    if (S.order) store.set('order', S.order); else store.del('order');
  }
}
/* drag to reorder: hold a row (or grab the handle) and move it */
function bindDrag() {
  const list = document.querySelector('.list.reordering'); if (!list) return;
  const items = [...list.children];
  let st = null;
  const clear = () => { if (!st) return; clearTimeout(st.timer); items.forEach((el) => { el.style.transform = ''; el.classList.remove('dragging', 'shift'); }); st = null; };
  const activate = () => {
    if (!st) return; st.active = true; st.li.classList.add('dragging'); items.forEach((el) => el !== st.li && el.classList.add('shift'));
    try { st.li.setPointerCapture(st.id); } catch { }
    try { navigator.vibrate && navigator.vibrate(8); } catch { }
  };
  list.addEventListener('touchmove', (e) => { if (st?.active) e.preventDefault(); }, { passive: false });
  list.addEventListener('contextmenu', (e) => { if (st) e.preventDefault(); });
  list.addEventListener('pointerdown', (e) => {
    const li = e.target.closest('li'); if (!li || e.target.closest('button') || (e.pointerType === 'mouse' && e.button !== 0)) return;
    st = { li, from: items.indexOf(li), to: items.indexOf(li), y0: e.clientY, id: e.pointerId, active: false, h: li.getBoundingClientRect().height };
    if (e.target.closest('.grip') || e.pointerType === 'mouse') { e.preventDefault(); activate(); } else st.timer = setTimeout(activate, 230);
  });
  list.addEventListener('pointermove', (e) => {
    if (!st || e.pointerId !== st.id) return;
    const dy = e.clientY - st.y0;
    if (!st.active) { if (Math.abs(dy) > 8) clear(); return; }
    const to = Math.max(0, Math.min(items.length - 1, st.from + Math.round(dy / st.h)));
    st.to = to;
    st.li.style.transform = `translateY(${dy}px)`;
    items.forEach((el, i) => {
      if (el === st.li) return;
      const shift = st.from < to && i > st.from && i <= to ? -st.h : st.from > to && i < st.from && i >= to ? st.h : 0;
      el.style.transform = shift ? `translateY(${shift}px)` : '';
    });
    // weekday labels stay with the slot, not the workout
    const order = items.map((_, i) => i); const [x] = order.splice(st.from, 1); order.splice(to, 0, x);
    order.forEach((orig, pos) => { const d = items[orig].querySelector('.d'); if (d) d.textContent = t('days')[pos].toUpperCase(); });
  });
  const end = (e) => {
    if (!st || (e && e.pointerId !== st.id)) return;
    const { active, from, to } = st; clear();
    if (active && from !== to) { moveDay(from, to); render(); }
  };
  list.addEventListener('pointerup', end);
  list.addEventListener('pointercancel', end);
}
function dayIdx() { return P().days.findIndex((d) => d.id === S.route[2]); }
function moveIn(arr, i, d) { const j = i + d; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; saveDraft(); render(); }

const app = document.getElementById('app');
app.addEventListener('click', (e) => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const fn = ACTS[b.dataset.act]; if (fn) { e.preventDefault(); fn(b); }
});
app.addEventListener('input', (e) => {
  const el = e.target;
  if (el.dataset.set) {
    const [exId, iStr] = el.dataset.set.split('|'); const i = +iStr; const d = S.ctx.day;
    const ex = d.exercises.find((x) => x.id === exId);
    const raw = el.value.replace(/[^0-9.]/g, ''); if (raw !== el.value) el.value = raw;
    const n = raw === '' ? null : parseFloat(raw);
    const sess = getSession(todayStr(), d.id, true);
    const last = lastFor(exId, sess.id);
    const a = (sess.sets[exId] ||= []);
    while (a.length <= i) a.push({ v: null, b: null });
    a[i].v = Number.isFinite(n) ? n : null;
    if (!a[i].b) a[i].b = shownBand(sess, last, exId, i);
    saveLog();
    el.closest('.cell').classList.toggle('hit', a[i].v != null && a[i].v >= Number(ex.min));
    return;
  }
  if (el.dataset.note != null) { const s = getSession(todayStr(), S.ctx.day.id, true); s.note = el.value; saveLog(); return; }
  if (el.dataset.gh) { S.gh = { ...(S.gh || ghDefaults()), [el.dataset.gh]: el.value.trim() }; store.set('gh', S.gh); return; }
  if (el.dataset.path && el.type !== 'checkbox' && el.tagName !== 'SELECT') editPath(el);
});
app.addEventListener('change', (e) => {
  const el = e.target;
  if (el.dataset.warm != null) {
    const s = getSession(todayStr(), S.ctx.day.id, true); const i = +el.dataset.warm;
    s.warm = el.checked ? [...new Set([...(s.warm || []), i])] : (s.warm || []).filter((x) => x !== i);
    saveLog(); const sm = el.closest('details').querySelector('summary .small');
    sm.textContent = `${s.warm.length}/${P().warmup.length} · ${t('warmupHint')}`; return;
  }
  if (el.dataset.coach != null) { S.coach = el.checked; store.set('coach', S.coach); render(); return; }
  if (el.dataset.import != null) { importLog(el.files[0]); el.value = ''; return; }
  if (el.dataset.path && (el.type === 'checkbox' || el.tagName === 'SELECT' || el.type === 'color')) editPath(el);
});
function editPath(el) {
  ensureDraft();
  let v = el.type === 'checkbox' ? el.checked : el.value;
  const ty = el.dataset.type;
  if (ty === 'num') v = v === '' ? 0 : Number(v);
  if (ty === 'numnull') v = v === '' ? null : Number(v);
  setPath(S.draft, el.dataset.path, v); saveDraft();
  if (el.dataset.rerender && el.type !== 'color') render();
}
async function importLog(file) {
  if (!file) return;
  try {
    const j = JSON.parse(await file.text()); const inc = j.log?.sessions || j.sessions;
    if (!inc || typeof inc !== 'object') throw new Error('bad file');
    Object.assign(S.log.sessions, inc); saveLog(); toast(t('imported')); render();
  } catch { toast('✕ JSON'); }
}

/* ───────────────── keyboard ───────────────── */
document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const tag = e.target.tagName; const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if (typing) {
    if (e.key === 'Escape') e.target.blur();
    if (e.key === 'Enter' && e.target.dataset.set) {
      e.preventDefault();
      const all = [...document.querySelectorAll('[data-set]')]; const nx = all[all.indexOf(e.target) + 1];
      if (nx) nx.focus(); else e.target.blur();
    }
    return;
  }
  const [a, b, c] = S.route; const p = P(); if (!p) return;
  const k = e.key.toLowerCase();
  if (/^[1-7]$/.test(k)) { location.hash = `#/${a === 'coach' ? 'coach/' : ''}day/${p.days[+k - 1].id}`; return; }
  if ((k === 'arrowleft' || k === 'arrowright') && (a === 'day' || (a === 'coach' && b === 'day'))) {
    const id = a === 'day' ? b : c; const i = p.days.findIndex((d) => d.id === id);
    const n = p.days[(i + (k === 'arrowleft' ? 6 : 1)) % 7].id;
    location.hash = `#/${a === 'coach' ? 'coach/' : ''}day/${n}`; return;
  }
  const go = { t: `#/day/${p.days[dowIdx(new Date())].id}`, w: '#/', h: '#/history', s: '#/settings' };
  if (go[k]) { location.hash = go[k]; return; }
  if (k === 'e' && S.coach) { location.hash = '#/coach'; return; }
  if (k === 'r' && !a) { S.reorder = !S.reorder; render(); return; }
  if (k === 'p') { const i = PALETTES.findIndex((x) => x.id === S.palette); S.palette = PALETTES[(i + 1) % PALETTES.length].id; store.set('palette', S.palette); applyPalette(); render(); return; }
  if (k === 'l') { S.lang = S.lang === 'en' ? 'it' : 'en'; store.set('lang', S.lang); render(); return; }
  if (k === 'escape') {
    if (a === 'history' && b) location.hash = '#/history';
    else if (a === 'coach' && b) location.hash = '#/coach';
    else if (a === 'coach') location.hash = '#/settings';
    else location.hash = '#/';
  }
});

/* ───────────────── boot ───────────────── */
async function loadProgram() {
  try {
    const r = await fetch(`program.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok) throw new Error(r.status);
    const p = await r.json();
    const changed = S.program && p.updated !== S.program.updated;
    const first = !S.program;
    S.program = p; store.set('program', p);
    if (S.order && S.order.base.join() !== p.days.map((d) => d.id).join()) { S.order = null; store.del('order'); if (!first) setTimeout(() => toast(t('orderReset')), 2800); }
    if (first || changed) render();
    if (changed) toast(`${t('updated')} · ${fmtDate(ymd(new Date(p.updated)))}`);
  } catch {
    S.loaded = true;
    if (S.program) toast(t('offline')); else render();
  }
}
applyPalette();
render();
loadProgram();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
}
