var h=Object.defineProperty;var c=(d,e)=>h(d,"name",{value:e,configurable:!0});var b=Object.defineProperty,m=c((d,e)=>b(d,"name",{value:e,configurable:!0}),"c");class i extends HTMLElement{constructor(){super(),this.addEventListener("change",this.i.bind(this)),this.addEventListener("input",this.r.bind(this)),new MutationObserver(this.n.bind(this)).observe(this,{subtree:!0,childList:!0,attributes:!0})}connectedCallback(){this.n()}disconnnectedCallback(){this.e=void 0}static s(e){const t=e;return e.tagName==="INPUT"&&(t.type==="checkbox"||t.type==="radio")}i(e){const t=e.target;i.s(t)&&this.t(t)}r(e){const t=e.target;i.s(t)||this.t(t)}t(e){var t,a;if(!e.validity.valid||!this.e)return;const o=(t=this.e.findIndex(s=>s===e))!=null?t:-1,r=o+1;if(o===-1||r>=this.e.length)return;const n=this.e[r];if(n.matches(":disabled")){this.t(n);return}if(n.tagName==="INPUT"){const s=n,u=s.type,l=s.name;if(u==="radio"&&l!=null&&((a=s.closest("form"))!=null?a:document.body).querySelector(`input[type=radio][name=${l}]:checked`)!=null){this.t(s);return}}n.focus(),(n.tagName==="INPUT"||n.tagName==="TEXTAREA")&&n.select()}n(){const e=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT,{acceptNode:t=>t.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});this.e=[];for(let t=e.nextNode();t!==null;t=e.nextNode())this.e.push(t);this.e.sort((t,a)=>{const o=t.tabIndex,r=a.tabIndex;return o===0?1:r===0?-1:t.tabIndex-a.tabIndex})}}c(i,"r"),m(i,"AutoTabElement"),window.customElements.get("auto-tab")===void 0&&(window.customElements.define("auto-tab",i),window.AutoTabElement=i);export{i as default};
//# sourceMappingURL=index.js.map
