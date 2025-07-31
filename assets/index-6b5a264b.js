var ju=Object.defineProperty;var Bu=(n,t,e)=>t in n?ju(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var ai=(n,t,e)=>(Bu(n,typeof t!="symbol"?t+"":t,e),e);import{r as k,a as Uu,R as Yt,L as $u,N as kl,g as zu,B as qu}from"./vendor-15776b0b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();var Ol={exports:{}},Os={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hu=k,Gu=Symbol.for("react.element"),Ku=Symbol.for("react.fragment"),Wu=Object.prototype.hasOwnProperty,Qu=Hu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Xu={key:!0,ref:!0,__self:!0,__source:!0};function Ll(n,t,e){var r,s={},o=null,a=null;e!==void 0&&(o=""+e),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)Wu.call(t,r)&&!Xu.hasOwnProperty(r)&&(s[r]=t[r]);if(n&&n.defaultProps)for(r in t=n.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Gu,type:n,key:o,ref:a,props:s,_owner:Qu.current}}Os.Fragment=Ku;Os.jsx=Ll;Os.jsxs=Ll;Ol.exports=Os;var C=Ol.exports,Ei={},ca=Uu;Ei.createRoot=ca.createRoot,Ei.hydrateRoot=ca.hydrateRoot;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var wi=function(){return wi=Object.assign||function(t){for(var e,r=1,s=arguments.length;r<s;r++){e=arguments[r];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},wi.apply(this,arguments)};function Yu(n,t){var e={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.indexOf(r)<0&&(e[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)t.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(e[r[s]]=n[r[s]]);return e}var Hn="",Sr=null,ms=null,Ml=null;function Ji(){Hn="",Sr!==null&&Sr.disconnect(),ms!==null&&(window.clearTimeout(ms),ms=null)}function ua(n){var t=["BUTTON","INPUT","SELECT","TEXTAREA"],e=["A","AREA"];return t.includes(n.tagName)&&!n.hasAttribute("disabled")||e.includes(n.tagName)&&n.hasAttribute("href")}function ha(){var n=null;if(Hn==="#")n=document.body;else{var t=Hn.replace("#","");n=document.getElementById(t),n===null&&Hn==="#top"&&(n=document.body)}if(n!==null){Ml(n);var e=n.getAttribute("tabindex");return e===null&&!ua(n)&&n.setAttribute("tabindex",-1),n.focus({preventScroll:!0}),e===null&&!ua(n)&&(n.blur(),n.removeAttribute("tabindex")),Ji(),!0}return!1}function Ju(n){window.setTimeout(function(){ha()===!1&&(Sr===null&&(Sr=new MutationObserver(ha)),Sr.observe(document,{attributes:!0,childList:!0,subtree:!0}),ms=window.setTimeout(function(){Ji()},n||1e4))},0)}function Fl(n){return Yt.forwardRef(function(t,e){var r="";typeof t.to=="string"&&t.to.includes("#")?r="#"+t.to.split("#").slice(1).join("#"):typeof t.to=="object"&&typeof t.to.hash=="string"&&(r=t.to.hash);var s={};n===kl&&(s.isActive=function(c,h){return c&&c.isExact&&h.hash===r});function o(c){Ji(),Hn=t.elementId?"#"+t.elementId:r,t.onClick&&t.onClick(c),Hn!==""&&!c.defaultPrevented&&c.button===0&&(!t.target||t.target==="_self")&&!(c.metaKey||c.altKey||c.ctrlKey||c.shiftKey)&&(Ml=t.scroll||function(h){return t.smooth?h.scrollIntoView({behavior:"smooth"}):h.scrollIntoView()},Ju(t.timeout))}var a=Yu(t,["scroll","smooth","timeout","elementId"]);return Yt.createElement(n,wi({},s,a,{onClick:o,ref:e}),t.children)})}var Zu=Fl($u);Fl(kl);const li=n=>{const{children:t,title:e,sectionNumber:r}=n,[s,o]=k.useState(!1),a=k.useRef(null),c=new IntersectionObserver((h,d)=>{h[0].isIntersecting?o(!0):o(!1)});return k.useEffect(()=>{const h=a.current;return h&&c.observe(h),()=>{h&&c.unobserve(h)}},[c]),C.jsxs(C.Fragment,{children:[C.jsx("h2",{className:"dynamicTitle rounded-lg sticky mt-16 sm:mt-2 mb-0 dt"+r+" animate-fadeSlow"+r+(s?" hover":""),children:C.jsx(Zu,{smooth:!0,to:"#"+encodeURI(e),children:e})}),C.jsx("div",{id:encodeURI(e),ref:a,children:t})]})};function th(n){return C.jsx(C.Fragment,{children:C.jsxs("div",{className:"relative overflow-clip bg-gray-100 mr-0 ml-auto w-full rounded-sm pt-10 pb-3 align-middle",children:[C.jsx("div",{className:"absolute top-[-90px] left-[-20px] bg-white h-[100px] w-[300px] z-1 rotate-[-12deg]"}),C.jsxs("div",{className:" px-32 sm:px-0 h-max",children:[n.title&&C.jsx("h3",{className:"mx-auto w-fit text-main-text-gray",children:n.title}),n.children]})]})})}const eh=()=>C.jsxs("header",{className:"App-header",children:[C.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),C.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"true"}),C.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;700&display=swap",rel:"stylesheet"}),C.jsxs("div",{className:"wrapper",children:[C.jsxs("div",{className:"rotated-wrapper",children:[C.jsx("div",{className:"base one"}),C.jsx("div",{className:"base two"}),C.jsx("div",{className:"base three"}),C.jsx("div",{className:"base four"})]}),C.jsx("div",{className:"diagonal-mask"})]}),C.jsx("div",{className:"title-container",children:C.jsxs("h1",{className:"intro-title",children:["Hi! I'm Ethan",C.jsx("br",{}),"This is what I do "]})})]});function jl(n){var t,e,r="";if(typeof n=="string"||typeof n=="number")r+=n;else if(typeof n=="object")if(Array.isArray(n))for(t=0;t<n.length;t++)n[t]&&(e=jl(n[t]))&&(r&&(r+=" "),r+=e);else for(t in n)n[t]&&(r&&(r+=" "),r+=t);return r}function nh(){for(var n,t,e=0,r="";e<arguments.length;)(n=arguments[e++])&&(t=jl(n))&&(r&&(r+=" "),r+=t);return r}function rh(n){return new Date(n.seconds*1e3)}function sh(n){const t=rh(n),e=t.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});console.log(e);const s=["January","February","March","April","May","June","July","August","September","October","November","December"][t.getMonth()],o=t.getFullYear();return`${s}, ${o}`}const ih=n=>{const{title:t,subTitle:e,imageAlt:r,imageLink:s,blurb:o,extLink:a,startDate:c}=n;return C.jsx("div",{className:"w-3/5 sm:w-4/5 mr-36 sm:mr-auto my-6 mx-auto",children:C.jsxs("div",{className:"rounded-sm bg-gray-100 drop-shadow-lg m-0 hover:shadow-lg transition-shadow animate-fade flex flex-row md:flex-wrap",children:[s&&r&&C.jsx("img",{src:s,alt:r,className:"object-cover w-52 md:w-full md:h-32 md:rounded-t-sm rounded-l-sm flex-shrink-0"}),C.jsxs("div",{className:"flex flex-row p-5 justify-start sm:flex-wrap sm:justify-center sm:pb-5 gap-5 flex-shrink",children:[C.jsxs("div",{className:"flex flex-col text-sm flex-shrink",children:[C.jsxs("div",{className:"flex flex-row flex-wrap text-lg gap-1 sm:text-sm sm:mx-auto md:pb-4",children:[C.jsx("h4",{className:"opacity-90 sm:text-sm text-main-text-gray",children:t}),C.jsx("h4",{className:"text-blue-accent md:hidden",children:"|"}),C.jsx("p",{className:"opacity-80 sm:text-sm text-main-text-gray",children:e}),C.jsx("p",{children:c instanceof Date&&!isNaN(c.getTime())?sh({seconds:Math.floor(c.getTime()/1e3),nanoseconds:c.getTime()%1e3*1e6}):""})]}),C.jsx("div",{className:nh("text-sm text-main-text-gray opacity-80 mt-2 text-left",a&&"pb-8"),children:o})]}),a&&C.jsx("a",{href:a,className:"text-sm absolute bottom-3 right-5 cursor-pointer",children:"Read More →"})]})]})})},oh=()=>{};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},ah=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],c=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Ul={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,c=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,m=o>>2,_=(o&3)<<4|c>>4;let w=(c&15)<<2|d>>6,A=d&63;h||(A=64,a||(w=64)),r.push(e[m],e[_],e[w],e[A])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Bl(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):ah(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const d=s<n.length?e[n.charAt(s)]:64;++s;const _=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||c==null||d==null||_==null)throw new lh;const w=o<<2|c>>4;if(r.push(w),d!==64){const A=c<<4&240|d>>2;if(r.push(A),_!==64){const S=d<<6&192|_;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class lh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ch=function(n){const t=Bl(n);return Ul.encodeByteArray(t,!0)},Es=function(n){return ch(n).replace(/\./g,"")},uh=function(n){try{return Ul.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh=()=>hh().__FIREBASE_DEFAULTS__,fh=()=>{if(typeof process>"u"||typeof process.env>"u")return;const n={}.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},mh=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&uh(n[1]);return t&&JSON.parse(t)},Zi=()=>{try{return oh()||dh()||fh()||mh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ph=n=>{var t,e;return(e=(t=Zi())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},gh=n=>{const t=ph(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},$l=()=>{var n;return(n=Zi())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(n){return n.endsWith(".cloudworkstations.dev")}async function _h(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n),c="";return[Es(JSON.stringify(e)),Es(JSON.stringify(a)),c].join(".")}const Cr={};function Eh(){const n={prod:[],emulator:[]};for(const t of Object.keys(Cr))Cr[t]?n.emulator.push(t):n.prod.push(t);return n}function wh(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let da=!1;function Th(n,t){if(typeof window>"u"||typeof document>"u"||!to(window.location.host)||Cr[n]===t||Cr[n]||da)return;Cr[n]=t;function e(w){return`__firebase__banner__${w}`}const r="__firebase__banner",o=Eh().prod.length>0;function a(){const w=document.getElementById(r);w&&w.remove()}function c(w){w.style.display="flex",w.style.background="#7faaf0",w.style.position="fixed",w.style.bottom="5px",w.style.left="5px",w.style.padding=".5em",w.style.borderRadius="5px",w.style.alignItems="center"}function h(w,A){w.setAttribute("width","24"),w.setAttribute("id",A),w.setAttribute("height","24"),w.setAttribute("viewBox","0 0 24 24"),w.setAttribute("fill","none"),w.style.marginLeft="-6px"}function d(){const w=document.createElement("span");return w.style.cursor="pointer",w.style.marginLeft="16px",w.style.fontSize="24px",w.innerHTML=" &times;",w.onclick=()=>{da=!0,a()},w}function m(w,A){w.setAttribute("id",A),w.innerText="Learn more",w.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",w.setAttribute("target","__blank"),w.style.paddingLeft="5px",w.style.textDecoration="underline"}function _(){const w=wh(r),A=e("text"),S=document.getElementById(A)||document.createElement("span"),V=e("learnmore"),P=document.getElementById(V)||document.createElement("a"),D=e("preprendIcon"),N=document.getElementById(D)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(w.created){const O=w.element;c(O),m(P,V);const B=d();h(N,D),O.append(N,S,P,B),document.body.appendChild(O)}o?(S.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(N.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,S.innerText="Preview backend running in this workspace."),S.setAttribute("id",A)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",_):_()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ah(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ih(){var n;const t=(n=Zi())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function bh(){return!Ih()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Rh(){try{return typeof indexedDB=="object"}catch{return!1}}function Sh(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ch="FirebaseError";class or extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Ch,Object.setPrototypeOf(this,or.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,zl.prototype.create)}}class zl{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?xh(o,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new or(s,c,r)}}function xh(n,t){return n.replace(Ph,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Ph=/\{\$([^}]+)}/g;function ws(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(fa(o)&&fa(a)){if(!ws(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function fa(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vh(n){return n&&n._delegate?n._delegate:n}class Nr{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new yh;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(kh(t))try{this.getOrInitializeService({instanceIdentifier:Tn})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=Tn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Tn){return this.instances.has(t)}getOptions(t=Tn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&a.resolve(s)}return s}onInit(t,e){var r;const s=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&t(a,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Nh(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Tn){return this.component?this.component.multipleInstances?t:Tn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Nh(n){return n===Tn?void 0:n}function kh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Dh(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rt;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(rt||(rt={}));const Lh={debug:rt.DEBUG,verbose:rt.VERBOSE,info:rt.INFO,warn:rt.WARN,error:rt.ERROR,silent:rt.SILENT},Mh=rt.INFO,Fh={[rt.DEBUG]:"log",[rt.VERBOSE]:"log",[rt.INFO]:"info",[rt.WARN]:"warn",[rt.ERROR]:"error"},jh=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=Fh[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ql{constructor(t){this.name=t,this._logLevel=Mh,this._logHandler=jh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in rt))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Lh[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,rt.DEBUG,...t),this._logHandler(this,rt.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,rt.VERBOSE,...t),this._logHandler(this,rt.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,rt.INFO,...t),this._logHandler(this,rt.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,rt.WARN,...t),this._logHandler(this,rt.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,rt.ERROR,...t),this._logHandler(this,rt.ERROR,...t)}}const Bh=(n,t)=>t.some(e=>n instanceof e);let ma,pa;function Uh(){return ma||(ma=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $h(){return pa||(pa=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hl=new WeakMap,Ti=new WeakMap,Gl=new WeakMap,ci=new WeakMap,eo=new WeakMap;function zh(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(tn(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&Hl.set(e,n)}).catch(()=>{}),eo.set(t,n),t}function qh(n){if(Ti.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ti.set(n,t)}let Ai={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Ti.get(n);if(t==="objectStoreNames")return n.objectStoreNames||Gl.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return tn(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Hh(n){Ai=n(Ai)}function Gh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(ui(this),t,...e);return Gl.set(r,t.sort?t.sort():[t]),tn(r)}:$h().includes(n)?function(...t){return n.apply(ui(this),t),tn(Hl.get(this))}:function(...t){return tn(n.apply(ui(this),t))}}function Kh(n){return typeof n=="function"?Gh(n):(n instanceof IDBTransaction&&qh(n),Bh(n,Uh())?new Proxy(n,Ai):n)}function tn(n){if(n instanceof IDBRequest)return zh(n);if(ci.has(n))return ci.get(n);const t=Kh(n);return t!==n&&(ci.set(n,t),eo.set(t,n)),t}const ui=n=>eo.get(n);function Wh(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),c=tn(a);return r&&a.addEventListener("upgradeneeded",h=>{r(tn(a.result),h.oldVersion,h.newVersion,tn(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),c.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Qh=["get","getKey","getAll","getAllKeys","count"],Xh=["put","add","delete","clear"],hi=new Map;function ga(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(hi.get(t))return hi.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Xh.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Qh.includes(e)))return;const o=async function(a,...c){const h=this.transaction(a,s?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[e](...c),s&&h.done]))[0]};return hi.set(t,o),o}Hh(n=>({...n,get:(t,e,r)=>ga(t,e)||n.get(t,e,r),has:(t,e)=>!!ga(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Jh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Jh(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Ii="@firebase/app",ya="0.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e=new ql("@firebase/app"),Zh="@firebase/app-compat",td="@firebase/analytics-compat",ed="@firebase/analytics",nd="@firebase/app-check-compat",rd="@firebase/app-check",sd="@firebase/auth",id="@firebase/auth-compat",od="@firebase/database",ad="@firebase/data-connect",ld="@firebase/database-compat",cd="@firebase/functions",ud="@firebase/functions-compat",hd="@firebase/installations",dd="@firebase/installations-compat",fd="@firebase/messaging",md="@firebase/messaging-compat",pd="@firebase/performance",gd="@firebase/performance-compat",yd="@firebase/remote-config",_d="@firebase/remote-config-compat",vd="@firebase/storage",Ed="@firebase/storage-compat",wd="@firebase/firestore",Td="@firebase/ai",Ad="@firebase/firestore-compat",Id="firebase",bd="11.8.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi="[DEFAULT]",Rd={[Ii]:"fire-core",[Zh]:"fire-core-compat",[ed]:"fire-analytics",[td]:"fire-analytics-compat",[rd]:"fire-app-check",[nd]:"fire-app-check-compat",[sd]:"fire-auth",[id]:"fire-auth-compat",[od]:"fire-rtdb",[ad]:"fire-data-connect",[ld]:"fire-rtdb-compat",[cd]:"fire-fn",[ud]:"fire-fn-compat",[hd]:"fire-iid",[dd]:"fire-iid-compat",[fd]:"fire-fcm",[md]:"fire-fcm-compat",[pd]:"fire-perf",[gd]:"fire-perf-compat",[yd]:"fire-rc",[_d]:"fire-rc-compat",[vd]:"fire-gcs",[Ed]:"fire-gcs-compat",[wd]:"fire-fst",[Ad]:"fire-fst-compat",[Td]:"fire-vertex","fire-js":"fire-js",[Id]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts=new Map,Sd=new Map,Ri=new Map;function _a(n,t){try{n.container.addComponent(t)}catch(e){$e.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function As(n){const t=n.name;if(Ri.has(t))return $e.debug(`There were multiple attempts to register component ${t}.`),!1;Ri.set(t,n);for(const e of Ts.values())_a(e,n);for(const e of Sd.values())_a(e,n);return!0}function Cd(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function xd(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},en=new zl("app","Firebase",Pd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Nr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw en.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd=bd;function Kl(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:bi,automaticDataCollectionEnabled:!0},t),s=r.name;if(typeof s!="string"||!s)throw en.create("bad-app-name",{appName:String(s)});if(e||(e=$l()),!e)throw en.create("no-options");const o=Ts.get(s);if(o){if(ws(e,o.options)&&ws(r,o.config))return o;throw en.create("duplicate-app",{appName:s})}const a=new Oh(s);for(const h of Ri.values())a.addComponent(h);const c=new Vd(e,r,a);return Ts.set(s,c),c}function Nd(n=bi){const t=Ts.get(n);if(!t&&n===bi&&$l())return Kl();if(!t)throw en.create("no-app",{appName:n});return t}function Gn(n,t,e){var r;let s=(r=Rd[n])!==null&&r!==void 0?r:n;e&&(s+=`-${e}`);const o=s.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const c=[`Unable to register library "${s}" with version "${t}":`];o&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),$e.warn(c.join(" "));return}As(new Nr(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kd="firebase-heartbeat-database",Od=1,kr="firebase-heartbeat-store";let di=null;function Wl(){return di||(di=Wh(kd,Od,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(kr)}catch(e){console.warn(e)}}}}).catch(n=>{throw en.create("idb-open",{originalErrorMessage:n.message})})),di}async function Ld(n){try{const e=(await Wl()).transaction(kr),r=await e.objectStore(kr).get(Ql(n));return await e.done,r}catch(t){if(t instanceof or)$e.warn(t.message);else{const e=en.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});$e.warn(e.message)}}}async function va(n,t){try{const r=(await Wl()).transaction(kr,"readwrite");await r.objectStore(kr).put(t,Ql(n)),await r.done}catch(e){if(e instanceof or)$e.warn(e.message);else{const r=en.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});$e.warn(r.message)}}}function Ql(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md=1024,Fd=30;class jd{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Ud(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Ea();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Fd){const a=$d(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){$e.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ea(),{heartbeatsToSend:r,unsentEntries:s}=Bd(this._heartbeatsCache.heartbeats),o=Es(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return $e.warn(e),""}}}function Ea(){return new Date().toISOString().substring(0,10)}function Bd(n,t=Md){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),wa(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),wa(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Ud{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Rh()?Sh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Ld(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return va(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return va(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function wa(n){return Es(JSON.stringify({version:2,heartbeats:n})).length}function $d(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(n){As(new Nr("platform-logger",t=>new Yh(t),"PRIVATE")),As(new Nr("heartbeat",t=>new jd(t),"PRIVATE")),Gn(Ii,ya,n),Gn(Ii,ya,"esm2017"),Gn("fire-js","")}zd("");var Ta=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var nn,Xl;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(v,p){function y(){}y.prototype=p.prototype,v.D=p.prototype,v.prototype=new y,v.prototype.constructor=v,v.C=function(E,T,I){for(var g=Array(arguments.length-2),Z=2;Z<arguments.length;Z++)g[Z-2]=arguments[Z];return p.prototype[T].apply(E,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,p,y){y||(y=0);var E=Array(16);if(typeof p=="string")for(var T=0;16>T;++T)E[T]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(T=0;16>T;++T)E[T]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=v.g[0],y=v.g[1],T=v.g[2];var I=v.g[3],g=p+(I^y&(T^I))+E[0]+3614090360&4294967295;p=y+(g<<7&4294967295|g>>>25),g=I+(T^p&(y^T))+E[1]+3905402710&4294967295,I=p+(g<<12&4294967295|g>>>20),g=T+(y^I&(p^y))+E[2]+606105819&4294967295,T=I+(g<<17&4294967295|g>>>15),g=y+(p^T&(I^p))+E[3]+3250441966&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(I^y&(T^I))+E[4]+4118548399&4294967295,p=y+(g<<7&4294967295|g>>>25),g=I+(T^p&(y^T))+E[5]+1200080426&4294967295,I=p+(g<<12&4294967295|g>>>20),g=T+(y^I&(p^y))+E[6]+2821735955&4294967295,T=I+(g<<17&4294967295|g>>>15),g=y+(p^T&(I^p))+E[7]+4249261313&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(I^y&(T^I))+E[8]+1770035416&4294967295,p=y+(g<<7&4294967295|g>>>25),g=I+(T^p&(y^T))+E[9]+2336552879&4294967295,I=p+(g<<12&4294967295|g>>>20),g=T+(y^I&(p^y))+E[10]+4294925233&4294967295,T=I+(g<<17&4294967295|g>>>15),g=y+(p^T&(I^p))+E[11]+2304563134&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(I^y&(T^I))+E[12]+1804603682&4294967295,p=y+(g<<7&4294967295|g>>>25),g=I+(T^p&(y^T))+E[13]+4254626195&4294967295,I=p+(g<<12&4294967295|g>>>20),g=T+(y^I&(p^y))+E[14]+2792965006&4294967295,T=I+(g<<17&4294967295|g>>>15),g=y+(p^T&(I^p))+E[15]+1236535329&4294967295,y=T+(g<<22&4294967295|g>>>10),g=p+(T^I&(y^T))+E[1]+4129170786&4294967295,p=y+(g<<5&4294967295|g>>>27),g=I+(y^T&(p^y))+E[6]+3225465664&4294967295,I=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(I^p))+E[11]+643717713&4294967295,T=I+(g<<14&4294967295|g>>>18),g=y+(I^p&(T^I))+E[0]+3921069994&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(T^I&(y^T))+E[5]+3593408605&4294967295,p=y+(g<<5&4294967295|g>>>27),g=I+(y^T&(p^y))+E[10]+38016083&4294967295,I=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(I^p))+E[15]+3634488961&4294967295,T=I+(g<<14&4294967295|g>>>18),g=y+(I^p&(T^I))+E[4]+3889429448&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(T^I&(y^T))+E[9]+568446438&4294967295,p=y+(g<<5&4294967295|g>>>27),g=I+(y^T&(p^y))+E[14]+3275163606&4294967295,I=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(I^p))+E[3]+4107603335&4294967295,T=I+(g<<14&4294967295|g>>>18),g=y+(I^p&(T^I))+E[8]+1163531501&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(T^I&(y^T))+E[13]+2850285829&4294967295,p=y+(g<<5&4294967295|g>>>27),g=I+(y^T&(p^y))+E[2]+4243563512&4294967295,I=p+(g<<9&4294967295|g>>>23),g=T+(p^y&(I^p))+E[7]+1735328473&4294967295,T=I+(g<<14&4294967295|g>>>18),g=y+(I^p&(T^I))+E[12]+2368359562&4294967295,y=T+(g<<20&4294967295|g>>>12),g=p+(y^T^I)+E[5]+4294588738&4294967295,p=y+(g<<4&4294967295|g>>>28),g=I+(p^y^T)+E[8]+2272392833&4294967295,I=p+(g<<11&4294967295|g>>>21),g=T+(I^p^y)+E[11]+1839030562&4294967295,T=I+(g<<16&4294967295|g>>>16),g=y+(T^I^p)+E[14]+4259657740&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(y^T^I)+E[1]+2763975236&4294967295,p=y+(g<<4&4294967295|g>>>28),g=I+(p^y^T)+E[4]+1272893353&4294967295,I=p+(g<<11&4294967295|g>>>21),g=T+(I^p^y)+E[7]+4139469664&4294967295,T=I+(g<<16&4294967295|g>>>16),g=y+(T^I^p)+E[10]+3200236656&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(y^T^I)+E[13]+681279174&4294967295,p=y+(g<<4&4294967295|g>>>28),g=I+(p^y^T)+E[0]+3936430074&4294967295,I=p+(g<<11&4294967295|g>>>21),g=T+(I^p^y)+E[3]+3572445317&4294967295,T=I+(g<<16&4294967295|g>>>16),g=y+(T^I^p)+E[6]+76029189&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(y^T^I)+E[9]+3654602809&4294967295,p=y+(g<<4&4294967295|g>>>28),g=I+(p^y^T)+E[12]+3873151461&4294967295,I=p+(g<<11&4294967295|g>>>21),g=T+(I^p^y)+E[15]+530742520&4294967295,T=I+(g<<16&4294967295|g>>>16),g=y+(T^I^p)+E[2]+3299628645&4294967295,y=T+(g<<23&4294967295|g>>>9),g=p+(T^(y|~I))+E[0]+4096336452&4294967295,p=y+(g<<6&4294967295|g>>>26),g=I+(y^(p|~T))+E[7]+1126891415&4294967295,I=p+(g<<10&4294967295|g>>>22),g=T+(p^(I|~y))+E[14]+2878612391&4294967295,T=I+(g<<15&4294967295|g>>>17),g=y+(I^(T|~p))+E[5]+4237533241&4294967295,y=T+(g<<21&4294967295|g>>>11),g=p+(T^(y|~I))+E[12]+1700485571&4294967295,p=y+(g<<6&4294967295|g>>>26),g=I+(y^(p|~T))+E[3]+2399980690&4294967295,I=p+(g<<10&4294967295|g>>>22),g=T+(p^(I|~y))+E[10]+4293915773&4294967295,T=I+(g<<15&4294967295|g>>>17),g=y+(I^(T|~p))+E[1]+2240044497&4294967295,y=T+(g<<21&4294967295|g>>>11),g=p+(T^(y|~I))+E[8]+1873313359&4294967295,p=y+(g<<6&4294967295|g>>>26),g=I+(y^(p|~T))+E[15]+4264355552&4294967295,I=p+(g<<10&4294967295|g>>>22),g=T+(p^(I|~y))+E[6]+2734768916&4294967295,T=I+(g<<15&4294967295|g>>>17),g=y+(I^(T|~p))+E[13]+1309151649&4294967295,y=T+(g<<21&4294967295|g>>>11),g=p+(T^(y|~I))+E[4]+4149444226&4294967295,p=y+(g<<6&4294967295|g>>>26),g=I+(y^(p|~T))+E[11]+3174756917&4294967295,I=p+(g<<10&4294967295|g>>>22),g=T+(p^(I|~y))+E[2]+718787259&4294967295,T=I+(g<<15&4294967295|g>>>17),g=y+(I^(T|~p))+E[9]+3951481745&4294967295,v.g[0]=v.g[0]+p&4294967295,v.g[1]=v.g[1]+(T+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+T&4294967295,v.g[3]=v.g[3]+I&4294967295}r.prototype.u=function(v,p){p===void 0&&(p=v.length);for(var y=p-this.blockSize,E=this.B,T=this.h,I=0;I<p;){if(T==0)for(;I<=y;)s(this,v,I),I+=this.blockSize;if(typeof v=="string"){for(;I<p;)if(E[T++]=v.charCodeAt(I++),T==this.blockSize){s(this,E),T=0;break}}else for(;I<p;)if(E[T++]=v[I++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=p},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var p=1;p<v.length-8;++p)v[p]=0;var y=8*this.o;for(p=v.length-8;p<v.length;++p)v[p]=y&255,y/=256;for(this.u(v),v=Array(16),p=y=0;4>p;++p)for(var E=0;32>E;E+=8)v[y++]=this.g[p]>>>E&255;return v};function o(v,p){var y=c;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=p(v)}function a(v,p){this.h=p;for(var y=[],E=!0,T=v.length-1;0<=T;T--){var I=v[T]|0;E&&I==p||(y[T]=I,E=!1)}this.g=y}var c={};function h(v){return-128<=v&&128>v?o(v,function(p){return new a([p|0],0>p?-1:0)}):new a([v|0],0>v?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return _;if(0>v)return P(d(-v));for(var p=[],y=1,E=0;v>=y;E++)p[E]=v/y|0,y*=4294967296;return new a(p,0)}function m(v,p){if(v.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(v.charAt(0)=="-")return P(m(v.substring(1),p));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(p,8)),E=_,T=0;T<v.length;T+=8){var I=Math.min(8,v.length-T),g=parseInt(v.substring(T,T+I),p);8>I?(I=d(Math.pow(p,I)),E=E.j(I).add(d(g))):(E=E.j(y),E=E.add(d(g)))}return E}var _=h(0),w=h(1),A=h(16777216);n=a.prototype,n.m=function(){if(V(this))return-P(this).m();for(var v=0,p=1,y=0;y<this.g.length;y++){var E=this.i(y);v+=(0<=E?E:4294967296+E)*p,p*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(S(this))return"0";if(V(this))return"-"+P(this).toString(v);for(var p=d(Math.pow(v,6)),y=this,E="";;){var T=B(y,p).g;y=D(y,T.j(p));var I=((0<y.g.length?y.g[0]:y.h)>>>0).toString(v);if(y=T,S(y))return I+E;for(;6>I.length;)I="0"+I;E=I+E}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function S(v){if(v.h!=0)return!1;for(var p=0;p<v.g.length;p++)if(v.g[p]!=0)return!1;return!0}function V(v){return v.h==-1}n.l=function(v){return v=D(this,v),V(v)?-1:S(v)?0:1};function P(v){for(var p=v.g.length,y=[],E=0;E<p;E++)y[E]=~v.g[E];return new a(y,~v.h).add(w)}n.abs=function(){return V(this)?P(this):this},n.add=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],E=0,T=0;T<=p;T++){var I=E+(this.i(T)&65535)+(v.i(T)&65535),g=(I>>>16)+(this.i(T)>>>16)+(v.i(T)>>>16);E=g>>>16,I&=65535,g&=65535,y[T]=g<<16|I}return new a(y,y[y.length-1]&-2147483648?-1:0)};function D(v,p){return v.add(P(p))}n.j=function(v){if(S(this)||S(v))return _;if(V(this))return V(v)?P(this).j(P(v)):P(P(this).j(v));if(V(v))return P(this.j(P(v)));if(0>this.l(A)&&0>v.l(A))return d(this.m()*v.m());for(var p=this.g.length+v.g.length,y=[],E=0;E<2*p;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<v.g.length;T++){var I=this.i(E)>>>16,g=this.i(E)&65535,Z=v.i(T)>>>16,lt=v.i(T)&65535;y[2*E+2*T]+=g*lt,N(y,2*E+2*T),y[2*E+2*T+1]+=I*lt,N(y,2*E+2*T+1),y[2*E+2*T+1]+=g*Z,N(y,2*E+2*T+1),y[2*E+2*T+2]+=I*Z,N(y,2*E+2*T+2)}for(E=0;E<p;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=p;E<2*p;E++)y[E]=0;return new a(y,0)};function N(v,p){for(;(v[p]&65535)!=v[p];)v[p+1]+=v[p]>>>16,v[p]&=65535,p++}function O(v,p){this.g=v,this.h=p}function B(v,p){if(S(p))throw Error("division by zero");if(S(v))return new O(_,_);if(V(v))return p=B(P(v),p),new O(P(p.g),P(p.h));if(V(p))return p=B(v,P(p)),new O(P(p.g),p.h);if(30<v.g.length){if(V(v)||V(p))throw Error("slowDivide_ only works with positive integers.");for(var y=w,E=p;0>=E.l(v);)y=q(y),E=q(E);var T=X(y,1),I=X(E,1);for(E=X(E,2),y=X(y,2);!S(E);){var g=I.add(E);0>=g.l(v)&&(T=T.add(y),I=g),E=X(E,1),y=X(y,1)}return p=D(v,T.j(p)),new O(T,p)}for(T=_;0<=v.l(p);){for(y=Math.max(1,Math.floor(v.m()/p.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),I=d(y),g=I.j(p);V(g)||0<g.l(v);)y-=E,I=d(y),g=I.j(p);S(I)&&(I=w),T=T.add(I),v=D(v,g)}return new O(T,v)}n.A=function(v){return B(this,v).h},n.and=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],E=0;E<p;E++)y[E]=this.i(E)&v.i(E);return new a(y,this.h&v.h)},n.or=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],E=0;E<p;E++)y[E]=this.i(E)|v.i(E);return new a(y,this.h|v.h)},n.xor=function(v){for(var p=Math.max(this.g.length,v.g.length),y=[],E=0;E<p;E++)y[E]=this.i(E)^v.i(E);return new a(y,this.h^v.h)};function q(v){for(var p=v.g.length+1,y=[],E=0;E<p;E++)y[E]=v.i(E)<<1|v.i(E-1)>>>31;return new a(y,v.h)}function X(v,p){var y=p>>5;p%=32;for(var E=v.g.length-y,T=[],I=0;I<E;I++)T[I]=0<p?v.i(I+y)>>>p|v.i(I+y+1)<<32-p:v.i(I+y);return new a(T,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Xl=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,nn=a}).apply(typeof Ta<"u"?Ta:typeof self<"u"?self:typeof window<"u"?window:{});var is=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yl,Ir,Jl,ps,Si,Zl,tc,ec;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,l,u){return i==Array.prototype||i==Object.prototype||(i[l]=u.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof is=="object"&&is];for(var l=0;l<i.length;++l){var u=i[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function s(i,l){if(l)t:{var u=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var b=i[f];if(!(b in u))break t;u=u[b]}i=i[i.length-1],f=u[i],l=l(f),l!=f&&l!=null&&t(u,i,{configurable:!0,writable:!0,value:l})}}function o(i,l){i instanceof String&&(i+="");var u=0,f=!1,b={next:function(){if(!f&&u<i.length){var R=u++;return{value:l(R,i[R]),done:!1}}return f=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(i){return i||function(){return o(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function h(i){var l=typeof i;return l=l!="object"?l:i?Array.isArray(i)?"array":l:"null",l=="array"||l=="object"&&typeof i.length=="number"}function d(i){var l=typeof i;return l=="object"&&i!=null||l=="function"}function m(i,l,u){return i.call.apply(i.bind,arguments)}function _(i,l,u){if(!i)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,f),i.apply(l,b)}}return function(){return i.apply(l,arguments)}}function w(i,l,u){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:_,w.apply(null,arguments)}function A(i,l){var u=Array.prototype.slice.call(arguments,1);return function(){var f=u.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function S(i,l){function u(){}u.prototype=l.prototype,i.aa=l.prototype,i.prototype=new u,i.prototype.constructor=i,i.Qb=function(f,b,R){for(var L=Array(arguments.length-2),ht=2;ht<arguments.length;ht++)L[ht-2]=arguments[ht];return l.prototype[b].apply(f,L)}}function V(i){const l=i.length;if(0<l){const u=Array(l);for(let f=0;f<l;f++)u[f]=i[f];return u}return[]}function P(i,l){for(let u=1;u<arguments.length;u++){const f=arguments[u];if(h(f)){const b=i.length||0,R=f.length||0;i.length=b+R;for(let L=0;L<R;L++)i[b+L]=f[L]}else i.push(f)}}class D{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function N(i){return/^[\s\xa0]*$/.test(i)}function O(){var i=c.navigator;return i&&(i=i.userAgent)?i:""}function B(i){return B[" "](i),i}B[" "]=function(){};var q=O().indexOf("Gecko")!=-1&&!(O().toLowerCase().indexOf("webkit")!=-1&&O().indexOf("Edge")==-1)&&!(O().indexOf("Trident")!=-1||O().indexOf("MSIE")!=-1)&&O().indexOf("Edge")==-1;function X(i,l,u){for(const f in i)l.call(u,i[f],f,i)}function v(i,l){for(const u in i)l.call(void 0,i[u],u,i)}function p(i){const l={};for(const u in i)l[u]=i[u];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(i,l){let u,f;for(let b=1;b<arguments.length;b++){f=arguments[b];for(u in f)i[u]=f[u];for(let R=0;R<y.length;R++)u=y[R],Object.prototype.hasOwnProperty.call(f,u)&&(i[u]=f[u])}}function T(i){var l=1;i=i.split(":");const u=[];for(;0<l&&i.length;)u.push(i.shift()),l--;return i.length&&u.push(i.join(":")),u}function I(i){c.setTimeout(()=>{throw i},0)}function g(){var i=yt;let l=null;return i.g&&(l=i.g,i.g=i.g.next,i.g||(i.h=null),l.next=null),l}class Z{constructor(){this.h=this.g=null}add(l,u){const f=lt.get();f.set(l,u),this.h?this.h.next=f:this.g=f,this.h=f}}var lt=new D(()=>new xt,i=>i.reset());class xt{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let dt,ct=!1,yt=new Z,H=()=>{const i=c.Promise.resolve(void 0);dt=()=>{i.then(tt)}};var tt=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(u){I(u)}var l=lt;l.j(i),100>l.h&&(l.h++,i.next=l.g,l.g=i)}ct=!1};function ut(){this.s=this.s,this.C=this.C}ut.prototype.s=!1,ut.prototype.ma=function(){this.s||(this.s=!0,this.N())},ut.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function et(i,l){this.type=i,this.g=this.target=l,this.defaultPrevented=!1}et.prototype.h=function(){this.defaultPrevented=!0};var Zt=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var i=!1,l=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return i}();function ve(i,l){if(et.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var u=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=l,l=i.relatedTarget){if(q){t:{try{B(l.nodeName);var b=!0;break t}catch{}b=!1}b||(l=null)}}else u=="mouseover"?l=i.fromElement:u=="mouseout"&&(l=i.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:dr[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&ve.aa.h.call(this)}}S(ve,et);var dr={2:"touch",3:"pen",4:"mouse"};ve.prototype.h=function(){ve.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var ue="closure_listenable_"+(1e6*Math.random()|0),Ot=0;function qe(i,l,u,f,b){this.listener=i,this.proxy=null,this.src=l,this.type=u,this.capture=!!f,this.ha=b,this.key=++Ot,this.da=this.fa=!1}function Ut(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function te(i){this.src=i,this.g={},this.h=0}te.prototype.add=function(i,l,u,f,b){var R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);var L=se(i,l,f,b);return-1<L?(l=i[L],u||(l.fa=!1)):(l=new qe(l,this.src,R,!!f,b),l.fa=u,i.push(l)),l};function De(i,l){var u=l.type;if(u in i.g){var f=i.g[u],b=Array.prototype.indexOf.call(f,l,void 0),R;(R=0<=b)&&Array.prototype.splice.call(f,b,1),R&&(Ut(l),i.g[u].length==0&&(delete i.g[u],i.h--))}}function se(i,l,u,f){for(var b=0;b<i.length;++b){var R=i[b];if(!R.da&&R.listener==l&&R.capture==!!u&&R.ha==f)return b}return-1}var dn="closure_lm_"+(1e6*Math.random()|0),Lt={};function fn(i,l,u,f,b){if(f&&f.once)return ft(i,l,u,f,b);if(Array.isArray(l)){for(var R=0;R<l.length;R++)fn(i,l[R],u,f,b);return null}return u=ie(u),i&&i[ue]?i.K(l,u,d(f)?!!f.capture:!!f,b):Ee(i,l,u,!1,f,b)}function Ee(i,l,u,f,b,R){if(!l)throw Error("Invalid event type");var L=d(b)?!!b.capture:!!b,ht=Ke(i);if(ht||(i[dn]=ht=new te(i)),u=ht.add(l,u,f,L,R),u.proxy)return u;if(f=Ne(),u.proxy=f,f.src=i,f.listener=u,i.addEventListener)Zt||(b=L),b===void 0&&(b=!1),i.addEventListener(l.toString(),f,b);else if(i.attachEvent)i.attachEvent(Ge(l.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Ne(){function i(u){return l.call(i.src,i.listener,u)}const l=mn;return i}function ft(i,l,u,f,b){if(Array.isArray(l)){for(var R=0;R<l.length;R++)ft(i,l[R],u,f,b);return null}return u=ie(u),i&&i[ue]?i.L(l,u,d(f)?!!f.capture:!!f,b):Ee(i,l,u,!0,f,b)}function He(i,l,u,f,b){if(Array.isArray(l))for(var R=0;R<l.length;R++)He(i,l[R],u,f,b);else f=d(f)?!!f.capture:!!f,u=ie(u),i&&i[ue]?(i=i.i,l=String(l).toString(),l in i.g&&(R=i.g[l],u=se(R,u,f,b),-1<u&&(Ut(R[u]),Array.prototype.splice.call(R,u,1),R.length==0&&(delete i.g[l],i.h--)))):i&&(i=Ke(i))&&(l=i.g[l.toString()],i=-1,l&&(i=se(l,u,f,b)),(u=-1<i?l[i]:null)&&ke(u))}function ke(i){if(typeof i!="number"&&i&&!i.da){var l=i.src;if(l&&l[ue])De(l.i,i);else{var u=i.type,f=i.proxy;l.removeEventListener?l.removeEventListener(u,f,i.capture):l.detachEvent?l.detachEvent(Ge(u),f):l.addListener&&l.removeListener&&l.removeListener(f),(u=Ke(l))?(De(u,i),u.h==0&&(u.src=null,l[dn]=null)):Ut(i)}}}function Ge(i){return i in Lt?Lt[i]:Lt[i]="on"+i}function mn(i,l){if(i.da)i=!0;else{l=new ve(l,this);var u=i.listener,f=i.ha||i.src;i.fa&&ke(i),i=u.call(f,l)}return i}function Ke(i){return i=i[dn],i instanceof te?i:null}var we="__closure_events_fn_"+(1e9*Math.random()>>>0);function ie(i){return typeof i=="function"?i:(i[we]||(i[we]=function(l){return i.handleEvent(l)}),i[we])}function wt(){ut.call(this),this.i=new te(this),this.M=this,this.F=null}S(wt,ut),wt.prototype[ue]=!0,wt.prototype.removeEventListener=function(i,l,u,f){He(this,i,l,u,f)};function _t(i,l){var u,f=i.F;if(f)for(u=[];f;f=f.F)u.push(f);if(i=i.M,f=l.type||l,typeof l=="string")l=new et(l,i);else if(l instanceof et)l.target=l.target||i;else{var b=l;l=new et(f,i),E(l,b)}if(b=!0,u)for(var R=u.length-1;0<=R;R--){var L=l.g=u[R];b=he(L,f,!0,l)&&b}if(L=l.g=i,b=he(L,f,!0,l)&&b,b=he(L,f,!1,l)&&b,u)for(R=0;R<u.length;R++)L=l.g=u[R],b=he(L,f,!1,l)&&b}wt.prototype.N=function(){if(wt.aa.N.call(this),this.i){var i=this.i,l;for(l in i.g){for(var u=i.g[l],f=0;f<u.length;f++)Ut(u[f]);delete i.g[l],i.h--}}this.F=null},wt.prototype.K=function(i,l,u,f){return this.i.add(String(i),l,!1,u,f)},wt.prototype.L=function(i,l,u,f){return this.i.add(String(i),l,!0,u,f)};function he(i,l,u,f){if(l=i.i.g[String(l)],!l)return!0;l=l.concat();for(var b=!0,R=0;R<l.length;++R){var L=l[R];if(L&&!L.da&&L.capture==u){var ht=L.listener,Ft=L.ha||L.src;L.fa&&De(i.i,L),b=ht.call(Ft,f)!==!1&&b}}return b&&!f.defaultPrevented}function Dn(i,l,u){if(typeof i=="function")u&&(i=w(i,u));else if(i&&typeof i.handleEvent=="function")i=w(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(i,l||0)}function Oe(i){i.g=Dn(()=>{i.g=null,i.i&&(i.i=!1,Oe(i))},i.l);const l=i.h;i.h=null,i.m.apply(null,l)}class Le extends ut{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Oe(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Mt(i){ut.call(this),this.h=i,this.g={}}S(Mt,ut);var vt=[];function pn(i){X(i.g,function(l,u){this.g.hasOwnProperty(u)&&ke(l)},i),i.g={}}Mt.prototype.N=function(){Mt.aa.N.call(this),pn(this)},Mt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Me=c.JSON.stringify,We=c.JSON.parse,gn=class{stringify(i){return c.JSON.stringify(i,void 0)}parse(i){return c.JSON.parse(i,void 0)}};function Te(){}Te.prototype.h=null;function Fe(i){return i.h||(i.h=i.i())}function je(){}var de={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Qe(){et.call(this,"d")}S(Qe,et);function Tt(){et.call(this,"c")}S(Tt,et);var Pt={},$=null;function Y(){return $=$||new wt}Pt.La="serverreachability";function $t(i){et.call(this,Pt.La,i)}S($t,et);function ee(i){const l=Y();_t(l,new $t(l))}Pt.STAT_EVENT="statevent";function F(i,l){et.call(this,Pt.STAT_EVENT,i),this.stat=l}S(F,et);function U(i){const l=Y();_t(l,new F(l,i))}Pt.Ma="timingevent";function K(i,l){et.call(this,Pt.Ma,i),this.size=l}S(K,et);function pt(i,l){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){i()},l)}function At(){this.g=!0}At.prototype.xa=function(){this.g=!1};function oe(i,l,u,f,b,R){i.info(function(){if(i.g)if(R)for(var L="",ht=R.split("&"),Ft=0;Ft<ht.length;Ft++){var at=ht[Ft].split("=");if(1<at.length){var zt=at[0];at=at[1];var qt=zt.split("_");L=2<=qt.length&&qt[1]=="type"?L+(zt+"="+at+"&"):L+(zt+"=redacted&")}}else L=null;else L=R;return"XMLHTTP REQ ("+f+") [attempt "+b+"]: "+l+`
`+u+`
`+L})}function ae(i,l,u,f,b,R,L){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+b+"]: "+l+`
`+u+`
`+R+" "+L})}function It(i,l,u,f){i.info(function(){return"XMLHTTP TEXT ("+l+"): "+mt(i,u)+(f?" "+f:"")})}function Qt(i,l){i.info(function(){return"TIMEOUT: "+l})}At.prototype.info=function(){};function mt(i,l){if(!i.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(i=0;i<u.length;i++)if(Array.isArray(u[i])){var f=u[i];if(!(2>f.length)){var b=f[1];if(Array.isArray(b)&&!(1>b.length)){var R=b[0];if(R!="noop"&&R!="stop"&&R!="close")for(var L=1;L<b.length;L++)b[L]=""}}}}return Me(u)}catch{return l}}var fe={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Kr={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},fr;function yn(){}S(yn,Te),yn.prototype.g=function(){return new XMLHttpRequest},yn.prototype.i=function(){return{}},fr=new yn;function me(i,l,u,f){this.j=i,this.i=l,this.l=u,this.R=f||1,this.U=new Mt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new mr}function mr(){this.i=null,this.g="",this.h=!1}var pr={},Nn={};function it(i,l,u){i.L=1,i.v=Xr(Be(l)),i.m=u,i.P=!0,le(i,null)}function le(i,l){i.F=Date.now(),On(i),i.A=Be(i.v);var u=i.A,f=i.R;Array.isArray(f)||(f=[String(f)]),Uo(u.i,"t",f),i.C=0,u=i.j.J,i.h=new mr,i.g=ia(i.j,u?l:null,!i.m),0<i.O&&(i.M=new Le(w(i.Y,i,i.g),i.O)),l=i.U,u=i.g,f=i.ca;var b="readystatechange";Array.isArray(b)||(b&&(vt[0]=b.toString()),b=vt);for(var R=0;R<b.length;R++){var L=fn(u,b[R],f||l.handleEvent,!1,l.h||l);if(!L)break;l.g[L.key]=L}l=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,l)):(i.u="GET",i.g.ea(i.A,i.u,null,l)),ee(),oe(i.i,i.u,i.A,i.l,i.R,i.m)}me.prototype.ca=function(i){i=i.target;const l=this.M;l&&Ue(i)==3?l.j():this.Y(i)},me.prototype.Y=function(i){try{if(i==this.g)t:{const qt=Ue(this.g);var l=this.g.Ba();const jn=this.g.Z();if(!(3>qt)&&(qt!=3||this.g&&(this.h.h||this.g.oa()||Wo(this.g)))){this.J||qt!=4||l==7||(l==8||0>=jn?ee(3):ee(2)),Js(this);var u=this.g.Z();this.X=u;e:if(kn(this)){var f=Wo(this.g);i="";var b=f.length,R=Ue(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){vn(this),gr(this);var L="";break e}this.h.i=new c.TextDecoder}for(l=0;l<b;l++)this.h.h=!0,i+=this.h.i.decode(f[l],{stream:!(R&&l==b-1)});f.length=0,this.h.g+=i,this.C=0,L=this.h.g}else L=this.g.oa();if(this.o=u==200,ae(this.i,this.u,this.A,this.l,this.R,qt,u),this.o){if(this.T&&!this.K){e:{if(this.g){var ht,Ft=this.g;if((ht=Ft.g?Ft.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!N(ht)){var at=ht;break e}}at=null}if(u=at)It(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Zs(this,u);else{this.o=!1,this.s=3,U(12),vn(this),gr(this);break t}}if(this.P){u=!0;let pe;for(;!this.J&&this.C<L.length;)if(pe=_n(this,L),pe==Nn){qt==4&&(this.s=4,U(14),u=!1),It(this.i,this.l,null,"[Incomplete Response]");break}else if(pe==pr){this.s=4,U(15),It(this.i,this.l,L,"[Invalid Chunk]"),u=!1;break}else It(this.i,this.l,pe,null),Zs(this,pe);if(kn(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),qt!=4||L.length!=0||this.h.h||(this.s=1,U(16),u=!1),this.o=this.o&&u,!u)It(this.i,this.l,L,"[Invalid Chunked Response]"),vn(this),gr(this);else if(0<L.length&&!this.W){this.W=!0;var zt=this.j;zt.g==this&&zt.ba&&!zt.M&&(zt.j.info("Great, no buffering proxy detected. Bytes received: "+L.length),ii(zt),zt.M=!0,U(11))}}else It(this.i,this.l,L,null),Zs(this,L);qt==4&&vn(this),this.o&&!this.J&&(qt==4?ea(this.j,this):(this.o=!1,On(this)))}else Mu(this.g),u==400&&0<L.indexOf("Unknown SID")?(this.s=3,U(12)):(this.s=0,U(13)),vn(this),gr(this)}}}catch{}finally{}};function kn(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function _n(i,l){var u=i.C,f=l.indexOf(`
`,u);return f==-1?Nn:(u=Number(l.substring(u,f)),isNaN(u)?pr:(f+=1,f+u>l.length?Nn:(l=l.slice(f,f+u),i.C=f+u,l)))}me.prototype.cancel=function(){this.J=!0,vn(this)};function On(i){i.S=Date.now()+i.I,Ln(i,i.I)}function Ln(i,l){if(i.B!=null)throw Error("WatchDog timer not null");i.B=pt(w(i.ba,i),l)}function Js(i){i.B&&(c.clearTimeout(i.B),i.B=null)}me.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Qt(this.i,this.A),this.L!=2&&(ee(),U(17)),vn(this),this.s=2,gr(this)):Ln(this,this.S-i)};function gr(i){i.j.G==0||i.J||ea(i.j,i)}function vn(i){Js(i);var l=i.M;l&&typeof l.ma=="function"&&l.ma(),i.M=null,pn(i.U),i.g&&(l=i.g,i.g=null,l.abort(),l.ma())}function Zs(i,l){try{var u=i.j;if(u.G!=0&&(u.g==i||ti(u.h,i))){if(!i.K&&ti(u.h,i)&&u.G==3){try{var f=u.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var b=f;if(b[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<i.F)ns(u),ts(u);else break t;si(u),U(18)}}else u.za=b[1],0<u.za-u.T&&37500>b[2]&&u.F&&u.v==0&&!u.C&&(u.C=pt(w(u.Za,u),6e3));if(1>=Do(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else wn(u,11)}else if((i.K||u.g==i)&&ns(u),!N(l))for(b=u.Da.g.parse(l),l=0;l<b.length;l++){let at=b[l];if(u.T=at[0],at=at[1],u.G==2)if(at[0]=="c"){u.K=at[1],u.ia=at[2];const zt=at[3];zt!=null&&(u.la=zt,u.j.info("VER="+u.la));const qt=at[4];qt!=null&&(u.Aa=qt,u.j.info("SVER="+u.Aa));const jn=at[5];jn!=null&&typeof jn=="number"&&0<jn&&(f=1.5*jn,u.L=f,u.j.info("backChannelRequestTimeoutMs_="+f)),f=u;const pe=i.g;if(pe){const ss=pe.g?pe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ss){var R=f.h;R.g||ss.indexOf("spdy")==-1&&ss.indexOf("quic")==-1&&ss.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(ei(R,R.h),R.h=null))}if(f.D){const oi=pe.g?pe.g.getResponseHeader("X-HTTP-Session-Id"):null;oi&&(f.ya=oi,gt(f.I,f.D,oi))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-i.F,u.j.info("Handshake RTT: "+u.R+"ms")),f=u;var L=i;if(f.qa=sa(f,f.J?f.ia:null,f.W),L.K){No(f.h,L);var ht=L,Ft=f.L;Ft&&(ht.I=Ft),ht.B&&(Js(ht),On(ht)),f.g=L}else Zo(f);0<u.i.length&&es(u)}else at[0]!="stop"&&at[0]!="close"||wn(u,7);else u.G==3&&(at[0]=="stop"||at[0]=="close"?at[0]=="stop"?wn(u,7):ri(u):at[0]!="noop"&&u.l&&u.l.ta(at),u.v=0)}}ee(4)}catch{}}var wu=class{constructor(i,l){this.g=i,this.map=l}};function Po(i){this.l=i||10,c.PerformanceNavigationTiming?(i=c.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Vo(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Do(i){return i.h?1:i.g?i.g.size:0}function ti(i,l){return i.h?i.h==l:i.g?i.g.has(l):!1}function ei(i,l){i.g?i.g.add(l):i.h=l}function No(i,l){i.h&&i.h==l?i.h=null:i.g&&i.g.has(l)&&i.g.delete(l)}Po.prototype.cancel=function(){if(this.i=ko(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function ko(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let l=i.i;for(const u of i.g.values())l=l.concat(u.D);return l}return V(i.i)}function Tu(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var l=[],u=i.length,f=0;f<u;f++)l.push(i[f]);return l}l=[],u=0;for(f in i)l[u++]=i[f];return l}function Au(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var l=[];i=i.length;for(var u=0;u<i;u++)l.push(u);return l}l=[],u=0;for(const f in i)l[u++]=f;return l}}}function Oo(i,l){if(i.forEach&&typeof i.forEach=="function")i.forEach(l,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,l,void 0);else for(var u=Au(i),f=Tu(i),b=f.length,R=0;R<b;R++)l.call(void 0,f[R],u&&u[R],i)}var Lo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Iu(i,l){if(i){i=i.split("&");for(var u=0;u<i.length;u++){var f=i[u].indexOf("="),b=null;if(0<=f){var R=i[u].substring(0,f);b=i[u].substring(f+1)}else R=i[u];l(R,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function En(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof En){this.h=i.h,Wr(this,i.j),this.o=i.o,this.g=i.g,Qr(this,i.s),this.l=i.l;var l=i.i,u=new vr;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),Mo(this,u),this.m=i.m}else i&&(l=String(i).match(Lo))?(this.h=!1,Wr(this,l[1]||"",!0),this.o=yr(l[2]||""),this.g=yr(l[3]||"",!0),Qr(this,l[4]),this.l=yr(l[5]||"",!0),Mo(this,l[6]||"",!0),this.m=yr(l[7]||"")):(this.h=!1,this.i=new vr(null,this.h))}En.prototype.toString=function(){var i=[],l=this.j;l&&i.push(_r(l,Fo,!0),":");var u=this.g;return(u||l=="file")&&(i.push("//"),(l=this.o)&&i.push(_r(l,Fo,!0),"@"),i.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&i.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(_r(u,u.charAt(0)=="/"?Su:Ru,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",_r(u,xu)),i.join("")};function Be(i){return new En(i)}function Wr(i,l,u){i.j=u?yr(l,!0):l,i.j&&(i.j=i.j.replace(/:$/,""))}function Qr(i,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);i.s=l}else i.s=null}function Mo(i,l,u){l instanceof vr?(i.i=l,Pu(i.i,i.h)):(u||(l=_r(l,Cu)),i.i=new vr(l,i.h))}function gt(i,l,u){i.i.set(l,u)}function Xr(i){return gt(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function yr(i,l){return i?l?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function _r(i,l,u){return typeof i=="string"?(i=encodeURI(i).replace(l,bu),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function bu(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Fo=/[#\/\?@]/g,Ru=/[#\?:]/g,Su=/[#\?]/g,Cu=/[#\?@]/g,xu=/#/g;function vr(i,l){this.h=this.g=null,this.i=i||null,this.j=!!l}function Xe(i){i.g||(i.g=new Map,i.h=0,i.i&&Iu(i.i,function(l,u){i.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=vr.prototype,n.add=function(i,l){Xe(this),this.i=null,i=Mn(this,i);var u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(l),this.h+=1,this};function jo(i,l){Xe(i),l=Mn(i,l),i.g.has(l)&&(i.i=null,i.h-=i.g.get(l).length,i.g.delete(l))}function Bo(i,l){return Xe(i),l=Mn(i,l),i.g.has(l)}n.forEach=function(i,l){Xe(this),this.g.forEach(function(u,f){u.forEach(function(b){i.call(l,b,f,this)},this)},this)},n.na=function(){Xe(this);const i=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let f=0;f<l.length;f++){const b=i[f];for(let R=0;R<b.length;R++)u.push(l[f])}return u},n.V=function(i){Xe(this);let l=[];if(typeof i=="string")Bo(this,i)&&(l=l.concat(this.g.get(Mn(this,i))));else{i=Array.from(this.g.values());for(let u=0;u<i.length;u++)l=l.concat(i[u])}return l},n.set=function(i,l){return Xe(this),this.i=null,i=Mn(this,i),Bo(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[l]),this.h+=1,this},n.get=function(i,l){return i?(i=this.V(i),0<i.length?String(i[0]):l):l};function Uo(i,l,u){jo(i,l),0<u.length&&(i.i=null,i.g.set(Mn(i,l),V(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var f=l[u];const R=encodeURIComponent(String(f)),L=this.V(f);for(f=0;f<L.length;f++){var b=R;L[f]!==""&&(b+="="+encodeURIComponent(String(L[f]))),i.push(b)}}return this.i=i.join("&")};function Mn(i,l){return l=String(l),i.j&&(l=l.toLowerCase()),l}function Pu(i,l){l&&!i.j&&(Xe(i),i.i=null,i.g.forEach(function(u,f){var b=f.toLowerCase();f!=b&&(jo(this,f),Uo(this,b,u))},i)),i.j=l}function Vu(i,l){const u=new At;if(c.Image){const f=new Image;f.onload=A(Ye,u,"TestLoadImage: loaded",!0,l,f),f.onerror=A(Ye,u,"TestLoadImage: error",!1,l,f),f.onabort=A(Ye,u,"TestLoadImage: abort",!1,l,f),f.ontimeout=A(Ye,u,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else l(!1)}function Du(i,l){const u=new At,f=new AbortController,b=setTimeout(()=>{f.abort(),Ye(u,"TestPingServer: timeout",!1,l)},1e4);fetch(i,{signal:f.signal}).then(R=>{clearTimeout(b),R.ok?Ye(u,"TestPingServer: ok",!0,l):Ye(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),Ye(u,"TestPingServer: error",!1,l)})}function Ye(i,l,u,f,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),f(u)}catch{}}function Nu(){this.g=new gn}function ku(i,l,u){const f=u||"";try{Oo(i,function(b,R){let L=b;d(b)&&(L=Me(b)),l.push(f+R+"="+encodeURIComponent(L))})}catch(b){throw l.push(f+"type="+encodeURIComponent("_badmap")),b}}function Yr(i){this.l=i.Ub||null,this.j=i.eb||!1}S(Yr,Te),Yr.prototype.g=function(){return new Jr(this.l,this.j)},Yr.prototype.i=function(i){return function(){return i}}({});function Jr(i,l){wt.call(this),this.D=i,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(Jr,wt),n=Jr.prototype,n.open=function(i,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=l,this.readyState=1,wr(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(l.body=i),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Er(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,wr(this)),this.g&&(this.readyState=3,wr(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;$o(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function $o(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var l=i.value?i.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!i.done}))&&(this.response=this.responseText+=l)}i.done?Er(this):wr(this),this.readyState==3&&$o(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,Er(this))},n.Qa=function(i){this.g&&(this.response=i,Er(this))},n.ga=function(){this.g&&Er(this)};function Er(i){i.readyState=4,i.l=null,i.j=null,i.v=null,wr(i)}n.setRequestHeader=function(i,l){this.u.append(i,l)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=l.next();return i.join(`\r
`)};function wr(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Jr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function zo(i){let l="";return X(i,function(u,f){l+=f,l+=":",l+=u,l+=`\r
`}),l}function ni(i,l,u){t:{for(f in u){var f=!1;break t}f=!0}f||(u=zo(u),typeof i=="string"?u!=null&&encodeURIComponent(String(u)):gt(i,l,u))}function bt(i){wt.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(bt,wt);var Ou=/^https?$/i,Lu=["POST","PUT"];n=bt.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,l,u,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);l=l?l.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():fr.g(),this.v=this.o?Fe(this.o):Fe(fr),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(l,String(i),!0),this.B=!1}catch(R){qo(this,R);return}if(i=u||"",u=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var b in f)u.set(b,f[b]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())u.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(u.keys()).find(R=>R.toLowerCase()=="content-type"),b=c.FormData&&i instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Lu,l,void 0))||f||b||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,L]of u)this.g.setRequestHeader(R,L);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ko(this),this.u=!0,this.g.send(i),this.u=!1}catch(R){qo(this,R)}};function qo(i,l){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=l,i.m=5,Ho(i),Zr(i)}function Ho(i){i.A||(i.A=!0,_t(i,"complete"),_t(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,_t(this,"complete"),_t(this,"abort"),Zr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Zr(this,!0)),bt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Go(this):this.bb())},n.bb=function(){Go(this)};function Go(i){if(i.h&&typeof a<"u"&&(!i.v[1]||Ue(i)!=4||i.Z()!=2)){if(i.u&&Ue(i)==4)Dn(i.Ea,0,i);else if(_t(i,"readystatechange"),Ue(i)==4){i.h=!1;try{const L=i.Z();t:switch(L){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var u;if(!(u=l)){var f;if(f=L===0){var b=String(i.D).match(Lo)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),f=!Ou.test(b?b.toLowerCase():"")}u=f}if(u)_t(i,"complete"),_t(i,"success");else{i.m=6;try{var R=2<Ue(i)?i.g.statusText:""}catch{R=""}i.l=R+" ["+i.Z()+"]",Ho(i)}}finally{Zr(i)}}}}function Zr(i,l){if(i.g){Ko(i);const u=i.g,f=i.v[0]?()=>{}:null;i.g=null,i.v=null,l||_t(i,"ready");try{u.onreadystatechange=f}catch{}}}function Ko(i){i.I&&(c.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Ue(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Ue(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var l=this.g.responseText;return i&&l.indexOf(i)==0&&(l=l.substring(i.length)),We(l)}};function Wo(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Mu(i){const l={};i=(i.g&&2<=Ue(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(N(i[f]))continue;var u=T(i[f]);const b=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const R=l[b]||[];l[b]=R,R.push(u)}v(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Tr(i,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||l}function Qo(i){this.Aa=0,this.i=[],this.j=new At,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Tr("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Tr("baseRetryDelayMs",5e3,i),this.cb=Tr("retryDelaySeedMs",1e4,i),this.Wa=Tr("forwardChannelMaxRetries",2,i),this.wa=Tr("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new Po(i&&i.concurrentRequestLimit),this.Da=new Nu,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Qo.prototype,n.la=8,n.G=1,n.connect=function(i,l,u,f){U(0),this.W=i,this.H=l||{},u&&f!==void 0&&(this.H.OSID=u,this.H.OAID=f),this.F=this.X,this.I=sa(this,null,this.W),es(this)};function ri(i){if(Xo(i),i.G==3){var l=i.U++,u=Be(i.I);if(gt(u,"SID",i.K),gt(u,"RID",l),gt(u,"TYPE","terminate"),Ar(i,u),l=new me(i,i.j,l),l.L=2,l.v=Xr(Be(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=ia(l.j,null),l.g.ea(l.v)),l.F=Date.now(),On(l)}ra(i)}function ts(i){i.g&&(ii(i),i.g.cancel(),i.g=null)}function Xo(i){ts(i),i.u&&(c.clearTimeout(i.u),i.u=null),ns(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&c.clearTimeout(i.s),i.s=null)}function es(i){if(!Vo(i.h)&&!i.s){i.s=!0;var l=i.Ga;dt||H(),ct||(dt(),ct=!0),yt.add(l,i),i.B=0}}function Fu(i,l){return Do(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=l.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=pt(w(i.Ga,i,l),na(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const b=new me(this,this.j,i);let R=this.o;if(this.S&&(R?(R=p(R),E(R,this.S)):R=this.S),this.m!==null||this.O||(b.H=R,R=null),this.P)t:{for(var l=0,u=0;u<this.i.length;u++){e:{var f=this.i[u];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=u;break t}if(l===4096||u===this.i.length-1){l=u+1;break t}}l=1e3}else l=1e3;l=Jo(this,b,l),u=Be(this.I),gt(u,"RID",i),gt(u,"CVER",22),this.D&&gt(u,"X-HTTP-Session-Id",this.D),Ar(this,u),R&&(this.O?l="headers="+encodeURIComponent(String(zo(R)))+"&"+l:this.m&&ni(u,this.m,R)),ei(this.h,b),this.Ua&&gt(u,"TYPE","init"),this.P?(gt(u,"$req",l),gt(u,"SID","null"),b.T=!0,it(b,u,null)):it(b,u,l),this.G=2}}else this.G==3&&(i?Yo(this,i):this.i.length==0||Vo(this.h)||Yo(this))};function Yo(i,l){var u;l?u=l.l:u=i.U++;const f=Be(i.I);gt(f,"SID",i.K),gt(f,"RID",u),gt(f,"AID",i.T),Ar(i,f),i.m&&i.o&&ni(f,i.m,i.o),u=new me(i,i.j,u,i.B+1),i.m===null&&(u.H=i.o),l&&(i.i=l.D.concat(i.i)),l=Jo(i,u,1e3),u.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),ei(i.h,u),it(u,f,l)}function Ar(i,l){i.H&&X(i.H,function(u,f){gt(l,f,u)}),i.l&&Oo({},function(u,f){gt(l,f,u)})}function Jo(i,l,u){u=Math.min(i.i.length,u);var f=i.l?w(i.l.Na,i.l,i):null;t:{var b=i.i;let R=-1;for(;;){const L=["count="+u];R==-1?0<u?(R=b[0].g,L.push("ofs="+R)):R=0:L.push("ofs="+R);let ht=!0;for(let Ft=0;Ft<u;Ft++){let at=b[Ft].g;const zt=b[Ft].map;if(at-=R,0>at)R=Math.max(0,b[Ft].g-100),ht=!1;else try{ku(zt,L,"req"+at+"_")}catch{f&&f(zt)}}if(ht){f=L.join("&");break t}}}return i=i.i.splice(0,u),l.D=i,f}function Zo(i){if(!i.g&&!i.u){i.Y=1;var l=i.Fa;dt||H(),ct||(dt(),ct=!0),yt.add(l,i),i.v=0}}function si(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=pt(w(i.Fa,i),na(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,ta(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=pt(w(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,U(10),ts(this),ta(this))};function ii(i){i.A!=null&&(c.clearTimeout(i.A),i.A=null)}function ta(i){i.g=new me(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var l=Be(i.qa);gt(l,"RID","rpc"),gt(l,"SID",i.K),gt(l,"AID",i.T),gt(l,"CI",i.F?"0":"1"),!i.F&&i.ja&&gt(l,"TO",i.ja),gt(l,"TYPE","xmlhttp"),Ar(i,l),i.m&&i.o&&ni(l,i.m,i.o),i.L&&(i.g.I=i.L);var u=i.g;i=i.ia,u.L=1,u.v=Xr(Be(l)),u.m=null,u.P=!0,le(u,i)}n.Za=function(){this.C!=null&&(this.C=null,ts(this),si(this),U(19))};function ns(i){i.C!=null&&(c.clearTimeout(i.C),i.C=null)}function ea(i,l){var u=null;if(i.g==l){ns(i),ii(i),i.g=null;var f=2}else if(ti(i.h,l))u=l.D,No(i.h,l),f=1;else return;if(i.G!=0){if(l.o)if(f==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var b=i.B;f=Y(),_t(f,new K(f,u)),es(i)}else Zo(i);else if(b=l.s,b==3||b==0&&0<l.X||!(f==1&&Fu(i,l)||f==2&&si(i)))switch(u&&0<u.length&&(l=i.h,l.i=l.i.concat(u)),b){case 1:wn(i,5);break;case 4:wn(i,10);break;case 3:wn(i,6);break;default:wn(i,2)}}}function na(i,l){let u=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(u*=2),u*l}function wn(i,l){if(i.j.info("Error code "+l),l==2){var u=w(i.fb,i),f=i.Xa;const b=!f;f=new En(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Wr(f,"https"),Xr(f),b?Vu(f.toString(),u):Du(f.toString(),u)}else U(2);i.G=0,i.l&&i.l.sa(l),ra(i),Xo(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),U(2)):(this.j.info("Failed to ping google.com"),U(1))};function ra(i){if(i.G=0,i.ka=[],i.l){const l=ko(i.h);(l.length!=0||i.i.length!=0)&&(P(i.ka,l),P(i.ka,i.i),i.h.i.length=0,V(i.i),i.i.length=0),i.l.ra()}}function sa(i,l,u){var f=u instanceof En?Be(u):new En(u);if(f.g!="")l&&(f.g=l+"."+f.g),Qr(f,f.s);else{var b=c.location;f=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;var R=new En(null);f&&Wr(R,f),l&&(R.g=l),b&&Qr(R,b),u&&(R.l=u),f=R}return u=i.D,l=i.ya,u&&l&&gt(f,u,l),gt(f,"VER",i.la),Ar(i,f),f}function ia(i,l,u){if(l&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=i.Ca&&!i.pa?new bt(new Yr({eb:u})):new bt(i.pa),l.Ha(i.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function oa(){}n=oa.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function rs(){}rs.prototype.g=function(i,l){return new ne(i,l)};function ne(i,l){wt.call(this),this.g=new Qo(l),this.l=i,this.h=l&&l.messageUrlParams||null,i=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(i?i["X-WebChannel-Content-Type"]=l.messageContentType:i={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(i?i["X-WebChannel-Client-Profile"]=l.va:i={"X-WebChannel-Client-Profile":l.va}),this.g.S=i,(i=l&&l.Sb)&&!N(i)&&(this.g.m=i),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!N(l)&&(this.g.D=l,i=this.h,i!==null&&l in i&&(i=this.h,l in i&&delete i[l])),this.j=new Fn(this)}S(ne,wt),ne.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ne.prototype.close=function(){ri(this.g)},ne.prototype.o=function(i){var l=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.u&&(u={},u.__data__=Me(i),i=u);l.i.push(new wu(l.Ya++,i)),l.G==3&&es(l)},ne.prototype.N=function(){this.g.l=null,delete this.j,ri(this.g),delete this.g,ne.aa.N.call(this)};function aa(i){Qe.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var l=i.__sm__;if(l){t:{for(const u in l){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,l=l!==null&&i in l?l[i]:void 0),this.data=l}else this.data=i}S(aa,Qe);function la(){Tt.call(this),this.status=1}S(la,Tt);function Fn(i){this.g=i}S(Fn,oa),Fn.prototype.ua=function(){_t(this.g,"a")},Fn.prototype.ta=function(i){_t(this.g,new aa(i))},Fn.prototype.sa=function(i){_t(this.g,new la)},Fn.prototype.ra=function(){_t(this.g,"b")},rs.prototype.createWebChannel=rs.prototype.g,ne.prototype.send=ne.prototype.o,ne.prototype.open=ne.prototype.m,ne.prototype.close=ne.prototype.close,ec=function(){return new rs},tc=function(){return Y()},Zl=Pt,Si={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},fe.NO_ERROR=0,fe.TIMEOUT=8,fe.HTTP_ERROR=6,ps=fe,Kr.COMPLETE="complete",Jl=Kr,je.EventType=de,de.OPEN="a",de.CLOSE="b",de.ERROR="c",de.MESSAGE="d",wt.prototype.listen=wt.prototype.K,Ir=je,bt.prototype.listenOnce=bt.prototype.L,bt.prototype.getLastError=bt.prototype.Ka,bt.prototype.getLastErrorCode=bt.prototype.Ba,bt.prototype.getStatus=bt.prototype.Z,bt.prototype.getResponseJson=bt.prototype.Oa,bt.prototype.getResponseText=bt.prototype.oa,bt.prototype.send=bt.prototype.ea,bt.prototype.setWithCredentials=bt.prototype.Ha,Yl=bt}).apply(typeof is<"u"?is:typeof self<"u"?self:typeof window<"u"?window:{});const Aa="@firebase/firestore",Ia="4.7.16";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Gt.UNAUTHENTICATED=new Gt(null),Gt.GOOGLE_CREDENTIALS=new Gt("google-credentials-uid"),Gt.FIRST_PARTY=new Gt("first-party-uid"),Gt.MOCK_USER=new Gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ar="11.8.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=new ql("@firebase/firestore");function Un(){return Cn.logLevel}function j(n,...t){if(Cn.logLevel<=rt.DEBUG){const e=t.map(no);Cn.debug(`Firestore (${ar}): ${n}`,...e)}}function ze(n,...t){if(Cn.logLevel<=rt.ERROR){const e=t.map(no);Cn.error(`Firestore (${ar}): ${n}`,...e)}}function Yn(n,...t){if(Cn.logLevel<=rt.WARN){const e=t.map(no);Cn.warn(`Firestore (${ar}): ${n}`,...e)}}function no(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,nc(n,r,e)}function nc(n,t,e){let r=`FIRESTORE (${ar}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw ze(r),new Error(r)}function Et(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||nc(t,s,r)}function st(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class z extends or{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class qd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(Gt.UNAUTHENTICATED))}shutdown(){}}class Hd{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Gd{constructor(t){this.t=t,this.currentUser=Gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Et(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new In;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new In,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},c=h=>{j("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(j("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new In)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(j("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Et(typeof r.accessToken=="string",31837,{l:r}),new rc(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Et(t===null||typeof t=="string",2055,{h:t}),new Gt(t)}}class Kd{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Gt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Wd{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new Kd(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(Gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ba{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Qd{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,xd(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Et(this.o===void 0,3512);const r=o=>{o.error!=null&&j("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,j("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{j("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):j("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ba(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(Et(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new ba(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xd(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sc(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Xd(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function J(n,t){return n<t?-1:n>t?1:0}function Ci(n,t){let e=0;for(;e<n.length&&e<t.length;){const r=n.codePointAt(e),s=t.codePointAt(e);if(r!==s){if(r<128&&s<128)return J(r,s);{const o=sc(),a=Jd(o.encode(Ra(n,e)),o.encode(Ra(t,e)));return a!==0?a:J(r,s)}}e+=r>65535?2:1}return J(n.length,t.length)}function Ra(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function Jd(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return J(n[e],t[e]);return J(n.length,t.length)}function Jn(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa=-62135596800,Ca=1e6;class Jt{static now(){return Jt.fromMillis(Date.now())}static fromDate(t){return Jt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Ca);return new Jt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new z(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new z(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Sa)throw new z(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new z(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ca}_compareTo(t){return this.seconds===t.seconds?J(this.nanoseconds,t.nanoseconds):J(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-Sa;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{static fromTimestamp(t){return new W(t)}static min(){return new W(new Jt(0,0))}static max(){return new W(new Jt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa="__name__";class Ae{constructor(t,e,r){e===void 0?e=0:e>t.length&&Q(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&Q(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Ae.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ae?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=Ae.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return J(t.length,e.length)}static compareSegments(t,e){const r=Ae.isNumericId(t),s=Ae.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Ae.extractNumericId(t).compare(Ae.extractNumericId(e)):Ci(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return nn.fromString(t.substring(4,t.length-2))}}class Rt extends Ae{construct(t,e,r){return new Rt(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new z(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new Rt(e)}static emptyPath(){return new Rt([])}}const Zd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Wt extends Ae{construct(t,e,r){return new Wt(t,e,r)}static isValidIdentifier(t){return Zd.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Wt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===xa}static keyField(){return new Wt([xa])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new z(M.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new z(M.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new z(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(o(),s++)}if(o(),a)throw new z(M.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Wt(e)}static emptyPath(){return new Wt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(t){this.path=t}static fromPath(t){return new G(Rt.fromString(t))}static fromName(t){return new G(Rt.fromString(t).popFirst(5))}static empty(){return new G(Rt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Rt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Rt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new G(new Rt(t.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or=-1;function tf(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=W.fromTimestamp(r===1e9?new Jt(e+1,0):new Jt(e,r));return new sn(s,G.empty(),t)}function ef(n){return new sn(n.readTime,n.key,Or)}class sn{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new sn(W.min(),G.empty(),Or)}static max(){return new sn(W.max(),G.empty(),Or)}}function nf(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=G.comparator(n.documentKey,t.documentKey),e!==0?e:J(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class sf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ls(n){if(n.code!==M.FAILED_PRECONDITION||n.message!==rf)throw n;j("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Q(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new x((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof x?e:x.resolve(e)}catch(e){return x.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):x.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):x.reject(e)}static resolve(t){return new x((e,r)=>{e(t)})}static reject(t){return new x((e,r)=>{r(t)})}static waitFor(t){return new x((e,r)=>{let s=0,o=0,a=!1;t.forEach(c=>{++s,c.next(()=>{++o,a&&o===s&&e()},h=>r(h))}),a=!0,o===s&&e()})}static or(t){let e=x.resolve(!1);for(const r of t)e=e.next(s=>s?x.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new x((r,s)=>{const o=t.length,a=new Array(o);let c=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next(m=>{a[d]=m,++c,c===o&&r(a)},m=>s(m))}})}static doWhile(t,e){return new x((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function of(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function lr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ue(r),this.ce=r=>e.writeSequenceNumber(r))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}Ms.le=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const af=-1;function Fs(n){return n==null}function xi(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic="";function lf(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Pa(t)),t=cf(n.get(e),t);return Pa(t)}function cf(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case ic:e+="";break;default:e+=o}}return e}function Pa(n){return n+ic+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Va(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Br(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function uf(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t,e){this.comparator=t,this.root=e||jt.EMPTY}insert(t,e){return new Ct(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,jt.BLACK,null,null))}remove(t){return new Ct(this.comparator,this.root.remove(t,this.comparator).copy(null,null,jt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new os(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new os(this.root,t,this.comparator,!1)}getReverseIterator(){return new os(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new os(this.root,t,this.comparator,!0)}}class os{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class jt{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??jt.RED,this.left=s??jt.EMPTY,this.right=o??jt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new jt(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return jt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return jt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,jt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,jt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Q(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Q(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw Q(27949);return t+(this.isRed()?0:1)}}jt.EMPTY=null,jt.RED=!0,jt.BLACK=!1;jt.EMPTY=new class{constructor(){this.size=0}get key(){throw Q(57766)}get value(){throw Q(16141)}get color(){throw Q(16727)}get left(){throw Q(29726)}get right(){throw Q(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new jt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(t){this.comparator=t,this.data=new Ct(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Da(this.data.getIterator())}getIteratorFrom(t){return new Da(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof Nt)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Nt(this.comparator);return e.data=t,e}}class Da{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(t){this.fields=t,t.sort(Wt.comparator)}static empty(){return new Je([])}unionWith(t){let e=new Nt(Wt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Je(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Jn(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new oc("Invalid base64 string: "+o):o}}(t);return new Bt(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new Bt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return J(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Bt.EMPTY_BYTE_STRING=new Bt("");const hf=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function on(n){if(Et(!!n,39018),typeof n=="string"){let t=0;const e=hf.exec(n);if(Et(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:St(n.seconds),nanos:St(n.nanos)}}function St(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function an(n){return typeof n=="string"?Bt.fromBase64String(n):Bt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac="server_timestamp",lc="__type__",cc="__previous_value__",uc="__local_write_time__";function ro(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[lc])===null||e===void 0?void 0:e.stringValue)===ac}function js(n){const t=n.mapValue.fields[cc];return ro(t)?js(t):t}function Lr(n){const t=on(n.mapValue.fields[uc].timestampValue);return new Jt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(t,e,r,s,o,a,c,h,d,m){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=m}}const Is="(default)";class Mr{constructor(t,e){this.projectId=t,this.database=e||Is}static empty(){return new Mr("","")}get isDefaultDatabase(){return this.database===Is}isEqual(t){return t instanceof Mr&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff="__type__",hc="__max__",as={mapValue:{fields:{__type__:{stringValue:hc}}}},mf="__vector__",Pi="value";function ln(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ro(n)?4:gf(n)?9007199254740991:pf(n)?10:11:Q(28295,{value:n})}function Ce(n,t){if(n===t)return!0;const e=ln(n);if(e!==ln(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Lr(n).isEqual(Lr(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=on(s.timestampValue),c=on(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return an(s.bytesValue).isEqual(an(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return St(s.geoPointValue.latitude)===St(o.geoPointValue.latitude)&&St(s.geoPointValue.longitude)===St(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return St(s.integerValue)===St(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=St(s.doubleValue),c=St(o.doubleValue);return a===c?xi(a)===xi(c):isNaN(a)&&isNaN(c)}return!1}(n,t);case 9:return Jn(n.arrayValue.values||[],t.arrayValue.values||[],Ce);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},c=o.mapValue.fields||{};if(Va(a)!==Va(c))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(c[h]===void 0||!Ce(a[h],c[h])))return!1;return!0}(n,t);default:return Q(52216,{left:n})}}function Fr(n,t){return(n.values||[]).find(e=>Ce(e,t))!==void 0}function Zn(n,t){if(n===t)return 0;const e=ln(n),r=ln(t);if(e!==r)return J(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,t.booleanValue);case 2:return function(o,a){const c=St(o.integerValue||o.doubleValue),h=St(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,t);case 3:return Na(n.timestampValue,t.timestampValue);case 4:return Na(Lr(n),Lr(t));case 5:return Ci(n.stringValue,t.stringValue);case 6:return function(o,a){const c=an(o),h=an(a);return c.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const c=o.split("/"),h=a.split("/");for(let d=0;d<c.length&&d<h.length;d++){const m=J(c[d],h[d]);if(m!==0)return m}return J(c.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const c=J(St(o.latitude),St(a.latitude));return c!==0?c:J(St(o.longitude),St(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return ka(n.arrayValue,t.arrayValue);case 10:return function(o,a){var c,h,d,m;const _=o.fields||{},w=a.fields||{},A=(c=_[Pi])===null||c===void 0?void 0:c.arrayValue,S=(h=w[Pi])===null||h===void 0?void 0:h.arrayValue,V=J(((d=A==null?void 0:A.values)===null||d===void 0?void 0:d.length)||0,((m=S==null?void 0:S.values)===null||m===void 0?void 0:m.length)||0);return V!==0?V:ka(A,S)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===as.mapValue&&a===as.mapValue)return 0;if(o===as.mapValue)return 1;if(a===as.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),d=a.fields||{},m=Object.keys(d);h.sort(),m.sort();for(let _=0;_<h.length&&_<m.length;++_){const w=Ci(h[_],m[_]);if(w!==0)return w;const A=Zn(c[h[_]],d[m[_]]);if(A!==0)return A}return J(h.length,m.length)}(n.mapValue,t.mapValue);default:throw Q(23264,{Pe:e})}}function Na(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return J(n,t);const e=on(n),r=on(t),s=J(e.seconds,r.seconds);return s!==0?s:J(e.nanos,r.nanos)}function ka(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Zn(e[s],r[s]);if(o)return o}return J(e.length,r.length)}function tr(n){return Vi(n)}function Vi(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=on(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return an(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return G.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Vi(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Vi(e.fields[a])}`;return s+"}"}(n.mapValue):Q(61005,{value:n})}function gs(n){switch(ln(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=js(n);return t?16+gs(t):16;case 5:return 2*n.stringValue.length;case 6:return an(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+gs(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Br(r.fields,(o,a)=>{s+=o.length+gs(a)}),s}(n.mapValue);default:throw Q(13486,{value:n})}}function Di(n){return!!n&&"integerValue"in n}function so(n){return!!n&&"arrayValue"in n}function Oa(n){return!!n&&"nullValue"in n}function La(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function fi(n){return!!n&&"mapValue"in n}function pf(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{})[ff])===null||e===void 0?void 0:e.stringValue)===mf}function xr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return Br(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=xr(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=xr(n.arrayValue.values[e]);return t}return Object.assign({},n)}function gf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===hc}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(t){this.value=t}static empty(){return new Ie({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!fi(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=xr(e)}setAll(t){let e=Wt.emptyPath(),r={},s=[];t.forEach((a,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=c.popLast()}a?r[c.lastSegment()]=xr(a):s.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());fi(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ce(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];fi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){Br(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new Ie(xr(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(t,e,r,s,o,a,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(t){return new Kt(t,0,W.min(),W.min(),W.min(),Ie.empty(),0)}static newFoundDocument(t,e,r,s){return new Kt(t,1,e,W.min(),r,s,0)}static newNoDocument(t,e){return new Kt(t,2,e,W.min(),W.min(),Ie.empty(),0)}static newUnknownDocument(t,e){return new Kt(t,3,e,W.min(),W.min(),Ie.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Ie.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Ie.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Kt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Kt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(t,e){this.position=t,this.inclusive=e}}function Ma(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=G.comparator(G.fromName(a.referenceValue),e.key):r=Zn(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Fa(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ce(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(t,e="asc"){this.field=t,this.dir=e}}function yf(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{}class Dt extends dc{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new vf(t,e,r):e==="array-contains"?new Tf(t,r):e==="in"?new Af(t,r):e==="not-in"?new If(t,r):e==="array-contains-any"?new bf(t,r):new Dt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Ef(t,r):new wf(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Zn(e,this.value)):e!==null&&ln(this.value)===ln(e)&&this.matchesComparison(Zn(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return Q(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class xe extends dc{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new xe(t,e)}matches(t){return fc(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Te!==null||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function fc(n){return n.op==="and"}function mc(n){return _f(n)&&fc(n)}function _f(n){for(const t of n.filters)if(t instanceof xe)return!1;return!0}function Ni(n){if(n instanceof Dt)return n.field.canonicalString()+n.op.toString()+tr(n.value);if(mc(n))return n.filters.map(t=>Ni(t)).join(",");{const t=n.filters.map(e=>Ni(e)).join(",");return`${n.op}(${t})`}}function pc(n,t){return n instanceof Dt?function(r,s){return s instanceof Dt&&r.op===s.op&&r.field.isEqual(s.field)&&Ce(r.value,s.value)}(n,t):n instanceof xe?function(r,s){return s instanceof xe&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,c)=>o&&pc(a,s.filters[c]),!0):!1}(n,t):void Q(19439)}function gc(n){return n instanceof Dt?function(e){return`${e.field.canonicalString()} ${e.op} ${tr(e.value)}`}(n):n instanceof xe?function(e){return e.op.toString()+" {"+e.getFilters().map(gc).join(" ,")+"}"}(n):"Filter"}class vf extends Dt{constructor(t,e,r){super(t,e,r),this.key=G.fromName(r.referenceValue)}matches(t){const e=G.comparator(t.key,this.key);return this.matchesComparison(e)}}class Ef extends Dt{constructor(t,e){super(t,"in",e),this.keys=yc("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class wf extends Dt{constructor(t,e){super(t,"not-in",e),this.keys=yc("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function yc(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>G.fromName(r.referenceValue))}class Tf extends Dt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return so(e)&&Fr(e.arrayValue,this.value)}}class Af extends Dt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Fr(this.value.arrayValue,e)}}class If extends Dt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Fr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Fr(this.value.arrayValue,e)}}class bf extends Dt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!so(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Fr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(t,e=null,r=[],s=[],o=null,a=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=c,this.Ie=null}}function ja(n,t=null,e=[],r=[],s=null,o=null,a=null){return new Rf(n,t,e,r,s,o,a)}function io(n){const t=st(n);if(t.Ie===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Ni(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Fs(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>tr(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>tr(r)).join(",")),t.Ie=e}return t.Ie}function oo(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!yf(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!pc(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Fa(n.startAt,t.startAt)&&Fa(n.endAt,t.endAt)}function ki(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(t,e=null,r=[],s=[],o=null,a="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=h,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function Sf(n,t,e,r,s,o,a,c){return new Bs(n,t,e,r,s,o,a,c)}function _c(n){return new Bs(n)}function Ba(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Cf(n){return n.collectionGroup!==null}function Pr(n){const t=st(n);if(t.Ee===null){t.Ee=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ee.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Nt(Wt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ee.push(new Rs(o,r))}),e.has(Wt.keyField().canonicalString())||t.Ee.push(new Rs(Wt.keyField(),r))}return t.Ee}function Re(n){const t=st(n);return t.de||(t.de=xf(t,Pr(n))),t.de}function xf(n,t){if(n.limitType==="F")return ja(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new Rs(s.field,o)});const e=n.endAt?new bs(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new bs(n.startAt.position,n.startAt.inclusive):null;return ja(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Oi(n,t,e){return new Bs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Us(n,t){return oo(Re(n),Re(t))&&n.limitType===t.limitType}function vc(n){return`${io(Re(n))}|lt:${n.limitType}`}function $n(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>gc(s)).join(", ")}]`),Fs(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>tr(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>tr(s)).join(",")),`Target(${r})`}(Re(n))}; limitType=${n.limitType})`}function $s(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):G.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of Pr(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(a,c,h){const d=Ma(a,c,h);return a.inclusive?d<=0:d<0}(r.startAt,Pr(r),s)||r.endAt&&!function(a,c,h){const d=Ma(a,c,h);return a.inclusive?d>=0:d>0}(r.endAt,Pr(r),s))}(n,t)}function Pf(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ec(n){return(t,e)=>{let r=!1;for(const s of Pr(n)){const o=Vf(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Vf(n,t,e){const r=n.field.isKeyField()?G.comparator(t.key,e.key):function(o,a,c){const h=a.data.field(o),d=c.data.field(o);return h!==null&&d!==null?Zn(h,d):Q(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Q(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Br(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return uf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Df=new Ct(G.comparator);function cn(){return Df}const wc=new Ct(G.comparator);function br(...n){let t=wc;for(const e of n)t=t.insert(e.key,e);return t}function Nf(n){let t=wc;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function An(){return Vr()}function Tc(){return Vr()}function Vr(){return new Vn(n=>n.toString(),(n,t)=>n.isEqual(t))}const kf=new Nt(G.comparator);function ot(...n){let t=kf;for(const e of n)t=t.add(e);return t}const Of=new Nt(J);function Lf(){return Of}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:xi(t)?"-0":t}}function Ff(n){return{integerValue:""+n}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(){this._=void 0}}function jf(n,t,e){return n instanceof Li?function(s,o){const a={fields:{[lc]:{stringValue:ac},[uc]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&ro(o)&&(o=js(o)),o&&(a.fields[cc]=o),{mapValue:a}}(e,t):n instanceof Ss?Ac(n,t):n instanceof Cs?Ic(n,t):function(s,o){const a=Uf(s,o),c=Ua(a)+Ua(s.Re);return Di(a)&&Di(s.Re)?Ff(c):Mf(s.serializer,c)}(n,t)}function Bf(n,t,e){return n instanceof Ss?Ac(n,t):n instanceof Cs?Ic(n,t):e}function Uf(n,t){return n instanceof Mi?function(r){return Di(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class Li extends zs{}class Ss extends zs{constructor(t){super(),this.elements=t}}function Ac(n,t){const e=bc(t);for(const r of n.elements)e.some(s=>Ce(s,r))||e.push(r);return{arrayValue:{values:e}}}class Cs extends zs{constructor(t){super(),this.elements=t}}function Ic(n,t){let e=bc(t);for(const r of n.elements)e=e.filter(s=>!Ce(s,r));return{arrayValue:{values:e}}}class Mi extends zs{constructor(t,e){super(),this.serializer=t,this.Re=e}}function Ua(n){return St(n.integerValue||n.doubleValue)}function bc(n){return so(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function $f(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof Ss&&s instanceof Ss||r instanceof Cs&&s instanceof Cs?Jn(r.elements,s.elements,Ce):r instanceof Mi&&s instanceof Mi?Ce(r.Re,s.Re):r instanceof Li&&s instanceof Li}(n.transform,t.transform)}class bn{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new bn}static exists(t){return new bn(void 0,t)}static updateTime(t){return new bn(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ys(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class ao{}function Rc(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new qf(n.key,bn.none()):new lo(n.key,n.data,bn.none());{const e=n.data,r=Ie.empty();let s=new Nt(Wt.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new qs(n.key,r,new Je(s.toArray()),bn.none())}}function zf(n,t,e){n instanceof lo?function(s,o,a){const c=s.value.clone(),h=za(s.fieldTransforms,o,a.transformResults);c.setAll(h),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,t,e):n instanceof qs?function(s,o,a){if(!ys(s.precondition,o))return void o.convertToUnknownDocument(a.version);const c=za(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Sc(s)),h.setAll(c),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Dr(n,t,e,r){return n instanceof lo?function(o,a,c,h){if(!ys(o.precondition,a))return c;const d=o.value.clone(),m=qa(o.fieldTransforms,h,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,t,e,r):n instanceof qs?function(o,a,c,h){if(!ys(o.precondition,a))return c;const d=qa(o.fieldTransforms,h,a),m=a.data;return m.setAll(Sc(o)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(_=>_.field))}(n,t,e,r):function(o,a,c){return ys(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,t,e)}function $a(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Jn(r,s,(o,a)=>$f(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class lo extends ao{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class qs extends ao{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Sc(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function za(n,t,e){const r=new Map;Et(n.length===e.length,32656,{Ve:e.length,me:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,c=t.data.field(o.field);r.set(o.field,Bf(a,c,e[s]))}return r}function qa(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,jf(o,a,t))}return r}class qf extends ao{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&zf(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Dr(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Dr(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Tc();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=e.has(s.key)?null:c;const h=Rc(a,c);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(W.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),ot())}isEqual(t){return this.batchId===t.batchId&&Jn(this.mutations,t.mutations,(e,r)=>$a(e,r))&&Jn(this.baseMutations,t.baseMutations,(e,r)=>$a(e,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Vt,nt;function Cc(n){if(n===void 0)return ze("GRPC error has no .code"),M.UNKNOWN;switch(n){case Vt.OK:return M.OK;case Vt.CANCELLED:return M.CANCELLED;case Vt.UNKNOWN:return M.UNKNOWN;case Vt.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Vt.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Vt.INTERNAL:return M.INTERNAL;case Vt.UNAVAILABLE:return M.UNAVAILABLE;case Vt.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Vt.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Vt.NOT_FOUND:return M.NOT_FOUND;case Vt.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Vt.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Vt.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Vt.ABORTED:return M.ABORTED;case Vt.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Vt.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Vt.DATA_LOSS:return M.DATA_LOSS;default:return Q(39323,{code:n})}}(nt=Vt||(Vt={}))[nt.OK=0]="OK",nt[nt.CANCELLED=1]="CANCELLED",nt[nt.UNKNOWN=2]="UNKNOWN",nt[nt.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",nt[nt.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",nt[nt.NOT_FOUND=5]="NOT_FOUND",nt[nt.ALREADY_EXISTS=6]="ALREADY_EXISTS",nt[nt.PERMISSION_DENIED=7]="PERMISSION_DENIED",nt[nt.UNAUTHENTICATED=16]="UNAUTHENTICATED",nt[nt.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",nt[nt.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",nt[nt.ABORTED=10]="ABORTED",nt[nt.OUT_OF_RANGE=11]="OUT_OF_RANGE",nt[nt.UNIMPLEMENTED=12]="UNIMPLEMENTED",nt[nt.INTERNAL=13]="INTERNAL",nt[nt.UNAVAILABLE=14]="UNAVAILABLE",nt[nt.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf=new nn([4294967295,4294967295],0);function Ha(n){const t=sc().encode(n),e=new Xl;return e.update(t),new Uint8Array(e.digest())}function Ga(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new nn([e,r],0),new nn([s,o],0)]}class co{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Rr(`Invalid padding: ${e}`);if(r<0)throw new Rr(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Rr(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Rr(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=nn.fromNumber(this.pe)}we(t,e,r){let s=t.add(e.multiply(nn.fromNumber(r)));return s.compare(Wf)===1&&(s=new nn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}Se(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.pe===0)return!1;const e=Ha(t),[r,s]=Ga(e);for(let o=0;o<this.hashCount;o++){const a=this.we(r,s,o);if(!this.Se(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new co(o,s,e);return r.forEach(c=>a.insert(c)),a}insert(t){if(this.pe===0)return;const e=Ha(t),[r,s]=Ga(e);for(let o=0;o<this.hashCount;o++){const a=this.we(r,s,o);this.be(a)}}be(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Rr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Ur.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Hs(W.min(),s,new Ct(J),cn(),ot())}}class Ur{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Ur(r,e,ot(),ot(),ot())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(t,e,r,s){this.De=t,this.removedTargetIds=e,this.key=r,this.ve=s}}class xc{constructor(t,e){this.targetId=t,this.Ce=e}}class Pc{constructor(t,e,r=Bt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Ka{constructor(){this.Fe=0,this.Me=Wa(),this.xe=Bt.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return this.Fe!==0}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=ot(),e=ot(),r=ot();return this.Me.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:Q(38017,{changeType:o})}}),new Ur(this.xe,this.Oe,t,e,r)}Qe(){this.Ne=!1,this.Me=Wa()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,Et(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class Qf{constructor(t){this.ze=t,this.je=new Map,this.He=cn(),this.Je=ls(),this.Ye=ls(),this.Ze=new Ct(J)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const r=this.rt(e);switch(t.state){case 0:this.it(e)&&r.ke(t.resumeToken);break;case 1:r.We(),r.Be||r.Qe(),r.ke(t.resumeToken);break;case 2:r.We(),r.Be||this.removeTarget(e);break;case 3:this.it(e)&&(r.Ge(),r.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),r.ke(t.resumeToken));break;default:Q(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((r,s)=>{this.it(s)&&e(s)})}ot(t){const e=t.targetId,r=t.Ce.count,s=this._t(e);if(s){const o=s.target;if(ki(o))if(r===0){const a=new G(o.path);this.tt(e,a,Kt.newNoDocument(a,W.min()))}else Et(r===1,20013,{expectedCount:r});else{const a=this.ut(e);if(a!==r){const c=this.ct(t),h=c?this.lt(c,t,a):1;if(h!==0){this.st(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,d)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,c;try{a=an(r).toUint8Array()}catch(h){if(h instanceof oc)return Yn("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new co(a,s,o)}catch(h){return Yn(h instanceof Rr?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.pe===0?null:c}lt(t,e,r){return e.Ce.count===r-this.Tt(t,e.targetId)?0:2}Tt(t,e){const r=this.ze.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const a=this.ze.Pt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.tt(e,o,null),s++)}),s}It(t){const e=new Map;this.je.forEach((o,a)=>{const c=this._t(a);if(c){if(o.current&&ki(c.target)){const h=new G(c.target.path);this.Et(h).has(a)||this.dt(a,h)||this.tt(a,h,Kt.newNoDocument(h,t))}o.Le&&(e.set(a,o.qe()),o.Qe())}});let r=ot();this.Ye.forEach((o,a)=>{let c=!0;a.forEachWhile(h=>{const d=this._t(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(o))}),this.He.forEach((o,a)=>a.setReadTime(t));const s=new Hs(t,e,this.Ze,this.He,r);return this.He=cn(),this.Je=ls(),this.Ye=ls(),this.Ze=new Ct(J),s}et(t,e){if(!this.it(t))return;const r=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,r),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,r){if(!this.it(t))return;const s=this.rt(t);this.dt(t,e)?s.$e(e,1):s.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),r&&(this.He=this.He.insert(e,r))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new Ka,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new Nt(J),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new Nt(J),this.Je=this.Je.insert(t,e)),e}it(t){const e=this._t(t)!==null;return e||j("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new Ka),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function ls(){return new Ct(G.comparator)}function Wa(){return new Ct(G.comparator)}const Xf=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Yf=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Jf=(()=>({and:"AND",or:"OR"}))();class Zf{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Fi(n,t){return n.useProto3Json||Fs(t)?t:{value:t}}function tm(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function em(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Kn(n){return Et(!!n,49232),W.fromTimestamp(function(e){const r=on(e);return new Jt(r.seconds,r.nanos)}(n))}function nm(n,t){return ji(n,t).canonicalString()}function ji(n,t){const e=function(s){return new Rt(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Vc(n){const t=Rt.fromString(n);return Et(Lc(t),10190,{key:t.toString()}),t}function mi(n,t){const e=Vc(t);if(e.get(1)!==n.databaseId.projectId)throw new z(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new z(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new G(Nc(e))}function Dc(n,t){return nm(n.databaseId,t)}function rm(n){const t=Vc(n);return t.length===4?Rt.emptyPath():Nc(t)}function Qa(n){return new Rt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Nc(n){return Et(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function sm(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:Q(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(d,m){return d.useProto3Json?(Et(m===void 0||typeof m=="string",58123),Bt.fromBase64String(m||"")):(Et(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),Bt.fromUint8Array(m||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(d){const m=d.code===void 0?M.UNKNOWN:Cc(d.code);return new z(m,d.message||"")}(a);e=new Pc(r,s,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=mi(n,r.document.name),o=Kn(r.document.updateTime),a=r.document.createTime?Kn(r.document.createTime):W.min(),c=new Ie({mapValue:{fields:r.document.fields}}),h=Kt.newFoundDocument(s,o,a,c),d=r.targetIds||[],m=r.removedTargetIds||[];e=new _s(d,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=mi(n,r.document),o=r.readTime?Kn(r.readTime):W.min(),a=Kt.newNoDocument(s,o),c=r.removedTargetIds||[];e=new _s([],c,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=mi(n,r.document),o=r.removedTargetIds||[];e=new _s([],o,s,null)}else{if(!("filter"in t))return Q(11601,{Vt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new Kf(s,o),c=r.targetId;e=new xc(c,a)}}return e}function im(n,t){return{documents:[Dc(n,t.path)]}}function om(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Dc(n,s);const o=function(d){if(d.length!==0)return Oc(xe.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(m=>function(w){return{field:zn(w.field),direction:cm(w.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const c=Fi(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{gt:e,parent:s}}function am(n){let t=rm(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){Et(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(_){const w=kc(_);return w instanceof xe&&mc(w)?w.getFilters():[w]}(e.where));let a=[];e.orderBy&&(a=function(_){return _.map(w=>function(S){return new Rs(qn(S.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(w))}(e.orderBy));let c=null;e.limit&&(c=function(_){let w;return w=typeof _=="object"?_.value:_,Fs(w)?null:w}(e.limit));let h=null;e.startAt&&(h=function(_){const w=!!_.before,A=_.values||[];return new bs(A,w)}(e.startAt));let d=null;return e.endAt&&(d=function(_){const w=!_.before,A=_.values||[];return new bs(A,w)}(e.endAt)),Sf(t,s,a,o,c,"F",h,d)}function lm(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Q(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function kc(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=qn(e.unaryFilter.field);return Dt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=qn(e.unaryFilter.field);return Dt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=qn(e.unaryFilter.field);return Dt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=qn(e.unaryFilter.field);return Dt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Q(61313);default:return Q(60726)}}(n):n.fieldFilter!==void 0?function(e){return Dt.create(qn(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Q(58110);default:return Q(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return xe.create(e.compositeFilter.filters.map(r=>kc(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Q(1026)}}(e.compositeFilter.op))}(n):Q(30097,{filter:n})}function cm(n){return Xf[n]}function um(n){return Yf[n]}function hm(n){return Jf[n]}function zn(n){return{fieldPath:n.canonicalString()}}function qn(n){return Wt.fromServerFormat(n.fieldPath)}function Oc(n){return n instanceof Dt?function(e){if(e.op==="=="){if(La(e.value))return{unaryFilter:{field:zn(e.field),op:"IS_NAN"}};if(Oa(e.value))return{unaryFilter:{field:zn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(La(e.value))return{unaryFilter:{field:zn(e.field),op:"IS_NOT_NAN"}};if(Oa(e.value))return{unaryFilter:{field:zn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:zn(e.field),op:um(e.op),value:e.value}}}(n):n instanceof xe?function(e){const r=e.getFilters().map(s=>Oc(s));return r.length===1?r[0]:{compositeFilter:{op:hm(e.op),filters:r}}}(n):Q(54877,{filter:n})}function Lc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(t,e,r,s,o=W.min(),a=W.min(),c=Bt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new Ze(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Ze(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Ze(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Ze(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(t){this.wt=t}}function fm(n){const t=am({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Oi(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(){this.Cn=new pm}addToCollectionParentIndex(t,e){return this.Cn.add(e),x.resolve()}getCollectionParents(t,e){return x.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return x.resolve()}deleteFieldIndex(t,e){return x.resolve()}deleteAllFieldIndexes(t){return x.resolve()}createTargetIndexes(t,e){return x.resolve()}getDocumentsMatchingTarget(t,e){return x.resolve(null)}getIndexType(t,e){return x.resolve(0)}getFieldIndexes(t,e){return x.resolve([])}getNextCollectionGroupToUpdate(t){return x.resolve(null)}getMinOffset(t,e){return x.resolve(sn.min())}getMinOffsetFromCollectionGroup(t,e){return x.resolve(sn.min())}updateCollectionGroup(t,e,r){return x.resolve()}updateIndexEntries(t,e){return x.resolve()}}class pm{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new Nt(Rt.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new Nt(Rt.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Mc=41943040;class Xt{static withCacheSize(t){return new Xt(t,Xt.DEFAULT_COLLECTION_PERCENTILE,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xt.DEFAULT_COLLECTION_PERCENTILE=10,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Xt.DEFAULT=new Xt(Mc,Xt.DEFAULT_COLLECTION_PERCENTILE,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Xt.DISABLED=new Xt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(t){this.ur=t}next(){return this.ur+=2,this.ur}static cr(){return new er(0)}static lr(){return new er(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya="LruGarbageCollector",gm=1048576;function Ja([n,t],[e,r]){const s=J(n,e);return s===0?J(t,r):s}class ym{constructor(t){this.Er=t,this.buffer=new Nt(Ja),this.dr=0}Ar(){return++this.dr}Rr(t){const e=[t,this.Ar()];if(this.buffer.size<this.Er)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Ja(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class _m{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Vr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.mr(6e4)}stop(){this.Vr&&(this.Vr.cancel(),this.Vr=null)}get started(){return this.Vr!==null}mr(t){j(Ya,`Garbage collection scheduled in ${t}ms`),this.Vr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Vr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){lr(e)?j(Ya,"Ignoring IndexedDB error during garbage collection: ",e):await Ls(e)}await this.mr(3e5)})}}class vm{constructor(t,e){this.gr=t,this.params=e}calculateTargetCount(t,e){return this.gr.pr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return x.resolve(Ms.le);const r=new ym(e);return this.gr.forEachTarget(t,s=>r.Rr(s.sequenceNumber)).next(()=>this.gr.yr(t,s=>r.Rr(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.gr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.gr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(j("LruGarbageCollector","Garbage collection skipped; disabled"),x.resolve(Xa)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(j("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xa):this.wr(t,e))}getCacheSize(t){return this.gr.getCacheSize(t)}wr(t,e){let r,s,o,a,c,h,d;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(_=>(_>this.params.maximumSequenceNumbersToCollect?(j("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),s=this.params.maximumSequenceNumbersToCollect):s=_,a=Date.now(),this.nthSequenceNumber(t,s))).next(_=>(r=_,c=Date.now(),this.removeTargets(t,r,e))).next(_=>(o=_,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(_=>(d=Date.now(),Un()<=rt.DEBUG&&j("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${o} targets in `+(h-c)+`ms
	Removed ${_} documents in `+(d-h)+`ms
Total Duration: ${d-m}ms`),x.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:_})))}}function Em(n,t){return new vm(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(){this.changes=new Vn(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Kt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?x.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&Dr(r.mutation,s,Je.empty(),Jt.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,ot()).next(()=>r))}getLocalViewOfDocuments(t,e,r=ot()){const s=An();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let a=br();return o.forEach((c,h)=>{a=a.insert(c,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=An();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,ot()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,c)=>{e.set(a,c)})})}computeViews(t,e,r,s){let o=cn();const a=Vr(),c=function(){return Vr()}();return e.forEach((h,d)=>{const m=r.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof qs)?o=o.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),Dr(m.mutation,d,m.mutation.getFieldMask(),Jt.now())):a.set(d.key,Je.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((d,m)=>a.set(d,m)),e.forEach((d,m)=>{var _;return c.set(d,new Tm(m,(_=a.get(d))!==null&&_!==void 0?_:null))}),c))}recalculateAndSaveOverlays(t,e){const r=Vr();let s=new Ct((a,c)=>a-c),o=ot();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const c of a)c.keys().forEach(h=>{const d=e.get(h);if(d===null)return;let m=r.get(h)||Je.empty();m=c.applyToLocalView(d,m),r.set(h,m);const _=(s.get(c.batchId)||ot()).add(h);s=s.insert(c.batchId,_)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),d=h.key,m=h.value,_=Tc();m.forEach(w=>{if(!o.has(w)){const A=Rc(e.get(w),r.get(w));A!==null&&_.set(w,A),o=o.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,_))}return x.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return function(a){return G.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Cf(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):x.resolve(An());let c=Or,h=o;return a.next(d=>x.forEach(d,(m,_)=>(c<_.largestBatchId&&(c=_.largestBatchId),o.get(m)?x.resolve():this.remoteDocumentCache.getEntry(t,m).next(w=>{h=h.insert(m,w)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,h,d,ot())).next(m=>({batchId:c,changes:Nf(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new G(e)).next(r=>{let s=br();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=br();return this.indexManager.getCollectionParents(t,o).next(c=>x.forEach(c,h=>{const d=function(_,w){return new Bs(w,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next(m=>{m.forEach((_,w)=>{a=a.insert(_,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(a=>{o.forEach((h,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,Kt.newInvalidDocument(m)))});let c=br();return a.forEach((h,d)=>{const m=o.get(h);m!==void 0&&Dr(m.mutation,d,Je.empty(),Jt.now()),$s(e,d)&&(c=c.insert(h,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Im{constructor(t){this.serializer=t,this.kr=new Map,this.qr=new Map}getBundleMetadata(t,e){return x.resolve(this.kr.get(e))}saveBundleMetadata(t,e){return this.kr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Kn(s.createTime)}}(e)),x.resolve()}getNamedQuery(t,e){return x.resolve(this.qr.get(e))}saveNamedQuery(t,e){return this.qr.set(e.name,function(s){return{name:s.name,query:fm(s.bundledQuery),readTime:Kn(s.readTime)}}(e)),x.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(){this.overlays=new Ct(G.comparator),this.Qr=new Map}getOverlay(t,e){return x.resolve(this.overlays.get(e))}getOverlays(t,e){const r=An();return x.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.bt(t,e,o)}),x.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Qr.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Qr.delete(r)),x.resolve()}getOverlaysForCollection(t,e,r){const s=An(),o=e.length+1,a=new G(e.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return x.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new Ct((d,m)=>d-m);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>r){let m=o.get(d.largestBatchId);m===null&&(m=An(),o=o.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const c=An(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,m)=>c.set(d,m)),!(c.size()>=s)););return x.resolve(c)}bt(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Qr.get(s.largestBatchId).delete(r.key);this.Qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Gf(e,r));let o=this.Qr.get(e);o===void 0&&(o=ot(),this.Qr.set(e,o)),this.Qr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(){this.sessionToken=Bt.EMPTY_BYTE_STRING}getSessionToken(t){return x.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,x.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(){this.$r=new Nt(kt.Ur),this.Kr=new Nt(kt.Wr)}isEmpty(){return this.$r.isEmpty()}addReference(t,e){const r=new kt(t,e);this.$r=this.$r.add(r),this.Kr=this.Kr.add(r)}Gr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.zr(new kt(t,e))}jr(t,e){t.forEach(r=>this.removeReference(r,e))}Hr(t){const e=new G(new Rt([])),r=new kt(e,t),s=new kt(e,t+1),o=[];return this.Kr.forEachInRange([r,s],a=>{this.zr(a),o.push(a.key)}),o}Jr(){this.$r.forEach(t=>this.zr(t))}zr(t){this.$r=this.$r.delete(t),this.Kr=this.Kr.delete(t)}Yr(t){const e=new G(new Rt([])),r=new kt(e,t),s=new kt(e,t+1);let o=ot();return this.Kr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new kt(t,0),r=this.$r.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class kt{constructor(t,e){this.key=t,this.Zr=e}static Ur(t,e){return G.comparator(t.key,e.key)||J(t.Zr,e.Zr)}static Wr(t,e){return J(t.Zr,e.Zr)||G.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.nr=1,this.Xr=new Nt(kt.Ur)}checkEmpty(t){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.nr;this.nr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Hf(o,e,r,s);this.mutationQueue.push(a);for(const c of s)this.Xr=this.Xr.add(new kt(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return x.resolve(a)}lookupMutationBatch(t,e){return x.resolve(this.ei(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ti(r),o=s<0?0:s;return x.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?af:this.nr-1)}getAllMutationBatches(t){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new kt(e,0),s=new kt(e,Number.POSITIVE_INFINITY),o=[];return this.Xr.forEachInRange([r,s],a=>{const c=this.ei(a.Zr);o.push(c)}),x.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new Nt(J);return e.forEach(s=>{const o=new kt(s,0),a=new kt(s,Number.POSITIVE_INFINITY);this.Xr.forEachInRange([o,a],c=>{r=r.add(c.Zr)})}),x.resolve(this.ni(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;G.isDocumentKey(o)||(o=o.child(""));const a=new kt(new G(o),0);let c=new Nt(J);return this.Xr.forEachWhile(h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(h.Zr)),!0)},a),x.resolve(this.ni(c))}ni(t){const e=[];return t.forEach(r=>{const s=this.ei(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){Et(this.ri(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Xr;return x.forEach(e.mutations,s=>{const o=new kt(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Xr=r})}sr(t){}containsKey(t,e){const r=new kt(e,0),s=this.Xr.firstAfterOrEqual(r);return x.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,x.resolve()}ri(t,e){return this.ti(t)}ti(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}ei(t){const e=this.ti(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(t){this.ii=t,this.docs=function(){return new Ct(G.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ii(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return x.resolve(r?r.document.mutableCopy():Kt.newInvalidDocument(e))}getEntries(t,e){let r=cn();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():Kt.newInvalidDocument(s))}),x.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=cn();const a=e.path,c=new G(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:d,value:{document:m}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||nf(ef(m),r)<=0||(s.has(m.key)||$s(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return x.resolve(o)}getAllFromCollectionGroup(t,e,r,s){Q(9500)}si(t,e){return x.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new xm(this)}getSize(t){return x.resolve(this.size)}}class xm extends wm{constructor(t){super(),this.Br=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.Br.addEntry(t,s)):this.Br.removeEntry(r)}),x.waitFor(e)}getFromCache(t,e){return this.Br.getEntry(t,e)}getAllFromCache(t,e){return this.Br.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(t){this.persistence=t,this.oi=new Vn(e=>io(e),oo),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this._i=0,this.ai=new uo,this.targetCount=0,this.ui=er.cr()}forEachTarget(t,e){return this.oi.forEach((r,s)=>e(s)),x.resolve()}getLastRemoteSnapshotVersion(t){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return x.resolve(this._i)}allocateTargetId(t){return this.highestTargetId=this.ui.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this._i&&(this._i=e),x.resolve()}Tr(t){this.oi.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ui=new er(e),this.highestTargetId=e),t.sequenceNumber>this._i&&(this._i=t.sequenceNumber)}addTargetData(t,e){return this.Tr(e),this.targetCount+=1,x.resolve()}updateTargetData(t,e){return this.Tr(e),x.resolve()}removeTargetData(t,e){return this.oi.delete(e.target),this.ai.Hr(e.targetId),this.targetCount-=1,x.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.oi.forEach((a,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.oi.delete(a),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)}),x.waitFor(o).next(()=>s)}getTargetCount(t){return x.resolve(this.targetCount)}getTargetData(t,e){const r=this.oi.get(e)||null;return x.resolve(r)}addMatchingKeys(t,e,r){return this.ai.Gr(e,r),x.resolve()}removeMatchingKeys(t,e,r){this.ai.jr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),x.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.ai.Hr(e),x.resolve()}getMatchingKeysForTargetId(t,e){const r=this.ai.Yr(e);return x.resolve(r)}containsKey(t,e){return x.resolve(this.ai.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(t,e){this.ci={},this.overlays={},this.li=new Ms(0),this.hi=!1,this.hi=!0,this.Pi=new Rm,this.referenceDelegate=t(this),this.Ti=new Pm(this),this.indexManager=new mm,this.remoteDocumentCache=function(s){return new Cm(s)}(r=>this.referenceDelegate.Ii(r)),this.serializer=new dm(e),this.Ei=new Im(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.hi=!1,Promise.resolve()}get started(){return this.hi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new bm,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ci[t.toKey()];return r||(r=new Sm(e,this.referenceDelegate),this.ci[t.toKey()]=r),r}getGlobalsCache(){return this.Pi}getTargetCache(){return this.Ti}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ei}runTransaction(t,e,r){j("MemoryPersistence","Starting transaction:",t);const s=new Vm(this.li.next());return this.referenceDelegate.di(),r(s).next(o=>this.referenceDelegate.Ai(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ri(t,e){return x.or(Object.values(this.ci).map(r=>()=>r.containsKey(t,e)))}}class Vm extends sf{constructor(t){super(),this.currentSequenceNumber=t}}class ho{constructor(t){this.persistence=t,this.Vi=new uo,this.mi=null}static fi(t){return new ho(t)}get gi(){if(this.mi)return this.mi;throw Q(60996)}addReference(t,e,r){return this.Vi.addReference(r,e),this.gi.delete(r.toString()),x.resolve()}removeReference(t,e,r){return this.Vi.removeReference(r,e),this.gi.add(r.toString()),x.resolve()}markPotentiallyOrphaned(t,e){return this.gi.add(e.toString()),x.resolve()}removeTarget(t,e){this.Vi.Hr(e.targetId).forEach(s=>this.gi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.gi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}di(){this.mi=new Set}Ai(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.gi,r=>{const s=G.fromPath(r);return this.pi(t,s).next(o=>{o||e.removeEntry(s,W.min())})}).next(()=>(this.mi=null,e.apply(t)))}updateLimboDocument(t,e){return this.pi(t,e).next(r=>{r?this.gi.delete(e.toString()):this.gi.add(e.toString())})}Ii(t){return 0}pi(t,e){return x.or([()=>x.resolve(this.Vi.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ri(t,e)])}}class xs{constructor(t,e){this.persistence=t,this.yi=new Vn(r=>lf(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Em(this,e)}static fi(t,e){return new xs(t,e)}di(){}Ai(t){return x.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}pr(t){const e=this.Sr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}Sr(t){let e=0;return this.yr(t,r=>{e++}).next(()=>e)}yr(t,e){return x.forEach(this.yi,(r,s)=>this.Dr(t,r,s).next(o=>o?x.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.si(t,a=>this.Dr(t,a,e).next(c=>{c||(r++,o.removeEntry(a,W.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.yi.set(e,t.currentSequenceNumber),x.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.yi.set(r,t.currentSequenceNumber),x.resolve()}removeReference(t,e,r){return this.yi.set(r,t.currentSequenceNumber),x.resolve()}updateLimboDocument(t,e){return this.yi.set(e,t.currentSequenceNumber),x.resolve()}Ii(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=gs(t.data.value)),e}Dr(t,e,r){return x.or([()=>this.persistence.Ri(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.yi.get(e);return x.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.ds=r,this.As=s}static Rs(t,e){let r=ot(),s=ot();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new fo(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nm{constructor(){this.Vs=!1,this.fs=!1,this.gs=100,this.ps=function(){return bh()?8:of(Ah())>0?6:4}()}initialize(t,e){this.ys=t,this.indexManager=e,this.Vs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.ws(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Ss(t,e,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new Dm;return this.bs(t,e,a).next(c=>{if(o.result=c,this.fs)return this.Ds(t,e,a,c.size)})}).next(()=>o.result)}Ds(t,e,r,s){return r.documentReadCount<this.gs?(Un()<=rt.DEBUG&&j("QueryEngine","SDK will not create cache indexes for query:",$n(e),"since it only creates cache indexes for collection contains","more than or equal to",this.gs,"documents"),x.resolve()):(Un()<=rt.DEBUG&&j("QueryEngine","Query:",$n(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ps*s?(Un()<=rt.DEBUG&&j("QueryEngine","The SDK decides to create cache indexes for query:",$n(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Re(e))):x.resolve())}ws(t,e){if(Ba(e))return x.resolve(null);let r=Re(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Oi(e,null,"F"),r=Re(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=ot(...o);return this.ys.getDocuments(t,a).next(c=>this.indexManager.getMinOffset(t,r).next(h=>{const d=this.vs(e,c);return this.Cs(e,d,a,h.readTime)?this.ws(t,Oi(e,null,"F")):this.Fs(t,d,e,h)}))})))}Ss(t,e,r,s){return Ba(e)||s.isEqual(W.min())?x.resolve(null):this.ys.getDocuments(t,r).next(o=>{const a=this.vs(e,o);return this.Cs(e,a,r,s)?x.resolve(null):(Un()<=rt.DEBUG&&j("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),$n(e)),this.Fs(t,a,e,tf(s,Or)).next(c=>c))})}vs(t,e){let r=new Nt(Ec(t));return e.forEach((s,o)=>{$s(t,o)&&(r=r.add(o))}),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}bs(t,e,r){return Un()<=rt.DEBUG&&j("QueryEngine","Using full collection scan to execute query:",$n(e)),this.ys.getDocumentsMatchingQuery(t,e,sn.min(),r)}Fs(t,e,r,s){return this.ys.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mo="LocalStore",km=3e8;class Om{constructor(t,e,r,s){this.persistence=t,this.Ms=e,this.serializer=s,this.xs=new Ct(J),this.Os=new Vn(o=>io(o),oo),this.Ns=new Map,this.Bs=t.getRemoteDocumentCache(),this.Ti=t.getTargetCache(),this.Ei=t.getBundleCache(),this.Ls(r)}Ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Am(this.Bs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Bs.setIndexManager(this.indexManager),this.Ms.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.xs))}}function Lm(n,t,e,r){return new Om(n,t,e,r)}async function jc(n,t){const e=st(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.Ls(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],c=[];let h=ot();for(const d of s){a.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}for(const d of o){c.push(d.batchId);for(const m of d.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next(d=>({ks:d,removedBatchIds:a,addedBatchIds:c}))})})}function Bc(n){const t=st(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ti.getLastRemoteSnapshotVersion(e))}function Mm(n,t){const e=st(n),r=t.snapshotVersion;let s=e.xs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.Bs.newChangeBuffer({trackRemovals:!0});s=e.xs;const c=[];t.targetChanges.forEach((m,_)=>{const w=s.get(_);if(!w)return;c.push(e.Ti.removeMatchingKeys(o,m.removedDocuments,_).next(()=>e.Ti.addMatchingKeys(o,m.addedDocuments,_)));let A=w.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(_)!==null?A=A.withResumeToken(Bt.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):m.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(m.resumeToken,r)),s=s.insert(_,A),function(V,P,D){return V.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=km?!0:D.addedDocuments.size+D.modifiedDocuments.size+D.removedDocuments.size>0}(w,A,m)&&c.push(e.Ti.updateTargetData(o,A))});let h=cn(),d=ot();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),c.push(Fm(o,a,t.documentUpdates).next(m=>{h=m.qs,d=m.Qs})),!r.isEqual(W.min())){const m=e.Ti.getLastRemoteSnapshotVersion(o).next(_=>e.Ti.setTargetsMetadata(o,o.currentSequenceNumber,r));c.push(m)}return x.waitFor(c).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(e.xs=s,o))}function Fm(n,t,e){let r=ot(),s=ot();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=cn();return e.forEach((c,h)=>{const d=o.get(c);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),h.isNoDocument()&&h.version.isEqual(W.min())?(t.removeEntry(c,h.readTime),a=a.insert(c,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),a=a.insert(c,h)):j(mo,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",h.version)}),{qs:a,Qs:s}})}function jm(n,t){const e=st(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.Ti.getTargetData(r,t).next(o=>o?(s=o,x.resolve(s)):e.Ti.allocateTargetId(r).next(a=>(s=new Ze(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.Ti.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.xs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.xs=e.xs.insert(r.targetId,r),e.Os.set(t,r.targetId)),r})}async function Bi(n,t,e){const r=st(n),s=r.xs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!lr(a))throw a;j(mo,`Failed to update sequence numbers for target ${t}: ${a}`)}r.xs=r.xs.remove(t),r.Os.delete(s.target)}function Za(n,t,e){const r=st(n);let s=W.min(),o=ot();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,m){const _=st(h),w=_.Os.get(m);return w!==void 0?x.resolve(_.xs.get(w)):_.Ti.getTargetData(d,m)}(r,a,Re(t)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Ti.getMatchingKeysForTargetId(a,c.targetId).next(h=>{o=h})}).next(()=>r.Ms.getDocumentsMatchingQuery(a,t,e?s:W.min(),e?o:ot())).next(c=>(Bm(r,Pf(t),c),{documents:c,$s:o})))}function Bm(n,t,e){let r=n.Ns.get(t)||W.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Ns.set(t,r)}class tl{constructor(){this.activeTargetIds=Lf()}js(t){this.activeTargetIds=this.activeTargetIds.add(t)}Hs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}zs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Um{constructor(){this.xo=new tl,this.Oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.xo.js(t),this.Oo[t]||"not-current"}updateQueryState(t,e,r){this.Oo[t]=e}removeLocalQueryTarget(t){this.xo.Hs(t)}isLocalQueryTarget(t){return this.xo.activeTargetIds.has(t)}clearQueryState(t){delete this.Oo[t]}getAllActiveQueryTargets(){return this.xo.activeTargetIds}isActiveQueryTarget(t){return this.xo.activeTargetIds.has(t)}start(){return this.xo=new tl,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{No(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el="ConnectivityMonitor";class nl{constructor(){this.Bo=()=>this.Lo(),this.ko=()=>this.qo(),this.Qo=[],this.$o()}No(t){this.Qo.push(t)}shutdown(){window.removeEventListener("online",this.Bo),window.removeEventListener("offline",this.ko)}$o(){window.addEventListener("online",this.Bo),window.addEventListener("offline",this.ko)}Lo(){j(el,"Network connectivity changed: AVAILABLE");for(const t of this.Qo)t(0)}qo(){j(el,"Network connectivity changed: UNAVAILABLE");for(const t of this.Qo)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cs=null;function Ui(){return cs===null?cs=function(){return 268435456+Math.round(2147483648*Math.random())}():cs++,"0x"+cs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi="RestConnection",zm={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class qm{get Uo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Wo=`projects/${r}/databases/${s}`,this.Go=this.databaseId.database===Is?`project_id=${r}`:`project_id=${r}&database_id=${s}`}zo(t,e,r,s,o){const a=Ui(),c=this.jo(t,e.toUriEncodedString());j(pi,`Sending RPC '${t}' ${a}:`,c,r);const h={"google-cloud-resource-prefix":this.Wo,"x-goog-request-params":this.Go};this.Ho(h,s,o);const{host:d}=new URL(c),m=to(d);return this.Jo(t,c,h,r,m).then(_=>(j(pi,`Received RPC '${t}' ${a}: `,_),_),_=>{throw Yn(pi,`RPC '${t}' ${a} failed with error: `,_,"url: ",c,"request:",r),_})}Yo(t,e,r,s,o,a){return this.zo(t,e,r,s,o)}Ho(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ar}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}jo(t,e){const r=zm[t];return`${this.Ko}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(t){this.Zo=t.Zo,this.Xo=t.Xo}e_(t){this.t_=t}n_(t){this.r_=t}i_(t){this.s_=t}onMessage(t){this.o_=t}close(){this.Xo()}send(t){this.Zo(t)}__(){this.t_()}a_(){this.r_()}u_(t){this.s_(t)}c_(t){this.o_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht="WebChannelConnection";class Gm extends qm{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,o){const a=Ui();return new Promise((c,h)=>{const d=new Yl;d.setWithCredentials(!0),d.listenOnce(Jl.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case ps.NO_ERROR:const _=d.getResponseJson();j(Ht,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(_)),c(_);break;case ps.TIMEOUT:j(Ht,`RPC '${t}' ${a} timed out`),h(new z(M.DEADLINE_EXCEEDED,"Request time out"));break;case ps.HTTP_ERROR:const w=d.getStatus();if(j(Ht,`RPC '${t}' ${a} failed with status:`,w,"response text:",d.getResponseText()),w>0){let A=d.getResponseJson();Array.isArray(A)&&(A=A[0]);const S=A==null?void 0:A.error;if(S&&S.status&&S.message){const V=function(D){const N=D.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(N)>=0?N:M.UNKNOWN}(S.status);h(new z(V,S.message))}else h(new z(M.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new z(M.UNAVAILABLE,"Connection failed."));break;default:Q(9055,{l_:t,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{j(Ht,`RPC '${t}' ${a} completed.`)}});const m=JSON.stringify(s);j(Ht,`RPC '${t}' ${a} sending request:`,s),d.send(e,"POST",m,r,15)})}T_(t,e,r){const s=Ui(),o=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=ec(),c=tc(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Ho(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const m=o.join("");j(Ht,`Creating RPC '${t}' stream ${s}: ${m}`,h);const _=a.createWebChannel(m,h);let w=!1,A=!1;const S=new Hm({Zo:P=>{A?j(Ht,`Not sending because RPC '${t}' stream ${s} is closed:`,P):(w||(j(Ht,`Opening RPC '${t}' stream ${s} transport.`),_.open(),w=!0),j(Ht,`RPC '${t}' stream ${s} sending:`,P),_.send(P))},Xo:()=>_.close()}),V=(P,D,N)=>{P.listen(D,O=>{try{N(O)}catch(B){setTimeout(()=>{throw B},0)}})};return V(_,Ir.EventType.OPEN,()=>{A||(j(Ht,`RPC '${t}' stream ${s} transport opened.`),S.__())}),V(_,Ir.EventType.CLOSE,()=>{A||(A=!0,j(Ht,`RPC '${t}' stream ${s} transport closed`),S.u_())}),V(_,Ir.EventType.ERROR,P=>{A||(A=!0,Yn(Ht,`RPC '${t}' stream ${s} transport errored. Name:`,P.name,"Message:",P.message),S.u_(new z(M.UNAVAILABLE,"The operation could not be completed")))}),V(_,Ir.EventType.MESSAGE,P=>{var D;if(!A){const N=P.data[0];Et(!!N,16349);const O=N,B=(O==null?void 0:O.error)||((D=O[0])===null||D===void 0?void 0:D.error);if(B){j(Ht,`RPC '${t}' stream ${s} received error:`,B);const q=B.status;let X=function(y){const E=Vt[y];if(E!==void 0)return Cc(E)}(q),v=B.message;X===void 0&&(X=M.INTERNAL,v="Unknown error status: "+q+" with message "+B.message),A=!0,S.u_(new z(X,v)),_.close()}else j(Ht,`RPC '${t}' stream ${s} received:`,N),S.c_(N)}}),V(c,Zl.STAT_EVENT,P=>{P.stat===Si.PROXY?j(Ht,`RPC '${t}' stream ${s} detected buffering proxy`):P.stat===Si.NOPROXY&&j(Ht,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.a_()},0),S}}function gi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uc(n){return new Zf(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(t,e,r=1e3,s=1.5,o=6e4){this.xi=t,this.timerId=e,this.I_=r,this.E_=s,this.d_=o,this.A_=0,this.R_=null,this.V_=Date.now(),this.reset()}reset(){this.A_=0}m_(){this.A_=this.d_}f_(t){this.cancel();const e=Math.floor(this.A_+this.g_()),r=Math.max(0,Date.now()-this.V_),s=Math.max(0,e-r);s>0&&j("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.A_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.R_=this.xi.enqueueAfterDelay(this.timerId,s,()=>(this.V_=Date.now(),t())),this.A_*=this.E_,this.A_<this.I_&&(this.A_=this.I_),this.A_>this.d_&&(this.A_=this.d_)}p_(){this.R_!==null&&(this.R_.skipDelay(),this.R_=null)}cancel(){this.R_!==null&&(this.R_.cancel(),this.R_=null)}g_(){return(Math.random()-.5)*this.A_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl="PersistentStream";class Km{constructor(t,e,r,s,o,a,c,h){this.xi=t,this.y_=r,this.w_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.S_=0,this.b_=null,this.D_=null,this.stream=null,this.v_=0,this.C_=new $c(t,e)}F_(){return this.state===1||this.state===5||this.M_()}M_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.x_()}async stop(){this.F_()&&await this.close(0)}O_(){this.state=0,this.C_.reset()}N_(){this.M_()&&this.b_===null&&(this.b_=this.xi.enqueueAfterDelay(this.y_,6e4,()=>this.B_()))}L_(t){this.k_(),this.stream.send(t)}async B_(){if(this.M_())return this.close(0)}k_(){this.b_&&(this.b_.cancel(),this.b_=null)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}async close(t,e){this.k_(),this.q_(),this.C_.cancel(),this.S_++,t!==4?this.C_.reset():e&&e.code===M.RESOURCE_EXHAUSTED?(ze(e.toString()),ze("Using maximum backoff delay to prevent overloading the backend."),this.C_.m_()):e&&e.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Q_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.i_(e)}Q_(){}auth(){this.state=1;const t=this.U_(this.S_),e=this.S_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.S_===e&&this.K_(r,s)},r=>{t(()=>{const s=new z(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.W_(s)})})}K_(t,e){const r=this.U_(this.S_);this.stream=this.G_(t,e),this.stream.e_(()=>{r(()=>this.listener.e_())}),this.stream.n_(()=>{r(()=>(this.state=2,this.D_=this.xi.enqueueAfterDelay(this.w_,1e4,()=>(this.M_()&&(this.state=3),Promise.resolve())),this.listener.n_()))}),this.stream.i_(s=>{r(()=>this.W_(s))}),this.stream.onMessage(s=>{r(()=>++this.v_==1?this.z_(s):this.onNext(s))})}x_(){this.state=5,this.C_.f_(async()=>{this.state=0,this.start()})}W_(t){return j(rl,`close with error: ${t}`),this.stream=null,this.close(4,t)}U_(t){return e=>{this.xi.enqueueAndForget(()=>this.S_===t?e():(j(rl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Wm extends Km{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}G_(t,e){return this.connection.T_("Listen",t,e)}z_(t){return this.onNext(t)}onNext(t){this.C_.reset();const e=sm(this.serializer,t),r=function(o){if(!("targetChange"in o))return W.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?W.min():a.readTime?Kn(a.readTime):W.min()}(t);return this.listener.j_(e,r)}H_(t){const e={};e.database=Qa(this.serializer),e.addTarget=function(o,a){let c;const h=a.target;if(c=ki(h)?{documents:im(o,h)}:{query:om(o,h).gt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=em(o,a.resumeToken);const d=Fi(o,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(W.min())>0){c.readTime=tm(o,a.snapshotVersion.toTimestamp());const d=Fi(o,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,t);const r=lm(this.serializer,t);r&&(e.labels=r),this.L_(e)}J_(t){const e={};e.database=Qa(this.serializer),e.removeTarget=t,this.L_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{}class Xm extends Qm{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.na=!1}ra(){if(this.na)throw new z(M.FAILED_PRECONDITION,"The client has already been terminated.")}zo(t,e,r,s){return this.ra(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.zo(t,ji(e,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new z(M.UNKNOWN,o.toString())})}Yo(t,e,r,s,o){return this.ra(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Yo(t,ji(e,r),s,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new z(M.UNKNOWN,a.toString())})}terminate(){this.na=!0,this.connection.terminate()}}class Ym{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.ia=0,this.sa=null,this.oa=!0}_a(){this.ia===0&&(this.aa("Unknown"),this.sa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.sa=null,this.ua("Backend didn't respond within 10 seconds."),this.aa("Offline"),Promise.resolve())))}ca(t){this.state==="Online"?this.aa("Unknown"):(this.ia++,this.ia>=1&&(this.la(),this.ua(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.aa("Offline")))}set(t){this.la(),this.ia=0,t==="Online"&&(this.oa=!1),this.aa(t)}aa(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ua(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.oa?(ze(e),this.oa=!1):j("OnlineStateTracker",e)}la(){this.sa!==null&&(this.sa.cancel(),this.sa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr="RemoteStore";class Jm{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.ha=[],this.Pa=new Map,this.Ta=new Set,this.Ia=[],this.Ea=o,this.Ea.No(a=>{r.enqueueAndForget(async()=>{zr(this)&&(j(nr,"Restarting streams for network reachability change."),await async function(h){const d=st(h);d.Ta.add(4),await $r(d),d.da.set("Unknown"),d.Ta.delete(4),await Gs(d)}(this))})}),this.da=new Ym(r,s)}}async function Gs(n){if(zr(n))for(const t of n.Ia)await t(!0)}async function $r(n){for(const t of n.Ia)await t(!1)}function zc(n,t){const e=st(n);e.Pa.has(t.targetId)||(e.Pa.set(t.targetId,t),_o(e)?yo(e):cr(e).M_()&&go(e,t))}function po(n,t){const e=st(n),r=cr(e);e.Pa.delete(t),r.M_()&&qc(e,t),e.Pa.size===0&&(r.M_()?r.N_():zr(e)&&e.da.set("Unknown"))}function go(n,t){if(n.Aa.Ke(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(W.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}cr(n).H_(t)}function qc(n,t){n.Aa.Ke(t),cr(n).J_(t)}function yo(n){n.Aa=new Qf({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Rt:t=>n.Pa.get(t)||null,Pt:()=>n.datastore.serializer.databaseId}),cr(n).start(),n.da._a()}function _o(n){return zr(n)&&!cr(n).F_()&&n.Pa.size>0}function zr(n){return st(n).Ta.size===0}function Hc(n){n.Aa=void 0}async function Zm(n){n.da.set("Online")}async function tp(n){n.Pa.forEach((t,e)=>{go(n,t)})}async function ep(n,t){Hc(n),_o(n)?(n.da.ca(t),yo(n)):n.da.set("Unknown")}async function np(n,t,e){if(n.da.set("Online"),t instanceof Pc&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const c of o.targetIds)s.Pa.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Pa.delete(c),s.Aa.removeTarget(c))}(n,t)}catch(r){j(nr,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await sl(n,r)}else if(t instanceof _s?n.Aa.Xe(t):t instanceof xc?n.Aa.ot(t):n.Aa.nt(t),!e.isEqual(W.min()))try{const r=await Bc(n.localStore);e.compareTo(r)>=0&&await function(o,a){const c=o.Aa.It(a);return c.targetChanges.forEach((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Pa.get(d);m&&o.Pa.set(d,m.withResumeToken(h.resumeToken,a))}}),c.targetMismatches.forEach((h,d)=>{const m=o.Pa.get(h);if(!m)return;o.Pa.set(h,m.withResumeToken(Bt.EMPTY_BYTE_STRING,m.snapshotVersion)),qc(o,h);const _=new Ze(m.target,h,d,m.sequenceNumber);go(o,_)}),o.remoteSyncer.applyRemoteEvent(c)}(n,e)}catch(r){j(nr,"Failed to raise snapshot:",r),await sl(n,r)}}async function sl(n,t,e){if(!lr(t))throw t;n.Ta.add(1),await $r(n),n.da.set("Offline"),e||(e=()=>Bc(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{j(nr,"Retrying IndexedDB access"),await e(),n.Ta.delete(1),await Gs(n)})}async function il(n,t){const e=st(n);e.asyncQueue.verifyOperationInProgress(),j(nr,"RemoteStore received new credentials");const r=zr(e);e.Ta.add(3),await $r(e),r&&e.da.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ta.delete(3),await Gs(e)}async function rp(n,t){const e=st(n);t?(e.Ta.delete(2),await Gs(e)):t||(e.Ta.add(2),await $r(e),e.da.set("Unknown"))}function cr(n){return n.Ra||(n.Ra=function(e,r,s){const o=st(e);return o.ra(),new Wm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{e_:Zm.bind(null,n),n_:tp.bind(null,n),i_:ep.bind(null,n),j_:np.bind(null,n)}),n.Ia.push(async t=>{t?(n.Ra.O_(),_o(n)?yo(n):n.da.set("Unknown")):(await n.Ra.stop(),Hc(n))})),n.Ra}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new In,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,c=new vo(t,e,a,s,o);return c.start(r),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new z(M.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Gc(n,t){if(ze("AsyncQueue",`${t}: ${n}`),lr(n))return new z(M.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{static emptySet(t){return new Wn(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||G.comparator(e.key,r.key):(e,r)=>G.comparator(e.key,r.key),this.keyedMap=br(),this.sortedSet=new Ct(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Wn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Wn;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(){this.ma=new Ct(G.comparator)}track(t){const e=t.doc.key,r=this.ma.get(e);r?t.type!==0&&r.type===3?this.ma=this.ma.insert(e,t):t.type===3&&r.type!==1?this.ma=this.ma.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ma=this.ma.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ma=this.ma.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ma=this.ma.remove(e):t.type===1&&r.type===2?this.ma=this.ma.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ma=this.ma.insert(e,{type:2,doc:t.doc}):Q(63341,{Vt:t,fa:r}):this.ma=this.ma.insert(e,t)}ga(){const t=[];return this.ma.inorderTraversal((e,r)=>{t.push(r)}),t}}class rr{constructor(t,e,r,s,o,a,c,h,d){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach(c=>{a.push({type:0,doc:c})}),new rr(t,e,Wn.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Us(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(){this.pa=void 0,this.ya=[]}wa(){return this.ya.some(t=>t.Sa())}}class ip{constructor(){this.queries=al(),this.onlineState="Unknown",this.ba=new Set}terminate(){(function(e,r){const s=st(e),o=s.queries;s.queries=al(),o.forEach((a,c)=>{for(const h of c.ya)h.onError(r)})})(this,new z(M.ABORTED,"Firestore shutting down"))}}function al(){return new Vn(n=>vc(n),Us)}async function op(n,t){const e=st(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.wa()&&t.Sa()&&(r=2):(o=new sp,r=t.Sa()?0:1);try{switch(r){case 0:o.pa=await e.onListen(s,!0);break;case 1:o.pa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const c=Gc(a,`Initialization of query '${$n(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,o),o.ya.push(t),t.Da(e.onlineState),o.pa&&t.va(o.pa)&&Eo(e)}async function ap(n,t){const e=st(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.ya.indexOf(t);a>=0&&(o.ya.splice(a,1),o.ya.length===0?s=t.Sa()?0:1:!o.wa()&&t.Sa()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function lp(n,t){const e=st(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const c of a.ya)c.va(s)&&(r=!0);a.pa=s}}r&&Eo(e)}function cp(n,t,e){const r=st(n),s=r.queries.get(t);if(s)for(const o of s.ya)o.onError(e);r.queries.delete(t)}function Eo(n){n.ba.forEach(t=>{t.next()})}var $i,ll;(ll=$i||($i={})).Ca="default",ll.Cache="cache";class up{constructor(t,e,r){this.query=t,this.Fa=e,this.Ma=!1,this.xa=null,this.onlineState="Unknown",this.options=r||{}}va(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new rr(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Ma?this.Oa(t)&&(this.Fa.next(t),e=!0):this.Na(t,this.onlineState)&&(this.Ba(t),e=!0),this.xa=t,e}onError(t){this.Fa.error(t)}Da(t){this.onlineState=t;let e=!1;return this.xa&&!this.Ma&&this.Na(this.xa,t)&&(this.Ba(this.xa),e=!0),e}Na(t,e){if(!t.fromCache||!this.Sa())return!0;const r=e!=="Offline";return(!this.options.La||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Oa(t){if(t.docChanges.length>0)return!0;const e=this.xa&&this.xa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}Ba(t){t=rr.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Ma=!0,this.Fa.next(t)}Sa(){return this.options.source!==$i.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(t){this.key=t}}class Wc{constructor(t){this.key=t}}class hp{constructor(t,e){this.query=t,this.Ga=e,this.za=null,this.hasCachedResults=!1,this.current=!1,this.ja=ot(),this.mutatedKeys=ot(),this.Ha=Ec(t),this.Ja=new Wn(this.Ha)}get Ya(){return this.Ga}Za(t,e){const r=e?e.Xa:new ol,s=e?e.Ja:this.Ja;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,c=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,_)=>{const w=s.get(m),A=$s(this.query,_)?_:null,S=!!w&&this.mutatedKeys.has(w.key),V=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let P=!1;w&&A?w.data.isEqual(A.data)?S!==V&&(r.track({type:3,doc:A}),P=!0):this.eu(w,A)||(r.track({type:2,doc:A}),P=!0,(h&&this.Ha(A,h)>0||d&&this.Ha(A,d)<0)&&(c=!0)):!w&&A?(r.track({type:0,doc:A}),P=!0):w&&!A&&(r.track({type:1,doc:w}),P=!0,(h||d)&&(c=!0)),P&&(A?(a=a.add(A),o=V?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{Ja:a,Xa:r,Cs:c,mutatedKeys:o}}eu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.Ja;this.Ja=t.Ja,this.mutatedKeys=t.mutatedKeys;const a=t.Xa.ga();a.sort((m,_)=>function(A,S){const V=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Q(20277,{Vt:P})}};return V(A)-V(S)}(m.type,_.type)||this.Ha(m.doc,_.doc)),this.tu(r),s=s!=null&&s;const c=e&&!s?this.nu():[],h=this.ja.size===0&&this.current&&!s?1:0,d=h!==this.za;return this.za=h,a.length!==0||d?{snapshot:new rr(this.query,t.Ja,o,a,t.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),ru:c}:{ru:c}}Da(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ja:this.Ja,Xa:new ol,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{ru:[]}}iu(t){return!this.Ga.has(t)&&!!this.Ja.has(t)&&!this.Ja.get(t).hasLocalMutations}tu(t){t&&(t.addedDocuments.forEach(e=>this.Ga=this.Ga.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ga=this.Ga.delete(e)),this.current=t.current)}nu(){if(!this.current)return[];const t=this.ja;this.ja=ot(),this.Ja.forEach(r=>{this.iu(r.key)&&(this.ja=this.ja.add(r.key))});const e=[];return t.forEach(r=>{this.ja.has(r)||e.push(new Wc(r))}),this.ja.forEach(r=>{t.has(r)||e.push(new Kc(r))}),e}su(t){this.Ga=t.$s,this.ja=ot();const e=this.Za(t.documents);return this.applyChanges(e,!0)}ou(){return rr.fromInitialDocuments(this.query,this.Ja,this.mutatedKeys,this.za===0,this.hasCachedResults)}}const wo="SyncEngine";class dp{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class fp{constructor(t){this.key=t,this._u=!1}}class mp{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.au={},this.uu=new Vn(c=>vc(c),Us),this.cu=new Map,this.lu=new Set,this.hu=new Ct(G.comparator),this.Pu=new Map,this.Tu=new uo,this.Iu={},this.Eu=new Map,this.du=er.lr(),this.onlineState="Unknown",this.Au=void 0}get isPrimaryClient(){return this.Au===!0}}async function pp(n,t,e=!0){const r=Zc(n);let s;const o=r.uu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.ou()):s=await Qc(r,t,e,!0),s}async function gp(n,t){const e=Zc(n);await Qc(e,t,!0,!1)}async function Qc(n,t,e,r){const s=await jm(n.localStore,Re(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let c;return r&&(c=await yp(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&zc(n.remoteStore,s),c}async function yp(n,t,e,r,s){n.Ru=(_,w,A)=>async function(V,P,D,N){let O=P.view.Za(D);O.Cs&&(O=await Za(V.localStore,P.query,!1).then(({documents:v})=>P.view.Za(v,O)));const B=N&&N.targetChanges.get(P.targetId),q=N&&N.targetMismatches.get(P.targetId)!=null,X=P.view.applyChanges(O,V.isPrimaryClient,B,q);return ul(V,P.targetId,X.ru),X.snapshot}(n,_,w,A);const o=await Za(n.localStore,t,!0),a=new hp(t,o.$s),c=a.Za(o.documents),h=Ur.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),d=a.applyChanges(c,n.isPrimaryClient,h);ul(n,e,d.ru);const m=new dp(t,e,a);return n.uu.set(t,m),n.cu.has(e)?n.cu.get(e).push(t):n.cu.set(e,[t]),d.snapshot}async function _p(n,t,e){const r=st(n),s=r.uu.get(t),o=r.cu.get(s.targetId);if(o.length>1)return r.cu.set(s.targetId,o.filter(a=>!Us(a,t))),void r.uu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Bi(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&po(r.remoteStore,s.targetId),zi(r,s.targetId)}).catch(Ls)):(zi(r,s.targetId),await Bi(r.localStore,s.targetId,!0))}async function vp(n,t){const e=st(n),r=e.uu.get(t),s=e.cu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),po(e.remoteStore,r.targetId))}async function Xc(n,t){const e=st(n);try{const r=await Mm(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.Pu.get(o);a&&(Et(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a._u=!0:s.modifiedDocuments.size>0?Et(a._u,14607):s.removedDocuments.size>0&&(Et(a._u,42227),a._u=!1))}),await Jc(e,r,t)}catch(r){await Ls(r)}}function cl(n,t,e){const r=st(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.uu.forEach((o,a)=>{const c=a.view.Da(t);c.snapshot&&s.push(c.snapshot)}),function(a,c){const h=st(a);h.onlineState=c;let d=!1;h.queries.forEach((m,_)=>{for(const w of _.ya)w.Da(c)&&(d=!0)}),d&&Eo(h)}(r.eventManager,t),s.length&&r.au.j_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Ep(n,t,e){const r=st(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Pu.get(t),o=s&&s.key;if(o){let a=new Ct(G.comparator);a=a.insert(o,Kt.newNoDocument(o,W.min()));const c=ot().add(o),h=new Hs(W.min(),new Map,new Ct(J),a,c);await Xc(r,h),r.hu=r.hu.remove(o),r.Pu.delete(t),To(r)}else await Bi(r.localStore,t,!1).then(()=>zi(r,t,e)).catch(Ls)}function zi(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.cu.get(t))n.uu.delete(r),e&&n.au.Vu(r,e);n.cu.delete(t),n.isPrimaryClient&&n.Tu.Hr(t).forEach(r=>{n.Tu.containsKey(r)||Yc(n,r)})}function Yc(n,t){n.lu.delete(t.path.canonicalString());const e=n.hu.get(t);e!==null&&(po(n.remoteStore,e),n.hu=n.hu.remove(t),n.Pu.delete(e),To(n))}function ul(n,t,e){for(const r of e)r instanceof Kc?(n.Tu.addReference(r.key,t),wp(n,r)):r instanceof Wc?(j(wo,"Document no longer in limbo: "+r.key),n.Tu.removeReference(r.key,t),n.Tu.containsKey(r.key)||Yc(n,r.key)):Q(19791,{mu:r})}function wp(n,t){const e=t.key,r=e.path.canonicalString();n.hu.get(e)||n.lu.has(r)||(j(wo,"New document in limbo: "+e),n.lu.add(r),To(n))}function To(n){for(;n.lu.size>0&&n.hu.size<n.maxConcurrentLimboResolutions;){const t=n.lu.values().next().value;n.lu.delete(t);const e=new G(Rt.fromString(t)),r=n.du.next();n.Pu.set(r,new fp(e)),n.hu=n.hu.insert(e,r),zc(n.remoteStore,new Ze(Re(_c(e.path)),r,"TargetPurposeLimboResolution",Ms.le))}}async function Jc(n,t,e){const r=st(n),s=[],o=[],a=[];r.uu.isEmpty()||(r.uu.forEach((c,h)=>{a.push(r.Ru(h,t,e).then(d=>{var m;if((d||e)&&r.isPrimaryClient){const _=d?!d.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,_?"current":"not-current")}if(d){s.push(d);const _=fo.Rs(h.targetId,d);o.push(_)}}))}),await Promise.all(a),r.au.j_(s),await async function(h,d){const m=st(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>x.forEach(d,w=>x.forEach(w.ds,A=>m.persistence.referenceDelegate.addReference(_,w.targetId,A)).next(()=>x.forEach(w.As,A=>m.persistence.referenceDelegate.removeReference(_,w.targetId,A)))))}catch(_){if(!lr(_))throw _;j(mo,"Failed to update sequence numbers: "+_)}for(const _ of d){const w=_.targetId;if(!_.fromCache){const A=m.xs.get(w),S=A.snapshotVersion,V=A.withLastLimboFreeSnapshotVersion(S);m.xs=m.xs.insert(w,V)}}}(r.localStore,o))}async function Tp(n,t){const e=st(n);if(!e.currentUser.isEqual(t)){j(wo,"User change. New user:",t.toKey());const r=await jc(e.localStore,t);e.currentUser=t,function(o,a){o.Eu.forEach(c=>{c.forEach(h=>{h.reject(new z(M.CANCELLED,a))})}),o.Eu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Jc(e,r.ks)}}function Ap(n,t){const e=st(n),r=e.Pu.get(t);if(r&&r._u)return ot().add(r.key);{let s=ot();const o=e.cu.get(t);if(!o)return s;for(const a of o){const c=e.uu.get(a);s=s.unionWith(c.view.Ya)}return s}}function Zc(n){const t=st(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Xc.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ap.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Ep.bind(null,t),t.au.j_=lp.bind(null,t.eventManager),t.au.Vu=cp.bind(null,t.eventManager),t}class Ps{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Uc(t.databaseInfo.databaseId),this.sharedClientState=this.pu(t),this.persistence=this.yu(t),await this.persistence.start(),this.localStore=this.wu(t),this.gcScheduler=this.Su(t,this.localStore),this.indexBackfillerScheduler=this.bu(t,this.localStore)}Su(t,e){return null}bu(t,e){return null}wu(t){return Lm(this.persistence,new Nm,t.initialUser,this.serializer)}yu(t){return new Fc(ho.fi,this.serializer)}pu(t){return new Um}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ps.provider={build:()=>new Ps};class Ip extends Ps{constructor(t){super(),this.cacheSizeBytes=t}Su(t,e){Et(this.persistence.referenceDelegate instanceof xs,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new _m(r,t.asyncQueue,e)}yu(t){const e=this.cacheSizeBytes!==void 0?Xt.withCacheSize(this.cacheSizeBytes):Xt.DEFAULT;return new Fc(r=>xs.fi(r,e),this.serializer)}}class qi{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>cl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Tp.bind(null,this.syncEngine),await rp(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new ip}()}createDatastore(t){const e=Uc(t.databaseInfo.databaseId),r=function(o){return new Gm(o)}(t.databaseInfo);return function(o,a,c,h){return new Xm(o,a,c,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,a,c){return new Jm(r,s,o,a,c)}(this.localStore,this.datastore,t.asyncQueue,e=>cl(this.syncEngine,e,0),function(){return nl.C()?new nl:new $m}())}createSyncEngine(t,e){return function(s,o,a,c,h,d,m){const _=new mp(s,o,a,c,h,d);return m&&(_.Au=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=st(s);j(nr,"RemoteStore shutting down."),o.Ta.add(5),await $r(o),o.Ea.shutdown(),o.da.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}qi.provider={build:()=>new qi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.vu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.vu(this.observer.error,t):ze("Uncaught Error in snapshot listener:",t.toString()))}Cu(){this.muted=!0}vu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un="FirestoreClient";class Rp{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=Gt.UNAUTHENTICATED,this.clientId=Yd.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{j(un,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(j(un,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new In;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Gc(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function yi(n,t){n.asyncQueue.verifyOperationInProgress(),j(un,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await jc(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function hl(n,t){n.asyncQueue.verifyOperationInProgress();const e=await Sp(n);j(un,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>il(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>il(t.remoteStore,s)),n._onlineComponents=t}async function Sp(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){j(un,"Using user provided OfflineComponentProvider");try{await yi(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Yn("Error using user provided cache. Falling back to memory cache: "+e),await yi(n,new Ps)}}else j(un,"Using default OfflineComponentProvider"),await yi(n,new Ip(void 0));return n._offlineComponents}async function Cp(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(j(un,"Using user provided OnlineComponentProvider"),await hl(n,n._uninitializedComponentsProvider._online)):(j(un,"Using default OnlineComponentProvider"),await hl(n,new qi))),n._onlineComponents}async function xp(n){const t=await Cp(n),e=t.eventManager;return e.onListen=pp.bind(null,t.syncEngine),e.onUnlisten=_p.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=gp.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=vp.bind(null,t.syncEngine),e}function Pp(n,t,e={}){const r=new In;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,c,h,d){const m=new bp({next:w=>{m.Cu(),a.enqueueAndForget(()=>ap(o,_)),w.fromCache&&h.source==="server"?d.reject(new z(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(w)},error:w=>d.reject(w)}),_=new up(c,m,{includeMetadataChanges:!0,La:!0});return op(o,_)}(await xp(n),n.asyncQueue,t,e,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vp(n,t,e){if(!e)throw new z(M.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Dp(n,t,e,r){if(t===!0&&r===!0)throw new z(M.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function fl(n){if(G.isDocumentKey(n))throw new z(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Np(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":Q(12329,{type:typeof n})}function Hi(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new z(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Np(n);throw new z(M.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu="firestore.googleapis.com",ml=!0;class pl{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new z(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=eu,this.ssl=ml}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:ml;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Mc;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<gm)throw new z(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Dp("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=tu((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Ao{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new pl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new z(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new z(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new pl(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new qd;switch(r.type){case"firstParty":return new Wd(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new z(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=dl.get(e);r&&(j("ComponentProvider","Removing Datastore"),dl.delete(e),r.terminate())}(this),Promise.resolve()}}function kp(n,t,e,r={}){var s;n=Hi(n,Ao);const o=to(t),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${t}:${e}`;o&&(_h(`https://${h}`),Th("Firestore",!0)),a.host!==eu&&a.host!==h&&Yn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:r});if(!ws(d,c)&&(n._setSettings(d),r.mockUserToken)){let m,_;if(typeof r.mockUserToken=="string")m=r.mockUserToken,_=Gt.MOCK_USER;else{m=vh(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const w=r.mockUserToken.sub||r.mockUserToken.user_id;if(!w)throw new z(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new Gt(w)}n._authCredentials=new Hd(new rc(m,_))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Ks(this.firestore,t,this._query)}}class ur{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Qn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ur(this.firestore,t,this._key)}}class Qn extends Ks{constructor(t,e,r){super(t,e,_c(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ur(this.firestore,null,new G(t))}withConverter(t){return new Qn(this.firestore,t,this._path)}}function Op(n,t,...e){if(n=Vh(n),Vp("collection","path",t),n instanceof Ao){const r=Rt.fromString(t,...e);return fl(r),new Qn(n,null,r)}{if(!(n instanceof ur||n instanceof Qn))throw new z(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Rt.fromString(t,...e));return fl(r),new Qn(n.firestore,null,r)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gl="AsyncQueue";class yl{constructor(t=Promise.resolve()){this.zu=[],this.ju=!1,this.Hu=[],this.Ju=null,this.Yu=!1,this.Zu=!1,this.Xu=[],this.C_=new $c(this,"async_queue_retry"),this.ec=()=>{const r=gi();r&&j(gl,"Visibility state changed to "+r.visibilityState),this.C_.p_()},this.tc=t;const e=gi();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.ec)}get isShuttingDown(){return this.ju}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.nc(),this.rc(t)}enterRestrictedMode(t){if(!this.ju){this.ju=!0,this.Zu=t||!1;const e=gi();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.ec)}}enqueue(t){if(this.nc(),this.ju)return new Promise(()=>{});const e=new In;return this.rc(()=>this.ju&&this.Zu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.zu.push(t),this.sc()))}async sc(){if(this.zu.length!==0){try{await this.zu[0](),this.zu.shift(),this.C_.reset()}catch(t){if(!lr(t))throw t;j(gl,"Operation failed with retryable error: "+t)}this.zu.length>0&&this.C_.f_(()=>this.sc())}}rc(t){const e=this.tc.then(()=>(this.Yu=!0,t().catch(r=>{throw this.Ju=r,this.Yu=!1,ze("INTERNAL UNHANDLED ERROR: ",_l(r)),r}).then(r=>(this.Yu=!1,r))));return this.tc=e,e}enqueueAfterDelay(t,e,r){this.nc(),this.Xu.indexOf(t)>-1&&(e=0);const s=vo.createAndSchedule(this,t,e,r,o=>this.oc(o));return this.Hu.push(s),s}nc(){this.Ju&&Q(47125,{_c:_l(this.Ju)})}verifyOperationInProgress(){}async ac(){let t;do t=this.tc,await t;while(t!==this.tc)}uc(t){for(const e of this.Hu)if(e.timerId===t)return!0;return!1}cc(t){return this.ac().then(()=>{this.Hu.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.Hu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.ac()})}lc(t){this.Xu.push(t)}oc(t){const e=this.Hu.indexOf(t);this.Hu.splice(e,1)}}function _l(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class nu extends Ao{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new yl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new yl(t),this._firestoreClient=void 0,await t}}}function Lp(n,t){const e=typeof n=="object"?n:Nd(),r=typeof n=="string"?n:t||Is,s=Cd(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=gh("firestore");o&&kp(s,...o)}return s}function Mp(n){if(n._terminated)throw new z(M.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Fp(n),n._firestoreClient}function Fp(n){var t,e,r;const s=n._freezeSettings(),o=function(c,h,d,m){return new df(c,h,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,tu(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new Rp(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Vs(Bt.fromBase64String(t))}catch(e){throw new z(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Vs(Bt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new z(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Wt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new z(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new z(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return J(this._lat,t._lat)||J(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}}const Up=new RegExp("[~\\*/\\[\\]]");function $p(n,t,e){if(t.search(Up)>=0)throw vl(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new ru(...t.split("."))._internalPath}catch{throw vl(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function vl(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new z(M.INVALID_ARGUMENT,c+n+h)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new ur(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new zp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(iu("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class zp extends su{data(){return super.data()}}function iu(n,t){return typeof t=="string"?$p(n,t):t instanceof ru?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qp(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new z(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Hp{convertValue(t,e="none"){switch(ln(t)){case 0:return null;case 1:return t.booleanValue;case 2:return St(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(an(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw Q(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Br(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,s;const o=(s=(r=(e=t.fields)===null||e===void 0?void 0:e[Pi].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>St(a.doubleValue));return new Bp(o)}convertGeoPoint(t){return new jp(St(t.latitude),St(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=js(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Lr(t));default:return null}}convertTimestamp(t){const e=on(t);return new Jt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=Rt.fromString(t);Et(Lc(r),9688,{name:t});const s=new Mr(r.get(1),r.get(3)),o=new G(r.popFirst(5));return s.isEqual(e)||ze(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Gp extends su{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new vs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(iu("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}}class vs extends Gp{data(t={}){return super.data(t)}}class Kp{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new us(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new vs(this._firestore,this._userDataWriter,r.key,r,new us(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new z(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const h=new vs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new us(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const h=new vs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new us(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),m=a.indexOf(c.doc.key)),{type:Wp(c.type),doc:h,oldIndex:d,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Wp(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Q(61501,{type:n})}}class Qp extends Hp{constructor(t){super(),this.firestore=t}convertBytes(t){return new Vs(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ur(this.firestore,null,e)}}function Xp(n){n=Hi(n,Ks);const t=Hi(n.firestore,nu),e=Mp(t),r=new Qp(t);return qp(n._query),Pp(e,n._query).then(s=>new Kp(t,r,n,s))}(function(t,e=!0){(function(s){ar=s})(Dd),As(new Nr("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),c=new nu(new Gd(r.getProvider("auth-internal")),new Qd(a,r.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new z(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Mr(d.options.projectId,m)}(a,s),a);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),Gn(Aa,Ia,t),Gn(Aa,Ia,"esm2017")})();var Yp="firebase",Jp="11.8.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Gn(Yp,Jp,"app");const Zp={apiKey:"AIzaSyDmMESGx7yA5iNPkf-BdefeECU3OGLG5W0",authDomain:"portfolio-71e69.firebaseapp.com",projectId:"portfolio-71e69",storageBucket:"portfolio-71e69.appspot.com",messagingSenderId:"300875366651",appId:"1:300875366651:web:0662ab4ed27a55929a705e",measurementId:"G-ZHF7NCN4YW"},tg=Kl(Zp),eg=Lp(tg),El=({Projects:n})=>{const[t,e]=k.useState([]);return k.useEffect(()=>{(async()=>{const s=Op(eg,n?"experience":"projects"),a=(await Xp(s)).docs.map(c=>c.data());e(a)})()},[n]),C.jsx("div",{className:"flex flex-col justify-center items-center",children:t.map((r,s)=>C.jsx(ih,{title:r.title,subTitle:r.subTitle,imageLink:r.imageLink,imageAlt:r.imageAlt,blurb:r.blurb,extLink:r.extLink,startDate:r.startDate},s))})};function ng(){return C.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 496 512",children:C.jsx("path",{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"})})}function rg(){return C.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:C.jsx("path",{d:"M35.19 171.1C-11.72 217.1-11.72 294 35.19 340.9L171.1 476.8C217.1 523.7 294 523.7 340.9 476.8L476.8 340.9C523.7 294 523.7 217.1 476.8 171.1L340.9 35.19C294-11.72 217.1-11.72 171.1 35.19L35.19 171.1zM315.5 315.5C282.6 348.3 229.4 348.3 196.6 315.5C163.7 282.6 163.7 229.4 196.6 196.6C229.4 163.7 282.6 163.7 315.5 196.6C348.3 229.4 348.3 282.6 315.5 315.5z"})})}function sg(){return C.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",children:C.jsx("path",{d:"M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"})})}function ig(){return C.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:C.jsx("path",{d:"M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zm-16-88c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"})})}const sr=Math.min,Rn=Math.max,Ds=Math.round,hs=Math.floor,Se=n=>({x:n,y:n}),og={left:"right",right:"left",bottom:"top",top:"bottom"},ag={start:"end",end:"start"};function Gi(n,t,e){return Rn(n,sr(t,e))}function qr(n,t){return typeof n=="function"?n(t):n}function xn(n){return n.split("-")[0]}function Hr(n){return n.split("-")[1]}function ou(n){return n==="x"?"y":"x"}function Io(n){return n==="y"?"height":"width"}function Sn(n){return["top","bottom"].includes(xn(n))?"y":"x"}function bo(n){return ou(Sn(n))}function lg(n,t,e){e===void 0&&(e=!1);const r=Hr(n),s=bo(n),o=Io(s);let a=s==="x"?r===(e?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[o]>t.floating[o]&&(a=Ns(a)),[a,Ns(a)]}function cg(n){const t=Ns(n);return[Ki(n),t,Ki(t)]}function Ki(n){return n.replace(/start|end/g,t=>ag[t])}function ug(n,t,e){const r=["left","right"],s=["right","left"],o=["top","bottom"],a=["bottom","top"];switch(n){case"top":case"bottom":return e?t?s:r:t?r:s;case"left":case"right":return t?o:a;default:return[]}}function hg(n,t,e,r){const s=Hr(n);let o=ug(xn(n),e==="start",r);return s&&(o=o.map(a=>a+"-"+s),t&&(o=o.concat(o.map(Ki)))),o}function Ns(n){return n.replace(/left|right|bottom|top/g,t=>og[t])}function dg(n){return{top:0,right:0,bottom:0,left:0,...n}}function au(n){return typeof n!="number"?dg(n):{top:n,right:n,bottom:n,left:n}}function ks(n){const{x:t,y:e,width:r,height:s}=n;return{width:r,height:s,top:e,left:t,right:t+r,bottom:e+s,x:t,y:e}}function wl(n,t,e){let{reference:r,floating:s}=n;const o=Sn(t),a=bo(t),c=Io(a),h=xn(t),d=o==="y",m=r.x+r.width/2-s.width/2,_=r.y+r.height/2-s.height/2,w=r[c]/2-s[c]/2;let A;switch(h){case"top":A={x:m,y:r.y-s.height};break;case"bottom":A={x:m,y:r.y+r.height};break;case"right":A={x:r.x+r.width,y:_};break;case"left":A={x:r.x-s.width,y:_};break;default:A={x:r.x,y:r.y}}switch(Hr(t)){case"start":A[a]-=w*(e&&d?-1:1);break;case"end":A[a]+=w*(e&&d?-1:1);break}return A}const fg=async(n,t,e)=>{const{placement:r="bottom",strategy:s="absolute",middleware:o=[],platform:a}=e,c=o.filter(Boolean),h=await(a.isRTL==null?void 0:a.isRTL(t));let d=await a.getElementRects({reference:n,floating:t,strategy:s}),{x:m,y:_}=wl(d,r,h),w=r,A={},S=0;for(let V=0;V<c.length;V++){const{name:P,fn:D}=c[V],{x:N,y:O,data:B,reset:q}=await D({x:m,y:_,initialPlacement:r,placement:w,strategy:s,middlewareData:A,rects:d,platform:a,elements:{reference:n,floating:t}});m=N??m,_=O??_,A={...A,[P]:{...A[P],...B}},q&&S<=50&&(S++,typeof q=="object"&&(q.placement&&(w=q.placement),q.rects&&(d=q.rects===!0?await a.getElementRects({reference:n,floating:t,strategy:s}):q.rects),{x:m,y:_}=wl(d,w,h)),V=-1)}return{x:m,y:_,placement:w,strategy:s,middlewareData:A}};async function lu(n,t){var e;t===void 0&&(t={});const{x:r,y:s,platform:o,rects:a,elements:c,strategy:h}=n,{boundary:d="clippingAncestors",rootBoundary:m="viewport",elementContext:_="floating",altBoundary:w=!1,padding:A=0}=qr(t,n),S=au(A),P=c[w?_==="floating"?"reference":"floating":_],D=ks(await o.getClippingRect({element:(e=await(o.isElement==null?void 0:o.isElement(P)))==null||e?P:P.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(c.floating)),boundary:d,rootBoundary:m,strategy:h})),N=_==="floating"?{x:r,y:s,width:a.floating.width,height:a.floating.height}:a.reference,O=await(o.getOffsetParent==null?void 0:o.getOffsetParent(c.floating)),B=await(o.isElement==null?void 0:o.isElement(O))?await(o.getScale==null?void 0:o.getScale(O))||{x:1,y:1}:{x:1,y:1},q=ks(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:N,offsetParent:O,strategy:h}):N);return{top:(D.top-q.top+S.top)/B.y,bottom:(q.bottom-D.bottom+S.bottom)/B.y,left:(D.left-q.left+S.left)/B.x,right:(q.right-D.right+S.right)/B.x}}const mg=n=>({name:"arrow",options:n,async fn(t){const{x:e,y:r,placement:s,rects:o,platform:a,elements:c,middlewareData:h}=t,{element:d,padding:m=0}=qr(n,t)||{};if(d==null)return{};const _=au(m),w={x:e,y:r},A=bo(s),S=Io(A),V=await a.getDimensions(d),P=A==="y",D=P?"top":"left",N=P?"bottom":"right",O=P?"clientHeight":"clientWidth",B=o.reference[S]+o.reference[A]-w[A]-o.floating[S],q=w[A]-o.reference[A],X=await(a.getOffsetParent==null?void 0:a.getOffsetParent(d));let v=X?X[O]:0;(!v||!await(a.isElement==null?void 0:a.isElement(X)))&&(v=c.floating[O]||o.floating[S]);const p=B/2-q/2,y=v/2-V[S]/2-1,E=sr(_[D],y),T=sr(_[N],y),I=E,g=v-V[S]-T,Z=v/2-V[S]/2+p,lt=Gi(I,Z,g),xt=!h.arrow&&Hr(s)!=null&&Z!==lt&&o.reference[S]/2-(Z<I?E:T)-V[S]/2<0,dt=xt?Z<I?Z-I:Z-g:0;return{[A]:w[A]+dt,data:{[A]:lt,centerOffset:Z-lt-dt,...xt&&{alignmentOffset:dt}},reset:xt}}}),pg=function(n){return n===void 0&&(n={}),{name:"flip",options:n,async fn(t){var e,r;const{placement:s,middlewareData:o,rects:a,initialPlacement:c,platform:h,elements:d}=t,{mainAxis:m=!0,crossAxis:_=!0,fallbackPlacements:w,fallbackStrategy:A="bestFit",fallbackAxisSideDirection:S="none",flipAlignment:V=!0,...P}=qr(n,t);if((e=o.arrow)!=null&&e.alignmentOffset)return{};const D=xn(s),N=Sn(c),O=xn(c)===c,B=await(h.isRTL==null?void 0:h.isRTL(d.floating)),q=w||(O||!V?[Ns(c)]:cg(c)),X=S!=="none";!w&&X&&q.push(...hg(c,V,S,B));const v=[c,...q],p=await lu(t,P),y=[];let E=((r=o.flip)==null?void 0:r.overflows)||[];if(m&&y.push(p[D]),_){const lt=lg(s,a,B);y.push(p[lt[0]],p[lt[1]])}if(E=[...E,{placement:s,overflows:y}],!y.every(lt=>lt<=0)){var T,I;const lt=(((T=o.flip)==null?void 0:T.index)||0)+1,xt=v[lt];if(xt){var g;const ct=_==="alignment"?N!==Sn(xt):!1,yt=((g=E[0])==null?void 0:g.overflows[0])>0;if(!ct||yt)return{data:{index:lt,overflows:E},reset:{placement:xt}}}let dt=(I=E.filter(ct=>ct.overflows[0]<=0).sort((ct,yt)=>ct.overflows[1]-yt.overflows[1])[0])==null?void 0:I.placement;if(!dt)switch(A){case"bestFit":{var Z;const ct=(Z=E.filter(yt=>{if(X){const H=Sn(yt.placement);return H===N||H==="y"}return!0}).map(yt=>[yt.placement,yt.overflows.filter(H=>H>0).reduce((H,tt)=>H+tt,0)]).sort((yt,H)=>yt[1]-H[1])[0])==null?void 0:Z[0];ct&&(dt=ct);break}case"initialPlacement":dt=c;break}if(s!==dt)return{reset:{placement:dt}}}return{}}}};async function gg(n,t){const{placement:e,platform:r,elements:s}=n,o=await(r.isRTL==null?void 0:r.isRTL(s.floating)),a=xn(e),c=Hr(e),h=Sn(e)==="y",d=["left","top"].includes(a)?-1:1,m=o&&h?-1:1,_=qr(t,n);let{mainAxis:w,crossAxis:A,alignmentAxis:S}=typeof _=="number"?{mainAxis:_,crossAxis:0,alignmentAxis:null}:{mainAxis:_.mainAxis||0,crossAxis:_.crossAxis||0,alignmentAxis:_.alignmentAxis};return c&&typeof S=="number"&&(A=c==="end"?S*-1:S),h?{x:A*m,y:w*d}:{x:w*d,y:A*m}}const yg=function(n){return n===void 0&&(n=0),{name:"offset",options:n,async fn(t){var e,r;const{x:s,y:o,placement:a,middlewareData:c}=t,h=await gg(t,n);return a===((e=c.offset)==null?void 0:e.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:s+h.x,y:o+h.y,data:{...h,placement:a}}}}},_g=function(n){return n===void 0&&(n={}),{name:"shift",options:n,async fn(t){const{x:e,y:r,placement:s}=t,{mainAxis:o=!0,crossAxis:a=!1,limiter:c={fn:P=>{let{x:D,y:N}=P;return{x:D,y:N}}},...h}=qr(n,t),d={x:e,y:r},m=await lu(t,h),_=Sn(xn(s)),w=ou(_);let A=d[w],S=d[_];if(o){const P=w==="y"?"top":"left",D=w==="y"?"bottom":"right",N=A+m[P],O=A-m[D];A=Gi(N,A,O)}if(a){const P=_==="y"?"top":"left",D=_==="y"?"bottom":"right",N=S+m[P],O=S-m[D];S=Gi(N,S,O)}const V=c.fn({...t,[w]:A,[_]:S});return{...V,data:{x:V.x-e,y:V.y-r,enabled:{[w]:o,[_]:a}}}}}};function Ws(){return typeof window<"u"}function hr(n){return cu(n)?(n.nodeName||"").toLowerCase():"#document"}function re(n){var t;return(n==null||(t=n.ownerDocument)==null?void 0:t.defaultView)||window}function Ve(n){var t;return(t=(cu(n)?n.ownerDocument:n.document)||window.document)==null?void 0:t.documentElement}function cu(n){return Ws()?n instanceof Node||n instanceof re(n).Node:!1}function ye(n){return Ws()?n instanceof Element||n instanceof re(n).Element:!1}function Pe(n){return Ws()?n instanceof HTMLElement||n instanceof re(n).HTMLElement:!1}function Tl(n){return!Ws()||typeof ShadowRoot>"u"?!1:n instanceof ShadowRoot||n instanceof re(n).ShadowRoot}function Gr(n){const{overflow:t,overflowX:e,overflowY:r,display:s}=_e(n);return/auto|scroll|overlay|hidden|clip/.test(t+r+e)&&!["inline","contents"].includes(s)}function vg(n){return["table","td","th"].includes(hr(n))}function Qs(n){return[":popover-open",":modal"].some(t=>{try{return n.matches(t)}catch{return!1}})}function Ro(n){const t=So(),e=ye(n)?_e(n):n;return["transform","translate","scale","rotate","perspective"].some(r=>e[r]?e[r]!=="none":!1)||(e.containerType?e.containerType!=="normal":!1)||!t&&(e.backdropFilter?e.backdropFilter!=="none":!1)||!t&&(e.filter?e.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(r=>(e.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(e.contain||"").includes(r))}function Eg(n){let t=hn(n);for(;Pe(t)&&!ir(t);){if(Ro(t))return t;if(Qs(t))return null;t=hn(t)}return null}function So(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function ir(n){return["html","body","#document"].includes(hr(n))}function _e(n){return re(n).getComputedStyle(n)}function Xs(n){return ye(n)?{scrollLeft:n.scrollLeft,scrollTop:n.scrollTop}:{scrollLeft:n.scrollX,scrollTop:n.scrollY}}function hn(n){if(hr(n)==="html")return n;const t=n.assignedSlot||n.parentNode||Tl(n)&&n.host||Ve(n);return Tl(t)?t.host:t}function uu(n){const t=hn(n);return ir(t)?n.ownerDocument?n.ownerDocument.body:n.body:Pe(t)&&Gr(t)?t:uu(t)}function jr(n,t,e){var r;t===void 0&&(t=[]),e===void 0&&(e=!0);const s=uu(n),o=s===((r=n.ownerDocument)==null?void 0:r.body),a=re(s);if(o){const c=Wi(a);return t.concat(a,a.visualViewport||[],Gr(s)?s:[],c&&e?jr(c):[])}return t.concat(s,jr(s,[],e))}function Wi(n){return n.parent&&Object.getPrototypeOf(n.parent)?n.frameElement:null}function hu(n){const t=_e(n);let e=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const s=Pe(n),o=s?n.offsetWidth:e,a=s?n.offsetHeight:r,c=Ds(e)!==o||Ds(r)!==a;return c&&(e=o,r=a),{width:e,height:r,$:c}}function Co(n){return ye(n)?n:n.contextElement}function Xn(n){const t=Co(n);if(!Pe(t))return Se(1);const e=t.getBoundingClientRect(),{width:r,height:s,$:o}=hu(t);let a=(o?Ds(e.width):e.width)/r,c=(o?Ds(e.height):e.height)/s;return(!a||!Number.isFinite(a))&&(a=1),(!c||!Number.isFinite(c))&&(c=1),{x:a,y:c}}const wg=Se(0);function du(n){const t=re(n);return!So()||!t.visualViewport?wg:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Tg(n,t,e){return t===void 0&&(t=!1),!e||t&&e!==re(n)?!1:t}function Pn(n,t,e,r){t===void 0&&(t=!1),e===void 0&&(e=!1);const s=n.getBoundingClientRect(),o=Co(n);let a=Se(1);t&&(r?ye(r)&&(a=Xn(r)):a=Xn(n));const c=Tg(o,e,r)?du(o):Se(0);let h=(s.left+c.x)/a.x,d=(s.top+c.y)/a.y,m=s.width/a.x,_=s.height/a.y;if(o){const w=re(o),A=r&&ye(r)?re(r):r;let S=w,V=Wi(S);for(;V&&r&&A!==S;){const P=Xn(V),D=V.getBoundingClientRect(),N=_e(V),O=D.left+(V.clientLeft+parseFloat(N.paddingLeft))*P.x,B=D.top+(V.clientTop+parseFloat(N.paddingTop))*P.y;h*=P.x,d*=P.y,m*=P.x,_*=P.y,h+=O,d+=B,S=re(V),V=Wi(S)}}return ks({width:m,height:_,x:h,y:d})}function xo(n,t){const e=Xs(n).scrollLeft;return t?t.left+e:Pn(Ve(n)).left+e}function fu(n,t,e){e===void 0&&(e=!1);const r=n.getBoundingClientRect(),s=r.left+t.scrollLeft-(e?0:xo(n,r)),o=r.top+t.scrollTop;return{x:s,y:o}}function Ag(n){let{elements:t,rect:e,offsetParent:r,strategy:s}=n;const o=s==="fixed",a=Ve(r),c=t?Qs(t.floating):!1;if(r===a||c&&o)return e;let h={scrollLeft:0,scrollTop:0},d=Se(1);const m=Se(0),_=Pe(r);if((_||!_&&!o)&&((hr(r)!=="body"||Gr(a))&&(h=Xs(r)),Pe(r))){const A=Pn(r);d=Xn(r),m.x=A.x+r.clientLeft,m.y=A.y+r.clientTop}const w=a&&!_&&!o?fu(a,h,!0):Se(0);return{width:e.width*d.x,height:e.height*d.y,x:e.x*d.x-h.scrollLeft*d.x+m.x+w.x,y:e.y*d.y-h.scrollTop*d.y+m.y+w.y}}function Ig(n){return Array.from(n.getClientRects())}function bg(n){const t=Ve(n),e=Xs(n),r=n.ownerDocument.body,s=Rn(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),o=Rn(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let a=-e.scrollLeft+xo(n);const c=-e.scrollTop;return _e(r).direction==="rtl"&&(a+=Rn(t.clientWidth,r.clientWidth)-s),{width:s,height:o,x:a,y:c}}function Rg(n,t){const e=re(n),r=Ve(n),s=e.visualViewport;let o=r.clientWidth,a=r.clientHeight,c=0,h=0;if(s){o=s.width,a=s.height;const d=So();(!d||d&&t==="fixed")&&(c=s.offsetLeft,h=s.offsetTop)}return{width:o,height:a,x:c,y:h}}function Sg(n,t){const e=Pn(n,!0,t==="fixed"),r=e.top+n.clientTop,s=e.left+n.clientLeft,o=Pe(n)?Xn(n):Se(1),a=n.clientWidth*o.x,c=n.clientHeight*o.y,h=s*o.x,d=r*o.y;return{width:a,height:c,x:h,y:d}}function Al(n,t,e){let r;if(t==="viewport")r=Rg(n,e);else if(t==="document")r=bg(Ve(n));else if(ye(t))r=Sg(t,e);else{const s=du(n);r={x:t.x-s.x,y:t.y-s.y,width:t.width,height:t.height}}return ks(r)}function mu(n,t){const e=hn(n);return e===t||!ye(e)||ir(e)?!1:_e(e).position==="fixed"||mu(e,t)}function Cg(n,t){const e=t.get(n);if(e)return e;let r=jr(n,[],!1).filter(c=>ye(c)&&hr(c)!=="body"),s=null;const o=_e(n).position==="fixed";let a=o?hn(n):n;for(;ye(a)&&!ir(a);){const c=_e(a),h=Ro(a);!h&&c.position==="fixed"&&(s=null),(o?!h&&!s:!h&&c.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||Gr(a)&&!h&&mu(n,a))?r=r.filter(m=>m!==a):s=c,a=hn(a)}return t.set(n,r),r}function xg(n){let{element:t,boundary:e,rootBoundary:r,strategy:s}=n;const a=[...e==="clippingAncestors"?Qs(t)?[]:Cg(t,this._c):[].concat(e),r],c=a[0],h=a.reduce((d,m)=>{const _=Al(t,m,s);return d.top=Rn(_.top,d.top),d.right=sr(_.right,d.right),d.bottom=sr(_.bottom,d.bottom),d.left=Rn(_.left,d.left),d},Al(t,c,s));return{width:h.right-h.left,height:h.bottom-h.top,x:h.left,y:h.top}}function Pg(n){const{width:t,height:e}=hu(n);return{width:t,height:e}}function Vg(n,t,e){const r=Pe(t),s=Ve(t),o=e==="fixed",a=Pn(n,!0,o,t);let c={scrollLeft:0,scrollTop:0};const h=Se(0);function d(){h.x=xo(s)}if(r||!r&&!o)if((hr(t)!=="body"||Gr(s))&&(c=Xs(t)),r){const A=Pn(t,!0,o,t);h.x=A.x+t.clientLeft,h.y=A.y+t.clientTop}else s&&d();o&&!r&&s&&d();const m=s&&!r&&!o?fu(s,c):Se(0),_=a.left+c.scrollLeft-h.x-m.x,w=a.top+c.scrollTop-h.y-m.y;return{x:_,y:w,width:a.width,height:a.height}}function _i(n){return _e(n).position==="static"}function Il(n,t){if(!Pe(n)||_e(n).position==="fixed")return null;if(t)return t(n);let e=n.offsetParent;return Ve(n)===e&&(e=e.ownerDocument.body),e}function pu(n,t){const e=re(n);if(Qs(n))return e;if(!Pe(n)){let s=hn(n);for(;s&&!ir(s);){if(ye(s)&&!_i(s))return s;s=hn(s)}return e}let r=Il(n,t);for(;r&&vg(r)&&_i(r);)r=Il(r,t);return r&&ir(r)&&_i(r)&&!Ro(r)?e:r||Eg(n)||e}const Dg=async function(n){const t=this.getOffsetParent||pu,e=this.getDimensions,r=await e(n.floating);return{reference:Vg(n.reference,await t(n.floating),n.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Ng(n){return _e(n).direction==="rtl"}const kg={convertOffsetParentRelativeRectToViewportRelativeRect:Ag,getDocumentElement:Ve,getClippingRect:xg,getOffsetParent:pu,getElementRects:Dg,getClientRects:Ig,getDimensions:Pg,getScale:Xn,isElement:ye,isRTL:Ng};function gu(n,t){return n.x===t.x&&n.y===t.y&&n.width===t.width&&n.height===t.height}function Og(n,t){let e=null,r;const s=Ve(n);function o(){var c;clearTimeout(r),(c=e)==null||c.disconnect(),e=null}function a(c,h){c===void 0&&(c=!1),h===void 0&&(h=1),o();const d=n.getBoundingClientRect(),{left:m,top:_,width:w,height:A}=d;if(c||t(),!w||!A)return;const S=hs(_),V=hs(s.clientWidth-(m+w)),P=hs(s.clientHeight-(_+A)),D=hs(m),O={rootMargin:-S+"px "+-V+"px "+-P+"px "+-D+"px",threshold:Rn(0,sr(1,h))||1};let B=!0;function q(X){const v=X[0].intersectionRatio;if(v!==h){if(!B)return a();v?a(!1,v):r=setTimeout(()=>{a(!1,1e-7)},1e3)}v===1&&!gu(d,n.getBoundingClientRect())&&a(),B=!1}try{e=new IntersectionObserver(q,{...O,root:s.ownerDocument})}catch{e=new IntersectionObserver(q,O)}e.observe(n)}return a(!0),o}function Lg(n,t,e,r){r===void 0&&(r={});const{ancestorScroll:s=!0,ancestorResize:o=!0,elementResize:a=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:h=!1}=r,d=Co(n),m=s||o?[...d?jr(d):[],...jr(t)]:[];m.forEach(D=>{s&&D.addEventListener("scroll",e,{passive:!0}),o&&D.addEventListener("resize",e)});const _=d&&c?Og(d,e):null;let w=-1,A=null;a&&(A=new ResizeObserver(D=>{let[N]=D;N&&N.target===d&&A&&(A.unobserve(t),cancelAnimationFrame(w),w=requestAnimationFrame(()=>{var O;(O=A)==null||O.observe(t)})),e()}),d&&!h&&A.observe(d),A.observe(t));let S,V=h?Pn(n):null;h&&P();function P(){const D=Pn(n);V&&!gu(V,D)&&e(),V=D,S=requestAnimationFrame(P)}return e(),()=>{var D;m.forEach(N=>{s&&N.removeEventListener("scroll",e),o&&N.removeEventListener("resize",e)}),_==null||_(),(D=A)==null||D.disconnect(),A=null,h&&cancelAnimationFrame(S)}}const Mg=yg,Fg=_g,jg=pg,Bg=mg,bl=(n,t,e)=>{const r=new Map,s={platform:kg,...e},o={...s.platform,_c:r};return fg(n,t,{...s,platform:o})};var yu={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(n){(function(){var t={}.hasOwnProperty;function e(){for(var o="",a=0;a<arguments.length;a++){var c=arguments[a];c&&(o=s(o,r(c)))}return o}function r(o){if(typeof o=="string"||typeof o=="number")return o;if(typeof o!="object")return"";if(Array.isArray(o))return e.apply(null,o);if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]"))return o.toString();var a="";for(var c in o)t.call(o,c)&&o[c]&&(a=s(a,c));return a}function s(o,a){return a?o?o+" "+a:o+a:o}n.exports?(e.default=e,n.exports=e):window.classNames=e})()})(yu);var Ug=yu.exports;const Qi=zu(Ug);/*
* React Tooltip
* {@link https://github.com/ReactTooltip/react-tooltip}
* @copyright ReactTooltip Team
* @license MIT
*/const $g="react-tooltip-core-styles",zg="react-tooltip-base-styles",Rl={core:!1,base:!1};function Sl({css:n,id:t=zg,type:e="base",ref:r}){var s,o;if(!n||typeof document>"u"||Rl[e]||e==="core"&&typeof process<"u"&&(!((s=process==null?void 0:process.env)===null||s===void 0)&&s.REACT_TOOLTIP_DISABLE_CORE_STYLES)||e!=="base"&&typeof process<"u"&&(!((o=process==null?void 0:process.env)===null||o===void 0)&&o.REACT_TOOLTIP_DISABLE_BASE_STYLES))return;e==="core"&&(t=$g),r||(r={});const{insertAt:a}=r;if(document.getElementById(t))return;const c=document.head||document.getElementsByTagName("head")[0],h=document.createElement("style");h.id=t,h.type="text/css",a==="top"&&c.firstChild?c.insertBefore(h,c.firstChild):c.appendChild(h),h.styleSheet?h.styleSheet.cssText=n:h.appendChild(document.createTextNode(n)),Rl[e]=!0}const Cl=async({elementReference:n=null,tooltipReference:t=null,tooltipArrowReference:e=null,place:r="top",offset:s=10,strategy:o="absolute",middlewares:a=[Mg(Number(s)),jg({fallbackAxisSideDirection:"start"}),Fg({padding:5})],border:c})=>{if(!n)return{tooltipStyles:{},tooltipArrowStyles:{},place:r};if(t===null)return{tooltipStyles:{},tooltipArrowStyles:{},place:r};const h=a;return e?(h.push(Bg({element:e,padding:5})),bl(n,t,{placement:r,strategy:o,middleware:h}).then(({x:d,y:m,placement:_,middlewareData:w})=>{var A,S;const V={left:`${d}px`,top:`${m}px`,border:c},{x:P,y:D}=(A=w.arrow)!==null&&A!==void 0?A:{x:0,y:0},N=(S={top:"bottom",right:"left",bottom:"top",left:"right"}[_.split("-")[0]])!==null&&S!==void 0?S:"bottom",O=c&&{borderBottom:c,borderRight:c};let B=0;if(c){const q=`${c}`.match(/(\d+)px/);B=q!=null&&q[1]?Number(q[1]):1}return{tooltipStyles:V,tooltipArrowStyles:{left:P!=null?`${P}px`:"",top:D!=null?`${D}px`:"",right:"",bottom:"",...O,[N]:`-${4+B}px`},place:_}})):bl(n,t,{placement:"bottom",strategy:o,middleware:h}).then(({x:d,y:m,placement:_})=>({tooltipStyles:{left:`${d}px`,top:`${m}px`},tooltipArrowStyles:{},place:_}))},xl=(n,t)=>!("CSS"in window&&"supports"in window.CSS)||window.CSS.supports(n,t),Pl=(n,t,e)=>{let r=null;const s=function(...o){const a=()=>{r=null,e||n.apply(this,o)};e&&!r&&(n.apply(this,o),r=setTimeout(a,t)),e||(r&&clearTimeout(r),r=setTimeout(a,t))};return s.cancel=()=>{r&&(clearTimeout(r),r=null)},s},Vl=n=>n!==null&&!Array.isArray(n)&&typeof n=="object",Xi=(n,t)=>{if(n===t)return!0;if(Array.isArray(n)&&Array.isArray(t))return n.length===t.length&&n.every((s,o)=>Xi(s,t[o]));if(Array.isArray(n)!==Array.isArray(t))return!1;if(!Vl(n)||!Vl(t))return n===t;const e=Object.keys(n),r=Object.keys(t);return e.length===r.length&&e.every(s=>Xi(n[s],t[s]))},qg=n=>{if(!(n instanceof HTMLElement||n instanceof SVGElement))return!1;const t=getComputedStyle(n);return["overflow","overflow-x","overflow-y"].some(e=>{const r=t.getPropertyValue(e);return r==="auto"||r==="scroll"})},Dl=n=>{if(!n)return null;let t=n.parentElement;for(;t;){if(qg(t))return t;t=t.parentElement}return document.scrollingElement||document.documentElement},Hg=typeof window<"u"?k.useLayoutEffect:k.useEffect,ce=n=>{n.current&&(clearTimeout(n.current),n.current=null)},Gg="DEFAULT_TOOLTIP_ID",Kg={anchorRefs:new Set,activeAnchor:{current:null},attach:()=>{},detach:()=>{},setActiveAnchor:()=>{}},Wg=k.createContext({getTooltipData:()=>Kg});function _u(n=Gg){return k.useContext(Wg).getTooltipData(n)}var Bn={tooltip:"core-styles-module_tooltip__3vRRp",fixed:"core-styles-module_fixed__pcSol",arrow:"core-styles-module_arrow__cvMwQ",noArrow:"core-styles-module_noArrow__xock6",clickable:"core-styles-module_clickable__ZuTTB",show:"core-styles-module_show__Nt9eE",closing:"core-styles-module_closing__sGnxF"},vi={tooltip:"styles-module_tooltip__mnnfp",arrow:"styles-module_arrow__K0L3T",dark:"styles-module_dark__xNqje",light:"styles-module_light__Z6W-X",success:"styles-module_success__A2AKt",warning:"styles-module_warning__SCK0X",error:"styles-module_error__JvumD",info:"styles-module_info__BWdHW"};const Qg=({forwardRef:n,id:t,className:e,classNameArrow:r,variant:s="dark",anchorId:o,anchorSelect:a,place:c="top",offset:h=10,events:d=["hover"],openOnClick:m=!1,positionStrategy:_="absolute",middlewares:w,wrapper:A,delayShow:S=0,delayHide:V=0,float:P=!1,hidden:D=!1,noArrow:N=!1,clickable:O=!1,closeOnEsc:B=!1,closeOnScroll:q=!1,closeOnResize:X=!1,openEvents:v,closeEvents:p,globalCloseEvents:y,imperativeModeOnly:E,style:T,position:I,afterShow:g,afterHide:Z,disableTooltip:lt,content:xt,contentWrapperRef:dt,isOpen:ct,defaultIsOpen:yt=!1,setIsOpen:H,activeAnchor:tt,setActiveAnchor:ut,border:et,opacity:Zt,arrowColor:ve,role:dr="tooltip"})=>{var ue;const Ot=k.useRef(null),qe=k.useRef(null),Ut=k.useRef(null),te=k.useRef(null),De=k.useRef(null),[se,dn]=k.useState({tooltipStyles:{},tooltipArrowStyles:{},place:c}),[Lt,fn]=k.useState(!1),[Ee,Ne]=k.useState(!1),[ft,He]=k.useState(null),ke=k.useRef(!1),Ge=k.useRef(null),{anchorRefs:mn,setActiveAnchor:Ke}=_u(t),we=k.useRef(!1),[ie,wt]=k.useState([]),_t=k.useRef(!1),he=m||d.includes("click"),Dn=he||(v==null?void 0:v.click)||(v==null?void 0:v.dblclick)||(v==null?void 0:v.mousedown),Oe=v?{...v}:{mouseover:!0,focus:!0,mouseenter:!1,click:!1,dblclick:!1,mousedown:!1};!v&&he&&Object.assign(Oe,{mouseenter:!1,focus:!1,mouseover:!1,click:!0});const Le=p?{...p}:{mouseout:!0,blur:!0,mouseleave:!1,click:!1,dblclick:!1,mouseup:!1};!p&&he&&Object.assign(Le,{mouseleave:!1,blur:!1,mouseout:!1});const Mt=y?{...y}:{escape:B||!1,scroll:q||!1,resize:X||!1,clickOutsideAnchor:Dn||!1};E&&(Object.assign(Oe,{mouseover:!1,focus:!1,mouseenter:!1,click:!1,dblclick:!1,mousedown:!1}),Object.assign(Le,{mouseout:!1,blur:!1,mouseleave:!1,click:!1,dblclick:!1,mouseup:!1}),Object.assign(Mt,{escape:!1,scroll:!1,resize:!1,clickOutsideAnchor:!1})),Hg(()=>(_t.current=!0,()=>{_t.current=!1}),[]);const vt=F=>{_t.current&&(F&&Ne(!0),setTimeout(()=>{_t.current&&(H==null||H(F),ct===void 0&&fn(F))},10))};k.useEffect(()=>{if(ct===void 0)return()=>null;ct&&Ne(!0);const F=setTimeout(()=>{fn(ct)},10);return()=>{clearTimeout(F)}},[ct]),k.useEffect(()=>{if(Lt!==ke.current)if(ce(De),ke.current=Lt,Lt)g==null||g();else{const F=(U=>{const K=U.match(/^([\d.]+)(ms|s)$/);if(!K)return 0;const[,pt,At]=K;return Number(pt)*(At==="ms"?1:1e3)})(getComputedStyle(document.body).getPropertyValue("--rt-transition-show-delay"));De.current=setTimeout(()=>{Ne(!1),He(null),Z==null||Z()},F+25)}},[Lt]);const pn=F=>{dn(U=>Xi(U,F)?U:F)},Me=(F=S)=>{ce(Ut),Ee?vt(!0):Ut.current=setTimeout(()=>{vt(!0)},F)},We=(F=V)=>{ce(te),te.current=setTimeout(()=>{we.current||vt(!1)},F)},gn=F=>{var U;if(!F)return;const K=(U=F.currentTarget)!==null&&U!==void 0?U:F.target;if(!(K!=null&&K.isConnected))return ut(null),void Ke({current:null});S?Me():vt(!0),ut(K),Ke({current:K}),ce(te)},Te=()=>{O?We(V||100):V?We():vt(!1),ce(Ut)},Fe=({x:F,y:U})=>{var K;const pt={getBoundingClientRect:()=>({x:F,y:U,width:0,height:0,top:U,left:F,right:F,bottom:U})};Cl({place:(K=ft==null?void 0:ft.place)!==null&&K!==void 0?K:c,offset:h,elementReference:pt,tooltipReference:Ot.current,tooltipArrowReference:qe.current,strategy:_,middlewares:w,border:et}).then(At=>{pn(At)})},je=F=>{if(!F)return;const U=F,K={x:U.clientX,y:U.clientY};Fe(K),Ge.current=K},de=F=>{var U;if(!Lt)return;const K=F.target;K.isConnected&&(!((U=Ot.current)===null||U===void 0)&&U.contains(K)||[document.querySelector(`[id='${o}']`),...ie].some(pt=>pt==null?void 0:pt.contains(K))||(vt(!1),ce(Ut)))},Qe=Pl(gn,50,!0),Tt=Pl(Te,50,!0),Pt=F=>{Tt.cancel(),Qe(F)},$=()=>{Qe.cancel(),Tt()},Y=k.useCallback(()=>{var F,U;const K=(F=ft==null?void 0:ft.position)!==null&&F!==void 0?F:I;K?Fe(K):P?Ge.current&&Fe(Ge.current):tt!=null&&tt.isConnected&&Cl({place:(U=ft==null?void 0:ft.place)!==null&&U!==void 0?U:c,offset:h,elementReference:tt,tooltipReference:Ot.current,tooltipArrowReference:qe.current,strategy:_,middlewares:w,border:et}).then(pt=>{_t.current&&pn(pt)})},[Lt,tt,xt,T,c,ft==null?void 0:ft.place,h,_,I,ft==null?void 0:ft.position,P]);k.useEffect(()=>{var F,U;const K=new Set(mn);ie.forEach(it=>{lt!=null&&lt(it)||K.add({current:it})});const pt=document.querySelector(`[id='${o}']`);pt&&!(lt!=null&&lt(pt))&&K.add({current:pt});const At=()=>{vt(!1)},oe=Dl(tt),ae=Dl(Ot.current);Mt.scroll&&(window.addEventListener("scroll",At),oe==null||oe.addEventListener("scroll",At),ae==null||ae.addEventListener("scroll",At));let It=null;Mt.resize?window.addEventListener("resize",At):tt&&Ot.current&&(It=Lg(tt,Ot.current,Y,{ancestorResize:!0,elementResize:!0,layoutShift:!0}));const Qt=it=>{it.key==="Escape"&&vt(!1)};Mt.escape&&window.addEventListener("keydown",Qt),Mt.clickOutsideAnchor&&window.addEventListener("click",de);const mt=[],fe=it=>!!(it!=null&&it.target&&(tt!=null&&tt.contains(it.target))),Kr=it=>{Lt&&fe(it)||gn(it)},fr=it=>{Lt&&fe(it)&&Te()},yn=["mouseover","mouseout","mouseenter","mouseleave","focus","blur"],me=["click","dblclick","mousedown","mouseup"];Object.entries(Oe).forEach(([it,le])=>{le&&(yn.includes(it)?mt.push({event:it,listener:Pt}):me.includes(it)&&mt.push({event:it,listener:Kr}))}),Object.entries(Le).forEach(([it,le])=>{le&&(yn.includes(it)?mt.push({event:it,listener:$}):me.includes(it)&&mt.push({event:it,listener:fr}))}),P&&mt.push({event:"pointermove",listener:je});const mr=()=>{we.current=!0},pr=()=>{we.current=!1,Te()},Nn=O&&(Le.mouseout||Le.mouseleave);return Nn&&((F=Ot.current)===null||F===void 0||F.addEventListener("mouseover",mr),(U=Ot.current)===null||U===void 0||U.addEventListener("mouseout",pr)),mt.forEach(({event:it,listener:le})=>{K.forEach(kn=>{var _n;(_n=kn.current)===null||_n===void 0||_n.addEventListener(it,le)})}),()=>{var it,le;Mt.scroll&&(window.removeEventListener("scroll",At),oe==null||oe.removeEventListener("scroll",At),ae==null||ae.removeEventListener("scroll",At)),Mt.resize?window.removeEventListener("resize",At):It==null||It(),Mt.clickOutsideAnchor&&window.removeEventListener("click",de),Mt.escape&&window.removeEventListener("keydown",Qt),Nn&&((it=Ot.current)===null||it===void 0||it.removeEventListener("mouseover",mr),(le=Ot.current)===null||le===void 0||le.removeEventListener("mouseout",pr)),mt.forEach(({event:kn,listener:_n})=>{K.forEach(On=>{var Ln;(Ln=On.current)===null||Ln===void 0||Ln.removeEventListener(kn,_n)})})}},[tt,Y,Ee,mn,ie,v,p,y,he,S,V]),k.useEffect(()=>{var F,U;let K=(U=(F=ft==null?void 0:ft.anchorSelect)!==null&&F!==void 0?F:a)!==null&&U!==void 0?U:"";!K&&t&&(K=`[data-tooltip-id='${t.replace(/'/g,"\\'")}']`);const pt=new MutationObserver(At=>{const oe=[],ae=[];At.forEach(It=>{if(It.type==="attributes"&&It.attributeName==="data-tooltip-id"&&(It.target.getAttribute("data-tooltip-id")===t?oe.push(It.target):It.oldValue===t&&ae.push(It.target)),It.type==="childList"){if(tt){const Qt=[...It.removedNodes].filter(mt=>mt.nodeType===1);if(K)try{ae.push(...Qt.filter(mt=>mt.matches(K))),ae.push(...Qt.flatMap(mt=>[...mt.querySelectorAll(K)]))}catch{}Qt.some(mt=>{var fe;return!!(!((fe=mt==null?void 0:mt.contains)===null||fe===void 0)&&fe.call(mt,tt))&&(Ne(!1),vt(!1),ut(null),ce(Ut),ce(te),!0)})}if(K)try{const Qt=[...It.addedNodes].filter(mt=>mt.nodeType===1);oe.push(...Qt.filter(mt=>mt.matches(K))),oe.push(...Qt.flatMap(mt=>[...mt.querySelectorAll(K)]))}catch{}}}),(oe.length||ae.length)&&wt(It=>[...It.filter(Qt=>!ae.includes(Qt)),...oe])});return pt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-tooltip-id"],attributeOldValue:!0}),()=>{pt.disconnect()}},[t,a,ft==null?void 0:ft.anchorSelect,tt]),k.useEffect(()=>{Y()},[Y]),k.useEffect(()=>{if(!(dt!=null&&dt.current))return()=>null;const F=new ResizeObserver(()=>{setTimeout(()=>Y())});return F.observe(dt.current),()=>{F.disconnect()}},[xt,dt==null?void 0:dt.current]),k.useEffect(()=>{var F;const U=document.querySelector(`[id='${o}']`),K=[...ie,U];tt&&K.includes(tt)||ut((F=ie[0])!==null&&F!==void 0?F:U)},[o,ie,tt]),k.useEffect(()=>(yt&&vt(!0),()=>{ce(Ut),ce(te)}),[]),k.useEffect(()=>{var F;let U=(F=ft==null?void 0:ft.anchorSelect)!==null&&F!==void 0?F:a;if(!U&&t&&(U=`[data-tooltip-id='${t.replace(/'/g,"\\'")}']`),U)try{const K=Array.from(document.querySelectorAll(U));wt(K)}catch{wt([])}},[t,a,ft==null?void 0:ft.anchorSelect]),k.useEffect(()=>{Ut.current&&(ce(Ut),Me(S))},[S]);const $t=(ue=ft==null?void 0:ft.content)!==null&&ue!==void 0?ue:xt,ee=Lt&&Object.keys(se.tooltipStyles).length>0;return k.useImperativeHandle(n,()=>({open:F=>{if(F!=null&&F.anchorSelect)try{document.querySelector(F.anchorSelect)}catch{return void console.warn(`[react-tooltip] "${F.anchorSelect}" is not a valid CSS selector`)}He(F??null),F!=null&&F.delay?Me(F.delay):vt(!0)},close:F=>{F!=null&&F.delay?We(F.delay):vt(!1)},activeAnchor:tt,place:se.place,isOpen:!!(Ee&&!D&&$t&&ee)})),Ee&&!D&&$t?Yt.createElement(A,{id:t,role:dr,className:Qi("react-tooltip",Bn.tooltip,vi.tooltip,vi[s],e,`react-tooltip__place-${se.place}`,Bn[ee?"show":"closing"],ee?"react-tooltip__show":"react-tooltip__closing",_==="fixed"&&Bn.fixed,O&&Bn.clickable),onTransitionEnd:F=>{ce(De),Lt||F.propertyName!=="opacity"||(Ne(!1),He(null),Z==null||Z())},style:{...T,...se.tooltipStyles,opacity:Zt!==void 0&&ee?Zt:void 0},ref:Ot},$t,Yt.createElement(A,{className:Qi("react-tooltip-arrow",Bn.arrow,vi.arrow,r,N&&Bn.noArrow),style:{...se.tooltipArrowStyles,background:ve?`linear-gradient(to right bottom, transparent 50%, ${ve} 50%)`:void 0},ref:qe})):null},Xg=({content:n})=>Yt.createElement("span",{dangerouslySetInnerHTML:{__html:n}}),ds=Yt.forwardRef(({id:n,anchorId:t,anchorSelect:e,content:r,html:s,render:o,className:a,classNameArrow:c,variant:h="dark",place:d="top",offset:m=10,wrapper:_="div",children:w=null,events:A=["hover"],openOnClick:S=!1,positionStrategy:V="absolute",middlewares:P,delayShow:D=0,delayHide:N=0,float:O=!1,hidden:B=!1,noArrow:q=!1,clickable:X=!1,closeOnEsc:v=!1,closeOnScroll:p=!1,closeOnResize:y=!1,openEvents:E,closeEvents:T,globalCloseEvents:I,imperativeModeOnly:g=!1,style:Z,position:lt,isOpen:xt,defaultIsOpen:dt=!1,disableStyleInjection:ct=!1,border:yt,opacity:H,arrowColor:tt,setIsOpen:ut,afterShow:et,afterHide:Zt,disableTooltip:ve,role:dr="tooltip"},ue)=>{const[Ot,qe]=k.useState(r),[Ut,te]=k.useState(s),[De,se]=k.useState(d),[dn,Lt]=k.useState(h),[fn,Ee]=k.useState(m),[Ne,ft]=k.useState(D),[He,ke]=k.useState(N),[Ge,mn]=k.useState(O),[Ke,we]=k.useState(B),[ie,wt]=k.useState(_),[_t,he]=k.useState(A),[Dn,Oe]=k.useState(V),[Le,Mt]=k.useState(null),[vt,pn]=k.useState(null),Me=k.useRef(ct),{anchorRefs:We,activeAnchor:gn}=_u(n),Te=Tt=>Tt==null?void 0:Tt.getAttributeNames().reduce((Pt,$)=>{var Y;return $.startsWith("data-tooltip-")&&(Pt[$.replace(/^data-tooltip-/,"")]=(Y=Tt==null?void 0:Tt.getAttribute($))!==null&&Y!==void 0?Y:null),Pt},{}),Fe=Tt=>{const Pt={place:$=>{var Y;se((Y=$)!==null&&Y!==void 0?Y:d)},content:$=>{qe($??r)},html:$=>{te($??s)},variant:$=>{var Y;Lt((Y=$)!==null&&Y!==void 0?Y:h)},offset:$=>{Ee($===null?m:Number($))},wrapper:$=>{var Y;wt((Y=$)!==null&&Y!==void 0?Y:_)},events:$=>{const Y=$==null?void 0:$.split(" ");he(Y??A)},"position-strategy":$=>{var Y;Oe((Y=$)!==null&&Y!==void 0?Y:V)},"delay-show":$=>{ft($===null?D:Number($))},"delay-hide":$=>{ke($===null?N:Number($))},float:$=>{mn($===null?O:$==="true")},hidden:$=>{we($===null?B:$==="true")},"class-name":$=>{Mt($)}};Object.values(Pt).forEach($=>$(null)),Object.entries(Tt).forEach(([$,Y])=>{var $t;($t=Pt[$])===null||$t===void 0||$t.call(Pt,Y)})};k.useEffect(()=>{qe(r)},[r]),k.useEffect(()=>{te(s)},[s]),k.useEffect(()=>{se(d)},[d]),k.useEffect(()=>{Lt(h)},[h]),k.useEffect(()=>{Ee(m)},[m]),k.useEffect(()=>{ft(D)},[D]),k.useEffect(()=>{ke(N)},[N]),k.useEffect(()=>{mn(O)},[O]),k.useEffect(()=>{we(B)},[B]),k.useEffect(()=>{Oe(V)},[V]),k.useEffect(()=>{Me.current!==ct&&console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.")},[ct]),k.useEffect(()=>{typeof window<"u"&&window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles",{detail:{disableCore:ct==="core",disableBase:ct}}))},[]),k.useEffect(()=>{var Tt;const Pt=new Set(We);let $=e;if(!$&&n&&($=`[data-tooltip-id='${n.replace(/'/g,"\\'")}']`),$)try{document.querySelectorAll($).forEach(U=>{Pt.add({current:U})})}catch{console.warn(`[react-tooltip] "${$}" is not a valid CSS selector`)}const Y=document.querySelector(`[id='${t}']`);if(Y&&Pt.add({current:Y}),!Pt.size)return()=>null;const $t=(Tt=vt??Y)!==null&&Tt!==void 0?Tt:gn.current,ee=new MutationObserver(U=>{U.forEach(K=>{var pt;if(!$t||K.type!=="attributes"||!(!((pt=K.attributeName)===null||pt===void 0)&&pt.startsWith("data-tooltip-")))return;const At=Te($t);Fe(At)})}),F={attributes:!0,childList:!1,subtree:!1};if($t){const U=Te($t);Fe(U),ee.observe($t,F)}return()=>{ee.disconnect()}},[We,gn,vt,t,e]),k.useEffect(()=>{Z!=null&&Z.border&&console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."),yt&&!xl("border",`${yt}`)&&console.warn(`[react-tooltip] "${yt}" is not a valid \`border\`.`),Z!=null&&Z.opacity&&console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."),H&&!xl("opacity",`${H}`)&&console.warn(`[react-tooltip] "${H}" is not a valid \`opacity\`.`)},[]);let je=w;const de=k.useRef(null);if(o){const Tt=o({content:(vt==null?void 0:vt.getAttribute("data-tooltip-content"))||Ot||null,activeAnchor:vt});je=Tt?Yt.createElement("div",{ref:de,className:"react-tooltip-content-wrapper"},Tt):null}else Ot&&(je=Ot);Ut&&(je=Yt.createElement(Xg,{content:Ut}));const Qe={forwardRef:ue,id:n,anchorId:t,anchorSelect:e,className:Qi(a,Le),classNameArrow:c,content:je,contentWrapperRef:de,place:De,variant:dn,offset:fn,wrapper:ie,events:_t,openOnClick:S,positionStrategy:Dn,middlewares:P,delayShow:Ne,delayHide:He,float:Ge,hidden:Ke,noArrow:q,clickable:X,closeOnEsc:v,closeOnScroll:p,closeOnResize:y,openEvents:E,closeEvents:T,globalCloseEvents:I,imperativeModeOnly:g,style:Z,position:lt,isOpen:xt,defaultIsOpen:dt,border:yt,opacity:H,arrowColor:tt,setIsOpen:ut,afterShow:et,afterHide:Zt,disableTooltip:ve,activeAnchor:vt,setActiveAnchor:Tt=>pn(Tt),role:dr};return Yt.createElement(Qg,{...Qe})});typeof window<"u"&&window.addEventListener("react-tooltip-inject-styles",n=>{n.detail.disableCore||Sl({css:":root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}",type:"core"}),n.detail.disableBase||Sl({css:`
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`,type:"base"})});const Yg=({className:n})=>C.jsxs(C.Fragment,{children:[C.jsxs("div",{className:"fixed right-0 p-3 rounded-l-2xl  bottom-10 social-links flex flex-col gap-7 justify-end font-sans text-lg z-10 border-0",children:[C.jsx("a",{className:"fill-blue-accent h-5 w-5","aria-label":"Github",href:"https://github.com/EthanMerrill",id:"github","data-tooltip-content":"Github","data-tooltip-place":"left",children:C.jsx(ng,{})}),C.jsx("a",{className:"fill-blue-accent h-5 w-5","aria-label":"Linkedin",href:"https://www.linkedin.com/in/ethanmerrill/",id:"linkedin","data-tooltip-content":"Linkedin","data-tooltip-place":"left",children:C.jsx(sg,{})}),C.jsx("a",{className:"fill-blue-accent h-5 w-5","aria-label":"Printables",href:"https://www.printables.com/social/89492-ethanmerrill/",id:"printables","data-tooltip-content":"Printables","data-tooltip-place":"left",children:C.jsx(ig,{})}),C.jsx("a",{className:"fill-blue-accent h-5 w-5","aria-label":"Hashnode",href:"https://ethanmakes.hashnode.dev/",id:"hashnode","data-tooltip-content":"Hashnode","data-tooltip-place":"left",children:C.jsx(rg,{})})]}),C.jsx(ds,{className:"z-50",anchorId:"github",type:"dark",effect:"solid"}),C.jsx(ds,{className:"z-50",anchorId:"hashnode",type:"dark",effect:"solid"}),C.jsx(ds,{className:"z-50",anchorId:"linkedin",type:"dark",effect:"solid"}),C.jsx(ds,{className:"z-50",anchorId:"printables",type:"dark",effect:"solid"})]});function Ys(n,t,e,r){return new(e||(e=Promise))(function(s,o){function a(d){try{h(r.next(d))}catch(m){o(m)}}function c(d){try{h(r.throw(d))}catch(m){o(m)}}function h(d){var m;d.done?s(d.value):(m=d.value,m instanceof e?m:new e(function(_){_(m)})).then(a,c)}h((r=r.apply(n,t||[])).next())})}function rn(n,t){var e,r,s,o,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function c(h){return function(d){return function(m){if(e)throw new TypeError("Generator is already executing.");for(;a;)try{if(e=1,r&&(s=2&m[0]?r.return:m[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,m[1])).done)return s;switch(r=0,s&&(m=[2&m[0],s.value]),m[0]){case 0:case 1:s=m;break;case 4:return a.label++,{value:m[1],done:!1};case 5:a.label++,r=m[1],m=[0];continue;case 7:m=a.ops.pop(),a.trys.pop();continue;default:if(s=a.trys,!((s=s.length>0&&s[s.length-1])||m[0]!==6&&m[0]!==2)){a=0;continue}if(m[0]===3&&(!s||m[1]>s[0]&&m[1]<s[3])){a.label=m[1];break}if(m[0]===6&&a.label<s[1]){a.label=s[1],s=m;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(m);break}s[2]&&a.ops.pop(),a.trys.pop();continue}m=t.call(n,a)}catch(_){m=[6,_],r=0}finally{e=s=0}if(5&m[0])throw m[1];return{value:m[0]?m[1]:void 0,done:!0}}([h,d])}}}function Yi(n){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&n[t],r=0;if(e)return e.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&r>=n.length&&(n=void 0),{value:n&&n[r++],done:!n}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function ge(n,t){var e=typeof Symbol=="function"&&n[Symbol.iterator];if(!e)return n;var r,s,o=e.call(n),a=[];try{for(;(t===void 0||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(c){s={error:c}}finally{try{r&&!r.done&&(e=o.return)&&e.call(o)}finally{if(s)throw s.error}}return a}function be(n,t,e){if(e||arguments.length===2)for(var r,s=0,o=t.length;s<o;s++)!r&&s in t||(r||(r=Array.prototype.slice.call(t,0,s)),r[s]=t[s]);return n.concat(r||Array.prototype.slice.call(t))}function Nl(n,t,e,r,s){for(var o=[],a=5;a<arguments.length;a++)o[a-5]=arguments[a];return Ys(this,void 0,void 0,function(){var c,h,d,m,_,w;return rn(this,function(A){switch(A.label){case 0:A.trys.push([0,12,13,14]),c=Yi(o),h=c.next(),A.label=1;case 1:if(h.done)return[3,11];switch(d=h.value,typeof d){case"string":return[3,2];case"number":return[3,4];case"function":return[3,6]}return[3,8];case 2:return[4,Jg(n,t,d,e,r,s)];case 3:return A.sent(),[3,10];case 4:return[4,vu(d)];case 5:return A.sent(),[3,10];case 6:return[4,d.apply(void 0,be([n,t,e,r,s],ge(o),!1))];case 7:return A.sent(),[3,10];case 8:return[4,d];case 9:A.sent(),A.label=10;case 10:return h=c.next(),[3,1];case 11:return[3,14];case 12:return m=A.sent(),_={error:m},[3,14];case 13:try{h&&!h.done&&(w=c.return)&&w.call(c)}finally{if(_)throw _.error}return[7];case 14:return[2]}})})}function Jg(n,t,e,r,s,o){return Ys(this,void 0,void 0,function(){var a,c;return rn(this,function(h){switch(h.label){case 0:return a=n.textContent||"",c=function(d,m){var _=ge(m).slice(0);return be(be([],ge(d),!1),[NaN],!1).findIndex(function(w,A){return _[A]!==w})}(a,e),[4,Zg(n,be(be([],ge(ey(a,t,c)),!1),ge(ty(e,t,c)),!1),r,s,o)];case 1:return h.sent(),[2]}})})}function vu(n){return Ys(this,void 0,void 0,function(){return rn(this,function(t){switch(t.label){case 0:return[4,new Promise(function(e){return setTimeout(e,n)})];case 1:return t.sent(),[2]}})})}function Zg(n,t,e,r,s){return Ys(this,void 0,void 0,function(){var o,a,c,h,d,m,_,w,A,S,V,P,D;return rn(this,function(N){switch(N.label){case 0:if(o=t,s){for(a=0,c=1;c<t.length;c++)if(h=ge([t[c-1],t[c]],2),d=h[0],(m=h[1]).length>d.length||m===""){a=c;break}o=t.slice(a,t.length)}N.label=1;case 1:N.trys.push([1,6,7,8]),_=Yi(function(O){var B,q,X,v,p,y,E;return rn(this,function(T){switch(T.label){case 0:B=function(I){return rn(this,function(g){switch(g.label){case 0:return[4,{op:function(Z){return requestAnimationFrame(function(){return Z.textContent=I})},opCode:function(Z){var lt=Z.textContent||"";return I===""||lt.length>I.length?"DELETE":"WRITING"}}];case 1:return g.sent(),[2]}})},T.label=1;case 1:T.trys.push([1,6,7,8]),q=Yi(O),X=q.next(),T.label=2;case 2:return X.done?[3,5]:(v=X.value,[5,B(v)]);case 3:T.sent(),T.label=4;case 4:return X=q.next(),[3,2];case 5:return[3,8];case 6:return p=T.sent(),y={error:p},[3,8];case 7:try{X&&!X.done&&(E=q.return)&&E.call(q)}finally{if(y)throw y.error}return[7];case 8:return[2]}})}(o)),w=_.next(),N.label=2;case 2:return w.done?[3,5]:(A=w.value,S=A.opCode(n)==="WRITING"?e+e*(Math.random()-.5):r+r*(Math.random()-.5),A.op(n),[4,vu(S)]);case 3:N.sent(),N.label=4;case 4:return w=_.next(),[3,2];case 5:return[3,8];case 6:return V=N.sent(),P={error:V},[3,8];case 7:try{w&&!w.done&&(D=_.return)&&D.call(_)}finally{if(P)throw P.error}return[7];case 8:return[2]}})})}function ty(n,t,e){var r,s;return e===void 0&&(e=0),rn(this,function(o){switch(o.label){case 0:r=t(n),s=r.length,o.label=1;case 1:return e<s?[4,r.slice(0,++e).join("")]:[3,3];case 2:return o.sent(),[3,1];case 3:return[2]}})}function ey(n,t,e){var r,s;return e===void 0&&(e=0),rn(this,function(o){switch(o.label){case 0:r=t(n),s=r.length,o.label=1;case 1:return s>e?[4,r.slice(0,--s).join("")]:[3,3];case 2:return o.sent(),[3,1];case 3:return[2]}})}var ny="index-module_type__E-SaG";(function(n,t){t===void 0&&(t={});var e=t.insertAt;if(n&&typeof document<"u"){var r=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",e==="top"&&r.firstChild?r.insertBefore(s,r.firstChild):r.appendChild(s),s.styleSheet?s.styleSheet.cssText=n:s.appendChild(document.createTextNode(n))}})(`.index-module_type__E-SaG::after {
  content: '|';
  animation: index-module_cursor__PQg0P 1.1s infinite step-start;
}

@keyframes index-module_cursor__PQg0P {
  50% {
    opacity: 0;
  }
}
`);var ry=k.memo(k.forwardRef(function(n,t){var e=n.sequence,r=n.repeat,s=n.className,o=n.speed,a=o===void 0?40:o,c=n.deletionSpeed,h=n.omitDeletionAnimation,d=h!==void 0&&h,m=n.preRenderFirstString,_=m!==void 0&&m,w=n.wrapper,A=w===void 0?"span":w,S=n.splitter,V=S===void 0?function(H){return be([],ge(H),!1)}:S,P=n.cursor,D=P===void 0||P,N=n.style,O=function(H,tt){var ut={};for(var et in H)Object.prototype.hasOwnProperty.call(H,et)&&tt.indexOf(et)<0&&(ut[et]=H[et]);if(H!=null&&typeof Object.getOwnPropertySymbols=="function"){var Zt=0;for(et=Object.getOwnPropertySymbols(H);Zt<et.length;Zt++)tt.indexOf(et[Zt])<0&&Object.prototype.propertyIsEnumerable.call(H,et[Zt])&&(ut[et[Zt]]=H[et[Zt]])}return ut}(n,["sequence","repeat","className","speed","deletionSpeed","omitDeletionAnimation","preRenderFirstString","wrapper","splitter","cursor","style"]),B=O["aria-label"],q=O["aria-hidden"],X=O.role;c||(c=a);var v=new Array(2).fill(40);[a,c].forEach(function(H,tt){switch(typeof H){case"number":v[tt]=Math.abs(H-100);break;case"object":var ut=H.type,et=H.value;if(typeof et!="number")break;ut==="keyStrokeDelayInMs"&&(v[tt]=et)}});var p,y,E,T,I,g,Z=v[0],lt=v[1],xt=function(H,tt){tt===void 0&&(tt=null);var ut=k.useRef(tt);return k.useEffect(function(){H&&(typeof H=="function"?H(ut.current):H.current=ut.current)},[H]),ut}(t),dt=ny;p=s?"".concat(D?dt+" ":"").concat(s):D?dt:"",y=k.useRef(function(){var H,tt=e;r===1/0?H=Nl:typeof r=="number"&&(tt=Array(1+r).fill(e).flat());var ut=H?be(be([],ge(tt),!1),[H],!1):be([],ge(tt),!1);return Nl.apply(void 0,be([xt.current,V,Z,lt,d],ge(ut),!1)),function(){xt.current}}),E=k.useRef(),T=k.useRef(!1),I=k.useRef(!1),g=ge(k.useState(0),2)[1],T.current&&(I.current=!0),k.useEffect(function(){return T.current||(E.current=y.current(),T.current=!0),g(function(H){return H+1}),function(){I.current&&E.current&&E.current()}},[]);var ct=A,yt=_?e.find(function(H){return typeof H=="string"})||"":null;return Yt.createElement(ct,{"aria-hidden":q,"aria-label":B,role:X,style:N,className:p,children:B?Yt.createElement("span",{"aria-hidden":"true",ref:xt,children:yt}):yt,ref:B?void 0:xt})}),function(n,t){return!0});const sy=n=>n.user?C.jsxs("div",{className:"mb-2 ml-40 flex flex-col items-end",children:[C.jsx("div",{className:"chat-message bg-gray-300 p-3 rounded-md",children:C.jsx("div",{className:"chat-message-text font-thin text-right text-sm",children:C.jsx("p",{children:n.message})})}),C.jsxs("div",{className:"flex items-center mt-1 pr-1",children:[C.jsx("div",{className:"chat-message-timestamp text-xs text-slate opacity-60 mr-2",children:n.timestamp?new Date(n.timestamp).toLocaleTimeString():""}),C.jsx("div",{className:"chat-message-author text-xs text-slate opacity-80",children:n.author})]})]}):C.jsxs("div",{className:"mb-2 mr-40",children:[C.jsx("div",{className:"chat-message bg-blue-accent p-3 rounded-md mr-auto",children:C.jsx("div",{className:"chat-message-text text-white font-thin text-sm",children:C.jsx(ry,{sequence:[n.message,()=>{n.completed&&n.completed(!0)}],speed:70,cursor:!1,repeat:0,wrapper:"p"})})}),C.jsxs("div",{className:"flex items-center mt-1 pl-1",children:[C.jsx("div",{className:"chat-message-author text-xxs text-slate opacity-50 mr-2",children:n.author}),C.jsx("div",{className:"chat-message-timestamp text-xxs text-slate opacity-30",children:n.timestamp?new Date(n.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""})]})]});class iy{constructor(){ai(this,"baseUrl");ai(this,"token",null);this.baseUrl="https://secrets-service.2qmhkz1r7mgdw.us-east-1.cs.amazonlightsail.com",typeof localStorage<"u"?this.token=localStorage.getItem("secrets_token"):this.token=null}async authenticate(t){try{const e=await fetch(`${this.baseUrl}/auth`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error(`Authentication failed: ${e.status}`);const r=await e.json();if(r.error)throw new Error(r.error);return r.token?(this.token=r.token,localStorage.setItem("secrets_token",this.token),!0):!1}catch(e){throw console.error("Authentication error:",e),e}}isAuthenticated(){return this.token!==null}clearToken(){this.token=null,localStorage.removeItem("secrets_token")}async healthCheck(){try{return(await fetch(`${this.baseUrl}/health`)).ok}catch(t){return console.error("Health check failed:",t),!1}}getToken(){return this.token}}const fs=new iy,oy=()=>{const[n,t]=k.useState(!1),[e,r]=k.useState(!1),s=k.useMemo(()=>[{message:"Hi! I'm a software engineer based in Boston. I'm currently working CapTech Consulting. I'm passionate about web development, and am always looking for new opportunities to learn and grow.",author:"Ethan's Assistant",timestamp:Date.now(),user:!1},{message:"I'm currently working on a few personal projects, including this website. I'm using it as a platform to showcase my work and share my thoughts on various topics.",author:"Ethan's Assistant",timestamp:Date.now(),user:!1},{message:"If you have any questions you can ask them here, or drop me a line directly!",author:"Ethan's Assistant",timestamp:Date.now(),user:!1}],[]),[o,a]=k.useState([]),[c,h]=k.useState(()=>[...s]),[d,m]=k.useState(""),[_,w]=k.useState(!0),A=k.useRef(null);k.useEffect(()=>{let D=!0;return(async()=>{try{if(console.log("Initializing secrets service..."),!await fs.healthCheck()||!D){console.warn("Secrets service is not available");return}if(!fs.isAuthenticated()&&(!await fs.authenticate({username:"ethan",password:"5190ef718713ec126966f88524f189f9d35e91acd94c26809060aa03aeb77114"})||!D)){console.error("Failed to authenticate with secrets service");return}D&&(t(!0),console.log("Secrets service ready!"))}catch(O){console.error("Failed to initialize secrets service:",O)}})(),()=>{D=!1}},[]);const S=k.useCallback(async D=>{try{const N=fs.getToken(),O=await fetch("https://secrets-service.2qmhkz1r7mgdw.us-east-1.cs.amazonlightsail.com/api/chat",{method:"POST",headers:{"Content-Type":"application/json",...N?{Authorization:`Bearer ${N}`}:{}},body:JSON.stringify({message:D})});if(!O.ok)throw new Error(`Backend chat API error: ${O.status}`);const B=await O.json();if(B.response)return B.response;if(B.error)throw new Error(B.error);return"Sorry, I couldn't process that request."}catch(N){throw console.error("AI response error:",N),N}},[]),V=k.useCallback(async()=>{if(!d.trim())return;const D={message:d,timestamp:Date.now(),user:!0,author:"You"};a(O=>[...O,D]);const N=d;if(m(""),r(!0),n)try{const B={message:await S(N),timestamp:Date.now(),user:!1,author:"Ethan's Assistant"};a(q=>[...q,B])}catch(O){console.error("AI response failed:",O);const B={message:"Sorry, I'm having trouble connecting to my AI assistant right now. Feel free to reach out to me directly!",timestamp:Date.now(),user:!1,author:"Ethan's Assistant"};a(q=>[...q,B])}else{const O={message:"Thanks for your message! The AI assistant is currently offline, but feel free to contact me directly.",timestamp:Date.now(),user:!1,author:"Ethan's Assistant"};a(B=>[...B,O])}r(!1)},[d,n,S]);k.useEffect(()=>{A.current&&(A.current.scrollTop=A.current.scrollHeight)},[o]);const P=k.useCallback(D=>{D.key==="Enter"&&!e&&V()},[V,e]);return k.useEffect(()=>{if(c.length>0&&_){const D=setTimeout(()=>{a(N=>[...N,c[0]]),h(N=>N.slice(1)),w(!1)},100);return()=>clearTimeout(D)}},[c.length,_]),C.jsxs("div",{className:"flex flex-col h-96 mb-10 mx-auto px-10 max-w-6xl",children:[C.jsx("div",{className:"flex-grow rounded-t-lg",children:C.jsxs("div",{ref:A,className:"flex flex-col justify-end overflow-scroll h-96",children:[o.map((D,N)=>C.jsx(sy,{message:D.message,user:D.user,author:D.author,timestamp:D.timestamp,completed:w},`${D.timestamp}-${N}`)),e&&C.jsx("div",{className:"text-gray-500 italic p-2",children:"Ethan's Assistant is thinking..."})]})}),C.jsxs("div",{className:"rounded-b-lg",children:[C.jsxs("div",{className:"flex",children:[C.jsx("input",{type:"text",className:"flex-grow border border-gray-300 rounded-l-lg p-2",placeholder:"Ask me anything about Ethan...",value:d,onChange:D=>m(D.target.value),onKeyPress:P,disabled:e}),C.jsx("button",{className:"bg-blue-500 text-white rounded-r-lg p-2 ml-2 disabled:opacity-50",onClick:V,disabled:e||!d.trim(),children:e?"Thinking...":"Send"})]}),!n&&C.jsx("div",{className:"text-sm text-amber-600 mt-1",children:"⚠️ AI assistant offline - messages will receive static responses"})]})]})};function ay(){const[n,t]=Yt.useState(window.innerWidth),e=700;return Yt.useEffect(()=>{const r=()=>t(window.innerWidth);return window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}},[]),C.jsxs("div",{className:"main-body",children:[C.jsx("div",{className:"easter-egg absolute top-[-10px]",children:C.jsx("p",{className:" z-10 relative text-white",children:"Hello again!"})}),C.jsxs("div",{className:"app z-10 relative",children:[C.jsx(eh,{}),C.jsx(Yg,{className:"rotated-wrapper"}),C.jsx("div",{children:C.jsxs("div",{className:"projects-container pt-30 z-10",children:[C.jsx(li,{sectionNumber:1,title:"About Me",children:C.jsx(oy,{width:n,breakpoint:e})}),C.jsx(li,{sectionNumber:2,title:"Experience",children:C.jsx(El,{Projects:!0})}),C.jsx(li,{sectionNumber:3,title:"Projects",children:C.jsx(El,{Projects:!1})}),C.jsx(th,{title:"Ideas List",children:C.jsx("div",{className:"mt-8 mx-8 flex flex-col justify-center",children:C.jsxs("div",{className:"flex flex-wrap",children:[C.jsxs("div",{className:"basis-2/3 sm:basis-full py-3 text-main-text-gray",children:["Everyone has ideas. The key is in the execution. To keep track and hold myself accountable, I keep a list of ideas for projects which I think would be interesting, fun, and maybe even profitable. Ideas are marked as ",C.jsx("span",{className:"inline rounded-full px-2 bg-notion-green",children:"Live"}),", ",C.jsx("span",{className:"inline rounded-full px-2 bg-notion-brown",children:"Abandoned"}),", or ",C.jsx("span",{className:"inline rounded-full px-2 bg-notion-gray",children:" Not Started"}),".",C.jsx("br",{})," ",C.jsx("br",{})," If you're interested in collaborating on any of these projects, please reach out!"]}),C.jsx("div",{className:"basis-1/3 sm:basis-full my-auto",children:C.jsx("a",{href:"https://observant-book-583.notion.site/0013220bce5a49c08a1c8b49b9983c94?v=1b7fd37991bc4c63a0295d05c47c2d94",children:C.jsx("div",{className:"hover:bg-blue-accent hover:text-white solid border-[1.5px] rounded border-white w-40 mx-auto my-auto text-main-text-gray text-center p-2",children:"View Ideas List →"})})})]})})})]})})]})]})}const Eu=document.getElementById("root");if(!Eu)throw new Error("Root element not found");const ly=Ei.createRoot(Eu);ly.render(C.jsx(Yt.StrictMode,{children:C.jsx(qu,{children:C.jsx(ay,{})})}));
//# sourceMappingURL=index-6b5a264b.js.map
