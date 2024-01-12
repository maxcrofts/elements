export default class ClickableAreaElement extends HTMLElement {
	/**
	 * @internal
	 */
	private _implicitControl: HTMLElement | null = null;

	/**
	 * @internal
	 */
	private _htmlFor: string | undefined;

	static get observedAttributes(): string[] {
		return ["for"];
	}

	get control(): HTMLElement | null {
		return this._htmlFor != null
			? document.getElementById(this._htmlFor) ?? this._implicitControl
			: this._implicitControl;
	}

	get htmlFor(): string | undefined {
		return this._htmlFor;
	}

	set htmlFor(value: any) {
		if (value != null) {
			this.setAttribute("for", value.toString());
		} else {
			this.removeAttribute("for");
		}
	}

	constructor() {
		super();

		this.addEventListener(
			"click",
			(e) => {
				const control = this.control;

				// Pass focus if current target is not a form control element
				const tagName = (e.target as HTMLElement)?.tagName;
				if (
					tagName !== "BUTTON" &&
					tagName !== "INPUT" &&
					tagName !== "SELECT" &&
					tagName !== "TEXTAREA"
				) {
					control?.focus();
				}

				// Forward click event if it is not for us
				if (e.target !== control) {
					const newEvent = new PointerEvent(e.type, e);
					control?.dispatchEvent(newEvent);
				}
			},
			false,
		);

		const observer = new MutationObserver(this._walk.bind(this));
		observer.observe(this, {
			subtree: true,
			childList: true,
		});
	}

	connectedCallback() {
		this._walk();
	}

	disconnnectedCallback() {
		this._implicitControl = null;
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | undefined,
		newValue: string | undefined,
	): void {
		if (name === "for") {
			this._htmlFor = newValue;
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
				acceptNode: (node) => {
					switch ((node as HTMLElement)?.tagName) {
						case "INPUT":
							return (node as HTMLInputElement).hidden
								? NodeFilter.FILTER_SKIP
								: NodeFilter.FILTER_ACCEPT;
						case "BUTTON":
						case "METER":
						case "OUTPUT":
						case "PROGRESS":
						case "SELECT":
						case "TEXTAREA":
							return NodeFilter.FILTER_ACCEPT;
						default:
							return NodeFilter.FILTER_SKIP;
					}
				},
			},
		);

		this._implicitControl = treeWalker.nextNode() as HTMLElement;
	}
}
