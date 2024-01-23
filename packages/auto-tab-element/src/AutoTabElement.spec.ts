/// <reference types="@types/chai" />
/// <reference types="@types/mocha" />

import type AutoTabElement from "./AutoTabElement";

declare const assert: Chai.AssertStatic;

describe("auto-tab", () => {
	it("tabs from radio input", async () => {
		document.body.innerHTML = `
			<auto-tab>
				<input type="radio" required />
				<input required />
			</auto-tab>
		`;

		const autoAdvanceElement = document.body
			.firstElementChild! as AutoTabElement;
		const firstInputElement =
			autoAdvanceElement.firstElementChild! as HTMLInputElement;
		const secondInputElement =
			autoAdvanceElement.lastElementChild! as HTMLInputElement;

		firstInputElement.click();

		assert.equal(secondInputElement, document.activeElement);
	});

	it("tabs from text input", async () => {
		document.body.innerHTML = `
			<auto-tab>
				<input type="text" required />
				<input required />
			</auto-tab>
		`;

		const autoAdvanceElement = document.body
			.firstElementChild! as AutoTabElement;
		const firstInputElement =
			autoAdvanceElement.firstElementChild! as HTMLInputElement;
		const secondInputElement =
			autoAdvanceElement.lastElementChild! as HTMLInputElement;

		firstInputElement.value = "hello, world!";
		firstInputElement.dispatchEvent(new Event("input", { bubbles: true }));

		assert.equal(secondInputElement, document.activeElement);
	});

	it("tabs from textarea", async () => {
		document.body.innerHTML = `
			<auto-tab>
				<textarea required></textarea>
				<input required />
			</auto-tab>
		`;

		const autoAdvanceElement = document.body
			.firstElementChild! as AutoTabElement;
		const textAreaElement =
			autoAdvanceElement.firstElementChild! as HTMLTextAreaElement;
		const inputElement =
			autoAdvanceElement.lastElementChild! as HTMLInputElement;

		textAreaElement.value = "hello, world!";
		textAreaElement.dispatchEvent(new Event("input", { bubbles: true }));

		assert.equal(inputElement, document.activeElement);
	});

	it("skips disabled inputs", async () => {
		document.body.innerHTML = `
			<auto-tab>
				<input type="checkbox" required />
				<input type="checkbox" disabled />
				<input type="checkbox" />
			</auto-tab>
		`;

		const autoAdvanceElement = document.body
			.firstElementChild! as AutoTabElement;
		const firstInputElement =
			autoAdvanceElement.firstElementChild! as HTMLInputElement;
		const secondInputElement =
			firstInputElement.nextElementSibling! as HTMLInputElement;
		const thirdInputElement =
			secondInputElement.nextElementSibling! as HTMLInputElement;

		firstInputElement.click();

		assert.equal(thirdInputElement, document.activeElement);
	});

	it("skips over radio inputs", async () => {
		document.body.innerHTML = `
			<auto-tab>
				<input name="radio1" type="radio" value="first" required />
				<input name="radio1" type="radio" value="second" required />
				<input name="radio2" type="radio" value="third" required />
			</auto-tab>
		`;

		const autoAdvanceElement = document.body
			.firstElementChild! as AutoTabElement;
		const firstInputElement =
			autoAdvanceElement.firstElementChild! as HTMLInputElement;
		const secondInputElement =
			firstInputElement.nextElementSibling! as HTMLInputElement;
		const thirdInputElement =
			secondInputElement.nextElementSibling! as HTMLInputElement;

		firstInputElement.click();

		assert.equal(thirdInputElement, document.activeElement);
	});

	it("follows tabindex", async () => {
		document.body.innerHTML = `
			<auto-tab>
				<input type="checkbox" tabindex="2" required />
				<input type="checkbox" tabindex="1" required />
			</auto-tab>
		`;

		const autoAdvanceElement = document.body
			.firstElementChild! as AutoTabElement;
		const firstInputElement =
			autoAdvanceElement.firstElementChild! as HTMLInputElement;
		const secondInputElement =
			autoAdvanceElement.lastElementChild! as HTMLInputElement;

		secondInputElement.click();

		assert.equal(firstInputElement, document.activeElement);
	});
});
