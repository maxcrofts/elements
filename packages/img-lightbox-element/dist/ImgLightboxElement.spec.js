var a=`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
	<style>
		text {
			font-family: sans-serif;
			font-size: 100px;
		}
	</style>

	<pattern id="checkerboard" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
		<rect x="0" y="0" width="120" height="120" fill="cyan"></rect>
		<rect x="0" y="0" width="60" height="60" fill="magenta"></rect>
		<rect x="60" y="60" width="60" height="60" fill="magenta"></rect>
	</pattern>

	<rect width="100%" height="100%" fill="url(#checkerboard)"></rect>
	<text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">1</text>
</svg>
`,o=`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
	<style>
		text {
			font-family: sans-serif;
			font-size: 100px;
		}
	</style>

	<rect width="100%" height="100%" fill="#9900ff"></rect>
	<circle cx="50%" cy="50%" r="60%" fill="#0099ff"></circle>
	<circle cx="50%" cy="50%" r="50%" fill="cyan"></circle>
	<circle cx="50%" cy="50%" r="40%" fill="green"></circle>
	<circle cx="50%" cy="50%" r="30%" fill="yellow"></circle>
	<circle cx="50%" cy="50%" r="20%" fill="orange"></circle>
	<circle cx="50%" cy="50%" r="10%" fill="red"></circle>
	<text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">2</text>
</svg>
`,h=`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
	<style>
		text {
			font-family: sans-serif;
			font-size: 100px;
		}
	</style>

	<rect width="100%" height="100%" fill="#0099ff"></rect>
	<path d="M 300,300 L 0,300 L 300,0 Z" fill="yellow"></path>
	<text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">3</text>
</svg>
`;describe("img-lightbox",()=>{let e,s,r,c,n,l,i,t;beforeEach(async()=>{e=document.createElement("img-lightbox"),document.body.appendChild(e),t=new Array(3),t[0]=document.createElement("img"),t[0].src="data:image/svg+xml;charset=utf-8,"+encodeURI(a),e.appendChild(t[0]),t[1]=document.createElement("img"),t[1].src="data:image/svg+xml;charset=utf-8,"+encodeURI(o),e.appendChild(t[1]),t[2]=document.createElement("img"),t[2].src="data:image/svg+xml;charset=utf-8,"+encodeURI(h),e.appendChild(t[2]),s=e.shadowRoot.querySelector("dialog"),r=e.shadowRoot.querySelector("button[part*=close]"),c=e.shadowRoot.querySelector("img"),n=e.shadowRoot.querySelector("span#current"),l=e.shadowRoot.querySelector("button[part*=previous]"),i=e.shadowRoot.querySelector("button[part*=next]")}),afterEach(async()=>{e.remove()}),it("starts closed",async()=>{assert.isFalse(s.open)}),it("opens when slotted `img` is clicked",async()=>{t[0].click(),assert.isTrue(s.open)}),it("closes when closed button is clicked",async()=>{t[0].click(),r.click(),assert.isFalse(s.open)}),it("opens the correct image",async()=>{t[1].click(),assert.equal(c.src,t[1].src),assert.equal(n.textContent,"2")}),it("goes to the next image",async()=>{t[0].click(),i.click(),assert.equal(c.src,t[1].src),assert.equal(n.textContent,"2")}),it("goes to the previous image",async()=>{t[1].click(),l.click(),assert.equal(c.src,t[0].src),assert.equal(n.textContent,"1")}),it("wraps to the last image",async()=>{t[0].click(),l.click(),assert.equal(c.src,t[t.length-1].src),assert.equal(n.textContent,"3")}),it("wraps to the first image",async()=>{t[t.length-1].click(),i.click(),assert.equal(c.src,t[0].src),assert.equal(n.textContent,"1")})});
//# sourceMappingURL=ImgLightboxElement.spec.js.map
