const CACHE_NAME = 'boardgame-timer-v2'; // 버전을 v2로 변경
const urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './icon.ico',
  './manifest.json'
];

// 설치 시 캐시 저장 및 즉시 활성화
self.addEventListener('install', event => {
  self.skipWaiting(); // 새 버전이 대기하지 않고 즉시 설치되도록 강제
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 활성화 시 이전 버전(v1)의 낡은 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('이전 캐시 삭제됨:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 패치 요청 시: 인터넷(네트워크)에서 먼저 최신본을 가져오고, 실패하면(오프라인) 캐시 사용
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
