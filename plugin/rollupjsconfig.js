import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

module.exports = [
	{
		input: "src/sw.js",
		output: {
			file: "src/service-worker.js",
			format: "iife"
		},
		plugins: [commonjs(), nodeResolve()]
	},
	{
		input: "plugin/sw-init.js",
		output: {
			file: "plugin/bundle.js",
			format: "iife"
		},
		plugins: [
			commonjs(),
			nodeResolve(),
			replace({
				"process.env.NODE_ENV": JSON.stringify("production")
			})
		]
	}
];
