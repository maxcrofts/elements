import ValidationMessageElement from "./ValidationMessageElement";

export default ValidationMessageElement;

declare global {
	interface Window {
		ValidationMessageElement: typeof ValidationMessageElement;
	}

	interface HTMLElementTagNameMap {
		"validation-message": ValidationMessageElement;
	}
}

if (window.customElements.get("validation-message") === undefined) {
	window.customElements.define(
		"validation-message",
		ValidationMessageElement,
	);
	window.ValidationMessageElement = ValidationMessageElement;
}
