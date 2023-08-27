/// <reference types="@types/chai" />
/// <reference types="@types/mocha" />

import type DetailsAccordionElement from "./DetailsAccordionElement";

declare const assert: Chai.AssertStatic;

describe("details-accordion", () => {
	let detailsAccordionElement: DetailsAccordionElement;
	let detailsElements: HTMLDetailsElement[];
	let summaryElements: HTMLElement[];

	beforeEach(async () => {
		detailsAccordionElement = document.createElement(
			"details-accordion",
		) as DetailsAccordionElement;
		document.body.appendChild(detailsAccordionElement);

		detailsAccordionElement.innerHTML = `
			<details>
				<summary>
					ABC
				</summary>
				123
			</details>
			<details>
				<summary>
					DEF
				</summary>
				456
			</details>
		`;

		detailsElements = Array.from(
			detailsAccordionElement.querySelectorAll("details"),
		);
		assert.equal(detailsElements.length, 2);

		summaryElements = Array.from(
			detailsAccordionElement.querySelectorAll("summary"),
		);
		assert.equal(summaryElements.length, 2);
	});

	afterEach(async () => {
		// Clean up
		detailsAccordionElement.remove();
	});

	it("applies `open` attribute immediately on opening", () => {
		detailsAccordionElement.animationDuration = 5;
		summaryElements[0].click();
		assert.isTrue(detailsElements[0].hasAttribute("open"));
	});

	it("applies `data-details-accordion-open` attribute immediately on opening", () => {
		detailsAccordionElement.animationDuration = 5;
		summaryElements[0].click();
		assert.isTrue(
			detailsElements[0].hasAttribute("data-details-accordion-open"),
		);
	});

	it("applies `data-details-accordion-animating` attribute immediately on opening", () => {
		detailsAccordionElement.animationDuration = 5;
		summaryElements[0].click();
		assert.isTrue(
			detailsElements[0].hasAttribute("data-details-accordion-animating"),
		);
	});

	it("removes `open` attribute once fully closed", async () => {
		// Open
		summaryElements[0].click();
		// Set animation duration to 2ms
		detailsAccordionElement.animationDuration = 2;
		// Close
		summaryElements[0].click();
		// Details element should still have `open` attribute
		assert.isTrue(detailsElements[0].hasAttribute("open"));
		// Wait for animation to complete
		await detailsAccordionElement.animationFinished;
		// Details element should no longer have `open` attribute
		assert.isFalse(detailsElements[0].hasAttribute("open"));
	});

	it("removes `data-details-accordion-open` attribute immediately on closing", () => {
		// Open
		summaryElements[0].click();
		// Set animation duration to 5ms
		detailsAccordionElement.animationDuration = 5;
		// Close
		summaryElements[0].click();
		// Details element should no longer have `data-details-accordion-open` attribute
		assert.isFalse(
			detailsElements[0].hasAttribute("data-details-accordion-open"),
		);
	});

	it("removes `data-details-accordion-animating` attribute once fully closed", async () => {
		// Open
		summaryElements[0].click();
		// Set animation duration to 2ms
		detailsAccordionElement.animationDuration = 2;
		// Close
		summaryElements[0].click();
		// Details element should still have `data-details-accordion-animating` attribute
		assert.isTrue(
			detailsElements[0].hasAttribute("data-details-accordion-animating"),
		);
		// Wait for animation to complete
		await detailsAccordionElement.animationFinished;
		// Details element should no longer have `data-details-accordion-animating` attribute
		assert.isFalse(
			detailsElements[0].hasAttribute("data-details-accordion-animating"),
		);
	});

	it("sets `animationDuration` property based on `animation-duration` attribute", () => {
		const animationDuration = 42;
		detailsAccordionElement.setAttribute(
			"animation-duration",
			animationDuration.toString(),
		);
		assert.equal(
			detailsAccordionElement.animationDuration,
			animationDuration,
		);
	});

	it("sets `animation-duration` attribute based on `animationDuration` property", () => {
		const animationDuration = 42;
		detailsAccordionElement.animationDuration = animationDuration;
		assert.equal(
			detailsAccordionElement.getAttribute("animation-duration"),
			animationDuration.toString(),
		);
	});
});
