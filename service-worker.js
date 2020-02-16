console.log("Hello from service-worker.js");

importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

if (workbox) {
	console.log(`Yay! Workbox is loaded 🎉`);
} else {
	console.log(`Boo! Workbox didn't load 😬`);
}

// This will trigger the importScripts() for workbox.strategies and its dependencies:
const { strategies } = workbox;

self.addEventListener("fetch", event => {
	if (event.request.url.endsWith(".png")) {
		// Using the previously-initialized strategies will work as expected.
		const cacheFirst = new strategies.CacheFirst();
		event.respondWith(cacheFirst.handle({ request: event.request }));
	}
	if (event.request.url.endsWith(".js")) {
		// Using the previously-initialized strategies will work as expected.
		const cacheFirst = new strategies.CacheFirst();
		event.respondWith(cacheFirst.handle({ request: event.request }));
	}
	if (event.request.url.endsWith(".css")) {
		// Using the previously-initialized strategies will work as expected.
		const cacheFirst = new strategies.CacheFirst();
		event.respondWith(cacheFirst.handle({ request: event.request }));
	}
});

const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;

registerRoute(
	/\.(?:png|jpg|jpeg|svg|gif)$/,
	new CacheFirst({
		cacheName: "image-cache",
		plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })]
	})
);

