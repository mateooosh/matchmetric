if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const f=e=>i(e,t),d={module:{uri:t},exports:o,require:f};s[t]=Promise.all(n.map((e=>d[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-0be365d2.js",revision:null},{url:"assets/index-a8f2a835.css",revision:null},{url:"index.html",revision:"c6c742b204dbf76daad7fab4cf09f3cd"},{url:"registerSW.js",revision:"e773d21719e8db11563b754f9ea09e76"},{url:"manifest.webmanifest",revision:"662a2f0c8ffb6f06fad3fab6d544baeb"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
