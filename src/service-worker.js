(function (workboxRouting, workboxStrategies, workboxCacheableResponse, workboxExpiration) {
	'use strict';

	addEventListener("message", event => {
		if (event.data && event.data.type === "SKIP_WAITING") {
			skipWaiting();
		}
	});

	workboxRouting.registerRoute(
		/\.(?:png|jpg|jpeg|svg|gif)$/,
		new workboxStrategies.CacheFirst({
			cacheName: "image-cache",
			plugins: [
				new workboxExpiration.ExpirationPlugin({
					// 对资源缓存 7 天
					maxAgeSeconds: 7 * 24 * 60 * 60,
					// 匹配该策略最多缓存 100 条
					maxEntries: 100
				})
			]
		})
	);
	workboxRouting.registerRoute(
		/\.(?:css|html|js|json)$/,
		new workboxStrategies.StaleWhileRevalidate({
			cacheName: "static-resources",
			plugins: [
				new workboxExpiration.ExpirationPlugin({
					// 对资源缓存 1 天
					maxAgeSeconds: 1 * 24 * 60 * 60,
					// 匹配该策略最多缓存 1000 条
					maxEntries: 1000
				})
			]
		})
	);
	workboxRouting.registerRoute(
		/^https:\/\/cdn./,
		new workboxStrategies.StaleWhileRevalidate({
			cacheName: "cdn-cache",
			plugins: [
				new workboxExpiration.ExpirationPlugin({
					// 对资源缓存 7 天
					maxAgeSeconds: 7 * 24 * 60 * 60,
					// 匹配该策略最多缓存 100 条
					maxEntries: 100
				}),
				new workboxCacheableResponse.CacheableResponsePlugin({
					statuses: [0, 200]
				})
			]
		})
	);
	workboxRouting.registerRoute(
		// Cache crates file.
		/crates$/,
		// Use cache but update in the background.
		new workboxStrategies.StaleWhileRevalidate({
			// Use a custom cache name.
			cacheName: "crates-cache"
		})
	);

	addEventListener("activate", event => {
		event.waitUntil(
			(async () => {
				// Feature-detect
				if (self.registration.navigationPreload) {
					// Enable navigation preloads!
					await self.registration.navigationPreload.enable();
				}
			})()
		);
	});
	self.addEventListener("fetch", event => {
		event.respondWith(
			(async () => {
				//01
				// Respond from the cache if we can
				const cachedResponse = await caches.match(event.request);
				if (cachedResponse) return cachedResponse;
				//02
				// Else, use the preloaded response, if it's there
				const response = await event.preloadResponse;
				if (response) return response;
				//03
				// IMPORTANT:Clone the request. A request is a stream and
				// can only be consumed once. Since we are consuming this
				// once by cache and once by the browser for fetch, we need
				// to clone the response.
				var fetchRequest = await event.request.clone();
				responseToCache(fetchRequest);
			})()
		);
	});

	/**
	 * @param {RequestInfo} fetchRequest
	 */
	let responseToCache = fetchRequest => {
		return fetch(fetchRequest).then(response => {
			// Check if we received a valid response
			if (!response || response.status !== 200 || response.type !== "basic") {
				return response;
			}
			// IMPORTANT:Clone the response. A response is a stream
			// and because we want the browser to consume the response
			// as well as the cache consuming the response, we need
			// to clone it so we have two streams.
			var responseToCache = response.clone();
			caches.open("main-cache").then(cache => {
				cache.put(event.request, responseToCache);
			});
			return response;
		});
	};

}(workboxRouting, workboxStrategies, workboxCacheableResponse, workboxExpiration));
