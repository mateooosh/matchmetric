if(!self.define){let e,a={};const i=(i,o)=>(i=new URL(i+".js",o).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(o,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let d={};const s=e=>i(e,n),l={module:{uri:n},exports:d,require:s};a[n]=Promise.all(o.map((e=>l[e]||s(e)))).then((e=>(r(...e),d)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-33458432.css",revision:null},{url:"assets/index-7598f90a.js",revision:null},{url:"index.html",revision:"263de9f8dff888c279a6dcaed805f338"},{url:"registerSW.js",revision:"e773d21719e8db11563b754f9ea09e76"},{url:"windows11/SmallTile.scale-100.png",revision:"55670f2f05522c2d970c2e97c99ae66a"},{url:"windows11/SmallTile.scale-125.png",revision:"3eb28d99da12f7bec1012c67e618801a"},{url:"windows11/SmallTile.scale-150.png",revision:"2f2ef82a4b0dd99fde055c7bce61d4f9"},{url:"windows11/SmallTile.scale-200.png",revision:"5a2e3be7eded3aedf37e470eb6d5bddb"},{url:"windows11/SmallTile.scale-400.png",revision:"f5d75cd24ecb8dcdc958c0328e09e48e"},{url:"windows11/Square150x150Logo.scale-100.png",revision:"d3d84be32f34905350c451c01afcef64"},{url:"windows11/Square150x150Logo.scale-125.png",revision:"28fa7055e09a0256ca7d58d3dccd92df"},{url:"windows11/Square150x150Logo.scale-150.png",revision:"cec2fa6dc618ba7b2e65946cae465a6e"},{url:"windows11/Square150x150Logo.scale-200.png",revision:"6ae06db6aad55276a149b9c77df8f615"},{url:"windows11/Square150x150Logo.scale-400.png",revision:"4c42cfe0ea769fd1cece94e294186f87"},{url:"windows11/Wide310x150Logo.scale-100.png",revision:"5c75d2a0f83974c733053ec95a0fe912"},{url:"windows11/Wide310x150Logo.scale-125.png",revision:"cf69d7ef94ce6344d04dbf4bfc60556f"},{url:"windows11/Wide310x150Logo.scale-150.png",revision:"6155fc2c922a90c68d1313e30cc21589"},{url:"windows11/Wide310x150Logo.scale-200.png",revision:"fe3571bc653600ef19aada49d153a31e"},{url:"windows11/Wide310x150Logo.scale-400.png",revision:"b39d5a24ab804d5c9b8b3fc1cdc95bc3"},{url:"windows11/LargeTile.scale-100.png",revision:"72d2250280fd542db56369072854fe95"},{url:"windows11/LargeTile.scale-125.png",revision:"09194dbea15484a984b33cc58ea86c42"},{url:"windows11/LargeTile.scale-150.png",revision:"ca4e7ddb94b8855a6511ea4857d8ddd9"},{url:"windows11/LargeTile.scale-200.png",revision:"d1deca77db5972cb4f16eb62236b093b"},{url:"windows11/LargeTile.scale-400.png",revision:"904844ac21500a2c6b0c286023cb4a89"},{url:"windows11/Square44x44Logo.scale-100.png",revision:"0f3457babf77c81e4a9862f02f3ee7f3"},{url:"windows11/Square44x44Logo.scale-125.png",revision:"1aa08108bee9986cca5ae401d71c3d27"},{url:"windows11/Square44x44Logo.scale-150.png",revision:"06ffac3d27b3b1f46295efda88a272e5"},{url:"windows11/Square44x44Logo.scale-200.png",revision:"0e209ca1b0f14e840448fd3965b9436b"},{url:"windows11/Square44x44Logo.scale-400.png",revision:"a5a5cb781589a84e3e387dbb342a8d4d"},{url:"windows11/StoreLogo.scale-100.png",revision:"16d81abffc676a2a42142b053253496d"},{url:"windows11/StoreLogo.scale-125.png",revision:"1ace5801edd881167bb83bb6797ed268"},{url:"windows11/StoreLogo.scale-150.png",revision:"7d75ae22422e7404074e49aecacecb56"},{url:"windows11/StoreLogo.scale-200.png",revision:"b4d4a48f63aa199bf90a121ab230cedf"},{url:"windows11/StoreLogo.scale-400.png",revision:"3bd2146ffffd7d1cbbf51994424b141d"},{url:"windows11/SplashScreen.scale-100.png",revision:"fe3571bc653600ef19aada49d153a31e"},{url:"windows11/SplashScreen.scale-125.png",revision:"b9c1c6730e3036d038c6218d82d3e5e7"},{url:"windows11/SplashScreen.scale-150.png",revision:"fd85789a1f629458f6bc1ff020e4f54d"},{url:"windows11/SplashScreen.scale-200.png",revision:"b39d5a24ab804d5c9b8b3fc1cdc95bc3"},{url:"windows11/SplashScreen.scale-400.png",revision:"e93d6ec04c417e5f08a3f247587dd610"},{url:"windows11/Square44x44Logo.targetsize-16.png",revision:"b3e774194c2817a555be9aa8ef6808cf"},{url:"windows11/Square44x44Logo.targetsize-20.png",revision:"7cb22b94fe88bb3bc0f9f5224d985ea2"},{url:"windows11/Square44x44Logo.targetsize-24.png",revision:"b57a2e2f9b7b259a528c25010395b897"},{url:"windows11/Square44x44Logo.targetsize-30.png",revision:"14bc5ba4f3551308bb191d4703b71021"},{url:"windows11/Square44x44Logo.targetsize-32.png",revision:"5605d35568684d5b008e92fc32af6386"},{url:"windows11/Square44x44Logo.targetsize-36.png",revision:"8dde037b33d40919e3110d5e29ceede7"},{url:"windows11/Square44x44Logo.targetsize-40.png",revision:"15758c9e8dd64d24b52e81f746560610"},{url:"windows11/Square44x44Logo.targetsize-44.png",revision:"0f3457babf77c81e4a9862f02f3ee7f3"},{url:"windows11/Square44x44Logo.targetsize-48.png",revision:"e944b0f67a6bf10a68b126097e768c4a"},{url:"windows11/Square44x44Logo.targetsize-60.png",revision:"2f91634fdfefa5d55afe0296c73cbe39"},{url:"windows11/Square44x44Logo.targetsize-64.png",revision:"232659f106edacdd020888944c988165"},{url:"windows11/Square44x44Logo.targetsize-72.png",revision:"5d928304f18a296d031d6b9c3655e247"},{url:"windows11/Square44x44Logo.targetsize-80.png",revision:"987281a5610cbf5219a176ea45680660"},{url:"windows11/Square44x44Logo.targetsize-96.png",revision:"9a5ea281c3895a36fbdc9b6370580a40"},{url:"windows11/Square44x44Logo.targetsize-256.png",revision:"c9f8ce6aa5e8e726deb63662eb73be30"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"b3e774194c2817a555be9aa8ef6808cf"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"7cb22b94fe88bb3bc0f9f5224d985ea2"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"b57a2e2f9b7b259a528c25010395b897"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"14bc5ba4f3551308bb191d4703b71021"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"5605d35568684d5b008e92fc32af6386"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"8dde037b33d40919e3110d5e29ceede7"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"15758c9e8dd64d24b52e81f746560610"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"0f3457babf77c81e4a9862f02f3ee7f3"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"e944b0f67a6bf10a68b126097e768c4a"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"2f91634fdfefa5d55afe0296c73cbe39"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"232659f106edacdd020888944c988165"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"5d928304f18a296d031d6b9c3655e247"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"987281a5610cbf5219a176ea45680660"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"9a5ea281c3895a36fbdc9b6370580a40"},{url:"windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"c9f8ce6aa5e8e726deb63662eb73be30"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"b3e774194c2817a555be9aa8ef6808cf"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"7cb22b94fe88bb3bc0f9f5224d985ea2"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"b57a2e2f9b7b259a528c25010395b897"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"14bc5ba4f3551308bb191d4703b71021"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"5605d35568684d5b008e92fc32af6386"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"8dde037b33d40919e3110d5e29ceede7"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"15758c9e8dd64d24b52e81f746560610"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"0f3457babf77c81e4a9862f02f3ee7f3"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"e944b0f67a6bf10a68b126097e768c4a"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"2f91634fdfefa5d55afe0296c73cbe39"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"232659f106edacdd020888944c988165"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"5d928304f18a296d031d6b9c3655e247"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"987281a5610cbf5219a176ea45680660"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"9a5ea281c3895a36fbdc9b6370580a40"},{url:"windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"c9f8ce6aa5e8e726deb63662eb73be30"},{url:"android/android-launchericon-512-512.png",revision:"6a30d6c475b2eda76e89168fc8972464"},{url:"android/android-launchericon-192-192.png",revision:"32d5594450e4f000bec8a647f33162f2"},{url:"android/android-launchericon-144-144.png",revision:"7e794a7acb7a544ca6d60228fe0758f1"},{url:"android/android-launchericon-96-96.png",revision:"96e6e38cbc90192702c71067f96473c1"},{url:"android/android-launchericon-72-72.png",revision:"5a944ac51ddb6f294eb10bd3551a47fa"},{url:"android/android-launchericon-48-48.png",revision:"8af6115cabf12246f2c5dc219f1c3de2"},{url:"ios/16.png",revision:"f22ab424d5ac1f1c378ea21ef4dc005b"},{url:"ios/20.png",revision:"f0fbcb16b6c8ab38f027ada8940f3575"},{url:"ios/29.png",revision:"1dd80792b2c1b008a4387279ffbd9f0d"},{url:"ios/32.png",revision:"f37ec41ab19904ee1c537e446a2de0eb"},{url:"ios/40.png",revision:"cce68e77763b695ec96c719bc1d8e208"},{url:"ios/50.png",revision:"16d81abffc676a2a42142b053253496d"},{url:"ios/57.png",revision:"193ad9123b9eb51bd1a26468a9ee8468"},{url:"ios/58.png",revision:"fed7b18804524ac27bf7ac372a4f7ec3"},{url:"ios/60.png",revision:"268062a69e7e18e04117d9879872de57"},{url:"ios/64.png",revision:"36a0646e5e3ce04ff32944fc858c3c00"},{url:"ios/72.png",revision:"5a944ac51ddb6f294eb10bd3551a47fa"},{url:"ios/76.png",revision:"4cf1c2cebaf3085632098958fb01a2e2"},{url:"ios/80.png",revision:"e65f2627895400c2327c3f9d90eb99a9"},{url:"ios/87.png",revision:"87f0e0d274bc27b9a29b31e926e7b535"},{url:"ios/100.png",revision:"b4d4a48f63aa199bf90a121ab230cedf"},{url:"ios/114.png",revision:"a183c8b622e45e05fa9f50d2cbef7d91"},{url:"ios/120.png",revision:"7ade89a675f8b48f6cfd0978a7db44c6"},{url:"ios/128.png",revision:"1a3ad02f6678aac6716446767215a9e5"},{url:"ios/144.png",revision:"7e794a7acb7a544ca6d60228fe0758f1"},{url:"ios/152.png",revision:"8950d5cafef80e3b1213d341d275cad9"},{url:"ios/167.png",revision:"ad922fc1f2294e1ea465feaac839578f"},{url:"ios/180.png",revision:"a3b63298e259915c1b62800a1b59b65d"},{url:"ios/192.png",revision:"32d5594450e4f000bec8a647f33162f2"},{url:"ios/256.png",revision:"c232047ad703a3e7688b6d52b5b62126"},{url:"ios/512.png",revision:"6a30d6c475b2eda76e89168fc8972464"},{url:"ios/1024.png",revision:"5519630ec5013458fd298efe4ec9a373"},{url:"manifest.webmanifest",revision:"c9bab5092a7361e03bd7185fbda38445"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
