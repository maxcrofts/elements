export default class QuerySelector extends HTMLElement {
	/**
	 * @internal
	 */
	private _inputName: string | undefined;

	/**
	 * @internal
	 */
	private _selectors: string | undefined;

	/**
	 * @internal
	 */
	private _selectedElements: HTMLElement[] | undefined;

	static get observedAttributes(): string[] {
		return ["input-name", "selectors"];
	}

	get inputName(): string | undefined {
		return this._inputName;
	}

	set inputName(value: any) {
		if (value != null) {
			this.setAttribute("input-name", value.toString());
		} else {
			this.removeAttribute("input-name");
		}
	}

	get selectors(): string | undefined {
		return this._selectors;
	}

	set selectors(value: any) {
		if (value != null) {
			this.setAttribute("selectors", value.toString());
		} else {
			this.removeAttribute("selectors");
		}
	}

	constructor() {
		super();

		this.addEventListener("change", this._update.bind(this));

		const observer = new MutationObserver(this._update.bind(this));
		observer.observe(this, { subtree: true, childList: true });
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | undefined,
		newValue: string | undefined,
	): void {
		if (name === "input-name") {
			this._inputName = newValue;
		} else if (name === "selectors") {
			this._selectors = newValue;
		}

		this._update();
	}

	/**
	 * @internal
	 */
	private _update(): void {
		// Remove attribute from previously selected elements
		if (this._selectedElements !== undefined) {
			const selectedElementsLength = this._selectedElements.length;

			for (let i = 0; i < selectedElementsLength; i++) {
				delete this._selectedElements[i].dataset.selected;
			}

			this._selectedElements = undefined;
		}

		// Get selectors from input
		let inputSelectors = "";

		if (this._inputName !== undefined) {
			// TODO: Support more than radio buttons
			const input = this.querySelector(
				`input[name=${this._inputName}]:checked`,
			);

			if (input !== null) {
				inputSelectors = input.getAttribute("value") ?? "";
			}
		}

		if (this._selectors !== undefined) {
			// If we have a selectors attribute
			this._selectedElements = Array.from(
				this.querySelectorAll(this._selectors),
			);
		} else if (inputSelectors !== "") {
			// If an input has selected something
			this._selectedElements = Array.from(
				this.querySelectorAll(inputSelectors),
			);
			// Clear `inputSelectors` so we get the fast path below
			inputSelectors = "";
		}

		if (this._selectedElements !== undefined) {
			const selectedElementsLength = this._selectedElements.length;

			if (inputSelectors !== "") {
				for (let i = 0; i < selectedElementsLength; i++) {
					const selectedElement = this._selectedElements[i];

					if (selectedElement.matches(inputSelectors)) {
						selectedElement.dataset.selected = "";
					}
				}
			} else {
				for (let i = 0; i < selectedElementsLength; i++) {
					this._selectedElements[i].dataset.selected = "";
				}
			}
		}
	}
}
