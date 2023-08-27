/// <reference types="@types/chai" />
/// <reference types="@types/mocha" />

import type ValidationMessageElement from "./ValidationMessageElement";

declare const assert: Chai.AssertStatic;

describe("validation-message", () => {
	it("works", async () => {
		document.body.innerHTML = `
			<input id="input" required />
			<validation-message for="input">Initial message.</validation-message>
		`;

		const inputElement = document.body
			.firstElementChild! as HTMLInputElement;
		const validationMessageElement = document.body
			.lastElementChild! as ValidationMessageElement;

		assert.equal(validationMessageElement.innerHTML, "Initial message.");

		inputElement.checkValidity();

		assert.equal(
			validationMessageElement.innerHTML,
			inputElement.validationMessage,
		);
	});
});
