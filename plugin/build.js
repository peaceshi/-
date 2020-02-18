const workboxBuild = require("workbox-build");
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = async () => {
	// This will return a Promise
	const { count, size, warnings } = await workboxBuild
		.injectManifest({
			swSrc: "src/sw.js",
			swDest: "src/service-worker.js",
			globDirectory: "book",
			globPatterns: ["../src/*.{js,css,html,png,md}"]
		});
	// Optionally, log any warnings and details.
	warnings.forEach(console.warn);
	console.log(`${count} files will be precached, totaling ${size} bytes.`);
};

buildSW();
