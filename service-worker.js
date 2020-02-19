console.log("Hello from service-worker.js");
importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);
if (workbox) {
	console.log(`Yay! Workbox is loaded 🎉`);
} else {
	console.log(`Boo! Workbox didn't load 😬`);
}
const { strategies } = workbox;
const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

// This will trigger the importScripts() for workbox.strategies and its dependencies:
self.addEventListener("fetch", event => {
	if (event.request.url.endsWith(".png")) {
		// Using the previously-initialized strategies will work as expected.
		const cacheFirst = new strategies.CacheFirst();
		event.respondWith(cacheFirst.handle({ request: event.request }));
	}
	if (event.request.url.endsWith(".js")) {
		// Using the previously-initialized strategies will work as expected.
		const StaleWhileRevalidate = new strategies.StaleWhileRevalidate();
		event.respondWith(StaleWhileRevalidate.handle({ request: event.request }));
	}
	if (event.request.url.endsWith(".css")) {
		// Using the previously-initialized strategies will work as expected.
		const StaleWhileRevalidate = new strategies.StaleWhileRevalidate();
		event.respondWith(StaleWhileRevalidate.handle({ request: event.request }));
	}
});

registerRoute(
	/\.(?:png|jpg|jpeg|svg|gif)$/,
	new CacheFirst({
		cacheName: "image-cache",
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({
				// 对资源缓存 7 天
				maxAgeSeconds: 7 * 24 * 60 * 60,
				// 匹配该策略的最多缓存 100 条
				maxEntries: 100
			})
		]
	})
);

registerRoute(
	/\.(?:html|css|js|json)$/,
	new CacheFirst({
		cacheName: "static-cache",
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({
				// 对资源缓存 1 天
				maxAgeSeconds: 1 * 24 * 60 * 60,
				// 匹配该策略最多缓存 100 条
				maxEntries: 100
			})
		]
	})
);
registerRoute(
	/crates$/,
	new CacheFirst({
		cacheName: "crates-cache",
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({
				// 对资源缓存 1 天
				maxAgeSeconds: 1 * 24 * 60 * 60,
				// 匹配该策略最多缓存 100 条
				maxEntries: 100
			})
		]
	})
);

registerRoute(
	/^https:\/\/cdn.*/,
	new CacheFirst({
		cacheName: "CDN-cache",
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({
				// 对资源缓存 7 天
				maxAgeSeconds: 7 * 24 * 60 * 60,
				// 匹配该策略最多缓存 100 条
				maxEntries: 100
			})
		]
	})
);
