/* SPINGIII service worker — offline app shell, fresh program when online */
const V = 'spingiii-v6';
const SHELL = ['./', 'index.html', 'app.css', 'app.js', 'program.json', 'manifest.webmanifest', 'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !fonts) return; // GitHub API etc. go straight to network

  // program: network first, cached copy when offline
  if (url.pathname.endsWith('/program.json')) {
    e.respondWith(fetch(req).then((r) => {
      if (r.ok) { const c = r.clone(); caches.open(V).then((ca) => ca.put('program.json', c)); }
      return r;
    }).catch(() => caches.match('program.json')));
    return;
  }
  // everything else: cache first, refresh in background
  e.respondWith(caches.match(req, { ignoreSearch: !fonts }).then((hit) => {
    const net = fetch(req).then((r) => {
      if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(V).then((ca) => ca.put(req, c)); }
      return r;
    }).catch(() => hit);
    return hit || net;
  }));
});
