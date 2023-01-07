module.exports = {
	extends: ["standard-with-typescript", "prettier"],
	rules: {
		"arrow-parens": ["error", "always"],
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/triple-slash-reference": "off",
	},
};
