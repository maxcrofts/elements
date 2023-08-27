type SubmittableElement =
	| HTMLButtonElement
	| HTMLInputElement
	| HTMLOutputElement
	| HTMLSelectElement
	| HTMLTextAreaElement;

export default class ValidationMessageElement extends HTMLElement {
	/**
	 * @internal
	 */
	private _control?: SubmittableElement;

	/**
	 * @internal
	 */
	private _event: string = "invalid";

	/**
	 * @internal
	 */
	private readonly _handleEvent = (_: Event): void => {
		this.innerText = this._control?.validationMessage ?? "";
	};

	static get observedAttributes(): string[] {
		return ["for", "event"];
	}

	get htmlFor(): string | undefined {
		return this._control?.id;
	}

	set htmlFor(value: any) {
		if (value != null) {
			this.setAttribute("for", value.toString());
		} else {
			this.removeAttribute("for");
		}
	}

	get event(): string | undefined {
		return this._event;
	}

	set event(value: any) {
		if (value != null) {
			this.setAttribute("event", value.toString());
		} else {
			this.removeAttribute("event");
		}
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | undefined,
		newValue: string | undefined,
	): void {
		this._control?.removeEventListener(this._event, this._handleEvent);

		switch (name) {
			case "for":
				if (newValue != null) {
					const element = document.getElementById(newValue);
					if (element != null && "validity" in element) {
						this._control = document.getElementById(
							newValue,
						) as SubmittableElement;
					}
				}
				break;

			case "event":
				this._event = newValue ?? "invalid";
		}

		this._control?.addEventListener(this._event, this._handleEvent);
	}
}
