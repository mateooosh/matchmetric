if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>i(e,t),u={module:{uri:t},exports:l,require:o};s[t]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-6a5bdeff.css",revision:null},{url:"assets/index-c3ac4d88.js",revision:null},{url:"assets/index.es-14500683-d2ab5ef6.js",revision:null},{url:"assets/purify.es-a544e5a7-3571ba00.js",revision:null},{url:"index.html",revision:"9b375cecd2733be253c41e6b3ca79b4e"},{url:"registerSW.js",revision:"e773d21719e8db11563b754f9ea09e76"},{url:"manifest.webmanifest",revision:"662a2f0c8ffb6f06fad3fab6d544baeb"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
