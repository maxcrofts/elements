import QuerySelectorElement from "./QuerySelectorElement";

export default QuerySelectorElement;

if (window.customElements.get("query-selector") === undefined) {
	window.customElements.define("query-selector", QuerySelectorElement);
}
