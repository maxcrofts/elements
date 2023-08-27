export default class ValidationMessageElement extends HTMLElement {
    static get observedAttributes(): string[];
    get htmlFor(): string | undefined;
    set htmlFor(value: any);
    get event(): string | undefined;
    set event(value: any);
    attributeChangedCallback(name: string, _oldValue: string | undefined, newValue: string | undefined): void;
}
//# sourceMappingURL=ValidationMessageElement.d.ts.map