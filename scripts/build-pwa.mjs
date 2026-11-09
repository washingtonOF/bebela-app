import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
const root = "dist";
const base = "/bebela-app/";
const assets = [];
function scan(folder) {
  for (const name of readdirSync(folder)) {
    const full = join(folder, name);
    if (statSync(full).isDirectory()) scan(full);
    else if (!name.endsWith(".map") && name !== "sw.js") {
      assets.push(base + relative(root, full).split(sep).join("/"));
    }
  }
}
scan(root);
const sw = `const CACHE = "bebela-pwa-v2";
const PRECACHE = ${JSON.stringify(assets)};
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache =>
    Promise.allSettled(PRECACHE.map(url => cache.add(url)))
  ).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith("bebela-pwa-") && key !== CACHE).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith("${base}")) return;
  event.respondWith(fetch(request).then(response => {
    if (response.ok && response.type === "basic") {
      const clone = response.clone();
      caches.open(CACHE).then(cache => cache.put(request, clone));
    }
    return response;
  }).catch(async () => (await caches.match(request)) ||
    (request.mode === "navigate" ? caches.match("${base}index.html") : Response.error())));
});`;
writeFileSync(join(root, "sw.js"), sw);
console.log("BEBELA PWA: arquivos disponíveis para cache offline:", assets.length);
