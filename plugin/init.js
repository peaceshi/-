
function patchImgElementTag() {
    var elements = document.getElementsByTagName("img");
    for(var i=0; i < elements.length; i+=1) {
        var element = elements.item(i);
        if (element.tagName.toLowerCase() == "img") {
			element.className = "lazyload";
			element.getAttribute("src");
			element.setAttribute("data-src",element.getAttribute("src"));
			element.removeAttribute("src");
        }
    }
}

patchImgElementTag();

// Check that service workers are supported
if ('serviceWorker' in navigator) {
	// Use the window load event to keep the page load performant
	window.addEventListener('load', () => {
	  navigator.serviceWorker.register('/service-worker.js');
	});
  }
