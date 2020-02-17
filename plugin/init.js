function patchImgElementTag() {
	var elements = document.getElementsByTagName("img");
	for (var i = 0; i < elements.length; i += 1) {
		var element = elements.item(i);
		if (element.tagName.toLowerCase() == "img") {
			element.className = "lazyload";
			element.getAttribute("src");
			element.setAttribute("crossorigin","");
			element.setAttribute("data-src", element.getAttribute("src"));
			element.removeAttribute("src");
		}
	}
}
//https://lavas-project.github.io/pwa-book
function registServiceWorker() {
	// Check that service workers are supported
	if ("serviceWorker" in navigator) {
		// 在 load 事件触发后注册 Service Worker，确保 Service Worker 的注册不会影响首屏速度
		window.addEventListener("load", () => {
			navigator.serviceWorker.getRegistrations().then(regs => {
				for (let reg of regs) {
					reg.unregister();
				}
				// 注册 Service Worker
				navigator.serviceWorker
					.register("service-worker.js")
					.then(
						registration => {
							// 注册成功
							console.log(
								"ServiceWorker registration successful with scope: ",
								registration.scope
							);
						},
						err => {
							// 注册失败:(
							console.warn("ServiceWorker registration failed: ", err);
						}
					);
			});
		});
	}
}

patchImgElementTag();
registServiceWorker();

