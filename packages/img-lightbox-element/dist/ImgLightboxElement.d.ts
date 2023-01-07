export default class ImgLightboxElement extends HTMLElement {
    static get observedAttributes(): string[];
    get selectors(): string;
    set selectors(value: any);
    get currentIndex(): number;
    set currentIndex(value: number);
    constructor();
    attributeChangedCallback(name: string, _oldValue: string | undefined, newValue: string | undefined): void;
}
//# sourceMappingURL=ImgLightboxElement.d.ts.map