/// <reference types="@types/chai" />
/// <reference types="@types/mocha" />

import type ClickableAreaElement from "./ClickableAreaElement";

declare const assert: Chai.AssertStatic;

describe("clickable-area", () => {
	it("works", async () => {
		document.body.innerHTML = `
			<input id="checkbox" type="checkbox" />
			<clickable-area for="checkbox"></clickable-area>
		`;

		const inputElement = document.body
			.firstElementChild! as HTMLInputElement;
		const clickableAreaElement = document.body
			.lastElementChild! as ClickableAreaElement;

		assert.isFalse(inputElement.checked);

		clickableAreaElement.click();

		assert.isTrue(inputElement.checked);
	});
});
