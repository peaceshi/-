//Load the library and specify options
import replace from "replace-in-file";

const preconnect =
	'\n\
	<!-- preconnect -->\n\
	<link href=https://cdn.jsdelivr.net/ rel="preconnect">\n\
	<link href=https://cdn.staticfile.org/ rel="preconnect">\n\
	<link href=https://peaceshi.github.io/ rel="preconnect">\n\
	<link href=https://play.rust-lang.org rel="preconnect">\n\
	<link href=https://storage.googleapis.com/ rel="preconnect">\n';
const preload =
	'\n\
	<!-- preload -->\n\
	<link rel="preload" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/css/variables.css" as="style">\n\
	<link rel="preload"	href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/css/general.css" as="style">\n\
	<link rel="preload" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/css/chrome.css" as="style">\n\
	<link rel="preload" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css" as="style">\n\
	<link rel="preload" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/highlight.css" as="style">\n\
	<link rel="preload" href="https://cdn.staticfile.org/highlight.js/9.18.1/styles/default.min.css" as="style">\n\
	<link rel="preload" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/theme/theme.css" as="style">\n\
	<!-- DO NOT preload ayu-highlight and tomorrow-night -->\n';

const option1 = {
	files: "./src/theme/index.hbs",
	from: '<meta name="theme-color" content="#ffffff" />',
	to: '<meta name="theme-color" content="#e1e1db" />\n' + preconnect + preload
};
const option2 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="shortcut icon" href="{{ path_to_root }}{{ favicon }}">',
	to:
		'\n\
		<!-- favicon -->\n\
		<link rel="shortcut icon" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/favicon.png">\n\
		<!-- manifest -->\n\
		<link rel="manifest" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/manifest.json">\n'
};
const option3 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="stylesheet" href="{{ path_to_root }}css/variables.css">',
	to: '\n\
	<!-- stylesheet -->\n\
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/css/variables.css">\n'
};
const option4 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="stylesheet" href="{{ path_to_root }}css/general.css">',
	to: '\n\
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/css/general.css">\n'
};
const option5 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="stylesheet" href="{{ path_to_root }}css/chrome.css">',
	to: '\n\
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/css/chrome.css">\n'
};
const option6 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="stylesheet" href="{{ path_to_root }}css/print.css" media="print">',
	to: '\n\
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/css/print.css">\n'
};
const option7 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="stylesheet" href="{{ path_to_root }}FontAwesome/css/font-awesome.css">',
	to: '\n\
	<link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css">\n'
};
const option8 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="stylesheet" href="{{ path_to_root }}highlight.css">',
	to: '\n\
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/highlight.css">\n\
	<link rel="stylesheet" href="https://cdn.staticfile.org/highlight.js/9.18.1/styles/default.min.css">\n'
};
const option9 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="stylesheet" href="{{ path_to_root }}tomorrow-night.css">',
	to: '\n\
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/tomorrow-night.css">\n'
};
const option10 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="stylesheet" href="{{ path_to_root }}ayu-highlight.css">',
	to: '\n\
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/ayu-highlight.css">\n\
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/theme/theme.css">\n'
};
const option11 = {
	files: "./src/theme/index.hbs",
	from: '<a href="{{git_repository_url}}" title="Git repository" aria-label="Git repository">',
	to: '\n\
	<a href="{{git_repository_url}}" title="Git repository" aria-label="Git repository" target="_blank" rel="noopener noreferrer nofollow">\n'
};
const option12 = {
	files: "./src/theme/index.hbs",
	from: '<script src="{{ path_to_root }}clipboard.min.js" type="text/javascript" charset="utf-8"></script>',
	to: '\n\
	<script defer src="https://cdn.staticfile.org/clipboard.js/2.0.4/clipboard.min.js"></script>\n'
};
const option13 = {
	files: "./src/theme/index.hbs",
	from: '<script src="{{ path_to_root }}highlight.js" type="text/javascript" charset="utf-8"></script>',
	to: '\n\
	<script defer src="https://cdn.staticfile.org/highlight.js/9.18.1/highlight.min.js"></script>\n\
	<script defer src="https://cdn.staticfile.org/highlight.js/9.18.1/languages/basic.min.js"></script>\n'
};

const option15 = {
	files: "./src/theme/index.hbs",
	from: '<script src="{{ path_to_root }}book.js" type="text/javascript" charset="utf-8"></script>',
	to: '\n\
	<script defer src="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/src/theme/book.js"></script>\n\
	<script defer src="https://cdn.staticfile.org/lazysizes/5.2.0/lazysizes.min.js"></script>\n\
	<script defer src="https://cdn.staticfile.org/mermaid/8.4.6/mermaid.min.js"></script>\n\
	<script defer src="https://cdn.jsdelivr.net/gh/peaceshi/GameProgrammingPatterns@master/plugin/init.js"></script>\n'
};
const option16 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="stylesheet" href="{{ ../path_to_root }}{{ this }}">',
	to: '\n\
	{{!-- <link rel="stylesheet" href="{{ ../path_to_root }}{{ this }}"> --}}\n'
};

const option17 = {
	files: "./src/theme/index.hbs",
	from: '<script type="text/javascript" src="{{ ../path_to_root }}{{this}}"></script>',
	to: '\n\
	{{!-- <script type="text/javascript" src="{{ ../path_to_root }}{{this}}"></script> --}}\n'
};
const debug1 = {
	files: "./src/theme/index.hbs",
	from: '<script src="{{ path_to_root }}book.js" type="text/javascript" charset="utf-8"></script>',
	to: '\n\
	<script src="{{ path_to_root }}book.js" type="text/javascript" charset="utf-8"></script>\n\
	<script defer src="https://cdn.staticfile.org/lazysizes/5.2.0/lazysizes.min.js"></script>\n\
	<script defer src="https://cdn.staticfile.org/mermaid/8.4.6/mermaid.min.js"></script>\n'
};
const debug2 = {
	files: "./src/theme/index.hbs",
	from: '<link rel="shortcut icon" href="{{ path_to_root }}{{ favicon }}">',
	to:
		'\n\
		<!-- favicon -->\n\
		<link rel="shortcut icon" href="{{ path_to_root }}{{ favicon }}">\n\
		<!-- manifest -->\n\
		<link rel="manifest" href="{{ path_to_root }}{{ manifest.json }}">\n'
};
let options = new Array();
if (process.argv[2]==="release"){
	console.log("release verify")
	options = Array(option1, option2,option3,option4,option5,option6,option7,option8,option9,option10,option11,option12,option13,option15,option16,option17);
}else
{
	console.log("debug verify")
	options = Array(debug1,option11,debug2);
}


(async () => {
	for await (const option of options) {
		try {
			const result = await replace(option);
			console.log("Replacement results:", result);
		} catch (error) {
			console.error("Error occurred:", error);
		}
	}
})();
