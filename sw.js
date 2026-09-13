const CACHE_NAME = 'boardgame-timer-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './icon.ico',
  './manifest.json'
];

// 설치 단계에서 지정된 파일들을 브라우저 캐시에 저장합니다.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 오프라인 상태일 때 캐시된 파일을 우선적으로 불러옵니다.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 있으면 캐시 반환, 없으면 네트워크 요청
        return response || fetch(event.request);
      })
  );
});