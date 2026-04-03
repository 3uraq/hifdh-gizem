self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

let _timer = null;

self.addEventListener('message', e => {
  if (!e.data || e.data.type !== 'SCHEDULE') return;
  clearTimeout(_timer);
  const { delay, body } = e.data;
  if (delay > 0 && delay < 86400000 * 1.5) {
    _timer = setTimeout(async () => {
      await self.registration.showNotification('Hifdh Tracker 📖', {
        body,
        icon: './favicon.svg',
        badge: './favicon.svg',
        tag: 'hifdh-daily',
        renotify: true,
        vibrate: [200, 100, 200],
      });
    }, delay);
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});
