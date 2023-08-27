/// <reference types="@types/chai" />
/// <reference types="@types/mocha" />

import type QuerySelectorElement from "./QuerySelectorElement";

declare const assert: Chai.AssertStatic;

describe("query-selector", () => {
	it("selects nothing by default", async () => {
		document.body.innerHTML = `
			<query-selector>
				<div class="foo"></div>
				<div class="bar"></div>
			</query-selector>
		`;

		const querySelectorElement = document.body
			.firstElementChild! as QuerySelectorElement;

		const selectedElements =
			querySelectorElement.querySelectorAll("[data-selected]");
		assert.equal(selectedElements.length, 0);
	});

	it("selects correct element based on `selectors` attribute", async () => {
		document.body.innerHTML = `
			<query-selector selectors=".yes">
				<div class="yes"></div>
				<div class="no"></div>
			</query-selector>
		`;

		const querySelectorElement = document.body
			.firstElementChild! as QuerySelectorElement;

		const selectedElement =
			querySelectorElement.querySelector("[data-selected]");
		const targetElement = querySelectorElement.querySelector(".yes");
		assert.equal(selectedElement, targetElement);
	});

	it("selects correct elements based on `selectors` attribute", async () => {
		document.body.innerHTML = `
			<query-selector selectors=".yes">
				<div class="yes"></div>
				<div class="no"></div>
				<div class="yes"></div>
				<div class="no"></div>
			</query-selector>
		`;

		const querySelectorElement = document.body
			.firstElementChild! as QuerySelectorElement;

		const selectedElements =
			querySelectorElement.querySelectorAll("[data-selected]");
		const targetElements = querySelectorElement.querySelectorAll(".yes");
		assert.equal(selectedElements.length, targetElements.length);
		assert.deepEqual(selectedElements, targetElements);
	});

	it("selects correct elements based on radio input", async () => {
		document.body.innerHTML = `
			<query-selector input-name="theInput">
				<form>
					<input
						type="radio"
						name="theInput"
						value=".a"
						checked
					/>
					<input
						type="radio"
						name="theInput"
						value=".b"
					/>
					<input
						type="radio"
						name="theInput"
						value=".c"
					/>
				</form>

				<div class="a"></div>
				<div class="b"></div>
				<div class="a"></div>
				<div class="b"></div>
				<div class="a"></div>
			</query-selector>
		`;

		const querySelectorElement = document.body
			.firstElementChild! as QuerySelectorElement;

		const aRadioElement =
			querySelectorElement.querySelector<HTMLInputElement>(
				"input[value=\\.a]",
			)!;
		const bRadioElement =
			querySelectorElement.querySelector<HTMLInputElement>(
				"input[value=\\.b]",
			)!;
		const cRadioElement =
			querySelectorElement.querySelector<HTMLInputElement>(
				"input[value=\\.c]",
			)!;

		let selectedElements =
			querySelectorElement.querySelectorAll("[data-selected]");
		let targetElements = querySelectorElement.querySelectorAll(".a");
		assert.equal(selectedElements.length, targetElements.length);

		bRadioElement.click();
		selectedElements =
			querySelectorElement.querySelectorAll("[data-selected]");
		targetElements = querySelectorElement.querySelectorAll(".b");
		assert.equal(selectedElements.length, targetElements.length);

		cRadioElement.click();
		selectedElements =
			querySelectorElement.querySelectorAll("[data-selected]");
		targetElements = querySelectorElement.querySelectorAll(".c");
		assert.equal(selectedElements.length, targetElements.length);

		aRadioElement.click();
		selectedElements =
			querySelectorElement.querySelectorAll("[data-selected]");
		targetElements = querySelectorElement.querySelectorAll(".a");
		assert.equal(selectedElements.length, targetElements.length);
	});

	it("applies `data-selected` attribute when child elements are added", async () => {
		document.body.innerHTML = `
			<div>
				<query-selector selectors=".yes">
					<div class="yes"></div>
					<div class="no"></div>
				</query-selector>
				<div class="yes"></div>
			</div>
		`;

		const containerElement = document.body
			.firstElementChild! as HTMLDivElement;
		const querySelectorElement =
			containerElement.querySelector("query-selector")!;
		const extraElement = containerElement.querySelector(":scope > .yes")!;

		// Check that only `div.yes` has `data-selected` attribute
		let selectedElements =
			querySelectorElement.querySelectorAll("[data-selected]");
		let targetElements = querySelectorElement.querySelectorAll(".yes");
		assert.equal(selectedElements.length, 1);
		assert.equal(selectedElements.length, targetElements.length);
		assert.deepEqual(selectedElements, targetElements);

		// Check that extra div does not have `data-selected` attribute
		assert.isFalse(extraElement.hasAttribute("data-selected"));

		// Move extra div into `query-selector`
		querySelectorElement.appendChild(extraElement);

		// Wait for next animation frame
		await new Promise((resolve) => requestAnimationFrame(resolve));

		// Check that only elements matching `div.yes` have `data-selected` attribute
		selectedElements =
			querySelectorElement.querySelectorAll("[data-selected]");
		targetElements = querySelectorElement.querySelectorAll(".yes");
		assert.equal(selectedElements.length, 2);
		assert.equal(selectedElements.length, targetElements.length);
		assert.deepEqual(selectedElements, targetElements);

		// Check that extra div does now has `data-selected` attribute
		assert.isTrue(extraElement.hasAttribute("data-selected"));
	});

	it("sets `inputName` property based on `input-name` attribute", async () => {
		const querySelector = document.createElement(
			"query-selector",
		) as QuerySelectorElement;
		const inputName = "theInput";
		querySelector.setAttribute("input-name", inputName);
		assert.equal(querySelector.inputName, inputName);
	});

	it("sets `input-name` attribute based on `inputName` property", async () => {
		const querySelector = document.createElement(
			"query-selector",
		) as QuerySelectorElement;
		const inputName = "theInput";
		querySelector.inputName = inputName;
		assert.equal(querySelector.getAttribute("input-name"), inputName);
	});

	it("sets `selectors` property based on `selectors` attribute", async () => {
		const querySelector = document.createElement(
			"query-selector",
		) as QuerySelectorElement;
		const selectors = ".aClass";
		querySelector.setAttribute("selectors", selectors);
		assert.equal(querySelector.selectors, selectors);
	});

	it("sets `selectors` attribute based on `selectors` property", async () => {
		const querySelector = document.createElement(
			"query-selector",
		) as QuerySelectorElement;
		const selectors = ".aClass";
		querySelector.selectors = selectors;
		assert.equal(querySelector.getAttribute("selectors"), selectors);
	});
});
