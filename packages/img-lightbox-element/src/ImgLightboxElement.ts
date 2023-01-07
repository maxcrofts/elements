import css from "./ImgLightboxElement.css";
import innerHTML from "./ImgLightboxElement.html";

const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(css);

const templateElement = document.createElement("template");
templateElement.innerHTML = innerHTML;

export default class ImgLightboxElement extends HTMLElement {
	/**
	 * @internal
	 */
	private readonly _dialogElement: HTMLDialogElement;

	/**
	 * @internal
	 */
	private readonly _imgElement: HTMLImageElement;

	/**
	 * @internal
	 */
	private readonly _currentSpanElement: HTMLSpanElement;

	/**
	 * @internal
	 */
	private readonly _totalSpanElement: HTMLSpanElement;

	/**
	 * @internal
	 */
	private _selectedElements: HTMLElement[] = [];

	/**
	 * @internal
	 */
	private _selectors: string = "img";

	/**
	 * @internal
	 */
	private _currentIndex: number = 0;

	static get observedAttributes(): string[] {
		return ["selectors"];
	}

	get selectors(): string {
		return this._selectors;
	}

	set selectors(value: any) {
		if (value != null) {
			this.setAttribute("selectors", value.toString());
		} else {
			this.removeAttribute("selectors");
		}
	}

	get currentIndex(): number {
		return this._currentIndex;
	}

	set currentIndex(value: number) {
		const length = this._selectedElements.length;
		// Proper modulo (ensures index is positive)
		this._currentIndex = ((value % length) + length) % length;

		const selectedElement = this._selectedElements[this._currentIndex];

		this._imgElement.removeAttribute("srcset");
		this._imgElement.removeAttribute("src");
		this._imgElement.removeAttribute("alt");

		if (selectedElement.hasAttribute("srcset")) {
			this._imgElement.setAttribute(
				"srcset",
				selectedElement.getAttribute("srcset")
			);
		}

		if (selectedElement.hasAttribute("src")) {
			this._imgElement.setAttribute(
				"src",
				selectedElement.getAttribute("src")
			);
		}

		if (selectedElement.hasAttribute("alt")) {
			this._imgElement.setAttribute(
				"alt",
				selectedElement.getAttribute("alt")
			);
		}

		this._currentSpanElement.innerText = (
			this._currentIndex + 1
		).toString();
	}

	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.adoptedStyleSheets = [cssStyleSheet];

		const node = templateElement.content.cloneNode(true);
		shadowRoot.appendChild(node);

		const slotElement = shadowRoot.querySelector("slot")!;
		slotElement.addEventListener(
			"slotchange",
			this._handleSlotChange.bind(this)
		);

		this._dialogElement = shadowRoot.querySelector("dialog")!;
		this._dialogElement.addEventListener(
			"click",
			this._handleClick.bind(this)
		);

		this._imgElement = shadowRoot.querySelector("img")!;

		const previousButtonElement =
			shadowRoot.querySelector("[part*=previous]")!;
		previousButtonElement.addEventListener(
			"click",
			this._handlePrevious.bind(this)
		);
		const nextButtonElement = shadowRoot.querySelector("[part*=next]")!;
		nextButtonElement.addEventListener(
			"click",
			this._handleNext.bind(this)
		);

		this._currentSpanElement = shadowRoot.querySelector("#current")!;
		this._totalSpanElement = shadowRoot.querySelector("#total")!;

		this.addEventListener("click", this._handleOpen.bind(this));
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | undefined,
		newValue: string | undefined
	): void {
		if (name === "selectors") {
			this._selectors = newValue ?? "img";
		}

		this._update();
	}

	/**
	 * @internal
	 */
	private _handleSlotChange(e: any): void {
		this._update();
	}

	/**
	 * @internal
	 */
	private _handleOpen(e: MouseEvent): void {
		const index = [].findIndex.call(this._selectedElements, (element) => {
			return element === e.target;
		});

		if (index !== -1) {
			e.preventDefault();

			// Show dialog
			this._dialogElement.showModal();

			// Update image
			this.currentIndex = index;
		}
	}

	/**
	 * @internal
	 */
	private _handlePrevious(_: any): void {
		this.currentIndex--;
	}

	/**
	 * @internal
	 */
	private _handleNext(_: any): void {
		this.currentIndex++;
	}

	/// https://stackoverflow.com/a/57463812
	/**
	 * @internal
	 */
	private _handleClick(e: MouseEvent): void {
		const target = e.target as HTMLDialogElement;

		if (target.tagName !== "DIALOG") {
			return;
		}

		const rect = target.getBoundingClientRect();

		const clickedInDialog =
			rect.top <= e.clientY &&
			e.clientY <= rect.top + rect.height &&
			rect.left <= e.clientX &&
			e.clientX <= rect.left + rect.width;

		if (!clickedInDialog) {
			target.close();
		}
	}

	/**
	 * @internal
	 */
	private _update(): void {
		this._selectedElements = Array.from(
			this.querySelectorAll(this._selectors)
		);
		this._totalSpanElement.innerText =
			this._selectedElements.length.toString();
	}
}
