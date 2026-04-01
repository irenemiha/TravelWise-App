import{o as gc}from"./idb-BXWtuYvb.js";const sh=()=>{};var ta={};/**
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
 */const _c=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},ih=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},yc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,m=o>>2,y=(o&3)<<4|l>>4;let A=(l&15)<<2|f>>6,P=f&63;h||(P=64,a||(A=64)),r.push(e[m],e[y],e[A],e[P])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(_c(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):ih(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const y=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||f==null||y==null)throw new oh;const A=o<<2|l>>4;if(r.push(A),f!==64){const P=l<<4&240|f>>2;if(r.push(P),y!==64){const N=f<<6&192|y;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class oh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ah=function(n){const t=_c(n);return yc.encodeByteArray(t,!0)},Er=function(n){return ah(n).replace(/\./g,"")},ch=function(n){try{return yc.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function uh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const lh=()=>uh().__FIREBASE_DEFAULTS__,hh=()=>{if(typeof process>"u"||typeof ta>"u")return;const n=ta.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},fh=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&ch(n[1]);return t&&JSON.parse(t)},Or=()=>{try{return sh()||lh()||hh()||fh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},dh=n=>{var t,e;return(e=(t=Or())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},mh=n=>{const t=dh(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Ec=()=>{var n;return(n=Or())==null?void 0:n.config},p_=n=>{var t;return(t=Or())==null?void 0:t[`_${n}`]};/**
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
 */class ph{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
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
 */function gh(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Er(JSON.stringify(e)),Er(JSON.stringify(a)),""].join(".")}/**
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
 */function ii(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function g_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ii())}function _h(){var t;const n=(t=Or())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function __(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function yh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function y_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function E_(){const n=ii();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Eh(){return!_h()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Tc(){try{return typeof indexedDB=="object"}catch{return!1}}function Ic(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}function Th(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Ih="FirebaseError";class he extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Ih,Object.setPrototypeOf(this,he.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xr.prototype.create)}}class xr{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?vh(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new he(s,l,r)}}function vh(n,t){return n.replace(wh,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const wh=/\{\$([^}]+)}/g;function T_(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function Se(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(ea(o)&&ea(a)){if(!Se(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function ea(n){return n!==null&&typeof n=="object"}/**
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
 */function I_(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function v_(n){const t={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,o]=r.split("=");t[decodeURIComponent(s)]=decodeURIComponent(o)}}),t}function w_(n){const t=n.indexOf("?");if(!t)return"";const e=n.indexOf("#",t);return n.substring(t,e>0?e:void 0)}function A_(n,t){const e=new Ah(n,t);return e.subscribe.bind(e)}class Ah{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");Rh(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=bs),s.error===void 0&&(s.error=bs),s.complete===void 0&&(s.complete=bs);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Rh(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function bs(){}/**
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
 */const Sh=1e3,bh=2,Ph=14400*1e3,Ch=.5;function na(n,t=Sh,e=bh){const r=t*Math.pow(e,n),s=Math.round(Ch*r*(Math.random()-.5)*2);return Math.min(Ph,r+s)}/**
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
 */function wt(n){return n&&n._delegate?n._delegate:n}/**
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
 */function vc(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Vh(n){return(await fetch(n,{credentials:"include"})).ok}class zt{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const Ie="[DEFAULT]";/**
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
 */class Dh{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new ph;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(kh(t))try{this.getOrInitializeService({instanceIdentifier:Ie})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=Ie){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ie){return this.instances.has(t)}getOptions(t=Ie){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Nh(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Ie){return this.component?this.component.multipleInstances?t:Ie:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Nh(n){return n===Ie?void 0:n}function kh(n){return n.instantiationMode==="EAGER"}/**
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
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const xh={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},Mh=$.INFO,Lh={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},Fh=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=Lh[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class oi{constructor(t){this.name=t,this._logLevel=Mh,this._logHandler=Fh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in $))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?xh[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...t),this._logHandler(this,$.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...t),this._logHandler(this,$.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,$.INFO,...t),this._logHandler(this,$.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,$.WARN,...t),this._logHandler(this,$.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...t),this._logHandler(this,$.ERROR,...t)}}/**
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
 */class Uh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Bh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Bh(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Fs="@firebase/app",ra="0.14.10";/**
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
 */const Gt=new oi("@firebase/app"),qh="@firebase/app-compat",jh="@firebase/analytics-compat",$h="@firebase/analytics",zh="@firebase/app-check-compat",Gh="@firebase/app-check",Hh="@firebase/auth",Kh="@firebase/auth-compat",Wh="@firebase/database",Qh="@firebase/data-connect",Yh="@firebase/database-compat",Jh="@firebase/functions",Xh="@firebase/functions-compat",Zh="@firebase/installations",tf="@firebase/installations-compat",ef="@firebase/messaging",nf="@firebase/messaging-compat",rf="@firebase/performance",sf="@firebase/performance-compat",of="@firebase/remote-config",af="@firebase/remote-config-compat",cf="@firebase/storage",uf="@firebase/storage-compat",lf="@firebase/firestore",hf="@firebase/ai",ff="@firebase/firestore-compat",df="firebase",mf="12.11.0";/**
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
 */const Us="[DEFAULT]",pf={[Fs]:"fire-core",[qh]:"fire-core-compat",[$h]:"fire-analytics",[jh]:"fire-analytics-compat",[Gh]:"fire-app-check",[zh]:"fire-app-check-compat",[Hh]:"fire-auth",[Kh]:"fire-auth-compat",[Wh]:"fire-rtdb",[Qh]:"fire-data-connect",[Yh]:"fire-rtdb-compat",[Jh]:"fire-fn",[Xh]:"fire-fn-compat",[Zh]:"fire-iid",[tf]:"fire-iid-compat",[ef]:"fire-fcm",[nf]:"fire-fcm-compat",[rf]:"fire-perf",[sf]:"fire-perf-compat",[of]:"fire-rc",[af]:"fire-rc-compat",[cf]:"fire-gcs",[uf]:"fire-gcs-compat",[lf]:"fire-fst",[ff]:"fire-fst-compat",[hf]:"fire-vertex","fire-js":"fire-js",[df]:"fire-js-all"};/**
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
 */const Tr=new Map,gf=new Map,Bs=new Map;function sa(n,t){try{n.container.addComponent(t)}catch(e){Gt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function se(n){const t=n.name;if(Bs.has(t))return Gt.debug(`There were multiple attempts to register component ${t}.`),!1;Bs.set(t,n);for(const e of Tr.values())sa(e,n);for(const e of gf.values())sa(e,n);return!0}function Fn(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function _f(n){return n==null?!1:n.settings!==void 0}/**
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
 */const yf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ee=new xr("app","Firebase",yf);/**
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
 */class Ef{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ee.create("app-deleted",{appName:this._name})}}/**
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
 */const Tf=mf;function If(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:Us,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw ee.create("bad-app-name",{appName:String(s)});if(e||(e=Ec()),!e)throw ee.create("no-options");const o=Tr.get(s);if(o){if(Se(e,o.options)&&Se(r,o.config))return o;throw ee.create("duplicate-app",{appName:s})}const a=new Oh(s);for(const h of Bs.values())a.addComponent(h);const l=new Ef(e,r,a);return Tr.set(s,l),l}function wc(n=Us){const t=Tr.get(n);if(!t&&n===Us&&Ec())return If();if(!t)throw ee.create("no-app",{appName:n});return t}function jt(n,t,e){let r=pf[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Gt.warn(a.join(" "));return}se(new zt(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const vf="firebase-heartbeat-database",wf=1,Dn="firebase-heartbeat-store";let Ps=null;function Ac(){return Ps||(Ps=gc(vf,wf,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Dn)}catch(e){console.warn(e)}}}}).catch(n=>{throw ee.create("idb-open",{originalErrorMessage:n.message})})),Ps}async function Af(n){try{const e=(await Ac()).transaction(Dn),r=await e.objectStore(Dn).get(Rc(n));return await e.done,r}catch(t){if(t instanceof he)Gt.warn(t.message);else{const e=ee.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Gt.warn(e.message)}}}async function ia(n,t){try{const r=(await Ac()).transaction(Dn,"readwrite");await r.objectStore(Dn).put(t,Rc(n)),await r.done}catch(e){if(e instanceof he)Gt.warn(e.message);else{const r=ee.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Gt.warn(r.message)}}}function Rc(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Rf=1024,Sf=30;class bf{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Cf(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=oa();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Sf){const a=Vf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Gt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=oa(),{heartbeatsToSend:r,unsentEntries:s}=Pf(this._heartbeatsCache.heartbeats),o=Er(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Gt.warn(e),""}}}function oa(){return new Date().toISOString().substring(0,10)}function Pf(n,t=Rf){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),aa(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),aa(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Cf{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Tc()?Ic().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Af(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ia(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ia(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function aa(n){return Er(JSON.stringify({version:2,heartbeats:n})).length}function Vf(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
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
 */function Df(n){se(new zt("platform-logger",t=>new Uh(t),"PRIVATE")),se(new zt("heartbeat",t=>new bf(t),"PRIVATE")),jt(Fs,ra,n),jt(Fs,ra,"esm2020"),jt("fire-js","")}Df("");const Sc="@firebase/installations",ai="0.6.21";/**
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
 */const bc=1e4,Pc=`w:${ai}`,Cc="FIS_v2",Nf="https://firebaseinstallations.googleapis.com/v1",kf=3600*1e3,Of="installations",xf="Installations";/**
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
 */const Mf={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},be=new xr(Of,xf,Mf);function Vc(n){return n instanceof he&&n.code.includes("request-failed")}/**
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
 */function Dc({projectId:n}){return`${Nf}/projects/${n}/installations`}function Nc(n){return{token:n.token,requestStatus:2,expiresIn:Ff(n.expiresIn),creationTime:Date.now()}}async function kc(n,t){const r=(await t.json()).error;return be.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Oc({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function Lf(n,{refreshToken:t}){const e=Oc(n);return e.append("Authorization",Uf(t)),e}async function xc(n){const t=await n();return t.status>=500&&t.status<600?n():t}function Ff(n){return Number(n.replace("s","000"))}function Uf(n){return`${Cc} ${n}`}/**
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
 */async function Bf({appConfig:n,heartbeatServiceProvider:t},{fid:e}){const r=Dc(n),s=Oc(n),o=t.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const a={fid:e,authVersion:Cc,appId:n.appId,sdkVersion:Pc},l={method:"POST",headers:s,body:JSON.stringify(a)},h=await xc(()=>fetch(r,l));if(h.ok){const f=await h.json();return{fid:f.fid||e,registrationStatus:2,refreshToken:f.refreshToken,authToken:Nc(f.authToken)}}else throw await kc("Create Installation",h)}/**
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
 */function Mc(n){return new Promise(t=>{setTimeout(t,n)})}/**
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
 */function qf(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const jf=/^[cdef][\w-]{21}$/,qs="";function $f(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const e=zf(n);return jf.test(e)?e:qs}catch{return qs}}function zf(n){return qf(n).substr(0,22)}/**
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
 */function Mr(n){return`${n.appName}!${n.appId}`}/**
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
 */const Lc=new Map;function Fc(n,t){const e=Mr(n);Uc(e,t),Gf(e,t)}function Uc(n,t){const e=Lc.get(n);if(e)for(const r of e)r(t)}function Gf(n,t){const e=Hf();e&&e.postMessage({key:n,fid:t}),Kf()}let ve=null;function Hf(){return!ve&&"BroadcastChannel"in self&&(ve=new BroadcastChannel("[Firebase] FID Change"),ve.onmessage=n=>{Uc(n.data.key,n.data.fid)}),ve}function Kf(){Lc.size===0&&ve&&(ve.close(),ve=null)}/**
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
 */const Wf="firebase-installations-database",Qf=1,Pe="firebase-installations-store";let Cs=null;function ci(){return Cs||(Cs=gc(Wf,Qf,{upgrade:(n,t)=>{switch(t){case 0:n.createObjectStore(Pe)}}})),Cs}async function Ir(n,t){const e=Mr(n),s=(await ci()).transaction(Pe,"readwrite"),o=s.objectStore(Pe),a=await o.get(e);return await o.put(t,e),await s.done,(!a||a.fid!==t.fid)&&Fc(n,t.fid),t}async function Bc(n){const t=Mr(n),r=(await ci()).transaction(Pe,"readwrite");await r.objectStore(Pe).delete(t),await r.done}async function Lr(n,t){const e=Mr(n),s=(await ci()).transaction(Pe,"readwrite"),o=s.objectStore(Pe),a=await o.get(e),l=t(a);return l===void 0?await o.delete(e):await o.put(l,e),await s.done,l&&(!a||a.fid!==l.fid)&&Fc(n,l.fid),l}/**
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
 */async function ui(n){let t;const e=await Lr(n.appConfig,r=>{const s=Yf(r),o=Jf(n,s);return t=o.registrationPromise,o.installationEntry});return e.fid===qs?{installationEntry:await t}:{installationEntry:e,registrationPromise:t}}function Yf(n){const t=n||{fid:$f(),registrationStatus:0};return qc(t)}function Jf(n,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(be.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const e={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=Xf(n,e);return{installationEntry:e,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Zf(n)}:{installationEntry:t}}async function Xf(n,t){try{const e=await Bf(n,t);return Ir(n.appConfig,e)}catch(e){throw Vc(e)&&e.customData.serverCode===409?await Bc(n.appConfig):await Ir(n.appConfig,{fid:t.fid,registrationStatus:0}),e}}async function Zf(n){let t=await ca(n.appConfig);for(;t.registrationStatus===1;)await Mc(100),t=await ca(n.appConfig);if(t.registrationStatus===0){const{installationEntry:e,registrationPromise:r}=await ui(n);return r||e}return t}function ca(n){return Lr(n,t=>{if(!t)throw be.create("installation-not-found");return qc(t)})}function qc(n){return td(n)?{fid:n.fid,registrationStatus:0}:n}function td(n){return n.registrationStatus===1&&n.registrationTime+bc<Date.now()}/**
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
 */async function ed({appConfig:n,heartbeatServiceProvider:t},e){const r=nd(n,e),s=Lf(n,e),o=t.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const a={installation:{sdkVersion:Pc,appId:n.appId}},l={method:"POST",headers:s,body:JSON.stringify(a)},h=await xc(()=>fetch(r,l));if(h.ok){const f=await h.json();return Nc(f)}else throw await kc("Generate Auth Token",h)}function nd(n,{fid:t}){return`${Dc(n)}/${t}/authTokens:generate`}/**
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
 */async function li(n,t=!1){let e;const r=await Lr(n.appConfig,o=>{if(!jc(o))throw be.create("not-registered");const a=o.authToken;if(!t&&id(a))return o;if(a.requestStatus===1)return e=rd(n,t),o;{if(!navigator.onLine)throw be.create("app-offline");const l=ad(o);return e=sd(n,l),l}});return e?await e:r.authToken}async function rd(n,t){let e=await ua(n.appConfig);for(;e.authToken.requestStatus===1;)await Mc(100),e=await ua(n.appConfig);const r=e.authToken;return r.requestStatus===0?li(n,t):r}function ua(n){return Lr(n,t=>{if(!jc(t))throw be.create("not-registered");const e=t.authToken;return cd(e)?{...t,authToken:{requestStatus:0}}:t})}async function sd(n,t){try{const e=await ed(n,t),r={...t,authToken:e};return await Ir(n.appConfig,r),e}catch(e){if(Vc(e)&&(e.customData.serverCode===401||e.customData.serverCode===404))await Bc(n.appConfig);else{const r={...t,authToken:{requestStatus:0}};await Ir(n.appConfig,r)}throw e}}function jc(n){return n!==void 0&&n.registrationStatus===2}function id(n){return n.requestStatus===2&&!od(n)}function od(n){const t=Date.now();return t<n.creationTime||n.creationTime+n.expiresIn<t+kf}function ad(n){const t={requestStatus:1,requestTime:Date.now()};return{...n,authToken:t}}function cd(n){return n.requestStatus===1&&n.requestTime+bc<Date.now()}/**
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
 */async function ud(n){const t=n,{installationEntry:e,registrationPromise:r}=await ui(t);return r?r.catch(console.error):li(t).catch(console.error),e.fid}/**
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
 */async function ld(n,t=!1){const e=n;return await hd(e),(await li(e,t)).token}async function hd(n){const{registrationPromise:t}=await ui(n);t&&await t}/**
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
 */function fd(n){if(!n||!n.options)throw Vs("App Configuration");if(!n.name)throw Vs("App Name");const t=["projectId","apiKey","appId"];for(const e of t)if(!n.options[e])throw Vs(e);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Vs(n){return be.create("missing-app-config-values",{valueName:n})}/**
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
 */const $c="installations",dd="installations-internal",md=n=>{const t=n.getProvider("app").getImmediate(),e=fd(t),r=Fn(t,"heartbeat");return{app:t,appConfig:e,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},pd=n=>{const t=n.getProvider("app").getImmediate(),e=Fn(t,$c).getImmediate();return{getId:()=>ud(e),getToken:s=>ld(e,s)}};function gd(){se(new zt($c,md,"PUBLIC")),se(new zt(dd,pd,"PRIVATE"))}gd();jt(Sc,ai);jt(Sc,ai,"esm2020");/**
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
 */const vr="analytics",_d="firebase_id",yd="origin",Ed=60*1e3,Td="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",hi="https://www.googletagmanager.com/gtag/js";/**
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
 */const Tt=new oi("@firebase/analytics");/**
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
 */const Id={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Ct=new xr("analytics","Analytics",Id);/**
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
 */function vd(n){if(!n.startsWith(hi)){const t=Ct.create("invalid-gtag-resource",{gtagURL:n});return Tt.warn(t.message),""}return n}function zc(n){return Promise.all(n.map(t=>t.catch(e=>e)))}function wd(n,t){let e;return window.trustedTypes&&(e=window.trustedTypes.createPolicy(n,t)),e}function Ad(n,t){const e=wd("firebase-js-sdk-policy",{createScriptURL:vd}),r=document.createElement("script"),s=`${hi}?l=${n}&id=${t}`;r.src=e?e==null?void 0:e.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Rd(n){let t=[];return Array.isArray(window[n])?t=window[n]:window[n]=t,t}async function Sd(n,t,e,r,s,o){const a=r[s];try{if(a)await t[a];else{const h=(await zc(e)).find(f=>f.measurementId===s);h&&await t[h.appId]}}catch(l){Tt.error(l)}n("config",s,o)}async function bd(n,t,e,r,s){try{let o=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const l=await zc(e);for(const h of a){const f=l.find(y=>y.measurementId===h),m=f&&t[f.appId];if(m)o.push(m);else{o=[];break}}}o.length===0&&(o=Object.values(t)),await Promise.all(o),n("event",r,s||{})}catch(o){Tt.error(o)}}function Pd(n,t,e,r){async function s(o,...a){try{if(o==="event"){const[l,h]=a;await bd(n,t,e,l,h)}else if(o==="config"){const[l,h]=a;await Sd(n,t,e,r,l,h)}else if(o==="consent"){const[l,h]=a;n("consent",l,h)}else if(o==="get"){const[l,h,f]=a;n("get",l,h,f)}else if(o==="set"){const[l]=a;n("set",l)}else n(o,...a)}catch(l){Tt.error(l)}}return s}function Cd(n,t,e,r,s){let o=function(...a){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(o=window[s]),window[s]=Pd(o,n,t,e),{gtagCore:o,wrappedGtag:window[s]}}function Vd(n){const t=window.document.getElementsByTagName("script");for(const e of Object.values(t))if(e.src&&e.src.includes(hi)&&e.src.includes(n))return e;return null}/**
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
 */const Dd=30,Nd=1e3;class kd{constructor(t={},e=Nd){this.throttleMetadata=t,this.intervalMillis=e}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,e){this.throttleMetadata[t]=e}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Gc=new kd;function Od(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function xd(n){var a;const{appId:t,apiKey:e}=n,r={method:"GET",headers:Od(e)},s=Td.replace("{app-id}",t),o=await fetch(s,r);if(o.status!==200&&o.status!==304){let l="";try{const h=await o.json();(a=h.error)!=null&&a.message&&(l=h.error.message)}catch{}throw Ct.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function Md(n,t=Gc,e){const{appId:r,apiKey:s,measurementId:o}=n.options;if(!r)throw Ct.create("no-app-id");if(!s){if(o)return{measurementId:o,appId:r};throw Ct.create("no-api-key")}const a=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new Ud;return setTimeout(async()=>{l.abort()},Ed),Hc({appId:r,apiKey:s,measurementId:o},a,l,t)}async function Hc(n,{throttleEndTimeMillis:t,backoffCount:e},r,s=Gc){var l;const{appId:o,measurementId:a}=n;try{await Ld(r,t)}catch(h){if(a)return Tt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:o,measurementId:a};throw h}try{const h=await xd(n);return s.deleteThrottleMetadata(o),h}catch(h){const f=h;if(!Fd(f)){if(s.deleteThrottleMetadata(o),a)return Tt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${f==null?void 0:f.message}]`),{appId:o,measurementId:a};throw h}const m=Number((l=f==null?void 0:f.customData)==null?void 0:l.httpStatus)===503?na(e,s.intervalMillis,Dd):na(e,s.intervalMillis),y={throttleEndTimeMillis:Date.now()+m,backoffCount:e+1};return s.setThrottleMetadata(o,y),Tt.debug(`Calling attemptFetch again in ${m} millis`),Hc(n,y,r,s)}}function Ld(n,t){return new Promise((e,r)=>{const s=Math.max(t-Date.now(),0),o=setTimeout(e,s);n.addEventListener(()=>{clearTimeout(o),r(Ct.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function Fd(n){if(!(n instanceof he)||!n.customData)return!1;const t=Number(n.customData.httpStatus);return t===429||t===500||t===503||t===504}class Ud{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function Bd(n,t,e,r,s){if(s&&s.global){n("event",e,r);return}else{const o=await t,a={...r,send_to:o};n("event",e,a)}}async function qd(n,t,e,r){if(r&&r.global){const s={};for(const o of Object.keys(e))s[`user_properties.${o}`]=e[o];return n("set",s),Promise.resolve()}else{const s=await t;n("config",s,{update:!0,user_properties:e})}}/**
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
 */async function jd(){if(Tc())try{await Ic()}catch(n){return Tt.warn(Ct.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return Tt.warn(Ct.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function $d(n,t,e,r,s,o,a){const l=Md(n);l.then(A=>{e[A.measurementId]=A.appId,n.options.measurementId&&A.measurementId!==n.options.measurementId&&Tt.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${A.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(A=>Tt.error(A)),t.push(l);const h=jd().then(A=>{if(A)return r.getId()}),[f,m]=await Promise.all([l,h]);Vd(o)||Ad(o,f.measurementId),s("js",new Date);const y=(a==null?void 0:a.config)??{};return y[yd]="firebase",y.update=!0,m!=null&&(y[_d]=m),s("config",f.measurementId,y),f.measurementId}/**
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
 */class zd{constructor(t){this.app=t}_delete(){return delete $e[this.app.options.appId],Promise.resolve()}}let $e={},la=[];const ha={};let Ds="dataLayer",Gd="gtag",fa,fi,da=!1;function Hd(){const n=[];if(yh()&&n.push("This is a browser extension environment."),Th()||n.push("Cookies are not available."),n.length>0){const t=n.map((r,s)=>`(${s+1}) ${r}`).join(" "),e=Ct.create("invalid-analytics-context",{errorInfo:t});Tt.warn(e.message)}}function Kd(n,t,e){Hd();const r=n.options.appId;if(!r)throw Ct.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)Tt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Ct.create("no-api-key");if($e[r]!=null)throw Ct.create("already-exists",{id:r});if(!da){Rd(Ds);const{wrappedGtag:o,gtagCore:a}=Cd($e,la,ha,Ds,Gd);fi=o,fa=a,da=!0}return $e[r]=$d(n,la,ha,t,fa,Ds,e),new zd(n)}function R_(n=wc()){n=wt(n);const t=Fn(n,vr);return t.isInitialized()?t.getImmediate():Wd(n)}function Wd(n,t={}){const e=Fn(n,vr);if(e.isInitialized()){const s=e.getImmediate();if(Se(t,e.getOptions()))return s;throw Ct.create("already-initialized")}return e.initialize({options:t})}function Qd(n,t,e){n=wt(n),qd(fi,$e[n.app.options.appId],t,e).catch(r=>Tt.error(r))}function Yd(n,t,e,r){n=wt(n),Bd(fi,$e[n.app.options.appId],t,e,r).catch(s=>Tt.error(s))}const ma="@firebase/analytics",pa="0.10.21";function Jd(){se(new zt(vr,(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("installations-internal").getImmediate();return Kd(r,s,e)},"PUBLIC")),se(new zt("analytics-internal",n,"PRIVATE")),jt(ma,pa),jt(ma,pa,"esm2020");function n(t){try{const e=t.getProvider(vr).getImmediate();return{logEvent:(r,s,o)=>Yd(e,r,s,o),setUserProperties:(r,s)=>Qd(e,r,s)}}catch(e){throw Ct.create("interop-component-reg-failed",{reason:e})}}}Jd();var ga=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ne,Kc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,p){function _(){}_.prototype=p.prototype,T.F=p.prototype,T.prototype=new _,T.prototype.constructor=T,T.D=function(I,E,w){for(var g=Array(arguments.length-2),At=2;At<arguments.length;At++)g[At-2]=arguments[At];return p.prototype[E].apply(I,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,p,_){_||(_=0);const I=Array(16);if(typeof p=="string")for(var E=0;E<16;++E)I[E]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(E=0;E<16;++E)I[E]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=T.g[0],_=T.g[1],E=T.g[2];let w=T.g[3],g;g=p+(w^_&(E^w))+I[0]+3614090360&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(E^p&(_^E))+I[1]+3905402710&4294967295,w=p+(g<<12&4294967295|g>>>20),g=E+(_^w&(p^_))+I[2]+606105819&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(p^E&(w^p))+I[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(w^_&(E^w))+I[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(E^p&(_^E))+I[5]+1200080426&4294967295,w=p+(g<<12&4294967295|g>>>20),g=E+(_^w&(p^_))+I[6]+2821735955&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(p^E&(w^p))+I[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(w^_&(E^w))+I[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(E^p&(_^E))+I[9]+2336552879&4294967295,w=p+(g<<12&4294967295|g>>>20),g=E+(_^w&(p^_))+I[10]+4294925233&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(p^E&(w^p))+I[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(w^_&(E^w))+I[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(E^p&(_^E))+I[13]+4254626195&4294967295,w=p+(g<<12&4294967295|g>>>20),g=E+(_^w&(p^_))+I[14]+2792965006&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(p^E&(w^p))+I[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(E^w&(_^E))+I[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(p^_))+I[6]+3225465664&4294967295,w=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(w^p))+I[11]+643717713&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(E^w))+I[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^w&(_^E))+I[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(p^_))+I[10]+38016083&4294967295,w=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(w^p))+I[15]+3634488961&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(E^w))+I[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^w&(_^E))+I[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(p^_))+I[14]+3275163606&4294967295,w=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(w^p))+I[3]+4107603335&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(E^w))+I[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^w&(_^E))+I[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(p^_))+I[2]+4243563512&4294967295,w=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(w^p))+I[7]+1735328473&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(E^w))+I[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(_^E^w)+I[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^E)+I[8]+2272392833&4294967295,w=p+(g<<11&4294967295|g>>>21),g=E+(w^p^_)+I[11]+1839030562&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^p)+I[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^w)+I[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^E)+I[4]+1272893353&4294967295,w=p+(g<<11&4294967295|g>>>21),g=E+(w^p^_)+I[7]+4139469664&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^p)+I[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^w)+I[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^E)+I[0]+3936430074&4294967295,w=p+(g<<11&4294967295|g>>>21),g=E+(w^p^_)+I[3]+3572445317&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^p)+I[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^w)+I[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^E)+I[12]+3873151461&4294967295,w=p+(g<<11&4294967295|g>>>21),g=E+(w^p^_)+I[15]+530742520&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^p)+I[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(E^(_|~w))+I[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~E))+I[7]+1126891415&4294967295,w=p+(g<<10&4294967295|g>>>22),g=E+(p^(w|~_))+I[14]+2878612391&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~p))+I[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~w))+I[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~E))+I[3]+2399980690&4294967295,w=p+(g<<10&4294967295|g>>>22),g=E+(p^(w|~_))+I[10]+4293915773&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~p))+I[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~w))+I[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~E))+I[15]+4264355552&4294967295,w=p+(g<<10&4294967295|g>>>22),g=E+(p^(w|~_))+I[6]+2734768916&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~p))+I[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~w))+I[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~E))+I[11]+3174756917&4294967295,w=p+(g<<10&4294967295|g>>>22),g=E+(p^(w|~_))+I[2]+718787259&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~p))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+p&4294967295,T.g[1]=T.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+w&4294967295}r.prototype.v=function(T,p){p===void 0&&(p=T.length);const _=p-this.blockSize,I=this.C;let E=this.h,w=0;for(;w<p;){if(E==0)for(;w<=_;)s(this,T,w),w+=this.blockSize;if(typeof T=="string"){for(;w<p;)if(I[E++]=T.charCodeAt(w++),E==this.blockSize){s(this,I),E=0;break}}else for(;w<p;)if(I[E++]=T[w++],E==this.blockSize){s(this,I),E=0;break}}this.h=E,this.o+=p},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var p=1;p<T.length-8;++p)T[p]=0;p=this.o*8;for(var _=T.length-8;_<T.length;++_)T[_]=p&255,p/=256;for(this.v(T),T=Array(16),p=0,_=0;_<4;++_)for(let I=0;I<32;I+=8)T[p++]=this.g[_]>>>I&255;return T};function o(T,p){var _=l;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=p(T)}function a(T,p){this.h=p;const _=[];let I=!0;for(let E=T.length-1;E>=0;E--){const w=T[E]|0;I&&w==p||(_[E]=w,I=!1)}this.g=_}var l={};function h(T){return-128<=T&&T<128?o(T,function(p){return new a([p|0],p<0?-1:0)}):new a([T|0],T<0?-1:0)}function f(T){if(isNaN(T)||!isFinite(T))return y;if(T<0)return k(f(-T));const p=[];let _=1;for(let I=0;T>=_;I++)p[I]=T/_|0,_*=4294967296;return new a(p,0)}function m(T,p){if(T.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(T.charAt(0)=="-")return k(m(T.substring(1),p));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=f(Math.pow(p,8));let I=y;for(let w=0;w<T.length;w+=8){var E=Math.min(8,T.length-w);const g=parseInt(T.substring(w,w+E),p);E<8?(E=f(Math.pow(p,E)),I=I.j(E).add(f(g))):(I=I.j(_),I=I.add(f(g)))}return I}var y=h(0),A=h(1),P=h(16777216);n=a.prototype,n.m=function(){if(x(this))return-k(this).m();let T=0,p=1;for(let _=0;_<this.g.length;_++){const I=this.i(_);T+=(I>=0?I:4294967296+I)*p,p*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(N(this))return"0";if(x(this))return"-"+k(this).toString(T);const p=f(Math.pow(T,6));var _=this;let I="";for(;;){const E=Vt(_,p).g;_=K(_,E.j(p));let w=((_.g.length>0?_.g[0]:_.h)>>>0).toString(T);if(_=E,N(_))return w+I;for(;w.length<6;)w="0"+w;I=w+I}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function N(T){if(T.h!=0)return!1;for(let p=0;p<T.g.length;p++)if(T.g[p]!=0)return!1;return!0}function x(T){return T.h==-1}n.l=function(T){return T=K(this,T),x(T)?-1:N(T)?0:1};function k(T){const p=T.g.length,_=[];for(let I=0;I<p;I++)_[I]=~T.g[I];return new a(_,~T.h).add(A)}n.abs=function(){return x(this)?k(this):this},n.add=function(T){const p=Math.max(this.g.length,T.g.length),_=[];let I=0;for(let E=0;E<=p;E++){let w=I+(this.i(E)&65535)+(T.i(E)&65535),g=(w>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);I=g>>>16,w&=65535,g&=65535,_[E]=g<<16|w}return new a(_,_[_.length-1]&-2147483648?-1:0)};function K(T,p){return T.add(k(p))}n.j=function(T){if(N(this)||N(T))return y;if(x(this))return x(T)?k(this).j(k(T)):k(k(this).j(T));if(x(T))return k(this.j(k(T)));if(this.l(P)<0&&T.l(P)<0)return f(this.m()*T.m());const p=this.g.length+T.g.length,_=[];for(var I=0;I<2*p;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<T.g.length;E++){const w=this.i(I)>>>16,g=this.i(I)&65535,At=T.i(E)>>>16,pe=T.i(E)&65535;_[2*I+2*E]+=g*pe,G(_,2*I+2*E),_[2*I+2*E+1]+=w*pe,G(_,2*I+2*E+1),_[2*I+2*E+1]+=g*At,G(_,2*I+2*E+1),_[2*I+2*E+2]+=w*At,G(_,2*I+2*E+2)}for(T=0;T<p;T++)_[T]=_[2*T+1]<<16|_[2*T];for(T=p;T<2*p;T++)_[T]=0;return new a(_,0)};function G(T,p){for(;(T[p]&65535)!=T[p];)T[p+1]+=T[p]>>>16,T[p]&=65535,p++}function X(T,p){this.g=T,this.h=p}function Vt(T,p){if(N(p))throw Error("division by zero");if(N(T))return new X(y,y);if(x(T))return p=Vt(k(T),p),new X(k(p.g),k(p.h));if(x(p))return p=Vt(T,k(p)),new X(k(p.g),p.h);if(T.g.length>30){if(x(T)||x(p))throw Error("slowDivide_ only works with positive integers.");for(var _=A,I=p;I.l(T)<=0;)_=ft(_),I=ft(I);var E=dt(_,1),w=dt(I,1);for(I=dt(I,2),_=dt(_,2);!N(I);){var g=w.add(I);g.l(T)<=0&&(E=E.add(_),w=g),I=dt(I,1),_=dt(_,1)}return p=K(T,E.j(p)),new X(E,p)}for(E=y;T.l(p)>=0;){for(_=Math.max(1,Math.floor(T.m()/p.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),w=f(_),g=w.j(p);x(g)||g.l(T)>0;)_-=I,w=f(_),g=w.j(p);N(w)&&(w=A),E=E.add(w),T=K(T,g)}return new X(E,T)}n.B=function(T){return Vt(this,T).h},n.and=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)&T.i(I);return new a(_,this.h&T.h)},n.or=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)|T.i(I);return new a(_,this.h|T.h)},n.xor=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)^T.i(I);return new a(_,this.h^T.h)};function ft(T){const p=T.g.length+1,_=[];for(let I=0;I<p;I++)_[I]=T.i(I)<<1|T.i(I-1)>>>31;return new a(_,T.h)}function dt(T,p){const _=p>>5;p%=32;const I=T.g.length-_,E=[];for(let w=0;w<I;w++)E[w]=p>0?T.i(w+_)>>>p|T.i(w+_+1)<<32-p:T.i(w+_);return new a(E,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Kc=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=m,ne=a}).apply(typeof ga<"u"?ga:typeof self<"u"?self:typeof window<"u"?window:{});var cr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Wc,wn,Qc,dr,js,Yc,Jc,Xc;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof cr=="object"&&cr];for(var c=0;c<i.length;++c){var u=i[c];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function s(i,c){if(c)t:{var u=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var v=i[d];if(!(v in u))break t;u=u[v]}i=i[i.length-1],d=u[i],c=c(d),c!=d&&c!=null&&t(u,i,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(c){var u=[],d;for(d in c)Object.prototype.hasOwnProperty.call(c,d)&&u.push([d,c[d]]);return u}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function h(i,c,u){return i.call.apply(i.bind,arguments)}function f(i,c,u){return f=h,f.apply(null,arguments)}function m(i,c){var u=Array.prototype.slice.call(arguments,1);return function(){var d=u.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function y(i,c){function u(){}u.prototype=c.prototype,i.Z=c.prototype,i.prototype=new u,i.prototype.constructor=i,i.Ob=function(d,v,R){for(var C=Array(arguments.length-2),U=2;U<arguments.length;U++)C[U-2]=arguments[U];return c.prototype[v].apply(d,C)}}var A=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function P(i){const c=i.length;if(c>0){const u=Array(c);for(let d=0;d<c;d++)u[d]=i[d];return u}return[]}function N(i,c){for(let d=1;d<arguments.length;d++){const v=arguments[d];var u=typeof v;if(u=u!="object"?u:v?Array.isArray(v)?"array":u:"null",u=="array"||u=="object"&&typeof v.length=="number"){u=i.length||0;const R=v.length||0;i.length=u+R;for(let C=0;C<R;C++)i[u+C]=v[C]}else i.push(v)}}class x{constructor(c,u){this.i=c,this.j=u,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function k(i){a.setTimeout(()=>{throw i},0)}function K(){var i=T;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class G{constructor(){this.h=this.g=null}add(c,u){const d=X.get();d.set(c,u),this.h?this.h.next=d:this.g=d,this.h=d}}var X=new x(()=>new Vt,i=>i.reset());class Vt{constructor(){this.next=this.g=this.h=null}set(c,u){this.h=c,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let ft,dt=!1,T=new G,p=()=>{const i=Promise.resolve(void 0);ft=()=>{i.then(_)}};function _(){for(var i;i=K();){try{i.h.call(i.g)}catch(u){k(u)}var c=X;c.j(i),c.h<100&&(c.h++,i.next=c.g,c.g=i)}dt=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var w=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};a.addEventListener("test",u,c),a.removeEventListener("test",u,c)}catch{}return i})();function g(i){return/^[\s\xa0]*$/.test(i)}function At(i,c){E.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,c)}y(At,E),At.prototype.init=function(i,c){const u=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget,c||(u=="mouseover"?c=i.fromElement:u=="mouseout"&&(c=i.toElement)),this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&At.Z.h.call(this)},At.prototype.h=function(){At.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var pe="closure_listenable_"+(Math.random()*1e6|0),Sl=0;function bl(i,c,u,d,v){this.listener=i,this.proxy=null,this.src=c,this.type=u,this.capture=!!d,this.ha=v,this.key=++Sl,this.da=this.fa=!1}function Kn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Wn(i,c,u){for(const d in i)c.call(u,i[d],d,i)}function Pl(i,c){for(const u in i)c.call(void 0,i[u],u,i)}function Xi(i){const c={};for(const u in i)c[u]=i[u];return c}const Zi="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function to(i,c){let u,d;for(let v=1;v<arguments.length;v++){d=arguments[v];for(u in d)i[u]=d[u];for(let R=0;R<Zi.length;R++)u=Zi[R],Object.prototype.hasOwnProperty.call(d,u)&&(i[u]=d[u])}}function Qn(i){this.src=i,this.g={},this.h=0}Qn.prototype.add=function(i,c,u,d,v){const R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);const C=ss(i,c,d,v);return C>-1?(c=i[C],u||(c.fa=!1)):(c=new bl(c,this.src,R,!!d,v),c.fa=u,i.push(c)),c};function rs(i,c){const u=c.type;if(u in i.g){var d=i.g[u],v=Array.prototype.indexOf.call(d,c,void 0),R;(R=v>=0)&&Array.prototype.splice.call(d,v,1),R&&(Kn(c),i.g[u].length==0&&(delete i.g[u],i.h--))}}function ss(i,c,u,d){for(let v=0;v<i.length;++v){const R=i[v];if(!R.da&&R.listener==c&&R.capture==!!u&&R.ha==d)return v}return-1}var is="closure_lm_"+(Math.random()*1e6|0),os={};function eo(i,c,u,d,v){if(Array.isArray(c)){for(let R=0;R<c.length;R++)eo(i,c[R],u,d,v);return null}return u=so(u),i&&i[pe]?i.J(c,u,l(d)?!!d.capture:!1,v):Cl(i,c,u,!1,d,v)}function Cl(i,c,u,d,v,R){if(!c)throw Error("Invalid event type");const C=l(v)?!!v.capture:!!v;let U=cs(i);if(U||(i[is]=U=new Qn(i)),u=U.add(c,u,d,C,R),u.proxy)return u;if(d=Vl(),u.proxy=d,d.src=i,d.listener=u,i.addEventListener)w||(v=C),v===void 0&&(v=!1),i.addEventListener(c.toString(),d,v);else if(i.attachEvent)i.attachEvent(ro(c.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Vl(){function i(u){return c.call(i.src,i.listener,u)}const c=Dl;return i}function no(i,c,u,d,v){if(Array.isArray(c))for(var R=0;R<c.length;R++)no(i,c[R],u,d,v);else d=l(d)?!!d.capture:!!d,u=so(u),i&&i[pe]?(i=i.i,R=String(c).toString(),R in i.g&&(c=i.g[R],u=ss(c,u,d,v),u>-1&&(Kn(c[u]),Array.prototype.splice.call(c,u,1),c.length==0&&(delete i.g[R],i.h--)))):i&&(i=cs(i))&&(c=i.g[c.toString()],i=-1,c&&(i=ss(c,u,d,v)),(u=i>-1?c[i]:null)&&as(u))}function as(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[pe])rs(c.i,i);else{var u=i.type,d=i.proxy;c.removeEventListener?c.removeEventListener(u,d,i.capture):c.detachEvent?c.detachEvent(ro(u),d):c.addListener&&c.removeListener&&c.removeListener(d),(u=cs(c))?(rs(u,i),u.h==0&&(u.src=null,c[is]=null)):Kn(i)}}}function ro(i){return i in os?os[i]:os[i]="on"+i}function Dl(i,c){if(i.da)i=!0;else{c=new At(c,this);const u=i.listener,d=i.ha||i.src;i.fa&&as(i),i=u.call(d,c)}return i}function cs(i){return i=i[is],i instanceof Qn?i:null}var us="__closure_events_fn_"+(Math.random()*1e9>>>0);function so(i){return typeof i=="function"?i:(i[us]||(i[us]=function(c){return i.handleEvent(c)}),i[us])}function mt(){I.call(this),this.i=new Qn(this),this.M=this,this.G=null}y(mt,I),mt.prototype[pe]=!0,mt.prototype.removeEventListener=function(i,c,u,d){no(this,i,c,u,d)};function yt(i,c){var u,d=i.G;if(d)for(u=[];d;d=d.G)u.push(d);if(i=i.M,d=c.type||c,typeof c=="string")c=new E(c,i);else if(c instanceof E)c.target=c.target||i;else{var v=c;c=new E(d,i),to(c,v)}v=!0;let R,C;if(u)for(C=u.length-1;C>=0;C--)R=c.g=u[C],v=Yn(R,d,!0,c)&&v;if(R=c.g=i,v=Yn(R,d,!0,c)&&v,v=Yn(R,d,!1,c)&&v,u)for(C=0;C<u.length;C++)R=c.g=u[C],v=Yn(R,d,!1,c)&&v}mt.prototype.N=function(){if(mt.Z.N.call(this),this.i){var i=this.i;for(const c in i.g){const u=i.g[c];for(let d=0;d<u.length;d++)Kn(u[d]);delete i.g[c],i.h--}}this.G=null},mt.prototype.J=function(i,c,u,d){return this.i.add(String(i),c,!1,u,d)},mt.prototype.K=function(i,c,u,d){return this.i.add(String(i),c,!0,u,d)};function Yn(i,c,u,d){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();let v=!0;for(let R=0;R<c.length;++R){const C=c[R];if(C&&!C.da&&C.capture==u){const U=C.listener,it=C.ha||C.src;C.fa&&rs(i.i,C),v=U.call(it,d)!==!1&&v}}return v&&!d.defaultPrevented}function Nl(i,c){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=f(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(i,c||0)}function io(i){i.g=Nl(()=>{i.g=null,i.i&&(i.i=!1,io(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class kl extends I{constructor(c,u){super(),this.m=c,this.l=u,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:io(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function on(i){I.call(this),this.h=i,this.g={}}y(on,I);var oo=[];function ao(i){Wn(i.g,function(c,u){this.g.hasOwnProperty(u)&&as(c)},i),i.g={}}on.prototype.N=function(){on.Z.N.call(this),ao(this)},on.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ls=a.JSON.stringify,Ol=a.JSON.parse,xl=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function co(){}function uo(){}var an={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function hs(){E.call(this,"d")}y(hs,E);function fs(){E.call(this,"c")}y(fs,E);var ge={},lo=null;function Jn(){return lo=lo||new mt}ge.Ia="serverreachability";function ho(i){E.call(this,ge.Ia,i)}y(ho,E);function cn(i){const c=Jn();yt(c,new ho(c))}ge.STAT_EVENT="statevent";function fo(i,c){E.call(this,ge.STAT_EVENT,i),this.stat=c}y(fo,E);function Et(i){const c=Jn();yt(c,new fo(c,i))}ge.Ja="timingevent";function mo(i,c){E.call(this,ge.Ja,i),this.size=c}y(mo,E);function un(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},c)}function ln(){this.g=!0}ln.prototype.ua=function(){this.g=!1};function Ml(i,c,u,d,v,R){i.info(function(){if(i.g)if(R){var C="",U=R.split("&");for(let H=0;H<U.length;H++){var it=U[H].split("=");if(it.length>1){const at=it[0];it=it[1];const xt=at.split("_");C=xt.length>=2&&xt[1]=="type"?C+(at+"="+it+"&"):C+(at+"=redacted&")}}}else C=null;else C=R;return"XMLHTTP REQ ("+d+") [attempt "+v+"]: "+c+`
`+u+`
`+C})}function Ll(i,c,u,d,v,R,C){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+v+"]: "+c+`
`+u+`
`+R+" "+C})}function Me(i,c,u,d){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+Ul(i,u)+(d?" "+d:"")})}function Fl(i,c){i.info(function(){return"TIMEOUT: "+c})}ln.prototype.info=function(){};function Ul(i,c){if(!i.g)return c;if(!c)return null;try{const R=JSON.parse(c);if(R){for(i=0;i<R.length;i++)if(Array.isArray(R[i])){var u=R[i];if(!(u.length<2)){var d=u[1];if(Array.isArray(d)&&!(d.length<1)){var v=d[0];if(v!="noop"&&v!="stop"&&v!="close")for(let C=1;C<d.length;C++)d[C]=""}}}}return ls(R)}catch{return c}}var Xn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},po={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},go;function ds(){}y(ds,co),ds.prototype.g=function(){return new XMLHttpRequest},go=new ds;function hn(i){return encodeURIComponent(String(i))}function Bl(i){var c=1;i=i.split(":");const u=[];for(;c>0&&i.length;)u.push(i.shift()),c--;return i.length&&u.push(i.join(":")),u}function Wt(i,c,u,d){this.j=i,this.i=c,this.l=u,this.S=d||1,this.V=new on(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new _o}function _o(){this.i=null,this.g="",this.h=!1}var yo={},ms={};function ps(i,c,u){i.M=1,i.A=tr(Ot(c)),i.u=u,i.R=!0,Eo(i,null)}function Eo(i,c){i.F=Date.now(),Zn(i),i.B=Ot(i.A);var u=i.B,d=i.S;Array.isArray(d)||(d=[String(d)]),No(u.i,"t",d),i.C=0,u=i.j.L,i.h=new _o,i.g=Yo(i.j,u?c:null,!i.u),i.P>0&&(i.O=new kl(f(i.Y,i,i.g),i.P)),c=i.V,u=i.g,d=i.ba;var v="readystatechange";Array.isArray(v)||(v&&(oo[0]=v.toString()),v=oo);for(let R=0;R<v.length;R++){const C=eo(u,v[R],d||c.handleEvent,!1,c.h||c);if(!C)break;c.g[C.key]=C}c=i.J?Xi(i.J):{},i.u?(i.v||(i.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,c)):(i.v="GET",i.g.ea(i.B,i.v,null,c)),cn(),Ml(i.i,i.v,i.B,i.l,i.S,i.u)}Wt.prototype.ba=function(i){i=i.target;const c=this.O;c&&Jt(i)==3?c.j():this.Y(i)},Wt.prototype.Y=function(i){try{if(i==this.g)t:{const U=Jt(this.g),it=this.g.ya(),H=this.g.ca();if(!(U<3)&&(U!=3||this.g&&(this.h.h||this.g.la()||Uo(this.g)))){this.K||U!=4||it==7||(it==8||H<=0?cn(3):cn(2)),gs(this);var c=this.g.ca();this.X=c;var u=ql(this);if(this.o=c==200,Ll(this.i,this.v,this.B,this.l,this.S,U,c),this.o){if(this.U&&!this.L){e:{if(this.g){var d,v=this.g;if((d=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(d)){var R=d;break e}}R=null}if(i=R)Me(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,_s(this,i);else{this.o=!1,this.m=3,Et(12),_e(this),fn(this);break t}}if(this.R){i=!0;let at;for(;!this.K&&this.C<u.length;)if(at=jl(this,u),at==ms){U==4&&(this.m=4,Et(14),i=!1),Me(this.i,this.l,null,"[Incomplete Response]");break}else if(at==yo){this.m=4,Et(15),Me(this.i,this.l,u,"[Invalid Chunk]"),i=!1;break}else Me(this.i,this.l,at,null),_s(this,at);if(To(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),U!=4||u.length!=0||this.h.h||(this.m=1,Et(16),i=!1),this.o=this.o&&i,!i)Me(this.i,this.l,u,"[Invalid Chunked Response]"),_e(this),fn(this);else if(u.length>0&&!this.W){this.W=!0;var C=this.j;C.g==this&&C.aa&&!C.P&&(C.j.info("Great, no buffering proxy detected. Bytes received: "+u.length),Rs(C),C.P=!0,Et(11))}}else Me(this.i,this.l,u,null),_s(this,u);U==4&&_e(this),this.o&&!this.K&&(U==4?Ho(this.j,this):(this.o=!1,Zn(this)))}else nh(this.g),c==400&&u.indexOf("Unknown SID")>0?(this.m=3,Et(12)):(this.m=0,Et(13)),_e(this),fn(this)}}}catch{}finally{}};function ql(i){if(!To(i))return i.g.la();const c=Uo(i.g);if(c==="")return"";let u="";const d=c.length,v=Jt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return _e(i),fn(i),"";i.h.i=new a.TextDecoder}for(let R=0;R<d;R++)i.h.h=!0,u+=i.h.i.decode(c[R],{stream:!(v&&R==d-1)});return c.length=0,i.h.g+=u,i.C=0,i.h.g}function To(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function jl(i,c){var u=i.C,d=c.indexOf(`
`,u);return d==-1?ms:(u=Number(c.substring(u,d)),isNaN(u)?yo:(d+=1,d+u>c.length?ms:(c=c.slice(d,d+u),i.C=d+u,c)))}Wt.prototype.cancel=function(){this.K=!0,_e(this)};function Zn(i){i.T=Date.now()+i.H,Io(i,i.H)}function Io(i,c){if(i.D!=null)throw Error("WatchDog timer not null");i.D=un(f(i.aa,i),c)}function gs(i){i.D&&(a.clearTimeout(i.D),i.D=null)}Wt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Fl(this.i,this.B),this.M!=2&&(cn(),Et(17)),_e(this),this.m=2,fn(this)):Io(this,this.T-i)};function fn(i){i.j.I==0||i.K||Ho(i.j,i)}function _e(i){gs(i);var c=i.O;c&&typeof c.dispose=="function"&&c.dispose(),i.O=null,ao(i.V),i.g&&(c=i.g,i.g=null,c.abort(),c.dispose())}function _s(i,c){try{var u=i.j;if(u.I!=0&&(u.g==i||ys(u.h,i))){if(!i.L&&ys(u.h,i)&&u.I==3){try{var d=u.Ba.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var v=d;if(v[0]==0){t:if(!u.v){if(u.g)if(u.g.F+3e3<i.F)ir(u),rr(u);else break t;As(u),Et(18)}}else u.xa=v[1],0<u.xa-u.K&&v[2]<37500&&u.F&&u.A==0&&!u.C&&(u.C=un(f(u.Va,u),6e3));Ao(u.h)<=1&&u.ta&&(u.ta=void 0)}else Ee(u,11)}else if((i.L||u.g==i)&&ir(u),!g(c))for(v=u.Ba.g.parse(c),c=0;c<v.length;c++){let H=v[c];const at=H[0];if(!(at<=u.K))if(u.K=at,H=H[1],u.I==2)if(H[0]=="c"){u.M=H[1],u.ba=H[2];const xt=H[3];xt!=null&&(u.ka=xt,u.j.info("VER="+u.ka));const Te=H[4];Te!=null&&(u.za=Te,u.j.info("SVER="+u.za));const Xt=H[5];Xt!=null&&typeof Xt=="number"&&Xt>0&&(d=1.5*Xt,u.O=d,u.j.info("backChannelRequestTimeoutMs_="+d)),d=u;const Zt=i.g;if(Zt){const ar=Zt.g?Zt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ar){var R=d.h;R.g||ar.indexOf("spdy")==-1&&ar.indexOf("quic")==-1&&ar.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Es(R,R.h),R.h=null))}if(d.G){const Ss=Zt.g?Zt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ss&&(d.wa=Ss,Q(d.J,d.G,Ss))}}u.I=3,u.l&&u.l.ra(),u.aa&&(u.T=Date.now()-i.F,u.j.info("Handshake RTT: "+u.T+"ms")),d=u;var C=i;if(d.na=Qo(d,d.L?d.ba:null,d.W),C.L){Ro(d.h,C);var U=C,it=d.O;it&&(U.H=it),U.D&&(gs(U),Zn(U)),d.g=C}else zo(d);u.i.length>0&&sr(u)}else H[0]!="stop"&&H[0]!="close"||Ee(u,7);else u.I==3&&(H[0]=="stop"||H[0]=="close"?H[0]=="stop"?Ee(u,7):ws(u):H[0]!="noop"&&u.l&&u.l.qa(H),u.A=0)}}cn(4)}catch{}}var $l=class{constructor(i,c){this.g=i,this.map=c}};function vo(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function wo(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Ao(i){return i.h?1:i.g?i.g.size:0}function ys(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function Es(i,c){i.g?i.g.add(c):i.h=c}function Ro(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}vo.prototype.cancel=function(){if(this.i=So(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function So(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const u of i.g.values())c=c.concat(u.G);return c}return P(i.i)}var bo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function zl(i,c){if(i){i=i.split("&");for(let u=0;u<i.length;u++){const d=i[u].indexOf("=");let v,R=null;d>=0?(v=i[u].substring(0,d),R=i[u].substring(d+1)):v=i[u],c(v,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Qt(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;i instanceof Qt?(this.l=i.l,dn(this,i.j),this.o=i.o,this.g=i.g,mn(this,i.u),this.h=i.h,Ts(this,ko(i.i)),this.m=i.m):i&&(c=String(i).match(bo))?(this.l=!1,dn(this,c[1]||"",!0),this.o=pn(c[2]||""),this.g=pn(c[3]||"",!0),mn(this,c[4]),this.h=pn(c[5]||"",!0),Ts(this,c[6]||"",!0),this.m=pn(c[7]||"")):(this.l=!1,this.i=new _n(null,this.l))}Qt.prototype.toString=function(){const i=[];var c=this.j;c&&i.push(gn(c,Po,!0),":");var u=this.g;return(u||c=="file")&&(i.push("//"),(c=this.o)&&i.push(gn(c,Po,!0),"@"),i.push(hn(u).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.u,u!=null&&i.push(":",String(u))),(u=this.h)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(gn(u,u.charAt(0)=="/"?Kl:Hl,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",gn(u,Ql)),i.join("")},Qt.prototype.resolve=function(i){const c=Ot(this);let u=!!i.j;u?dn(c,i.j):u=!!i.o,u?c.o=i.o:u=!!i.g,u?c.g=i.g:u=i.u!=null;var d=i.h;if(u)mn(c,i.u);else if(u=!!i.h){if(d.charAt(0)!="/")if(this.g&&!this.h)d="/"+d;else{var v=c.h.lastIndexOf("/");v!=-1&&(d=c.h.slice(0,v+1)+d)}if(v=d,v==".."||v==".")d="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){d=v.lastIndexOf("/",0)==0,v=v.split("/");const R=[];for(let C=0;C<v.length;){const U=v[C++];U=="."?d&&C==v.length&&R.push(""):U==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),d&&C==v.length&&R.push("")):(R.push(U),d=!0)}d=R.join("/")}else d=v}return u?c.h=d:u=i.i.toString()!=="",u?Ts(c,ko(i.i)):u=!!i.m,u&&(c.m=i.m),c};function Ot(i){return new Qt(i)}function dn(i,c,u){i.j=u?pn(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function mn(i,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);i.u=c}else i.u=null}function Ts(i,c,u){c instanceof _n?(i.i=c,Yl(i.i,i.l)):(u||(c=gn(c,Wl)),i.i=new _n(c,i.l))}function Q(i,c,u){i.i.set(c,u)}function tr(i){return Q(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function pn(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function gn(i,c,u){return typeof i=="string"?(i=encodeURI(i).replace(c,Gl),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Gl(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Po=/[#\/\?@]/g,Hl=/[#\?:]/g,Kl=/[#\?]/g,Wl=/[#\?@]/g,Ql=/#/g;function _n(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function ye(i){i.g||(i.g=new Map,i.h=0,i.i&&zl(i.i,function(c,u){i.add(decodeURIComponent(c.replace(/\+/g," ")),u)}))}n=_n.prototype,n.add=function(i,c){ye(this),this.i=null,i=Le(this,i);let u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(c),this.h+=1,this};function Co(i,c){ye(i),c=Le(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function Vo(i,c){return ye(i),c=Le(i,c),i.g.has(c)}n.forEach=function(i,c){ye(this),this.g.forEach(function(u,d){u.forEach(function(v){i.call(c,v,d,this)},this)},this)};function Do(i,c){ye(i);let u=[];if(typeof c=="string")Vo(i,c)&&(u=u.concat(i.g.get(Le(i,c))));else for(i=Array.from(i.g.values()),c=0;c<i.length;c++)u=u.concat(i[c]);return u}n.set=function(i,c){return ye(this),this.i=null,i=Le(this,i),Vo(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},n.get=function(i,c){return i?(i=Do(this,i),i.length>0?String(i[0]):c):c};function No(i,c,u){Co(i,c),u.length>0&&(i.i=null,i.g.set(Le(i,c),P(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(let d=0;d<c.length;d++){var u=c[d];const v=hn(u);u=Do(this,u);for(let R=0;R<u.length;R++){let C=v;u[R]!==""&&(C+="="+hn(u[R])),i.push(C)}}return this.i=i.join("&")};function ko(i){const c=new _n;return c.i=i.i,i.g&&(c.g=new Map(i.g),c.h=i.h),c}function Le(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function Yl(i,c){c&&!i.j&&(ye(i),i.i=null,i.g.forEach(function(u,d){const v=d.toLowerCase();d!=v&&(Co(this,d),No(this,v,u))},i)),i.j=c}function Jl(i,c){const u=new ln;if(a.Image){const d=new Image;d.onload=m(Yt,u,"TestLoadImage: loaded",!0,c,d),d.onerror=m(Yt,u,"TestLoadImage: error",!1,c,d),d.onabort=m(Yt,u,"TestLoadImage: abort",!1,c,d),d.ontimeout=m(Yt,u,"TestLoadImage: timeout",!1,c,d),a.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else c(!1)}function Xl(i,c){const u=new ln,d=new AbortController,v=setTimeout(()=>{d.abort(),Yt(u,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:d.signal}).then(R=>{clearTimeout(v),R.ok?Yt(u,"TestPingServer: ok",!0,c):Yt(u,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(v),Yt(u,"TestPingServer: error",!1,c)})}function Yt(i,c,u,d,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),d(u)}catch{}}function Zl(){this.g=new xl}function Is(i){this.i=i.Sb||null,this.h=i.ab||!1}y(Is,co),Is.prototype.g=function(){return new er(this.i,this.h)};function er(i,c){mt.call(this),this.H=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}y(er,mt),n=er.prototype,n.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=c,this.readyState=1,En(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(c.body=i),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,yn(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,En(this)),this.g&&(this.readyState=3,En(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Oo(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function Oo(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?yn(this):En(this),this.readyState==3&&Oo(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,yn(this))},n.Na=function(i){this.g&&(this.response=i,yn(this))},n.ga=function(){this.g&&yn(this)};function yn(i){i.readyState=4,i.l=null,i.j=null,i.B=null,En(i)}n.setRequestHeader=function(i,c){this.A.append(i,c)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var u=c.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=c.next();return i.join(`\r
`)};function En(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(er.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function xo(i){let c="";return Wn(i,function(u,d){c+=d,c+=":",c+=u,c+=`\r
`}),c}function vs(i,c,u){t:{for(d in u){var d=!1;break t}d=!0}d||(u=xo(u),typeof i=="string"?u!=null&&hn(u):Q(i,c,u))}function Z(i){mt.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}y(Z,mt);var th=/^https?$/i,eh=["POST","PUT"];n=Z.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,c,u,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():go.g(),this.g.onreadystatechange=A(f(this.Ca,this));try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(R){Mo(this,R);return}if(i=u||"",u=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var v in d)u.set(v,d[v]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const R of d.keys())u.set(R,d.get(R));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(u.keys()).find(R=>R.toLowerCase()=="content-type"),v=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(eh,c,void 0)>=0)||d||v||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,C]of u)this.g.setRequestHeader(R,C);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(R){Mo(this,R)}};function Mo(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.o=5,Lo(i),nr(i)}function Lo(i){i.A||(i.A=!0,yt(i,"complete"),yt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,yt(this,"complete"),yt(this,"abort"),nr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),nr(this,!0)),Z.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Fo(this):this.Xa())},n.Xa=function(){Fo(this)};function Fo(i){if(i.h&&typeof o<"u"){if(i.v&&Jt(i)==4)setTimeout(i.Ca.bind(i),0);else if(yt(i,"readystatechange"),Jt(i)==4){i.h=!1;try{const R=i.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var u;if(!(u=c)){var d;if(d=R===0){let C=String(i.D).match(bo)[1]||null;!C&&a.self&&a.self.location&&(C=a.self.location.protocol.slice(0,-1)),d=!th.test(C?C.toLowerCase():"")}u=d}if(u)yt(i,"complete"),yt(i,"success");else{i.o=6;try{var v=Jt(i)>2?i.g.statusText:""}catch{v=""}i.l=v+" ["+i.ca()+"]",Lo(i)}}finally{nr(i)}}}}function nr(i,c){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const u=i.g;i.g=null,c||yt(i,"ready");try{u.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Jt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return Jt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),Ol(c)}};function Uo(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function nh(i){const c={};i=(i.g&&Jt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(g(i[d]))continue;var u=Bl(i[d]);const v=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const R=c[v]||[];c[v]=R,R.push(u)}Pl(c,function(d){return d.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Tn(i,c,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||c}function Bo(i){this.za=0,this.i=[],this.j=new ln,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Tn("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Tn("baseRetryDelayMs",5e3,i),this.Za=Tn("retryDelaySeedMs",1e4,i),this.Ta=Tn("forwardChannelMaxRetries",2,i),this.va=Tn("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new vo(i&&i.concurrentRequestLimit),this.Ba=new Zl,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Bo.prototype,n.ka=8,n.I=1,n.connect=function(i,c,u,d){Et(0),this.W=i,this.H=c||{},u&&d!==void 0&&(this.H.OSID=u,this.H.OAID=d),this.F=this.X,this.J=Qo(this,null,this.W),sr(this)};function ws(i){if(qo(i),i.I==3){var c=i.V++,u=Ot(i.J);if(Q(u,"SID",i.M),Q(u,"RID",c),Q(u,"TYPE","terminate"),In(i,u),c=new Wt(i,i.j,c),c.M=2,c.A=tr(Ot(u)),u=!1,a.navigator&&a.navigator.sendBeacon)try{u=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!u&&a.Image&&(new Image().src=c.A,u=!0),u||(c.g=Yo(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Zn(c)}Wo(i)}function rr(i){i.g&&(Rs(i),i.g.cancel(),i.g=null)}function qo(i){rr(i),i.v&&(a.clearTimeout(i.v),i.v=null),ir(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function sr(i){if(!wo(i.h)&&!i.m){i.m=!0;var c=i.Ea;ft||p(),dt||(ft(),dt=!0),T.add(c,i),i.D=0}}function rh(i,c){return Ao(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=c.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=un(f(i.Ea,i,c),Ko(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const v=new Wt(this,this.j,i);let R=this.o;if(this.U&&(R?(R=Xi(R),to(R,this.U)):R=this.U),this.u!==null||this.R||(v.J=R,R=null),this.S)t:{for(var c=0,u=0;u<this.i.length;u++){e:{var d=this.i[u];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,c>4096){c=u;break t}if(c===4096||u===this.i.length-1){c=u+1;break t}}c=1e3}else c=1e3;c=$o(this,v,c),u=Ot(this.J),Q(u,"RID",i),Q(u,"CVER",22),this.G&&Q(u,"X-HTTP-Session-Id",this.G),In(this,u),R&&(this.R?c="headers="+hn(xo(R))+"&"+c:this.u&&vs(u,this.u,R)),Es(this.h,v),this.Ra&&Q(u,"TYPE","init"),this.S?(Q(u,"$req",c),Q(u,"SID","null"),v.U=!0,ps(v,u,null)):ps(v,u,c),this.I=2}}else this.I==3&&(i?jo(this,i):this.i.length==0||wo(this.h)||jo(this))};function jo(i,c){var u;c?u=c.l:u=i.V++;const d=Ot(i.J);Q(d,"SID",i.M),Q(d,"RID",u),Q(d,"AID",i.K),In(i,d),i.u&&i.o&&vs(d,i.u,i.o),u=new Wt(i,i.j,u,i.D+1),i.u===null&&(u.J=i.o),c&&(i.i=c.G.concat(i.i)),c=$o(i,u,1e3),u.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),Es(i.h,u),ps(u,d,c)}function In(i,c){i.H&&Wn(i.H,function(u,d){Q(c,d,u)}),i.l&&Wn({},function(u,d){Q(c,d,u)})}function $o(i,c,u){u=Math.min(i.i.length,u);const d=i.l?f(i.l.Ka,i.l,i):null;t:{var v=i.i;let U=-1;for(;;){const it=["count="+u];U==-1?u>0?(U=v[0].g,it.push("ofs="+U)):U=0:it.push("ofs="+U);let H=!0;for(let at=0;at<u;at++){var R=v[at].g;const xt=v[at].map;if(R-=U,R<0)U=Math.max(0,v[at].g-100),H=!1;else try{R="req"+R+"_"||"";try{var C=xt instanceof Map?xt:Object.entries(xt);for(const[Te,Xt]of C){let Zt=Xt;l(Xt)&&(Zt=ls(Xt)),it.push(R+Te+"="+encodeURIComponent(Zt))}}catch(Te){throw it.push(R+"type="+encodeURIComponent("_badmap")),Te}}catch{d&&d(xt)}}if(H){C=it.join("&");break t}}C=void 0}return i=i.i.splice(0,u),c.G=i,C}function zo(i){if(!i.g&&!i.v){i.Y=1;var c=i.Da;ft||p(),dt||(ft(),dt=!0),T.add(c,i),i.A=0}}function As(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=un(f(i.Da,i),Ko(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,Go(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=un(f(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Et(10),rr(this),Go(this))};function Rs(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function Go(i){i.g=new Wt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var c=Ot(i.na);Q(c,"RID","rpc"),Q(c,"SID",i.M),Q(c,"AID",i.K),Q(c,"CI",i.F?"0":"1"),!i.F&&i.ia&&Q(c,"TO",i.ia),Q(c,"TYPE","xmlhttp"),In(i,c),i.u&&i.o&&vs(c,i.u,i.o),i.O&&(i.g.H=i.O);var u=i.g;i=i.ba,u.M=1,u.A=tr(Ot(c)),u.u=null,u.R=!0,Eo(u,i)}n.Va=function(){this.C!=null&&(this.C=null,rr(this),As(this),Et(19))};function ir(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function Ho(i,c){var u=null;if(i.g==c){ir(i),Rs(i),i.g=null;var d=2}else if(ys(i.h,c))u=c.G,Ro(i.h,c),d=1;else return;if(i.I!=0){if(c.o)if(d==1){u=c.u?c.u.length:0,c=Date.now()-c.F;var v=i.D;d=Jn(),yt(d,new mo(d,u)),sr(i)}else zo(i);else if(v=c.m,v==3||v==0&&c.X>0||!(d==1&&rh(i,c)||d==2&&As(i)))switch(u&&u.length>0&&(c=i.h,c.i=c.i.concat(u)),v){case 1:Ee(i,5);break;case 4:Ee(i,10);break;case 3:Ee(i,6);break;default:Ee(i,2)}}}function Ko(i,c){let u=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(u*=2),u*c}function Ee(i,c){if(i.j.info("Error code "+c),c==2){var u=f(i.bb,i),d=i.Ua;const v=!d;d=new Qt(d||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||dn(d,"https"),tr(d),v?Jl(d.toString(),u):Xl(d.toString(),u)}else Et(2);i.I=0,i.l&&i.l.pa(c),Wo(i),qo(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))};function Wo(i){if(i.I=0,i.ja=[],i.l){const c=So(i.h);(c.length!=0||i.i.length!=0)&&(N(i.ja,c),N(i.ja,i.i),i.h.i.length=0,P(i.i),i.i.length=0),i.l.oa()}}function Qo(i,c,u){var d=u instanceof Qt?Ot(u):new Qt(u);if(d.g!="")c&&(d.g=c+"."+d.g),mn(d,d.u);else{var v=a.location;d=v.protocol,c=c?c+"."+v.hostname:v.hostname,v=+v.port;const R=new Qt(null);d&&dn(R,d),c&&(R.g=c),v&&mn(R,v),u&&(R.h=u),d=R}return u=i.G,c=i.wa,u&&c&&Q(d,u,c),Q(d,"VER",i.ka),In(i,d),d}function Yo(i,c,u){if(c&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Aa&&!i.ma?new Z(new Is({ab:u})):new Z(i.ma),c.Fa(i.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Jo(){}n=Jo.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function or(){}or.prototype.g=function(i,c){return new bt(i,c)};function bt(i,c){mt.call(this),this.g=new Bo(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(i?i["X-WebChannel-Client-Profile"]=c.sa:i={"X-WebChannel-Client-Profile":c.sa}),this.g.U=i,(i=c&&c.Qb)&&!g(i)&&(this.g.u=i),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!g(c)&&(this.g.G=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new Fe(this)}y(bt,mt),bt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},bt.prototype.close=function(){ws(this.g)},bt.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.v&&(u={},u.__data__=ls(i),i=u);c.i.push(new $l(c.Ya++,i)),c.I==3&&sr(c)},bt.prototype.N=function(){this.g.l=null,delete this.j,ws(this.g),delete this.g,bt.Z.N.call(this)};function Xo(i){hs.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){t:{for(const u in c){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}y(Xo,hs);function Zo(){fs.call(this),this.status=1}y(Zo,fs);function Fe(i){this.g=i}y(Fe,Jo),Fe.prototype.ra=function(){yt(this.g,"a")},Fe.prototype.qa=function(i){yt(this.g,new Xo(i))},Fe.prototype.pa=function(i){yt(this.g,new Zo)},Fe.prototype.oa=function(){yt(this.g,"b")},or.prototype.createWebChannel=or.prototype.g,bt.prototype.send=bt.prototype.o,bt.prototype.open=bt.prototype.m,bt.prototype.close=bt.prototype.close,Xc=function(){return new or},Jc=function(){return Jn()},Yc=ge,js={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Xn.NO_ERROR=0,Xn.TIMEOUT=8,Xn.HTTP_ERROR=6,dr=Xn,po.COMPLETE="complete",Qc=po,uo.EventType=an,an.OPEN="a",an.CLOSE="b",an.ERROR="c",an.MESSAGE="d",mt.prototype.listen=mt.prototype.J,wn=uo,Z.prototype.listenOnce=Z.prototype.K,Z.prototype.getLastError=Z.prototype.Ha,Z.prototype.getLastErrorCode=Z.prototype.ya,Z.prototype.getStatus=Z.prototype.ca,Z.prototype.getResponseJson=Z.prototype.La,Z.prototype.getResponseText=Z.prototype.la,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Fa,Wc=Z}).apply(typeof cr<"u"?cr:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
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
 */let Ze="12.11.0";function Xd(n){Ze=n}/**
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
 */const Ce=new oi("@firebase/firestore");function Ue(){return Ce.logLevel}function D(n,...t){if(Ce.logLevel<=$.DEBUG){const e=t.map(di);Ce.debug(`Firestore (${Ze}): ${n}`,...e)}}function Ht(n,...t){if(Ce.logLevel<=$.ERROR){const e=t.map(di);Ce.error(`Firestore (${Ze}): ${n}`,...e)}}function Ve(n,...t){if(Ce.logLevel<=$.WARN){const e=t.map(di);Ce.warn(`Firestore (${Ze}): ${n}`,...e)}}function di(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
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
 */function M(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Zc(n,r,e)}function Zc(n,t,e){let r=`FIRESTORE (${Ze}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Ht(r),new Error(r)}function z(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||Zc(t,s,r)}function F(n,t){return n}/**
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
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends he{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class $t{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
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
 */class tu{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Zd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(gt.UNAUTHENTICATED)))}shutdown(){}}class tm{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class em{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){z(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new $t;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new $t,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const h=o;t.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},l=h=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((h=>l(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new $t)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(z(typeof r.accessToken=="string",31837,{l:r}),new tu(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return z(t===null||typeof t=="string",2055,{h:t}),new gt(t)}}class nm{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class rm{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new nm(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(gt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class _a{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class sm{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,_f(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){z(this.o===void 0,3512);const r=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>r(o)))};const s=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new _a(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(z(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new _a(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function im(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
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
 */class mi{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=im(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function $s(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return Ns(s)===Ns(o)?B(s,o):Ns(s)?1:-1}return B(n.length,t.length)}const om=55296,am=57343;function Ns(n){const t=n.charCodeAt(0);return t>=om&&t<=am}function He(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
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
 */const ya="__name__";class Mt{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&M(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Mt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Mt?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=Mt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=Mt.isNumericId(t),s=Mt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Mt.extractNumericId(t).compare(Mt.extractNumericId(e)):$s(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ne.fromString(t.substring(4,t.length-2))}}class W extends Mt{construct(t,e,r){return new W(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new V(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new W(e)}static emptyPath(){return new W([])}}const cm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class lt extends Mt{construct(t,e,r){return new lt(t,e,r)}static isValidIdentifier(t){return cm.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),lt.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ya}static keyField(){return new lt([ya])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new V(S.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new V(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new V(S.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new lt(e)}static emptyPath(){return new lt([])}}/**
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
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(W.fromString(t))}static fromName(t){return new O(W.fromString(t).popFirst(5))}static empty(){return new O(W.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&W.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return W.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new W(t.slice()))}}/**
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
 */function eu(n,t,e){if(!e)throw new V(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function um(n,t,e,r){if(t===!0&&r===!0)throw new V(S.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Ea(n){if(!O.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ta(n){if(O.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function nu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Fr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function It(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new V(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Fr(n);throw new V(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
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
 */function st(n,t){const e={typeString:n};return t&&(e.value=t),e}function Un(n,t){if(!nu(n))throw new V(S.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new V(S.INVALID_ARGUMENT,e);return!0}/**
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
 */const Ia=-62135596800,va=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(t){return Y.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*va);return new Y(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Ia)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/va}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Un(t,Y._jsonSchema))return new Y(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Ia;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:st("string",Y._jsonSchemaVersion),seconds:st("number"),nanoseconds:st("number")};/**
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
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new Y(0,0))}static max(){return new L(new Y(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Nn=-1;function lm(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=L.fromTimestamp(r===1e9?new Y(e+1,0):new Y(e,r));return new ie(s,O.empty(),t)}function hm(n){return new ie(n.readTime,n.key,Nn)}class ie{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new ie(L.min(),O.empty(),Nn)}static max(){return new ie(L.max(),O.empty(),Nn)}}function fm(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=O.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
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
 */const dm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class mm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function tn(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==dm)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class b{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new b(((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof b?e:b.resolve(e)}catch(e){return b.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):b.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):b.reject(e)}static resolve(t){return new b(((e,r)=>{e(t)}))}static reject(t){return new b(((e,r)=>{r(t)}))}static waitFor(t){return new b(((e,r)=>{let s=0,o=0,a=!1;t.forEach((l=>{++s,l.next((()=>{++o,a&&o===s&&e()}),(h=>r(h)))})),a=!0,o===s&&e()}))}static or(t){let e=b.resolve(!1);for(const r of t)e=e.next((s=>s?b.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,o)=>{r.push(e.call(this,s,o))})),this.waitFor(r)}static mapArray(t,e){return new b(((r,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next((m=>{a[f]=m,++l,l===o&&r(a)}),(m=>s(m)))}}))}static doWhile(t,e){return new b(((r,s)=>{const o=()=>{t()===!0?e().next((()=>{o()}),s):r()};o()}))}}function pm(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function en(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Ur{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ur.ce=-1;/**
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
 */const pi=-1;function Br(n){return n==null}function wr(n){return n===0&&1/n==-1/0}function gm(n){return typeof n=="number"&&Number.isInteger(n)&&!wr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const ru="";function _m(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=wa(t)),t=ym(n.get(e),t);return wa(t)}function ym(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case ru:e+="";break;default:e+=o}}return e}function wa(n){return n+ru+""}/**
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
 */function Aa(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function fe(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function su(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
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
 */class J{constructor(t,e){this.comparator=t,this.root=e||ut.EMPTY}insert(t,e){return new J(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(t){return new J(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ut.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new ur(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new ur(this.root,t,this.comparator,!1)}getReverseIterator(){return new ur(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new ur(this.root,t,this.comparator,!0)}}class ur{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ut{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??ut.RED,this.left=s??ut.EMPTY,this.right=o??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new ut(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ut.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new ut(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ot{constructor(t){this.comparator=t,this.data=new J(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ra(this.data.getIterator())}getIteratorFrom(t){return new Ra(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new ot(this.comparator);return e.data=t,e}}class Ra{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Pt{constructor(t){this.fields=t,t.sort(lt.comparator)}static empty(){return new Pt([])}unionWith(t){let e=new ot(lt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Pt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return He(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
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
 */class iu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new iu("Invalid base64 string: "+o):o}})(t);return new ht(e)}static fromUint8Array(t){const e=(function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o})(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const Em=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function oe(n){if(z(!!n,39018),typeof n=="string"){let t=0;const e=Em.exec(n);if(z(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:et(n.seconds),nanos:et(n.nanos)}}function et(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ae(n){return typeof n=="string"?ht.fromBase64String(n):ht.fromUint8Array(n)}/**
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
 */const ou="server_timestamp",au="__type__",cu="__previous_value__",uu="__local_write_time__";function gi(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[au])==null?void 0:r.stringValue)===ou}function qr(n){const t=n.mapValue.fields[cu];return gi(t)?qr(t):t}function kn(n){const t=oe(n.mapValue.fields[uu].timestampValue);return new Y(t.seconds,t.nanos)}/**
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
 */class Tm{constructor(t,e,r,s,o,a,l,h,f,m,y){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=m,this.apiKey=y}}const Ar="(default)";class On{constructor(t,e){this.projectId=t,this.database=e||Ar}static empty(){return new On("","")}get isDefaultDatabase(){return this.database===Ar}isEqual(t){return t instanceof On&&t.projectId===this.projectId&&t.database===this.database}}function Im(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new V(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new On(n.options.projectId,t)}/**
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
 */const lu="__type__",vm="__max__",lr={mapValue:{}},hu="__vector__",Rr="value";function ce(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?gi(n)?4:Am(n)?9007199254740991:wm(n)?10:11:M(28295,{value:n})}function Bt(n,t){if(n===t)return!0;const e=ce(n);if(e!==ce(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return kn(n).isEqual(kn(t));case 3:return(function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=oe(s.timestampValue),l=oe(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,o){return ae(s.bytesValue).isEqual(ae(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,o){return et(s.geoPointValue.latitude)===et(o.geoPointValue.latitude)&&et(s.geoPointValue.longitude)===et(o.geoPointValue.longitude)})(n,t);case 2:return(function(s,o){if("integerValue"in s&&"integerValue"in o)return et(s.integerValue)===et(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=et(s.doubleValue),l=et(o.doubleValue);return a===l?wr(a)===wr(l):isNaN(a)&&isNaN(l)}return!1})(n,t);case 9:return He(n.arrayValue.values||[],t.arrayValue.values||[],Bt);case 10:case 11:return(function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(Aa(a)!==Aa(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Bt(a[h],l[h])))return!1;return!0})(n,t);default:return M(52216,{left:n})}}function xn(n,t){return(n.values||[]).find((e=>Bt(e,t)))!==void 0}function Ke(n,t){if(n===t)return 0;const e=ce(n),r=ce(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return(function(o,a){const l=et(o.integerValue||o.doubleValue),h=et(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1})(n,t);case 3:return Sa(n.timestampValue,t.timestampValue);case 4:return Sa(kn(n),kn(t));case 5:return $s(n.stringValue,t.stringValue);case 6:return(function(o,a){const l=ae(o),h=ae(a);return l.compareTo(h)})(n.bytesValue,t.bytesValue);case 7:return(function(o,a){const l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){const m=B(l[f],h[f]);if(m!==0)return m}return B(l.length,h.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,a){const l=B(et(o.latitude),et(a.latitude));return l!==0?l:B(et(o.longitude),et(a.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return ba(n.arrayValue,t.arrayValue);case 10:return(function(o,a){var A,P,N,x;const l=o.fields||{},h=a.fields||{},f=(A=l[Rr])==null?void 0:A.arrayValue,m=(P=h[Rr])==null?void 0:P.arrayValue,y=B(((N=f==null?void 0:f.values)==null?void 0:N.length)||0,((x=m==null?void 0:m.values)==null?void 0:x.length)||0);return y!==0?y:ba(f,m)})(n.mapValue,t.mapValue);case 11:return(function(o,a){if(o===lr.mapValue&&a===lr.mapValue)return 0;if(o===lr.mapValue)return 1;if(a===lr.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),f=a.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let y=0;y<h.length&&y<m.length;++y){const A=$s(h[y],m[y]);if(A!==0)return A;const P=Ke(l[h[y]],f[m[y]]);if(P!==0)return P}return B(h.length,m.length)})(n.mapValue,t.mapValue);default:throw M(23264,{he:e})}}function Sa(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=oe(n),r=oe(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function ba(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Ke(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function We(n){return zs(n)}function zs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=oe(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return ae(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return O.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=zs(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${zs(e.fields[a])}`;return s+"}"})(n.mapValue):M(61005,{value:n})}function mr(n){switch(ce(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=qr(n);return t?16+mr(t):16;case 5:return 2*n.stringValue.length;case 6:return ae(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,o)=>s+mr(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return fe(r.fields,((o,a)=>{s+=o.length+mr(a)})),s})(n.mapValue);default:throw M(13486,{value:n})}}function Pa(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Gs(n){return!!n&&"integerValue"in n}function _i(n){return!!n&&"arrayValue"in n}function Ca(n){return!!n&&"nullValue"in n}function Va(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function pr(n){return!!n&&"mapValue"in n}function wm(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[lu])==null?void 0:r.stringValue)===hu}function bn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return fe(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=bn(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=bn(n.arrayValue.values[e]);return t}return{...n}}function Am(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===vm}/**
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
 */class St{constructor(t){this.value=t}static empty(){return new St({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!pr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=bn(e)}setAll(t){let e=lt.emptyPath(),r={},s=[];t.forEach(((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}a?r[l.lastSegment()]=bn(a):s.push(l.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());pr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Bt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];pr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){fe(e,((s,o)=>t[s]=o));for(const s of r)delete t[s]}clone(){return new St(bn(this.value))}}function fu(n){const t=[];return fe(n.fields,((e,r)=>{const s=new lt([e]);if(pr(r)){const o=fu(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)})),new Pt(t)}/**
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
 */class _t{constructor(t,e,r,s,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new _t(t,0,L.min(),L.min(),L.min(),St.empty(),0)}static newFoundDocument(t,e,r,s){return new _t(t,1,e,L.min(),r,s,0)}static newNoDocument(t,e){return new _t(t,2,e,L.min(),L.min(),St.empty(),0)}static newUnknownDocument(t,e){return new _t(t,3,e,L.min(),L.min(),St.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=St.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=St.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof _t&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Sr{constructor(t,e){this.position=t,this.inclusive=e}}function Da(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=O.comparator(O.fromName(a.referenceValue),e.key):r=Ke(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Na(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Bt(n.position[e],t.position[e]))return!1;return!0}/**
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
 */class Mn{constructor(t,e="asc"){this.field=t,this.dir=e}}function Rm(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
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
 */class du{}class rt extends du{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new bm(t,e,r):e==="array-contains"?new Vm(t,r):e==="in"?new Dm(t,r):e==="not-in"?new Nm(t,r):e==="array-contains-any"?new km(t,r):new rt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Pm(t,r):new Cm(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Ke(e,this.value)):e!==null&&ce(this.value)===ce(e)&&this.matchesComparison(Ke(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class kt extends du{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new kt(t,e)}matches(t){return mu(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function mu(n){return n.op==="and"}function pu(n){return Sm(n)&&mu(n)}function Sm(n){for(const t of n.filters)if(t instanceof kt)return!1;return!0}function Hs(n){if(n instanceof rt)return n.field.canonicalString()+n.op.toString()+We(n.value);if(pu(n))return n.filters.map((t=>Hs(t))).join(",");{const t=n.filters.map((e=>Hs(e))).join(",");return`${n.op}(${t})`}}function gu(n,t){return n instanceof rt?(function(r,s){return s instanceof rt&&r.op===s.op&&r.field.isEqual(s.field)&&Bt(r.value,s.value)})(n,t):n instanceof kt?(function(r,s){return s instanceof kt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((o,a,l)=>o&&gu(a,s.filters[l])),!0):!1})(n,t):void M(19439)}function _u(n){return n instanceof rt?(function(e){return`${e.field.canonicalString()} ${e.op} ${We(e.value)}`})(n):n instanceof kt?(function(e){return e.op.toString()+" {"+e.getFilters().map(_u).join(" ,")+"}"})(n):"Filter"}class bm extends rt{constructor(t,e,r){super(t,e,r),this.key=O.fromName(r.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class Pm extends rt{constructor(t,e){super(t,"in",e),this.keys=yu("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Cm extends rt{constructor(t,e){super(t,"not-in",e),this.keys=yu("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function yu(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>O.fromName(r.referenceValue)))}class Vm extends rt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return _i(e)&&xn(e.arrayValue,this.value)}}class Dm extends rt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&xn(this.value.arrayValue,e)}}class Nm extends rt{constructor(t,e){super(t,"not-in",e)}matches(t){if(xn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!xn(this.value.arrayValue,e)}}class km extends rt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!_i(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>xn(this.value.arrayValue,r)))}}/**
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
 */class Om{constructor(t,e=null,r=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function ka(n,t=null,e=[],r=[],s=null,o=null,a=null){return new Om(n,t,e,r,s,o,a)}function yi(n){const t=F(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>Hs(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),Br(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>We(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>We(r))).join(",")),t.Te=e}return t.Te}function Ei(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Rm(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!gu(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Na(n.startAt,t.startAt)&&Na(n.endAt,t.endAt)}function Ks(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class nn{constructor(t,e=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function xm(n,t,e,r,s,o,a,l){return new nn(n,t,e,r,s,o,a,l)}function jr(n){return new nn(n)}function Oa(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Mm(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Eu(n){return n.collectionGroup!==null}function Pn(n){const t=F(n);if(t.Ee===null){t.Ee=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ee.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ot(lt.comparator);return a.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(l=l.add(f.field))}))})),l})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ee.push(new Mn(o,r))})),e.has(lt.keyField().canonicalString())||t.Ee.push(new Mn(lt.keyField(),r))}return t.Ee}function Lt(n){const t=F(n);return t.Ie||(t.Ie=Lm(t,Pn(n))),t.Ie}function Lm(n,t){if(n.limitType==="F")return ka(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new Mn(s.field,o)}));const e=n.endAt?new Sr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Sr(n.startAt.position,n.startAt.inclusive):null;return ka(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Ws(n,t){const e=n.filters.concat([t]);return new nn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function Fm(n,t){const e=n.explicitOrderBy.concat([t]);return new nn(n.path,n.collectionGroup,e,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Qs(n,t,e){return new nn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function $r(n,t){return Ei(Lt(n),Lt(t))&&n.limitType===t.limitType}function Tu(n){return`${yi(Lt(n))}|lt:${n.limitType}`}function Be(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>_u(s))).join(", ")}]`),Br(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>We(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>We(s))).join(",")),`Target(${r})`})(Lt(n))}; limitType=${n.limitType})`}function zr(n,t){return t.isFoundDocument()&&(function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):O.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,t)&&(function(r,s){for(const o of Pn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(a,l,h){const f=Da(a,l,h);return a.inclusive?f<=0:f<0})(r.startAt,Pn(r),s)||r.endAt&&!(function(a,l,h){const f=Da(a,l,h);return a.inclusive?f>=0:f>0})(r.endAt,Pn(r),s))})(n,t)}function Um(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Iu(n){return(t,e)=>{let r=!1;for(const s of Pn(n)){const o=Bm(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Bm(n,t,e){const r=n.field.isKeyField()?O.comparator(t.key,e.key):(function(o,a,l){const h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?Ke(h,f):M(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}/**
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
 */class ke{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){fe(this.inner,((e,r)=>{for(const[s,o]of r)t(s,o)}))}isEmpty(){return su(this.inner)}size(){return this.innerSize}}/**
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
 */const qm=new J(O.comparator);function Kt(){return qm}const vu=new J(O.comparator);function An(...n){let t=vu;for(const e of n)t=t.insert(e.key,e);return t}function wu(n){let t=vu;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function we(){return Cn()}function Au(){return Cn()}function Cn(){return new ke((n=>n.toString()),((n,t)=>n.isEqual(t)))}const jm=new J(O.comparator),$m=new ot(O.comparator);function q(...n){let t=$m;for(const e of n)t=t.add(e);return t}const zm=new ot(B);function Gm(){return zm}/**
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
 */function Ti(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:wr(t)?"-0":t}}function Ru(n){return{integerValue:""+n}}function Hm(n,t){return gm(t)?Ru(t):Ti(n,t)}/**
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
 */class Gr{constructor(){this._=void 0}}function Km(n,t,e){return n instanceof Ln?(function(s,o){const a={fields:{[au]:{stringValue:ou},[uu]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&gi(o)&&(o=qr(o)),o&&(a.fields[cu]=o),{mapValue:a}})(e,t):n instanceof Qe?bu(n,t):n instanceof Ye?Pu(n,t):(function(s,o){const a=Su(s,o),l=xa(a)+xa(s.Ae);return Gs(a)&&Gs(s.Ae)?Ru(l):Ti(s.serializer,l)})(n,t)}function Wm(n,t,e){return n instanceof Qe?bu(n,t):n instanceof Ye?Pu(n,t):e}function Su(n,t){return n instanceof br?(function(r){return Gs(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(t)?t:{integerValue:0}:null}class Ln extends Gr{}class Qe extends Gr{constructor(t){super(),this.elements=t}}function bu(n,t){const e=Cu(t);for(const r of n.elements)e.some((s=>Bt(s,r)))||e.push(r);return{arrayValue:{values:e}}}class Ye extends Gr{constructor(t){super(),this.elements=t}}function Pu(n,t){let e=Cu(t);for(const r of n.elements)e=e.filter((s=>!Bt(s,r)));return{arrayValue:{values:e}}}class br extends Gr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function xa(n){return et(n.integerValue||n.doubleValue)}function Cu(n){return _i(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Ii{constructor(t,e){this.field=t,this.transform=e}}function Qm(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof Qe&&s instanceof Qe||r instanceof Ye&&s instanceof Ye?He(r.elements,s.elements,Bt):r instanceof br&&s instanceof br?Bt(r.Ae,s.Ae):r instanceof Ln&&s instanceof Ln})(n.transform,t.transform)}class Ym{constructor(t,e){this.version=t,this.transformResults=e}}class vt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new vt}static exists(t){return new vt(void 0,t)}static updateTime(t){return new vt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function gr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Hr{}function Vu(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Kr(n.key,vt.none()):new Bn(n.key,n.data,vt.none());{const e=n.data,r=St.empty();let s=new ot(lt.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new de(n.key,r,new Pt(s.toArray()),vt.none())}}function Jm(n,t,e){n instanceof Bn?(function(s,o,a){const l=s.value.clone(),h=La(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,t,e):n instanceof de?(function(s,o,a){if(!gr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=La(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Du(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(n,t,e):(function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function Vn(n,t,e,r){return n instanceof Bn?(function(o,a,l,h){if(!gr(o.precondition,a))return l;const f=o.value.clone(),m=Fa(o.fieldTransforms,h,a);return f.setAll(m),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null})(n,t,e,r):n instanceof de?(function(o,a,l,h){if(!gr(o.precondition,a))return l;const f=Fa(o.fieldTransforms,h,a),m=a.data;return m.setAll(Du(o)),m.setAll(f),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((y=>y.field)))})(n,t,e,r):(function(o,a,l){return gr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(n,t,e)}function Xm(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=Su(r.transform,s||null);o!=null&&(e===null&&(e=St.empty()),e.set(r.field,o))}return e||null}function Ma(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&He(r,s,((o,a)=>Qm(o,a)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Bn extends Hr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class de extends Hr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Du(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function La(n,t,e){const r=new Map;z(n.length===e.length,32656,{Ve:e.length,de:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,l=t.data.field(o.field);r.set(o.field,Wm(a,l,e[s]))}return r}function Fa(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,Km(o,a,t))}return r}class Kr extends Hr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Zm extends Hr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class tp{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&Jm(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Vn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Vn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Au();return this.mutations.forEach((s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=Vu(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(L.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),q())}isEqual(t){return this.batchId===t.batchId&&He(this.mutations,t.mutations,((e,r)=>Ma(e,r)))&&He(this.baseMutations,t.baseMutations,((e,r)=>Ma(e,r)))}}class vi{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){z(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=(function(){return jm})();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new vi(t,e,r,s)}}/**
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
 */class ep{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class np{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var nt,j;function rp(n){switch(n){case S.OK:return M(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function Nu(n){if(n===void 0)return Ht("GRPC error has no .code"),S.UNKNOWN;switch(n){case nt.OK:return S.OK;case nt.CANCELLED:return S.CANCELLED;case nt.UNKNOWN:return S.UNKNOWN;case nt.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case nt.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case nt.INTERNAL:return S.INTERNAL;case nt.UNAVAILABLE:return S.UNAVAILABLE;case nt.UNAUTHENTICATED:return S.UNAUTHENTICATED;case nt.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case nt.NOT_FOUND:return S.NOT_FOUND;case nt.ALREADY_EXISTS:return S.ALREADY_EXISTS;case nt.PERMISSION_DENIED:return S.PERMISSION_DENIED;case nt.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case nt.ABORTED:return S.ABORTED;case nt.OUT_OF_RANGE:return S.OUT_OF_RANGE;case nt.UNIMPLEMENTED:return S.UNIMPLEMENTED;case nt.DATA_LOSS:return S.DATA_LOSS;default:return M(39323,{code:n})}}(j=nt||(nt={}))[j.OK=0]="OK",j[j.CANCELLED=1]="CANCELLED",j[j.UNKNOWN=2]="UNKNOWN",j[j.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",j[j.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",j[j.NOT_FOUND=5]="NOT_FOUND",j[j.ALREADY_EXISTS=6]="ALREADY_EXISTS",j[j.PERMISSION_DENIED=7]="PERMISSION_DENIED",j[j.UNAUTHENTICATED=16]="UNAUTHENTICATED",j[j.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",j[j.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",j[j.ABORTED=10]="ABORTED",j[j.OUT_OF_RANGE=11]="OUT_OF_RANGE",j[j.UNIMPLEMENTED=12]="UNIMPLEMENTED",j[j.INTERNAL=13]="INTERNAL",j[j.UNAVAILABLE=14]="UNAVAILABLE",j[j.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function sp(){return new TextEncoder}/**
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
 */const ip=new ne([4294967295,4294967295],0);function Ua(n){const t=sp().encode(n),e=new Kc;return e.update(t),new Uint8Array(e.digest())}function Ba(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new ne([e,r],0),new ne([s,o],0)]}class wi{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Rn(`Invalid padding: ${e}`);if(r<0)throw new Rn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Rn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Rn(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=ne.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(ne.fromNumber(r)));return s.compare(ip)===1&&(s=new ne([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Ua(t),[r,s]=Ba(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new wi(o,s,e);return r.forEach((l=>a.insert(l))),a}insert(t){if(this.ge===0)return;const e=Ua(t),[r,s]=Ba(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Rn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Wr{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,qn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Wr(L.min(),s,new J(B),Kt(),q())}}class qn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new qn(r,e,q(),q(),q())}}/**
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
 */class _r{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class ku{constructor(t,e){this.targetId=t,this.Ce=e}}class Ou{constructor(t,e,r=ht.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class qa{constructor(){this.ve=0,this.Fe=ja(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=q(),e=q(),r=q();return this.Fe.forEach(((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:M(38017,{changeType:o})}})),new qn(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=ja()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,z(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class op{constructor(t){this.Ge=t,this.ze=new Map,this.je=Kt(),this.Je=hr(),this.He=hr(),this.Ze=new J(B)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.Qe(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:M(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((r,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const o=s.target;if(Ks(o))if(r===0){const a=new O(o.path);this.et(e,a,_t.newNoDocument(a,L.min()))}else z(r===1,20013,{expectedCount:r});else{const a=this._t(e);if(a!==r){const l=this.ut(t),h=l?this.ct(l,t,a):1;if(h!==0){this.it(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,f)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=ae(r).toUint8Array()}catch(h){if(h instanceof iu)return Ve("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new wi(a,s,o)}catch(h){return Ve(h instanceof Rn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.ge===0?null:l}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach((o=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((o,a)=>{const l=this.ot(a);if(l){if(o.current&&Ks(l.target)){const h=new O(l.target.path);this.Et(h).has(a)||this.It(a,h)||this.et(a,h,_t.newNoDocument(h,t))}o.Be&&(e.set(a,o.ke()),o.qe())}}));let r=q();this.He.forEach(((o,a)=>{let l=!0;a.forEachWhile((h=>{const f=this.ot(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(o))})),this.je.forEach(((o,a)=>a.setReadTime(t)));const s=new Wr(t,e,this.Ze,this.je,r);return this.je=Kt(),this.Je=hr(),this.He=hr(),this.Ze=new J(B),s}Ye(t,e){if(!this.rt(t))return;const r=this.It(t,e.key)?2:0;this.nt(t).Ke(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.He=this.He.insert(e.key,this.Rt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.It(t,e)?s.Ke(e,1):s.Ue(e),this.He=this.He.insert(e,this.Rt(e).delete(t)),this.He=this.He.insert(e,this.Rt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.nt(t).$e()}nt(t){let e=this.ze.get(t);return e||(e=new qa,this.ze.set(t,e)),e}Rt(t){let e=this.He.get(t);return e||(e=new ot(B),this.He=this.He.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new ot(B),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||D("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new qa),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function hr(){return new J(O.comparator)}function ja(){return new J(O.comparator)}const ap={asc:"ASCENDING",desc:"DESCENDING"},cp={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},up={and:"AND",or:"OR"};class lp{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Ys(n,t){return n.useProto3Json||Br(t)?t:{value:t}}function Pr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function xu(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function hp(n,t){return Pr(n,t.toTimestamp())}function Ft(n){return z(!!n,49232),L.fromTimestamp((function(e){const r=oe(e);return new Y(r.seconds,r.nanos)})(n))}function Ai(n,t){return Js(n,t).canonicalString()}function Js(n,t){const e=(function(s){return new W(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function Mu(n){const t=W.fromString(n);return z(qu(t),10190,{key:t.toString()}),t}function Xs(n,t){return Ai(n.databaseId,t.path)}function ks(n,t){const e=Mu(t);if(e.get(1)!==n.databaseId.projectId)throw new V(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new V(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new O(Fu(e))}function Lu(n,t){return Ai(n.databaseId,t)}function fp(n){const t=Mu(n);return t.length===4?W.emptyPath():Fu(t)}function Zs(n){return new W(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Fu(n){return z(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function $a(n,t,e){return{name:Xs(n,t),fields:e.value.mapValue.fields}}function dp(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M(39313,{state:f})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=(function(f,m){return f.useProto3Json?(z(m===void 0||typeof m=="string",58123),ht.fromBase64String(m||"")):(z(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),ht.fromUint8Array(m||new Uint8Array))})(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&(function(f){const m=f.code===void 0?S.UNKNOWN:Nu(f.code);return new V(m,f.message||"")})(a);e=new Ou(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=ks(n,r.document.name),o=Ft(r.document.updateTime),a=r.document.createTime?Ft(r.document.createTime):L.min(),l=new St({mapValue:{fields:r.document.fields}}),h=_t.newFoundDocument(s,o,a,l),f=r.targetIds||[],m=r.removedTargetIds||[];e=new _r(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=ks(n,r.document),o=r.readTime?Ft(r.readTime):L.min(),a=_t.newNoDocument(s,o),l=r.removedTargetIds||[];e=new _r([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=ks(n,r.document),o=r.removedTargetIds||[];e=new _r([],o,s,null)}else{if(!("filter"in t))return M(11601,{Vt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new np(s,o),l=r.targetId;e=new ku(l,a)}}return e}function mp(n,t){let e;if(t instanceof Bn)e={update:$a(n,t.key,t.value)};else if(t instanceof Kr)e={delete:Xs(n,t.key)};else if(t instanceof de)e={update:$a(n,t.key,t.data),updateMask:wp(t.fieldMask)};else{if(!(t instanceof Zm))return M(16599,{dt:t.type});e={verify:Xs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(o,a){const l=a.transform;if(l instanceof Ln)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Qe)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ye)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof br)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw M(20930,{transform:a.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,o){return o.updateTime!==void 0?{updateTime:hp(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M(27497)})(n,t.precondition)),e}function pp(n,t){return n&&n.length>0?(z(t!==void 0,14353),n.map((e=>(function(s,o){let a=s.updateTime?Ft(s.updateTime):Ft(o);return a.isEqual(L.min())&&(a=Ft(o)),new Ym(a,s.transformResults||[])})(e,t)))):[]}function gp(n,t){return{documents:[Lu(n,t.path)]}}function _p(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Lu(n,s);const o=(function(f){if(f.length!==0)return Bu(kt.create(f,"and"))})(t.filters);o&&(e.structuredQuery.where=o);const a=(function(f){if(f.length!==0)return f.map((m=>(function(A){return{field:qe(A.field),direction:Tp(A.dir)}})(m)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=Ys(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=(function(f){return{before:f.inclusive,values:f.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(f){return{before:!f.inclusive,values:f.position}})(t.endAt)),{ft:e,parent:s}}function yp(n){let t=fp(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){z(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=(function(y){const A=Uu(y);return A instanceof kt&&pu(A)?A.getFilters():[A]})(e.where));let a=[];e.orderBy&&(a=(function(y){return y.map((A=>(function(N){return new Mn(je(N.field),(function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(N.direction))})(A)))})(e.orderBy));let l=null;e.limit&&(l=(function(y){let A;return A=typeof y=="object"?y.value:y,Br(A)?null:A})(e.limit));let h=null;e.startAt&&(h=(function(y){const A=!!y.before,P=y.values||[];return new Sr(P,A)})(e.startAt));let f=null;return e.endAt&&(f=(function(y){const A=!y.before,P=y.values||[];return new Sr(P,A)})(e.endAt)),xm(t,s,a,o,l,"F",h,f)}function Ep(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Uu(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=je(e.unaryFilter.field);return rt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=je(e.unaryFilter.field);return rt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=je(e.unaryFilter.field);return rt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=je(e.unaryFilter.field);return rt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}})(n):n.fieldFilter!==void 0?(function(e){return rt.create(je(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return kt.create(e.compositeFilter.filters.map((r=>Uu(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}})(e.compositeFilter.op))})(n):M(30097,{filter:n})}function Tp(n){return ap[n]}function Ip(n){return cp[n]}function vp(n){return up[n]}function qe(n){return{fieldPath:n.canonicalString()}}function je(n){return lt.fromServerFormat(n.fieldPath)}function Bu(n){return n instanceof rt?(function(e){if(e.op==="=="){if(Va(e.value))return{unaryFilter:{field:qe(e.field),op:"IS_NAN"}};if(Ca(e.value))return{unaryFilter:{field:qe(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Va(e.value))return{unaryFilter:{field:qe(e.field),op:"IS_NOT_NAN"}};if(Ca(e.value))return{unaryFilter:{field:qe(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:qe(e.field),op:Ip(e.op),value:e.value}}})(n):n instanceof kt?(function(e){const r=e.getFilters().map((s=>Bu(s)));return r.length===1?r[0]:{compositeFilter:{op:vp(e.op),filters:r}}})(n):M(54877,{filter:n})}function wp(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function qu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function ju(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */class te{constructor(t,e,r,s,o=L.min(),a=L.min(),l=ht.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new te(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Ap{constructor(t){this.yt=t}}function Rp(n){const t=yp({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Qs(t,t.limit,"L"):t}/**
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
 */class Sp{constructor(){this.bn=new bp}addToCollectionParentIndex(t,e){return this.bn.add(e),b.resolve()}getCollectionParents(t,e){return b.resolve(this.bn.getEntries(e))}addFieldIndex(t,e){return b.resolve()}deleteFieldIndex(t,e){return b.resolve()}deleteAllFieldIndexes(t){return b.resolve()}createTargetIndexes(t,e){return b.resolve()}getDocumentsMatchingTarget(t,e){return b.resolve(null)}getIndexType(t,e){return b.resolve(0)}getFieldIndexes(t,e){return b.resolve([])}getNextCollectionGroupToUpdate(t){return b.resolve(null)}getMinOffset(t,e){return b.resolve(ie.min())}getMinOffsetFromCollectionGroup(t,e){return b.resolve(ie.min())}updateCollectionGroup(t,e,r){return b.resolve()}updateIndexEntries(t,e){return b.resolve()}}class bp{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ot(W.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ot(W.comparator)).toArray()}}/**
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
 */const za={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},$u=41943040;class Rt{static withCacheSize(t){return new Rt(t,Rt.DEFAULT_COLLECTION_PERCENTILE,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Rt.DEFAULT_COLLECTION_PERCENTILE=10,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Rt.DEFAULT=new Rt($u,Rt.DEFAULT_COLLECTION_PERCENTILE,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Rt.DISABLED=new Rt(-1,0,0);/**
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
 */class Je{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new Je(0)}static ar(){return new Je(-1)}}/**
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
 */const Ga="LruGarbageCollector",Pp=1048576;function Ha([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class Cp{constructor(t){this.Pr=t,this.buffer=new ot(Ha),this.Tr=0}Er(){return++this.Tr}Ir(t){const e=[t,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Ha(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Vp{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){D(Ga,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){en(e)?D(Ga,"Ignoring IndexedDB error during garbage collection: ",e):await tn(e)}await this.Ar(3e5)}))}}class Dp{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return b.resolve(Ur.ce);const r=new Cp(e);return this.Vr.forEachTarget(t,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(t,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(za)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),za):this.gr(t,e)))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let r,s,o,a,l,h,f;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((y=>(y>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),s=this.params.maximumSequenceNumbersToCollect):s=y,a=Date.now(),this.nthSequenceNumber(t,s)))).next((y=>(r=y,l=Date.now(),this.removeTargets(t,r,e)))).next((y=>(o=y,h=Date.now(),this.removeOrphanedDocuments(t,r)))).next((y=>(f=Date.now(),Ue()<=$.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${y} documents in `+(f-h)+`ms
Total Duration: ${f-m}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:y}))))}}function Np(n,t){return new Dp(n,t)}/**
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
 */class kp{constructor(){this.changes=new ke((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,_t.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?b.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class Op{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class xp{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&Vn(r.mutation,s,Pt.empty(),Y.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,q()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=q()){const s=we();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((o=>{let a=An();return o.forEach(((l,h)=>{a=a.insert(l,h.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const r=we();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,q())))}populateOverlays(t,e,r){const s=[];return r.forEach((o=>{e.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(t,s).next((o=>{o.forEach(((a,l)=>{e.set(a,l)}))}))}computeViews(t,e,r,s){let o=Kt();const a=Cn(),l=(function(){return Cn()})();return e.forEach(((h,f)=>{const m=r.get(f.key);s.has(f.key)&&(m===void 0||m.mutation instanceof de)?o=o.insert(f.key,f):m!==void 0?(a.set(f.key,m.mutation.getFieldMask()),Vn(m.mutation,f,m.mutation.getFieldMask(),Y.now())):a.set(f.key,Pt.empty())})),this.recalculateAndSaveOverlays(t,o).next((h=>(h.forEach(((f,m)=>a.set(f,m))),e.forEach(((f,m)=>l.set(f,new Op(m,a.get(f)??null)))),l)))}recalculateAndSaveOverlays(t,e){const r=Cn();let s=new J(((a,l)=>a-l)),o=q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const l of a)l.keys().forEach((h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||Pt.empty();m=l.applyToLocalView(f,m),r.set(h,m);const y=(s.get(l.batchId)||q()).add(h);s=s.insert(l.batchId,y)}))})).next((()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),f=h.key,m=h.value,y=Au();m.forEach((A=>{if(!o.has(A)){const P=Vu(e.get(A),r.get(A));P!==null&&y.set(A,P),o=o.add(A)}})),a.push(this.documentOverlayCache.saveOverlays(t,f,y))}return b.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return Mm(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Eu(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):b.resolve(we());let l=Nn,h=o;return a.next((f=>b.forEach(f,((m,y)=>(l<y.largestBatchId&&(l=y.largestBatchId),o.get(m)?b.resolve():this.remoteDocumentCache.getEntry(t,m).next((A=>{h=h.insert(m,A)}))))).next((()=>this.populateOverlays(t,f,o))).next((()=>this.computeViews(t,h,f,q()))).next((m=>({batchId:l,changes:wu(m)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new O(e)).next((r=>{let s=An();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=An();return this.indexManager.getCollectionParents(t,o).next((l=>b.forEach(l,(h=>{const f=(function(y,A){return new nn(A,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)})(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next((m=>{m.forEach(((y,A)=>{a=a.insert(y,A)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s)))).next((a=>{o.forEach(((h,f)=>{const m=f.getKey();a.get(m)===null&&(a=a.insert(m,_t.newInvalidDocument(m)))}));let l=An();return a.forEach(((h,f)=>{const m=o.get(h);m!==void 0&&Vn(m.mutation,f,Pt.empty(),Y.now()),zr(e,f)&&(l=l.insert(h,f))})),l}))}}/**
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
 */class Mp{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return b.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Ft(s.createTime)}})(e)),b.resolve()}getNamedQuery(t,e){return b.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,(function(s){return{name:s.name,query:Rp(s.bundledQuery),readTime:Ft(s.readTime)}})(e)),b.resolve()}}/**
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
 */class Lp{constructor(){this.overlays=new J(O.comparator),this.Lr=new Map}getOverlay(t,e){return b.resolve(this.overlays.get(e))}getOverlays(t,e){const r=we();return b.forEach(e,(s=>this.getOverlay(t,s).next((o=>{o!==null&&r.set(s,o)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,o)=>{this.St(t,e,o)})),b.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.Lr.delete(r)),b.resolve()}getOverlaysForCollection(t,e,r){const s=we(),o=e.length+1,a=new O(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return b.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new J(((f,m)=>f-m));const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=we(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const l=we(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,m)=>l.set(f,m))),!(l.size()>=s)););return b.resolve(l)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new ep(e,r));let o=this.Lr.get(e);o===void 0&&(o=q(),this.Lr.set(e,o)),this.Lr.set(e,o.add(r.key))}}/**
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
 */class Fp{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return b.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,b.resolve()}}/**
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
 */class Ri{constructor(){this.kr=new ot(ct.qr),this.Kr=new ot(ct.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const r=new ct(t,e);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Wr(new ct(t,e))}Qr(t,e){t.forEach((r=>this.removeReference(r,e)))}Gr(t){const e=new O(new W([])),r=new ct(e,t),s=new ct(e,t+1),o=[];return this.Kr.forEachInRange([r,s],(a=>{this.Wr(a),o.push(a.key)})),o}zr(){this.kr.forEach((t=>this.Wr(t)))}Wr(t){this.kr=this.kr.delete(t),this.Kr=this.Kr.delete(t)}jr(t){const e=new O(new W([])),r=new ct(e,t),s=new ct(e,t+1);let o=q();return this.Kr.forEachInRange([r,s],(a=>{o=o.add(a.key)})),o}containsKey(t){const e=new ct(t,0),r=this.kr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ct{constructor(t,e){this.key=t,this.Jr=e}static qr(t,e){return O.comparator(t.key,e.key)||B(t.Jr,e.Jr)}static Ur(t,e){return B(t.Jr,e.Jr)||O.comparator(t.key,e.key)}}/**
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
 */class Up{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Hr=new ot(ct.qr)}checkEmpty(t){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new tp(o,e,r,s);this.mutationQueue.push(a);for(const l of s)this.Hr=this.Hr.add(new ct(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return b.resolve(a)}lookupMutationBatch(t,e){return b.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Xr(r),o=s<0?0:s;return b.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?pi:this.Yn-1)}getAllMutationBatches(t){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ct(e,0),s=new ct(e,Number.POSITIVE_INFINITY),o=[];return this.Hr.forEachInRange([r,s],(a=>{const l=this.Zr(a.Jr);o.push(l)})),b.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ot(B);return e.forEach((s=>{const o=new ct(s,0),a=new ct(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([o,a],(l=>{r=r.add(l.Jr)}))})),b.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;O.isDocumentKey(o)||(o=o.child(""));const a=new ct(new O(o),0);let l=new ot(B);return this.Hr.forEachWhile((h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(l=l.add(h.Jr)),!0)}),a),b.resolve(this.Yr(l))}Yr(t){const e=[];return t.forEach((r=>{const s=this.Zr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){z(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return b.forEach(e.mutations,(s=>{const o=new ct(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Hr=r}))}nr(t){}containsKey(t,e){const r=new ct(e,0),s=this.Hr.firstAfterOrEqual(r);return b.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,b.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Bp{constructor(t){this.ti=t,this.docs=(function(){return new J(O.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ti(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return b.resolve(r?r.document.mutableCopy():_t.newInvalidDocument(e))}getEntries(t,e){let r=Kt();return e.forEach((s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():_t.newInvalidDocument(s))})),b.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=Kt();const a=e.path,l=new O(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||fm(hm(m),r)<=0||(s.has(m.key)||zr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return b.resolve(o)}getAllFromCollectionGroup(t,e,r,s){M(9500)}ni(t,e){return b.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new qp(this)}getSize(t){return b.resolve(this.size)}}class qp extends kp{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Mr.addEntry(t,s)):this.Mr.removeEntry(r)})),b.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}/**
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
 */class jp{constructor(t){this.persistence=t,this.ri=new ke((e=>yi(e)),Ei),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.ii=0,this.si=new Ri,this.targetCount=0,this.oi=Je._r()}forEachTarget(t,e){return this.ri.forEach(((r,s)=>e(s))),b.resolve()}getLastRemoteSnapshotVersion(t){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return b.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.ii&&(this.ii=e),b.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new Je(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,b.resolve()}updateTargetData(t,e){return this.lr(e),b.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,b.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ri.forEach(((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.ri.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)})),b.waitFor(o).next((()=>s))}getTargetCount(t){return b.resolve(this.targetCount)}getTargetData(t,e){const r=this.ri.get(e)||null;return b.resolve(r)}addMatchingKeys(t,e,r){return this.si.$r(e,r),b.resolve()}removeMatchingKeys(t,e,r){this.si.Qr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach((a=>{o.push(s.markPotentiallyOrphaned(t,a))})),b.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),b.resolve()}getMatchingKeysForTargetId(t,e){const r=this.si.jr(e);return b.resolve(r)}containsKey(t,e){return b.resolve(this.si.containsKey(e))}}/**
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
 */class zu{constructor(t,e){this._i={},this.overlays={},this.ai=new Ur(0),this.ui=!1,this.ui=!0,this.ci=new Fp,this.referenceDelegate=t(this),this.li=new jp(this),this.indexManager=new Sp,this.remoteDocumentCache=(function(s){return new Bp(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new Ap(e),this.Pi=new Mp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Lp,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this._i[t.toKey()];return r||(r=new Up(e,this.referenceDelegate),this._i[t.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,r){D("MemoryPersistence","Starting transaction:",t);const s=new $p(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((o=>this.referenceDelegate.Ei(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}Ii(t,e){return b.or(Object.values(this._i).map((r=>()=>r.containsKey(t,e))))}}class $p extends mm{constructor(t){super(),this.currentSequenceNumber=t}}class Si{constructor(t){this.persistence=t,this.Ri=new Ri,this.Ai=null}static Vi(t){return new Si(t)}get di(){if(this.Ai)return this.Ai;throw M(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.di.delete(r.toString()),b.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.di.add(r.toString()),b.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),b.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((o=>this.di.add(o.toString())))})).next((()=>r.removeTargetData(t,e)))}Ti(){this.Ai=new Set}Ei(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.di,(r=>{const s=O.fromPath(r);return this.mi(t,s).next((o=>{o||e.removeEntry(s,L.min())}))})).next((()=>(this.Ai=null,e.apply(t))))}updateLimboDocument(t,e){return this.mi(t,e).next((r=>{r?this.di.delete(e.toString()):this.di.add(e.toString())}))}hi(t){return 0}mi(t,e){return b.or([()=>b.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class Cr{constructor(t,e){this.persistence=t,this.fi=new ke((r=>_m(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Np(this,e)}static Vi(t,e){return new Cr(t,e)}Ti(){}Ei(t){return b.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}pr(t){let e=0;return this.mr(t,(r=>{e++})).next((()=>e))}mr(t,e){return b.forEach(this.fi,((r,s)=>this.wr(t,r,s).next((o=>o?b.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ni(t,(a=>this.wr(t,a,e).next((l=>{l||(r++,o.removeEntry(a,L.min()))})))).next((()=>o.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),b.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),b.resolve()}removeReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),b.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),b.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=mr(t.data.value)),e}wr(t,e,r){return b.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.fi.get(e);return b.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class bi{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Ts=r,this.Es=s}static Is(t,e){let r=q(),s=q();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new bi(t,e.fromCache,r,s)}}/**
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
 */class zp{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Gp{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Eh()?8:pm(ii())>0?6:4})()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.gs(t,e).next((a=>{o.result=a})).next((()=>{if(!o.result)return this.ps(t,e,s,r).next((a=>{o.result=a}))})).next((()=>{if(o.result)return;const a=new zp;return this.ys(t,e,a).next((l=>{if(o.result=l,this.As)return this.ws(t,e,a,l.size)}))})).next((()=>o.result))}ws(t,e,r,s){return r.documentReadCount<this.Vs?(Ue()<=$.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Be(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),b.resolve()):(Ue()<=$.DEBUG&&D("QueryEngine","Query:",Be(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Ue()<=$.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Be(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Lt(e))):b.resolve())}gs(t,e){if(Oa(e))return b.resolve(null);let r=Lt(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=Qs(e,null,"F"),r=Lt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((o=>{const a=q(...o);return this.fs.getDocuments(t,a).next((l=>this.indexManager.getMinOffset(t,r).next((h=>{const f=this.Ss(e,l);return this.bs(e,f,a,h.readTime)?this.gs(t,Qs(e,null,"F")):this.Ds(t,f,e,h)}))))})))))}ps(t,e,r,s){return Oa(e)||s.isEqual(L.min())?b.resolve(null):this.fs.getDocuments(t,r).next((o=>{const a=this.Ss(e,o);return this.bs(e,a,r,s)?b.resolve(null):(Ue()<=$.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Be(e)),this.Ds(t,a,e,lm(s,Nn)).next((l=>l)))}))}Ss(t,e){let r=new ot(Iu(t));return e.forEach(((s,o)=>{zr(t,o)&&(r=r.add(o))})),r}bs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ys(t,e,r){return Ue()<=$.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Be(e)),this.fs.getDocumentsMatchingQuery(t,e,ie.min(),r)}Ds(t,e,r,s){return this.fs.getDocumentsMatchingQuery(t,r,s).next((o=>(e.forEach((a=>{o=o.insert(a.key,a)})),o)))}}/**
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
 */const Pi="LocalStore",Hp=3e8;class Kp{constructor(t,e,r,s){this.persistence=t,this.Cs=e,this.serializer=s,this.vs=new J(B),this.Fs=new ke((o=>yi(o)),Ei),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(r)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new xp(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.vs)))}}function Wp(n,t,e,r){return new Kp(n,t,e,r)}async function Gu(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((o=>(s=o,e.Os(t),e.mutationQueue.getAllMutationBatches(r)))).next((o=>{const a=[],l=[];let h=q();for(const f of s){a.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){l.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next((f=>({Ns:f,removedBatchIds:a,addedBatchIds:l})))}))}))}function Qp(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),o=e.xs.newChangeBuffer({trackRemovals:!0});return(function(l,h,f,m){const y=f.batch,A=y.keys();let P=b.resolve();return A.forEach((N=>{P=P.next((()=>m.getEntry(h,N))).next((x=>{const k=f.docVersions.get(N);z(k!==null,48541),x.version.compareTo(k)<0&&(y.applyToRemoteDocument(x,f),x.isValidDocument()&&(x.setReadTime(f.commitVersion),m.addEntry(x)))}))})),P.next((()=>l.mutationQueue.removeMutationBatch(h,y)))})(e,r,t,o).next((()=>o.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let h=q();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function Hu(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.li.getLastRemoteSnapshotVersion(e)))}function Yp(n,t){const e=F(n),r=t.snapshotVersion;let s=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const a=e.xs.newChangeBuffer({trackRemovals:!0});s=e.vs;const l=[];t.targetChanges.forEach(((m,y)=>{const A=s.get(y);if(!A)return;l.push(e.li.removeMatchingKeys(o,m.removedDocuments,y).next((()=>e.li.addMatchingKeys(o,m.addedDocuments,y))));let P=A.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(y)!==null?P=P.withResumeToken(ht.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):m.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(m.resumeToken,r)),s=s.insert(y,P),(function(x,k,K){return x.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=Hp?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0})(A,P,m)&&l.push(e.li.updateTargetData(o,P))}));let h=Kt(),f=q();if(t.documentUpdates.forEach((m=>{t.resolvedLimboDocuments.has(m)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))})),l.push(Jp(o,a,t.documentUpdates).next((m=>{h=m.Bs,f=m.Ls}))),!r.isEqual(L.min())){const m=e.li.getLastRemoteSnapshotVersion(o).next((y=>e.li.setTargetsMetadata(o,o.currentSequenceNumber,r)));l.push(m)}return b.waitFor(l).next((()=>a.apply(o))).next((()=>e.localDocuments.getLocalViewOfDocuments(o,h,f))).next((()=>h))})).then((o=>(e.vs=s,o)))}function Jp(n,t,e){let r=q(),s=q();return e.forEach((o=>r=r.add(o))),t.getEntries(n,r).next((o=>{let a=Kt();return e.forEach(((l,h)=>{const f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):D(Pi,"Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)})),{Bs:a,Ls:s}}))}function Xp(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=pi),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function Zp(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.li.getTargetData(r,t).next((o=>o?(s=o,b.resolve(s)):e.li.allocateTargetId(r).next((a=>(s=new te(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.li.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.vs=e.vs.insert(r.targetId,r),e.Fs.set(t,r.targetId)),r}))}async function ti(n,t,e){const r=F(n),s=r.vs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!en(a))throw a;D(Pi,`Failed to update sequence numbers for target ${t}: ${a}`)}r.vs=r.vs.remove(t),r.Fs.delete(s.target)}function Ka(n,t,e){const r=F(n);let s=L.min(),o=q();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(h,f,m){const y=F(h),A=y.Fs.get(m);return A!==void 0?b.resolve(y.vs.get(A)):y.li.getTargetData(f,m)})(r,a,Lt(t)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,l.targetId).next((h=>{o=h}))})).next((()=>r.Cs.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?o:q()))).next((l=>(tg(r,Um(t),l),{documents:l,ks:o})))))}function tg(n,t,e){let r=n.Ms.get(t)||L.min();e.forEach(((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)})),n.Ms.set(t,r)}class Wa{constructor(){this.activeTargetIds=Gm()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class eg{constructor(){this.vo=new Wa,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,r){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new Wa,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class ng{Mo(t){}shutdown(){}}/**
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
 */const Qa="ConnectivityMonitor";class Ya{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){D(Qa,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){D(Qa,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let fr=null;function ei(){return fr===null?fr=(function(){return 268435456+Math.round(2147483648*Math.random())})():fr++,"0x"+fr.toString(16)}/**
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
 */const Os="RestConnection",rg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class sg{get qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Ar?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(t,e,r,s,o){const a=ei(),l=this.Qo(t,e.toUriEncodedString());D(Os,`Sending RPC '${t}' ${a}:`,l,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(h,s,o);const{host:f}=new URL(l),m=vc(f);return this.zo(t,l,h,r,m).then((y=>(D(Os,`Received RPC '${t}' ${a}: `,y),y)),(y=>{throw Ve(Os,`RPC '${t}' ${a} failed with error: `,y,"url: ",l,"request:",r),y}))}jo(t,e,r,s,o,a){return this.Wo(t,e,r,s,o)}Go(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ze})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,o)=>t[o]=s)),r&&r.headers.forEach(((s,o)=>t[o]=s))}Qo(t,e){const r=rg[t];let s=`${this.Ko}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class ig{constructor(t){this.Jo=t.Jo,this.Ho=t.Ho}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Ho()}send(t){this.Jo(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}/**
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
 */const pt="WebChannelConnection",vn=(n,t,e)=>{n.listen(t,(r=>{try{e(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class ze extends sg{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!ze.c_){const t=Jc();vn(t,Yc.STAT_EVENT,(e=>{e.stat===js.PROXY?D(pt,"STAT_EVENT: detected buffering proxy"):e.stat===js.NOPROXY&&D(pt,"STAT_EVENT: detected no buffering proxy")})),ze.c_=!0}}zo(t,e,r,s,o){const a=ei();return new Promise(((l,h)=>{const f=new Wc;f.setWithCredentials(!0),f.listenOnce(Qc.COMPLETE,(()=>{try{switch(f.getLastErrorCode()){case dr.NO_ERROR:const y=f.getResponseJson();D(pt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(y)),l(y);break;case dr.TIMEOUT:D(pt,`RPC '${t}' ${a} timed out`),h(new V(S.DEADLINE_EXCEEDED,"Request time out"));break;case dr.HTTP_ERROR:const A=f.getStatus();if(D(pt,`RPC '${t}' ${a} failed with status:`,A,"response text:",f.getResponseText()),A>0){let P=f.getResponseJson();Array.isArray(P)&&(P=P[0]);const N=P==null?void 0:P.error;if(N&&N.status&&N.message){const x=(function(K){const G=K.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(G)>=0?G:S.UNKNOWN})(N.status);h(new V(x,N.message))}else h(new V(S.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new V(S.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:t,streamId:a,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{D(pt,`RPC '${t}' ${a} completed.`)}}));const m=JSON.stringify(s);D(pt,`RPC '${t}' ${a} sending request:`,s),f.send(e,"POST",m,r,15)}))}T_(t,e,r){const s=ei(),o=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,e,r),l.encodeInitMessageHeaders=!0;const f=o.join("");D(pt,`Creating RPC '${t}' stream ${s}: ${f}`,l);const m=a.createWebChannel(f,l);this.E_(m);let y=!1,A=!1;const P=new ig({Jo:N=>{A?D(pt,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(y||(D(pt,`Opening RPC '${t}' stream ${s} transport.`),m.open(),y=!0),D(pt,`RPC '${t}' stream ${s} sending:`,N),m.send(N))},Ho:()=>m.close()});return vn(m,wn.EventType.OPEN,(()=>{A||(D(pt,`RPC '${t}' stream ${s} transport opened.`),P.i_())})),vn(m,wn.EventType.CLOSE,(()=>{A||(A=!0,D(pt,`RPC '${t}' stream ${s} transport closed`),P.o_(),this.I_(m))})),vn(m,wn.EventType.ERROR,(N=>{A||(A=!0,Ve(pt,`RPC '${t}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),P.o_(new V(S.UNAVAILABLE,"The operation could not be completed")))})),vn(m,wn.EventType.MESSAGE,(N=>{var x;if(!A){const k=N.data[0];z(!!k,16349);const K=k,G=(K==null?void 0:K.error)||((x=K[0])==null?void 0:x.error);if(G){D(pt,`RPC '${t}' stream ${s} received error:`,G);const X=G.status;let Vt=(function(T){const p=nt[T];if(p!==void 0)return Nu(p)})(X),ft=G.message;X==="NOT_FOUND"&&ft.includes("database")&&ft.includes("does not exist")&&ft.includes(this.databaseId.database)&&Ve(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Vt===void 0&&(Vt=S.INTERNAL,ft="Unknown error status: "+X+" with message "+G.message),A=!0,P.o_(new V(Vt,ft)),m.close()}else D(pt,`RPC '${t}' stream ${s} received:`,k),P.__(k)}})),ze.u_(),setTimeout((()=>{P.s_()}),0),P}terminate(){this.a_.forEach((t=>t.close())),this.a_=[]}E_(t){this.a_.push(t)}I_(t){this.a_=this.a_.filter((e=>e===t))}Go(t,e,r){super.Go(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Xc()}}/**
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
 */function og(n){return new ze(n)}function xs(){return typeof document<"u"?document:null}/**
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
 */function Qr(n){return new lp(n,!0)}/**
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
 */ze.c_=!1;class Ku{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Ci=t,this.timerId=e,this.R_=r,this.A_=s,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const Ja="PersistentStream";class Wu{constructor(t,e,r,s,o,a,l,h){this.Ci=t,this.S_=r,this.b_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ku(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.K_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.K_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===S.RESOURCE_EXHAUSTED?(Ht(e.toString()),Ht("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===e&&this.G_(r,s)}),(r=>{t((()=>{const s=new V(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(t,e){const r=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return D(Ja,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget((()=>this.D_===t?e():(D(Ja,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class ag extends Wu{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=dp(this.serializer,t),r=(function(o){if(!("targetChange"in o))return L.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?Ft(a.readTime):L.min()})(t);return this.listener.H_(e,r)}Z_(t){const e={};e.database=Zs(this.serializer),e.addTarget=(function(o,a){let l;const h=a.target;if(l=Ks(h)?{documents:gp(o,h)}:{query:_p(o,h).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=xu(o,a.resumeToken);const f=Ys(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(L.min())>0){l.readTime=Pr(o,a.snapshotVersion.toTimestamp());const f=Ys(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l})(this.serializer,t);const r=Ep(this.serializer,t);r&&(e.labels=r),this.q_(e)}X_(t){const e={};e.database=Zs(this.serializer),e.removeTarget=t,this.q_(e)}}class cg extends Wu{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return z(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,z(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){z(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=pp(t.writeResults,t.commitTime),r=Ft(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=Zs(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>mp(this.serializer,r)))};this.q_(e)}}/**
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
 */class ug{}class lg extends ug{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Wo(t,Js(e,r),s,o,a))).catch((o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(S.UNKNOWN,o.toString())}))}jo(t,e,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.jo(t,Js(e,r),s,a,l,o))).catch((a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(S.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function hg(n,t,e,r){return new lg(n,t,e,r)}class fg{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ht(e),this.aa=!1):D("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const De="RemoteStore";class dg{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=o,this.Aa.Mo((a=>{r.enqueueAndForget((async()=>{Oe(this)&&(D(De,"Restarting streams for network reachability change."),await(async function(h){const f=F(h);f.Ia.add(4),await jn(f),f.Va.set("Unknown"),f.Ia.delete(4),await Yr(f)})(this))}))})),this.Va=new fg(r,s)}}async function Yr(n){if(Oe(n))for(const t of n.Ra)await t(!0)}async function jn(n){for(const t of n.Ra)await t(!1)}function Qu(n,t){const e=F(n);e.Ea.has(t.targetId)||(e.Ea.set(t.targetId,t),Ni(e)?Di(e):rn(e).O_()&&Vi(e,t))}function Ci(n,t){const e=F(n),r=rn(e);e.Ea.delete(t),r.O_()&&Yu(e,t),e.Ea.size===0&&(r.O_()?r.L_():Oe(e)&&e.Va.set("Unknown"))}function Vi(n,t){if(n.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}rn(n).Z_(t)}function Yu(n,t){n.da.$e(t),rn(n).X_(t)}function Di(n){n.da=new op({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ea.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),rn(n).start(),n.Va.ua()}function Ni(n){return Oe(n)&&!rn(n).x_()&&n.Ea.size>0}function Oe(n){return F(n).Ia.size===0}function Ju(n){n.da=void 0}async function mg(n){n.Va.set("Online")}async function pg(n){n.Ea.forEach(((t,e)=>{Vi(n,t)}))}async function gg(n,t){Ju(n),Ni(n)?(n.Va.ha(t),Di(n)):n.Va.set("Unknown")}async function _g(n,t,e){if(n.Va.set("Online"),t instanceof Ou&&t.state===2&&t.cause)try{await(async function(s,o){const a=o.cause;for(const l of o.targetIds)s.Ea.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ea.delete(l),s.da.removeTarget(l))})(n,t)}catch(r){D(De,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Vr(n,r)}else if(t instanceof _r?n.da.Xe(t):t instanceof ku?n.da.st(t):n.da.tt(t),!e.isEqual(L.min()))try{const r=await Hu(n.localStore);e.compareTo(r)>=0&&await(function(o,a){const l=o.da.Tt(a);return l.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Ea.get(f);m&&o.Ea.set(f,m.withResumeToken(h.resumeToken,a))}})),l.targetMismatches.forEach(((h,f)=>{const m=o.Ea.get(h);if(!m)return;o.Ea.set(h,m.withResumeToken(ht.EMPTY_BYTE_STRING,m.snapshotVersion)),Yu(o,h);const y=new te(m.target,h,f,m.sequenceNumber);Vi(o,y)})),o.remoteSyncer.applyRemoteEvent(l)})(n,e)}catch(r){D(De,"Failed to raise snapshot:",r),await Vr(n,r)}}async function Vr(n,t,e){if(!en(t))throw t;n.Ia.add(1),await jn(n),n.Va.set("Offline"),e||(e=()=>Hu(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{D(De,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await Yr(n)}))}function Xu(n,t){return t().catch((e=>Vr(n,e,t)))}async function Jr(n){const t=F(n),e=ue(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:pi;for(;yg(t);)try{const s=await Xp(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,Eg(t,s)}catch(s){await Vr(t,s)}Zu(t)&&tl(t)}function yg(n){return Oe(n)&&n.Ta.length<10}function Eg(n,t){n.Ta.push(t);const e=ue(n);e.O_()&&e.Y_&&e.ea(t.mutations)}function Zu(n){return Oe(n)&&!ue(n).x_()&&n.Ta.length>0}function tl(n){ue(n).start()}async function Tg(n){ue(n).ra()}async function Ig(n){const t=ue(n);for(const e of n.Ta)t.ea(e.mutations)}async function vg(n,t,e){const r=n.Ta.shift(),s=vi.from(r,t,e);await Xu(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Jr(n)}async function wg(n,t){t&&ue(n).Y_&&await(async function(r,s){if((function(a){return rp(a)&&a!==S.ABORTED})(s.code)){const o=r.Ta.shift();ue(r).B_(),await Xu(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s))),await Jr(r)}})(n,t),Zu(n)&&tl(n)}async function Xa(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),D(De,"RemoteStore received new credentials");const r=Oe(e);e.Ia.add(3),await jn(e),r&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Yr(e)}async function Ag(n,t){const e=F(n);t?(e.Ia.delete(2),await Yr(e)):t||(e.Ia.add(2),await jn(e),e.Va.set("Unknown"))}function rn(n){return n.ma||(n.ma=(function(e,r,s){const o=F(e);return o.sa(),new ag(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:mg.bind(null,n),Yo:pg.bind(null,n),t_:gg.bind(null,n),H_:_g.bind(null,n)}),n.Ra.push((async t=>{t?(n.ma.B_(),Ni(n)?Di(n):n.Va.set("Unknown")):(await n.ma.stop(),Ju(n))}))),n.ma}function ue(n){return n.fa||(n.fa=(function(e,r,s){const o=F(e);return o.sa(),new cg(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Tg.bind(null,n),t_:wg.bind(null,n),ta:Ig.bind(null,n),na:vg.bind(null,n)}),n.Ra.push((async t=>{t?(n.fa.B_(),await Jr(n)):(await n.fa.stop(),n.Ta.length>0&&(D(De,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
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
 */class ki{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new $t,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,l=new ki(t,e,a,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(S.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Oi(n,t){if(Ht("AsyncQueue",`${t}: ${n}`),en(n))return new V(S.UNAVAILABLE,`${t}: ${n}`);throw n}/**
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
 */class Ge{static emptySet(t){return new Ge(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||O.comparator(e.key,r.key):(e,r)=>O.comparator(e.key,r.key),this.keyedMap=An(),this.sortedSet=new J(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ge)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Ge;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
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
 */class Za{constructor(){this.ga=new J(O.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):M(63341,{Vt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,r)=>{t.push(r)})),t}}class Xe{constructor(t,e,r,s,o,a,l,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach((l=>{a.push({type:0,doc:l})})),new Xe(t,e,Ge.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&$r(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class Rg{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class Sg{constructor(){this.queries=tc(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=tc(),o.forEach(((a,l)=>{for(const h of l.Sa)h.onError(r)}))})(this,new V(S.ABORTED,"Firestore shutting down"))}}function tc(){return new ke((n=>Tu(n)),$r)}async function xi(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.ba()&&t.Da()&&(r=2):(o=new Rg,r=t.Da()?0:1);try{switch(r){case 0:o.wa=await e.onListen(s,!0);break;case 1:o.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=Oi(a,`Initialization of query '${Be(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.Sa.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&Li(e)}async function Mi(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.Sa.indexOf(t);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?s=t.Da()?0:1:!o.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function bg(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&Li(e)}function Pg(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.Sa)o.onError(e);r.queries.delete(t)}function Li(n){n.Ca.forEach((t=>{t.next()}))}var ni,ec;(ec=ni||(ni={})).Ma="default",ec.Cache="cache";class Fi{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Xe(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=Xe.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==ni.Cache}}/**
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
 */class el{constructor(t){this.key=t}}class nl{constructor(t){this.key=t}}class Cg{constructor(t,e){this.query=t,this.Za=e,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=q(),this.mutatedKeys=q(),this.eu=Iu(t),this.tu=new Ge(this.eu)}get nu(){return this.Za}ru(t,e){const r=e?e.iu:new Za,s=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((m,y)=>{const A=s.get(m),P=zr(this.query,y)?y:null,N=!!A&&this.mutatedKeys.has(A.key),x=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let k=!1;A&&P?A.data.isEqual(P.data)?N!==x&&(r.track({type:3,doc:P}),k=!0):this.su(A,P)||(r.track({type:2,doc:P}),k=!0,(h&&this.eu(P,h)>0||f&&this.eu(P,f)<0)&&(l=!0)):!A&&P?(r.track({type:0,doc:P}),k=!0):A&&!P&&(r.track({type:1,doc:A}),k=!0,(h||f)&&(l=!0)),k&&(P?(a=a.add(P),o=x?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{tu:a,iu:r,bs:l,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort(((m,y)=>(function(P,N){const x=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:k})}};return x(P)-x(N)})(m.type,y.type)||this.eu(m.doc,y.doc))),this.ou(r),s=s??!1;const l=e&&!s?this._u():[],h=this.Ya.size===0&&this.current&&!s?1:0,f=h!==this.Xa;return this.Xa=h,a.length!==0||f?{snapshot:new Xe(this.query,t.tu,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Za,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(t){return!this.Za.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Za=this.Za.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Za=this.Za.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Ya;this.Ya=q(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const e=[];return t.forEach((r=>{this.Ya.has(r)||e.push(new nl(r))})),this.Ya.forEach((r=>{t.has(r)||e.push(new el(r))})),e}cu(t){this.Za=t.ks,this.Ya=q();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return Xe.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Ui="SyncEngine";class Vg{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Dg{constructor(t){this.key=t,this.hu=!1}}class Ng{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new ke((l=>Tu(l)),$r),this.Eu=new Map,this.Iu=new Set,this.Ru=new J(O.comparator),this.Au=new Map,this.Vu=new Ri,this.du={},this.mu=new Map,this.fu=Je.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function kg(n,t,e=!0){const r=cl(n);let s;const o=r.Tu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.lu()):s=await rl(r,t,e,!0),s}async function Og(n,t){const e=cl(n);await rl(e,t,!0,!1)}async function rl(n,t,e,r){const s=await Zp(n.localStore,Lt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=await xg(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&Qu(n.remoteStore,s),l}async function xg(n,t,e,r,s){n.pu=(y,A,P)=>(async function(x,k,K,G){let X=k.view.ru(K);X.bs&&(X=await Ka(x.localStore,k.query,!1).then((({documents:T})=>k.view.ru(T,X))));const Vt=G&&G.targetChanges.get(k.targetId),ft=G&&G.targetMismatches.get(k.targetId)!=null,dt=k.view.applyChanges(X,x.isPrimaryClient,Vt,ft);return rc(x,k.targetId,dt.au),dt.snapshot})(n,y,A,P);const o=await Ka(n.localStore,t,!0),a=new Cg(t,o.ks),l=a.ru(o.documents),h=qn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=a.applyChanges(l,n.isPrimaryClient,h);rc(n,e,f.au);const m=new Vg(t,e,a);return n.Tu.set(t,m),n.Eu.has(e)?n.Eu.get(e).push(t):n.Eu.set(e,[t]),f.snapshot}async function Mg(n,t,e){const r=F(n),s=r.Tu.get(t),o=r.Eu.get(s.targetId);if(o.length>1)return r.Eu.set(s.targetId,o.filter((a=>!$r(a,t)))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ti(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&Ci(r.remoteStore,s.targetId),ri(r,s.targetId)})).catch(tn)):(ri(r,s.targetId),await ti(r.localStore,s.targetId,!0))}async function Lg(n,t){const e=F(n),r=e.Tu.get(t),s=e.Eu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Ci(e.remoteStore,r.targetId))}async function Fg(n,t,e){const r=Gg(n);try{const s=await(function(a,l){const h=F(a),f=Y.now(),m=l.reduce(((P,N)=>P.add(N.key)),q());let y,A;return h.persistence.runTransaction("Locally write mutations","readwrite",(P=>{let N=Kt(),x=q();return h.xs.getEntries(P,m).next((k=>{N=k,N.forEach(((K,G)=>{G.isValidDocument()||(x=x.add(K))}))})).next((()=>h.localDocuments.getOverlayedDocuments(P,N))).next((k=>{y=k;const K=[];for(const G of l){const X=Xm(G,y.get(G.key).overlayedDocument);X!=null&&K.push(new de(G.key,X,fu(X.value.mapValue),vt.exists(!0)))}return h.mutationQueue.addMutationBatch(P,f,K,l)})).next((k=>{A=k;const K=k.applyToLocalDocumentSet(y,x);return h.documentOverlayCache.saveOverlays(P,k.batchId,K)}))})).then((()=>({batchId:A.batchId,changes:wu(y)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,l,h){let f=a.du[a.currentUser.toKey()];f||(f=new J(B)),f=f.insert(l,h),a.du[a.currentUser.toKey()]=f})(r,s.batchId,e),await $n(r,s.changes),await Jr(r.remoteStore)}catch(s){const o=Oi(s,"Failed to persist write");e.reject(o)}}async function sl(n,t){const e=F(n);try{const r=await Yp(e.localStore,t);t.targetChanges.forEach(((s,o)=>{const a=e.Au.get(o);a&&(z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?z(a.hu,14607):s.removedDocuments.size>0&&(z(a.hu,42227),a.hu=!1))})),await $n(e,r,t)}catch(r){await tn(r)}}function nc(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach(((o,a)=>{const l=a.view.va(t);l.snapshot&&s.push(l.snapshot)})),(function(a,l){const h=F(a);h.onlineState=l;let f=!1;h.queries.forEach(((m,y)=>{for(const A of y.Sa)A.va(l)&&(f=!0)})),f&&Li(h)})(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Ug(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),o=s&&s.key;if(o){let a=new J(O.comparator);a=a.insert(o,_t.newNoDocument(o,L.min()));const l=q().add(o),h=new Wr(L.min(),new Map,new J(B),a,l);await sl(r,h),r.Ru=r.Ru.remove(o),r.Au.delete(t),Bi(r)}else await ti(r.localStore,t,!1).then((()=>ri(r,t,e))).catch(tn)}async function Bg(n,t){const e=F(n),r=t.batch.batchId;try{const s=await Qp(e.localStore,t);ol(e,r,null),il(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await $n(e,s)}catch(s){await tn(s)}}async function qg(n,t,e){const r=F(n);try{const s=await(function(a,l){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(f=>{let m;return h.mutationQueue.lookupMutationBatch(f,l).next((y=>(z(y!==null,37113),m=y.keys(),h.mutationQueue.removeMutationBatch(f,y)))).next((()=>h.mutationQueue.performConsistencyCheck(f))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,l))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m))).next((()=>h.localDocuments.getDocuments(f,m)))}))})(r.localStore,t);ol(r,t,e),il(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await $n(r,s)}catch(s){await tn(s)}}function il(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function ol(n,t,e){const r=F(n);let s=r.du[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.du[r.currentUser.toKey()]=s}}function ri(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Eu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Eu.delete(t),n.isPrimaryClient&&n.Vu.Gr(t).forEach((r=>{n.Vu.containsKey(r)||al(n,r)}))}function al(n,t){n.Iu.delete(t.path.canonicalString());const e=n.Ru.get(t);e!==null&&(Ci(n.remoteStore,e),n.Ru=n.Ru.remove(t),n.Au.delete(e),Bi(n))}function rc(n,t,e){for(const r of e)r instanceof el?(n.Vu.addReference(r.key,t),jg(n,r)):r instanceof nl?(D(Ui,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,t),n.Vu.containsKey(r.key)||al(n,r.key)):M(19791,{wu:r})}function jg(n,t){const e=t.key,r=e.path.canonicalString();n.Ru.get(e)||n.Iu.has(r)||(D(Ui,"New document in limbo: "+e),n.Iu.add(r),Bi(n))}function Bi(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const t=n.Iu.values().next().value;n.Iu.delete(t);const e=new O(W.fromString(t)),r=n.fu.next();n.Au.set(r,new Dg(e)),n.Ru=n.Ru.insert(e,r),Qu(n.remoteStore,new te(Lt(jr(e.path)),r,"TargetPurposeLimboResolution",Ur.ce))}}async function $n(n,t,e){const r=F(n),s=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((l,h)=>{a.push(r.pu(h,t,e).then((f=>{var m;if((f||e)&&r.isPrimaryClient){const y=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,y?"current":"not-current")}if(f){s.push(f);const y=bi.Is(h.targetId,f);o.push(y)}})))})),await Promise.all(a),r.Pu.H_(s),await(async function(h,f){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",(y=>b.forEach(f,(A=>b.forEach(A.Ts,(P=>m.persistence.referenceDelegate.addReference(y,A.targetId,P))).next((()=>b.forEach(A.Es,(P=>m.persistence.referenceDelegate.removeReference(y,A.targetId,P)))))))))}catch(y){if(!en(y))throw y;D(Pi,"Failed to update sequence numbers: "+y)}for(const y of f){const A=y.targetId;if(!y.fromCache){const P=m.vs.get(A),N=P.snapshotVersion,x=P.withLastLimboFreeSnapshotVersion(N);m.vs=m.vs.insert(A,x)}}})(r.localStore,o))}async function $g(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){D(Ui,"User change. New user:",t.toKey());const r=await Gu(e.localStore,t);e.currentUser=t,(function(o,a){o.mu.forEach((l=>{l.forEach((h=>{h.reject(new V(S.CANCELLED,a))}))})),o.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await $n(e,r.Ns)}}function zg(n,t){const e=F(n),r=e.Au.get(t);if(r&&r.hu)return q().add(r.key);{let s=q();const o=e.Eu.get(t);if(!o)return s;for(const a of o){const l=e.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function cl(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=sl.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=zg.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Ug.bind(null,t),t.Pu.H_=bg.bind(null,t.eventManager),t.Pu.yu=Pg.bind(null,t.eventManager),t}function Gg(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Bg.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=qg.bind(null,t),t}class Dr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Qr(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return Wp(this.persistence,new Gp,t.initialUser,this.serializer)}Cu(t){return new zu(Si.Vi,this.serializer)}Du(t){return new eg}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Dr.provider={build:()=>new Dr};class Hg extends Dr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){z(this.persistence.referenceDelegate instanceof Cr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Vp(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Rt.withCacheSize(this.cacheSizeBytes):Rt.DEFAULT;return new zu((r=>Cr.Vi(r,e)),this.serializer)}}class si{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>nc(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=$g.bind(null,this.syncEngine),await Ag(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Sg})()}createDatastore(t){const e=Qr(t.databaseInfo.databaseId),r=og(t.databaseInfo);return hg(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,o,a,l){return new dg(r,s,o,a,l)})(this.localStore,this.datastore,t.asyncQueue,(e=>nc(this.syncEngine,e,0)),(function(){return Ya.v()?new Ya:new ng})())}createSyncEngine(t,e){return(function(s,o,a,l,h,f,m){const y=new Ng(s,o,a,l,h,f);return m&&(y.gu=!0),y})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const o=F(s);D(De,"RemoteStore shutting down."),o.Ia.add(5),await jn(o),o.Aa.shutdown(),o.Va.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}si.provider={build:()=>new si};/**
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
 */class qi{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Ht("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
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
 */const le="FirestoreClient";class Kg{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=gt.UNAUTHENTICATED,this.clientId=mi.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async a=>{D(le,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(D(le,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new $t;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Oi(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function Ms(n,t){n.asyncQueue.verifyOperationInProgress(),D(le,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Gu(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function sc(n,t){n.asyncQueue.verifyOperationInProgress();const e=await Wg(n);D(le,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>Xa(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Xa(t.remoteStore,s))),n._onlineComponents=t}async function Wg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D(le,"Using user provided OfflineComponentProvider");try{await Ms(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Ve("Error using user provided cache. Falling back to memory cache: "+e),await Ms(n,new Dr)}}else D(le,"Using default OfflineComponentProvider"),await Ms(n,new Hg(void 0));return n._offlineComponents}async function ul(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D(le,"Using user provided OnlineComponentProvider"),await sc(n,n._uninitializedComponentsProvider._online)):(D(le,"Using default OnlineComponentProvider"),await sc(n,new si))),n._onlineComponents}function Qg(n){return ul(n).then((t=>t.syncEngine))}async function Nr(n){const t=await ul(n),e=t.eventManager;return e.onListen=kg.bind(null,t.syncEngine),e.onUnlisten=Mg.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Og.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Lg.bind(null,t.syncEngine),e}function Yg(n,t,e,r){const s=new qi(r),o=new Fi(t,s,e);return n.asyncQueue.enqueueAndForget((async()=>xi(await Nr(n),o))),()=>{s.Nu(),n.asyncQueue.enqueueAndForget((async()=>Mi(await Nr(n),o)))}}function Jg(n,t,e={}){const r=new $t;return n.asyncQueue.enqueueAndForget((async()=>(function(o,a,l,h,f){const m=new qi({next:A=>{m.Nu(),a.enqueueAndForget((()=>Mi(o,y)));const P=A.docs.has(l);!P&&A.fromCache?f.reject(new V(S.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&A.fromCache&&h&&h.source==="server"?f.reject(new V(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(A)},error:A=>f.reject(A)}),y=new Fi(jr(l.path),m,{includeMetadataChanges:!0,qa:!0});return xi(o,y)})(await Nr(n),n.asyncQueue,t,e,r))),r.promise}function Xg(n,t,e={}){const r=new $t;return n.asyncQueue.enqueueAndForget((async()=>(function(o,a,l,h,f){const m=new qi({next:A=>{m.Nu(),a.enqueueAndForget((()=>Mi(o,y))),A.fromCache&&h.source==="server"?f.reject(new V(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(A)},error:A=>f.reject(A)}),y=new Fi(l,m,{includeMetadataChanges:!0,qa:!0});return xi(o,y)})(await Nr(n),n.asyncQueue,t,e,r))),r.promise}function Zg(n,t){const e=new $t;return n.asyncQueue.enqueueAndForget((async()=>Fg(await Qg(n),t,e))),e.promise}/**
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
 */function ll(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
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
 */const t_="ComponentProvider",ic=new Map;function e_(n,t,e,r,s){return new Tm(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,ll(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
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
 */const hl="firestore.googleapis.com",oc=!0;class ac{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new V(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=hl,this.ssl=oc}else this.host=t.host,this.ssl=t.ssl??oc;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=$u;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Pp)throw new V(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}um("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ll(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Xr{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ac({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new V(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ac(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Zd;switch(r.type){case"firstParty":return new rm(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=ic.get(e);r&&(D(t_,"Removing Datastore"),ic.delete(e),r.terminate())})(this),Promise.resolve()}}function n_(n,t,e,r={}){var f;n=It(n,Xr);const s=vc(t),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},l=`${t}:${e}`;s&&Vh(`https://${l}`),o.host!==hl&&o.host!==l&&Ve("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:l,ssl:s,emulatorOptions:r};if(!Se(h,a)&&(n._setSettings(h),r.mockUserToken)){let m,y;if(typeof r.mockUserToken=="string")m=r.mockUserToken,y=gt.MOCK_USER;else{m=gh(r.mockUserToken,(f=n._app)==null?void 0:f.options.projectId);const A=r.mockUserToken.sub||r.mockUserToken.user_id;if(!A)throw new V(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new gt(A)}n._authCredentials=new tm(new tu(m,y))}}/**
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
 */class me{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new me(this.firestore,t,this._query)}}class tt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new re(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new tt(this.firestore,t,this._key)}toJSON(){return{type:tt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(Un(e,tt._jsonSchema))return new tt(t,r||null,new O(W.fromString(e.referencePath)))}}tt._jsonSchemaVersion="firestore/documentReference/1.0",tt._jsonSchema={type:st("string",tt._jsonSchemaVersion),referencePath:st("string")};class re extends me{constructor(t,e,r){super(t,e,jr(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new tt(this.firestore,null,new O(t))}withConverter(t){return new re(this.firestore,t,this._path)}}function b_(n,t,...e){if(n=wt(n),eu("collection","path",t),n instanceof Xr){const r=W.fromString(t,...e);return Ta(r),new re(n,null,r)}{if(!(n instanceof tt||n instanceof re))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(W.fromString(t,...e));return Ta(r),new re(n.firestore,null,r)}}function r_(n,t,...e){if(n=wt(n),arguments.length===1&&(t=mi.newId()),eu("doc","path",t),n instanceof Xr){const r=W.fromString(t,...e);return Ea(r),new tt(n,null,new O(r))}{if(!(n instanceof tt||n instanceof re))throw new V(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(W.fromString(t,...e));return Ea(r),new tt(n.firestore,n instanceof re?n.converter:null,new O(r))}}/**
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
 */const cc="AsyncQueue";class uc{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ku(this,"async_queue_retry"),this._c=()=>{const r=xs();r&&D(cc,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=xs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=xs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new $t;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Yu.push(t),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!en(t))throw t;D(cc,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,Ht("INTERNAL UNHANDLED ERROR: ",lc(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=ki.createAndSchedule(this,t,e,r,(o=>this.hc(o)));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:lc(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ec(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ic(t){return this.Tc().then((()=>{this.tc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function lc(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class qt extends Xr{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new uc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new uc(t),this._firestoreClient=void 0,await t}}}function P_(n,t){const e=typeof n=="object"?n:wc(),r=typeof n=="string"?n:Ar,s=Fn(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=mh("firestore");o&&n_(s,...o)}return s}function zn(n){if(n._terminated)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||s_(n),n._firestoreClient}function s_(n){var r,s,o,a;const t=n._freezeSettings(),e=e_(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(o=t.localCache)!=null&&o._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new Kg(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(h){const f=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(f),_online:f}})(n._componentsProvider))}/**
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
 */class Dt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Dt(ht.fromBase64String(t))}catch(e){throw new V(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Dt(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Dt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Un(t,Dt._jsonSchema))return Dt.fromBase64String(t.bytes)}}Dt._jsonSchemaVersion="firestore/bytes/1.0",Dt._jsonSchema={type:st("string",Dt._jsonSchemaVersion),bytes:st("string")};/**
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
 */class Zr{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new V(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new lt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class sn{constructor(t){this._methodName=t}}/**
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
 */class Ut{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new V(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new V(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ut._jsonSchemaVersion}}static fromJSON(t){if(Un(t,Ut._jsonSchema))return new Ut(t.latitude,t.longitude)}}Ut._jsonSchemaVersion="firestore/geoPoint/1.0",Ut._jsonSchema={type:st("string",Ut._jsonSchemaVersion),latitude:st("number"),longitude:st("number")};/**
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
 */class Nt{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Nt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Un(t,Nt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new Nt(t.vectorValues);throw new V(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Nt._jsonSchemaVersion="firestore/vectorValue/1.0",Nt._jsonSchema={type:st("string",Nt._jsonSchemaVersion),vectorValues:st("object")};/**
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
 */const i_=/^__.*__$/;class o_{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new de(t,this.data,this.fieldMask,e,this.fieldTransforms):new Bn(t,this.data,e,this.fieldTransforms)}}class fl{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new de(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function dl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:n})}}class ts{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new ts({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.mc(t),r}fc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.Ac(),r}gc(t){return this.i({path:void 0,arrayElement:!0})}yc(t){return kr(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.mc(this.path.get(t))}mc(t){if(t.length===0)throw this.yc("Document fields must not be empty");if(dl(this.dataSource)&&i_.test(t))throw this.yc('Document fields cannot begin and end with "__"')}}class a_{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Qr(t)}A(t,e,r,s=!1){return new ts({dataSource:t,methodName:e,targetDoc:r,path:lt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Gn(n){const t=n._freezeSettings(),e=Qr(n._databaseId);return new a_(n._databaseId,!!t.ignoreUndefinedProperties,e)}function ji(n,t,e,r,s,o={}){const a=n.A(o.merge||o.mergeFields?2:0,t,e,s);Hi("Data must be an object, but it was:",a,r);const l=_l(r,a);let h,f;if(o.merge)h=new Pt(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const y of o.mergeFields){const A=Ne(t,y,e);if(!a.contains(A))throw new V(S.INVALID_ARGUMENT,`Field '${A}' is specified in your field mask but missing from your input data.`);Tl(m,A)||m.push(A)}h=new Pt(m),f=a.fieldTransforms.filter((y=>h.covers(y.field)))}else h=null,f=a.fieldTransforms;return new o_(new St(l),h,f)}class es extends sn{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.yc(`${this._methodName}() can only appear at the top level of your update data`):t.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof es}}function ml(n,t,e){return new ts({dataSource:3,targetDoc:t.settings.targetDoc,methodName:n._methodName,arrayElement:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class $i extends sn{_toFieldTransform(t){return new Ii(t.path,new Ln)}isEqual(t){return t instanceof $i}}class zi extends sn{constructor(t,e){super(t),this.Sc=e}_toFieldTransform(t){const e=ml(this,t,!0),r=this.Sc.map((o=>xe(o,e))),s=new Qe(r);return new Ii(t.path,s)}isEqual(t){return t instanceof zi&&Se(this.Sc,t.Sc)}}class Gi extends sn{constructor(t,e){super(t),this.Sc=e}_toFieldTransform(t){const e=ml(this,t,!0),r=this.Sc.map((o=>xe(o,e))),s=new Ye(r);return new Ii(t.path,s)}isEqual(t){return t instanceof Gi&&Se(this.Sc,t.Sc)}}function pl(n,t,e,r){const s=n.A(1,t,e);Hi("Data must be an object, but it was:",s,r);const o=[],a=St.empty();fe(r,((h,f)=>{const m=El(t,h,e);f=wt(f);const y=s.fc(m);if(f instanceof es)o.push(m);else{const A=xe(f,y);A!=null&&(o.push(m),a.set(m,A))}}));const l=new Pt(o);return new fl(a,l,s.fieldTransforms)}function gl(n,t,e,r,s,o){const a=n.A(1,t,e),l=[Ne(t,r,e)],h=[s];if(o.length%2!=0)throw new V(S.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let A=0;A<o.length;A+=2)l.push(Ne(t,o[A])),h.push(o[A+1]);const f=[],m=St.empty();for(let A=l.length-1;A>=0;--A)if(!Tl(f,l[A])){const P=l[A];let N=h[A];N=wt(N);const x=a.fc(P);if(N instanceof es)f.push(P);else{const k=xe(N,x);k!=null&&(f.push(P),m.set(P,k))}}const y=new Pt(f);return new fl(m,y,a.fieldTransforms)}function c_(n,t,e,r=!1){return xe(e,n.A(r?4:3,t))}function xe(n,t){if(yl(n=wt(n)))return Hi("Unsupported field value:",t,n),_l(n,t);if(n instanceof sn)return(function(r,s){if(!dl(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.yc("Nested arrays are not supported");return(function(r,s){const o=[];let a=0;for(const l of r){let h=xe(l,s.gc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}})(n,t)}return(function(r,s){if((r=wt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Hm(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=Y.fromDate(r);return{timestampValue:Pr(s.serializer,o)}}if(r instanceof Y){const o=new Y(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Pr(s.serializer,o)}}if(r instanceof Ut)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Dt)return{bytesValue:xu(s.serializer,r._byteString)};if(r instanceof tt){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Ai(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Nt)return(function(a,l){const h=a instanceof Nt?a.toArray():a;return{mapValue:{fields:{[lu]:{stringValue:hu},[Rr]:{arrayValue:{values:h.map((m=>{if(typeof m!="number")throw l.yc("VectorValues must only contain numeric values.");return Ti(l.serializer,m)}))}}}}}})(r,s);if(ju(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Fr(r)}`)})(n,t)}function _l(n,t){const e={};return su(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):fe(n,((r,s)=>{const o=xe(s,t.dc(r));o!=null&&(e[r]=o)})),{mapValue:{fields:e}}}function yl(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Y||n instanceof Ut||n instanceof Dt||n instanceof tt||n instanceof sn||n instanceof Nt||ju(n))}function Hi(n,t,e){if(!yl(e)||!nu(e)){const r=Fr(e);throw r==="an object"?t.yc(n+" a custom object"):t.yc(n+" "+r)}}function Ne(n,t,e){if((t=wt(t))instanceof Zr)return t._internalPath;if(typeof t=="string")return El(n,t);throw kr("Field path arguments must be of type string or ",n,!1,void 0,e)}const u_=new RegExp("[~\\*/\\[\\]]");function El(n,t,e){if(t.search(u_)>=0)throw kr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Zr(...t.split("."))._internalPath}catch{throw kr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function kr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new V(S.INVALID_ARGUMENT,l+n+h)}function Tl(n,t){return n.some((e=>e.isEqual(t)))}/**
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
 */class l_{convertValue(t,e="none"){switch(ce(t)){case 0:return null;case 1:return t.booleanValue;case 2:return et(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ae(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return fe(t,((s,o)=>{r[s]=this.convertValue(o,e)})),r}convertVectorValue(t){var r,s,o;const e=(o=(s=(r=t.fields)==null?void 0:r[Rr].arrayValue)==null?void 0:s.values)==null?void 0:o.map((a=>et(a.doubleValue)));return new Nt(e)}convertGeoPoint(t){return new Ut(et(t.latitude),et(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=qr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(kn(t));default:return null}}convertTimestamp(t){const e=oe(t);return new Y(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=W.fromString(t);z(qu(r),9688,{name:t});const s=new On(r.get(1),r.get(3)),o=new O(r.popFirst(5));return s.isEqual(e)||Ht(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
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
 */class Ki extends l_{constructor(t){super(),this.firestore=t}convertBytes(t){return new Dt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new tt(this.firestore,null,e)}}function C_(){return new $i("serverTimestamp")}function V_(...n){return new zi("arrayUnion",n)}function D_(...n){return new Gi("arrayRemove",n)}const hc="@firebase/firestore",fc="4.13.0";/**
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
 */function dc(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const o of r)if(o in s&&typeof s[o]=="function")return!0;return!1})(n,["next","error","complete"])}/**
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
 */class Il{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new tt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new h_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Ne("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class h_ extends Il{data(){return super.data()}}/**
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
 */function vl(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Wi{}class wl extends Wi{}function N_(n,t,...e){let r=[];t instanceof Wi&&r.push(t),r=r.concat(e),(function(o){const a=o.filter((h=>h instanceof Qi)).length,l=o.filter((h=>h instanceof ns)).length;if(a>1||a>0&&l>0)throw new V(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class ns extends wl{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new ns(t,e,r)}_apply(t){const e=this._parse(t);return Al(t._query,e),new me(t.firestore,t.converter,Ws(t._query,e))}_parse(t){const e=Gn(t.firestore);return(function(o,a,l,h,f,m,y){let A;if(f.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new V(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){pc(y,m);const N=[];for(const x of y)N.push(mc(h,o,x));A={arrayValue:{values:N}}}else A=mc(h,o,y)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||pc(y,m),A=c_(l,a,y,m==="in"||m==="not-in");return rt.create(f,m,A)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function k_(n,t,e){const r=t,s=Ne("where",n);return ns._create(s,r,e)}class Qi extends Wi{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Qi(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:kt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,o){let a=s;const l=o.getFlattenedFilters();for(const h of l)Al(a,h),a=Ws(a,h)})(t._query,e),new me(t.firestore,t.converter,Ws(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Yi extends wl{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Yi(t,e)}_apply(t){const e=(function(s,o,a){if(s.startAt!==null)throw new V(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new V(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Mn(o,a)})(t._query,this._field,this._direction);return new me(t.firestore,t.converter,Fm(t._query,e))}}function O_(n,t="asc"){const e=t,r=Ne("orderBy",n);return Yi._create(r,e)}function mc(n,t,e){if(typeof(e=wt(e))=="string"){if(e==="")throw new V(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Eu(t)&&e.indexOf("/")!==-1)throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(W.fromString(e));if(!O.isDocumentKey(r))throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Pa(n,new O(r))}if(e instanceof tt)return Pa(n,e._key);throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fr(e)}.`)}function pc(n,t){if(!Array.isArray(n)||n.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Al(n,t){const e=(function(s,o){for(const a of s)for(const l of a.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new V(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new V(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function Ji(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class Sn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ae extends Il{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new yr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Ne("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Ae._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Ae._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ae._jsonSchema={type:st("string",Ae._jsonSchemaVersion),bundleSource:st("string","DocumentSnapshot"),bundleName:st("string"),bundle:st("string")};class yr extends Ae{data(t={}){return super.data(t)}}class Re{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Sn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new yr(this._firestore,this._userDataWriter,r.key,r,new Sn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new V(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((l=>{const h=new yr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Sn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>o||l.type!==3)).map((l=>{const h=new yr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Sn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,m=-1;return l.type!==0&&(f=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:f_(l.type),doc:h,oldIndex:f,newIndex:m}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Re._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=mi.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function f_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}/**
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
 */Re._jsonSchemaVersion="firestore/querySnapshot/1.0",Re._jsonSchema={type:st("string",Re._jsonSchemaVersion),bundleSource:st("string","QuerySnapshot"),bundleName:st("string"),bundle:st("string")};/**
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
 */class d_{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Gn(t)}set(t,e,r){this._verifyNotCommitted();const s=Ls(t,this._firestore),o=Ji(s.converter,e,r),a=ji(this._dataReader,"WriteBatch.set",s._key,o,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,vt.none())),this}update(t,e,r,...s){this._verifyNotCommitted();const o=Ls(t,this._firestore);let a;return a=typeof(e=wt(e))=="string"||e instanceof Zr?gl(this._dataReader,"WriteBatch.update",o._key,e,r,s):pl(this._dataReader,"WriteBatch.update",o._key,e),this._mutations.push(a.toMutation(o._key,vt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Ls(t,this._firestore);return this._mutations=this._mutations.concat(new Kr(e._key,vt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(S.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Ls(n,t){if((n=wt(n)).firestore!==t)throw new V(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */function x_(n){n=It(n,tt);const t=It(n.firestore,qt),e=zn(t);return Jg(e,n._key).then((r=>Rl(t,n,r)))}function M_(n){n=It(n,me);const t=It(n.firestore,qt),e=zn(t),r=new Ki(t);return vl(n._query),Xg(e,n._query).then((s=>new Re(t,r,n,s)))}function L_(n,t,e){n=It(n,tt);const r=It(n.firestore,qt),s=Ji(n.converter,t,e),o=Gn(r);return Hn(r,[ji(o,"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,vt.none())])}function F_(n,t,e,...r){n=It(n,tt);const s=It(n.firestore,qt),o=Gn(s);let a;return a=typeof(t=wt(t))=="string"||t instanceof Zr?gl(o,"updateDoc",n._key,t,e,r):pl(o,"updateDoc",n._key,t),Hn(s,[a.toMutation(n._key,vt.exists(!0))])}function U_(n){return Hn(It(n.firestore,qt),[new Kr(n._key,vt.none())])}function B_(n,t){const e=It(n.firestore,qt),r=r_(n),s=Ji(n.converter,t),o=Gn(n.firestore);return Hn(e,[ji(o,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,vt.exists(!1))]).then((()=>r))}function q_(n,...t){var f,m,y;n=wt(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||dc(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(dc(t[r])){const A=t[r];t[r]=(f=A.next)==null?void 0:f.bind(A),t[r+1]=(m=A.error)==null?void 0:m.bind(A),t[r+2]=(y=A.complete)==null?void 0:y.bind(A)}let o,a,l;if(n instanceof tt)a=It(n.firestore,qt),l=jr(n._key.path),o={next:A=>{t[r]&&t[r](Rl(a,n,A))},error:t[r+1],complete:t[r+2]};else{const A=It(n,me);a=It(A.firestore,qt),l=A._query;const P=new Ki(a);o={next:N=>{t[r]&&t[r](new Re(a,P,A,N))},error:t[r+1],complete:t[r+2]},vl(n._query)}const h=zn(a);return Yg(h,l,s,o)}function Hn(n,t){const e=zn(n);return Zg(e,t)}function Rl(n,t,e){const r=e.docs.get(t._key),s=new Ki(n);return new Ae(n,s,t._key,r,new Sn(e.hasPendingWrites,e.fromCache),t.converter)}function j_(n){return n=It(n,qt),zn(n),new d_(n,(t=>Hn(n,t)))}(function(t,e=!0){Xd(Tf),se(new zt("firestore",((r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new qt(new em(r.getProvider("auth-internal")),new sm(a,r.getProvider("app-check-internal")),Im(a,s),a);return o={useFetchStreams:e,...o},l._setSettings(o),l}),"PUBLIC").setMultipleInstances(!0)),jt(hc,fc,t),jt(hc,fc,"esm2020")})();export{N_ as A,k_ as B,zt as C,b_ as D,xr as E,he as F,q_ as G,L_ as H,r_ as I,C_ as J,O_ as K,oi as L,U_ as M,M_ as N,F_ as O,V_ as P,D_ as Q,B_ as R,Tf as S,j_ as T,x_ as U,se as _,y_ as a,yh as b,_f as c,wt as d,A_ as e,$ as f,p_ as g,ii as h,g_ as i,ch as j,vc as k,Fn as l,dh as m,wc as n,Se as o,Vh as p,I_ as q,jt as r,E_ as s,T_ as t,__ as u,v_ as v,w_ as w,If as x,P_ as y,R_ as z};
