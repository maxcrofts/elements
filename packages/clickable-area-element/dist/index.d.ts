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
//# sourceMappingURL=index.d.ts.map