describe("details-accordion",()=>{let a,i,t;beforeEach(async()=>{a=document.createElement("details-accordion"),document.body.appendChild(a),a.innerHTML=`
			<details>
				<summary>
					ABC
				</summary>
				123
			</details>
			<details>
				<summary>
					DEF
				</summary>
				456
			</details>
		`,i=Array.from(a.querySelectorAll("details")),assert.equal(i.length,2),t=Array.from(a.querySelectorAll("summary")),assert.equal(t.length,2)}),afterEach(async()=>{a.remove()}),it("applies `open` attribute immediately on opening",()=>{a.animationDuration=5,t[0].click(),assert.isTrue(i[0].hasAttribute("open"))}),it("applies `data-details-accordion-open` attribute immediately on opening",()=>{a.animationDuration=5,t[0].click(),assert.isTrue(i[0].hasAttribute("data-details-accordion-open"))}),it("applies `data-details-accordion-animating` attribute immediately on opening",()=>{a.animationDuration=5,t[0].click(),assert.isTrue(i[0].hasAttribute("data-details-accordion-animating"))}),it("removes `open` attribute once fully closed",async()=>{t[0].click(),a.animationDuration=2,t[0].click(),assert.isTrue(i[0].hasAttribute("open")),await a.animationFinished,assert.isFalse(i[0].hasAttribute("open"))}),it("removes `data-details-accordion-open` attribute immediately on closing",()=>{t[0].click(),a.animationDuration=5,t[0].click(),assert.isFalse(i[0].hasAttribute("data-details-accordion-open"))}),it("removes `data-details-accordion-animating` attribute once fully closed",async()=>{t[0].click(),a.animationDuration=2,t[0].click(),assert.isTrue(i[0].hasAttribute("data-details-accordion-animating")),await a.animationFinished,assert.isFalse(i[0].hasAttribute("data-details-accordion-animating"))}),it("sets `animationDuration` property based on `animation-duration` attribute",()=>{a.setAttribute("animation-duration",42 .toString()),assert.equal(a.animationDuration,42)}),it("sets `animation-duration` attribute based on `animationDuration` property",()=>{a.animationDuration=42,assert.equal(a.getAttribute("animation-duration"),42 .toString())})});
//# sourceMappingURL=DetailsAccordionElement.spec.js.map
