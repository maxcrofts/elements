module.exports = function(config) {
	config.set({
		frameworks: ["mocha", "chai"],
		plugins: [
			require("karma-chrome-launcher"),
			require("karma-mocha"),
			require("karma-chai"),
		],
		files: [
			{
				pattern: "dist/index.js",
				type: "module",
			},
			{
				pattern: "dist/**/*.spec.js",
				type: "module",
			},
		],
		browsers: ["ChromeHeadless"],
		autoWatch: false,
		singleRun: true,
	});
}
