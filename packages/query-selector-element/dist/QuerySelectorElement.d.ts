export default class QuerySelector extends HTMLElement {
    static get observedAttributes(): string[];
    get inputName(): string | undefined;
    set inputName(value: any);
    get selectors(): string | undefined;
    set selectors(value: any);
    constructor();
    attributeChangedCallback(name: string, _oldValue: string | undefined, newValue: string | undefined): void;
}
//# sourceMappingURL=QuerySelectorElement.d.ts.map