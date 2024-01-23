export default class AutoTabElement extends HTMLElement {
	/**
	 * @internal
	 */
	private _elements: HTMLElement[] | undefined;

	constructor() {
		super();

		this.addEventListener("change", this._handleChange.bind(this));
		this.addEventListener("input", this._handleInput.bind(this));

		const observer = new MutationObserver(this._walk.bind(this));
		observer.observe(this, {
			subtree: true,
			childList: true,
			attributes: true,
		});
	}

	connectedCallback() {
		this._walk();
	}

	disconnnectedCallback() {
		this._elements = undefined;
	}

	/**
	 * @internal
	 */
	private static _isCheckboxOrRadioInput(element: HTMLElement): boolean {
		const inputElement = element as HTMLInputElement;
		return (
			element.tagName === "INPUT" &&
			(inputElement.type === "checkbox" || inputElement.type === "radio")
		);
	}

	/**
	 * @internal
	 */
	private _handleChange(e: Event): void {
		const target = e.target as HTMLElement;

		if (AutoTabElement._isCheckboxOrRadioInput(target)) {
			this._update(target);
		}
	}

	/**
	 * @internal
	 */
	private _handleInput(e: Event): void {
		const target = e.target as HTMLElement;

		if (!AutoTabElement._isCheckboxOrRadioInput(target)) {
			this._update(target);
		}
	}

	/**
	 * @internal
	 */
	private _update(currentElement: HTMLElement): void {
		if (!(currentElement as any).validity.valid || !this._elements) {
			return;
		}

		const currentIndex =
			this._elements.findIndex((value) => value === currentElement) ?? -1;
		const nextIndex = currentIndex + 1;

		if (currentIndex === -1 || nextIndex >= this._elements.length) {
			return;
		}

		const nextElement = this._elements[nextIndex];

		// Skip disabled elements
		if (nextElement.matches(":disabled")) {
			this._update(nextElement);
			return;
		}

		// Special case for radio buttons
		if (nextElement.tagName === "INPUT") {
			const nextInputElement = nextElement as HTMLInputElement;
			const type = nextInputElement.type;
			const name = nextInputElement.name;

			if (type === "radio" && name != null) {
				const parentElement =
					nextInputElement.closest("form") ?? document.body;
				const selectedInputElement = parentElement.querySelector(
					`input[type=radio][name=${name}]:checked`,
				);

				if (selectedInputElement != null) {
					this._update(nextInputElement);
					return;
				}
			}
		}

		nextElement.focus();

		// Select all text
		if (
			nextElement.tagName === "INPUT" ||
			nextElement.tagName === "TEXTAREA"
		) {
			(nextElement as HTMLInputElement | HTMLTextAreaElement).select();
		}
	}

	/**
	 * @internal
	 */
	private _walk(): void {
		const treeWalker = document.createTreeWalker(
			this,
			NodeFilter.SHOW_ELEMENT,
			{
				acceptNode: (node) =>
					(node as HTMLElement).tabIndex >= 0
						? NodeFilter.FILTER_ACCEPT
						: NodeFilter.FILTER_SKIP,
			},
		);

		this._elements = [];
		for (
			let node = treeWalker.nextNode();
			node !== null;
			node = treeWalker.nextNode()
		) {
			this._elements.push(node as HTMLElement);
		}

		// Sort in ascending order, moving all 0s to the end
		this._elements.sort((a, b) => {
			const aTabIndex = a.tabIndex;
			const bTabIndex = b.tabIndex;

			if (aTabIndex === 0) {
				return 1;
			}

			if (bTabIndex === 0) {
				return -1;
			}

			return a.tabIndex - b.tabIndex;
		});
	}
}
