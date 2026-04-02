import{o as eh}from"./idb-BXWtuYvb.js";const Fm=()=>{};var gc={};/**
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
 */const nh=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Lm=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const s=r[e++];if(s<128)t[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[e++];t[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[e++],a=r[e++],u=r[e++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;t[n++]=String.fromCharCode(55296+(l>>10)),t[n++]=String.fromCharCode(56320+(l&1023))}else{const i=r[e++],a=r[e++];t[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},rh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],a=s+1<r.length,u=a?r[s+1]:0,l=s+2<r.length,h=l?r[s+2]:0,f=i>>2,p=(i&3)<<4|u>>4;let I=(u&15)<<2|h>>6,P=h&63;l||(P=64,a||(I=64)),n.push(e[f],e[p],e[I],e[P])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(nh(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):Lm(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=e[r.charAt(s++)],u=s<r.length?e[r.charAt(s)]:0;++s;const h=s<r.length?e[r.charAt(s)]:64;++s;const p=s<r.length?e[r.charAt(s)]:64;if(++s,i==null||u==null||h==null||p==null)throw new Bm;const I=i<<2|u>>4;if(n.push(I),h!==64){const P=u<<4&240|h>>2;if(n.push(P),p!==64){const D=h<<6&192|p;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Bm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Um=function(r){const t=nh(r);return rh.encodeByteArray(t,!0)},sh=function(r){return Um(r).replace(/\./g,"")},qm=function(r){try{return rh.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function ih(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const jm=()=>ih().__FIREBASE_DEFAULTS__,$m=()=>{if(typeof process>"u"||typeof gc>"u")return;const r=gc.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},zm=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&qm(r[1]);return t&&JSON.parse(t)},_i=()=>{try{return Fm()||jm()||$m()||zm()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},aT=r=>{var t,e;return(e=(t=_i())==null?void 0:t.emulatorHosts)==null?void 0:e[r]},oh=()=>{var r;return(r=_i())==null?void 0:r.config},uT=r=>{var t;return(t=_i())==null?void 0:t[`_${r}`]};/**
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
 */class Gm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
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
 */function kn(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function cT(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(kn())}function ah(){var t;const r=(t=_i())==null?void 0:t.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function lT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Km(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function hT(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dT(){const r=kn();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function uh(){return!ah()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ch(){return!ah()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function oa(){try{return typeof indexedDB=="object"}catch{return!1}}function lh(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}function Hm(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Wm="FirebaseError";class Ve extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=Wm,Object.setPrototypeOf(this,Ve.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,yi.prototype.create)}}class yi{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],a=i?Qm(i,n):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new Ve(s,u,n)}}function Qm(r,t){return r.replace(Jm,(e,n)=>{const s=t[n];return s!=null?String(s):`<${n}?>`})}const Jm=/\{\$([^}]+)}/g;function fT(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}function en(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const s of e){if(!n.includes(s))return!1;const i=r[s],a=t[s];if(_c(i)&&_c(a)){if(!en(i,a))return!1}else if(i!==a)return!1}for(const s of n)if(!e.includes(s))return!1;return!0}function _c(r){return r!==null&&typeof r=="object"}/**
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
 */function mT(r){const t=[];for(const[e,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(n));return t.length?"&"+t.join("&"):""}function pT(r){const t={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");t[decodeURIComponent(s)]=decodeURIComponent(i)}}),t}function gT(r){const t=r.indexOf("?");if(!t)return"";const e=r.indexOf("#",t);return r.substring(t,e>0?e:void 0)}function _T(r,t){const e=new Ym(r,t);return e.subscribe.bind(e)}class Ym{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(n=>{this.error(n)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,n){let s;if(t===void 0&&e===void 0&&n===void 0)throw new Error("Missing Observer.");Xm(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:n},s.next===void 0&&(s.next=po),s.error===void 0&&(s.error=po),s.complete===void 0&&(s.complete=po);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Xm(r,t){if(typeof r!="object"||r===null)return!1;for(const e of t)if(e in r&&typeof r[e]=="function")return!0;return!1}function po(){}/**
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
 */const Zm=1e3,tp=2,ep=14400*1e3,np=.5;function yc(r,t=Zm,e=tp){const n=t*Math.pow(e,r),s=Math.round(np*n*(Math.random()-.5)*2);return Math.min(ep,n+s)}/**
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
 */function Ct(r){return r&&r._delegate?r._delegate:r}/**
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
 */function hh(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function rp(r){return(await fetch(r,{credentials:"include"})).ok}class ne{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const qe="[DEFAULT]";/**
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
 */class sp{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new Gm;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),n=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(op(t))try{this.getOrInitializeService({instanceIdentifier:qe})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(t=qe){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=qe){return this.instances.has(t)}getOptions(t=qe){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[i,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);n===u&&a.resolve(s)}return s}onInit(t,e){const n=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(n)??new Set;s.add(t),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&t(i,n),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:ip(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=qe){return this.component?this.component.multipleInstances?t:qe:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ip(r){return r===qe?void 0:r}function op(r){return r.instantiationMode==="EAGER"}/**
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
 */class ap{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new sp(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var W;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(W||(W={}));const up={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},cp=W.INFO,lp={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},hp=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),s=lp[t];if(s)console[s](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class aa{constructor(t){this.name=t,this._logLevel=cp,this._logHandler=hp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in W))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?up[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...t),this._logHandler(this,W.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...t),this._logHandler(this,W.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,W.INFO,...t),this._logHandler(this,W.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,W.WARN,...t),this._logHandler(this,W.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...t),this._logHandler(this,W.ERROR,...t)}}/**
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
 */class dp{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(fp(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function fp(r){const t=r.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Co="@firebase/app",Ic="0.14.10";/**
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
 */const re=new aa("@firebase/app"),mp="@firebase/app-compat",pp="@firebase/analytics-compat",gp="@firebase/analytics",_p="@firebase/app-check-compat",yp="@firebase/app-check",Ip="@firebase/auth",Ep="@firebase/auth-compat",Tp="@firebase/database",wp="@firebase/data-connect",vp="@firebase/database-compat",Ap="@firebase/functions",bp="@firebase/functions-compat",Rp="@firebase/installations",Sp="@firebase/installations-compat",Pp="@firebase/messaging",Vp="@firebase/messaging-compat",Cp="@firebase/performance",Dp="@firebase/performance-compat",xp="@firebase/remote-config",Np="@firebase/remote-config-compat",kp="@firebase/storage",Op="@firebase/storage-compat",Mp="@firebase/firestore",Fp="@firebase/ai",Lp="@firebase/firestore-compat",Bp="firebase",Up="12.11.0";/**
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
 */const Do="[DEFAULT]",qp={[Co]:"fire-core",[mp]:"fire-core-compat",[gp]:"fire-analytics",[pp]:"fire-analytics-compat",[yp]:"fire-app-check",[_p]:"fire-app-check-compat",[Ip]:"fire-auth",[Ep]:"fire-auth-compat",[Tp]:"fire-rtdb",[wp]:"fire-data-connect",[vp]:"fire-rtdb-compat",[Ap]:"fire-fn",[bp]:"fire-fn-compat",[Rp]:"fire-iid",[Sp]:"fire-iid-compat",[Pp]:"fire-fcm",[Vp]:"fire-fcm-compat",[Cp]:"fire-perf",[Dp]:"fire-perf-compat",[xp]:"fire-rc",[Np]:"fire-rc-compat",[kp]:"fire-gcs",[Op]:"fire-gcs-compat",[Mp]:"fire-fst",[Lp]:"fire-fst-compat",[Fp]:"fire-vertex","fire-js":"fire-js",[Bp]:"fire-js-all"};/**
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
 */const Ws=new Map,jp=new Map,xo=new Map;function Ec(r,t){try{r.container.addComponent(t)}catch(e){re.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function Ae(r){const t=r.name;if(xo.has(t))return re.debug(`There were multiple attempts to register component ${t}.`),!1;xo.set(t,r);for(const e of Ws.values())Ec(e,r);for(const e of jp.values())Ec(e,r);return!0}function es(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}function $p(r){return r==null?!1:r.settings!==void 0}/**
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
 */const zp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ee=new yi("app","Firebase",zp);/**
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
 */class Gp{constructor(t,e,n){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new ne("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Ee.create("app-deleted",{appName:this._name})}}/**
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
 */const Kp=Up;function Hp(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n={name:Do,automaticDataCollectionEnabled:!0,...t},s=n.name;if(typeof s!="string"||!s)throw Ee.create("bad-app-name",{appName:String(s)});if(e||(e=oh()),!e)throw Ee.create("no-options");const i=Ws.get(s);if(i){if(en(e,i.options)&&en(n,i.config))return i;throw Ee.create("duplicate-app",{appName:s})}const a=new ap(s);for(const l of xo.values())a.addComponent(l);const u=new Gp(e,n,a);return Ws.set(s,u),u}function Wp(r=Do){const t=Ws.get(r);if(!t&&r===Do&&oh())return Hp();if(!t)throw Ee.create("no-app",{appName:r});return t}function ee(r,t,e){let n=qp[r]??r;e&&(n+=`-${e}`);const s=n.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const a=[`Unable to register library "${n}" with version "${t}":`];s&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),re.warn(a.join(" "));return}Ae(new ne(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}/**
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
 */const Qp="firebase-heartbeat-database",Jp=1,qr="firebase-heartbeat-store";let go=null;function dh(){return go||(go=eh(Qp,Jp,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(qr)}catch(e){console.warn(e)}}}}).catch(r=>{throw Ee.create("idb-open",{originalErrorMessage:r.message})})),go}async function Yp(r){try{const e=(await dh()).transaction(qr),n=await e.objectStore(qr).get(fh(r));return await e.done,n}catch(t){if(t instanceof Ve)re.warn(t.message);else{const e=Ee.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});re.warn(e.message)}}}async function Tc(r,t){try{const n=(await dh()).transaction(qr,"readwrite");await n.objectStore(qr).put(t,fh(r)),await n.done}catch(e){if(e instanceof Ve)re.warn(e.message);else{const n=Ee.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});re.warn(n.message)}}}function fh(r){return`${r.name}!${r.options.appId}`}/**
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
 */const Xp=1024,Zp=30;class tg{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new ng(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=wc();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Zp){const a=rg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){re.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=wc(),{heartbeatsToSend:n,unsentEntries:s}=eg(this._heartbeatsCache.heartbeats),i=sh(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return re.warn(e),""}}}function wc(){return new Date().toISOString().substring(0,10)}function eg(r,t=Xp){const e=[];let n=r.slice();for(const s of r){const i=e.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),vc(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),vc(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class ng{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return oa()?lh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Yp(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return Tc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const n=await this.read();return Tc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}else return}}function vc(r){return sh(JSON.stringify({version:2,heartbeats:r})).length}function rg(r){if(r.length===0)return-1;let t=0,e=r[0].date;for(let n=1;n<r.length;n++)r[n].date<e&&(e=r[n].date,t=n);return t}/**
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
 */function sg(r){Ae(new ne("platform-logger",t=>new dp(t),"PRIVATE")),Ae(new ne("heartbeat",t=>new tg(t),"PRIVATE")),ee(Co,Ic,r),ee(Co,Ic,"esm2020"),ee("fire-js","")}sg("");const mh="@firebase/installations",ua="0.6.21";/**
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
 */const ph=1e4,gh=`w:${ua}`,_h="FIS_v2",ig="https://firebaseinstallations.googleapis.com/v1",og=3600*1e3,ag="installations",ug="Installations";/**
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
 */const cg={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},nn=new yi(ag,ug,cg);function yh(r){return r instanceof Ve&&r.code.includes("request-failed")}/**
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
 */function Ih({projectId:r}){return`${ig}/projects/${r}/installations`}function Eh(r){return{token:r.token,requestStatus:2,expiresIn:hg(r.expiresIn),creationTime:Date.now()}}async function Th(r,t){const n=(await t.json()).error;return nn.create("request-failed",{requestName:r,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function wh({apiKey:r}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":r})}function lg(r,{refreshToken:t}){const e=wh(r);return e.append("Authorization",dg(t)),e}async function vh(r){const t=await r();return t.status>=500&&t.status<600?r():t}function hg(r){return Number(r.replace("s","000"))}function dg(r){return`${_h} ${r}`}/**
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
 */async function fg({appConfig:r,heartbeatServiceProvider:t},{fid:e}){const n=Ih(r),s=wh(r),i=t.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const a={fid:e,authVersion:_h,appId:r.appId,sdkVersion:gh},u={method:"POST",headers:s,body:JSON.stringify(a)},l=await vh(()=>fetch(n,u));if(l.ok){const h=await l.json();return{fid:h.fid||e,registrationStatus:2,refreshToken:h.refreshToken,authToken:Eh(h.authToken)}}else throw await Th("Create Installation",l)}/**
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
 */function Ah(r){return new Promise(t=>{setTimeout(t,r)})}/**
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
 */function mg(r){return btoa(String.fromCharCode(...r)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const pg=/^[cdef][\w-]{21}$/,No="";function gg(){try{const r=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(r),r[0]=112+r[0]%16;const e=_g(r);return pg.test(e)?e:No}catch{return No}}function _g(r){return mg(r).substr(0,22)}/**
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
 */function Ii(r){return`${r.appName}!${r.appId}`}/**
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
 */const bh=new Map;function Rh(r,t){const e=Ii(r);Sh(e,t),yg(e,t)}function Sh(r,t){const e=bh.get(r);if(e)for(const n of e)n(t)}function yg(r,t){const e=Ig();e&&e.postMessage({key:r,fid:t}),Eg()}let We=null;function Ig(){return!We&&"BroadcastChannel"in self&&(We=new BroadcastChannel("[Firebase] FID Change"),We.onmessage=r=>{Sh(r.data.key,r.data.fid)}),We}function Eg(){bh.size===0&&We&&(We.close(),We=null)}/**
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
 */const Tg="firebase-installations-database",wg=1,rn="firebase-installations-store";let _o=null;function ca(){return _o||(_o=eh(Tg,wg,{upgrade:(r,t)=>{switch(t){case 0:r.createObjectStore(rn)}}})),_o}async function Qs(r,t){const e=Ii(r),s=(await ca()).transaction(rn,"readwrite"),i=s.objectStore(rn),a=await i.get(e);return await i.put(t,e),await s.done,(!a||a.fid!==t.fid)&&Rh(r,t.fid),t}async function Ph(r){const t=Ii(r),n=(await ca()).transaction(rn,"readwrite");await n.objectStore(rn).delete(t),await n.done}async function Ei(r,t){const e=Ii(r),s=(await ca()).transaction(rn,"readwrite"),i=s.objectStore(rn),a=await i.get(e),u=t(a);return u===void 0?await i.delete(e):await i.put(u,e),await s.done,u&&(!a||a.fid!==u.fid)&&Rh(r,u.fid),u}/**
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
 */async function la(r){let t;const e=await Ei(r.appConfig,n=>{const s=vg(n),i=Ag(r,s);return t=i.registrationPromise,i.installationEntry});return e.fid===No?{installationEntry:await t}:{installationEntry:e,registrationPromise:t}}function vg(r){const t=r||{fid:gg(),registrationStatus:0};return Vh(t)}function Ag(r,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(nn.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const e={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},n=bg(r,e);return{installationEntry:e,registrationPromise:n}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Rg(r)}:{installationEntry:t}}async function bg(r,t){try{const e=await fg(r,t);return Qs(r.appConfig,e)}catch(e){throw yh(e)&&e.customData.serverCode===409?await Ph(r.appConfig):await Qs(r.appConfig,{fid:t.fid,registrationStatus:0}),e}}async function Rg(r){let t=await Ac(r.appConfig);for(;t.registrationStatus===1;)await Ah(100),t=await Ac(r.appConfig);if(t.registrationStatus===0){const{installationEntry:e,registrationPromise:n}=await la(r);return n||e}return t}function Ac(r){return Ei(r,t=>{if(!t)throw nn.create("installation-not-found");return Vh(t)})}function Vh(r){return Sg(r)?{fid:r.fid,registrationStatus:0}:r}function Sg(r){return r.registrationStatus===1&&r.registrationTime+ph<Date.now()}/**
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
 */async function Pg({appConfig:r,heartbeatServiceProvider:t},e){const n=Vg(r,e),s=lg(r,e),i=t.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const a={installation:{sdkVersion:gh,appId:r.appId}},u={method:"POST",headers:s,body:JSON.stringify(a)},l=await vh(()=>fetch(n,u));if(l.ok){const h=await l.json();return Eh(h)}else throw await Th("Generate Auth Token",l)}function Vg(r,{fid:t}){return`${Ih(r)}/${t}/authTokens:generate`}/**
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
 */async function ha(r,t=!1){let e;const n=await Ei(r.appConfig,i=>{if(!Ch(i))throw nn.create("not-registered");const a=i.authToken;if(!t&&xg(a))return i;if(a.requestStatus===1)return e=Cg(r,t),i;{if(!navigator.onLine)throw nn.create("app-offline");const u=kg(i);return e=Dg(r,u),u}});return e?await e:n.authToken}async function Cg(r,t){let e=await bc(r.appConfig);for(;e.authToken.requestStatus===1;)await Ah(100),e=await bc(r.appConfig);const n=e.authToken;return n.requestStatus===0?ha(r,t):n}function bc(r){return Ei(r,t=>{if(!Ch(t))throw nn.create("not-registered");const e=t.authToken;return Og(e)?{...t,authToken:{requestStatus:0}}:t})}async function Dg(r,t){try{const e=await Pg(r,t),n={...t,authToken:e};return await Qs(r.appConfig,n),e}catch(e){if(yh(e)&&(e.customData.serverCode===401||e.customData.serverCode===404))await Ph(r.appConfig);else{const n={...t,authToken:{requestStatus:0}};await Qs(r.appConfig,n)}throw e}}function Ch(r){return r!==void 0&&r.registrationStatus===2}function xg(r){return r.requestStatus===2&&!Ng(r)}function Ng(r){const t=Date.now();return t<r.creationTime||r.creationTime+r.expiresIn<t+og}function kg(r){const t={requestStatus:1,requestTime:Date.now()};return{...r,authToken:t}}function Og(r){return r.requestStatus===1&&r.requestTime+ph<Date.now()}/**
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
 */async function Mg(r){const t=r,{installationEntry:e,registrationPromise:n}=await la(t);return n?n.catch(console.error):ha(t).catch(console.error),e.fid}/**
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
 */async function Fg(r,t=!1){const e=r;return await Lg(e),(await ha(e,t)).token}async function Lg(r){const{registrationPromise:t}=await la(r);t&&await t}/**
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
 */function Bg(r){if(!r||!r.options)throw yo("App Configuration");if(!r.name)throw yo("App Name");const t=["projectId","apiKey","appId"];for(const e of t)if(!r.options[e])throw yo(e);return{appName:r.name,projectId:r.options.projectId,apiKey:r.options.apiKey,appId:r.options.appId}}function yo(r){return nn.create("missing-app-config-values",{valueName:r})}/**
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
 */const Dh="installations",Ug="installations-internal",qg=r=>{const t=r.getProvider("app").getImmediate(),e=Bg(t),n=es(t,"heartbeat");return{app:t,appConfig:e,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},jg=r=>{const t=r.getProvider("app").getImmediate(),e=es(t,Dh).getImmediate();return{getId:()=>Mg(e),getToken:s=>Fg(e,s)}};function $g(){Ae(new ne(Dh,qg,"PUBLIC")),Ae(new ne(Ug,jg,"PRIVATE"))}$g();ee(mh,ua);ee(mh,ua,"esm2020");/**
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
 */const Js="analytics",zg="firebase_id",Gg="origin",Kg=60*1e3,Hg="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",da="https://www.googletagmanager.com/gtag/js";/**
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
 */const Pt=new aa("@firebase/analytics");/**
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
 */const Wg={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Lt=new yi("analytics","Analytics",Wg);/**
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
 */function Qg(r){if(!r.startsWith(da)){const t=Lt.create("invalid-gtag-resource",{gtagURL:r});return Pt.warn(t.message),""}return r}function xh(r){return Promise.all(r.map(t=>t.catch(e=>e)))}function Jg(r,t){let e;return window.trustedTypes&&(e=window.trustedTypes.createPolicy(r,t)),e}function Yg(r,t){const e=Jg("firebase-js-sdk-policy",{createScriptURL:Qg}),n=document.createElement("script"),s=`${da}?l=${r}&id=${t}`;n.src=e?e==null?void 0:e.createScriptURL(s):s,n.async=!0,document.head.appendChild(n)}function Xg(r){let t=[];return Array.isArray(window[r])?t=window[r]:window[r]=t,t}async function Zg(r,t,e,n,s,i){const a=n[s];try{if(a)await t[a];else{const l=(await xh(e)).find(h=>h.measurementId===s);l&&await t[l.appId]}}catch(u){Pt.error(u)}r("config",s,i)}async function t_(r,t,e,n,s){try{let i=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const u=await xh(e);for(const l of a){const h=u.find(p=>p.measurementId===l),f=h&&t[h.appId];if(f)i.push(f);else{i=[];break}}}i.length===0&&(i=Object.values(t)),await Promise.all(i),r("event",n,s||{})}catch(i){Pt.error(i)}}function e_(r,t,e,n){async function s(i,...a){try{if(i==="event"){const[u,l]=a;await t_(r,t,e,u,l)}else if(i==="config"){const[u,l]=a;await Zg(r,t,e,n,u,l)}else if(i==="consent"){const[u,l]=a;r("consent",u,l)}else if(i==="get"){const[u,l,h]=a;r("get",u,l,h)}else if(i==="set"){const[u]=a;r("set",u)}else r(i,...a)}catch(u){Pt.error(u)}}return s}function n_(r,t,e,n,s){let i=function(...a){window[n].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=e_(i,r,t,e),{gtagCore:i,wrappedGtag:window[s]}}function r_(r){const t=window.document.getElementsByTagName("script");for(const e of Object.values(t))if(e.src&&e.src.includes(da)&&e.src.includes(r))return e;return null}/**
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
 */const s_=30,i_=1e3;class o_{constructor(t={},e=i_){this.throttleMetadata=t,this.intervalMillis=e}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,e){this.throttleMetadata[t]=e}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Nh=new o_;function a_(r){return new Headers({Accept:"application/json","x-goog-api-key":r})}async function u_(r){var a;const{appId:t,apiKey:e}=r,n={method:"GET",headers:a_(e)},s=Hg.replace("{app-id}",t),i=await fetch(s,n);if(i.status!==200&&i.status!==304){let u="";try{const l=await i.json();(a=l.error)!=null&&a.message&&(u=l.error.message)}catch{}throw Lt.create("config-fetch-failed",{httpStatus:i.status,responseMessage:u})}return i.json()}async function c_(r,t=Nh,e){const{appId:n,apiKey:s,measurementId:i}=r.options;if(!n)throw Lt.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:n};throw Lt.create("no-api-key")}const a=t.getThrottleMetadata(n)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new d_;return setTimeout(async()=>{u.abort()},Kg),kh({appId:n,apiKey:s,measurementId:i},a,u,t)}async function kh(r,{throttleEndTimeMillis:t,backoffCount:e},n,s=Nh){var u;const{appId:i,measurementId:a}=r;try{await l_(n,t)}catch(l){if(a)return Pt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:i,measurementId:a};throw l}try{const l=await u_(r);return s.deleteThrottleMetadata(i),l}catch(l){const h=l;if(!h_(h)){if(s.deleteThrottleMetadata(i),a)return Pt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:i,measurementId:a};throw l}const f=Number((u=h==null?void 0:h.customData)==null?void 0:u.httpStatus)===503?yc(e,s.intervalMillis,s_):yc(e,s.intervalMillis),p={throttleEndTimeMillis:Date.now()+f,backoffCount:e+1};return s.setThrottleMetadata(i,p),Pt.debug(`Calling attemptFetch again in ${f} millis`),kh(r,p,n,s)}}function l_(r,t){return new Promise((e,n)=>{const s=Math.max(t-Date.now(),0),i=setTimeout(e,s);r.addEventListener(()=>{clearTimeout(i),n(Lt.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function h_(r){if(!(r instanceof Ve)||!r.customData)return!1;const t=Number(r.customData.httpStatus);return t===429||t===500||t===503||t===504}class d_{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function f_(r,t,e,n,s){if(s&&s.global){r("event",e,n);return}else{const i=await t,a={...n,send_to:i};r("event",e,a)}}async function m_(r,t,e,n){if(n&&n.global){const s={};for(const i of Object.keys(e))s[`user_properties.${i}`]=e[i];return r("set",s),Promise.resolve()}else{const s=await t;r("config",s,{update:!0,user_properties:e})}}/**
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
 */async function p_(){if(oa())try{await lh()}catch(r){return Pt.warn(Lt.create("indexeddb-unavailable",{errorInfo:r==null?void 0:r.toString()}).message),!1}else return Pt.warn(Lt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function g_(r,t,e,n,s,i,a){const u=c_(r);u.then(I=>{e[I.measurementId]=I.appId,r.options.measurementId&&I.measurementId!==r.options.measurementId&&Pt.warn(`The measurement ID in the local Firebase config (${r.options.measurementId}) does not match the measurement ID fetched from the server (${I.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(I=>Pt.error(I)),t.push(u);const l=p_().then(I=>{if(I)return n.getId()}),[h,f]=await Promise.all([u,l]);r_(i)||Yg(i,h.measurementId),s("js",new Date);const p=(a==null?void 0:a.config)??{};return p[Gg]="firebase",p.update=!0,f!=null&&(p[zg]=f),s("config",h.measurementId,p),h.measurementId}/**
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
 */class __{constructor(t){this.app=t}_delete(){return delete Dn[this.app.options.appId],Promise.resolve()}}let Dn={},Rc=[];const Sc={};let Io="dataLayer",y_="gtag",Pc,fa,Vc=!1;function I_(){const r=[];if(Km()&&r.push("This is a browser extension environment."),Hm()||r.push("Cookies are not available."),r.length>0){const t=r.map((n,s)=>`(${s+1}) ${n}`).join(" "),e=Lt.create("invalid-analytics-context",{errorInfo:t});Pt.warn(e.message)}}function E_(r,t,e){I_();const n=r.options.appId;if(!n)throw Lt.create("no-app-id");if(!r.options.apiKey)if(r.options.measurementId)Pt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${r.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Lt.create("no-api-key");if(Dn[n]!=null)throw Lt.create("already-exists",{id:n});if(!Vc){Xg(Io);const{wrappedGtag:i,gtagCore:a}=n_(Dn,Rc,Sc,Io,y_);fa=i,Pc=a,Vc=!0}return Dn[n]=g_(r,Rc,Sc,t,Pc,Io,e),new __(r)}function yT(r=Wp()){r=Ct(r);const t=es(r,Js);return t.isInitialized()?t.getImmediate():T_(r)}function T_(r,t={}){const e=es(r,Js);if(e.isInitialized()){const s=e.getImmediate();if(en(t,e.getOptions()))return s;throw Lt.create("already-initialized")}return e.initialize({options:t})}function w_(r,t,e){r=Ct(r),m_(fa,Dn[r.app.options.appId],t,e).catch(n=>Pt.error(n))}function v_(r,t,e,n){r=Ct(r),f_(fa,Dn[r.app.options.appId],t,e,n).catch(s=>Pt.error(s))}const Cc="@firebase/analytics",Dc="0.10.21";function A_(){Ae(new ne(Js,(t,{options:e})=>{const n=t.getProvider("app").getImmediate(),s=t.getProvider("installations-internal").getImmediate();return E_(n,s,e)},"PUBLIC")),Ae(new ne("analytics-internal",r,"PRIVATE")),ee(Cc,Dc),ee(Cc,Dc,"esm2020");function r(t){try{const e=t.getProvider(Js).getImmediate();return{logEvent:(n,s,i)=>v_(e,n,s,i),setUserProperties:(n,s)=>w_(e,n,s)}}catch(e){throw Lt.create("interop-component-reg-failed",{reason:e})}}}A_();var xc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Te,Oh;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,g){function y(){}y.prototype=g.prototype,E.F=g.prototype,E.prototype=new y,E.prototype.constructor=E,E.D=function(w,T,b){for(var _=Array(arguments.length-2),Dt=2;Dt<arguments.length;Dt++)_[Dt-2]=arguments[Dt];return g.prototype[T].apply(w,_)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,g,y){y||(y=0);const w=Array(16);if(typeof g=="string")for(var T=0;T<16;++T)w[T]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(T=0;T<16;++T)w[T]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=E.g[0],y=E.g[1],T=E.g[2];let b=E.g[3],_;_=g+(b^y&(T^b))+w[0]+3614090360&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(T^g&(y^T))+w[1]+3905402710&4294967295,b=g+(_<<12&4294967295|_>>>20),_=T+(y^b&(g^y))+w[2]+606105819&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(g^T&(b^g))+w[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(b^y&(T^b))+w[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(T^g&(y^T))+w[5]+1200080426&4294967295,b=g+(_<<12&4294967295|_>>>20),_=T+(y^b&(g^y))+w[6]+2821735955&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(g^T&(b^g))+w[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(b^y&(T^b))+w[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(T^g&(y^T))+w[9]+2336552879&4294967295,b=g+(_<<12&4294967295|_>>>20),_=T+(y^b&(g^y))+w[10]+4294925233&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(g^T&(b^g))+w[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(b^y&(T^b))+w[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(T^g&(y^T))+w[13]+4254626195&4294967295,b=g+(_<<12&4294967295|_>>>20),_=T+(y^b&(g^y))+w[14]+2792965006&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(g^T&(b^g))+w[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(T^b&(y^T))+w[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(g^y))+w[6]+3225465664&4294967295,b=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(b^g))+w[11]+643717713&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(T^b))+w[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^b&(y^T))+w[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(g^y))+w[10]+38016083&4294967295,b=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(b^g))+w[15]+3634488961&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(T^b))+w[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^b&(y^T))+w[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(g^y))+w[14]+3275163606&4294967295,b=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(b^g))+w[3]+4107603335&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(T^b))+w[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^b&(y^T))+w[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(g^y))+w[2]+4243563512&4294967295,b=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(b^g))+w[7]+1735328473&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(T^b))+w[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(y^T^b)+w[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^T)+w[8]+2272392833&4294967295,b=g+(_<<11&4294967295|_>>>21),_=T+(b^g^y)+w[11]+1839030562&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^g)+w[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^b)+w[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^T)+w[4]+1272893353&4294967295,b=g+(_<<11&4294967295|_>>>21),_=T+(b^g^y)+w[7]+4139469664&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^g)+w[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^b)+w[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^T)+w[0]+3936430074&4294967295,b=g+(_<<11&4294967295|_>>>21),_=T+(b^g^y)+w[3]+3572445317&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^g)+w[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^b)+w[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^T)+w[12]+3873151461&4294967295,b=g+(_<<11&4294967295|_>>>21),_=T+(b^g^y)+w[15]+530742520&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^g)+w[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(T^(y|~b))+w[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~T))+w[7]+1126891415&4294967295,b=g+(_<<10&4294967295|_>>>22),_=T+(g^(b|~y))+w[14]+2878612391&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~g))+w[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~b))+w[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~T))+w[3]+2399980690&4294967295,b=g+(_<<10&4294967295|_>>>22),_=T+(g^(b|~y))+w[10]+4293915773&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~g))+w[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~b))+w[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~T))+w[15]+4264355552&4294967295,b=g+(_<<10&4294967295|_>>>22),_=T+(g^(b|~y))+w[6]+2734768916&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~g))+w[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~b))+w[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~T))+w[11]+3174756917&4294967295,b=g+(_<<10&4294967295|_>>>22),_=T+(g^(b|~y))+w[2]+718787259&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~g))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+b&4294967295}n.prototype.v=function(E,g){g===void 0&&(g=E.length);const y=g-this.blockSize,w=this.C;let T=this.h,b=0;for(;b<g;){if(T==0)for(;b<=y;)s(this,E,b),b+=this.blockSize;if(typeof E=="string"){for(;b<g;)if(w[T++]=E.charCodeAt(b++),T==this.blockSize){s(this,w),T=0;break}}else for(;b<g;)if(w[T++]=E[b++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=g},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;g=this.o*8;for(var y=E.length-8;y<E.length;++y)E[y]=g&255,g/=256;for(this.v(E),E=Array(16),g=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)E[g++]=this.g[y]>>>w&255;return E};function i(E,g){var y=u;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=g(E)}function a(E,g){this.h=g;const y=[];let w=!0;for(let T=E.length-1;T>=0;T--){const b=E[T]|0;w&&b==g||(y[T]=b,w=!1)}this.g=y}var u={};function l(E){return-128<=E&&E<128?i(E,function(g){return new a([g|0],g<0?-1:0)}):new a([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return p;if(E<0)return O(h(-E));const g=[];let y=1;for(let w=0;E>=y;w++)g[w]=E/y|0,y*=4294967296;return new a(g,0)}function f(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return O(f(E.substring(1),g));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(g,8));let w=p;for(let b=0;b<E.length;b+=8){var T=Math.min(8,E.length-b);const _=parseInt(E.substring(b,b+T),g);T<8?(T=h(Math.pow(g,T)),w=w.j(T).add(h(_))):(w=w.j(y),w=w.add(h(_)))}return w}var p=l(0),I=l(1),P=l(16777216);r=a.prototype,r.m=function(){if(k(this))return-O(this).m();let E=0,g=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);E+=(w>=0?w:4294967296+w)*g,g*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(k(this))return"-"+O(this).toString(E);const g=h(Math.pow(E,6));var y=this;let w="";for(;;){const T=rt(y,g).g;y=K(y,T.j(g));let b=((y.g.length>0?y.g[0]:y.h)>>>0).toString(E);if(y=T,D(y))return b+w;for(;b.length<6;)b="0"+b;w=b+w}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(let g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function k(E){return E.h==-1}r.l=function(E){return E=K(this,E),k(E)?-1:D(E)?0:1};function O(E){const g=E.g.length,y=[];for(let w=0;w<g;w++)y[w]=~E.g[w];return new a(y,~E.h).add(I)}r.abs=function(){return k(this)?O(this):this},r.add=function(E){const g=Math.max(this.g.length,E.g.length),y=[];let w=0;for(let T=0;T<=g;T++){let b=w+(this.i(T)&65535)+(E.i(T)&65535),_=(b>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=_>>>16,b&=65535,_&=65535,y[T]=_<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function K(E,g){return E.add(O(g))}r.j=function(E){if(D(this)||D(E))return p;if(k(this))return k(E)?O(this).j(O(E)):O(O(this).j(E));if(k(E))return O(this.j(O(E)));if(this.l(P)<0&&E.l(P)<0)return h(this.m()*E.m());const g=this.g.length+E.g.length,y=[];for(var w=0;w<2*g;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<E.g.length;T++){const b=this.i(w)>>>16,_=this.i(w)&65535,Dt=E.i(T)>>>16,ke=E.i(T)&65535;y[2*w+2*T]+=_*ke,j(y,2*w+2*T),y[2*w+2*T+1]+=b*ke,j(y,2*w+2*T+1),y[2*w+2*T+1]+=_*Dt,j(y,2*w+2*T+1),y[2*w+2*T+2]+=b*Dt,j(y,2*w+2*T+2)}for(E=0;E<g;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=g;E<2*g;E++)y[E]=0;return new a(y,0)};function j(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function q(E,g){this.g=E,this.h=g}function rt(E,g){if(D(g))throw Error("division by zero");if(D(E))return new q(p,p);if(k(E))return g=rt(O(E),g),new q(O(g.g),O(g.h));if(k(g))return g=rt(E,O(g)),new q(O(g.g),g.h);if(E.g.length>30){if(k(E)||k(g))throw Error("slowDivide_ only works with positive integers.");for(var y=I,w=g;w.l(E)<=0;)y=Q(y),w=Q(w);var T=J(y,1),b=J(w,1);for(w=J(w,2),y=J(y,2);!D(w);){var _=b.add(w);_.l(E)<=0&&(T=T.add(y),b=_),w=J(w,1),y=J(y,1)}return g=K(E,T.j(g)),new q(T,g)}for(T=p;E.l(g)>=0;){for(y=Math.max(1,Math.floor(E.m()/g.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),b=h(y),_=b.j(g);k(_)||_.l(E)>0;)y-=w,b=h(y),_=b.j(g);D(b)&&(b=I),T=T.add(b),E=K(E,_)}return new q(T,E)}r.B=function(E){return rt(this,E).h},r.and=function(E){const g=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<g;w++)y[w]=this.i(w)&E.i(w);return new a(y,this.h&E.h)},r.or=function(E){const g=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<g;w++)y[w]=this.i(w)|E.i(w);return new a(y,this.h|E.h)},r.xor=function(E){const g=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<g;w++)y[w]=this.i(w)^E.i(w);return new a(y,this.h^E.h)};function Q(E){const g=E.g.length+1,y=[];for(let w=0;w<g;w++)y[w]=E.i(w)<<1|E.i(w-1)>>>31;return new a(y,E.h)}function J(E,g){const y=g>>5;g%=32;const w=E.g.length-y,T=[];for(let b=0;b<w;b++)T[b]=g>0?E.i(b+y)>>>g|E.i(b+y+1)<<32-g:E.i(b+y);return new a(T,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Oh=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Te=a}).apply(typeof xc<"u"?xc:typeof self<"u"?self:typeof window<"u"?window:{});var Vs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Mh,Sr,Fh,Ms,ko,Lh,Bh,Uh;(function(){var r,t=Object.defineProperty;function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Vs=="object"&&Vs];for(var c=0;c<o.length;++c){var d=o[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=e(this);function s(o,c){if(c)t:{var d=n;o=o.split(".");for(var m=0;m<o.length-1;m++){var A=o[m];if(!(A in d))break t;d=d[A]}o=o[o.length-1],m=d[o],c=c(m),c!=m&&c!=null&&t(d,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var d=[],m;for(m in c)Object.prototype.hasOwnProperty.call(c,m)&&d.push([m,c[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function l(o,c,d){return o.call.apply(o.bind,arguments)}function h(o,c,d){return h=l,h.apply(null,arguments)}function f(o,c){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function p(o,c){function d(){}d.prototype=c.prototype,o.Z=c.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(m,A,R){for(var x=Array(arguments.length-2),$=2;$<arguments.length;$++)x[$-2]=arguments[$];return c.prototype[A].apply(m,x)}}var I=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function P(o){const c=o.length;if(c>0){const d=Array(c);for(let m=0;m<c;m++)d[m]=o[m];return d}return[]}function D(o,c){for(let m=1;m<arguments.length;m++){const A=arguments[m];var d=typeof A;if(d=d!="object"?d:A?Array.isArray(A)?"array":d:"null",d=="array"||d=="object"&&typeof A.length=="number"){d=o.length||0;const R=A.length||0;o.length=d+R;for(let x=0;x<R;x++)o[d+x]=A[x]}else o.push(A)}}class k{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function O(o){a.setTimeout(()=>{throw o},0)}function K(){var o=E;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class j{constructor(){this.h=this.g=null}add(c,d){const m=q.get();m.set(c,d),this.h?this.h.next=m:this.g=m,this.h=m}}var q=new k(()=>new rt,o=>o.reset());class rt{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Q,J=!1,E=new j,g=()=>{const o=Promise.resolve(void 0);Q=()=>{o.then(y)}};function y(){for(var o;o=K();){try{o.h.call(o.g)}catch(d){O(d)}var c=q;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}J=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var b=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,c),a.removeEventListener("test",d,c)}catch{}return o})();function _(o){return/^[\s\xa0]*$/.test(o)}function Dt(o,c){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}p(Dt,T),Dt.prototype.init=function(o,c){const d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(d=="mouseover"?c=o.fromElement:d=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Dt.Z.h.call(this)},Dt.prototype.h=function(){Dt.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ke="closure_listenable_"+(Math.random()*1e6|0),im=0;function om(o,c,d,m,A){this.listener=o,this.proxy=null,this.src=c,this.type=d,this.capture=!!m,this.ha=A,this.key=++im,this.da=this.fa=!1}function ms(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ps(o,c,d){for(const m in o)c.call(d,o[m],m,o)}function am(o,c){for(const d in o)c.call(void 0,o[d],d,o)}function pu(o){const c={};for(const d in o)c[d]=o[d];return c}const gu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _u(o,c){let d,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(d in m)o[d]=m[d];for(let R=0;R<gu.length;R++)d=gu[R],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function gs(o){this.src=o,this.g={},this.h=0}gs.prototype.add=function(o,c,d,m,A){const R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);const x=Gi(o,c,m,A);return x>-1?(c=o[x],d||(c.fa=!1)):(c=new om(c,this.src,R,!!m,A),c.fa=d,o.push(c)),c};function zi(o,c){const d=c.type;if(d in o.g){var m=o.g[d],A=Array.prototype.indexOf.call(m,c,void 0),R;(R=A>=0)&&Array.prototype.splice.call(m,A,1),R&&(ms(c),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Gi(o,c,d,m){for(let A=0;A<o.length;++A){const R=o[A];if(!R.da&&R.listener==c&&R.capture==!!d&&R.ha==m)return A}return-1}var Ki="closure_lm_"+(Math.random()*1e6|0),Hi={};function yu(o,c,d,m,A){if(Array.isArray(c)){for(let R=0;R<c.length;R++)yu(o,c[R],d,m,A);return null}return d=Tu(d),o&&o[ke]?o.J(c,d,u(m)?!!m.capture:!1,A):um(o,c,d,!1,m,A)}function um(o,c,d,m,A,R){if(!c)throw Error("Invalid event type");const x=u(A)?!!A.capture:!!A;let $=Qi(o);if($||(o[Ki]=$=new gs(o)),d=$.add(c,d,m,x,R),d.proxy)return d;if(m=cm(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)b||(A=x),A===void 0&&(A=!1),o.addEventListener(c.toString(),m,A);else if(o.attachEvent)o.attachEvent(Eu(c.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function cm(){function o(d){return c.call(o.src,o.listener,d)}const c=lm;return o}function Iu(o,c,d,m,A){if(Array.isArray(c))for(var R=0;R<c.length;R++)Iu(o,c[R],d,m,A);else m=u(m)?!!m.capture:!!m,d=Tu(d),o&&o[ke]?(o=o.i,R=String(c).toString(),R in o.g&&(c=o.g[R],d=Gi(c,d,m,A),d>-1&&(ms(c[d]),Array.prototype.splice.call(c,d,1),c.length==0&&(delete o.g[R],o.h--)))):o&&(o=Qi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=Gi(c,d,m,A)),(d=o>-1?c[o]:null)&&Wi(d))}function Wi(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[ke])zi(c.i,o);else{var d=o.type,m=o.proxy;c.removeEventListener?c.removeEventListener(d,m,o.capture):c.detachEvent?c.detachEvent(Eu(d),m):c.addListener&&c.removeListener&&c.removeListener(m),(d=Qi(c))?(zi(d,o),d.h==0&&(d.src=null,c[Ki]=null)):ms(o)}}}function Eu(o){return o in Hi?Hi[o]:Hi[o]="on"+o}function lm(o,c){if(o.da)o=!0;else{c=new Dt(c,this);const d=o.listener,m=o.ha||o.src;o.fa&&Wi(o),o=d.call(m,c)}return o}function Qi(o){return o=o[Ki],o instanceof gs?o:null}var Ji="__closure_events_fn_"+(Math.random()*1e9>>>0);function Tu(o){return typeof o=="function"?o:(o[Ji]||(o[Ji]=function(c){return o.handleEvent(c)}),o[Ji])}function Et(){w.call(this),this.i=new gs(this),this.M=this,this.G=null}p(Et,w),Et.prototype[ke]=!0,Et.prototype.removeEventListener=function(o,c,d,m){Iu(this,o,c,d,m)};function Rt(o,c){var d,m=o.G;if(m)for(d=[];m;m=m.G)d.push(m);if(o=o.M,m=c.type||c,typeof c=="string")c=new T(c,o);else if(c instanceof T)c.target=c.target||o;else{var A=c;c=new T(m,o),_u(c,A)}A=!0;let R,x;if(d)for(x=d.length-1;x>=0;x--)R=c.g=d[x],A=_s(R,m,!0,c)&&A;if(R=c.g=o,A=_s(R,m,!0,c)&&A,A=_s(R,m,!1,c)&&A,d)for(x=0;x<d.length;x++)R=c.g=d[x],A=_s(R,m,!1,c)&&A}Et.prototype.N=function(){if(Et.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const d=o.g[c];for(let m=0;m<d.length;m++)ms(d[m]);delete o.g[c],o.h--}}this.G=null},Et.prototype.J=function(o,c,d,m){return this.i.add(String(o),c,!1,d,m)},Et.prototype.K=function(o,c,d,m){return this.i.add(String(o),c,!0,d,m)};function _s(o,c,d,m){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let A=!0;for(let R=0;R<c.length;++R){const x=c[R];if(x&&!x.da&&x.capture==d){const $=x.listener,mt=x.ha||x.src;x.fa&&zi(o.i,x),A=$.call(mt,m)!==!1&&A}}return A&&!m.defaultPrevented}function hm(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function wu(o){o.g=hm(()=>{o.g=null,o.i&&(o.i=!1,wu(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class dm extends w{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:wu(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ir(o){w.call(this),this.h=o,this.g={}}p(ir,w);var vu=[];function Au(o){ps(o.g,function(c,d){this.g.hasOwnProperty(d)&&Wi(c)},o),o.g={}}ir.prototype.N=function(){ir.Z.N.call(this),Au(this)},ir.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Yi=a.JSON.stringify,fm=a.JSON.parse,mm=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function bu(){}function Ru(){}var or={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Xi(){T.call(this,"d")}p(Xi,T);function Zi(){T.call(this,"c")}p(Zi,T);var Oe={},Su=null;function ys(){return Su=Su||new Et}Oe.Ia="serverreachability";function Pu(o){T.call(this,Oe.Ia,o)}p(Pu,T);function ar(o){const c=ys();Rt(c,new Pu(c))}Oe.STAT_EVENT="statevent";function Vu(o,c){T.call(this,Oe.STAT_EVENT,o),this.stat=c}p(Vu,T);function St(o){const c=ys();Rt(c,new Vu(c,o))}Oe.Ja="timingevent";function Cu(o,c){T.call(this,Oe.Ja,o),this.size=c}p(Cu,T);function ur(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function cr(){this.g=!0}cr.prototype.ua=function(){this.g=!1};function pm(o,c,d,m,A,R){o.info(function(){if(o.g)if(R){var x="",$=R.split("&");for(let et=0;et<$.length;et++){var mt=$[et].split("=");if(mt.length>1){const _t=mt[0];mt=mt[1];const Gt=_t.split("_");x=Gt.length>=2&&Gt[1]=="type"?x+(_t+"="+mt+"&"):x+(_t+"=redacted&")}}}else x=null;else x=R;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+c+`
`+d+`
`+x})}function gm(o,c,d,m,A,R,x){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+c+`
`+d+`
`+R+" "+x})}function _n(o,c,d,m){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+ym(o,d)+(m?" "+m:"")})}function _m(o,c){o.info(function(){return"TIMEOUT: "+c})}cr.prototype.info=function(){};function ym(o,c){if(!o.g)return c;if(!c)return null;try{const R=JSON.parse(c);if(R){for(o=0;o<R.length;o++)if(Array.isArray(R[o])){var d=R[o];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var A=m[0];if(A!="noop"&&A!="stop"&&A!="close")for(let x=1;x<m.length;x++)m[x]=""}}}}return Yi(R)}catch{return c}}var Is={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Du={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},xu;function to(){}p(to,bu),to.prototype.g=function(){return new XMLHttpRequest},xu=new to;function lr(o){return encodeURIComponent(String(o))}function Im(o){var c=1;o=o.split(":");const d=[];for(;c>0&&o.length;)d.push(o.shift()),c--;return o.length&&d.push(o.join(":")),d}function ce(o,c,d,m){this.j=o,this.i=c,this.l=d,this.S=m||1,this.V=new ir(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Nu}function Nu(){this.i=null,this.g="",this.h=!1}var ku={},eo={};function no(o,c,d){o.M=1,o.A=Ts(zt(c)),o.u=d,o.R=!0,Ou(o,null)}function Ou(o,c){o.F=Date.now(),Es(o),o.B=zt(o.A);var d=o.B,m=o.S;Array.isArray(m)||(m=[String(m)]),Wu(d.i,"t",m),o.C=0,d=o.j.L,o.h=new Nu,o.g=dc(o.j,d?c:null,!o.u),o.P>0&&(o.O=new dm(h(o.Y,o,o.g),o.P)),c=o.V,d=o.g,m=o.ba;var A="readystatechange";Array.isArray(A)||(A&&(vu[0]=A.toString()),A=vu);for(let R=0;R<A.length;R++){const x=yu(d,A[R],m||c.handleEvent,!1,c.h||c);if(!x)break;c.g[x.key]=x}c=o.J?pu(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),ar(),pm(o.i,o.v,o.B,o.l,o.S,o.u)}ce.prototype.ba=function(o){o=o.target;const c=this.O;c&&de(o)==3?c.j():this.Y(o)},ce.prototype.Y=function(o){try{if(o==this.g)t:{const $=de(this.g),mt=this.g.ya(),et=this.g.ca();if(!($<3)&&($!=3||this.g&&(this.h.h||this.g.la()||ec(this.g)))){this.K||$!=4||mt==7||(mt==8||et<=0?ar(3):ar(2)),ro(this);var c=this.g.ca();this.X=c;var d=Em(this);if(this.o=c==200,gm(this.i,this.v,this.B,this.l,this.S,$,c),this.o){if(this.U&&!this.L){e:{if(this.g){var m,A=this.g;if((m=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(m)){var R=m;break e}}R=null}if(o=R)_n(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,so(this,o);else{this.o=!1,this.m=3,St(12),Me(this),hr(this);break t}}if(this.R){o=!0;let _t;for(;!this.K&&this.C<d.length;)if(_t=Tm(this,d),_t==eo){$==4&&(this.m=4,St(14),o=!1),_n(this.i,this.l,null,"[Incomplete Response]");break}else if(_t==ku){this.m=4,St(15),_n(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else _n(this.i,this.l,_t,null),so(this,_t);if(Mu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),$!=4||d.length!=0||this.h.h||(this.m=1,St(16),o=!1),this.o=this.o&&o,!o)_n(this.i,this.l,d,"[Invalid Chunked Response]"),Me(this),hr(this);else if(d.length>0&&!this.W){this.W=!0;var x=this.j;x.g==this&&x.aa&&!x.P&&(x.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),fo(x),x.P=!0,St(11))}}else _n(this.i,this.l,d,null),so(this,d);$==4&&Me(this),this.o&&!this.K&&($==4?uc(this.j,this):(this.o=!1,Es(this)))}else Om(this.g),c==400&&d.indexOf("Unknown SID")>0?(this.m=3,St(12)):(this.m=0,St(13)),Me(this),hr(this)}}}catch{}finally{}};function Em(o){if(!Mu(o))return o.g.la();const c=ec(o.g);if(c==="")return"";let d="";const m=c.length,A=de(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Me(o),hr(o),"";o.h.i=new a.TextDecoder}for(let R=0;R<m;R++)o.h.h=!0,d+=o.h.i.decode(c[R],{stream:!(A&&R==m-1)});return c.length=0,o.h.g+=d,o.C=0,o.h.g}function Mu(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Tm(o,c){var d=o.C,m=c.indexOf(`
`,d);return m==-1?eo:(d=Number(c.substring(d,m)),isNaN(d)?ku:(m+=1,m+d>c.length?eo:(c=c.slice(m,m+d),o.C=m+d,c)))}ce.prototype.cancel=function(){this.K=!0,Me(this)};function Es(o){o.T=Date.now()+o.H,Fu(o,o.H)}function Fu(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=ur(h(o.aa,o),c)}function ro(o){o.D&&(a.clearTimeout(o.D),o.D=null)}ce.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(_m(this.i,this.B),this.M!=2&&(ar(),St(17)),Me(this),this.m=2,hr(this)):Fu(this,this.T-o)};function hr(o){o.j.I==0||o.K||uc(o.j,o)}function Me(o){ro(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,Au(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function so(o,c){try{var d=o.j;if(d.I!=0&&(d.g==o||io(d.h,o))){if(!o.L&&io(d.h,o)&&d.I==3){try{var m=d.Ba.g.parse(c)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){t:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Rs(d),As(d);else break t;ho(d),St(18)}}else d.xa=A[1],0<d.xa-d.K&&A[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=ur(h(d.Va,d),6e3));Uu(d.h)<=1&&d.ta&&(d.ta=void 0)}else Le(d,11)}else if((o.L||d.g==o)&&Rs(d),!_(c))for(A=d.Ba.g.parse(c),c=0;c<A.length;c++){let et=A[c];const _t=et[0];if(!(_t<=d.K))if(d.K=_t,et=et[1],d.I==2)if(et[0]=="c"){d.M=et[1],d.ba=et[2];const Gt=et[3];Gt!=null&&(d.ka=Gt,d.j.info("VER="+d.ka));const Be=et[4];Be!=null&&(d.za=Be,d.j.info("SVER="+d.za));const fe=et[5];fe!=null&&typeof fe=="number"&&fe>0&&(m=1.5*fe,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const me=o.g;if(me){const Ps=me.g?me.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ps){var R=m.h;R.g||Ps.indexOf("spdy")==-1&&Ps.indexOf("quic")==-1&&Ps.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(oo(R,R.h),R.h=null))}if(m.G){const mo=me.g?me.g.getResponseHeader("X-HTTP-Session-Id"):null;mo&&(m.wa=mo,st(m.J,m.G,mo))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var x=o;if(m.na=hc(m,m.L?m.ba:null,m.W),x.L){qu(m.h,x);var $=x,mt=m.O;mt&&($.H=mt),$.D&&(ro($),Es($)),m.g=x}else oc(m);d.i.length>0&&bs(d)}else et[0]!="stop"&&et[0]!="close"||Le(d,7);else d.I==3&&(et[0]=="stop"||et[0]=="close"?et[0]=="stop"?Le(d,7):lo(d):et[0]!="noop"&&d.l&&d.l.qa(et),d.A=0)}}ar(4)}catch{}}var wm=class{constructor(o,c){this.g=o,this.map=c}};function Lu(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Bu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Uu(o){return o.h?1:o.g?o.g.size:0}function io(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function oo(o,c){o.g?o.g.add(c):o.h=c}function qu(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Lu.prototype.cancel=function(){if(this.i=ju(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ju(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const d of o.g.values())c=c.concat(d.G);return c}return P(o.i)}var $u=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function vm(o,c){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const m=o[d].indexOf("=");let A,R=null;m>=0?(A=o[d].substring(0,m),R=o[d].substring(m+1)):A=o[d],c(A,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function le(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof le?(this.l=o.l,dr(this,o.j),this.o=o.o,this.g=o.g,fr(this,o.u),this.h=o.h,ao(this,Qu(o.i)),this.m=o.m):o&&(c=String(o).match($u))?(this.l=!1,dr(this,c[1]||"",!0),this.o=mr(c[2]||""),this.g=mr(c[3]||"",!0),fr(this,c[4]),this.h=mr(c[5]||"",!0),ao(this,c[6]||"",!0),this.m=mr(c[7]||"")):(this.l=!1,this.i=new gr(null,this.l))}le.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(pr(c,zu,!0),":");var d=this.g;return(d||c=="file")&&(o.push("//"),(c=this.o)&&o.push(pr(c,zu,!0),"@"),o.push(lr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(pr(d,d.charAt(0)=="/"?Rm:bm,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",pr(d,Pm)),o.join("")},le.prototype.resolve=function(o){const c=zt(this);let d=!!o.j;d?dr(c,o.j):d=!!o.o,d?c.o=o.o:d=!!o.g,d?c.g=o.g:d=o.u!=null;var m=o.h;if(d)fr(c,o.u);else if(d=!!o.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var A=c.h.lastIndexOf("/");A!=-1&&(m=c.h.slice(0,A+1)+m)}if(A=m,A==".."||A==".")m="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){m=A.lastIndexOf("/",0)==0,A=A.split("/");const R=[];for(let x=0;x<A.length;){const $=A[x++];$=="."?m&&x==A.length&&R.push(""):$==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),m&&x==A.length&&R.push("")):(R.push($),m=!0)}m=R.join("/")}else m=A}return d?c.h=m:d=o.i.toString()!=="",d?ao(c,Qu(o.i)):d=!!o.m,d&&(c.m=o.m),c};function zt(o){return new le(o)}function dr(o,c,d){o.j=d?mr(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function fr(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function ao(o,c,d){c instanceof gr?(o.i=c,Vm(o.i,o.l)):(d||(c=pr(c,Sm)),o.i=new gr(c,o.l))}function st(o,c,d){o.i.set(c,d)}function Ts(o){return st(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function mr(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function pr(o,c,d){return typeof o=="string"?(o=encodeURI(o).replace(c,Am),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Am(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var zu=/[#\/\?@]/g,bm=/[#\?:]/g,Rm=/[#\?]/g,Sm=/[#\?@]/g,Pm=/#/g;function gr(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Fe(o){o.g||(o.g=new Map,o.h=0,o.i&&vm(o.i,function(c,d){o.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}r=gr.prototype,r.add=function(o,c){Fe(this),this.i=null,o=yn(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(c),this.h+=1,this};function Gu(o,c){Fe(o),c=yn(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function Ku(o,c){return Fe(o),c=yn(o,c),o.g.has(c)}r.forEach=function(o,c){Fe(this),this.g.forEach(function(d,m){d.forEach(function(A){o.call(c,A,m,this)},this)},this)};function Hu(o,c){Fe(o);let d=[];if(typeof c=="string")Ku(o,c)&&(d=d.concat(o.g.get(yn(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)d=d.concat(o[c]);return d}r.set=function(o,c){return Fe(this),this.i=null,o=yn(this,o),Ku(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},r.get=function(o,c){return o?(o=Hu(this,o),o.length>0?String(o[0]):c):c};function Wu(o,c,d){Gu(o,c),d.length>0&&(o.i=null,o.g.set(yn(o,c),P(d)),o.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let m=0;m<c.length;m++){var d=c[m];const A=lr(d);d=Hu(this,d);for(let R=0;R<d.length;R++){let x=A;d[R]!==""&&(x+="="+lr(d[R])),o.push(x)}}return this.i=o.join("&")};function Qu(o){const c=new gr;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function yn(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Vm(o,c){c&&!o.j&&(Fe(o),o.i=null,o.g.forEach(function(d,m){const A=m.toLowerCase();m!=A&&(Gu(this,m),Wu(this,A,d))},o)),o.j=c}function Cm(o,c){const d=new cr;if(a.Image){const m=new Image;m.onload=f(he,d,"TestLoadImage: loaded",!0,c,m),m.onerror=f(he,d,"TestLoadImage: error",!1,c,m),m.onabort=f(he,d,"TestLoadImage: abort",!1,c,m),m.ontimeout=f(he,d,"TestLoadImage: timeout",!1,c,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else c(!1)}function Dm(o,c){const d=new cr,m=new AbortController,A=setTimeout(()=>{m.abort(),he(d,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:m.signal}).then(R=>{clearTimeout(A),R.ok?he(d,"TestPingServer: ok",!0,c):he(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(A),he(d,"TestPingServer: error",!1,c)})}function he(o,c,d,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(d)}catch{}}function xm(){this.g=new mm}function uo(o){this.i=o.Sb||null,this.h=o.ab||!1}p(uo,bu),uo.prototype.g=function(){return new ws(this.i,this.h)};function ws(o,c){Et.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(ws,Et),r=ws.prototype,r.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,yr(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,_r(this)),this.readyState=0},r.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,yr(this)),this.g&&(this.readyState=3,yr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ju(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ju(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}r.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?_r(this):yr(this),this.readyState==3&&Ju(this)}},r.Oa=function(o){this.g&&(this.response=this.responseText=o,_r(this))},r.Na=function(o){this.g&&(this.response=o,_r(this))},r.ga=function(){this.g&&_r(this)};function _r(o){o.readyState=4,o.l=null,o.j=null,o.B=null,yr(o)}r.setRequestHeader=function(o,c){this.A.append(o,c)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=c.next();return o.join(`\r
`)};function yr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ws.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Yu(o){let c="";return ps(o,function(d,m){c+=m,c+=":",c+=d,c+=`\r
`}),c}function co(o,c,d){t:{for(m in d){var m=!1;break t}m=!0}m||(d=Yu(d),typeof o=="string"?d!=null&&lr(d):st(o,c,d))}function at(o){Et.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(at,Et);var Nm=/^https?$/i,km=["POST","PUT"];r=at.prototype,r.Fa=function(o){this.H=o},r.ea=function(o,c,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():xu.g(),this.g.onreadystatechange=I(h(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){Xu(this,R);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)d.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const R of m.keys())d.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(km,c,void 0)>=0)||m||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,x]of d)this.g.setRequestHeader(R,x);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(R){Xu(this,R)}};function Xu(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,Zu(o),vs(o)}function Zu(o){o.A||(o.A=!0,Rt(o,"complete"),Rt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Rt(this,"complete"),Rt(this,"abort"),vs(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),vs(this,!0)),at.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?tc(this):this.Xa())},r.Xa=function(){tc(this)};function tc(o){if(o.h&&typeof i<"u"){if(o.v&&de(o)==4)setTimeout(o.Ca.bind(o),0);else if(Rt(o,"readystatechange"),de(o)==4){o.h=!1;try{const R=o.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var d;if(!(d=c)){var m;if(m=R===0){let x=String(o.D).match($u)[1]||null;!x&&a.self&&a.self.location&&(x=a.self.location.protocol.slice(0,-1)),m=!Nm.test(x?x.toLowerCase():"")}d=m}if(d)Rt(o,"complete"),Rt(o,"success");else{o.o=6;try{var A=de(o)>2?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.ca()+"]",Zu(o)}}finally{vs(o)}}}}function vs(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,c||Rt(o,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function de(o){return o.g?o.g.readyState:0}r.ca=function(){try{return de(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),fm(c)}};function ec(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Om(o){const c={};o=(o.g&&de(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(_(o[m]))continue;var d=Im(o[m]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=c[A]||[];c[A]=R,R.push(d)}am(c,function(m){return m.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ir(o,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||c}function nc(o){this.za=0,this.i=[],this.j=new cr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ir("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ir("baseRetryDelayMs",5e3,o),this.Za=Ir("retryDelaySeedMs",1e4,o),this.Ta=Ir("forwardChannelMaxRetries",2,o),this.va=Ir("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Lu(o&&o.concurrentRequestLimit),this.Ba=new xm,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=nc.prototype,r.ka=8,r.I=1,r.connect=function(o,c,d,m){St(0),this.W=o,this.H=c||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=hc(this,null,this.W),bs(this)};function lo(o){if(rc(o),o.I==3){var c=o.V++,d=zt(o.J);if(st(d,"SID",o.M),st(d,"RID",c),st(d,"TYPE","terminate"),Er(o,d),c=new ce(o,o.j,c),c.M=2,c.A=Ts(zt(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=c.A,d=!0),d||(c.g=dc(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Es(c)}lc(o)}function As(o){o.g&&(fo(o),o.g.cancel(),o.g=null)}function rc(o){As(o),o.v&&(a.clearTimeout(o.v),o.v=null),Rs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function bs(o){if(!Bu(o.h)&&!o.m){o.m=!0;var c=o.Ea;Q||g(),J||(Q(),J=!0),E.add(c,o),o.D=0}}function Mm(o,c){return Uu(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=ur(h(o.Ea,o,c),cc(o,o.D)),o.D++,!0)}r.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new ce(this,this.j,o);let R=this.o;if(this.U&&(R?(R=pu(R),_u(R,this.U)):R=this.U),this.u!==null||this.R||(A.J=R,R=null),this.S)t:{for(var c=0,d=0;d<this.i.length;d++){e:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(c+=m,c>4096){c=d;break t}if(c===4096||d===this.i.length-1){c=d+1;break t}}c=1e3}else c=1e3;c=ic(this,A,c),d=zt(this.J),st(d,"RID",o),st(d,"CVER",22),this.G&&st(d,"X-HTTP-Session-Id",this.G),Er(this,d),R&&(this.R?c="headers="+lr(Yu(R))+"&"+c:this.u&&co(d,this.u,R)),oo(this.h,A),this.Ra&&st(d,"TYPE","init"),this.S?(st(d,"$req",c),st(d,"SID","null"),A.U=!0,no(A,d,null)):no(A,d,c),this.I=2}}else this.I==3&&(o?sc(this,o):this.i.length==0||Bu(this.h)||sc(this))};function sc(o,c){var d;c?d=c.l:d=o.V++;const m=zt(o.J);st(m,"SID",o.M),st(m,"RID",d),st(m,"AID",o.K),Er(o,m),o.u&&o.o&&co(m,o.u,o.o),d=new ce(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),c&&(o.i=c.G.concat(o.i)),c=ic(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),oo(o.h,d),no(d,m,c)}function Er(o,c){o.H&&ps(o.H,function(d,m){st(c,m,d)}),o.l&&ps({},function(d,m){st(c,m,d)})}function ic(o,c,d){d=Math.min(o.i.length,d);const m=o.l?h(o.l.Ka,o.l,o):null;t:{var A=o.i;let $=-1;for(;;){const mt=["count="+d];$==-1?d>0?($=A[0].g,mt.push("ofs="+$)):$=0:mt.push("ofs="+$);let et=!0;for(let _t=0;_t<d;_t++){var R=A[_t].g;const Gt=A[_t].map;if(R-=$,R<0)$=Math.max(0,A[_t].g-100),et=!1;else try{R="req"+R+"_"||"";try{var x=Gt instanceof Map?Gt:Object.entries(Gt);for(const[Be,fe]of x){let me=fe;u(fe)&&(me=Yi(fe)),mt.push(R+Be+"="+encodeURIComponent(me))}}catch(Be){throw mt.push(R+"type="+encodeURIComponent("_badmap")),Be}}catch{m&&m(Gt)}}if(et){x=mt.join("&");break t}}x=void 0}return o=o.i.splice(0,d),c.G=o,x}function oc(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;Q||g(),J||(Q(),J=!0),E.add(c,o),o.A=0}}function ho(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=ur(h(o.Da,o),cc(o,o.A)),o.A++,!0)}r.Da=function(){if(this.v=null,ac(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=ur(h(this.Wa,this),o)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,St(10),As(this),ac(this))};function fo(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function ac(o){o.g=new ce(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=zt(o.na);st(c,"RID","rpc"),st(c,"SID",o.M),st(c,"AID",o.K),st(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&st(c,"TO",o.ia),st(c,"TYPE","xmlhttp"),Er(o,c),o.u&&o.o&&co(c,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=Ts(zt(c)),d.u=null,d.R=!0,Ou(d,o)}r.Va=function(){this.C!=null&&(this.C=null,As(this),ho(this),St(19))};function Rs(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function uc(o,c){var d=null;if(o.g==c){Rs(o),fo(o),o.g=null;var m=2}else if(io(o.h,c))d=c.G,qu(o.h,c),m=1;else return;if(o.I!=0){if(c.o)if(m==1){d=c.u?c.u.length:0,c=Date.now()-c.F;var A=o.D;m=ys(),Rt(m,new Cu(m,d)),bs(o)}else oc(o);else if(A=c.m,A==3||A==0&&c.X>0||!(m==1&&Mm(o,c)||m==2&&ho(o)))switch(d&&d.length>0&&(c=o.h,c.i=c.i.concat(d)),A){case 1:Le(o,5);break;case 4:Le(o,10);break;case 3:Le(o,6);break;default:Le(o,2)}}}function cc(o,c){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*c}function Le(o,c){if(o.j.info("Error code "+c),c==2){var d=h(o.bb,o),m=o.Ua;const A=!m;m=new le(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||dr(m,"https"),Ts(m),A?Cm(m.toString(),d):Dm(m.toString(),d)}else St(2);o.I=0,o.l&&o.l.pa(c),lc(o),rc(o)}r.bb=function(o){o?(this.j.info("Successfully pinged google.com"),St(2)):(this.j.info("Failed to ping google.com"),St(1))};function lc(o){if(o.I=0,o.ja=[],o.l){const c=ju(o.h);(c.length!=0||o.i.length!=0)&&(D(o.ja,c),D(o.ja,o.i),o.h.i.length=0,P(o.i),o.i.length=0),o.l.oa()}}function hc(o,c,d){var m=d instanceof le?zt(d):new le(d);if(m.g!="")c&&(m.g=c+"."+m.g),fr(m,m.u);else{var A=a.location;m=A.protocol,c=c?c+"."+A.hostname:A.hostname,A=+A.port;const R=new le(null);m&&dr(R,m),c&&(R.g=c),A&&fr(R,A),d&&(R.h=d),m=R}return d=o.G,c=o.wa,d&&c&&st(m,d,c),st(m,"VER",o.ka),Er(o,m),m}function dc(o,c,d){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new at(new uo({ab:d})):new at(o.ma),c.Fa(o.L),c}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function fc(){}r=fc.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Ss(){}Ss.prototype.g=function(o,c){return new Ot(o,c)};function Ot(o,c){Et.call(this),this.g=new nc(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!_(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!_(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new In(this)}p(Ot,Et),Ot.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ot.prototype.close=function(){lo(this.g)},Ot.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=Yi(o),o=d);c.i.push(new wm(c.Ya++,o)),c.I==3&&bs(c)},Ot.prototype.N=function(){this.g.l=null,delete this.j,lo(this.g),delete this.g,Ot.Z.N.call(this)};function mc(o){Xi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){t:{for(const d in c){o=d;break t}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}p(mc,Xi);function pc(){Zi.call(this),this.status=1}p(pc,Zi);function In(o){this.g=o}p(In,fc),In.prototype.ra=function(){Rt(this.g,"a")},In.prototype.qa=function(o){Rt(this.g,new mc(o))},In.prototype.pa=function(o){Rt(this.g,new pc)},In.prototype.oa=function(){Rt(this.g,"b")},Ss.prototype.createWebChannel=Ss.prototype.g,Ot.prototype.send=Ot.prototype.o,Ot.prototype.open=Ot.prototype.m,Ot.prototype.close=Ot.prototype.close,Uh=function(){return new Ss},Bh=function(){return ys()},Lh=Oe,ko={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Is.NO_ERROR=0,Is.TIMEOUT=8,Is.HTTP_ERROR=6,Ms=Is,Du.COMPLETE="complete",Fh=Du,Ru.EventType=or,or.OPEN="a",or.CLOSE="b",or.ERROR="c",or.MESSAGE="d",Et.prototype.listen=Et.prototype.J,Sr=Ru,at.prototype.listenOnce=at.prototype.K,at.prototype.getLastError=at.prototype.Ha,at.prototype.getLastErrorCode=at.prototype.ya,at.prototype.getStatus=at.prototype.ca,at.prototype.getResponseJson=at.prototype.La,at.prototype.getResponseText=at.prototype.la,at.prototype.send=at.prototype.ea,at.prototype.setWithCredentials=at.prototype.Fa,Mh=at}).apply(typeof Vs<"u"?Vs:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class wt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}wt.UNAUTHENTICATED=new wt(null),wt.GOOGLE_CREDENTIALS=new wt("google-credentials-uid"),wt.FIRST_PARTY=new wt("first-party-uid"),wt.MOCK_USER=new wt("mock-user");/**
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
 */let Xn="12.11.0";function b_(r){Xn=r}/**
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
 */const sn=new aa("@firebase/firestore");function Rn(){return sn.logLevel}function V(r,...t){if(sn.logLevel<=W.DEBUG){const e=t.map(ma);sn.debug(`Firestore (${Xn}): ${r}`,...e)}}function lt(r,...t){if(sn.logLevel<=W.ERROR){const e=t.map(ma);sn.error(`Firestore (${Xn}): ${r}`,...e)}}function On(r,...t){if(sn.logLevel<=W.WARN){const e=t.map(ma);sn.warn(`Firestore (${Xn}): ${r}`,...e)}}function ma(r){if(typeof r=="string")return r;try{return(function(e){return JSON.stringify(e)})(r)}catch{return r}}/**
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
 */function M(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,qh(r,n,e)}function qh(r,t,e){let n=`FIRESTORE (${Xn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw lt(n),new Error(n)}function L(r,t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,r||qh(t,s,n)}function F(r,t){return r}/**
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
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class C extends Ve{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Jt{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
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
 */class R_{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class S_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(wt.UNAUTHENTICATED)))}shutdown(){}}class P_{constructor(t){this.t=t,this.currentUser=wt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){L(this.o===void 0,42304);let n=this.i;const s=l=>this.i!==n?(n=this.i,e(l)):Promise.resolve();let i=new Jt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Jt,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const l=i;t.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},u=l=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((l=>u(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?u(l):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Jt)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((n=>this.i!==t?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new R_(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return L(t===null||typeof t=="string",2055,{h:t}),new wt(t)}}class V_{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=wt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class C_{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new V_(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(wt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Nc{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class D_{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,$p(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){L(this.o===void 0,3512);const n=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>n(i)))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Nc(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(L(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Nc(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function x_(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class pa{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=x_(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%62))}return n}}function U(r,t){return r<t?-1:r>t?1:0}function Oo(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const s=r.charAt(n),i=t.charAt(n);if(s!==i)return Eo(s)===Eo(i)?U(s,i):Eo(s)?1:-1}return U(r.length,t.length)}const N_=55296,k_=57343;function Eo(r){const t=r.charCodeAt(0);return t>=N_&&t<=k_}function Mn(r,t,e){return r.length===t.length&&r.every(((n,s)=>e(n,t[s])))}function jh(r){return r+"\0"}/**
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
 */const kc="__name__";class Kt{constructor(t,e,n){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&M(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Kt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Kt?t.forEach((n=>{e.push(n)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=Kt.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return U(t.length,e.length)}static compareSegments(t,e){const n=Kt.isNumericId(t),s=Kt.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?Kt.extractNumericId(t).compare(Kt.extractNumericId(e)):Oo(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Te.fromString(t.substring(4,t.length-2))}}class Y extends Kt{construct(t,e,n){return new Y(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new C(S.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((s=>s.length>0)))}return new Y(e)}static emptyPath(){return new Y([])}}const O_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ot extends Kt{construct(t,e,n){return new ot(t,e,n)}static isValidIdentifier(t){return O_.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ot.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===kc}static keyField(){return new ot([kc])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new C(S.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new C(S.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new C(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=l,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new C(S.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ot(e)}static emptyPath(){return new ot([])}}/**
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
 */class N{constructor(t){this.path=t}static fromPath(t){return new N(Y.fromString(t))}static fromName(t){return new N(Y.fromString(t).popFirst(5))}static empty(){return new N(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new N(new Y(t.slice()))}}/**
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
 */function $h(r,t,e){if(!e)throw new C(S.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function M_(r,t,e,n){if(t===!0&&n===!0)throw new C(S.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Oc(r){if(!N.isDocumentKey(r))throw new C(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Mc(r){if(N.isDocumentKey(r))throw new C(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function zh(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Ti(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=(function(n){return n.constructor?n.constructor.name:null})(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function kt(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new C(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Ti(r);throw new C(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
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
 */function ft(r,t){const e={typeString:r};return t&&(e.value=t),e}function ns(r,t){if(!zh(r))throw new C(S.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){e=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){e=`Expected '${n}' field to equal '${i.value}'`;break}}if(e)throw new C(S.INVALID_ARGUMENT,e);return!0}/**
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
 */const Fc=-62135596800,Lc=1e6;class X{static now(){return X.fromMillis(Date.now())}static fromDate(t){return X.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Lc);return new X(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new C(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new C(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Fc)throw new C(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new C(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Lc}_compareTo(t){return this.seconds===t.seconds?U(this.nanoseconds,t.nanoseconds):U(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:X._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(ns(t,X._jsonSchema))return new X(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Fc;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}X._jsonSchemaVersion="firestore/timestamp/1.0",X._jsonSchema={type:ft("string",X._jsonSchemaVersion),seconds:ft("number"),nanoseconds:ft("number")};/**
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
 */class B{static fromTimestamp(t){return new B(t)}static min(){return new B(new X(0,0))}static max(){return new B(new X(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Fn=-1;class Ys{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function Mo(r){return r.fields.find((t=>t.kind===2))}function je(r){return r.fields.filter((t=>t.kind!==2))}Ys.UNKNOWN_ID=-1;class Fs{constructor(t,e){this.fieldPath=t,this.kind=e}}class jr{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new jr(0,Ut.min())}}function Gh(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new X(e+1,0):new X(e,n));return new Ut(s,N.empty(),t)}function Kh(r){return new Ut(r.readTime,r.key,Fn)}class Ut{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Ut(B.min(),N.empty(),Fn)}static max(){return new Ut(B.max(),N.empty(),Fn)}}function ga(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=N.comparator(r.documentKey,t.documentKey),e!==0?e:U(r.largestBatchId,t.largestBatchId))}/**
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
 */const Hh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Wh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function Ce(r){if(r.code!==S.FAILED_PRECONDITION||r.message!==Hh)throw r;V("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class v{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new v(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof v?e:v.resolve(e)}catch(e){return v.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):v.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):v.reject(e)}static resolve(t){return new v(((e,n)=>{e(t)}))}static reject(t){return new v(((e,n)=>{n(t)}))}static waitFor(t){return new v(((e,n)=>{let s=0,i=0,a=!1;t.forEach((u=>{++s,u.next((()=>{++i,a&&i===s&&e()}),(l=>n(l)))})),a=!0,i===s&&e()}))}static or(t){let e=v.resolve(!1);for(const n of t)e=e.next((s=>s?v.resolve(s):n()));return e}static forEach(t,e){const n=[];return t.forEach(((s,i)=>{n.push(e.call(this,s,i))})),this.waitFor(n)}static mapArray(t,e){return new v(((n,s)=>{const i=t.length,a=new Array(i);let u=0;for(let l=0;l<i;l++){const h=l;e(t[h]).next((f=>{a[h]=f,++u,u===i&&n(a)}),(f=>s(f)))}}))}static doWhile(t,e){return new v(((n,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):n()};i()}))}}/**
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
 */const Mt="SimpleDb";class wi{static open(t,e,n,s){try{return new wi(e,t.transaction(s,n))}catch(i){throw new xr(e,i)}}constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.S=new Jt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{e.error?this.S.reject(new xr(t,e.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=_a(n.target.error);this.S.reject(new xr(t,s))}}get D(){return this.S.promise}abort(t){t&&this.S.reject(t),this.aborted||(V(Mt,"Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new L_(e)}}class we{static delete(t){return V(Mt,"Removing database:",t),ze(ih().indexedDB.deleteDatabase(t)).toPromise()}static v(){if(!oa())return!1;if(we.F())return!0;const t=kn(),e=we.M(t),n=0<e&&e<10,s=Qh(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static F(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)==null?void 0:t.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(t,e){return t.store(e)}static M(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(t,e,n){this.name=t,this.version=e,this.N=n,this.B=null,we.M(kn())===12.2&&lt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(t){return this.db||(V(Mt,"Opening database:",this.name),this.db=await new Promise(((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new xr(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new C(S.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new C(S.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new xr(t,a))},s.onupgradeneeded=i=>{V(Mt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.N.k(a,s.transaction,i.oldVersion,this.version).next((()=>{V(Mt,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}K(t){this.q=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.L(t);const u=wi.open(this.db,t,i?"readonly":"readwrite",n),l=s(u).next((h=>(u.C(),h))).catch((h=>(u.abort(h),v.reject(h)))).toPromise();return l.catch((()=>{})),await u.D,l}catch(u){const l=u,h=l.name!=="FirebaseError"&&a<3;if(V(Mt,"Transaction failed with error:",l.message,"Retrying:",h),this.close(),!h)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Qh(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class F_{constructor(t){this.U=t,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(t){this.U=t}done(){this.$=!0}j(t){this.W=t}delete(){return ze(this.U.delete())}}class xr extends C{constructor(t,e){super(S.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function De(r){return r.name==="IndexedDbTransactionError"}class L_{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(V(Mt,"PUT",this.store.name,t,e),n=this.store.put(e,t)):(V(Mt,"PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),ze(n)}add(t){return V(Mt,"ADD",this.store.name,t,t),ze(this.store.add(t))}get(t){return ze(this.store.get(t)).next((e=>(e===void 0&&(e=null),V(Mt,"GET",this.store.name,t,e),e)))}delete(t){return V(Mt,"DELETE",this.store.name,t),ze(this.store.delete(t))}count(){return V(Mt,"COUNT",this.store.name),ze(this.store.count())}J(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v(((a,u)=>{i.onerror=l=>{u(l.target.error)},i.onsuccess=l=>{a(l.target.result)}}))}{const i=this.cursor(n),a=[];return this.H(i,((u,l)=>{a.push(l)})).next((()=>a))}}Z(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new v(((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}}))}X(t,e){V(Mt,"DELETE ALL",this.store.name);const n=this.options(t,e);n.Y=!1;const s=this.cursor(n);return this.H(s,((i,a,u)=>u.delete()))}ee(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.H(s,e)}te(t){const e=this.cursor({});return new v(((n,s)=>{e.onerror=i=>{const a=_a(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next((u=>{u?a.continue():n()})):n()}}))}H(t,e){const n=[];return new v(((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const l=new F_(u),h=e(u.primaryKey,u.value,l);if(h instanceof v){const f=h.catch((p=>(l.done(),v.reject(p))));n.push(f)}l.isDone?s():l.G===null?u.continue():u.continue(l.G)}})).next((()=>v.waitFor(n)))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.Y?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function ze(r){return new v(((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=_a(n.target.error);e(s)}}))}let Bc=!1;function _a(r){const t=we.M(kn());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new C("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Bc||(Bc=!0,setTimeout((()=>{throw n}),0)),n}}return r}const Nr="IndexBackfiller";class B_{constructor(t,e){this.asyncQueue=t,this.ne=e,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(t){V(Nr,`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,(async()=>{this.task=null;try{const e=await this.ne.ie();V(Nr,`Documents written: ${e}`)}catch(e){De(e)?V(Nr,"Ignoring IndexedDB error during index backfill: ",e):await Ce(e)}await this.re(6e4)}))}}class U_{constructor(t,e){this.localStore=t,this.persistence=e}async ie(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(e=>this.se(e,t)))}se(t,e){const n=new Set;let s=e,i=!0;return v.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next((a=>{if(a!==null&&!n.has(a))return V(Nr,`Processing collection: ${a}`),this.oe(t,a,s).next((u=>{s-=u,n.add(a)}));i=!1})))).next((()=>e-s))}oe(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next((s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next((i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next((()=>this._e(s,i))).next((u=>(V(Nr,`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(t,e,u)))).next((()=>a.size))}))))}_e(t,e){let n=t;return e.changes.forEach(((s,i)=>{const a=Kh(i);ga(a,n)>0&&(n=a)})),new Ut(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
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
 */class xt{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}xt.ce=-1;/**
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
 */const Je=-1;function vi(r){return r==null}function $r(r){return r===0&&1/r==-1/0}function Jh(r){return typeof r=="number"&&Number.isInteger(r)&&!$r(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const Xs="";function bt(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=Uc(t)),t=q_(r.get(e),t);return Uc(t)}function q_(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case Xs:e+="";break;default:e+=i}}return e}function Uc(r){return r+Xs+""}function Wt(r){const t=r.length;if(L(t>=2,64408,{path:r}),t===2)return L(r.charAt(0)===Xs&&r.charAt(1)==="",56145,{path:r}),Y.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf(Xs,i);switch((a<0||a>e)&&M(50515,{path:r}),r.charAt(a+1)){case"":const u=r.substring(i,a);let l;s.length===0?l=u:(s+=u,l=s,s=""),n.push(l);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:M(61167,{path:r})}i=a+2}return new Y(n)}/**
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
 */const $e="remoteDocuments",rs="owner",En="owner",zr="mutationQueues",j_="userId",jt="mutations",qc="batchId",Qe="userMutationsIndex",jc=["userId","batchId"];/**
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
 */function Ls(r,t){return[r,bt(t)]}function Yh(r,t,e){return[r,bt(t),e]}const $_={},Ln="documentMutations",Zs="remoteDocumentsV14",z_=["prefixPath","collectionGroup","readTime","documentId"],Bs="documentKeyIndex",G_=["prefixPath","collectionGroup","documentId"],Xh="collectionGroupIndex",K_=["collectionGroup","readTime","prefixPath","documentId"],Gr="remoteDocumentGlobal",Fo="remoteDocumentGlobalKey",Bn="targets",Zh="queryTargetsIndex",H_=["canonicalId","targetId"],Un="targetDocuments",W_=["targetId","path"],ya="documentTargetsIndex",Q_=["path","targetId"],ti="targetGlobalKey",Ye="targetGlobal",Kr="collectionParents",J_=["collectionId","parent"],qn="clientMetadata",Y_="clientId",Ai="bundles",X_="bundleId",bi="namedQueries",Z_="name",Ia="indexConfiguration",ty="indexId",Lo="collectionGroupIndex",ey="collectionGroup",kr="indexState",ny=["indexId","uid"],td="sequenceNumberIndex",ry=["uid","sequenceNumber"],Or="indexEntries",sy=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],ed="documentKeyIndex",iy=["indexId","uid","orderedDocumentKey"],Ri="documentOverlays",oy=["userId","collectionPath","documentId"],Bo="collectionPathOverlayIndex",ay=["userId","collectionPath","largestBatchId"],nd="collectionGroupOverlayIndex",uy=["userId","collectionGroup","largestBatchId"],Ea="globals",cy="name",rd=[zr,jt,Ln,$e,Bn,rs,Ye,Un,qn,Gr,Kr,Ai,bi],ly=[...rd,Ri],sd=[zr,jt,Ln,Zs,Bn,rs,Ye,Un,qn,Gr,Kr,Ai,bi,Ri],id=sd,Ta=[...id,Ia,kr,Or],hy=Ta,od=[...Ta,Ea],dy=od;/**
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
 */class Uo extends Wh{constructor(t,e){super(),this.le=t,this.currentSequenceNumber=e}}function gt(r,t){const e=F(r);return we.O(e.le,t)}/**
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
 */function $c(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function xe(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function ad(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class nt{constructor(t,e){this.comparator=t,this.root=e||It.EMPTY}insert(t,e){return new nt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,It.BLACK,null,null))}remove(t){return new nt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,It.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Cs(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Cs(this.root,t,this.comparator,!1)}getReverseIterator(){return new Cs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Cs(this.root,t,this.comparator,!0)}}class Cs{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class It{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??It.RED,this.left=s??It.EMPTY,this.right=i??It.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new It(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return It.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return It.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,It.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,It.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}It.EMPTY=null,It.RED=!0,It.BLACK=!1;It.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,n,s,i){return this}insert(t,e,n){return new It(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class tt{constructor(t){this.comparator=t,this.data=new nt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new zc(this.data.getIterator())}getIteratorFrom(t){return new zc(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((n=>{e=e.add(n)})),e}isEqual(t){if(!(t instanceof tt)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new tt(this.comparator);return e.data=t,e}}class zc{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Tn(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class Nt{constructor(t){this.fields=t,t.sort(ot.comparator)}static empty(){return new Nt([])}unionWith(t){let e=new tt(ot.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Nt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Mn(this.fields,t.fields,((e,n)=>e.isEqual(n)))}}/**
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
 */class ud extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new ud("Invalid base64 string: "+i):i}})(t);return new ht(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return U(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const fy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function se(r){if(L(!!r,39018),typeof r=="string"){let t=0;const e=fy.exec(r);if(L(!!e,46558,{timestamp:r}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:it(r.seconds),nanos:it(r.nanos)}}function it(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ie(r){return typeof r=="string"?ht.fromBase64String(r):ht.fromUint8Array(r)}/**
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
 */const cd="server_timestamp",ld="__type__",hd="__previous_value__",dd="__local_write_time__";function wa(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[ld])==null?void 0:n.stringValue)===cd}function Si(r){const t=r.mapValue.fields[hd];return wa(t)?Si(t):t}function Hr(r){const t=se(r.mapValue.fields[dd].timestampValue);return new X(t.seconds,t.nanos)}/**
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
 */class my{constructor(t,e,n,s,i,a,u,l,h,f,p){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=p}}const ei="(default)";class on{constructor(t,e){this.projectId=t,this.database=e||ei}static empty(){return new on("","")}get isDefaultDatabase(){return this.database===ei}isEqual(t){return t instanceof on&&t.projectId===this.projectId&&t.database===this.database}}function py(r,t){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new C(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new on(r.options.projectId,t)}/**
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
 */const va="__type__",fd="__max__",Ie={mapValue:{fields:{__type__:{stringValue:fd}}}},Aa="__vector__",jn="value",Us={nullValue:"NULL_VALUE"};function be(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?wa(r)?4:md(r)?9007199254740991:Pi(r)?10:11:M(28295,{value:r})}function Xt(r,t){if(r===t)return!0;const e=be(r);if(e!==be(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return Hr(r).isEqual(Hr(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=se(s.timestampValue),u=se(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos})(r,t);case 5:return r.stringValue===t.stringValue;case 6:return(function(s,i){return ie(s.bytesValue).isEqual(ie(i.bytesValue))})(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return(function(s,i){return it(s.geoPointValue.latitude)===it(i.geoPointValue.latitude)&&it(s.geoPointValue.longitude)===it(i.geoPointValue.longitude)})(r,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return it(s.integerValue)===it(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=it(s.doubleValue),u=it(i.doubleValue);return a===u?$r(a)===$r(u):isNaN(a)&&isNaN(u)}return!1})(r,t);case 9:return Mn(r.arrayValue.values||[],t.arrayValue.values||[],Xt);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if($c(a)!==$c(u))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!Xt(a[l],u[l])))return!1;return!0})(r,t);default:return M(52216,{left:r})}}function Wr(r,t){return(r.values||[]).find((e=>Xt(e,t)))!==void 0}function Re(r,t){if(r===t)return 0;const e=be(r),n=be(t);if(e!==n)return U(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return U(r.booleanValue,t.booleanValue);case 2:return(function(i,a){const u=it(i.integerValue||i.doubleValue),l=it(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1})(r,t);case 3:return Gc(r.timestampValue,t.timestampValue);case 4:return Gc(Hr(r),Hr(t));case 5:return Oo(r.stringValue,t.stringValue);case 6:return(function(i,a){const u=ie(i),l=ie(a);return u.compareTo(l)})(r.bytesValue,t.bytesValue);case 7:return(function(i,a){const u=i.split("/"),l=a.split("/");for(let h=0;h<u.length&&h<l.length;h++){const f=U(u[h],l[h]);if(f!==0)return f}return U(u.length,l.length)})(r.referenceValue,t.referenceValue);case 8:return(function(i,a){const u=U(it(i.latitude),it(a.latitude));return u!==0?u:U(it(i.longitude),it(a.longitude))})(r.geoPointValue,t.geoPointValue);case 9:return Kc(r.arrayValue,t.arrayValue);case 10:return(function(i,a){var I,P,D,k;const u=i.fields||{},l=a.fields||{},h=(I=u[jn])==null?void 0:I.arrayValue,f=(P=l[jn])==null?void 0:P.arrayValue,p=U(((D=h==null?void 0:h.values)==null?void 0:D.length)||0,((k=f==null?void 0:f.values)==null?void 0:k.length)||0);return p!==0?p:Kc(h,f)})(r.mapValue,t.mapValue);case 11:return(function(i,a){if(i===Ie.mapValue&&a===Ie.mapValue)return 0;if(i===Ie.mapValue)return 1;if(a===Ie.mapValue)return-1;const u=i.fields||{},l=Object.keys(u),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const I=Oo(l[p],f[p]);if(I!==0)return I;const P=Re(u[l[p]],h[f[p]]);if(P!==0)return P}return U(l.length,f.length)})(r.mapValue,t.mapValue);default:throw M(23264,{he:e})}}function Gc(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return U(r,t);const e=se(r),n=se(t),s=U(e.seconds,n.seconds);return s!==0?s:U(e.nanos,n.nanos)}function Kc(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=Re(e[s],n[s]);if(i)return i}return U(e.length,n.length)}function $n(r){return qo(r)}function qo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(e){const n=se(e);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(e){return ie(e).toBase64()})(r.bytesValue):"referenceValue"in r?(function(e){return N.fromName(e).toString()})(r.referenceValue):"geoPointValue"in r?(function(e){return`geo(${e.latitude},${e.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=qo(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${qo(e.fields[a])}`;return s+"}"})(r.mapValue):M(61005,{value:r})}function qs(r){switch(be(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Si(r);return t?16+qs(t):16;case 5:return 2*r.stringValue.length;case 6:return ie(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+qs(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return xe(n.fields,((i,a)=>{s+=i.length+qs(a)})),s})(r.mapValue);default:throw M(13486,{value:r})}}function Qr(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function jo(r){return!!r&&"integerValue"in r}function Jr(r){return!!r&&"arrayValue"in r}function Hc(r){return!!r&&"nullValue"in r}function Wc(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function js(r){return!!r&&"mapValue"in r}function Pi(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[va])==null?void 0:n.stringValue)===Aa}function Mr(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return xe(r.mapValue.fields,((e,n)=>t.mapValue.fields[e]=Mr(n))),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Mr(r.arrayValue.values[e]);return t}return{...r}}function md(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===fd}const pd={mapValue:{fields:{[va]:{stringValue:Aa},[jn]:{arrayValue:{}}}}};function gy(r){return"nullValue"in r?Us:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Qr(on.empty(),N.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Pi(r)?pd:{mapValue:{}}:M(35942,{value:r})}function _y(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Qr(on.empty(),N.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?pd:"mapValue"in r?Pi(r)?{mapValue:{}}:Ie:M(61959,{value:r})}function Qc(r,t){const e=Re(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function Jc(r,t){const e=Re(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
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
 */class At{constructor(t){this.value=t}static empty(){return new At({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!js(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Mr(e)}setAll(t){let e=ot.emptyPath(),n={},s=[];t.forEach(((a,u)=>{if(!e.isImmediateParentOf(u)){const l=this.getFieldsMap(e);this.applyChanges(l,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=Mr(a):s.push(u.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());js(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Xt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];js(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){xe(e,((s,i)=>t[s]=i));for(const s of n)delete t[s]}clone(){return new At(Mr(this.value))}}function gd(r){const t=[];return xe(r.fields,((e,n)=>{const s=new ot([e]);if(js(n)){const i=gd(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)})),new Nt(t)}/**
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
 */class ut{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new ut(t,0,B.min(),B.min(),B.min(),At.empty(),0)}static newFoundDocument(t,e,n,s){return new ut(t,1,e,B.min(),n,s,0)}static newNoDocument(t,e){return new ut(t,2,e,B.min(),B.min(),At.empty(),0)}static newUnknownDocument(t,e){return new ut(t,3,e,B.min(),B.min(),At.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof ut&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new ut(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class zn{constructor(t,e){this.position=t,this.inclusive=e}}function Yc(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=N.comparator(N.fromName(a.referenceValue),e.key):n=Re(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Xc(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Xt(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class Yr{constructor(t,e="asc"){this.field=t,this.dir=e}}function yy(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class _d{}class G extends _d{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Iy(t,e,n):e==="array-contains"?new wy(t,n):e==="in"?new vd(t,n):e==="not-in"?new vy(t,n):e==="array-contains-any"?new Ay(t,n):new G(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Ey(t,n):new Ty(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Re(e,this.value)):e!==null&&be(this.value)===be(e)&&this.matchesComparison(Re(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Z extends _d{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Z(t,e)}matches(t){return Gn(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Gn(r){return r.op==="and"}function $o(r){return r.op==="or"}function ba(r){return yd(r)&&Gn(r)}function yd(r){for(const t of r.filters)if(t instanceof Z)return!1;return!0}function zo(r){if(r instanceof G)return r.field.canonicalString()+r.op.toString()+$n(r.value);if(ba(r))return r.filters.map((t=>zo(t))).join(",");{const t=r.filters.map((e=>zo(e))).join(",");return`${r.op}(${t})`}}function Id(r,t){return r instanceof G?(function(n,s){return s instanceof G&&n.op===s.op&&n.field.isEqual(s.field)&&Xt(n.value,s.value)})(r,t):r instanceof Z?(function(n,s){return s instanceof Z&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,a,u)=>i&&Id(a,s.filters[u])),!0):!1})(r,t):void M(19439)}function Ed(r,t){const e=r.filters.concat(t);return Z.create(e,r.op)}function Td(r){return r instanceof G?(function(e){return`${e.field.canonicalString()} ${e.op} ${$n(e.value)}`})(r):r instanceof Z?(function(e){return e.op.toString()+" {"+e.getFilters().map(Td).join(" ,")+"}"})(r):"Filter"}class Iy extends G{constructor(t,e,n){super(t,e,n),this.key=N.fromName(n.referenceValue)}matches(t){const e=N.comparator(t.key,this.key);return this.matchesComparison(e)}}class Ey extends G{constructor(t,e){super(t,"in",e),this.keys=wd("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Ty extends G{constructor(t,e){super(t,"not-in",e),this.keys=wd("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function wd(r,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((n=>N.fromName(n.referenceValue)))}class wy extends G{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Jr(e)&&Wr(e.arrayValue,this.value)}}class vd extends G{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Wr(this.value.arrayValue,e)}}class vy extends G{constructor(t,e){super(t,"not-in",e)}matches(t){if(Wr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Wr(this.value.arrayValue,e)}}class Ay extends G{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Jr(e)||!e.arrayValue.values)&&e.arrayValue.values.some((n=>Wr(this.value.arrayValue,n)))}}/**
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
 */class by{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function Go(r,t=null,e=[],n=[],s=null,i=null,a=null){return new by(r,t,e,n,s,i,a)}function an(r){const t=F(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((n=>zo(n))).join(","),e+="|ob:",e+=t.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),vi(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((n=>$n(n))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((n=>$n(n))).join(",")),t.Te=e}return t.Te}function ss(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!yy(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!Id(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Xc(r.startAt,t.startAt)&&Xc(r.endAt,t.endAt)}function ni(r){return N.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function ri(r,t){return r.filters.filter((e=>e instanceof G&&e.field.isEqual(t)))}function Zc(r,t,e){let n=Us,s=!0;for(const i of ri(r,t)){let a=Us,u=!0;switch(i.op){case"<":case"<=":a=gy(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=Us}Qc({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Qc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function tl(r,t,e){let n=Ie,s=!0;for(const i of ri(r,t)){let a=Ie,u=!0;switch(i.op){case">=":case">":a=_y(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=Ie}Jc({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Jc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class Zn{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,l=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=l,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Ad(r,t,e,n,s,i,a,u){return new Zn(r,t,e,n,s,i,a,u)}function is(r){return new Zn(r)}function el(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Ry(r){return N.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function bd(r){return r.collectionGroup!==null}function Fr(r){const t=F(r);if(t.Ee===null){t.Ee=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ee.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new tt(ot.comparator);return a.filters.forEach((l=>{l.getFlattenedFilters().forEach((h=>{h.isInequality()&&(u=u.add(h.field))}))})),u})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ee.push(new Yr(i,n))})),e.has(ot.keyField().canonicalString())||t.Ee.push(new Yr(ot.keyField(),n))}return t.Ee}function Bt(r){const t=F(r);return t.Ie||(t.Ie=Sy(t,Fr(r))),t.Ie}function Sy(r,t){if(r.limitType==="F")return Go(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Yr(s.field,i)}));const e=r.endAt?new zn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new zn(r.startAt.position,r.startAt.inclusive):null;return Go(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function Ko(r,t){const e=r.filters.concat([t]);return new Zn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function Py(r,t){const e=r.explicitOrderBy.concat([t]);return new Zn(r.path,r.collectionGroup,e,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function si(r,t,e){return new Zn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function Vi(r,t){return ss(Bt(r),Bt(t))&&r.limitType===t.limitType}function Rd(r){return`${an(Bt(r))}|lt:${r.limitType}`}function Sn(r){return`Query(target=${(function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map((s=>Td(s))).join(", ")}]`),vi(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((s=>$n(s))).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((s=>$n(s))).join(",")),`Target(${n})`})(Bt(r))}; limitType=${r.limitType})`}function os(r,t){return t.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):N.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,t)&&(function(n,s){for(const i of Fr(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,t)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,t)&&(function(n,s){return!(n.startAt&&!(function(a,u,l){const h=Yc(a,u,l);return a.inclusive?h<=0:h<0})(n.startAt,Fr(n),s)||n.endAt&&!(function(a,u,l){const h=Yc(a,u,l);return a.inclusive?h>=0:h>0})(n.endAt,Fr(n),s))})(r,t)}function Sd(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Pd(r){return(t,e)=>{let n=!1;for(const s of Fr(r)){const i=Vy(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function Vy(r,t,e){const n=r.field.isKeyField()?N.comparator(t.key,e.key):(function(i,a,u){const l=a.data.field(i),h=u.data.field(i);return l!==null&&h!==null?Re(l,h):M(42886)})(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
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
 */class oe{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){xe(this.inner,((e,n)=>{for(const[s,i]of n)t(s,i)}))}isEmpty(){return ad(this.inner)}size(){return this.innerSize}}/**
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
 */const Cy=new nt(N.comparator);function Ft(){return Cy}const Vd=new nt(N.comparator);function Pr(...r){let t=Vd;for(const e of r)t=t.insert(e.key,e);return t}function Cd(r){let t=Vd;return r.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function Qt(){return Lr()}function Dd(){return Lr()}function Lr(){return new oe((r=>r.toString()),((r,t)=>r.isEqual(t)))}const Dy=new nt(N.comparator),xy=new tt(N.comparator);function z(...r){let t=xy;for(const e of r)t=t.add(e);return t}const Ny=new tt(U);function Ra(){return Ny}/**
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
 */function Sa(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:$r(t)?"-0":t}}function xd(r){return{integerValue:""+r}}function ky(r,t){return Jh(t)?xd(t):Sa(r,t)}/**
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
 */class Ci{constructor(){this._=void 0}}function Oy(r,t,e){return r instanceof Kn?(function(s,i){const a={fields:{[ld]:{stringValue:cd},[dd]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&wa(i)&&(i=Si(i)),i&&(a.fields[hd]=i),{mapValue:a}})(e,t):r instanceof un?kd(r,t):r instanceof cn?Od(r,t):(function(s,i){const a=Nd(s,i),u=nl(a)+nl(s.Ae);return jo(a)&&jo(s.Ae)?xd(u):Sa(s.serializer,u)})(r,t)}function My(r,t,e){return r instanceof un?kd(r,t):r instanceof cn?Od(r,t):e}function Nd(r,t){return r instanceof Xr?(function(n){return jo(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(t)?t:{integerValue:0}:null}class Kn extends Ci{}class un extends Ci{constructor(t){super(),this.elements=t}}function kd(r,t){const e=Md(t);for(const n of r.elements)e.some((s=>Xt(s,n)))||e.push(n);return{arrayValue:{values:e}}}class cn extends Ci{constructor(t){super(),this.elements=t}}function Od(r,t){let e=Md(t);for(const n of r.elements)e=e.filter((s=>!Xt(s,n)));return{arrayValue:{values:e}}}class Xr extends Ci{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function nl(r){return it(r.integerValue||r.doubleValue)}function Md(r){return Jr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class Di{constructor(t,e){this.field=t,this.transform=e}}function Fy(r,t){return r.field.isEqual(t.field)&&(function(n,s){return n instanceof un&&s instanceof un||n instanceof cn&&s instanceof cn?Mn(n.elements,s.elements,Xt):n instanceof Xr&&s instanceof Xr?Xt(n.Ae,s.Ae):n instanceof Kn&&s instanceof Kn})(r.transform,t.transform)}class Ly{constructor(t,e){this.version=t,this.transformResults=e}}class pt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new pt}static exists(t){return new pt(void 0,t)}static updateTime(t){return new pt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function $s(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class xi{}function Fd(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new as(r.key,pt.none()):new tr(r.key,r.data,pt.none());{const e=r.data,n=At.empty();let s=new tt(ot.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new ae(r.key,n,new Nt(s.toArray()),pt.none())}}function By(r,t,e){r instanceof tr?(function(s,i,a){const u=s.value.clone(),l=sl(s.fieldTransforms,i,a.transformResults);u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(r,t,e):r instanceof ae?(function(s,i,a){if(!$s(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=sl(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Ld(s)),l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(r,t,e):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function Br(r,t,e,n){return r instanceof tr?(function(i,a,u,l){if(!$s(i.precondition,a))return u;const h=i.value.clone(),f=il(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(r,t,e,n):r instanceof ae?(function(i,a,u,l){if(!$s(i.precondition,a))return u;const h=il(i.fieldTransforms,l,a),f=a.data;return f.setAll(Ld(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(r,t,e,n):(function(i,a,u){return $s(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(r,t,e)}function Uy(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=Nd(n.transform,s||null);i!=null&&(e===null&&(e=At.empty()),e.set(n.field,i))}return e||null}function rl(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Mn(n,s,((i,a)=>Fy(i,a)))})(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class tr extends xi{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ae extends xi{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Ld(r){const t=new Map;return r.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}})),t}function sl(r,t,e){const n=new Map;L(r.length===e.length,32656,{Ve:e.length,de:r.length});for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,My(a,u,e[s]))}return n}function il(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,Oy(i,a,t))}return n}class as extends xi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Bd extends xi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Pa{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&By(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=Br(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=Br(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Dd();return this.mutations.forEach((s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const l=Fd(a,u);l!==null&&n.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(B.min())})),n}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),z())}isEqual(t){return this.batchId===t.batchId&&Mn(this.mutations,t.mutations,((e,n)=>rl(e,n)))&&Mn(this.baseMutations,t.baseMutations,((e,n)=>rl(e,n)))}}class Va{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){L(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let s=(function(){return Dy})();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new Va(t,e,n,s)}}/**
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
 */class Ca{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class qy{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var dt,H;function jy(r){switch(r){case S.OK:return M(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function Ud(r){if(r===void 0)return lt("GRPC error has no .code"),S.UNKNOWN;switch(r){case dt.OK:return S.OK;case dt.CANCELLED:return S.CANCELLED;case dt.UNKNOWN:return S.UNKNOWN;case dt.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case dt.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case dt.INTERNAL:return S.INTERNAL;case dt.UNAVAILABLE:return S.UNAVAILABLE;case dt.UNAUTHENTICATED:return S.UNAUTHENTICATED;case dt.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case dt.NOT_FOUND:return S.NOT_FOUND;case dt.ALREADY_EXISTS:return S.ALREADY_EXISTS;case dt.PERMISSION_DENIED:return S.PERMISSION_DENIED;case dt.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case dt.ABORTED:return S.ABORTED;case dt.OUT_OF_RANGE:return S.OUT_OF_RANGE;case dt.UNIMPLEMENTED:return S.UNIMPLEMENTED;case dt.DATA_LOSS:return S.DATA_LOSS;default:return M(39323,{code:r})}}(H=dt||(dt={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function $y(){return new TextEncoder}/**
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
 */const zy=new Te([4294967295,4294967295],0);function ol(r){const t=$y().encode(r),e=new Oh;return e.update(t),new Uint8Array(e.digest())}function al(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Te([e,n],0),new Te([s,i],0)]}class Da{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Vr(`Invalid padding: ${e}`);if(n<0)throw new Vr(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new Vr(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new Vr(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Te.fromNumber(this.ge)}ye(t,e,n){let s=t.add(e.multiply(Te.fromNumber(n)));return s.compare(zy)===1&&(s=new Te([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=ol(t),[n,s]=al(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);if(!this.we(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new Da(i,s,e);return n.forEach((u=>a.insert(u))),a}insert(t){if(this.ge===0)return;const e=ol(t),[n,s]=al(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);this.Se(a)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Vr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class us{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,cs.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new us(B.min(),s,new nt(U),Ft(),z())}}class cs{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new cs(n,e,z(),z(),z())}}/**
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
 */class zs{constructor(t,e,n,s){this.be=t,this.removedTargetIds=e,this.key=n,this.De=s}}class qd{constructor(t,e){this.targetId=t,this.Ce=e}}class jd{constructor(t,e,n=ht.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class ul{constructor(){this.ve=0,this.Fe=cl(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=z(),e=z(),n=z();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:M(38017,{changeType:i})}})),new cs(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=cl()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,L(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Gy{constructor(t){this.Ge=t,this.ze=new Map,this.je=Ft(),this.Je=Ds(),this.He=Ds(),this.Ze=new nt(U)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.rt(e)&&n.Le(t.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(n.Qe(),n.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),n.Le(t.resumeToken));break;default:M(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((n,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,n=t.Ce.count,s=this.ot(e);if(s){const i=s.target;if(ni(i))if(n===0){const a=new N(i.path);this.et(e,a,ut.newNoDocument(a,B.min()))}else L(n===1,20013,{expectedCount:n});else{const a=this._t(e);if(a!==n){const u=this.ut(t),l=u?this.ct(u,t,a):1;if(l!==0){this.it(e);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,h)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=ie(n).toUint8Array()}catch(l){if(l instanceof ud)return On("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new Da(a,s,i)}catch(l){return On(l instanceof Vr?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.ge===0?null:u}ct(t,e,n){return e.Ce.count===n-this.Pt(t,e.targetId)?0:2}Pt(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let s=0;return n.forEach((i=>{const a=this.Ge.ht(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.et(e,i,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((i,a)=>{const u=this.ot(a);if(u){if(i.current&&ni(u.target)){const l=new N(u.target.path);this.Et(l).has(a)||this.It(a,l)||this.et(a,l,ut.newNoDocument(l,t))}i.Be&&(e.set(a,i.ke()),i.qe())}}));let n=z();this.He.forEach(((i,a)=>{let u=!0;a.forEachWhile((l=>{const h=this.ot(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(n=n.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(t)));const s=new us(t,e,this.Ze,this.je,n);return this.je=Ft(),this.Je=Ds(),this.He=Ds(),this.Ze=new nt(U),s}Ye(t,e){if(!this.rt(t))return;const n=this.It(t,e.key)?2:0;this.nt(t).Ke(e.key,n),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.He=this.He.insert(e.key,this.Rt(e.key).add(t))}et(t,e,n){if(!this.rt(t))return;const s=this.nt(t);this.It(t,e)?s.Ke(e,1):s.Ue(e),this.He=this.He.insert(e,this.Rt(e).delete(t)),this.He=this.He.insert(e,this.Rt(e).add(t)),n&&(this.je=this.je.insert(e,n))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.nt(t).$e()}nt(t){let e=this.ze.get(t);return e||(e=new ul,this.ze.set(t,e)),e}Rt(t){let e=this.He.get(t);return e||(e=new tt(U),this.He=this.He.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new tt(U),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||V("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new ul),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Ds(){return new nt(N.comparator)}function cl(){return new nt(N.comparator)}const Ky={asc:"ASCENDING",desc:"DESCENDING"},Hy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Wy={and:"AND",or:"OR"};class Qy{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Ho(r,t){return r.useProto3Json||vi(t)?t:{value:t}}function Hn(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function $d(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function Jy(r,t){return Hn(r,t.toTimestamp())}function Vt(r){return L(!!r,49232),B.fromTimestamp((function(e){const n=se(e);return new X(n.seconds,n.nanos)})(r))}function xa(r,t){return Wo(r,t).canonicalString()}function Wo(r,t){const e=(function(s){return new Y(["projects",s.projectId,"databases",s.database])})(r).child("documents");return t===void 0?e:e.child(t)}function zd(r){const t=Y.fromString(r);return L(Zd(t),10190,{key:t.toString()}),t}function ii(r,t){return xa(r.databaseId,t.path)}function Xe(r,t){const e=zd(t);if(e.get(1)!==r.databaseId.projectId)throw new C(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new C(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new N(Hd(e))}function Gd(r,t){return xa(r.databaseId,t)}function Kd(r){const t=zd(r);return t.length===4?Y.emptyPath():Hd(t)}function Qo(r){return new Y(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Hd(r){return L(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function ll(r,t,e){return{name:ii(r,t),fields:e.value.mapValue.fields}}function Yy(r,t,e){const n=Xe(r,t.name),s=Vt(t.updateTime),i=t.createTime?Vt(t.createTime):B.min(),a=new At({mapValue:{fields:t.fields}}),u=ut.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function Xy(r,t){let e;if("targetChange"in t){t.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:M(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(L(f===void 0||typeof f=="string",58123),ht.fromBase64String(f||"")):(L(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ht.fromUint8Array(f||new Uint8Array))})(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&(function(h){const f=h.code===void 0?S.UNKNOWN:Ud(h.code);return new C(f,h.message||"")})(a);e=new jd(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=Xe(r,n.document.name),i=Vt(n.document.updateTime),a=n.document.createTime?Vt(n.document.createTime):B.min(),u=new At({mapValue:{fields:n.document.fields}}),l=ut.newFoundDocument(s,i,a,u),h=n.targetIds||[],f=n.removedTargetIds||[];e=new zs(h,f,l.key,l)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=Xe(r,n.document),i=n.readTime?Vt(n.readTime):B.min(),a=ut.newNoDocument(s,i),u=n.removedTargetIds||[];e=new zs([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=Xe(r,n.document),i=n.removedTargetIds||[];e=new zs([],i,s,null)}else{if(!("filter"in t))return M(11601,{Vt:t});{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new qy(s,i),u=n.targetId;e=new qd(u,a)}}return e}function oi(r,t){let e;if(t instanceof tr)e={update:ll(r,t.key,t.value)};else if(t instanceof as)e={delete:ii(r,t.key)};else if(t instanceof ae)e={update:ll(r,t.key,t.data),updateMask:sI(t.fieldMask)};else{if(!(t instanceof Bd))return M(16599,{dt:t.type});e={verify:ii(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((n=>(function(i,a){const u=a.transform;if(u instanceof Kn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof un)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof cn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Xr)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw M(20930,{transform:a.transform})})(0,n)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Jy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)})(r,t.precondition)),e}function Jo(r,t){const e=t.currentDocument?(function(i){return i.updateTime!==void 0?pt.updateTime(Vt(i.updateTime)):i.exists!==void 0?pt.exists(i.exists):pt.none()})(t.currentDocument):pt.none(),n=t.updateTransforms?t.updateTransforms.map((s=>(function(a,u){let l=null;if("setToServerValue"in u)L(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),l=new Kn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];l=new un(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];l=new cn(f)}else"increment"in u?l=new Xr(a,u.increment):M(16584,{proto:u});const h=ot.fromServerFormat(u.fieldPath);return new Di(h,l)})(r,s))):[];if(t.update){t.update.name;const s=Xe(r,t.update.name),i=new At({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=(function(l){const h=l.fieldPaths||[];return new Nt(h.map((f=>ot.fromServerFormat(f))))})(t.updateMask);return new ae(s,i,a,e,n)}return new tr(s,i,e,n)}if(t.delete){const s=Xe(r,t.delete);return new as(s,e)}if(t.verify){const s=Xe(r,t.verify);return new Bd(s,e)}return M(1463,{proto:t})}function Zy(r,t){return r&&r.length>0?(L(t!==void 0,14353),r.map((e=>(function(s,i){let a=s.updateTime?Vt(s.updateTime):Vt(i);return a.isEqual(B.min())&&(a=Vt(i)),new Ly(a,s.transformResults||[])})(e,t)))):[]}function Wd(r,t){return{documents:[Gd(r,t.path)]}}function Qd(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=Gd(r,s);const i=(function(h){if(h.length!==0)return Xd(Z.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(I){return{field:Pn(I.field),direction:eI(I.dir)}})(f)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=Ho(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{ft:e,parent:s}}function Jd(r){let t=Kd(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){L(n===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=(function(p){const I=Yd(p);return I instanceof Z&&ba(I)?I.getFilters():[I]})(e.where));let a=[];e.orderBy&&(a=(function(p){return p.map((I=>(function(D){return new Yr(Vn(D.field),(function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(I)))})(e.orderBy));let u=null;e.limit&&(u=(function(p){let I;return I=typeof p=="object"?p.value:p,vi(I)?null:I})(e.limit));let l=null;e.startAt&&(l=(function(p){const I=!!p.before,P=p.values||[];return new zn(P,I)})(e.startAt));let h=null;return e.endAt&&(h=(function(p){const I=!p.before,P=p.values||[];return new zn(P,I)})(e.endAt)),Ad(t,s,a,i,u,"F",l,h)}function tI(r,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Yd(r){return r.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Vn(e.unaryFilter.field);return G.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Vn(e.unaryFilter.field);return G.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Vn(e.unaryFilter.field);return G.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Vn(e.unaryFilter.field);return G.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}})(r):r.fieldFilter!==void 0?(function(e){return G.create(Vn(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(e){return Z.create(e.compositeFilter.filters.map((n=>Yd(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}})(e.compositeFilter.op))})(r):M(30097,{filter:r})}function eI(r){return Ky[r]}function nI(r){return Hy[r]}function rI(r){return Wy[r]}function Pn(r){return{fieldPath:r.canonicalString()}}function Vn(r){return ot.fromServerFormat(r.fieldPath)}function Xd(r){return r instanceof G?(function(e){if(e.op==="=="){if(Wc(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NAN"}};if(Hc(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Wc(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NOT_NAN"}};if(Hc(e.value))return{unaryFilter:{field:Pn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Pn(e.field),op:nI(e.op),value:e.value}}})(r):r instanceof Z?(function(e){const n=e.getFilters().map((s=>Xd(s)));return n.length===1?n[0]:{compositeFilter:{op:rI(e.op),filters:n}}})(r):M(54877,{filter:r})}function sI(r){const t=[];return r.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Zd(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function tf(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
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
 */class te{constructor(t,e,n,s,i=B.min(),a=B.min(),u=ht.EMPTY_BYTE_STRING,l=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(t){return new te(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class ef{constructor(t){this.yt=t}}function iI(r,t){let e;if(t.document)e=Yy(r.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=N.fromSegments(t.noDocument.path),s=hn(t.noDocument.readTime);e=ut.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return M(56709);{const n=N.fromSegments(t.unknownDocument.path),s=hn(t.unknownDocument.version);e=ut.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime((function(s){const i=new X(s[0],s[1]);return B.fromTimestamp(i)})(t.readTime)),e}function hl(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:ai(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=(function(i,a){return{name:ii(i,a.key),fields:a.data.value.mapValue.fields,updateTime:Hn(i,a.version.toTimestamp()),createTime:Hn(i,a.createTime.toTimestamp())}})(r.yt,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:ln(t.version)};else{if(!t.isUnknownDocument())return M(57904,{document:t});n.unknownDocument={path:e.path.toArray(),version:ln(t.version)}}return n}function ai(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function ln(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function hn(r){const t=new X(r.seconds,r.nanoseconds);return B.fromTimestamp(t)}function Ge(r,t){const e=(t.baseMutations||[]).map((i=>Jo(r.yt,i)));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map((i=>Jo(r.yt,i))),s=X.fromMillis(t.localWriteTimeMs);return new Pa(t.batchId,s,e,n)}function Cr(r){const t=hn(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?hn(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const a=i.documents.length;return L(a===1,1966,{count:a}),Bt(is(Kd(i.documents[0])))})(r.query):(function(i){return Bt(Jd(i))})(r.query),new te(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,ht.fromBase64String(r.resumeToken))}function nf(r,t){const e=ln(t.snapshotVersion),n=ln(t.lastLimboFreeSnapshotVersion);let s;s=ni(t.target)?Wd(r.yt,t.target):Qd(r.yt,t.target).ft;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:an(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function rf(r){const t=Jd({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?si(t,t.limit,"L"):t}function To(r,t){return new Ca(t.largestBatchId,Jo(r.yt,t.overlayMutation))}function dl(r,t){const e=t.path.lastSegment();return[r,bt(t.path.popLast()),e]}function fl(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:ln(n.readTime),documentKey:bt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class oI{getBundleMetadata(t,e){return ml(t).get(e).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:hn(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(t,e){return ml(t).put((function(s){return{bundleId:s.id,createTime:ln(Vt(s.createTime)),version:s.version}})(e))}getNamedQuery(t,e){return pl(t).get(e).next((n=>{if(n)return(function(i){return{name:i.name,query:rf(i.bundledQuery),readTime:hn(i.readTime)}})(n)}))}saveNamedQuery(t,e){return pl(t).put((function(s){return{name:s.name,readTime:ln(Vt(s.readTime)),bundledQuery:s.bundledQuery}})(e))}}function ml(r){return gt(r,Ai)}function pl(r){return gt(r,bi)}/**
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
 */class Ni{constructor(t,e){this.serializer=t,this.userId=e}static wt(t,e){const n=e.uid||"";return new Ni(t,n)}getOverlay(t,e){return Tr(t).get(dl(this.userId,e)).next((n=>n?To(this.serializer,n):null))}getOverlays(t,e){const n=Qt();return v.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(t,e,n){const s=[];return n.forEach(((i,a)=>{const u=new Ca(e,a);s.push(this.St(t,u))})),v.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach((a=>s.add(bt(a.getCollectionPath()))));const i=[];return s.forEach((a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(Tr(t).X(Bo,u))})),v.waitFor(i)}getOverlaysForCollection(t,e,n){const s=Qt(),i=bt(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Tr(t).J(Bo,a).next((u=>{for(const l of u){const h=To(this.serializer,l);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(t,e,n,s){const i=Qt();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return Tr(t).ee({index:nd,range:u},((l,h,f)=>{const p=To(this.serializer,h);i.size()<s||p.largestBatchId===a?(i.set(p.getKey(),p),a=p.largestBatchId):f.done()})).next((()=>i))}St(t,e){return Tr(t).put((function(s,i,a){const[u,l,h]=dl(i,a.mutation.key);return{userId:i,collectionPath:l,documentId:h,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:oi(s.yt,a.mutation)}})(this.serializer,this.userId,e))}}function Tr(r){return gt(r,Ri)}/**
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
 */class aI{bt(t){return gt(t,Ea)}getSessionToken(t){return this.bt(t).get("sessionToken").next((e=>{const n=e==null?void 0:e.value;return n?ht.fromUint8Array(n):ht.EMPTY_BYTE_STRING}))}setSessionToken(t,e){return this.bt(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
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
 */class Ke{constructor(){}Dt(t,e){this.Ct(t,e),e.vt()}Ct(t,e){if("nullValue"in t)this.Ft(e,5);else if("booleanValue"in t)this.Ft(e,10),e.Mt(t.booleanValue?1:0);else if("integerValue"in t)this.Ft(e,15),e.Mt(it(t.integerValue));else if("doubleValue"in t){const n=it(t.doubleValue);isNaN(n)?this.Ft(e,13):(this.Ft(e,15),$r(n)?e.Mt(0):e.Mt(n))}else if("timestampValue"in t){let n=t.timestampValue;this.Ft(e,20),typeof n=="string"&&(n=se(n)),e.xt(`${n.seconds||""}`),e.Mt(n.nanos||0)}else if("stringValue"in t)this.Ot(t.stringValue,e),this.Nt(e);else if("bytesValue"in t)this.Ft(e,30),e.Bt(ie(t.bytesValue)),this.Nt(e);else if("referenceValue"in t)this.Lt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.Ft(e,45),e.Mt(n.latitude||0),e.Mt(n.longitude||0)}else"mapValue"in t?md(t)?this.Ft(e,Number.MAX_SAFE_INTEGER):Pi(t)?this.kt(t.mapValue,e):(this.qt(t.mapValue,e),this.Nt(e)):"arrayValue"in t?(this.Kt(t.arrayValue,e),this.Nt(e)):M(19022,{Ut:t})}Ot(t,e){this.Ft(e,25),this.$t(t,e)}$t(t,e){e.xt(t)}qt(t,e){const n=t.fields||{};this.Ft(e,55);for(const s of Object.keys(n))this.Ot(s,e),this.Ct(n[s],e)}kt(t,e){var a,u;const n=t.fields||{};this.Ft(e,53);const s=jn,i=((u=(a=n[s].arrayValue)==null?void 0:a.values)==null?void 0:u.length)||0;this.Ft(e,15),e.Mt(it(i)),this.Ot(s,e),this.Ct(n[s],e)}Kt(t,e){const n=t.values||[];this.Ft(e,50);for(const s of n)this.Ct(s,e)}Lt(t,e){this.Ft(e,37),N.fromName(t).path.forEach((n=>{this.Ft(e,60),this.$t(n,e)}))}Ft(t,e){t.Mt(e)}Nt(t){t.Mt(2)}}Ke.Wt=new Ke;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn=255;function uI(r){if(r===0)return 8;let t=0;return r>>4||(t+=4,r<<=4),r>>6||(t+=2,r<<=2),r>>7||(t+=1),t}function gl(r){const t=64-(function(n){let s=0;for(let i=0;i<8;++i){const a=uI(255&n[i]);if(s+=a,a!==8)break}return s})(r);return Math.ceil(t/8)}class cI{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Gt(n.value),n=e.next();this.zt()}jt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Jt(n.value),n=e.next();this.Ht()}Zt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=e.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=e.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(t){const e=this.en(t),n=gl(e);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}nn(t){const e=this.en(t),n=gl(e);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}rn(){this.sn(wn),this.sn(255)}_n(){this.an(wn),this.an(255)}reset(){this.position=0}seed(t){this.tn(t.length),this.buffer.set(t,this.position),this.position+=t.length}un(){return this.buffer.slice(0,this.position)}en(t){const e=(function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)})(t),n=!!(128&e[0]);e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Gt(t){const e=255&t;e===0?(this.sn(0),this.sn(255)):e===wn?(this.sn(wn),this.sn(0)):this.sn(e)}Jt(t){const e=255&t;e===0?(this.an(0),this.an(255)):e===wn?(this.an(wn),this.an(0)):this.an(t)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(t){this.tn(1),this.buffer[this.position++]=t}an(t){this.tn(1),this.buffer[this.position++]=~t}tn(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class lI{constructor(t){this.cn=t}Bt(t){this.cn.Qt(t)}xt(t){this.cn.Zt(t)}Mt(t){this.cn.Yt(t)}vt(){this.cn.rn()}}class hI{constructor(t){this.cn=t}Bt(t){this.cn.jt(t)}xt(t){this.cn.Xt(t)}Mt(t){this.cn.nn(t)}vt(){this.cn._n()}}class wr{constructor(){this.cn=new cI,this.ascending=new lI(this.cn),this.descending=new hI(this.cn)}seed(t){this.cn.seed(t)}ln(t){return t===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
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
 */class He{constructor(t,e,n,s){this.hn=t,this.Pn=e,this.Tn=n,this.En=s}In(){const t=this.En.length,e=t===0||this.En[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.En,0),e!==t?n.set([0],this.En.length):++n[n.length-1],new He(this.hn,this.Pn,this.Tn,n)}Rn(t,e,n){return{indexId:this.hn,uid:t,arrayValue:Gs(this.Tn),directionalValue:Gs(this.En),orderedDocumentKey:Gs(e),documentKey:n.path.toArray()}}An(t,e,n){const s=this.Rn(t,e,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function pe(r,t){let e=r.hn-t.hn;return e!==0?e:(e=_l(r.Tn,t.Tn),e!==0?e:(e=_l(r.En,t.En),e!==0?e:N.comparator(r.Pn,t.Pn)))}function _l(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}function Gs(r){return ch()?(function(e){let n="";for(let s=0;s<e.length;s++)n+=String.fromCharCode(e[s]);return n})(r):r}function yl(r){return typeof r!="string"?r:(function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n})(r)}class Il{constructor(t){this.Vn=new tt(((e,n)=>ot.comparator(e.field,n.field))),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.dn=t.orderBy,this.mn=[];for(const e of t.filters){const n=e;n.isInequality()?this.Vn=this.Vn.add(n):this.mn.push(n)}}get fn(){return this.Vn.size>1}gn(t){if(L(t.collectionGroup===this.collectionId,49279),this.fn)return!1;const e=Mo(t);if(e!==void 0&&!this.pn(e))return!1;const n=je(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.pn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const u=this.Vn.getIterator().getNext();if(!s.has(u.field.canonicalString())){const l=n[i];if(!this.yn(u,l)||!this.wn(this.dn[a++],l))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.dn.length||!this.wn(this.dn[a++],u))return!1}return!0}Sn(){if(this.fn)return null;let t=new tt(ot.comparator);const e=[];for(const n of this.mn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new Fs(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new Fs(n.field,0))}for(const n of this.dn)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new Fs(n.field,n.dir==="asc"?0:1)));return new Ys(Ys.UNKNOWN_ID,this.collectionId,e,jr.empty())}pn(t){for(const e of this.mn)if(this.yn(e,t))return!0;return!1}yn(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}wn(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
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
 */function sf(r){var e,n;if(L(r instanceof G||r instanceof Z,20012),r instanceof G){if(r instanceof vd){const s=((n=(e=r.value.arrayValue)==null?void 0:e.values)==null?void 0:n.map((i=>G.create(r.field,"==",i))))||[];return Z.create(s,"or")}return r}const t=r.filters.map((s=>sf(s)));return Z.create(t,r.op)}function dI(r){if(r.getFilters().length===0)return[];const t=Zo(sf(r));return L(of(t),7391),Yo(t)||Xo(t)?[t]:t.getFilters()}function Yo(r){return r instanceof G}function Xo(r){return r instanceof Z&&ba(r)}function of(r){return Yo(r)||Xo(r)||(function(e){if(e instanceof Z&&$o(e)){for(const n of e.getFilters())if(!Yo(n)&&!Xo(n))return!1;return!0}return!1})(r)}function Zo(r){if(L(r instanceof G||r instanceof Z,34018),r instanceof G)return r;if(r.filters.length===1)return Zo(r.filters[0]);const t=r.filters.map((n=>Zo(n)));let e=Z.create(t,r.op);return e=ui(e),of(e)?e:(L(e instanceof Z,64498),L(Gn(e),40251),L(e.filters.length>1,57927),e.filters.reduce(((n,s)=>Na(n,s))))}function Na(r,t){let e;return L(r instanceof G||r instanceof Z,38388),L(t instanceof G||t instanceof Z,25473),e=r instanceof G?t instanceof G?(function(s,i){return Z.create([s,i],"and")})(r,t):El(r,t):t instanceof G?El(t,r):(function(s,i){if(L(s.filters.length>0&&i.filters.length>0,48005),Gn(s)&&Gn(i))return Ed(s,i.getFilters());const a=$o(s)?s:i,u=$o(s)?i:s,l=a.filters.map((h=>Na(h,u)));return Z.create(l,"or")})(r,t),ui(e)}function El(r,t){if(Gn(t))return Ed(t,r.getFilters());{const e=t.filters.map((n=>Na(r,n)));return Z.create(e,"or")}}function ui(r){if(L(r instanceof G||r instanceof Z,11850),r instanceof G)return r;const t=r.getFilters();if(t.length===1)return ui(t[0]);if(yd(r))return r;const e=t.map((s=>ui(s))),n=[];return e.forEach((s=>{s instanceof G?n.push(s):s instanceof Z&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:Z.create(n,r.op)}/**
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
 */class fI{constructor(){this.bn=new ka}addToCollectionParentIndex(t,e){return this.bn.add(e),v.resolve()}getCollectionParents(t,e){return v.resolve(this.bn.getEntries(e))}addFieldIndex(t,e){return v.resolve()}deleteFieldIndex(t,e){return v.resolve()}deleteAllFieldIndexes(t){return v.resolve()}createTargetIndexes(t,e){return v.resolve()}getDocumentsMatchingTarget(t,e){return v.resolve(null)}getIndexType(t,e){return v.resolve(0)}getFieldIndexes(t,e){return v.resolve([])}getNextCollectionGroupToUpdate(t){return v.resolve(null)}getMinOffset(t,e){return v.resolve(Ut.min())}getMinOffsetFromCollectionGroup(t,e){return v.resolve(Ut.min())}updateCollectionGroup(t,e,n){return v.resolve()}updateIndexEntries(t,e){return v.resolve()}}class ka{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new tt(Y.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new tt(Y.comparator)).toArray()}}/**
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
 */const Tl="IndexedDbIndexManager",xs=new Uint8Array(0);class mI{constructor(t,e){this.databaseId=e,this.Dn=new ka,this.Cn=new oe((n=>an(n)),((n,s)=>ss(n,s))),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.Dn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener((()=>{this.Dn.add(e)}));const i={collectionId:n,parent:bt(s)};return wl(t).put(i)}return v.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[jh(e),""],!1,!0);return wl(t).J(s).next((i=>{for(const a of i){if(a.collectionId!==e)break;n.push(Wt(a.parent))}return n}))}addFieldIndex(t,e){const n=vr(t),s=(function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map((l=>[l.fieldPath.canonicalString(),l.kind]))}})(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=An(t);return i.next((u=>{a.put(fl(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))}))}return i.next()}deleteFieldIndex(t,e){const n=vr(t),s=An(t),i=vn(t);return n.delete(e.indexId).next((()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))))}deleteAllFieldIndexes(t){const e=vr(t),n=vn(t),s=An(t);return e.X().next((()=>n.X())).next((()=>s.X()))}createTargetIndexes(t,e){return v.forEach(this.vn(e),(n=>this.getIndexType(t,n).next((s=>{if(s===0||s===1){const i=new Il(n).Sn();if(i!=null)return this.addFieldIndex(t,i)}}))))}getDocumentsMatchingTarget(t,e){const n=vn(t);let s=!0;const i=new Map;return v.forEach(this.vn(e),(a=>this.Fn(t,a).next((u=>{s&&(s=!!u),i.set(a,u)})))).next((()=>{if(s){let a=z();const u=[];return v.forEach(i,((l,h)=>{V(Tl,`Using index ${(function(q){return`id=${q.indexId}|cg=${q.collectionGroup}|f=${q.fields.map((rt=>`${rt.fieldPath}:${rt.kind}`)).join(",")}`})(l)} to execute ${an(e)}`);const f=(function(q,rt){const Q=Mo(rt);if(Q===void 0)return null;for(const J of ri(q,Q.fieldPath))switch(J.op){case"array-contains-any":return J.value.arrayValue.values||[];case"array-contains":return[J.value]}return null})(h,l),p=(function(q,rt){const Q=new Map;for(const J of je(rt))for(const E of ri(q,J.fieldPath))switch(E.op){case"==":case"in":Q.set(J.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return Q.set(J.fieldPath.canonicalString(),E.value),Array.from(Q.values())}return null})(h,l),I=(function(q,rt){const Q=[];let J=!0;for(const E of je(rt)){const g=E.kind===0?Zc(q,E.fieldPath,q.startAt):tl(q,E.fieldPath,q.startAt);Q.push(g.value),J&&(J=g.inclusive)}return new zn(Q,J)})(h,l),P=(function(q,rt){const Q=[];let J=!0;for(const E of je(rt)){const g=E.kind===0?tl(q,E.fieldPath,q.endAt):Zc(q,E.fieldPath,q.endAt);Q.push(g.value),J&&(J=g.inclusive)}return new zn(Q,J)})(h,l),D=this.Mn(l,h,I),k=this.Mn(l,h,P),O=this.xn(l,h,p),K=this.On(l.indexId,f,D,I.inclusive,k,P.inclusive,O);return v.forEach(K,(j=>n.Z(j,e.limit).next((q=>{q.forEach((rt=>{const Q=N.fromSegments(rt.documentKey);a.has(Q)||(a=a.add(Q),u.push(Q))}))}))))})).next((()=>u))}return v.resolve(null)}))}vn(t){let e=this.Cn.get(t);return e||(t.filters.length===0?e=[t]:e=dI(Z.create(t.filters,"and")).map((n=>Go(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt))),this.Cn.set(t,e),e)}On(t,e,n,s,i,a,u){const l=(e!=null?e.length:1)*Math.max(n.length,i.length),h=l/(e!=null?e.length:1),f=[];for(let p=0;p<l;++p){const I=e?this.Nn(e[p/h]):xs,P=this.Bn(t,I,n[p%h],s),D=this.Ln(t,I,i[p%h],a),k=u.map((O=>this.Bn(t,I,O,!0)));f.push(...this.createRange(P,D,k))}return f}Bn(t,e,n,s){const i=new He(t,N.empty(),e,n);return s?i:i.In()}Ln(t,e,n,s){const i=new He(t,N.empty(),e,n);return s?i.In():i}Fn(t,e){const n=new Il(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next((i=>{let a=null;for(const u of i)n.gn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a}))}getIndexType(t,e){let n=2;const s=this.vn(e);return v.forEach(s,(i=>this.Fn(t,i).next((a=>{a?n!==0&&a.fields.length<(function(l){let h=new tt(ot.comparator),f=!1;for(const p of l.filters)for(const I of p.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?f=!0:h=h.add(I.field));for(const p of l.orderBy)p.field.isKeyField()||(h=h.add(p.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(a){return a.limit!==null})(e)&&s.length>1&&n===2?1:n))}kn(t,e){const n=new wr;for(const s of je(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.ln(s.kind);Ke.Wt.Dt(i,a)}return n.un()}Nn(t){const e=new wr;return Ke.Wt.Dt(t,e.ln(0)),e.un()}qn(t,e){const n=new wr;return Ke.Wt.Dt(Qr(this.databaseId,e),n.ln((function(i){const a=je(i);return a.length===0?0:a[a.length-1].kind})(t))),n.un()}xn(t,e,n){if(n===null)return[];let s=[];s.push(new wr);let i=0;for(const a of je(t)){const u=n[i++];for(const l of s)if(this.Kn(e,a.fieldPath)&&Jr(u))s=this.Un(s,a,u);else{const h=l.ln(a.kind);Ke.Wt.Dt(u,h)}}return this.$n(s)}Mn(t,e,n){return this.xn(t,e,n.position)}$n(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].un();return e}Un(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const l=new wr;l.seed(u.un()),Ke.Wt.Dt(a,l.ln(e.kind)),i.push(l)}return i}Kn(t,e){return!!t.filters.find((n=>n instanceof G&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(t,e){const n=vr(t),s=An(t);return(e?n.J(Lo,IDBKeyRange.bound(e,e)):n.J()).next((i=>{const a=[];return v.forEach(i,(u=>s.get([u.indexId,this.uid]).next((l=>{a.push((function(f,p){const I=p?new jr(p.sequenceNumber,new Ut(hn(p.readTime),new N(Wt(p.documentKey)),p.largestBatchId)):jr.empty(),P=f.fields.map((([D,k])=>new Fs(ot.fromServerFormat(D),k)));return new Ys(f.indexId,f.collectionGroup,P,I)})(u,l))})))).next((()=>a))}))}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next((e=>e.length===0?null:(e.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:U(n.collectionGroup,s.collectionGroup)})),e[0].collectionGroup)))}updateCollectionGroup(t,e,n){const s=vr(t),i=An(t);return this.Wn(t).next((a=>s.J(Lo,IDBKeyRange.bound(e,e)).next((u=>v.forEach(u,(l=>i.put(fl(l.indexId,this.uid,a,n))))))))}updateIndexEntries(t,e){const n=new Map;return v.forEach(e,((s,i)=>{const a=n.get(s.collectionGroup);return(a?v.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next((u=>(n.set(s.collectionGroup,u),v.forEach(u,(l=>this.Qn(t,s,l).next((h=>{const f=this.Gn(i,l);return h.isEqual(f)?v.resolve():this.zn(t,i,l,h,f)})))))))}))}jn(t,e,n,s){return vn(t).put(s.Rn(this.uid,this.qn(n,e.key),e.key))}Jn(t,e,n,s){return vn(t).delete(s.An(this.uid,this.qn(n,e.key),e.key))}Qn(t,e,n){const s=vn(t);let i=new tt(pe);return s.ee({index:ed,range:IDBKeyRange.only([n.indexId,this.uid,Gs(this.qn(n,e))])},((a,u)=>{i=i.add(new He(n.indexId,e,yl(u.arrayValue),yl(u.directionalValue)))})).next((()=>i))}Gn(t,e){let n=new tt(pe);const s=this.kn(e,t);if(s==null)return n;const i=Mo(e);if(i!=null){const a=t.data.field(i.fieldPath);if(Jr(a))for(const u of a.arrayValue.values||[])n=n.add(new He(e.indexId,t.key,this.Nn(u),s))}else n=n.add(new He(e.indexId,t.key,xs,s));return n}zn(t,e,n,s,i){V(Tl,"Updating index entries for document '%s'",e.key);const a=[];return(function(l,h,f,p,I){const P=l.getIterator(),D=h.getIterator();let k=Tn(P),O=Tn(D);for(;k||O;){let K=!1,j=!1;if(k&&O){const q=f(k,O);q<0?j=!0:q>0&&(K=!0)}else k!=null?j=!0:K=!0;K?(p(O),O=Tn(D)):j?(I(k),k=Tn(P)):(k=Tn(P),O=Tn(D))}})(s,i,pe,(u=>{a.push(this.jn(t,e,n,u))}),(u=>{a.push(this.Jn(t,e,n,u))})),v.waitFor(a)}Wn(t){let e=1;return An(t).ee({index:td,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),e=s.sequenceNumber+1})).next((()=>e))}createRange(t,e,n){n=n.sort(((a,u)=>pe(a,u))).filter(((a,u,l)=>!u||pe(a,l[u-1])!==0));const s=[];s.push(t);for(const a of n){const u=pe(a,t),l=pe(a,e);if(u===0)s[0]=t.In();else if(u>0&&l<0)s.push(a),s.push(a.In());else if(l>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Hn(s[a],s[a+1]))return[];const u=s[a].An(this.uid,xs,N.empty()),l=s[a+1].An(this.uid,xs,N.empty());i.push(IDBKeyRange.bound(u,l))}return i}Hn(t,e){return pe(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(vl)}getMinOffset(t,e){return v.mapArray(this.vn(e),(n=>this.Fn(t,n).next((s=>s||M(44426))))).next(vl)}}function wl(r){return gt(r,Kr)}function vn(r){return gt(r,Or)}function vr(r){return gt(r,Ia)}function An(r){return gt(r,kr)}function vl(r){L(r.length!==0,28825);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;ga(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new Ut(t.readTime,t.documentKey,e)}/**
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
 */const Al={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},af=41943040;class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function uf(r,t,e){const n=r.store(jt),s=r.store(Ln),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const l=n.ee({range:a},((f,p,I)=>(u++,I.delete())));i.push(l.next((()=>{L(u===1,47070,{batchId:e.batchId})})));const h=[];for(const f of e.mutations){const p=Yh(t,f.key.path,e.batchId);i.push(s.delete(p)),h.push(f.key)}return v.waitFor(i).next((()=>h))}function ci(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw M(14731);t=r.noDocument}return JSON.stringify(t).length}/**
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
 */vt.DEFAULT_COLLECTION_PERCENTILE=10,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vt.DEFAULT=new vt(af,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vt.DISABLED=new vt(-1,0,0);class ki{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static wt(t,e,n,s){L(t.uid!=="",64387);const i=t.isAuthenticated()?t.uid:"";return new ki(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return ge(t).ee({index:Qe,range:n},((s,i,a)=>{e=!1,a.done()})).next((()=>e))}addMutationBatch(t,e,n,s){const i=Cn(t),a=ge(t);return a.add({}).next((u=>{L(typeof u=="number",49019);const l=new Pa(u,e,n,s),h=(function(P,D,k){const O=k.baseMutations.map((j=>oi(P.yt,j))),K=k.mutations.map((j=>oi(P.yt,j)));return{userId:D,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:O,mutations:K}})(this.serializer,this.userId,l),f=[];let p=new tt(((I,P)=>U(I.canonicalString(),P.canonicalString())));for(const I of s){const P=Yh(this.userId,I.key.path,u);p=p.add(I.key.path.popLast()),f.push(a.put(h)),f.push(i.put(P,$_))}return p.forEach((I=>{f.push(this.indexManager.addToCollectionParentIndex(t,I))})),t.addOnCommittedListener((()=>{this.Zn[u]=l.keys()})),v.waitFor(f).next((()=>l))}))}lookupMutationBatch(t,e){return ge(t).get(e).next((n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:e}),Ge(this.serializer,n)):null))}Xn(t,e){return this.Zn[e]?v.resolve(this.Zn[e]):this.lookupMutationBatch(t,e).next((n=>{if(n){const s=n.keys();return this.Zn[e]=s,s}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return ge(t).ee({index:Qe,range:s},((a,u,l)=>{u.userId===this.userId&&(L(u.batchId>=n,47524,{Yn:n}),i=Ge(this.serializer,u)),l.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Je;return ge(t).ee({index:Qe,range:e,reverse:!0},((s,i,a)=>{n=i.batchId,a.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,Je],[this.userId,Number.POSITIVE_INFINITY]);return ge(t).J(Qe,e).next((n=>n.map((s=>Ge(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=Ls(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return Cn(t).ee({range:s},((a,u,l)=>{const[h,f,p]=a,I=Wt(f);if(h===this.userId&&e.path.isEqual(I))return ge(t).get(p).next((P=>{if(!P)throw M(61480,{er:a,batchId:p});L(P.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:P.userId,batchId:p}),i.push(Ge(this.serializer,P))}));l.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new tt(U);const s=[];return e.forEach((i=>{const a=Ls(this.userId,i.path),u=IDBKeyRange.lowerBound(a),l=Cn(t).ee({range:u},((h,f,p)=>{const[I,P,D]=h,k=Wt(P);I===this.userId&&i.path.isEqual(k)?n=n.add(D):p.done()}));s.push(l)})),v.waitFor(s).next((()=>this.tr(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=Ls(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new tt(U);return Cn(t).ee({range:a},((l,h,f)=>{const[p,I,P]=l,D=Wt(I);p===this.userId&&n.isPrefixOf(D)?D.length===s&&(u=u.add(P)):f.done()})).next((()=>this.tr(t,u)))}tr(t,e){const n=[],s=[];return e.forEach((i=>{s.push(ge(t).get(i).next((a=>{if(a===null)throw M(35274,{batchId:i});L(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(Ge(this.serializer,a))})))})),v.waitFor(s).next((()=>n))}removeMutationBatch(t,e){return uf(t.le,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.nr(e.batchId)})),v.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))))}nr(t){delete this.Zn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return v.resolve();const n=IDBKeyRange.lowerBound((function(a){return[a]})(this.userId)),s=[];return Cn(t).ee({range:n},((i,a,u)=>{if(i[0]===this.userId){const l=Wt(i[1]);s.push(l)}else u.done()})).next((()=>{L(s.length===0,56720,{rr:s.map((i=>i.canonicalString()))})}))}))}containsKey(t,e){return cf(t,this.userId,e)}ir(t){return lf(t).get(this.userId).next((e=>e||{userId:this.userId,lastAcknowledgedBatchId:Je,lastStreamToken:""}))}}function cf(r,t,e){const n=Ls(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return Cn(r).ee({range:i,Y:!0},((u,l,h)=>{const[f,p,I]=u;f===t&&p===s&&(a=!0),h.done()})).next((()=>a))}function ge(r){return gt(r,jt)}function Cn(r){return gt(r,Ln)}function lf(r){return gt(r,zr)}/**
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
 */class dn{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new dn(0)}static ar(){return new dn(-1)}}/**
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
 */class pI{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.ur(t).next((e=>{const n=new dn(e.highestTargetId);return e.highestTargetId=n.next(),this.cr(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.ur(t).next((e=>B.fromTimestamp(new X(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.ur(t).next((e=>e.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.ur(t).next((s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.cr(t,s))))}addTargetData(t,e){return this.lr(t,e).next((()=>this.ur(t).next((n=>(n.targetCount+=1,this.hr(e,n),this.cr(t,n))))))}updateTargetData(t,e){return this.lr(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>bn(t).delete(e.targetId))).next((()=>this.ur(t))).next((n=>(L(n.targetCount>0,8065),n.targetCount-=1,this.cr(t,n))))}removeTargets(t,e,n){let s=0;const i=[];return bn(t).ee(((a,u)=>{const l=Cr(u);l.sequenceNumber<=e&&n.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(t,l)))})).next((()=>v.waitFor(i))).next((()=>s))}forEachTarget(t,e){return bn(t).ee(((n,s)=>{const i=Cr(s);e(i)}))}ur(t){return bl(t).get(ti).next((e=>(L(e!==null,2888),e)))}cr(t,e){return bl(t).put(ti,e)}lr(t,e){return bn(t).put(nf(this.serializer,e))}hr(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.ur(t).next((e=>e.targetCount))}getTargetData(t,e){const n=an(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return bn(t).ee({range:s,index:Zh},((a,u,l)=>{const h=Cr(u);ss(e,h.target)&&(i=h,l.done())})).next((()=>i))}addMatchingKeys(t,e,n){const s=[],i=ye(t);return e.forEach((a=>{const u=bt(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))})),v.waitFor(s)}removeMatchingKeys(t,e,n){const s=ye(t);return v.forEach(e,(i=>{const a=bt(i.path);return v.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])}))}removeMatchingKeysForTargetId(t,e){const n=ye(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=ye(t);let i=z();return s.ee({range:n,Y:!0},((a,u,l)=>{const h=Wt(a[1]),f=new N(h);i=i.add(f)})).next((()=>i))}containsKey(t,e){const n=bt(e.path),s=IDBKeyRange.bound([n],[jh(n)],!1,!0);let i=0;return ye(t).ee({index:ya,Y:!0,range:s},(([a,u],l,h)=>{a!==0&&(i++,h.done())})).next((()=>i>0))}At(t,e){return bn(t).get(e).next((n=>n?Cr(n):null))}}function bn(r){return gt(r,Bn)}function bl(r){return gt(r,Ye)}function ye(r){return gt(r,Un)}/**
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
 */const Rl="LruGarbageCollector",hf=1048576;function Sl([r,t],[e,n]){const s=U(r,e);return s===0?U(t,n):s}class gI{constructor(t){this.Pr=t,this.buffer=new tt(Sl),this.Tr=0}Er(){return++this.Tr}Ir(t){const e=[t,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Sl(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class df{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){V(Rl,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){De(e)?V(Rl,"Ignoring IndexedDB error during garbage collection: ",e):await Ce(e)}await this.Ar(3e5)}))}}class _I{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next((n=>Math.floor(e/100*n)))}nthSequenceNumber(t,e){if(e===0)return v.resolve(xt.ce);const n=new gI(e);return this.Vr.forEachTarget(t,(s=>n.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(t,(s=>n.Ir(s))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.Vr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(Al)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Al):this.gr(t,e)))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let n,s,i,a,u,l,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(t,s)))).next((p=>(n=p,u=Date.now(),this.removeTargets(t,n,e)))).next((p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(t,n)))).next((p=>(h=Date.now(),Rn()<=W.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(l-u)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function ff(r,t){return new _I(r,t)}/**
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
 */class yI{constructor(t,e){this.db=t,this.garbageCollector=ff(this,e)}dr(t){const e=this.pr(t);return this.db.getTargetCache().getTargetCount(t).next((n=>e.next((s=>n+s))))}pr(t){let e=0;return this.mr(t,(n=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}mr(t,e){return this.yr(t,((n,s)=>e(s)))}addReference(t,e,n){return Ns(t,n)}removeReference(t,e,n){return Ns(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Ns(t,e)}wr(t,e){return(function(s,i){let a=!1;return lf(s).te((u=>cf(s,u,i).next((l=>(l&&(a=!0),v.resolve(!l)))))).next((()=>a))})(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(t,((a,u)=>{if(u<=e){const l=this.wr(t,a).next((h=>{if(!h)return i++,n.getEntry(t,a).next((()=>(n.removeEntry(a,B.min()),ye(t).delete((function(p){return[0,bt(p.path)]})(a)))))}));s.push(l)}})).next((()=>v.waitFor(s))).next((()=>n.apply(t))).next((()=>i))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Ns(t,e)}yr(t,e){const n=ye(t);let s,i=xt.ce;return n.ee({index:ya},(([a,u],{path:l,sequenceNumber:h})=>{a===0?(i!==xt.ce&&e(new N(Wt(s)),i),i=h,s=l):i=xt.ce})).next((()=>{i!==xt.ce&&e(new N(Wt(s)),i)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Ns(r,t){return ye(r).put((function(n,s){return{targetId:0,path:bt(n.path),sequenceNumber:s}})(t,r.currentSequenceNumber))}/**
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
 */class mf{constructor(){this.changes=new oe((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,ut.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?v.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class II{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return Ue(t).put(n)}removeEntry(t,e,n){return Ue(t).delete((function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],ai(a),u[u.length-1]]})(e,n))}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.Sr(t,n))))}getEntry(t,e){let n=ut.newInvalidDocument(e);return Ue(t).ee({index:Bs,range:IDBKeyRange.only(Ar(e))},((s,i)=>{n=this.br(e,i)})).next((()=>n))}Dr(t,e){let n={size:0,document:ut.newInvalidDocument(e)};return Ue(t).ee({index:Bs,range:IDBKeyRange.only(Ar(e))},((s,i)=>{n={document:this.br(e,i),size:ci(i)}})).next((()=>n))}getEntries(t,e){let n=Ft();return this.Cr(t,e,((s,i)=>{const a=this.br(s,i);n=n.insert(s,a)})).next((()=>n))}vr(t,e){let n=Ft(),s=new nt(N.comparator);return this.Cr(t,e,((i,a)=>{const u=this.br(i,a);n=n.insert(i,u),s=s.insert(i,ci(a))})).next((()=>({documents:n,Fr:s})))}Cr(t,e,n){if(e.isEmpty())return v.resolve();let s=new tt(Cl);e.forEach((l=>s=s.add(l)));const i=IDBKeyRange.bound(Ar(s.first()),Ar(s.last())),a=s.getIterator();let u=a.getNext();return Ue(t).ee({index:Bs,range:i},((l,h,f)=>{const p=N.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&Cl(u,p)<0;)n(u,null),u=a.getNext();u&&u.isEqual(p)&&(n(u,h),u=a.hasNext()?a.getNext():null),u?f.j(Ar(u)):f.done()})).next((()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null}))}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),ai(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ue(t).J(IDBKeyRange.bound(u,l,!0)).next((h=>{i==null||i.incrementDocumentReadCount(h.length);let f=Ft();for(const p of h){const I=this.br(N.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);I.isFoundDocument()&&(os(e,I)||s.has(I.key))&&(f=f.insert(I.key,I))}return f}))}getAllFromCollectionGroup(t,e,n,s){let i=Ft();const a=Vl(e,n),u=Vl(e,Ut.max());return Ue(t).ee({index:Xh,range:IDBKeyRange.bound(a,u,!0)},((l,h,f)=>{const p=this.br(N.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(p.key,p),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(t){return new EI(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((e=>e.byteSize))}getMetadata(t){return Pl(t).get(Fo).next((e=>(L(!!e,20021),e)))}Sr(t,e){return Pl(t).put(Fo,e)}br(t,e){if(e){const n=iI(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return ut.newInvalidDocument(t)}}function pf(r){return new II(r)}class EI extends mf{constructor(t,e){super(),this.Mr=t,this.trackRemovals=e,this.Or=new oe((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(t){const e=[];let n=0,s=new tt(((i,a)=>U(i.canonicalString(),a.canonicalString())));return this.changes.forEach(((i,a)=>{const u=this.Or.get(i);if(e.push(this.Mr.removeEntry(t,i,u.readTime)),a.isValidDocument()){const l=hl(this.Mr.serializer,a);s=s.add(i.path.popLast());const h=ci(l);n+=h-u.size,e.push(this.Mr.addEntry(t,i,l))}else if(n-=u.size,this.trackRemovals){const l=hl(this.Mr.serializer,a.convertToNoDocument(B.min()));e.push(this.Mr.addEntry(t,i,l))}})),s.forEach((i=>{e.push(this.Mr.indexManager.addToCollectionParentIndex(t,i))})),e.push(this.Mr.updateMetadata(t,n)),v.waitFor(e)}getFromCache(t,e){return this.Mr.Dr(t,e).next((n=>(this.Or.set(e,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(t,e){return this.Mr.vr(t,e).next((({documents:n,Fr:s})=>(s.forEach(((i,a)=>{this.Or.set(i,{size:a,readTime:n.get(i).readTime})})),n)))}}function Pl(r){return gt(r,Gr)}function Ue(r){return gt(r,Zs)}function Ar(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Vl(r,t){const e=t.documentKey.path.toArray();return[r,ai(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function Cl(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=U(e[i],n[i]),s)return s;return s=U(e.length,n.length),s||(s=U(e[e.length-2],n[n.length-2]),s||U(e[e.length-1],n[n.length-1]))}/**
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
 */class TI{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class gf{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(n=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(n!==null&&Br(n.mutation,s,Nt.empty(),X.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.getLocalViewOfDocuments(t,n,z()).next((()=>n))))}getLocalViewOfDocuments(t,e,n=z()){const s=Qt();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,n).next((i=>{let a=Pr();return i.forEach(((u,l)=>{a=a.insert(u,l.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const n=Qt();return this.populateOverlays(t,n,e).next((()=>this.computeViews(t,e,n,z())))}populateOverlays(t,e,n){const s=[];return n.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((a,u)=>{e.set(a,u)}))}))}computeViews(t,e,n,s){let i=Ft();const a=Lr(),u=(function(){return Lr()})();return e.forEach(((l,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof ae)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Br(f.mutation,h,f.mutation.getFieldMask(),X.now())):a.set(h.key,Nt.empty())})),this.recalculateAndSaveOverlays(t,i).next((l=>(l.forEach(((h,f)=>a.set(h,f))),e.forEach(((h,f)=>u.set(h,new TI(f,a.get(h)??null)))),u)))}recalculateAndSaveOverlays(t,e){const n=Lr();let s=new nt(((a,u)=>a-u)),i=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const u of a)u.keys().forEach((l=>{const h=e.get(l);if(h===null)return;let f=n.get(l)||Nt.empty();f=u.applyToLocalView(h,f),n.set(l,f);const p=(s.get(u.batchId)||z()).add(l);s=s.insert(u.batchId,p)}))})).next((()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const l=u.getNext(),h=l.key,f=l.value,p=Dd();f.forEach((I=>{if(!i.has(I)){const P=Fd(e.get(I),n.get(I));P!==null&&p.set(I,P),i=i.add(I)}})),a.push(this.documentOverlayCache.saveOverlays(t,h,p))}return v.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.recalculateAndSaveOverlays(t,n)))}getDocumentsMatchingQuery(t,e,n,s){return Ry(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):bd(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):v.resolve(Qt());let u=Fn,l=i;return a.next((h=>v.forEach(h,((f,p)=>(u<p.largestBatchId&&(u=p.largestBatchId),i.get(f)?v.resolve():this.remoteDocumentCache.getEntry(t,f).next((I=>{l=l.insert(f,I)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,l,h,z()))).next((f=>({batchId:u,changes:Cd(f)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new N(e)).next((n=>{let s=Pr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=Pr();return this.indexManager.getCollectionParents(t,i).next((u=>v.forEach(u,(l=>{const h=(function(p,I){return new Zn(I,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(e,l.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,n,s).next((f=>{f.forEach(((p,I)=>{a=a.insert(p,I)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s)))).next((a=>{i.forEach(((l,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,ut.newInvalidDocument(f)))}));let u=Pr();return a.forEach(((l,h)=>{const f=i.get(l);f!==void 0&&Br(f.mutation,h,Nt.empty(),X.now()),os(e,h)&&(u=u.insert(l,h))})),u}))}}/**
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
 */class wI{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return v.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Vt(s.createTime)}})(e)),v.resolve()}getNamedQuery(t,e){return v.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,(function(s){return{name:s.name,query:rf(s.bundledQuery),readTime:Vt(s.readTime)}})(e)),v.resolve()}}/**
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
 */class vI{constructor(){this.overlays=new nt(N.comparator),this.Lr=new Map}getOverlay(t,e){return v.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Qt();return v.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(t,e,n){return n.forEach(((s,i)=>{this.St(t,e,i)})),v.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Lr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(n)),v.resolve()}getOverlaysForCollection(t,e,n){const s=Qt(),i=e.length+1,a=new N(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const l=u.getNext().value,h=l.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>n&&s.set(l.getKey(),l)}return v.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new nt(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Qt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=Qt(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((h,f)=>u.set(h,f))),!(u.size()>=s)););return v.resolve(u)}St(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(n.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Ca(e,n));let i=this.Lr.get(e);i===void 0&&(i=z(),this.Lr.set(e,i)),this.Lr.set(e,i.add(n.key))}}/**
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
 */class AI{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return v.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,v.resolve()}}/**
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
 */class Oa{constructor(){this.kr=new tt(yt.qr),this.Kr=new tt(yt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const n=new yt(t,e);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(t,e){t.forEach((n=>this.addReference(n,e)))}removeReference(t,e){this.Wr(new yt(t,e))}Qr(t,e){t.forEach((n=>this.removeReference(n,e)))}Gr(t){const e=new N(new Y([])),n=new yt(e,t),s=new yt(e,t+1),i=[];return this.Kr.forEachInRange([n,s],(a=>{this.Wr(a),i.push(a.key)})),i}zr(){this.kr.forEach((t=>this.Wr(t)))}Wr(t){this.kr=this.kr.delete(t),this.Kr=this.Kr.delete(t)}jr(t){const e=new N(new Y([])),n=new yt(e,t),s=new yt(e,t+1);let i=z();return this.Kr.forEachInRange([n,s],(a=>{i=i.add(a.key)})),i}containsKey(t){const e=new yt(t,0),n=this.kr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class yt{constructor(t,e){this.key=t,this.Jr=e}static qr(t,e){return N.comparator(t.key,e.key)||U(t.Jr,e.Jr)}static Ur(t,e){return U(t.Jr,e.Jr)||N.comparator(t.key,e.key)}}/**
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
 */class bI{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Hr=new tt(yt.qr)}checkEmpty(t){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Pa(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.Hr=this.Hr.add(new yt(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return v.resolve(a)}lookupMutationBatch(t,e){return v.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Xr(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?Je:this.Yn-1)}getAllMutationBatches(t){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new yt(e,0),s=new yt(e,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,s],(a=>{const u=this.Zr(a.Jr);i.push(u)})),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new tt(U);return e.forEach((s=>{const i=new yt(s,0),a=new yt(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,a],(u=>{n=n.add(u.Jr)}))})),v.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;N.isDocumentKey(i)||(i=i.child(""));const a=new yt(new N(i),0);let u=new tt(U);return this.Hr.forEachWhile((l=>{const h=l.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(u=u.add(l.Jr)),!0)}),a),v.resolve(this.Yr(u))}Yr(t){const e=[];return t.forEach((n=>{const s=this.Zr(n);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){L(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Hr;return v.forEach(e.mutations,(s=>{const i=new yt(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Hr=n}))}nr(t){}containsKey(t,e){const n=new yt(e,0),s=this.Hr.firstAfterOrEqual(n);return v.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,v.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class RI{constructor(t){this.ti=t,this.docs=(function(){return new nt(N.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.ti(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return v.resolve(n?n.document.mutableCopy():ut.newInvalidDocument(e))}getEntries(t,e){let n=Ft();return e.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ut.newInvalidDocument(s))})),v.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=Ft();const a=e.path,u=new N(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||ga(Kh(f),n)<=0||(s.has(f.key)||os(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(t,e,n,s){M(9500)}ni(t,e){return v.forEach(this.docs,(n=>e(n)))}newChangeBuffer(t){return new SI(this)}getSize(t){return v.resolve(this.size)}}class SI extends mf{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?e.push(this.Mr.addEntry(t,s)):this.Mr.removeEntry(n)})),v.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}/**
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
 */class PI{constructor(t){this.persistence=t,this.ri=new oe((e=>an(e)),ss),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.ii=0,this.si=new Oa,this.targetCount=0,this.oi=dn._r()}forEachTarget(t,e){return this.ri.forEach(((n,s)=>e(s))),v.resolve()}getLastRemoteSnapshotVersion(t){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return v.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ii&&(this.ii=e),v.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new dn(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,v.resolve()}updateTargetData(t,e){return this.lr(e),v.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,v.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.ri.forEach(((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.ri.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)})),v.waitFor(i).next((()=>s))}getTargetCount(t){return v.resolve(this.targetCount)}getTargetData(t,e){const n=this.ri.get(e)||null;return v.resolve(n)}addMatchingKeys(t,e,n){return this.si.$r(e,n),v.resolve()}removeMatchingKeys(t,e,n){this.si.Qr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((a=>{i.push(s.markPotentiallyOrphaned(t,a))})),v.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),v.resolve()}getMatchingKeysForTargetId(t,e){const n=this.si.jr(e);return v.resolve(n)}containsKey(t,e){return v.resolve(this.si.containsKey(e))}}/**
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
 */class Ma{constructor(t,e){this._i={},this.overlays={},this.ai=new xt(0),this.ui=!1,this.ui=!0,this.ci=new AI,this.referenceDelegate=t(this),this.li=new PI(this),this.indexManager=new fI,this.remoteDocumentCache=(function(s){return new RI(s)})((n=>this.referenceDelegate.hi(n))),this.serializer=new ef(e),this.Pi=new wI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new vI,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this._i[t.toKey()];return n||(n=new bI(e,this.referenceDelegate),this._i[t.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,n){V("MemoryPersistence","Starting transaction:",t);const s=new VI(this.ai.next());return this.referenceDelegate.Ti(),n(s).next((i=>this.referenceDelegate.Ei(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(t,e){return v.or(Object.values(this._i).map((n=>()=>n.containsKey(t,e))))}}class VI extends Wh{constructor(t){super(),this.currentSequenceNumber=t}}class Oi{constructor(t){this.persistence=t,this.Ri=new Oa,this.Ai=null}static Vi(t){return new Oi(t)}get di(){if(this.Ai)return this.Ai;throw M(60996)}addReference(t,e,n){return this.Ri.addReference(n,e),this.di.delete(n.toString()),v.resolve()}removeReference(t,e,n){return this.Ri.removeReference(n,e),this.di.add(n.toString()),v.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),v.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach((s=>this.di.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>n.removeTargetData(t,e)))}Ti(){this.Ai=new Set}Ei(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.di,(n=>{const s=N.fromPath(n);return this.mi(t,s).next((i=>{i||e.removeEntry(s,B.min())}))})).next((()=>(this.Ai=null,e.apply(t))))}updateLimboDocument(t,e){return this.mi(t,e).next((n=>{n?this.di.delete(e.toString()):this.di.add(e.toString())}))}hi(t){return 0}mi(t,e){return v.or([()=>v.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class li{constructor(t,e){this.persistence=t,this.fi=new oe((n=>bt(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=ff(this,e)}static Vi(t,e){return new li(t,e)}Ti(){}Ei(t){return v.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next((n=>e.next((s=>n+s))))}pr(t){let e=0;return this.mr(t,(n=>{e++})).next((()=>e))}mr(t,e){return v.forEach(this.fi,((n,s)=>this.wr(t,n,s).next((i=>i?v.resolve():e(s)))))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(t,(a=>this.wr(t,a,e).next((u=>{u||(n++,i.removeEntry(a,B.min()))})))).next((()=>i.apply(t))).next((()=>n))}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),v.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.fi.set(n,t.currentSequenceNumber),v.resolve()}removeReference(t,e,n){return this.fi.set(n,t.currentSequenceNumber),v.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),v.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=qs(t.data.value)),e}wr(t,e,n){return v.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.fi.get(e);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class CI{constructor(t){this.serializer=t}k(t,e,n,s){const i=new wi("createOrUpgrade",e);n<1&&s>=1&&((function(l){l.createObjectStore(rs)})(t),(function(l){l.createObjectStore(zr,{keyPath:j_}),l.createObjectStore(jt,{keyPath:qc,autoIncrement:!0}).createIndex(Qe,jc,{unique:!0}),l.createObjectStore(Ln)})(t),Dl(t),(function(l){l.createObjectStore($e)})(t));let a=v.resolve();return n<3&&s>=3&&(n!==0&&((function(l){l.deleteObjectStore(Un),l.deleteObjectStore(Bn),l.deleteObjectStore(Ye)})(t),Dl(t)),a=a.next((()=>(function(l){const h=l.store(Ye),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return h.put(ti,f)})(i)))),n<4&&s>=4&&(n!==0&&(a=a.next((()=>(function(l,h){return h.store(jt).J().next((p=>{l.deleteObjectStore(jt),l.createObjectStore(jt,{keyPath:qc,autoIncrement:!0}).createIndex(Qe,jc,{unique:!0});const I=h.store(jt),P=p.map((D=>I.put(D)));return v.waitFor(P)}))})(t,i)))),a=a.next((()=>{(function(l){l.createObjectStore(qn,{keyPath:Y_})})(t)}))),n<5&&s>=5&&(a=a.next((()=>this.gi(i)))),n<6&&s>=6&&(a=a.next((()=>((function(l){l.createObjectStore(Gr)})(t),this.pi(i))))),n<7&&s>=7&&(a=a.next((()=>this.yi(i)))),n<8&&s>=8&&(a=a.next((()=>this.wi(t,i)))),n<9&&s>=9&&(a=a.next((()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(t)}))),n<10&&s>=10&&(a=a.next((()=>this.Si(i)))),n<11&&s>=11&&(a=a.next((()=>{(function(l){l.createObjectStore(Ai,{keyPath:X_})})(t),(function(l){l.createObjectStore(bi,{keyPath:Z_})})(t)}))),n<12&&s>=12&&(a=a.next((()=>{(function(l){const h=l.createObjectStore(Ri,{keyPath:oy});h.createIndex(Bo,ay,{unique:!1}),h.createIndex(nd,uy,{unique:!1})})(t)}))),n<13&&s>=13&&(a=a.next((()=>(function(l){const h=l.createObjectStore(Zs,{keyPath:z_});h.createIndex(Bs,G_),h.createIndex(Xh,K_)})(t))).next((()=>this.bi(t,i))).next((()=>t.deleteObjectStore($e)))),n<14&&s>=14&&(a=a.next((()=>this.Di(t,i)))),n<15&&s>=15&&(a=a.next((()=>(function(l){l.createObjectStore(Ia,{keyPath:ty,autoIncrement:!0}).createIndex(Lo,ey,{unique:!1}),l.createObjectStore(kr,{keyPath:ny}).createIndex(td,ry,{unique:!1}),l.createObjectStore(Or,{keyPath:sy}).createIndex(ed,iy,{unique:!1})})(t)))),n<16&&s>=16&&(a=a.next((()=>{e.objectStore(kr).clear()})).next((()=>{e.objectStore(Or).clear()}))),n<17&&s>=17&&(a=a.next((()=>{(function(l){l.createObjectStore(Ea,{keyPath:cy})})(t)}))),n<18&&s>=18&&ch()&&(a=a.next((()=>{e.objectStore(kr).clear()})).next((()=>{e.objectStore(Or).clear()}))),a}pi(t){let e=0;return t.store($e).ee(((n,s)=>{e+=ci(s)})).next((()=>{const n={byteSize:e};return t.store(Gr).put(Fo,n)}))}gi(t){const e=t.store(zr),n=t.store(jt);return e.J().next((s=>v.forEach(s,(i=>{const a=IDBKeyRange.bound([i.userId,Je],[i.userId,i.lastAcknowledgedBatchId]);return n.J(Qe,a).next((u=>v.forEach(u,(l=>{L(l.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:l.batchId});const h=Ge(this.serializer,l);return uf(t,i.userId,h).next((()=>{}))}))))}))))}yi(t){const e=t.store(Un),n=t.store($e);return t.store(Ye).get(ti).next((s=>{const i=[];return n.ee(((a,u)=>{const l=new Y(a),h=(function(p){return[0,bt(p)]})(l);i.push(e.get(h).next((f=>f?v.resolve():(p=>e.put({targetId:0,path:bt(p),sequenceNumber:s.highestListenSequenceNumber}))(l))))})).next((()=>v.waitFor(i)))}))}wi(t,e){t.createObjectStore(Kr,{keyPath:J_});const n=e.store(Kr),s=new ka,i=a=>{if(s.add(a)){const u=a.lastSegment(),l=a.popLast();return n.put({collectionId:u,parent:bt(l)})}};return e.store($e).ee({Y:!0},((a,u)=>{const l=new Y(a);return i(l.popLast())})).next((()=>e.store(Ln).ee({Y:!0},(([a,u,l],h)=>{const f=Wt(u);return i(f.popLast())}))))}Si(t){const e=t.store(Bn);return e.ee(((n,s)=>{const i=Cr(s),a=nf(this.serializer,i);return e.put(a)}))}bi(t,e){const n=e.store($e),s=[];return n.ee(((i,a)=>{const u=e.store(Zs),l=(function(p){return p.document?new N(Y.fromString(p.document.name).popFirst(5)):p.noDocument?N.fromSegments(p.noDocument.path):p.unknownDocument?N.fromSegments(p.unknownDocument.path):M(36783)})(a).path.toArray(),h={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(h))})).next((()=>v.waitFor(s)))}Di(t,e){const n=e.store(jt),s=pf(this.serializer),i=new Ma(Oi.Vi,this.serializer.yt);return n.J().next((a=>{const u=new Map;return a.forEach((l=>{let h=u.get(l.userId)??z();Ge(this.serializer,l).keys().forEach((f=>h=h.add(f))),u.set(l.userId,h)})),v.forEach(u,((l,h)=>{const f=new wt(h),p=Ni.wt(this.serializer,f),I=i.getIndexManager(f),P=ki.wt(f,this.serializer,I,i.referenceDelegate);return new gf(s,P,p,I).recalculateAndSaveOverlaysForDocumentKeys(new Uo(e,xt.ce),l).next()}))}))}}function Dl(r){r.createObjectStore(Un,{keyPath:W_}).createIndex(ya,Q_,{unique:!0}),r.createObjectStore(Bn,{keyPath:"targetId"}).createIndex(Zh,H_,{unique:!0}),r.createObjectStore(Ye)}const _e="IndexedDbPersistence",wo=18e5,vo=5e3,Ao="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",DI="main";class Fa{constructor(t,e,n,s,i,a,u,l,h,f,p=18){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Ci=i,this.window=a,this.document=u,this.Fi=h,this.Mi=f,this.xi=p,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=I=>Promise.resolve(),!Fa.v())throw new C(S.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new yI(this,s),this.qi=e+DI,this.serializer=new ef(l),this.Ki=new we(this.qi,this.xi,new CI(this.serializer)),this.ci=new aI,this.li=new pI(this.referenceDelegate,this.serializer),this.remoteDocumentCache=pf(this.serializer),this.Pi=new oI,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&lt(_e,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new C(S.FAILED_PRECONDITION,Ao);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.li.getHighestSequenceNumber(t)))})).then((t=>{this.ai=new xt(t,this.Fi)})).then((()=>{this.ui=!0})).catch((t=>(this.Ki&&this.Ki.close(),Promise.reject(t))))}zi(t){return this.ki=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Ki.K((async e=>{e.newVersion===null&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>ks(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(t).next((e=>{e||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Ji(t))).next((e=>this.isPrimary&&!e?this.Hi(t).next((()=>!1)):!!e&&this.Zi(t).next((()=>!0)))))).catch((t=>{if(De(t))return V(_e,"Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return V(_e,"Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Ci.enqueueRetryable((()=>this.ki(t))),this.isPrimary=t}))}ji(t){return br(t).get(En).next((e=>v.resolve(this.Xi(e))))}Yi(t){return ks(t).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,wo)){this.Li=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(e=>{const n=gt(e,qn);return n.J().next((s=>{const i=this.ns(s,wo),a=s.filter((u=>i.indexOf(u)===-1));return v.forEach(a,(u=>n.delete(u.clientId))).next((()=>a))}))})).catch((()=>[]));if(this.Ui)for(const e of t)this.Ui.removeItem(this.rs(e.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(t){return!!t&&t.ownerId===this.clientId}Ji(t){return this.Mi?v.resolve(!0):br(t).get(En).next((e=>{if(e!==null&&this.ts(e.leaseTimestampMs,vo)&&!this.ss(e.ownerId)){if(this.Xi(e)&&this.networkEnabled)return!0;if(!this.Xi(e)){if(!e.allowTabSynchronization)throw new C(S.FAILED_PRECONDITION,Ao);return!1}}return!(!this.networkEnabled||!this.inForeground)||ks(t).J().next((n=>this.ns(n,vo).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1}))===void 0))})).next((e=>(this.isPrimary!==e&&V(_e,`Client ${e?"is":"is not"} eligible for a primary lease.`),e)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[rs,qn],(t=>{const e=new Uo(t,xt.ce);return this.Hi(e).next((()=>this.Yi(e)))})),this.Ki.close(),this.ls()}ns(t,e){return t.filter((n=>this.ts(n.updateTimeMs,e)&&!this.ss(n.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(t=>ks(t).J().next((e=>this.ns(e,wo).map((n=>n.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(t,e){return ki.wt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new mI(t,this.serializer.yt.databaseId)}getDocumentOverlayCache(t){return Ni.wt(this.serializer,t)}getBundleCache(){return this.Pi}runTransaction(t,e,n){V(_e,"Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=(function(l){return l===18?dy:l===17?od:l===16?hy:l===15?Ta:l===14?id:l===13?sd:l===12?ly:l===11?rd:void M(60245)})(this.xi);let a;return this.Ki.runTransaction(t,s,i,(u=>(a=new Uo(u,this.ai?this.ai.next():xt.ce),e==="readwrite-primary"?this.ji(a).next((l=>!!l||this.Ji(a))).next((l=>{if(!l)throw lt(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new C(S.FAILED_PRECONDITION,Hh);return n(a)})).next((l=>this.Zi(a).next((()=>l)))):this.Ps(a).next((()=>n(a)))))).then((u=>(a.raiseOnCommittedEvent(),u)))}Ps(t){return br(t).get(En).next((e=>{if(e!==null&&this.ts(e.leaseTimestampMs,vo)&&!this.ss(e.ownerId)&&!this.Xi(e)&&!(this.Mi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new C(S.FAILED_PRECONDITION,Ao)}))}Zi(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return br(t).put(En,e)}static v(){return we.v()}Hi(t){const e=br(t);return e.get(En).next((n=>this.Xi(n)?(V(_e,"Releasing primary lease."),e.delete(En)):v.resolve()))}ts(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(lt(`Detected an update time that is in the future: ${t} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var t;typeof((t=this.window)==null?void 0:t.addEventListener)=="function"&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;uh()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(t){var e;try{const n=((e=this.Ui)==null?void 0:e.getItem(this.rs(t)))!==null;return V(_e,`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return lt(_e,"Failed to get zombied client id.",n),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(t){lt("Failed to set zombie client id.",t)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function br(r){return gt(r,rs)}function ks(r){return gt(r,qn)}function _f(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
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
 */class La{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Ts=n,this.Es=s}static Is(t,e){let n=z(),s=z();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new La(t,e.fromCache,n,s)}}/**
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
 */class xI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class yf{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return uh()?8:Qh(kn())>0?6:4})()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.gs(t,e).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ps(t,e,s,n).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new xI;return this.ys(t,e,a).next((u=>{if(i.result=u,this.As)return this.ws(t,e,a,u.size)}))})).next((()=>i.result))}ws(t,e,n,s){return n.documentReadCount<this.Vs?(Rn()<=W.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Sn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),v.resolve()):(Rn()<=W.DEBUG&&V("QueryEngine","Query:",Sn(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(Rn()<=W.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Sn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Bt(e))):v.resolve())}gs(t,e){if(el(e))return v.resolve(null);let n=Bt(e);return this.indexManager.getIndexType(t,n).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=si(e,null,"F"),n=Bt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next((i=>{const a=z(...i);return this.fs.getDocuments(t,a).next((u=>this.indexManager.getMinOffset(t,n).next((l=>{const h=this.Ss(e,u);return this.bs(e,h,a,l.readTime)?this.gs(t,si(e,null,"F")):this.Ds(t,h,e,l)}))))})))))}ps(t,e,n,s){return el(e)||s.isEqual(B.min())?v.resolve(null):this.fs.getDocuments(t,n).next((i=>{const a=this.Ss(e,i);return this.bs(e,a,n,s)?v.resolve(null):(Rn()<=W.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Sn(e)),this.Ds(t,a,e,Gh(s,Fn)).next((u=>u)))}))}Ss(t,e){let n=new tt(Pd(t));return e.forEach(((s,i)=>{os(t,i)&&(n=n.add(i))})),n}bs(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(t,e,n){return Rn()<=W.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Sn(e)),this.fs.getDocumentsMatchingQuery(t,e,Ut.min(),n)}Ds(t,e,n,s){return this.fs.getDocumentsMatchingQuery(t,n,s).next((i=>(e.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */const Ba="LocalStore",NI=3e8;class kI{constructor(t,e,n,s){this.persistence=t,this.Cs=e,this.serializer=s,this.vs=new nt(U),this.Fs=new oe((i=>an(i)),ss),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(n)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new gf(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.vs)))}}function If(r,t,e,n){return new kI(r,t,e,n)}async function Ef(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,e.Os(t),e.mutationQueue.getAllMutationBatches(n)))).next((i=>{const a=[],u=[];let l=z();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){u.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return e.localDocuments.getDocuments(n,l).next((h=>({Ns:h,removedBatchIds:a,addedBatchIds:u})))}))}))}function OI(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=t.batch.keys(),i=e.xs.newChangeBuffer({trackRemovals:!0});return(function(u,l,h,f){const p=h.batch,I=p.keys();let P=v.resolve();return I.forEach((D=>{P=P.next((()=>f.getEntry(l,D))).next((k=>{const O=h.docVersions.get(D);L(O!==null,48541),k.version.compareTo(O)<0&&(p.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),f.addEntry(k)))}))})),P.next((()=>u.mutationQueue.removeMutationBatch(l,p)))})(e,n,t,i).next((()=>i.apply(n))).next((()=>e.mutationQueue.performConsistencyCheck(n))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(u){let l=z();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(l=l.add(u.batch.mutations[h].key));return l})(t)))).next((()=>e.localDocuments.getDocuments(n,s)))}))}function Tf(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.li.getLastRemoteSnapshotVersion(e)))}function MI(r,t){const e=F(r),n=t.snapshotVersion;let s=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=e.xs.newChangeBuffer({trackRemovals:!0});s=e.vs;const u=[];t.targetChanges.forEach(((f,p)=>{const I=s.get(p);if(!I)return;u.push(e.li.removeMatchingKeys(i,f.removedDocuments,p).next((()=>e.li.addMatchingKeys(i,f.addedDocuments,p))));let P=I.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(p)!==null?P=P.withResumeToken(ht.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(f.resumeToken,n)),s=s.insert(p,P),(function(k,O,K){return k.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=NI?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0})(I,P,f)&&u.push(e.li.updateTargetData(i,P))}));let l=Ft(),h=z();if(t.documentUpdates.forEach((f=>{t.resolvedLimboDocuments.has(f)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))})),u.push(FI(i,a,t.documentUpdates).next((f=>{l=f.Bs,h=f.Ls}))),!n.isEqual(B.min())){const f=e.li.getLastRemoteSnapshotVersion(i).next((p=>e.li.setTargetsMetadata(i,i.currentSequenceNumber,n)));u.push(f)}return v.waitFor(u).next((()=>a.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,l,h))).next((()=>l))})).then((i=>(e.vs=s,i)))}function FI(r,t,e){let n=z(),s=z();return e.forEach((i=>n=n.add(i))),t.getEntries(r,n).next((i=>{let a=Ft();return e.forEach(((u,l)=>{const h=i.get(u);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),l.isNoDocument()&&l.version.isEqual(B.min())?(t.removeEntry(u,l.readTime),a=a.insert(u,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(l),a=a.insert(u,l)):V(Ba,"Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",l.version)})),{Bs:a,Ls:s}}))}function LI(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",(n=>(t===void 0&&(t=Je),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t))))}function hi(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return e.li.getTargetData(n,t).next((i=>i?(s=i,v.resolve(s)):e.li.allocateTargetId(n).next((a=>(s=new te(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.li.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=e.vs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.vs=e.vs.insert(n.targetId,n),e.Fs.set(t,n.targetId)),n}))}async function Wn(r,t,e){const n=F(r),s=n.vs.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,(a=>n.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!De(a))throw a;V(Ba,`Failed to update sequence numbers for target ${t}: ${a}`)}n.vs=n.vs.remove(t),n.Fs.delete(s.target)}function ta(r,t,e){const n=F(r);let s=B.min(),i=z();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(l,h,f){const p=F(l),I=p.Fs.get(f);return I!==void 0?v.resolve(p.vs.get(I)):p.li.getTargetData(h,f)})(n,a,Bt(t)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(a,u.targetId).next((l=>{i=l}))})).next((()=>n.Cs.getDocumentsMatchingQuery(a,t,e?s:B.min(),e?i:z()))).next((u=>(Af(n,Sd(t),u),{documents:u,ks:i})))))}function wf(r,t){const e=F(r),n=F(e.li),s=e.vs.get(t);return s?Promise.resolve(s.target):e.persistence.runTransaction("Get target data","readonly",(i=>n.At(i,t).next((a=>a?a.target:null))))}function vf(r,t){const e=F(r),n=e.Ms.get(t)||B.min();return e.persistence.runTransaction("Get new document changes","readonly",(s=>e.xs.getAllFromCollectionGroup(s,t,Gh(n,Fn),Number.MAX_SAFE_INTEGER))).then((s=>(Af(e,t,s),s)))}function Af(r,t,e){let n=r.Ms.get(t)||B.min();e.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Ms.set(t,n)}/**
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
 */const bf="firestore_clients";function xl(r,t){return`${bf}_${r}_${t}`}const Rf="firestore_mutations";function Nl(r,t,e){let n=`${Rf}_${r}_${e}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}const Sf="firestore_targets";function bo(r,t){return`${Sf}_${r}_${t}`}/**
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
 */const Ht="SharedClientState";class di{constructor(t,e,n,s){this.user=t,this.batchId=e,this.state=n,this.error=s}static $s(t,e,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new C(s.error.code,s.error.message))),a?new di(t,e,s.state,i):(lt(Ht,`Failed to parse mutation state for ID '${e}': ${n}`),null)}Ws(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Ur{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static $s(t,e){const n=JSON.parse(e);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new C(n.error.code,n.error.message))),i?new Ur(t,n.state,s):(lt(Ht,`Failed to parse target state for ID '${t}': ${e}`),null)}Ws(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class fi{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static $s(t,e){const n=JSON.parse(e);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=Ra();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=Jh(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new fi(t,i):(lt(Ht,`Failed to parse client data for instance '${t}': ${e}`),null)}}class Ua{constructor(t,e){this.clientId=t,this.onlineState=e}static $s(t){const e=JSON.parse(t);return typeof e=="object"&&["Unknown","Online","Offline"].indexOf(e.onlineState)!==-1&&typeof e.clientId=="string"?new Ua(e.clientId,e.onlineState):(lt(Ht,`Failed to parse online state: ${t}`),null)}}class ea{constructor(){this.activeTargetIds=Ra()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Ro{constructor(t,e,n,s,i){this.window=t,this.Ci=e,this.persistenceKey=n,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new nt(U),this.started=!1,this.Zs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=xl(this.persistenceKey,this.zs),this.Ys=(function(l){return`firestore_sequence_number_${l}`})(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new ea),this.eo=new RegExp(`^${bf}_${a}_([^_]*)$`),this.no=new RegExp(`^${Rf}_${a}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${Sf}_${a}_(\\d+)$`),this.io=(function(l){return`firestore_online_state_${l}`})(this.persistenceKey),this.so=(function(l){return`firestore_bundle_loaded_v2_${l}`})(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.hs();for(const n of t){if(n===this.zs)continue;const s=this.getItem(xl(this.persistenceKey,n));if(s){const i=fi.$s(n,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const e=this.storage.getItem(this.io);if(e){const n=this._o(e);n&&this.ao(n)}for(const n of this.Zs)this.Js(n);this.Zs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(t){this.setItem(this.Ys,JSON.stringify(t))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(t){let e=!1;return this.Hs.forEach(((n,s)=>{s.activeTargetIds.has(t)&&(e=!0)})),e}addPendingMutation(t){this.co(t,"pending")}updateMutationState(t,e,n){this.co(t,e,n),this.lo(t)}addLocalQueryTarget(t,e=!0){let n="not-current";if(this.isActiveQueryTarget(t)){const s=this.storage.getItem(bo(this.persistenceKey,t));if(s){const i=Ur.$s(t,s);i&&(n=i.state)}}return e&&this.ho.Qs(t),this.oo(),n}removeLocalQueryTarget(t){this.ho.Gs(t),this.oo()}isLocalQueryTarget(t){return this.ho.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(bo(this.persistenceKey,t))}updateQueryState(t,e,n){this.Po(t,e,n)}handleUserChange(t,e,n){e.forEach((s=>{this.lo(s)})),this.currentUser=t,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(t){this.To(t)}notifyBundleLoaded(t){this.Eo(t)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return V(Ht,"READ",t,e),e}setItem(t,e){V(Ht,"SET",t,e),this.storage.setItem(t,e)}removeItem(t){V(Ht,"REMOVE",t),this.storage.removeItem(t)}Js(t){const e=t;if(e.storageArea===this.storage){if(V(Ht,"EVENT",e.key,e.newValue),e.key===this.Xs)return void lt("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable((async()=>{if(this.started){if(e.key!==null){if(this.eo.test(e.key)){if(e.newValue==null){const n=this.Io(e.key);return this.Ro(n,null)}{const n=this.Ao(e.key,e.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.no.test(e.key)){if(e.newValue!==null){const n=this.Vo(e.key,e.newValue);if(n)return this.mo(n)}}else if(this.ro.test(e.key)){if(e.newValue!==null){const n=this.fo(e.key,e.newValue);if(n)return this.po(n)}}else if(e.key===this.io){if(e.newValue!==null){const n=this._o(e.newValue);if(n)return this.ao(n)}}else if(e.key===this.Ys){const n=(function(i){let a=xt.ce;if(i!=null)try{const u=JSON.parse(i);L(typeof u=="number",30636,{yo:i}),a=u}catch(u){lt(Ht,"Failed to read sequence number from WebStorage",u)}return a})(e.newValue);n!==xt.ce&&this.sequenceNumberHandler(n)}else if(e.key===this.so){const n=this.wo(e.newValue);await Promise.all(n.map((s=>this.syncEngine.So(s))))}}}else this.Zs.push(e)}))}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(t,e,n){const s=new di(this.currentUser,t,e,n),i=Nl(this.persistenceKey,this.currentUser,t);this.setItem(i,s.Ws())}lo(t){const e=Nl(this.persistenceKey,this.currentUser,t);this.removeItem(e)}To(t){const e={clientId:this.zs,onlineState:t};this.storage.setItem(this.io,JSON.stringify(e))}Po(t,e,n){const s=bo(this.persistenceKey,t),i=new Ur(t,e,n);this.setItem(s,i.Ws())}Eo(t){const e=JSON.stringify(Array.from(t));this.setItem(this.so,e)}Io(t){const e=this.eo.exec(t);return e?e[1]:null}Ao(t,e){const n=this.Io(t);return fi.$s(n,e)}Vo(t,e){const n=this.no.exec(t),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return di.$s(new wt(i),s,e)}fo(t,e){const n=this.ro.exec(t),s=Number(n[1]);return Ur.$s(s,e)}_o(t){return Ua.$s(t)}wo(t){return JSON.parse(t)}async mo(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.bo(t.batchId,t.state,t.error);V(Ht,`Ignoring mutation for non-active user ${t.user.uid}`)}po(t){return this.syncEngine.Do(t.targetId,t.state,t.error)}Ro(t,e){const n=e?this.Hs.insert(t,e):this.Hs.remove(t),s=this.uo(this.Hs),i=this.uo(n),a=[],u=[];return i.forEach((l=>{s.has(l)||a.push(l)})),s.forEach((l=>{i.has(l)||u.push(l)})),this.syncEngine.Co(a,u).then((()=>{this.Hs=n}))}ao(t){this.Hs.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}uo(t){let e=Ra();return t.forEach(((n,s)=>{e=e.unionWith(s.activeTargetIds)})),e}}class Pf{constructor(){this.vo=new ea,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,n){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new ea,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class BI{Mo(t){}shutdown(){}}/**
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
 */const kl="ConnectivityMonitor";class Ol{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){V(kl,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){V(kl,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Os=null;function na(){return Os===null?Os=(function(){return 268435456+Math.round(2147483648*Math.random())})():Os++,"0x"+Os.toString(16)}/**
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
 */const So="RestConnection",UI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class qI{get qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Uo=`projects/${n}/databases/${s}`,this.$o=this.databaseId.database===ei?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(t,e,n,s,i){const a=na(),u=this.Qo(t,e.toUriEncodedString());V(So,`Sending RPC '${t}' ${a}:`,u,n);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(l,s,i);const{host:h}=new URL(u),f=hh(h);return this.zo(t,u,l,n,f).then((p=>(V(So,`Received RPC '${t}' ${a}: `,p),p)),(p=>{throw On(So,`RPC '${t}' ${a} failed with error: `,p,"url: ",u,"request:",n),p}))}jo(t,e,n,s,i,a){return this.Wo(t,e,n,s,i)}Go(t,e,n){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Xn})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),n&&n.headers.forEach(((s,i)=>t[i]=s))}Qo(t,e){const n=UI[t];let s=`${this.Ko}/v1/${e}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class jI{constructor(t){this.Jo=t.Jo,this.Ho=t.Ho}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Ho()}send(t){this.Jo(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}/**
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
 */const Tt="WebChannelConnection",Rr=(r,t,e)=>{r.listen(t,(n=>{try{e(n)}catch(s){setTimeout((()=>{throw s}),0)}}))};class xn extends qI{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!xn.c_){const t=Bh();Rr(t,Lh.STAT_EVENT,(e=>{e.stat===ko.PROXY?V(Tt,"STAT_EVENT: detected buffering proxy"):e.stat===ko.NOPROXY&&V(Tt,"STAT_EVENT: detected no buffering proxy")})),xn.c_=!0}}zo(t,e,n,s,i){const a=na();return new Promise(((u,l)=>{const h=new Mh;h.setWithCredentials(!0),h.listenOnce(Fh.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Ms.NO_ERROR:const p=h.getResponseJson();V(Tt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(p)),u(p);break;case Ms.TIMEOUT:V(Tt,`RPC '${t}' ${a} timed out`),l(new C(S.DEADLINE_EXCEEDED,"Request time out"));break;case Ms.HTTP_ERROR:const I=h.getStatus();if(V(Tt,`RPC '${t}' ${a} failed with status:`,I,"response text:",h.getResponseText()),I>0){let P=h.getResponseJson();Array.isArray(P)&&(P=P[0]);const D=P==null?void 0:P.error;if(D&&D.status&&D.message){const k=(function(K){const j=K.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(j)>=0?j:S.UNKNOWN})(D.status);l(new C(k,D.message))}else l(new C(S.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new C(S.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:t,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{V(Tt,`RPC '${t}' ${a} completed.`)}}));const f=JSON.stringify(s);V(Tt,`RPC '${t}' ${a} sending request:`,s),h.send(e,"POST",f,n,15)}))}T_(t,e,n){const s=na(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(u.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Go(u.initMessageHeaders,e,n),u.encodeInitMessageHeaders=!0;const h=i.join("");V(Tt,`Creating RPC '${t}' stream ${s}: ${h}`,u);const f=a.createWebChannel(h,u);this.E_(f);let p=!1,I=!1;const P=new jI({Jo:D=>{I?V(Tt,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(p||(V(Tt,`Opening RPC '${t}' stream ${s} transport.`),f.open(),p=!0),V(Tt,`RPC '${t}' stream ${s} sending:`,D),f.send(D))},Ho:()=>f.close()});return Rr(f,Sr.EventType.OPEN,(()=>{I||(V(Tt,`RPC '${t}' stream ${s} transport opened.`),P.i_())})),Rr(f,Sr.EventType.CLOSE,(()=>{I||(I=!0,V(Tt,`RPC '${t}' stream ${s} transport closed`),P.o_(),this.I_(f))})),Rr(f,Sr.EventType.ERROR,(D=>{I||(I=!0,On(Tt,`RPC '${t}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),P.o_(new C(S.UNAVAILABLE,"The operation could not be completed")))})),Rr(f,Sr.EventType.MESSAGE,(D=>{var k;if(!I){const O=D.data[0];L(!!O,16349);const K=O,j=(K==null?void 0:K.error)||((k=K[0])==null?void 0:k.error);if(j){V(Tt,`RPC '${t}' stream ${s} received error:`,j);const q=j.status;let rt=(function(E){const g=dt[E];if(g!==void 0)return Ud(g)})(q),Q=j.message;q==="NOT_FOUND"&&Q.includes("database")&&Q.includes("does not exist")&&Q.includes(this.databaseId.database)&&On(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),rt===void 0&&(rt=S.INTERNAL,Q="Unknown error status: "+q+" with message "+j.message),I=!0,P.o_(new C(rt,Q)),f.close()}else V(Tt,`RPC '${t}' stream ${s} received:`,O),P.__(O)}})),xn.u_(),setTimeout((()=>{P.s_()}),0),P}terminate(){this.a_.forEach((t=>t.close())),this.a_=[]}E_(t){this.a_.push(t)}I_(t){this.a_=this.a_.filter((e=>e===t))}Go(t,e,n){super.Go(t,e,n),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Uh()}}/**
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
 */function $I(r){return new xn(r)}/**
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
 */function Vf(){return typeof window<"u"?window:null}function Ks(){return typeof document<"u"?document:null}/**
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
 */function Mi(r){return new Qy(r,!0)}/**
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
 */xn.c_=!1;class Cf{constructor(t,e,n=1e3,s=1.5,i=6e4){this.Ci=t,this.timerId=e,this.R_=n,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-n);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const Ml="PersistentStream";class Df{constructor(t,e,n,s,i,a,u,l){this.Ci=t,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Cf(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.K_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.K_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===S.RESOURCE_EXHAUSTED?(lt(e.toString()),lt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===e&&this.G_(n,s)}),(n=>{t((()=>{const s=new C(S.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(t,e){const n=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo((()=>{n((()=>this.listener.Zo()))})),this.stream.Yo((()=>{n((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return V(Ml,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget((()=>this.D_===t?e():(V(Ml,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class zI extends Df{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Xy(this.serializer,t),n=(function(i){if(!("targetChange"in i))return B.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?Vt(a.readTime):B.min()})(t);return this.listener.H_(e,n)}Z_(t){const e={};e.database=Qo(this.serializer),e.addTarget=(function(i,a){let u;const l=a.target;if(u=ni(l)?{documents:Wd(i,l)}:{query:Qd(i,l).ft},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=$d(i,a.resumeToken);const h=Ho(i,a.expectedCount);h!==null&&(u.expectedCount=h)}else if(a.snapshotVersion.compareTo(B.min())>0){u.readTime=Hn(i,a.snapshotVersion.toTimestamp());const h=Ho(i,a.expectedCount);h!==null&&(u.expectedCount=h)}return u})(this.serializer,t);const n=tI(this.serializer,t);n&&(e.labels=n),this.q_(e)}X_(t){const e={};e.database=Qo(this.serializer),e.removeTarget=t,this.q_(e)}}class GI extends Df{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return L(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,L(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){L(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Zy(t.writeResults,t.commitTime),n=Vt(t.commitTime);return this.listener.na(n,e)}ra(){const t={};t.database=Qo(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((n=>oi(this.serializer,n)))};this.q_(e)}}/**
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
 */class KI{}class HI extends KI{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new C(S.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Wo(t,Wo(e,n),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new C(S.UNKNOWN,i.toString())}))}jo(t,e,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection.jo(t,Wo(e,n),s,a,u,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new C(S.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function WI(r,t,e,n){return new HI(r,t,e,n)}class QI{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(lt(e),this.aa=!1):V("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const fn="RemoteStore";class JI{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((a=>{n.enqueueAndForget((async()=>{pn(this)&&(V(fn,"Restarting streams for network reachability change."),await(async function(l){const h=F(l);h.Ia.add(4),await ls(h),h.Va.set("Unknown"),h.Ia.delete(4),await Fi(h)})(this))}))})),this.Va=new QI(n,s)}}async function Fi(r){if(pn(r))for(const t of r.Ra)await t(!0)}async function ls(r){for(const t of r.Ra)await t(!1)}function Li(r,t){const e=F(r);e.Ea.has(t.targetId)||(e.Ea.set(t.targetId,t),$a(e)?ja(e):nr(e).O_()&&qa(e,t))}function Qn(r,t){const e=F(r),n=nr(e);e.Ea.delete(t),n.O_()&&xf(e,t),e.Ea.size===0&&(n.O_()?n.L_():pn(e)&&e.Va.set("Unknown"))}function qa(r,t){if(r.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(B.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}nr(r).Z_(t)}function xf(r,t){r.da.$e(t),nr(r).X_(t)}function ja(r){r.da=new Gy({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),At:t=>r.Ea.get(t)||null,ht:()=>r.datastore.serializer.databaseId}),nr(r).start(),r.Va.ua()}function $a(r){return pn(r)&&!nr(r).x_()&&r.Ea.size>0}function pn(r){return F(r).Ia.size===0}function Nf(r){r.da=void 0}async function YI(r){r.Va.set("Online")}async function XI(r){r.Ea.forEach(((t,e)=>{qa(r,t)}))}async function ZI(r,t){Nf(r),$a(r)?(r.Va.ha(t),ja(r)):r.Va.set("Unknown")}async function tE(r,t,e){if(r.Va.set("Online"),t instanceof jd&&t.state===2&&t.cause)try{await(async function(s,i){const a=i.cause;for(const u of i.targetIds)s.Ea.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ea.delete(u),s.da.removeTarget(u))})(r,t)}catch(n){V(fn,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await mi(r,n)}else if(t instanceof zs?r.da.Xe(t):t instanceof qd?r.da.st(t):r.da.tt(t),!e.isEqual(B.min()))try{const n=await Tf(r.localStore);e.compareTo(n)>=0&&await(function(i,a){const u=i.da.Tt(a);return u.targetChanges.forEach(((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ea.get(h);f&&i.Ea.set(h,f.withResumeToken(l.resumeToken,a))}})),u.targetMismatches.forEach(((l,h)=>{const f=i.Ea.get(l);if(!f)return;i.Ea.set(l,f.withResumeToken(ht.EMPTY_BYTE_STRING,f.snapshotVersion)),xf(i,l);const p=new te(f.target,l,h,f.sequenceNumber);qa(i,p)})),i.remoteSyncer.applyRemoteEvent(u)})(r,e)}catch(n){V(fn,"Failed to raise snapshot:",n),await mi(r,n)}}async function mi(r,t,e){if(!De(t))throw t;r.Ia.add(1),await ls(r),r.Va.set("Offline"),e||(e=()=>Tf(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{V(fn,"Retrying IndexedDB access"),await e(),r.Ia.delete(1),await Fi(r)}))}function kf(r,t){return t().catch((e=>mi(r,e,t)))}async function er(r){const t=F(r),e=Se(t);let n=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Je;for(;eE(t);)try{const s=await LI(t.localStore,n);if(s===null){t.Ta.length===0&&e.L_();break}n=s.batchId,nE(t,s)}catch(s){await mi(t,s)}Of(t)&&Mf(t)}function eE(r){return pn(r)&&r.Ta.length<10}function nE(r,t){r.Ta.push(t);const e=Se(r);e.O_()&&e.Y_&&e.ea(t.mutations)}function Of(r){return pn(r)&&!Se(r).x_()&&r.Ta.length>0}function Mf(r){Se(r).start()}async function rE(r){Se(r).ra()}async function sE(r){const t=Se(r);for(const e of r.Ta)t.ea(e.mutations)}async function iE(r,t,e){const n=r.Ta.shift(),s=Va.from(n,t,e);await kf(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await er(r)}async function oE(r,t){t&&Se(r).Y_&&await(async function(n,s){if((function(a){return jy(a)&&a!==S.ABORTED})(s.code)){const i=n.Ta.shift();Se(n).B_(),await kf(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await er(n)}})(r,t),Of(r)&&Mf(r)}async function Fl(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),V(fn,"RemoteStore received new credentials");const n=pn(e);e.Ia.add(3),await ls(e),n&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Fi(e)}async function ra(r,t){const e=F(r);t?(e.Ia.delete(2),await Fi(e)):t||(e.Ia.add(2),await ls(e),e.Va.set("Unknown"))}function nr(r){return r.ma||(r.ma=(function(e,n,s){const i=F(e);return i.sa(),new zI(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:YI.bind(null,r),Yo:XI.bind(null,r),t_:ZI.bind(null,r),H_:tE.bind(null,r)}),r.Ra.push((async t=>{t?(r.ma.B_(),$a(r)?ja(r):r.Va.set("Unknown")):(await r.ma.stop(),Nf(r))}))),r.ma}function Se(r){return r.fa||(r.fa=(function(e,n,s){const i=F(e);return i.sa(),new GI(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:rE.bind(null,r),t_:oE.bind(null,r),ta:sE.bind(null,r),na:iE.bind(null,r)}),r.Ra.push((async t=>{t?(r.fa.B_(),await er(r)):(await r.fa.stop(),r.Ta.length>0&&(V(fn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
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
 */class za{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Jt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new za(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new C(S.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ga(r,t){if(lt("AsyncQueue",`${t}: ${r}`),De(r))return new C(S.UNAVAILABLE,`${t}: ${r}`);throw r}/**
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
 */class Nn{static emptySet(t){return new Nn(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||N.comparator(e.key,n.key):(e,n)=>N.comparator(e.key,n.key),this.keyedMap=Pr(),this.sortedSet=new nt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Nn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new Nn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
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
 */class Ll{constructor(){this.ga=new nt(N.comparator)}track(t){const e=t.doc.key,n=this.ga.get(e);n?t.type!==0&&n.type===3?this.ga=this.ga.insert(e,t):t.type===3&&n.type!==1?this.ga=this.ga.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.ga=this.ga.remove(e):t.type===1&&n.type===2?this.ga=this.ga.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):M(63341,{Vt:t,pa:n}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,n)=>{t.push(n)})),t}}class Jn{constructor(t,e,n,s,i,a,u,l,h){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach((u=>{a.push({type:0,doc:u})})),new Jn(t,e,Nn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Vi(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class aE{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class uE{constructor(){this.queries=Bl(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,n){const s=F(e),i=s.queries;s.queries=Bl(),i.forEach(((a,u)=>{for(const l of u.Sa)l.onError(n)}))})(this,new C(S.ABORTED,"Firestore shutting down"))}}function Bl(){return new oe((r=>Rd(r)),Vi)}async function Ka(r,t){const e=F(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.ba()&&t.Da()&&(n=2):(i=new aE,n=t.Da()?0:1);try{switch(n){case 0:i.wa=await e.onListen(s,!0);break;case 1:i.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=Ga(a,`Initialization of query '${Sn(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&Wa(e)}async function Ha(r,t){const e=F(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.Sa.indexOf(t);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function cE(r,t){const e=F(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.Sa)u.Fa(s)&&(n=!0);a.wa=s}}n&&Wa(e)}function lE(r,t,e){const n=F(r),s=n.queries.get(t);if(s)for(const i of s.Sa)i.onError(e);n.queries.delete(t)}function Wa(r){r.Ca.forEach((t=>{t.next()}))}var sa,Ul;(Ul=sa||(sa={})).Ma="default",Ul.Cache="cache";class Qa{constructor(t,e,n){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new Jn(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const n=e!=="Offline";return(!this.options.qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=Jn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==sa.Cache}}/**
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
 */class Ff{constructor(t){this.key=t}}class Lf{constructor(t){this.key=t}}class hE{constructor(t,e){this.query=t,this.Za=e,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=z(),this.mutatedKeys=z(),this.eu=Pd(t),this.tu=new Nn(this.eu)}get nu(){return this.Za}ru(t,e){const n=e?e.iu:new Ll,s=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((f,p)=>{const I=s.get(f),P=os(this.query,p)?p:null,D=!!I&&this.mutatedKeys.has(I.key),k=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let O=!1;I&&P?I.data.isEqual(P.data)?D!==k&&(n.track({type:3,doc:P}),O=!0):this.su(I,P)||(n.track({type:2,doc:P}),O=!0,(l&&this.eu(P,l)>0||h&&this.eu(P,h)<0)&&(u=!0)):!I&&P?(n.track({type:0,doc:P}),O=!0):I&&!P&&(n.track({type:1,doc:I}),O=!0,(l||h)&&(u=!0)),O&&(P?(a=a.add(P),i=k?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:a,iu:n,bs:u,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort(((f,p)=>(function(P,D){const k=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:O})}};return k(P)-k(D)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(n),s=s??!1;const u=e&&!s?this._u():[],l=this.Ya.size===0&&this.current&&!s?1:0,h=l!==this.Xa;return this.Xa=l,a.length!==0||h?{snapshot:new Jn(this.query,t.tu,i,a,t.mutatedKeys,l===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ll,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(t){return!this.Za.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Za=this.Za.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Za=this.Za.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Ya;this.Ya=z(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))}));const e=[];return t.forEach((n=>{this.Ya.has(n)||e.push(new Lf(n))})),this.Ya.forEach((n=>{t.has(n)||e.push(new Ff(n))})),e}cu(t){this.Za=t.ks,this.Ya=z();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return Jn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const rr="SyncEngine";class dE{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class fE{constructor(t){this.key=t,this.hu=!1}}class mE{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new oe((u=>Rd(u)),Vi),this.Eu=new Map,this.Iu=new Set,this.Ru=new nt(N.comparator),this.Au=new Map,this.Vu=new Oa,this.du={},this.mu=new Map,this.fu=dn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function pE(r,t,e=!0){const n=Bi(r);let s;const i=n.Tu.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Bf(n,t,e,!0),s}async function gE(r,t){const e=Bi(r);await Bf(e,t,!0,!1)}async function Bf(r,t,e,n){const s=await hi(r.localStore,Bt(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await Ja(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&Li(r.remoteStore,s),u}async function Ja(r,t,e,n,s){r.pu=(p,I,P)=>(async function(k,O,K,j){let q=O.view.ru(K);q.bs&&(q=await ta(k.localStore,O.query,!1).then((({documents:E})=>O.view.ru(E,q))));const rt=j&&j.targetChanges.get(O.targetId),Q=j&&j.targetMismatches.get(O.targetId)!=null,J=O.view.applyChanges(q,k.isPrimaryClient,rt,Q);return ia(k,O.targetId,J.au),J.snapshot})(r,p,I,P);const i=await ta(r.localStore,t,!0),a=new hE(t,i.ks),u=a.ru(i.documents),l=cs.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),h=a.applyChanges(u,r.isPrimaryClient,l);ia(r,e,h.au);const f=new dE(t,e,a);return r.Tu.set(t,f),r.Eu.has(e)?r.Eu.get(e).push(t):r.Eu.set(e,[t]),h.snapshot}async function _E(r,t,e){const n=F(r),s=n.Tu.get(t),i=n.Eu.get(s.targetId);if(i.length>1)return n.Eu.set(s.targetId,i.filter((a=>!Vi(a,t)))),void n.Tu.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Wn(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),e&&Qn(n.remoteStore,s.targetId),Yn(n,s.targetId)})).catch(Ce)):(Yn(n,s.targetId),await Wn(n.localStore,s.targetId,!0))}async function yE(r,t){const e=F(r),n=e.Tu.get(t),s=e.Eu.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Qn(e.remoteStore,n.targetId))}async function IE(r,t,e){const n=tu(r);try{const s=await(function(a,u){const l=F(a),h=X.now(),f=u.reduce(((P,D)=>P.add(D.key)),z());let p,I;return l.persistence.runTransaction("Locally write mutations","readwrite",(P=>{let D=Ft(),k=z();return l.xs.getEntries(P,f).next((O=>{D=O,D.forEach(((K,j)=>{j.isValidDocument()||(k=k.add(K))}))})).next((()=>l.localDocuments.getOverlayedDocuments(P,D))).next((O=>{p=O;const K=[];for(const j of u){const q=Uy(j,p.get(j.key).overlayedDocument);q!=null&&K.push(new ae(j.key,q,gd(q.value.mapValue),pt.exists(!0)))}return l.mutationQueue.addMutationBatch(P,h,K,u)})).next((O=>{I=O;const K=O.applyToLocalDocumentSet(p,k);return l.documentOverlayCache.saveOverlays(P,O.batchId,K)}))})).then((()=>({batchId:I.batchId,changes:Cd(p)})))})(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),(function(a,u,l){let h=a.du[a.currentUser.toKey()];h||(h=new nt(U)),h=h.insert(u,l),a.du[a.currentUser.toKey()]=h})(n,s.batchId,e),await Ne(n,s.changes),await er(n.remoteStore)}catch(s){const i=Ga(s,"Failed to persist write");e.reject(i)}}async function Uf(r,t){const e=F(r);try{const n=await MI(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const a=e.Au.get(i);a&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?L(a.hu,14607):s.removedDocuments.size>0&&(L(a.hu,42227),a.hu=!1))})),await Ne(e,n,t)}catch(n){await Ce(n)}}function ql(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Tu.forEach(((i,a)=>{const u=a.view.va(t);u.snapshot&&s.push(u.snapshot)})),(function(a,u){const l=F(a);l.onlineState=u;let h=!1;l.queries.forEach(((f,p)=>{for(const I of p.Sa)I.va(u)&&(h=!0)})),h&&Wa(l)})(n.eventManager,t),s.length&&n.Pu.H_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function EE(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.Au.get(t),i=s&&s.key;if(i){let a=new nt(N.comparator);a=a.insert(i,ut.newNoDocument(i,B.min()));const u=z().add(i),l=new us(B.min(),new Map,new nt(U),a,u);await Uf(n,l),n.Ru=n.Ru.remove(i),n.Au.delete(t),Za(n)}else await Wn(n.localStore,t,!1).then((()=>Yn(n,t,e))).catch(Ce)}async function TE(r,t){const e=F(r),n=t.batch.batchId;try{const s=await OI(e.localStore,t);Xa(e,n,null),Ya(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await Ne(e,s)}catch(s){await Ce(s)}}async function wE(r,t,e){const n=F(r);try{const s=await(function(a,u){const l=F(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return l.mutationQueue.lookupMutationBatch(h,u).next((p=>(L(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(h,p)))).next((()=>l.mutationQueue.performConsistencyCheck(h))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,u))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>l.localDocuments.getDocuments(h,f)))}))})(n.localStore,t);Xa(n,t,e),Ya(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await Ne(n,s)}catch(s){await Ce(s)}}function Ya(r,t){(r.mu.get(t)||[]).forEach((e=>{e.resolve()})),r.mu.delete(t)}function Xa(r,t,e){const n=F(r);let s=n.du[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.du[n.currentUser.toKey()]=s}}function Yn(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Eu.get(t))r.Tu.delete(n),e&&r.Pu.yu(n,e);r.Eu.delete(t),r.isPrimaryClient&&r.Vu.Gr(t).forEach((n=>{r.Vu.containsKey(n)||qf(r,n)}))}function qf(r,t){r.Iu.delete(t.path.canonicalString());const e=r.Ru.get(t);e!==null&&(Qn(r.remoteStore,e),r.Ru=r.Ru.remove(t),r.Au.delete(e),Za(r))}function ia(r,t,e){for(const n of e)n instanceof Ff?(r.Vu.addReference(n.key,t),vE(r,n)):n instanceof Lf?(V(rr,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,t),r.Vu.containsKey(n.key)||qf(r,n.key)):M(19791,{wu:n})}function vE(r,t){const e=t.key,n=e.path.canonicalString();r.Ru.get(e)||r.Iu.has(n)||(V(rr,"New document in limbo: "+e),r.Iu.add(n),Za(r))}function Za(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const t=r.Iu.values().next().value;r.Iu.delete(t);const e=new N(Y.fromString(t)),n=r.fu.next();r.Au.set(n,new fE(e)),r.Ru=r.Ru.insert(e,n),Li(r.remoteStore,new te(Bt(is(e.path)),n,"TargetPurposeLimboResolution",xt.ce))}}async function Ne(r,t,e){const n=F(r),s=[],i=[],a=[];n.Tu.isEmpty()||(n.Tu.forEach(((u,l)=>{a.push(n.pu(l,t,e).then((h=>{var f;if((h||e)&&n.isPrimaryClient){const p=h?!h.fromCache:(f=e==null?void 0:e.targetChanges.get(l.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(h){s.push(h);const p=La.Is(l.targetId,h);i.push(p)}})))})),await Promise.all(a),n.Pu.H_(s),await(async function(l,h){const f=F(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>v.forEach(h,(I=>v.forEach(I.Ts,(P=>f.persistence.referenceDelegate.addReference(p,I.targetId,P))).next((()=>v.forEach(I.Es,(P=>f.persistence.referenceDelegate.removeReference(p,I.targetId,P)))))))))}catch(p){if(!De(p))throw p;V(Ba,"Failed to update sequence numbers: "+p)}for(const p of h){const I=p.targetId;if(!p.fromCache){const P=f.vs.get(I),D=P.snapshotVersion,k=P.withLastLimboFreeSnapshotVersion(D);f.vs=f.vs.insert(I,k)}}})(n.localStore,i))}async function AE(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){V(rr,"User change. New user:",t.toKey());const n=await Ef(e.localStore,t);e.currentUser=t,(function(i,a){i.mu.forEach((u=>{u.forEach((l=>{l.reject(new C(S.CANCELLED,a))}))})),i.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await Ne(e,n.Ns)}}function bE(r,t){const e=F(r),n=e.Au.get(t);if(n&&n.hu)return z().add(n.key);{let s=z();const i=e.Eu.get(t);if(!i)return s;for(const a of i){const u=e.Tu.get(a);s=s.unionWith(u.view.nu)}return s}}async function RE(r,t){const e=F(r),n=await ta(e.localStore,t.query,!0),s=t.view.cu(n);return e.isPrimaryClient&&ia(e,t.targetId,s.au),s}async function SE(r,t){const e=F(r);return vf(e.localStore,t).then((n=>Ne(e,n)))}async function PE(r,t,e,n){const s=F(r),i=await(function(u,l){const h=F(u),f=F(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",(p=>f.Xn(p,l).next((I=>I?h.localDocuments.getDocuments(p,I):v.resolve(null)))))})(s.localStore,t);i!==null?(e==="pending"?await er(s.remoteStore):e==="acknowledged"||e==="rejected"?(Xa(s,t,n||null),Ya(s,t),(function(u,l){F(F(u).mutationQueue).nr(l)})(s.localStore,t)):M(6720,"Unknown batchState",{Su:e}),await Ne(s,i)):V(rr,"Cannot apply mutation batch with id: "+t)}async function VE(r,t){const e=F(r);if(Bi(e),tu(e),t===!0&&e.gu!==!0){const n=e.sharedClientState.getAllActiveQueryTargets(),s=await jl(e,n.toArray());e.gu=!0,await ra(e.remoteStore,!0);for(const i of s)Li(e.remoteStore,i)}else if(t===!1&&e.gu!==!1){const n=[];let s=Promise.resolve();e.Eu.forEach(((i,a)=>{e.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then((()=>(Yn(e,a),Wn(e.localStore,a,!0)))),Qn(e.remoteStore,a)})),await s,await jl(e,n),(function(a){const u=F(a);u.Au.forEach(((l,h)=>{Qn(u.remoteStore,h)})),u.Vu.zr(),u.Au=new Map,u.Ru=new nt(N.comparator)})(e),e.gu=!1,await ra(e.remoteStore,!1)}}async function jl(r,t,e){const n=F(r),s=[],i=[];for(const a of t){let u;const l=n.Eu.get(a);if(l&&l.length!==0){u=await hi(n.localStore,Bt(l[0]));for(const h of l){const f=n.Tu.get(h),p=await RE(n,f);p.snapshot&&i.push(p.snapshot)}}else{const h=await wf(n.localStore,a);u=await hi(n.localStore,h),await Ja(n,jf(h),a,!1,u.resumeToken)}s.push(u)}return n.Pu.H_(i),s}function jf(r){return Ad(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function CE(r){return(function(e){return F(F(e).persistence).hs()})(F(r).localStore)}async function DE(r,t,e,n){const s=F(r);if(s.gu)return void V(rr,"Ignoring unexpected query state notification.");const i=s.Eu.get(t);if(i&&i.length>0)switch(e){case"current":case"not-current":{const a=await vf(s.localStore,Sd(i[0])),u=us.createSynthesizedRemoteEventForCurrentChange(t,e==="current",ht.EMPTY_BYTE_STRING);await Ne(s,a,u);break}case"rejected":await Wn(s.localStore,t,!0),Yn(s,t,n);break;default:M(64155,e)}}async function xE(r,t,e){const n=Bi(r);if(n.gu){for(const s of t){if(n.Eu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){V(rr,"Adding an already active target "+s);continue}const i=await wf(n.localStore,s),a=await hi(n.localStore,i);await Ja(n,jf(i),a.targetId,!1,a.resumeToken),Li(n.remoteStore,a)}for(const s of e)n.Eu.has(s)&&await Wn(n.localStore,s,!1).then((()=>{Qn(n.remoteStore,s),Yn(n,s)})).catch(Ce)}}function Bi(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=Uf.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=bE.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=EE.bind(null,t),t.Pu.H_=cE.bind(null,t.eventManager),t.Pu.yu=lE.bind(null,t.eventManager),t}function tu(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=TE.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=wE.bind(null,t),t}class Zr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Mi(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return If(this.persistence,new yf,t.initialUser,this.serializer)}Cu(t){return new Ma(Oi.Vi,this.serializer)}Du(t){return new Pf}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Zr.provider={build:()=>new Zr};class NE extends Zr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){L(this.persistence.referenceDelegate instanceof li,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new df(n,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new Ma((n=>li.Vi(n,e)),this.serializer)}}class $f extends Zr{constructor(t,e,n){super(),this.xu=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.xu.initialize(this,t),await tu(this.xu.syncEngine),await er(this.xu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(t){return If(this.persistence,new yf,t.initialUser,this.serializer)}Fu(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new df(n,t.asyncQueue,e)}Mu(t,e){const n=new U_(e,this.persistence);return new B_(t.asyncQueue,n)}Cu(t){const e=_f(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new Fa(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Vf(),Ks(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(t){return new Pf}}class kE extends $f{constructor(t,e){super(t,e,!1),this.xu=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.xu.syncEngine;this.sharedClientState instanceof Ro&&(this.sharedClientState.syncEngine={bo:PE.bind(null,e),Do:DE.bind(null,e),Co:xE.bind(null,e),hs:CE.bind(null,e),So:SE.bind(null,e)},await this.sharedClientState.start()),await this.persistence.zi((async n=>{await VE(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}Du(t){const e=Vf();if(!Ro.v(e))throw new C(S.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=_f(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new Ro(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class ts{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>ql(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=AE.bind(null,this.syncEngine),await ra(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new uE})()}createDatastore(t){const e=Mi(t.databaseInfo.databaseId),n=$I(t.databaseInfo);return WI(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return(function(n,s,i,a,u){return new JI(n,s,i,a,u)})(this.localStore,this.datastore,t.asyncQueue,(e=>ql(this.syncEngine,e,0)),(function(){return Ol.v()?new Ol:new BI})())}createSyncEngine(t,e){return(function(s,i,a,u,l,h,f){const p=new mE(s,i,a,u,l,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const i=F(s);V(fn,"RemoteStore shutting down."),i.Ia.add(5),await ls(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}ts.provider={build:()=>new ts};/**
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
 */class eu{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):lt("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
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
 */const Pe="FirestoreClient";class OE{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this._databaseInfo=s,this.user=wt.UNAUTHENTICATED,this.clientId=pa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async a=>{V(Pe,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(V(Pe,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Jt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Ga(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function Po(r,t){r.asyncQueue.verifyOperationInProgress(),V(Pe,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await Ef(t.localStore,s),n=s)})),t.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=t}async function $l(r,t){r.asyncQueue.verifyOperationInProgress();const e=await ME(r);V(Pe,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener((n=>Fl(t.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>Fl(t.remoteStore,s))),r._onlineComponents=t}async function ME(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){V(Pe,"Using user provided OfflineComponentProvider");try{await Po(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;On("Error using user provided cache. Falling back to memory cache: "+e),await Po(r,new Zr)}}else V(Pe,"Using default OfflineComponentProvider"),await Po(r,new NE(void 0));return r._offlineComponents}async function zf(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(V(Pe,"Using user provided OnlineComponentProvider"),await $l(r,r._uninitializedComponentsProvider._online)):(V(Pe,"Using default OnlineComponentProvider"),await $l(r,new ts))),r._onlineComponents}function FE(r){return zf(r).then((t=>t.syncEngine))}async function pi(r){const t=await zf(r),e=t.eventManager;return e.onListen=pE.bind(null,t.syncEngine),e.onUnlisten=_E.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=gE.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=yE.bind(null,t.syncEngine),e}function LE(r,t,e,n){const s=new eu(n),i=new Qa(t,s,e);return r.asyncQueue.enqueueAndForget((async()=>Ka(await pi(r),i))),()=>{s.Nu(),r.asyncQueue.enqueueAndForget((async()=>Ha(await pi(r),i)))}}function BE(r,t,e={}){const n=new Jt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,l,h){const f=new eu({next:I=>{f.Nu(),a.enqueueAndForget((()=>Ha(i,p)));const P=I.docs.has(u);!P&&I.fromCache?h.reject(new C(S.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&I.fromCache&&l&&l.source==="server"?h.reject(new C(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(I)},error:I=>h.reject(I)}),p=new Qa(is(u.path),f,{includeMetadataChanges:!0,qa:!0});return Ka(i,p)})(await pi(r),r.asyncQueue,t,e,n))),n.promise}function UE(r,t,e={}){const n=new Jt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,l,h){const f=new eu({next:I=>{f.Nu(),a.enqueueAndForget((()=>Ha(i,p))),I.fromCache&&l.source==="server"?h.reject(new C(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(I)},error:I=>h.reject(I)}),p=new Qa(u,f,{includeMetadataChanges:!0,qa:!0});return Ka(i,p)})(await pi(r),r.asyncQueue,t,e,n))),n.promise}function qE(r,t){const e=new Jt;return r.asyncQueue.enqueueAndForget((async()=>IE(await FE(r),t,e))),e.promise}/**
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
 */function Gf(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const jE="ComponentProvider",zl=new Map;function $E(r,t,e,n,s){return new my(r,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Gf(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
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
 */const zE="firestore.googleapis.com",Gl=!0;class Kl{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new C(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=zE,this.ssl=Gl}else this.host=t.host,this.ssl=t.ssl??Gl;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=af;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<hf)throw new C(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}M_("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Gf(t.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new C(S.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new C(S.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new C(S.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class nu{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Kl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new C(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new C(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Kl(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new S_;switch(n.type){case"firstParty":return new C_(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new C(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const n=zl.get(e);n&&(V(jE,"Removing Datastore"),zl.delete(e),n.terminate())})(this),Promise.resolve()}}/**
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
 */class ue{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new ue(this.firestore,t,this._query)}}class ct{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ve(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ct(this.firestore,t,this._key)}toJSON(){return{type:ct._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(ns(e,ct._jsonSchema))return new ct(t,n||null,new N(Y.fromString(e.referencePath)))}}ct._jsonSchemaVersion="firestore/documentReference/1.0",ct._jsonSchema={type:ft("string",ct._jsonSchemaVersion),referencePath:ft("string")};class ve extends ue{constructor(t,e,n){super(t,e,is(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ct(this.firestore,null,new N(t))}withConverter(t){return new ve(this.firestore,t,this._path)}}function ET(r,t,...e){if(r=Ct(r),$h("collection","path",t),r instanceof nu){const n=Y.fromString(t,...e);return Mc(n),new ve(r,null,n)}{if(!(r instanceof ct||r instanceof ve))throw new C(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return Mc(n),new ve(r.firestore,null,n)}}function GE(r,t,...e){if(r=Ct(r),arguments.length===1&&(t=pa.newId()),$h("doc","path",t),r instanceof nu){const n=Y.fromString(t,...e);return Oc(n),new ct(r,null,new N(n))}{if(!(r instanceof ct||r instanceof ve))throw new C(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Y.fromString(t,...e));return Oc(n),new ct(r.firestore,r instanceof ve?r.converter:null,new N(n))}}/**
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
 */const Hl="AsyncQueue";class Wl{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Cf(this,"async_queue_retry"),this._c=()=>{const n=Ks();n&&V(Hl,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=t;const e=Ks();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Ks();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new Jt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Yu.push(t),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!De(t))throw t;V(Hl,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((n=>{throw this.nc=n,this.rc=!1,lt("INTERNAL UNHANDLED ERROR: ",Ql(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=e,e}enqueueAfterDelay(t,e,n){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=za.createAndSchedule(this,t,e,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:Ql(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ec(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ic(t){return this.Tc().then((()=>{this.tc.sort(((e,n)=>e.targetTimeMs-n.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Ql(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}class Zt extends nu{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new Wl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Wl(t),this._firestoreClient=void 0,await t}}}function TT(r,t,e){e||(e=ei);const n=es(r,"firestore");if(n.isInitialized(e)){const s=n.getImmediate({identifier:e}),i=n.getOptions(e);if(en(i,t))return s;throw new C(S.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new C(S.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<hf)throw new C(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&hh(t.host)&&rp(t.host),n.initialize({options:t,instanceIdentifier:e})}function hs(r){if(r._terminated)throw new C(S.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||KE(r),r._firestoreClient}function KE(r){var n,s,i,a;const t=r._freezeSettings(),e=$E(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,t);r._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new OE(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&(function(l){const h=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(h),_online:h}})(r._componentsProvider))}/**
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
 */class qt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new qt(ht.fromBase64String(t))}catch(e){throw new C(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new qt(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:qt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(ns(t,qt._jsonSchema))return qt.fromBase64String(t.bytes)}}qt._jsonSchemaVersion="firestore/bytes/1.0",qt._jsonSchema={type:ft("string",qt._jsonSchemaVersion),bytes:ft("string")};/**
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
 */class Ui{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new C(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ot(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class sr{constructor(t){this._methodName=t}}/**
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
 */class Yt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new C(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new C(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return U(this._lat,t._lat)||U(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Yt._jsonSchemaVersion}}static fromJSON(t){if(ns(t,Yt._jsonSchema))return new Yt(t.latitude,t.longitude)}}Yt._jsonSchemaVersion="firestore/geoPoint/1.0",Yt._jsonSchema={type:ft("string",Yt._jsonSchemaVersion),latitude:ft("number"),longitude:ft("number")};/**
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
 */class $t{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:$t._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(ns(t,$t._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new $t(t.vectorValues);throw new C(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}$t._jsonSchemaVersion="firestore/vectorValue/1.0",$t._jsonSchema={type:ft("string",$t._jsonSchemaVersion),vectorValues:ft("object")};/**
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
 */const HE=/^__.*__$/;class WE{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new ae(t,this.data,this.fieldMask,e,this.fieldTransforms):new tr(t,this.data,e,this.fieldTransforms)}}class Kf{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ae(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Hf(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:r})}}class qi{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new qi({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.mc(t),n}fc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.Ac(),n}gc(t){return this.i({path:void 0,arrayElement:!0})}yc(t){return gi(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.mc(this.path.get(t))}mc(t){if(t.length===0)throw this.yc("Document fields must not be empty");if(Hf(this.dataSource)&&HE.test(t))throw this.yc('Document fields cannot begin and end with "__"')}}class QE{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||Mi(t)}A(t,e,n,s=!1){return new qi({dataSource:t,methodName:e,targetDoc:n,path:ot.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ds(r){const t=r._freezeSettings(),e=Mi(r._databaseId);return new QE(r._databaseId,!!t.ignoreUndefinedProperties,e)}function ru(r,t,e,n,s,i={}){const a=r.A(i.merge||i.mergeFields?2:0,t,e,s);au("Data must be an object, but it was:",a,n);const u=Yf(n,a);let l,h;if(i.merge)l=new Nt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const I=mn(t,p,e);if(!a.contains(I))throw new C(S.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);tm(f,I)||f.push(I)}l=new Nt(f),h=a.fieldTransforms.filter((p=>l.covers(p.field)))}else l=null,h=a.fieldTransforms;return new WE(new At(u),l,h)}class ji extends sr{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.yc(`${this._methodName}() can only appear at the top level of your update data`):t.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof ji}}function Wf(r,t,e){return new qi({dataSource:3,targetDoc:t.settings.targetDoc,methodName:r._methodName,arrayElement:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class su extends sr{_toFieldTransform(t){return new Di(t.path,new Kn)}isEqual(t){return t instanceof su}}class iu extends sr{constructor(t,e){super(t),this.Sc=e}_toFieldTransform(t){const e=Wf(this,t,!0),n=this.Sc.map((i=>gn(i,e))),s=new un(n);return new Di(t.path,s)}isEqual(t){return t instanceof iu&&en(this.Sc,t.Sc)}}class ou extends sr{constructor(t,e){super(t),this.Sc=e}_toFieldTransform(t){const e=Wf(this,t,!0),n=this.Sc.map((i=>gn(i,e))),s=new cn(n);return new Di(t.path,s)}isEqual(t){return t instanceof ou&&en(this.Sc,t.Sc)}}function Qf(r,t,e,n){const s=r.A(1,t,e);au("Data must be an object, but it was:",s,n);const i=[],a=At.empty();xe(n,((l,h)=>{const f=Zf(t,l,e);h=Ct(h);const p=s.fc(f);if(h instanceof ji)i.push(f);else{const I=gn(h,p);I!=null&&(i.push(f),a.set(f,I))}}));const u=new Nt(i);return new Kf(a,u,s.fieldTransforms)}function Jf(r,t,e,n,s,i){const a=r.A(1,t,e),u=[mn(t,n,e)],l=[s];if(i.length%2!=0)throw new C(S.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<i.length;I+=2)u.push(mn(t,i[I])),l.push(i[I+1]);const h=[],f=At.empty();for(let I=u.length-1;I>=0;--I)if(!tm(h,u[I])){const P=u[I];let D=l[I];D=Ct(D);const k=a.fc(P);if(D instanceof ji)h.push(P);else{const O=gn(D,k);O!=null&&(h.push(P),f.set(P,O))}}const p=new Nt(h);return new Kf(f,p,a.fieldTransforms)}function JE(r,t,e,n=!1){return gn(e,r.A(n?4:3,t))}function gn(r,t){if(Xf(r=Ct(r)))return au("Unsupported field value:",t,r),Yf(r,t);if(r instanceof sr)return(function(n,s){if(!Hf(s.dataSource))throw s.yc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.yc("Nested arrays are not supported");return(function(n,s){const i=[];let a=0;for(const u of n){let l=gn(u,s.gc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}})(r,t)}return(function(n,s){if((n=Ct(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return ky(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=X.fromDate(n);return{timestampValue:Hn(s.serializer,i)}}if(n instanceof X){const i=new X(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Hn(s.serializer,i)}}if(n instanceof Yt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof qt)return{bytesValue:$d(s.serializer,n._byteString)};if(n instanceof ct){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:xa(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof $t)return(function(a,u){const l=a instanceof $t?a.toArray():a;return{mapValue:{fields:{[va]:{stringValue:Aa},[jn]:{arrayValue:{values:l.map((f=>{if(typeof f!="number")throw u.yc("VectorValues must only contain numeric values.");return Sa(u.serializer,f)}))}}}}}})(n,s);if(tf(n))return n._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Ti(n)}`)})(r,t)}function Yf(r,t){const e={};return ad(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):xe(r,((n,s)=>{const i=gn(s,t.dc(n));i!=null&&(e[n]=i)})),{mapValue:{fields:e}}}function Xf(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof X||r instanceof Yt||r instanceof qt||r instanceof ct||r instanceof sr||r instanceof $t||tf(r))}function au(r,t,e){if(!Xf(e)||!zh(e)){const n=Ti(e);throw n==="an object"?t.yc(r+" a custom object"):t.yc(r+" "+n)}}function mn(r,t,e){if((t=Ct(t))instanceof Ui)return t._internalPath;if(typeof t=="string")return Zf(r,t);throw gi("Field path arguments must be of type string or ",r,!1,void 0,e)}const YE=new RegExp("[~\\*/\\[\\]]");function Zf(r,t,e){if(t.search(YE)>=0)throw gi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new Ui(...t.split("."))._internalPath}catch{throw gi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function gi(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${n}`),a&&(l+=` in document ${s}`),l+=")"),new C(S.INVALID_ARGUMENT,u+r+l)}function tm(r,t){return r.some((e=>e.isEqual(t)))}/**
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
 */class XE{convertValue(t,e="none"){switch(be(t)){case 0:return null;case 1:return t.booleanValue;case 2:return it(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ie(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return xe(t,((s,i)=>{n[s]=this.convertValue(i,e)})),n}convertVectorValue(t){var n,s,i;const e=(i=(s=(n=t.fields)==null?void 0:n[jn].arrayValue)==null?void 0:s.values)==null?void 0:i.map((a=>it(a.doubleValue)));return new $t(e)}convertGeoPoint(t){return new Yt(it(t.latitude),it(t.longitude))}convertArray(t,e){return(t.values||[]).map((n=>this.convertValue(n,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Si(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Hr(t));default:return null}}convertTimestamp(t){const e=se(t);return new X(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Y.fromString(t);L(Zd(n),9688,{name:t});const s=new on(n.get(1),n.get(3)),i=new N(n.popFirst(5));return s.isEqual(e)||lt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */class uu extends XE{constructor(t){super(),this.firestore=t}convertBytes(t){return new qt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ct(this.firestore,null,e)}}function wT(){return new su("serverTimestamp")}function vT(...r){return new iu("arrayUnion",r)}function AT(...r){return new ou("arrayRemove",r)}const Jl="@firebase/firestore",Yl="4.13.0";/**
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
 */function Xl(r){return(function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}/**
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
 */class em{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ct(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new ZE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(mn("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class ZE extends em{data(){return super.data()}}/**
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
 */function nm(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new C(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class cu{}class lu extends cu{}function bT(r,t,...e){let n=[];t instanceof cu&&n.push(t),n=n.concat(e),(function(i){const a=i.filter((l=>l instanceof hu)).length,u=i.filter((l=>l instanceof $i)).length;if(a>1||a>0&&u>0)throw new C(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class $i extends lu{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new $i(t,e,n)}_apply(t){const e=this._parse(t);return rm(t._query,e),new ue(t.firestore,t.converter,Ko(t._query,e))}_parse(t){const e=ds(t.firestore);return(function(i,a,u,l,h,f,p){let I;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new C(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){th(p,f);const D=[];for(const k of p)D.push(Zl(l,i,k));I={arrayValue:{values:D}}}else I=Zl(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||th(p,f),I=JE(u,a,p,f==="in"||f==="not-in");return G.create(h,f,I)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function RT(r,t,e){const n=t,s=mn("where",r);return $i._create(s,n,e)}class hu extends cu{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new hu(t,e)}_parse(t){const e=this._queryConstraints.map((n=>n._parse(t))).filter((n=>n.getFilters().length>0));return e.length===1?e[0]:Z.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,i){let a=s;const u=i.getFlattenedFilters();for(const l of u)rm(a,l),a=Ko(a,l)})(t._query,e),new ue(t.firestore,t.converter,Ko(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class du extends lu{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new du(t,e)}_apply(t){const e=(function(s,i,a){if(s.startAt!==null)throw new C(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new C(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Yr(i,a)})(t._query,this._field,this._direction);return new ue(t.firestore,t.converter,Py(t._query,e))}}function ST(r,t="asc"){const e=t,n=mn("orderBy",r);return du._create(n,e)}class fu extends lu{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new fu(t,e,n)}_apply(t){return new ue(t.firestore,t.converter,si(t._query,this._limit,this._limitType))}}function PT(r){return fu._create("limit",r,"F")}function Zl(r,t,e){if(typeof(e=Ct(e))=="string"){if(e==="")throw new C(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!bd(t)&&e.indexOf("/")!==-1)throw new C(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(Y.fromString(e));if(!N.isDocumentKey(n))throw new C(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Qr(r,new N(n))}if(e instanceof ct)return Qr(r,e._key);throw new C(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ti(e)}.`)}function th(r,t){if(!Array.isArray(r)||r.length===0)throw new C(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function rm(r,t){const e=(function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new C(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new C(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function mu(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}class tT{constructor(t){let e;this.kind="persistent",t!=null&&t.tabManager?(t.tabManager._initialize(t),e=t.tabManager):(e=rT(void 0),e._initialize(t)),this._onlineComponentProvider=e._onlineComponentProvider,this._offlineComponentProvider=e._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function VT(r){return new tT(r)}class eT{constructor(t){this.forceOwnership=t,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=ts.provider,this._offlineComponentProvider={build:e=>new $f(e,t==null?void 0:t.cacheSizeBytes,this.forceOwnership)}}}class nT{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=ts.provider,this._offlineComponentProvider={build:e=>new kE(e,t==null?void 0:t.cacheSizeBytes)}}}function rT(r){return new eT(r==null?void 0:r.forceOwnership)}function CT(){return new nT}class Dr{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ze extends em{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Hs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(mn("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new C(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Ze._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Ze._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ze._jsonSchema={type:ft("string",Ze._jsonSchemaVersion),bundleSource:ft("string","DocumentSnapshot"),bundleName:ft("string"),bundle:ft("string")};class Hs extends Ze{data(t={}){return super.data(t)}}class tn{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Dr(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new Hs(this._firestore,this._userDataWriter,n.key,n,new Dr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new C(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{const l=new Hs(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Dr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{const l=new Hs(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Dr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return u.type!==0&&(h=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),f=a.indexOf(u.doc.key)),{type:sT(u.type),doc:l,oldIndex:h,newIndex:f}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new C(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=tn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=pa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function sT(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
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
 */tn._jsonSchemaVersion="firestore/querySnapshot/1.0",tn._jsonSchema={type:ft("string",tn._jsonSchemaVersion),bundleSource:ft("string","QuerySnapshot"),bundleName:ft("string"),bundle:ft("string")};/**
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
 */class iT{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=ds(t)}set(t,e,n){this._verifyNotCommitted();const s=Vo(t,this._firestore),i=mu(s.converter,e,n),a=ru(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(a.toMutation(s._key,pt.none())),this}update(t,e,n,...s){this._verifyNotCommitted();const i=Vo(t,this._firestore);let a;return a=typeof(e=Ct(e))=="string"||e instanceof Ui?Jf(this._dataReader,"WriteBatch.update",i._key,e,n,s):Qf(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(a.toMutation(i._key,pt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Vo(t,this._firestore);return this._mutations=this._mutations.concat(new as(e._key,pt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new C(S.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Vo(r,t){if((r=Ct(r)).firestore!==t)throw new C(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
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
 */function DT(r){r=kt(r,ct);const t=kt(r.firestore,Zt),e=hs(t);return BE(e,r._key).then((n=>sm(t,r,n)))}function xT(r){r=kt(r,ue);const t=kt(r.firestore,Zt),e=hs(t),n=new uu(t);return nm(r._query),UE(e,r._query).then((s=>new tn(t,n,r,s)))}function NT(r,t,e){r=kt(r,ct);const n=kt(r.firestore,Zt),s=mu(r.converter,t,e),i=ds(n);return fs(n,[ru(i,"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,pt.none())])}function kT(r,t,e,...n){r=kt(r,ct);const s=kt(r.firestore,Zt),i=ds(s);let a;return a=typeof(t=Ct(t))=="string"||t instanceof Ui?Jf(i,"updateDoc",r._key,t,e,n):Qf(i,"updateDoc",r._key,t),fs(s,[a.toMutation(r._key,pt.exists(!0))])}function OT(r){return fs(kt(r.firestore,Zt),[new as(r._key,pt.none())])}function MT(r,t){const e=kt(r.firestore,Zt),n=GE(r),s=mu(r.converter,t),i=ds(r.firestore);return fs(e,[ru(i,"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,pt.exists(!1))]).then((()=>n))}function FT(r,...t){var h,f,p;r=Ct(r);let e={includeMetadataChanges:!1,source:"default"},n=0;typeof t[n]!="object"||Xl(t[n])||(e=t[n++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Xl(t[n])){const I=t[n];t[n]=(h=I.next)==null?void 0:h.bind(I),t[n+1]=(f=I.error)==null?void 0:f.bind(I),t[n+2]=(p=I.complete)==null?void 0:p.bind(I)}let i,a,u;if(r instanceof ct)a=kt(r.firestore,Zt),u=is(r._key.path),i={next:I=>{t[n]&&t[n](sm(a,r,I))},error:t[n+1],complete:t[n+2]};else{const I=kt(r,ue);a=kt(I.firestore,Zt),u=I._query;const P=new uu(a);i={next:D=>{t[n]&&t[n](new tn(a,P,I,D))},error:t[n+1],complete:t[n+2]},nm(r._query)}const l=hs(a);return LE(l,u,s,i)}function fs(r,t){const e=hs(r);return qE(e,t)}function sm(r,t,e){const n=e.docs.get(t._key),s=new uu(r);return new Ze(r,s,t._key,n,new Dr(e.hasPendingWrites,e.fromCache),t.converter)}function LT(r){return r=kt(r,Zt),hs(r),new iT(r,(t=>fs(r,t)))}(function(t,e=!0){b_(Kp),Ae(new ne("firestore",((n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new Zt(new P_(n.getProvider("auth-internal")),new D_(a,n.getProvider("app-check-internal")),py(a,s),a);return i={useFetchStreams:e,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),ee(Jl,Yl,t),ee(Jl,Yl,"esm2020")})();export{yT as A,CT as B,ne as C,bT as D,yi as E,Ve as F,RT as G,ET as H,FT as I,NT as J,GE as K,aa as L,wT as M,ST as N,OT as O,xT as P,kT as Q,vT as R,Kp as S,AT as T,MT as U,LT as V,PT as W,DT as X,Ae as _,hT as a,Km as b,$p as c,Ct as d,_T as e,W as f,uT as g,kn as h,cT as i,qm as j,hh as k,es as l,aT as m,Wp as n,en as o,rp as p,mT as q,ee as r,dT as s,fT as t,lT as u,pT as v,gT as w,Hp as x,TT as y,VT as z};
