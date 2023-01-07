import DetailsAccordionElement from "./DetailsAccordionElement";

export default DetailsAccordionElement;

console.log(window.customElements.get("details-accordion"))

if (window.customElements.get("details-accordion") === undefined) {
	window.customElements.define("details-accordion", DetailsAccordionElement);
}
