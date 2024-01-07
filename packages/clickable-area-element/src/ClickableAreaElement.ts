export default class ClickableAreaElement extends HTMLElement {
	/**
	 * @internal
	 */
	private _htmlFor: string | undefined;

	static get observedAttributes(): string[] {
		return ["for"];
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
				const element =
					this._htmlFor != null
						? document.getElementById(this._htmlFor)
						: null;

				// Pass focus if current target is not a form control element
				const tagName = (e.target as HTMLElement)?.tagName;
				if (
					tagName !== "BUTTON" &&
					tagName !== "INPUT" &&
					tagName !== "SELECT" &&
					tagName !== "TEXTAREA"
				) {
					element?.focus();
				}

				// Forward click event if it is not for us
				if (e.target !== element) {
					const newEvent = new PointerEvent(e.type, e);
					element?.dispatchEvent(newEvent);
				}
			},
			false,
		);
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
}
