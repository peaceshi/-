import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { CacheableResponse } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

registerRoute(
	/\.(?:png|jpg|jpeg|svg|gif)$/,
	new CacheFirst({
		cacheName: "image-cache",
		plugins: [
			new ExpirationPlugin({
				// 对资源缓存 7 天
				maxAgeSeconds: 7 * 24 * 60 * 60,
				// 匹配该策略最多缓存 100 条
				maxEntries: 100
			})
		]
	})
);
registerRoute(
	/\.(?:css|html|js|json)$/,
	new CacheFirst({
		cacheName: "main-cache",
		plugins: [
			new ExpirationPlugin({
				// 对资源缓存 1 天
				maxAgeSeconds: 1 * 24 * 60 * 60,
				// 匹配该策略最多缓存 1000 条
				maxEntries: 1000
			})
		]
	})
);
registerRoute(
	/^https:\/\/cdn./,
	new CacheFirst({
		cacheName: "cdn-cache",
		plugins: [
			new ExpirationPlugin({
				// 对资源缓存 7 天
				maxAgeSeconds: 7 * 24 * 60 * 60,
				// 匹配该策略最多缓存 100 条
				maxEntries: 100
			})
		]
	})
);
registerRoute(
	// Cache crates file.
	/crates$/,
	// Use cache but update in the background.
	new StaleWhileRevalidate({
		// Use a custom cache name.
		cacheName: "crates-cache"
	})
);
