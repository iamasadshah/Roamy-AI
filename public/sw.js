if(!self.define){let e,a={};const s=(s,n)=>(s=new URL(s+".js",n).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let t={};const r=e=>s(e,c),o={module:{uri:c},exports:t,require:r};a[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"51444e072cf31b3c59740f30f6b20c82"},{url:"/_next/static/OjnGxaXVPkC-axKLwgqO_/_buildManifest.js",revision:"5e3724d647173bb72215274cc333bd06"},{url:"/_next/static/OjnGxaXVPkC-axKLwgqO_/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/203.215f7ebb412294c3.js",revision:"215f7ebb412294c3"},{url:"/_next/static/chunks/218.61652cd84faa3076.js",revision:"61652cd84faa3076"},{url:"/_next/static/chunks/230-9706d3d8a936b0ad.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/250-20202dca48dddc48.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/25386026-606ddde80587eb15.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/4bd1b696-9bae4e404a4d11f0.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/517-0329c12fb81c1e94.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/609-77671311e2e58a9f.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/727-072f727a6a6bb33e.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/735.0efee747fa2d58e7.js",revision:"0efee747fa2d58e7"},{url:"/_next/static/chunks/806-721e9d81017f40ce.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/8e1d74a4-5f6353f6cd07d59a.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/app/_not-found/page-c5d2c3d2115ef6c8.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/app/api/exchange-rate/route-6a13583d41fbe448.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/app/auth/callback/route-c4aa153d4285a574.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/app/auth/page-f86bf23d4b9e11e1.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/app/layout-c60d4e52c630c5eb.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/app/page-e747c812775b1b52.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/app/profile/page-9e0eff5588d301ea.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/framework-c76864a09627f16c.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/main-app-09930829117cc03c.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/main-fffef146bcc3cc4f.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/pages/_app-7a9682d4a6e72105.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/pages/_error-cef8d2667f5e2e55.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-52e69369a90c407a.js",revision:"OjnGxaXVPkC-axKLwgqO_"},{url:"/_next/static/css/0acef4df005bbe6c.css",revision:"0acef4df005bbe6c"},{url:"/_next/static/css/d083bfbf1b5de5e7.css",revision:"d083bfbf1b5de5e7"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/favicon.png",revision:"193e15c53ab97a537109d5077d6990a4"},{url:"/images/couple.webp",revision:"be754b38bb98e2fcf5c1af91ab0c23e1"},{url:"/images/dubai.webp",revision:"e44bf0b4ce96ae3ffc0e65707c8d91da"},{url:"/images/family-profile.webp",revision:"a7d010f265ee385256e15ea4a92af98f"},{url:"/images/luxury-pattern.png",revision:"b2a449a523dc555842d5637fca15b52e"},{url:"/images/paris.webp",revision:"1898c40a009eb305c3bed89cc5777e7c"},{url:"/images/santorni.webp",revision:"0dfba23f36b17c148c6384cb05ea27ae"},{url:"/images/sara-profile.webp",revision:"288877a6cd77eb9cd0d6122caa6e6ca6"},{url:"/images/world-map.png",revision:"baae0eade240e4d67ec759f6c37e42fb"},{url:"/manifest.json",revision:"436b8f33a3e353ba400e8c47b4864227"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
