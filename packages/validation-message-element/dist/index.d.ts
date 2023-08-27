import ValidationMessageElement from "./ValidationMessageElement";
export default ValidationMessageElement;
declare global {
    interface Window {
        ValidationMessageElement: typeof ValidationMessageElement;
    }
    interface HTMLElementTagNameMap {
        "validation-message": ValidationMessageElement;
    }
}
//# sourceMappingURL=index.d.ts.map