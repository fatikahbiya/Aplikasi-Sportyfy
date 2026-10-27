/* Service worker: bikin app bisa dibuka offline & lolos PWABuilder.
   Strategi: ambil dari jaringan dulu (supaya update selalu terbaru), kalau offline pakai cache.
   Naikkan angka VERSI kalau kamu mau paksa semua HP memuat ulang. */
const VERSI='sportyfy-v3';
const FILE=['./','index.html','manifest.json','css/style.css','js/images.js','js/data.js','js/components.js','js/screens-main.js','js/screens-flow.js','js/receipt.js','js/store.js','js/screens-admin.js','js/app.js','assets/icons/icon-192.png','assets/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSI).then(c=>c.addAll(FILE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSI).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(VERSI).then(c=>c.put(e.request,k));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
});
