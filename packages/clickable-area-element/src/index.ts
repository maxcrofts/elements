import ClickableAreaElement from "./ClickableAreaElement";

export default ClickableAreaElement;

declare global {
	interface Window {
		ClickableAreaElement: typeof ClickableAreaElement;
	}

	interface HTMLElementTagNameMap {
		"clickable-area": ClickableAreaElement;
	}
}

if (window.customElements.get("clickable-area") === undefined) {
	window.customElements.define("clickable-area", ClickableAreaElement);
	window.ClickableAreaElement = ClickableAreaElement;
}
