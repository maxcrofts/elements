/// <reference types="@types/chai" />
/// <reference types="@types/mocha" />

import type ImgLightboxElement from "./ImgLightboxElement";
import svg1 from "../examples/1.svg";
import svg2 from "../examples/2.svg";
import svg3 from "../examples/3.svg";

declare const assert: Chai.AssertStatic;

describe("img-lightbox", () => {
	let imgLightboxElement: ImgLightboxElement;
	let dialogElement: HTMLDialogElement;
	let closeButtonElement: HTMLButtonElement;
	let imgElement: HTMLImageElement;
	let currentSpanElement: HTMLSpanElement;
	let previousButtonElement: HTMLButtonElement;
	let nextButtonElement: HTMLButtonElement;
	let imgElements: HTMLImageElement[];

	beforeEach(async () => {
		// Create lightbox element and append to body
		imgLightboxElement = document.createElement(
			"img-lightbox"
		) as ImgLightboxElement;
		document.body.appendChild(imgLightboxElement);

		imgElements = new Array(3);

		imgElements[0] = document.createElement("img");
		imgElements[0].src =
			"data:image/svg+xml;charset=utf-8," + encodeURI(svg1);
		imgLightboxElement.appendChild(imgElements[0]);

		imgElements[1] = document.createElement("img");
		imgElements[1].src =
			"data:image/svg+xml;charset=utf-8," + encodeURI(svg2);
		imgLightboxElement.appendChild(imgElements[1]);

		imgElements[2] = document.createElement("img");
		imgElements[2].src =
			"data:image/svg+xml;charset=utf-8," + encodeURI(svg3);
		imgLightboxElement.appendChild(imgElements[2]);

		dialogElement = imgLightboxElement.shadowRoot!.querySelector("dialog")!;
		closeButtonElement = imgLightboxElement.shadowRoot!.querySelector(
			"button[part*=close]"
		)!;
		imgElement = imgLightboxElement.shadowRoot!.querySelector("img")!;
		currentSpanElement =
			imgLightboxElement.shadowRoot!.querySelector("span#current")!;
		previousButtonElement = imgLightboxElement.shadowRoot!.querySelector(
			"button[part*=previous]"
		)!;
		nextButtonElement =
			imgLightboxElement.shadowRoot!.querySelector("button[part*=next]")!;
	});

	afterEach(async () => {
		// Clean up
		imgLightboxElement.remove();
	});

	it("starts closed", async () => {
		assert.isFalse(dialogElement.open);
	});

	it("opens when slotted `img` is clicked", async () => {
		imgElements[0].click();
		assert.isTrue(dialogElement.open);
	});

	it("closes when closed button is clicked", async () => {
		imgElements[0].click();
		closeButtonElement.click();
		assert.isFalse(dialogElement.open);
	});

	it("opens the correct image", async () => {
		imgElements[1].click();
		assert.equal(imgElement.src, imgElements[1].src);
		assert.equal(currentSpanElement.textContent, "2");
	});

	it("goes to the next image", async () => {
		imgElements[0].click();
		nextButtonElement.click();
		assert.equal(imgElement.src, imgElements[1].src);
		assert.equal(currentSpanElement.textContent, "2");
	});

	it("goes to the previous image", async () => {
		imgElements[1].click();
		previousButtonElement.click();
		assert.equal(imgElement.src, imgElements[0].src);
		assert.equal(currentSpanElement.textContent, "1");
	});

	it("wraps to the last image", async () => {
		imgElements[0].click();
		previousButtonElement.click();
		assert.equal(imgElement.src, imgElements[imgElements.length - 1].src);
		assert.equal(currentSpanElement.textContent, "3");
	});

	it("wraps to the first image", async () => {
		imgElements[imgElements.length - 1].click();
		nextButtonElement.click();
		assert.equal(imgElement.src, imgElements[0].src);
		assert.equal(currentSpanElement.textContent, "1");
	});
});
