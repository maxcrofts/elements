import ImgLightboxElement from "./ImgLightboxElement";

export default ImgLightboxElement;

if (window.customElements.get("img-lightbox") === undefined) {
	window.customElements.define("img-lightbox", ImgLightboxElement);
}
