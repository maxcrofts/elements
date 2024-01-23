import AutoTabElement from "./AutoTabElement";

export default AutoTabElement;

declare global {
	interface Window {
		AutoTabElement: typeof AutoTabElement;
	}

	interface HTMLElementTagNameMap {
		"auto-tab": AutoTabElement;
	}
}

if (window.customElements.get("auto-tab") === undefined) {
	window.customElements.define("auto-tab", AutoTabElement);
	window.AutoTabElement = AutoTabElement;
}
