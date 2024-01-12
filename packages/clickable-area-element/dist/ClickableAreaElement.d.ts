export default class ClickableAreaElement extends HTMLElement {
    static get observedAttributes(): string[];
    get control(): HTMLElement | null;
    get htmlFor(): string | undefined;
    set htmlFor(value: any);
    constructor();
    connectedCallback(): void;
    disconnnectedCallback(): void;
    attributeChangedCallback(name: string, _oldValue: string | undefined, newValue: string | undefined): void;
}
//# sourceMappingURL=ClickableAreaElement.d.ts.map