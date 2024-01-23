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
//# sourceMappingURL=index.d.ts.map