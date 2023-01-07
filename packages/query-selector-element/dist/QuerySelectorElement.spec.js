describe("query-selector",()=>{it("selects nothing by default",async()=>{document.body.innerHTML=`
			<query-selector>
				<div class="foo"></div>
				<div class="bar"></div>
			</query-selector>
		`;const e=document.body.firstElementChild.querySelectorAll("[data-selected]");assert.equal(e.length,0)}),it("selects correct element based on `selectors` attribute",async()=>{document.body.innerHTML=`
			<query-selector selectors=".yes">
				<div class="yes"></div>
				<div class="no"></div>
			</query-selector>
		`;const e=document.body.firstElementChild,t=e.querySelector("[data-selected]"),l=e.querySelector(".yes");assert.equal(t,l)}),it("selects correct elements based on `selectors` attribute",async()=>{document.body.innerHTML=`
			<query-selector selectors=".yes">
				<div class="yes"></div>
				<div class="no"></div>
				<div class="yes"></div>
				<div class="no"></div>
			</query-selector>
		`;const e=document.body.firstElementChild,t=e.querySelectorAll("[data-selected]"),l=e.querySelectorAll(".yes");assert.equal(t.length,l.length),assert.deepEqual(t,l)}),it("selects correct elements based on radio input",async()=>{document.body.innerHTML=`
			<query-selector input-name="theInput">
				<form>
					<input
						type="radio"
						name="theInput"
						value=".a"
						checked
					/>
					<input
						type="radio"
						name="theInput"
						value=".b"
					/>
					<input
						type="radio"
						name="theInput"
						value=".c"
					/>
				</form>

				<div class="a"></div>
				<div class="b"></div>
				<div class="a"></div>
				<div class="b"></div>
				<div class="a"></div>
			</query-selector>
		`;const e=document.body.firstElementChild,t=e.querySelector("input[value=\\.a]"),l=e.querySelector("input[value=\\.b]"),r=e.querySelector("input[value=\\.c]");let s=e.querySelectorAll("[data-selected]"),a=e.querySelectorAll(".a");assert.equal(s.length,a.length),l.click(),s=e.querySelectorAll("[data-selected]"),a=e.querySelectorAll(".b"),assert.equal(s.length,a.length),r.click(),s=e.querySelectorAll("[data-selected]"),a=e.querySelectorAll(".c"),assert.equal(s.length,a.length),t.click(),s=e.querySelectorAll("[data-selected]"),a=e.querySelectorAll(".a"),assert.equal(s.length,a.length)}),it("applies `data-selected` attribute when child elements are added",async()=>{document.body.innerHTML=`
			<div>
				<query-selector selectors=".yes">
					<div class="yes"></div>
					<div class="no"></div>
				</query-selector>
				<div class="yes"></div>
			</div>
		`;const e=document.body.firstElementChild,t=e.querySelector("query-selector"),l=e.querySelector(":scope > .yes");let r=t.querySelectorAll("[data-selected]"),s=t.querySelectorAll(".yes");assert.equal(r.length,1),assert.equal(r.length,s.length),assert.deepEqual(r,s),assert.isFalse(l.hasAttribute("data-selected")),t.appendChild(l),await new Promise(a=>requestAnimationFrame(a)),r=t.querySelectorAll("[data-selected]"),s=t.querySelectorAll(".yes"),assert.equal(r.length,2),assert.equal(r.length,s.length),assert.deepEqual(r,s),assert.isTrue(l.hasAttribute("data-selected"))}),it("sets `inputName` property based on `input-name` attribute",async()=>{const e=document.createElement("query-selector"),t="theInput";e.setAttribute("input-name",t),assert.equal(e.inputName,t)}),it("sets `input-name` attribute based on `inputName` property",async()=>{const e=document.createElement("query-selector"),t="theInput";e.inputName=t,assert.equal(e.getAttribute("input-name"),t)}),it("sets `selectors` property based on `selectors` attribute",async()=>{const e=document.createElement("query-selector"),t=".aClass";e.setAttribute("selectors",t),assert.equal(e.selectors,t)}),it("sets `selectors` attribute based on `selectors` property",async()=>{const e=document.createElement("query-selector"),t=".aClass";e.selectors=t,assert.equal(e.getAttribute("selectors"),t)})});
//# sourceMappingURL=QuerySelectorElement.spec.js.map
