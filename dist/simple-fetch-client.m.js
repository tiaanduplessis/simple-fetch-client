function t(t,r,n){return new Promise(function(o,i){!function t(r,n,u){var s=n.retryStatus;(0,n.fetcher)(r,n).then(function(f){s.includes(f.status)?u>0?(u--,setTimeout(function(){return t(r,n,u)},e(n,u))):i(f):o(f)}).catch(function(o){u>0?(u--,setTimeout(function(){return t(r,n,u)},e(n,u))):i(o)})}(r,n,t)})}function e(t,e){var r=t.retryDelay,n=t.factor,o=t.retries;return n&&"number"==typeof n&&Number.isInteger(n)?function(t,e){return Math.pow(n,e)}(0,o-e):r*(o-e)}var r=!1;try{r=window&&window.fetch}catch(t){}function n(e,n){if(void 0===e&&(e=""),void 0===n&&(n={}),!(n=Object.assign({retries:1,retryDelay:1e3,retryStatus:[],fetcher:r,timeout:void 0},n)).fetcher||"function"!=typeof n.fetcher)throw new Error("tenacious-fetch: No fetch implementation found. Provide a valid fetch implementation via the fetcher configuration property.");"string"!=typeof n.retryStatus&&"number"!=typeof n.retryStatus||(n.retryStatus=[Number.parseInt(n.retryStatus)]);var o=n.timeout;return o&&Number.isInteger(o)?Promise.race([t(n.retries,e,n),new Promise(function(t,e){return setTimeout(function(){return e(new Error("tenacious-fetch: Request took longer than timeout of "+o+" ms."))},o)})]):t(n.retries,e,n)}var o=u;u.default=u,u.stable=f,u.stableStringify=f;var i=[];function u(t,e,r){!function t(e,r,n,o){var u;if("object"==typeof e&&null!==e){for(u=0;u<n.length;u++)if(n[u]===e)return o[r]="[Circular]",void i.push([o,r,e]);if(n.push(e),Array.isArray(e))for(u=0;u<e.length;u++)t(e[u],u,n,e);else{var s=Object.keys(e);for(u=0;u<s.length;u++){var f=s[u];t(e[f],f,n,e)}}n.pop()}}(t,"",[],void 0);for(var n=JSON.stringify(t,e,r);0!==i.length;){var o=i.pop();o[0][o[1]]=o[2]}return n}function s(t,e){return t<e?-1:t>e?1:0}function f(t,e,r){for(var n=function t(e,r,n,o){var u;if("object"==typeof e&&null!==e){for(u=0;u<n.length;u++)if(n[u]===e)return o[r]="[Circular]",void i.push([o,r,e]);if("function"==typeof e.toJSON)return;if(n.push(e),Array.isArray(e))for(u=0;u<e.length;u++)t(e[u],u,n,e);else{var f={},a=Object.keys(e).sort(s);for(u=0;u<a.length;u++){var c=a[u];t(e[c],c,n,e),f[c]=e[c]}if(void 0===o)return f;i.push([o,r,e]),o[r]=f}n.pop()}}(t,"",[],void 0)||t,o=JSON.stringify(n,e,r);0!==i.length;){var u=i.pop();u[0][u[1]]=u[2]}return o}var a=["arrayBuffer","blob","formData","json","text","raw"],c={"application/json":"json","text/plain":"text"};function h(t,e){var r=t.ok,n=t.headers,o=t.status,i=t.statusText,u=e.config.bodyType;if(!u){var s=n.get("Content-Type")||"";u=c[s]||"json"}if(!a.includes(u))throw new Error("Invalid bodyType of "+u+" provided.");return e.ok=r,e.headers=n,e.status=o,e.statusText=i,"raw"===u?(e.data=t.body,Promise.resolve(e)):t[u]().then(function(t){return e.data=t,e})}var p=function(t){this.fns=[],t&&this.use(t)};function d(t,e){return t.then(e)}p.prototype.use=function(t,e){var r=this;void 0===e&&(e={});var n=e.before;void 0===n&&(n=!1),void 0!==t&&null!==t&&(t instanceof p?this.use(t.fns):Array.isArray(t)?t.forEach(function(t){return r.use(t)}):t.then||"function"==typeof t?n?this.fns.unshift(t):this.fns.push(t):n?this.fns.unshift(function(){return t}):this.fns.push(function(){return t}))},p.prototype.run=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return this.fns.reduce(d,Promise.resolve.apply(Promise,t))};var l=function(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)},y={default:l,__moduleExports:l},v=y&&l||y,m=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;function g(t,e,r){var n=e[r];if(void 0!==n&&null!==n){if(m.call(t,r)&&(void 0===t[r]||null===t[r]))throw new TypeError("Cannot convert undefined or null to object ("+r+")");t[r]=m.call(t,r)&&v(n)?w(Object(t[r]),e[r]):n}}function w(t,e){if(t===e)return t;for(var r in e=Object(e))m.call(e,r)&&g(t,e,r);if(Object.getOwnPropertySymbols)for(var n=Object.getOwnPropertySymbols(e),o=0;o<n.length;o++)b.call(e,n[o])&&g(t,e,n[o]);return t}var j=function(t){t=function(t){if(null===t||void 0===t)throw new TypeError("Sources cannot be null or undefined");return Object(t)}(t);for(var e=1;e<arguments.length;e++)w(t,arguments[e]);return t};var T={get:"GET",delete:"DELETE",head:"HEAD",options:"OPTIONS",post:"POST",put:"POST",patch:"PATCH"},O=function(t,e){if(void 0===e&&(e={}),!t||"string"!=typeof t)throw new Error("No base URL provided");this.baseURL=t.endsWith("/")?t.slice(0,t.length-1):t,this.fetch=e.fetch||n,this.middlware=new p,this.delayTime=e.delay||!1,delete e.fetch,this.config=e};O.prototype.delay=function(t){return void 0===t&&(t=1e3),new Promise(function(e){setTimeout(e,t)})},O.prototype.useMiddleware=function(t,e){void 0===e&&(e={}),this.middlware.use(t,e)},O.prototype.request=function(t,e){return void 0===t&&(t=""),new Promise(function(r,n){var i,u,s;if(i=""+this.baseURL+t+(e.params?function(t){void 0===t&&(t={});var e=encodeURIComponent;return"?"+Object.keys(t).map(function(r){return e(r)+"="+e(t[r])}).join("&")}(e.params):""),"object"==typeof(u=j({headers:{Accept:"application/json","Content-Type":"application/json"}},this.config,e)).body&&"application/json"===u.headers["Content-Type"]&&(u.body=o(u.body||{})),this.delayTime)return this.delay(this.delayTime).then(function(t){try{return f.call(this)}catch(t){return n(t)}}.bind(this),n);function f(){return this.fetch(i,u).then(function(t){try{return function(t,e){if(void 0===e&&(e={}),!t.ok){var r=new Error(t.status+": "+t.statusText);return r.config=e,h(t,r).then(function(t){throw t})}return h(t,{config:e})}(t,u).then(function(t){try{return(s=t).url=i,r(this.middlware.run(s))}catch(t){return n(t)}}.bind(this),n)}catch(t){return n(t)}}.bind(this),n)}return f.call(this)}.bind(this))},O.prototype.get=function(t,e){return void 0===e&&(e={}),this.request(t,j(e,{method:T.get}))},O.prototype.delete=function(t,e){return void 0===e&&(e={}),this.request(t,j(e,{method:T.delete}))},O.prototype.head=function(t,e){return void 0===e&&(e={}),this.request(t,j(e,{method:T.delete}))},O.prototype.options=function(t,e){return void 0===e&&(e={}),this.request(t,j(e,{method:T.options}))},O.prototype.post=function(t,e){return void 0===e&&(e={}),this.request(t,j(e,{method:T.post}))},O.prototype.put=function(t,e){return void 0===e&&(e={}),this.request(t,j(e,{method:T.put}))},O.prototype.patch=function(t,e){return void 0===e&&(e={}),this.request(t,j(e,{method:T.patch}))};export default O;export{T as methods};
//# sourceMappingURL=simple-fetch-client.m.js.map