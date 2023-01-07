export default class DetailsAccordionElement extends HTMLElement {
    static get observedAttributes(): string[];
    get animationDuration(): number;
    set animationDuration(value: number);
    get animationFinished(): Promise<Animation | void>;
    constructor();
    attributeChangedCallback(name: string, _oldValue: string | undefined, newValue: string | undefined): void;
}
//# sourceMappingURL=DetailsAccordionElement.d.ts.map