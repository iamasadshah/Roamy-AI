if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"0561174c9750aaabc2f178184a12138f"},{url:"/_next/static/ZMQ-nI5vrYesEYRS8KzhC/_buildManifest.js",revision:"f9c5bde41ad6edff094530ff2ef802cf"},{url:"/_next/static/ZMQ-nI5vrYesEYRS8KzhC/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/203.215f7ebb412294c3.js",revision:"215f7ebb412294c3"},{url:"/_next/static/chunks/218.61652cd84faa3076.js",revision:"61652cd84faa3076"},{url:"/_next/static/chunks/25386026-0175ede101eb47d3.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/4bd1b696-4a81882527faa9f5.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/517-07206d6aae689e96.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/560-ffce663a96bf774e.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/5e22fd23-255a0e7a78b0e318.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/666-9337df016281509f.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/8e1d74a4-1d879ed8a1928d8b.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/app/_not-found/page-7c72fa192b5be65b.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/app/api/exchange-rate/route-dfe23ef9156ae6ae.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/app/layout-ddad32dada92c318.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/app/page-4bbc7ec64f0c4ad7.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/app/pages/documentation/page-5cc82f099b3566f8.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/framework-c76864a09627f16c.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/main-afa4774b7ac9d186.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/main-app-09930829117cc03c.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/pages/_app-d06710d017de1264.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/pages/_error-f6f4269e9e749caa.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-8a983da1855488af.js",revision:"ZMQ-nI5vrYesEYRS8KzhC"},{url:"/_next/static/css/0acef4df005bbe6c.css",revision:"0acef4df005bbe6c"},{url:"/_next/static/css/3d5344c6cec87b99.css",revision:"3d5344c6cec87b99"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/favicon.png",revision:"193e15c53ab97a537109d5077d6990a4"},{url:"/images/bg-video.webm",revision:"04311ee64374baee18726424b0ba9286"},{url:"/images/couple.jpg",revision:"b59ee22a546b42c06ed52a25975a2ae5"},{url:"/images/dubai.jpg",revision:"e09ce7b58300bea326530872037a6afb"},{url:"/images/family-profile.jpg",revision:"9d825eb8d9519aaa3cd9dd7c1cbdec7b"},{url:"/images/luxury-pattern.png",revision:"b2a449a523dc555842d5637fca15b52e"},{url:"/images/paris.jpg",revision:"a39412748a6947e16c505ed84ace80c3"},{url:"/images/santorni.jpg",revision:"ef73941b8e4c6ae3089e82549b3e8008"},{url:"/images/sara-profile.jpg",revision:"08e9fcdb157f1210b6c1d94d3278d298"},{url:"/images/world-map.png",revision:"baae0eade240e4d67ec759f6c37e42fb"},{url:"/manifest.json",revision:"436b8f33a3e353ba400e8c47b4864227"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
