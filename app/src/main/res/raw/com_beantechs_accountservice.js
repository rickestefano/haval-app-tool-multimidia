"use strict";(()=>{var ds=Object.defineProperty;var us=(n,e)=>{for(var t in e)ds(n,t,{get:e[t],enumerable:!0})};var Se=[],ge=[],zt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(let n=0,e=zt.length;n<e;++n)Se[n]=zt[n],ge[zt.charCodeAt(n)]=n;ge[45]=62;ge[95]=63;function ps(n){let e=n.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");let t=n.indexOf("=");t===-1&&(t=e);let r=t===e?0:4-t%4;return[t,r]}function fs(n,e,t){return(e+t)*3/4-t}function vr(n){let e=ps(n),t=e[0],r=e[1],o=new Uint8Array(fs(n,t,r)),s=0,i=r>0?t-4:t,c;for(c=0;c<i;c+=4){let a=ge[n.charCodeAt(c)]<<18|ge[n.charCodeAt(c+1)]<<12|ge[n.charCodeAt(c+2)]<<6|ge[n.charCodeAt(c+3)];o[s++]=a>>16&255,o[s++]=a>>8&255,o[s++]=a&255}if(r===2){let a=ge[n.charCodeAt(c)]<<2|ge[n.charCodeAt(c+1)]>>4;o[s++]=a&255}if(r===1){let a=ge[n.charCodeAt(c)]<<10|ge[n.charCodeAt(c+1)]<<4|ge[n.charCodeAt(c+2)]>>2;o[s++]=a>>8&255,o[s++]=a&255}return o}function hs(n){return Se[n>>18&63]+Se[n>>12&63]+Se[n>>6&63]+Se[n&63]}function _s(n,e,t){let r=[];for(let o=e;o<t;o+=3){let s=(n[o]<<16&16711680)+(n[o+1]<<8&65280)+(n[o+2]&255);r.push(hs(s))}return r.join("")}function Jt(n){let e=n.length,t=e%3,r=[],o=16383;for(let s=0,i=e-t;s<i;s+=o)r.push(_s(n,s,s+o>i?i:s+o));if(t===1){let s=n[e-1];r.push(Se[s>>2]+Se[s<<4&63]+"==")}else if(t===2){let s=(n[e-2]<<8)+n[e-1];r.push(Se[s>>10]+Se[s>>4&63]+Se[s<<2&63]+"=")}return r.join("")}function tt(n,e,t,r,o){let s,i,c=o*8-r-1,a=(1<<c)-1,l=a>>1,d=-7,u=t?o-1:0,f=t?-1:1,p=n[e+u];for(u+=f,s=p&(1<<-d)-1,p>>=-d,d+=c;d>0;)s=s*256+n[e+u],u+=f,d-=8;for(i=s&(1<<-d)-1,s>>=-d,d+=r;d>0;)i=i*256+n[e+u],u+=f,d-=8;if(s===0)s=1-l;else{if(s===a)return i?NaN:(p?-1:1)*(1/0);i=i+Math.pow(2,r),s=s-l}return(p?-1:1)*i*Math.pow(2,s-r)}function $t(n,e,t,r,o,s){let i,c,a,l=s*8-o-1,d=(1<<l)-1,u=d>>1,f=o===23?Math.pow(2,-24)-Math.pow(2,-77):0,p=r?0:s-1,_=r?1:-1,h=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(c=isNaN(e)?1:0,i=d):(i=Math.floor(Math.log(e)/Math.LN2),e*(a=Math.pow(2,-i))<1&&(i--,a*=2),i+u>=1?e+=f/a:e+=f*Math.pow(2,1-u),e*a>=2&&(i++,a/=2),i+u>=d?(c=0,i=d):i+u>=1?(c=(e*a-1)*Math.pow(2,o),i=i+u):(c=e*Math.pow(2,u-1)*Math.pow(2,o),i=0));o>=8;)n[t+p]=c&255,p+=_,c/=256,o-=8;for(i=i<<o|c,l+=o;l>0;)n[t+p]=i&255,p+=_,i/=256,l-=8;n[t+p-_]|=h*128}var bs={INSPECT_MAX_BYTES:50},Gt=2147483647;m.TYPED_ARRAY_SUPPORT=!0;Object.defineProperty(m.prototype,"parent",{enumerable:!0,get:function(){if(m.isBuffer(this))return this.buffer}});Object.defineProperty(m.prototype,"offset",{enumerable:!0,get:function(){if(m.isBuffer(this))return this.byteOffset}});function Le(n){if(n>Gt)throw new RangeError('The value "'+n+'" is invalid for option "size"');let e=new Uint8Array(n);return Object.setPrototypeOf(e,m.prototype),e}function m(n,e,t){if(typeof n=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return qt(n)}return Tr(n,e,t)}m.poolSize=8192;function Tr(n,e,t){if(typeof n=="string")return Es(n,e);if(ArrayBuffer.isView(n))return vs(n);if(n==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof n);if(n instanceof ArrayBuffer||n&&n.buffer instanceof ArrayBuffer||n instanceof SharedArrayBuffer||n&&n.buffer instanceof SharedArrayBuffer)return Zt(n,e,t);if(typeof n=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let r=n.valueOf&&n.valueOf();if(r!=null&&r!==n)return m.from(r,e,t);let o=Ss(n);if(o)return o;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof n[Symbol.toPrimitive]=="function")return m.from(n[Symbol.toPrimitive]("string"),e,t);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof n)}m.from=function(n,e,t){return Tr(n,e,t)};Object.setPrototypeOf(m.prototype,Uint8Array.prototype);Object.setPrototypeOf(m,Uint8Array);function Cr(n){if(typeof n!="number")throw new TypeError('"size" argument must be of type number');if(n<0)throw new RangeError('The value "'+n+'" is invalid for option "size"')}function ys(n,e,t){return Cr(n),n<=0?Le(n):e!==void 0?typeof t=="string"?Le(n).fill(e,t):Le(n).fill(e):Le(n)}m.alloc=function(n,e,t){return ys(n,e,t)};function qt(n){return Cr(n),Le(n<0?0:Kt(n)|0)}m.allocUnsafe=function(n){return qt(n)};m.allocUnsafeSlow=function(n){return qt(n)};function Es(n,e){if((typeof e!="string"||e==="")&&(e="utf8"),!m.isEncoding(e))throw new TypeError("Unknown encoding: "+e);let t=Ar(n,e)|0,r=Le(t),o=r.write(n,e);return o!==t&&(r=r.slice(0,o)),r}function Ht(n){let e=n.length<0?0:Kt(n.length)|0,t=Le(e);for(let r=0;r<e;r+=1)t[r]=n[r]&255;return t}function vs(n){if(n instanceof Uint8Array){let e=new Uint8Array(n);return Zt(e.buffer,e.byteOffset,e.byteLength)}return Ht(n)}function Zt(n,e,t){if(e<0||n.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(n.byteLength<e+(t||0))throw new RangeError('"length" is outside of buffer bounds');let r;return e===void 0&&t===void 0?r=new Uint8Array(n):t===void 0?r=new Uint8Array(n,e):r=new Uint8Array(n,e,t),Object.setPrototypeOf(r,m.prototype),r}function Ss(n){if(m.isBuffer(n)){let e=Kt(n.length)|0,t=Le(e);return t.length===0||n.copy(t,0,0,e),t}if(n.length!==void 0)return typeof n.length!="number"||Number.isNaN(n.length)?Le(0):Ht(n);if(n.type==="Buffer"&&Array.isArray(n.data))return Ht(n.data)}function Kt(n){if(n>=Gt)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Gt.toString(16)+" bytes");return n|0}m.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==m.prototype};m.compare=function(e,t){if(e instanceof Uint8Array&&(e=m.from(e,e.offset,e.byteLength)),t instanceof Uint8Array&&(t=m.from(t,t.offset,t.byteLength)),!m.isBuffer(e)||!m.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let r=e.length,o=t.length;for(let s=0,i=Math.min(r,o);s<i;++s)if(e[s]!==t[s]){r=e[s],o=t[s];break}return r<o?-1:o<r?1:0};m.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};m.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return m.alloc(0);let r;if(t===void 0)for(t=0,r=0;r<e.length;++r)t+=e[r].length;let o=m.allocUnsafe(t),s=0;for(r=0;r<e.length;++r){let i=e[r];if(i instanceof Uint8Array)s+i.length>o.length?(m.isBuffer(i)||(i=m.from(i.buffer,i.byteOffset,i.byteLength)),i.copy(o,s)):Uint8Array.prototype.set.call(o,i,s);else if(m.isBuffer(i))i.copy(o,s);else throw new TypeError('"list" argument must be an Array of Buffers');s+=i.length}return o};function Ar(n,e){if(m.isBuffer(n))return n.length;if(ArrayBuffer.isView(n)||n instanceof ArrayBuffer)return n.byteLength;if(typeof n!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof n);let t=n.length,r=arguments.length>2&&arguments[2]===!0;if(!r&&t===0)return 0;let o=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return t;case"utf8":case"utf-8":return Wt(n).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return t*2;case"hex":return t>>>1;case"base64":return Pr(n).length;default:if(o)return r?-1:Wt(n).length;e=(""+e).toLowerCase(),o=!0}}m.byteLength=Ar;function ws(n,e,t){let r=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((t===void 0||t>this.length)&&(t=this.length),t<=0)||(t>>>=0,e>>>=0,t<=e))return"";for(n||(n="utf8");;)switch(n){case"hex":return Rs(this,e,t);case"utf8":case"utf-8":return xr(this,e,t);case"ascii":return Ns(this,e,t);case"latin1":case"binary":return Ms(this,e,t);case"base64":return xs(this,e,t);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Os(this,e,t);default:if(r)throw new TypeError("Unknown encoding: "+n);n=(n+"").toLowerCase(),r=!0}}m.prototype._isBuffer=!0;function Pe(n,e,t){let r=n[e];n[e]=n[t],n[t]=r}m.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)Pe(this,t,t+1);return this};m.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)Pe(this,t,t+3),Pe(this,t+1,t+2);return this};m.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)Pe(this,t,t+7),Pe(this,t+1,t+6),Pe(this,t+2,t+5),Pe(this,t+3,t+4);return this};m.prototype.toString=function(){let e=this.length;return e===0?"":arguments.length===0?xr(this,0,e):ws.apply(this,arguments)};m.prototype.toLocaleString=m.prototype.toString;m.prototype.equals=function(e){if(!m.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:m.compare(this,e)===0};m.prototype.inspect=function(){let e="",t=bs.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"};m.prototype[Symbol.for("nodejs.util.inspect.custom")]=m.prototype.inspect;m.prototype.compare=function(e,t,r,o,s){if(e instanceof Uint8Array&&(e=m.from(e,e.offset,e.byteLength)),!m.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(t===void 0&&(t=0),r===void 0&&(r=e?e.length:0),o===void 0&&(o=0),s===void 0&&(s=this.length),t<0||r>e.length||o<0||s>this.length)throw new RangeError("out of range index");if(o>=s&&t>=r)return 0;if(o>=s)return-1;if(t>=r)return 1;if(t>>>=0,r>>>=0,o>>>=0,s>>>=0,this===e)return 0;let i=s-o,c=r-t,a=Math.min(i,c),l=this.slice(o,s),d=e.slice(t,r);for(let u=0;u<a;++u)if(l[u]!==d[u]){i=l[u],c=d[u];break}return i<c?-1:c<i?1:0};function Lr(n,e,t,r,o){if(n.length===0)return-1;if(typeof t=="string"?(r=t,t=0):t>2147483647?t=2147483647:t<-2147483648&&(t=-2147483648),t=+t,Number.isNaN(t)&&(t=o?0:n.length-1),t<0&&(t=n.length+t),t>=n.length){if(o)return-1;t=n.length-1}else if(t<0)if(o)t=0;else return-1;if(typeof e=="string"&&(e=m.from(e,r)),m.isBuffer(e))return e.length===0?-1:Sr(n,e,t,r,o);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?o?Uint8Array.prototype.indexOf.call(n,e,t):Uint8Array.prototype.lastIndexOf.call(n,e,t):Sr(n,[e],t,r,o);throw new TypeError("val must be string, number or Buffer")}function Sr(n,e,t,r,o){let s=1,i=n.length,c=e.length;if(r!==void 0&&(r=String(r).toLowerCase(),r==="ucs2"||r==="ucs-2"||r==="utf16le"||r==="utf-16le")){if(n.length<2||e.length<2)return-1;s=2,i/=2,c/=2,t/=2}function a(d,u){return s===1?d[u]:d.readUInt16BE(u*s)}let l;if(o){let d=-1;for(l=t;l<i;l++)if(a(n,l)===a(e,d===-1?0:l-d)){if(d===-1&&(d=l),l-d+1===c)return d*s}else d!==-1&&(l-=l-d),d=-1}else for(t+c>i&&(t=i-c),l=t;l>=0;l--){let d=!0;for(let u=0;u<c;u++)if(a(n,l+u)!==a(e,u)){d=!1;break}if(d)return l}return-1}m.prototype.includes=function(e,t,r){return this.indexOf(e,t,r)!==-1};m.prototype.indexOf=function(e,t,r){return Lr(this,e,t,r,!0)};m.prototype.lastIndexOf=function(e,t,r){return Lr(this,e,t,r,!1)};function Is(n,e,t,r){t=Number(t)||0;let o=n.length-t;r?(r=Number(r),r>o&&(r=o)):r=o;let s=e.length;r>s/2&&(r=s/2);let i;for(i=0;i<r;++i){let c=parseInt(e.substr(i*2,2),16);if(Number.isNaN(c))return i;n[t+i]=c}return i}function Ts(n,e,t,r){return bt(Wt(e,n.length-t),n,t,r)}function Cs(n,e,t,r){return bt(Us(e),n,t,r)}function As(n,e,t,r){return bt(Pr(e),n,t,r)}function Ls(n,e,t,r){return bt(Ds(e,n.length-t),n,t,r)}m.prototype.write=function(e,t,r,o){if(t===void 0)o="utf8",r=this.length,t=0;else if(r===void 0&&typeof t=="string")o=t,r=this.length,t=0;else if(isFinite(t))t=t>>>0,isFinite(r)?(r=r>>>0,o===void 0&&(o="utf8")):(o=r,r=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let s=this.length-t;if((r===void 0||r>s)&&(r=s),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");o||(o="utf8");let i=!1;for(;;)switch(o){case"hex":return Is(this,e,t,r);case"utf8":case"utf-8":return Ts(this,e,t,r);case"ascii":case"latin1":case"binary":return Cs(this,e,t,r);case"base64":return As(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Ls(this,e,t,r);default:if(i)throw new TypeError("Unknown encoding: "+o);o=(""+o).toLowerCase(),i=!0}};m.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function xs(n,e,t){return e===0&&t===n.length?Jt(n):Jt(n.slice(e,t))}function xr(n,e,t){t=Math.min(n.length,t);let r=[],o=e;for(;o<t;){let s=n[o],i=null,c=s>239?4:s>223?3:s>191?2:1;if(o+c<=t){let a,l,d,u;switch(c){case 1:s<128&&(i=s);break;case 2:a=n[o+1],(a&192)===128&&(u=(s&31)<<6|a&63,u>127&&(i=u));break;case 3:a=n[o+1],l=n[o+2],(a&192)===128&&(l&192)===128&&(u=(s&15)<<12|(a&63)<<6|l&63,u>2047&&(u<55296||u>57343)&&(i=u));break;case 4:a=n[o+1],l=n[o+2],d=n[o+3],(a&192)===128&&(l&192)===128&&(d&192)===128&&(u=(s&15)<<18|(a&63)<<12|(l&63)<<6|d&63,u>65535&&u<1114112&&(i=u))}}i===null?(i=65533,c=1):i>65535&&(i-=65536,r.push(i>>>10&1023|55296),i=56320|i&1023),r.push(i),o+=c}return ks(r)}var wr=4096;function ks(n){let e=n.length;if(e<=wr)return String.fromCharCode.apply(String,n);let t="",r=0;for(;r<e;)t+=String.fromCharCode.apply(String,n.slice(r,r+=wr));return t}function Ns(n,e,t){let r="";t=Math.min(n.length,t);for(let o=e;o<t;++o)r+=String.fromCharCode(n[o]&127);return r}function Ms(n,e,t){let r="";t=Math.min(n.length,t);for(let o=e;o<t;++o)r+=String.fromCharCode(n[o]);return r}function Rs(n,e,t){let r=n.length;(!e||e<0)&&(e=0),(!t||t<0||t>r)&&(t=r);let o="";for(let s=e;s<t;++s)o+=Bs[n[s]];return o}function Os(n,e,t){let r=n.slice(e,t),o="";for(let s=0;s<r.length-1;s+=2)o+=String.fromCharCode(r[s]+r[s+1]*256);return o}m.prototype.slice=function(e,t){let r=this.length;e=~~e,t=t===void 0?r:~~t,e<0?(e+=r,e<0&&(e=0)):e>r&&(e=r),t<0?(t+=r,t<0&&(t=0)):t>r&&(t=r),t<e&&(t=e);let o=this.subarray(e,t);return Object.setPrototypeOf(o,m.prototype),o};function se(n,e,t){if(n%1!==0||n<0)throw new RangeError("offset is not uint");if(n+e>t)throw new RangeError("Trying to access beyond buffer length")}m.prototype.readUintLE=m.prototype.readUIntLE=function(e,t,r){e=e>>>0,t=t>>>0,r||se(e,t,this.length);let o=this[e],s=1,i=0;for(;++i<t&&(s*=256);)o+=this[e+i]*s;return o};m.prototype.readUintBE=m.prototype.readUIntBE=function(e,t,r){e=e>>>0,t=t>>>0,r||se(e,t,this.length);let o=this[e+--t],s=1;for(;t>0&&(s*=256);)o+=this[e+--t]*s;return o};m.prototype.readUint8=m.prototype.readUInt8=function(e,t){return e=e>>>0,t||se(e,1,this.length),this[e]};m.prototype.readUint16LE=m.prototype.readUInt16LE=function(e,t){return e=e>>>0,t||se(e,2,this.length),this[e]|this[e+1]<<8};m.prototype.readUint16BE=m.prototype.readUInt16BE=function(e,t){return e=e>>>0,t||se(e,2,this.length),this[e]<<8|this[e+1]};m.prototype.readUint32LE=m.prototype.readUInt32LE=function(e,t){return e=e>>>0,t||se(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};m.prototype.readUint32BE=m.prototype.readUInt32BE=function(e,t){return e=e>>>0,t||se(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};m.prototype.readBigUInt64LE=function(e){e=e>>>0,Ge(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&nt(e,this.length-8);let o=t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,s=this[++e]+this[++e]*2**8+this[++e]*2**16+r*2**24;return BigInt(o)+(BigInt(s)<<BigInt(32))};m.prototype.readBigUInt64BE=function(e){e=e>>>0,Ge(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&nt(e,this.length-8);let o=t*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],s=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r;return(BigInt(o)<<BigInt(32))+BigInt(s)};m.prototype.readIntLE=function(e,t,r){e=e>>>0,t=t>>>0,r||se(e,t,this.length);let o=this[e],s=1,i=0;for(;++i<t&&(s*=256);)o+=this[e+i]*s;return s*=128,o>=s&&(o-=Math.pow(2,8*t)),o};m.prototype.readIntBE=function(e,t,r){e=e>>>0,t=t>>>0,r||se(e,t,this.length);let o=t,s=1,i=this[e+--o];for(;o>0&&(s*=256);)i+=this[e+--o]*s;return s*=128,i>=s&&(i-=Math.pow(2,8*t)),i};m.prototype.readInt8=function(e,t){return e=e>>>0,t||se(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]};m.prototype.readInt16LE=function(e,t){e=e>>>0,t||se(e,2,this.length);let r=this[e]|this[e+1]<<8;return r&32768?r|4294901760:r};m.prototype.readInt16BE=function(e,t){e=e>>>0,t||se(e,2,this.length);let r=this[e+1]|this[e]<<8;return r&32768?r|4294901760:r};m.prototype.readInt32LE=function(e,t){return e=e>>>0,t||se(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};m.prototype.readInt32BE=function(e,t){return e=e>>>0,t||se(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};m.prototype.readBigInt64LE=function(e){e=e>>>0,Ge(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&nt(e,this.length-8);let o=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(r<<24);return(BigInt(o)<<BigInt(32))+BigInt(t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)};m.prototype.readBigInt64BE=function(e){e=e>>>0,Ge(e,"offset");let t=this[e],r=this[e+7];(t===void 0||r===void 0)&&nt(e,this.length-8);let o=(t<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(o)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r)};m.prototype.readFloatLE=function(e,t){return e=e>>>0,t||se(e,4,this.length),tt(this,e,!0,23,4)};m.prototype.readFloatBE=function(e,t){return e=e>>>0,t||se(e,4,this.length),tt(this,e,!1,23,4)};m.prototype.readDoubleLE=function(e,t){return e=e>>>0,t||se(e,8,this.length),tt(this,e,!0,52,8)};m.prototype.readDoubleBE=function(e,t){return e=e>>>0,t||se(e,8,this.length),tt(this,e,!1,52,8)};function pe(n,e,t,r,o,s){if(!m.isBuffer(n))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<s)throw new RangeError('"value" argument is out of bounds');if(t+r>n.length)throw new RangeError("Index out of range")}m.prototype.writeUintLE=m.prototype.writeUIntLE=function(e,t,r,o){if(e=+e,t=t>>>0,r=r>>>0,!o){let c=Math.pow(2,8*r)-1;pe(this,e,t,r,c,0)}let s=1,i=0;for(this[t]=e&255;++i<r&&(s*=256);)this[t+i]=e/s&255;return t+r};m.prototype.writeUintBE=m.prototype.writeUIntBE=function(e,t,r,o){if(e=+e,t=t>>>0,r=r>>>0,!o){let c=Math.pow(2,8*r)-1;pe(this,e,t,r,c,0)}let s=r-1,i=1;for(this[t+s]=e&255;--s>=0&&(i*=256);)this[t+s]=e/i&255;return t+r};m.prototype.writeUint8=m.prototype.writeUInt8=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,1,255,0),this[t]=e&255,t+1};m.prototype.writeUint16LE=m.prototype.writeUInt16LE=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,2,65535,0),this[t]=e&255,this[t+1]=e>>>8,t+2};m.prototype.writeUint16BE=m.prototype.writeUInt16BE=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=e&255,t+2};m.prototype.writeUint32LE=m.prototype.writeUInt32LE=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=e&255,t+4};m.prototype.writeUint32BE=m.prototype.writeUInt32BE=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4};function kr(n,e,t,r,o){jr(e,r,o,n,t,7);let s=Number(e&BigInt(4294967295));n[t++]=s,s=s>>8,n[t++]=s,s=s>>8,n[t++]=s,s=s>>8,n[t++]=s;let i=Number(e>>BigInt(32)&BigInt(4294967295));return n[t++]=i,i=i>>8,n[t++]=i,i=i>>8,n[t++]=i,i=i>>8,n[t++]=i,t}function Nr(n,e,t,r,o){jr(e,r,o,n,t,7);let s=Number(e&BigInt(4294967295));n[t+7]=s,s=s>>8,n[t+6]=s,s=s>>8,n[t+5]=s,s=s>>8,n[t+4]=s;let i=Number(e>>BigInt(32)&BigInt(4294967295));return n[t+3]=i,i=i>>8,n[t+2]=i,i=i>>8,n[t+1]=i,i=i>>8,n[t]=i,t+8}m.prototype.writeBigUInt64LE=function(e,t=0){return kr(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))};m.prototype.writeBigUInt64BE=function(e,t=0){return Nr(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))};m.prototype.writeIntLE=function(e,t,r,o){if(e=+e,t=t>>>0,!o){let a=Math.pow(2,8*r-1);pe(this,e,t,r,a-1,-a)}let s=0,i=1,c=0;for(this[t]=e&255;++s<r&&(i*=256);)e<0&&c===0&&this[t+s-1]!==0&&(c=1),this[t+s]=(e/i>>0)-c&255;return t+r};m.prototype.writeIntBE=function(e,t,r,o){if(e=+e,t=t>>>0,!o){let a=Math.pow(2,8*r-1);pe(this,e,t,r,a-1,-a)}let s=r-1,i=1,c=0;for(this[t+s]=e&255;--s>=0&&(i*=256);)e<0&&c===0&&this[t+s+1]!==0&&(c=1),this[t+s]=(e/i>>0)-c&255;return t+r};m.prototype.writeInt8=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=e&255,t+1};m.prototype.writeInt16LE=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,2,32767,-32768),this[t]=e&255,this[t+1]=e>>>8,t+2};m.prototype.writeInt16BE=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=e&255,t+2};m.prototype.writeInt32LE=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,4,2147483647,-2147483648),this[t]=e&255,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4};m.prototype.writeInt32BE=function(e,t,r){return e=+e,t=t>>>0,r||pe(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4};m.prototype.writeBigInt64LE=function(e,t=0){return kr(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};m.prototype.writeBigInt64BE=function(e,t=0){return Nr(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};function Mr(n,e,t,r,o,s){if(t+r>n.length)throw new RangeError("Index out of range");if(t<0)throw new RangeError("Index out of range")}function Rr(n,e,t,r,o){return e=+e,t=t>>>0,o||Mr(n,e,t,4,34028234663852886e22,-34028234663852886e22),$t(n,e,t,r,23,4),t+4}m.prototype.writeFloatLE=function(e,t,r){return Rr(this,e,t,!0,r)};m.prototype.writeFloatBE=function(e,t,r){return Rr(this,e,t,!1,r)};function Or(n,e,t,r,o){return e=+e,t=t>>>0,o||Mr(n,e,t,8,17976931348623157e292,-17976931348623157e292),$t(n,e,t,r,52,8),t+8}m.prototype.writeDoubleLE=function(e,t,r){return Or(this,e,t,!0,r)};m.prototype.writeDoubleBE=function(e,t,r){return Or(this,e,t,!1,r)};m.prototype.copy=function(e,t,r,o){if(!m.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),!o&&o!==0&&(o=this.length),t>=e.length&&(t=e.length),t||(t=0),o>0&&o<r&&(o=r),o===r||e.length===0||this.length===0)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(o<0)throw new RangeError("sourceEnd out of bounds");o>this.length&&(o=this.length),e.length-t<o-r&&(o=e.length-t+r);let s=o-r;return this===e?this.copyWithin(t,r,o):Uint8Array.prototype.set.call(e,this.subarray(r,o),t),s};m.prototype.fill=function(e,t,r,o){if(typeof e=="string"){if(typeof t=="string"?(o=t,t=0,r=this.length):typeof r=="string"&&(o=r,r=this.length),o!==void 0&&typeof o!="string")throw new TypeError("encoding must be a string");if(typeof o=="string"&&!m.isEncoding(o))throw new TypeError("Unknown encoding: "+o);if(e.length===1){let i=e.charCodeAt(0);(o==="utf8"&&i<128||o==="latin1")&&(e=i)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;t=t>>>0,r=r===void 0?this.length:r>>>0,e||(e=0);let s;if(typeof e=="number")for(s=t;s<r;++s)this[s]=e;else{let i=m.isBuffer(e)?e:m.from(e,o),c=i.length;if(c===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(s=0;s<r-t;++s)this[s+t]=i[s%c]}return this};var $e={};function Qt(n,e,t){$e[n]=class extends t{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${n}]`,this.stack,delete this.name}get code(){return n}set code(o){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:o,writable:!0})}toString(){return`${this.name} [${n}]: ${this.message}`}}}Qt("ERR_BUFFER_OUT_OF_BOUNDS",function(n){return n?`${n} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);Qt("ERR_INVALID_ARG_TYPE",function(n,e){return`The "${n}" argument must be of type number. Received type ${typeof e}`},TypeError);Qt("ERR_OUT_OF_RANGE",function(n,e,t){let r=`The value of "${n}" is out of range.`,o=t;return Number.isInteger(t)&&Math.abs(t)>2**32?o=Ir(String(t)):typeof t=="bigint"&&(o=String(t),(t>BigInt(2)**BigInt(32)||t<-(BigInt(2)**BigInt(32)))&&(o=Ir(o)),o+="n"),r+=` It must be ${e}. Received ${o}`,r},RangeError);function Ir(n){let e="",t=n.length,r=n[0]==="-"?1:0;for(;t>=r+4;t-=3)e=`_${n.slice(t-3,t)}${e}`;return`${n.slice(0,t)}${e}`}function js(n,e,t){Ge(e,"offset"),(n[e]===void 0||n[e+t]===void 0)&&nt(e,n.length-(t+1))}function jr(n,e,t,r,o,s){if(n>t||n<e){let i=typeof e=="bigint"?"n":"",c;throw s>3?e===0||e===BigInt(0)?c=`>= 0${i} and < 2${i} ** ${(s+1)*8}${i}`:c=`>= -(2${i} ** ${(s+1)*8-1}${i}) and < 2 ** ${(s+1)*8-1}${i}`:c=`>= ${e}${i} and <= ${t}${i}`,new $e.ERR_OUT_OF_RANGE("value",c,n)}js(r,o,s)}function Ge(n,e){if(typeof n!="number")throw new $e.ERR_INVALID_ARG_TYPE(e,"number",n)}function nt(n,e,t){throw Math.floor(n)!==n?(Ge(n,t),new $e.ERR_OUT_OF_RANGE(t||"offset","an integer",n)):e<0?new $e.ERR_BUFFER_OUT_OF_BOUNDS:new $e.ERR_OUT_OF_RANGE(t||"offset",`>= ${t?1:0} and <= ${e}`,n)}var Ps=/[^+/0-9A-Za-z-_]/g;function Fs(n){if(n=n.split("=")[0],n=n.trim().replace(Ps,""),n.length<2)return"";for(;n.length%4!==0;)n=n+"=";return n}function Wt(n,e){e=e||1/0;let t,r=n.length,o=null,s=[];for(let i=0;i<r;++i){if(t=n.charCodeAt(i),t>55295&&t<57344){if(!o){if(t>56319){(e-=3)>-1&&s.push(239,191,189);continue}else if(i+1===r){(e-=3)>-1&&s.push(239,191,189);continue}o=t;continue}if(t<56320){(e-=3)>-1&&s.push(239,191,189),o=t;continue}t=(o-55296<<10|t-56320)+65536}else o&&(e-=3)>-1&&s.push(239,191,189);if(o=null,t<128){if((e-=1)<0)break;s.push(t)}else if(t<2048){if((e-=2)<0)break;s.push(t>>6|192,t&63|128)}else if(t<65536){if((e-=3)<0)break;s.push(t>>12|224,t>>6&63|128,t&63|128)}else if(t<1114112){if((e-=4)<0)break;s.push(t>>18|240,t>>12&63|128,t>>6&63|128,t&63|128)}else throw new Error("Invalid code point")}return s}function Us(n){let e=[];for(let t=0;t<n.length;++t)e.push(n.charCodeAt(t)&255);return e}function Ds(n,e){let t,r,o,s=[];for(let i=0;i<n.length&&!((e-=2)<0);++i)t=n.charCodeAt(i),r=t>>8,o=t%256,s.push(o),s.push(r);return s}function Pr(n){return vr(Fs(n))}function bt(n,e,t,r){let o;for(o=0;o<r&&!(o+t>=e.length||o>=n.length);++o)e[o+t]=n[o];return o}var Bs=function(){let n="0123456789abcdef",e=new Array(256);for(let t=0;t<16;++t){let r=t*16;for(let o=0;o<16;++o)e[r+o]=n[t]+n[o]}return e}();var Pt={};us(Pt,{ArtMethod:()=>xt,ArtStackVisitor:()=>kn,DVM_JNI_ENV_OFFSET_SELF:()=>no,HandleVector:()=>lt,VariableSizedHandleScope:()=>dt,backtrace:()=>Gn,deoptimizeBootImage:()=>qn,deoptimizeEverything:()=>Wn,deoptimizeMethod:()=>Zn,ensureClassInitialized:()=>lc,getAndroidApiLevel:()=>ee,getAndroidVersion:()=>ut,getApi:()=>J,getArtClassSpec:()=>Dn,getArtFieldSpec:()=>Bn,getArtMethodSpec:()=>Ie,getArtThreadFromEnv:()=>jt,getArtThreadSpec:()=>We,makeArtClassLoaderVisitor:()=>$n,makeArtClassVisitor:()=>Jn,makeMethodMangler:()=>qc,makeObjectVisitorPredicate:()=>Qn,revertGlobalPatches:()=>Hn,translateMethod:()=>Kc,withAllArtThreadsSuspended:()=>zn,withRunnableArtThread:()=>Ee});var{pageSize:Yt,pointerSize:Vs}=Process,Xt=class{constructor(e){this.sliceSize=e,this.slicesPerPage=Yt/e,this.pages=[],this.free=[]}allocateSlice(e,t){let r=e.near===void 0,o=t===1;if(r&&o){let s=this.free.pop();if(s!==void 0)return s}else if(t<Yt){let{free:s}=this,i=s.length,c=o?null:ptr(t-1);for(let a=0;a!==i;a++){let l=s[a],d=r||this._isSliceNear(l,e),u=o||l.and(c).isNull();if(d&&u)return s.splice(a,1)[0]}}return this._allocatePage(e)}_allocatePage(e){let t=Memory.alloc(Yt,e),{sliceSize:r,slicesPerPage:o}=this;for(let s=1;s!==o;s++){let i=t.add(s*r);this.free.push(i)}return this.pages.push(t),t}_isSliceNear(e,t){let r=e.add(this.sliceSize),{near:o,maxDistance:s}=t,i=Fr(o.sub(e)),c=Fr(o.sub(r));return i.compare(s)<=0&&c.compare(s)<=0}freeSlice(e){this.free.push(e)}};function Fr(n){let e=Vs===4?31:63,t=ptr(1).shl(e).not();return n.and(t)}function en(n){return new Xt(n)}function de(n,e){if(e!==0)throw new Error(n+" failed: "+e)}var yt={v1_0:805371904,v1_2:805372416},Et={canTagObjects:1},{pointerSize:zs}=Process,Js={exceptions:"propagate"};function xe(n,e){this.handle=n,this.vm=e,this.vtable=n.readPointer()}xe.prototype.deallocate=rt(47,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});xe.prototype.getLoadedClasses=rt(78,"int32",["pointer","pointer","pointer"],function(n,e,t){let r=n(this.handle,e,t);de("EnvJvmti::getLoadedClasses",r)});xe.prototype.iterateOverInstancesOfClass=rt(112,"int32",["pointer","pointer","int","pointer","pointer"],function(n,e,t,r,o){let s=n(this.handle,e,t,r,o);de("EnvJvmti::iterateOverInstancesOfClass",s)});xe.prototype.getObjectsWithTags=rt(114,"int32",["pointer","int","pointer","pointer","pointer","pointer"],function(n,e,t,r,o,s){let i=n(this.handle,e,t,r,o,s);de("EnvJvmti::getObjectsWithTags",i)});xe.prototype.addCapabilities=rt(142,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});function rt(n,e,t,r){let o=null;return function(){o===null&&(o=new NativeFunction(this.vtable.add((n-1)*zs).readPointer(),e,t,Js));let s=[o];return s=s.concat.apply(s,arguments),r.apply(this,s)}}function Me(n,e,{limit:t}){let r=n,o=null;for(let s=0;s!==t;s++){let i=Instruction.parse(r),c=e(i,o);if(c!==null)return c;r=i.next,o=i}return null}function le(n){let e=null,t=!1;return function(...r){return t||(e=n(...r),t=!0),e}}function y(n,e){this.handle=n,this.vm=e}var vt=Process.pointerSize,Re=2,$s=28,Gs=34,Hs=37,Zs=40,Ws=43,qs=46,Ks=49,Qs=52,Ys=55,Xs=58,ei=61,ti=64,ni=67,ri=70,oi=73,si=76,ii=79,ai=82,ci=85,li=88,di=91,ui=114,pi=117,fi=120,hi=123,_i=126,mi=129,gi=132,bi=135,yi=138,Ei=141,vi=95,Si=96,wi=97,Ii=98,Ti=99,Ci=100,Ai=101,Li=102,xi=103,ki=104,Ni=105,Mi=106,Ri=107,Oi=108,ji=109,Pi=110,Fi=111,Ui=112,Di=145,Bi=146,Vi=147,zi=148,Ji=149,$i=150,Gi=151,Hi=152,Zi=153,Wi=154,qi=155,Ki=156,Qi=157,Yi=158,Xi=159,ea=160,ta=161,na=162,ra={pointer:Gs,uint8:Hs,int8:Zs,uint16:Ws,int16:qs,int32:Ks,int64:Qs,float:Ys,double:Xs,void:ei},oa={pointer:ti,uint8:ni,int8:ri,uint16:oi,int16:si,int32:ii,int64:ai,float:ci,double:li,void:di},sa={pointer:ui,uint8:pi,int8:fi,uint16:hi,int16:_i,int32:mi,int64:gi,float:bi,double:yi,void:Ei},ia={pointer:vi,uint8:Si,int8:wi,uint16:Ii,int16:Ti,int32:Ci,int64:Ai,float:Li,double:xi},aa={pointer:ki,uint8:Ni,int8:Mi,uint16:Ri,int16:Oi,int32:ji,int64:Pi,float:Fi,double:Ui},ca={pointer:Di,uint8:Bi,int8:Vi,uint16:zi,int16:Ji,int32:$i,int64:Gi,float:Hi,double:Zi},la={pointer:Wi,uint8:qi,int8:Ki,uint16:Qi,int16:Yi,int32:Xi,int64:ea,float:ta,double:na},Dr={exceptions:"propagate"},tn=null,fn=[];y.dispose=function(n){fn.forEach(n.deleteGlobalRef,n),fn=[]};function Fe(n){return fn.push(n),n}function St(n){return tn===null&&(tn=n.handle.readPointer()),tn}function A(n,e,t,r){let o=null;return function(){o===null&&(o=new NativeFunction(St(this).add(n*vt).readPointer(),e,t,Dr));let s=[o];return s=s.concat.apply(s,arguments),r.apply(this,s)}}y.prototype.getVersion=A(4,"int32",["pointer"],function(n){return n(this.handle)});y.prototype.findClass=A(6,"pointer",["pointer","pointer"],function(n,e){let t=n(this.handle,Memory.allocUtf8String(e));return this.throwIfExceptionPending(),t});y.prototype.throwIfExceptionPending=function(){let n=this.exceptionOccurred();if(n.isNull())return;this.exceptionClear();let e=this.newGlobalRef(n);this.deleteLocalRef(n);let t=this.vaMethod("pointer",[])(this.handle,e,this.javaLangObject().toString),r=this.stringFromJni(t);this.deleteLocalRef(t);let o=new Error(r);throw o.$h=e,Script.bindWeak(o,da(this.vm,e)),o};function da(n,e){return function(){n.perform(t=>{t.deleteGlobalRef(e)})}}y.prototype.fromReflectedMethod=A(7,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.fromReflectedField=A(8,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.toReflectedMethod=A(9,"pointer",["pointer","pointer","pointer","uint8"],function(n,e,t,r){return n(this.handle,e,t,r)});y.prototype.getSuperclass=A(10,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.isAssignableFrom=A(11,"uint8",["pointer","pointer","pointer"],function(n,e,t){return!!n(this.handle,e,t)});y.prototype.toReflectedField=A(12,"pointer",["pointer","pointer","pointer","uint8"],function(n,e,t,r){return n(this.handle,e,t,r)});y.prototype.throw=A(13,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.exceptionOccurred=A(15,"pointer",["pointer"],function(n){return n(this.handle)});y.prototype.exceptionDescribe=A(16,"void",["pointer"],function(n){n(this.handle)});y.prototype.exceptionClear=A(17,"void",["pointer"],function(n){n(this.handle)});y.prototype.pushLocalFrame=A(19,"int32",["pointer","int32"],function(n,e){return n(this.handle,e)});y.prototype.popLocalFrame=A(20,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.newGlobalRef=A(21,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.deleteGlobalRef=A(22,"void",["pointer","pointer"],function(n,e){n(this.handle,e)});y.prototype.deleteLocalRef=A(23,"void",["pointer","pointer"],function(n,e){n(this.handle,e)});y.prototype.isSameObject=A(24,"uint8",["pointer","pointer","pointer"],function(n,e,t){return!!n(this.handle,e,t)});y.prototype.newLocalRef=A(25,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.allocObject=A(27,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.getObjectClass=A(31,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.isInstanceOf=A(32,"uint8",["pointer","pointer","pointer"],function(n,e,t){return!!n(this.handle,e,t)});y.prototype.getMethodId=A(33,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});y.prototype.getFieldId=A(94,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});y.prototype.getIntField=A(100,"int32",["pointer","pointer","pointer"],function(n,e,t){return n(this.handle,e,t)});y.prototype.getStaticMethodId=A(113,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});y.prototype.getStaticFieldId=A(144,"pointer",["pointer","pointer","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,Memory.allocUtf8String(t),Memory.allocUtf8String(r))});y.prototype.getStaticIntField=A(150,"int32",["pointer","pointer","pointer"],function(n,e,t){return n(this.handle,e,t)});y.prototype.getStringLength=A(164,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.getStringChars=A(165,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.releaseStringChars=A(166,"void",["pointer","pointer","pointer"],function(n,e,t){n(this.handle,e,t)});y.prototype.newStringUtf=A(167,"pointer",["pointer","pointer"],function(n,e){let t=Memory.allocUtf8String(e);return n(this.handle,t)});y.prototype.getStringUtfChars=A(169,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.releaseStringUtfChars=A(170,"void",["pointer","pointer","pointer"],function(n,e,t){n(this.handle,e,t)});y.prototype.getArrayLength=A(171,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.newObjectArray=A(172,"pointer",["pointer","int32","pointer","pointer"],function(n,e,t,r){return n(this.handle,e,t,r)});y.prototype.getObjectArrayElement=A(173,"pointer",["pointer","pointer","int32"],function(n,e,t){return n(this.handle,e,t)});y.prototype.setObjectArrayElement=A(174,"void",["pointer","pointer","int32","pointer"],function(n,e,t,r){n(this.handle,e,t,r)});y.prototype.newBooleanArray=A(175,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});y.prototype.newByteArray=A(176,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});y.prototype.newCharArray=A(177,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});y.prototype.newShortArray=A(178,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});y.prototype.newIntArray=A(179,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});y.prototype.newLongArray=A(180,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});y.prototype.newFloatArray=A(181,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});y.prototype.newDoubleArray=A(182,"pointer",["pointer","int32"],function(n,e){return n(this.handle,e)});y.prototype.getBooleanArrayElements=A(183,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.getByteArrayElements=A(184,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.getCharArrayElements=A(185,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.getShortArrayElements=A(186,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.getIntArrayElements=A(187,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.getLongArrayElements=A(188,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.getFloatArrayElements=A(189,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.getDoubleArrayElements=A(190,"pointer",["pointer","pointer","pointer"],function(n,e){return n(this.handle,e,NULL)});y.prototype.releaseBooleanArrayElements=A(191,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});y.prototype.releaseByteArrayElements=A(192,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});y.prototype.releaseCharArrayElements=A(193,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});y.prototype.releaseShortArrayElements=A(194,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});y.prototype.releaseIntArrayElements=A(195,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});y.prototype.releaseLongArrayElements=A(196,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});y.prototype.releaseFloatArrayElements=A(197,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});y.prototype.releaseDoubleArrayElements=A(198,"pointer",["pointer","pointer","pointer","int32"],function(n,e,t){n(this.handle,e,t,Re)});y.prototype.getByteArrayRegion=A(200,"void",["pointer","pointer","int","int","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});y.prototype.setBooleanArrayRegion=A(207,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});y.prototype.setByteArrayRegion=A(208,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});y.prototype.setCharArrayRegion=A(209,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});y.prototype.setShortArrayRegion=A(210,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});y.prototype.setIntArrayRegion=A(211,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});y.prototype.setLongArrayRegion=A(212,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});y.prototype.setFloatArrayRegion=A(213,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});y.prototype.setDoubleArrayRegion=A(214,"void",["pointer","pointer","int32","int32","pointer"],function(n,e,t,r,o){n(this.handle,e,t,r,o)});y.prototype.registerNatives=A(215,"int32",["pointer","pointer","pointer","int32"],function(n,e,t,r){return n(this.handle,e,t,r)});y.prototype.monitorEnter=A(217,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.monitorExit=A(218,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.getDirectBufferAddress=A(230,"pointer",["pointer","pointer"],function(n,e){return n(this.handle,e)});y.prototype.getObjectRefType=A(232,"int32",["pointer","pointer"],function(n,e){return n(this.handle,e)});var Ur=new Map;function wt(n,e,t,r){return _n(this,"p",pa,n,e,t,r)}function hn(n,e,t,r){return _n(this,"v",fa,n,e,t,r)}function ua(n,e,t,r){return _n(this,"n",ha,n,e,t,r)}function _n(n,e,t,r,o,s,i){if(i!==void 0)return t(n,r,o,s,i);let c=[r,e,o].concat(s).join("|"),a=Ur.get(c);return a===void 0&&(a=t(n,r,o,s,Dr),Ur.set(c,a)),a}function pa(n,e,t,r,o){return new NativeFunction(St(n).add(e*vt).readPointer(),t,["pointer","pointer","pointer"].concat(r),o)}function fa(n,e,t,r,o){return new NativeFunction(St(n).add(e*vt).readPointer(),t,["pointer","pointer","pointer","..."].concat(r),o)}function ha(n,e,t,r,o){return new NativeFunction(St(n).add(e*vt).readPointer(),t,["pointer","pointer","pointer","pointer","..."].concat(r),o)}y.prototype.constructor=function(n,e){return hn.call(this,$s,"pointer",n,e)};y.prototype.vaMethod=function(n,e,t){let r=ra[n];if(r===void 0)throw new Error("Unsupported type: "+n);return hn.call(this,r,n,e,t)};y.prototype.nonvirtualVaMethod=function(n,e,t){let r=oa[n];if(r===void 0)throw new Error("Unsupported type: "+n);return ua.call(this,r,n,e,t)};y.prototype.staticVaMethod=function(n,e,t){let r=sa[n];if(r===void 0)throw new Error("Unsupported type: "+n);return hn.call(this,r,n,e,t)};y.prototype.getField=function(n){let e=ia[n];if(e===void 0)throw new Error("Unsupported type: "+n);return wt.call(this,e,n,[])};y.prototype.getStaticField=function(n){let e=ca[n];if(e===void 0)throw new Error("Unsupported type: "+n);return wt.call(this,e,n,[])};y.prototype.setField=function(n){let e=aa[n];if(e===void 0)throw new Error("Unsupported type: "+n);return wt.call(this,e,"void",[n])};y.prototype.setStaticField=function(n){let e=la[n];if(e===void 0)throw new Error("Unsupported type: "+n);return wt.call(this,e,"void",[n])};var nn=null;y.prototype.javaLangClass=function(){if(nn===null){let n=this.findClass("java/lang/Class");try{let e=this.getMethodId.bind(this,n);nn={handle:Fe(this.newGlobalRef(n)),getName:e("getName","()Ljava/lang/String;"),getSimpleName:e("getSimpleName","()Ljava/lang/String;"),getGenericSuperclass:e("getGenericSuperclass","()Ljava/lang/reflect/Type;"),getDeclaredConstructors:e("getDeclaredConstructors","()[Ljava/lang/reflect/Constructor;"),getDeclaredMethods:e("getDeclaredMethods","()[Ljava/lang/reflect/Method;"),getDeclaredFields:e("getDeclaredFields","()[Ljava/lang/reflect/Field;"),isArray:e("isArray","()Z"),isPrimitive:e("isPrimitive","()Z"),isInterface:e("isInterface","()Z"),getComponentType:e("getComponentType","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(n)}}return nn};var rn=null;y.prototype.javaLangObject=function(){if(rn===null){let n=this.findClass("java/lang/Object");try{let e=this.getMethodId.bind(this,n);rn={handle:Fe(this.newGlobalRef(n)),toString:e("toString","()Ljava/lang/String;"),getClass:e("getClass","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(n)}}return rn};var on=null;y.prototype.javaLangReflectConstructor=function(){if(on===null){let n=this.findClass("java/lang/reflect/Constructor");try{on={getGenericParameterTypes:this.getMethodId(n,"getGenericParameterTypes","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return on};var sn=null;y.prototype.javaLangReflectMethod=function(){if(sn===null){let n=this.findClass("java/lang/reflect/Method");try{let e=this.getMethodId.bind(this,n);sn={getName:e("getName","()Ljava/lang/String;"),getGenericParameterTypes:e("getGenericParameterTypes","()[Ljava/lang/reflect/Type;"),getParameterTypes:e("getParameterTypes","()[Ljava/lang/Class;"),getGenericReturnType:e("getGenericReturnType","()Ljava/lang/reflect/Type;"),getGenericExceptionTypes:e("getGenericExceptionTypes","()[Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),isVarArgs:e("isVarArgs","()Z")}}finally{this.deleteLocalRef(n)}}return sn};var an=null;y.prototype.javaLangReflectField=function(){if(an===null){let n=this.findClass("java/lang/reflect/Field");try{let e=this.getMethodId.bind(this,n);an={getName:e("getName","()Ljava/lang/String;"),getType:e("getType","()Ljava/lang/Class;"),getGenericType:e("getGenericType","()Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),toString:e("toString","()Ljava/lang/String;")}}finally{this.deleteLocalRef(n)}}return an};var cn=null;y.prototype.javaLangReflectTypeVariable=function(){if(cn===null){let n=this.findClass("java/lang/reflect/TypeVariable");try{let e=this.getMethodId.bind(this,n);cn={handle:Fe(this.newGlobalRef(n)),getName:e("getName","()Ljava/lang/String;"),getBounds:e("getBounds","()[Ljava/lang/reflect/Type;"),getGenericDeclaration:e("getGenericDeclaration","()Ljava/lang/reflect/GenericDeclaration;")}}finally{this.deleteLocalRef(n)}}return cn};var ln=null;y.prototype.javaLangReflectWildcardType=function(){if(ln===null){let n=this.findClass("java/lang/reflect/WildcardType");try{let e=this.getMethodId.bind(this,n);ln={handle:Fe(this.newGlobalRef(n)),getLowerBounds:e("getLowerBounds","()[Ljava/lang/reflect/Type;"),getUpperBounds:e("getUpperBounds","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return ln};var dn=null;y.prototype.javaLangReflectGenericArrayType=function(){if(dn===null){let n=this.findClass("java/lang/reflect/GenericArrayType");try{dn={handle:Fe(this.newGlobalRef(n)),getGenericComponentType:this.getMethodId(n,"getGenericComponentType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return dn};var un=null;y.prototype.javaLangReflectParameterizedType=function(){if(un===null){let n=this.findClass("java/lang/reflect/ParameterizedType");try{let e=this.getMethodId.bind(this,n);un={handle:Fe(this.newGlobalRef(n)),getActualTypeArguments:e("getActualTypeArguments","()[Ljava/lang/reflect/Type;"),getRawType:e("getRawType","()Ljava/lang/reflect/Type;"),getOwnerType:e("getOwnerType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(n)}}return un};var pn=null;y.prototype.javaLangString=function(){if(pn===null){let n=this.findClass("java/lang/String");try{pn={handle:Fe(this.newGlobalRef(n))}}finally{this.deleteLocalRef(n)}}return pn};y.prototype.getClassName=function(n){let e=this.vaMethod("pointer",[])(this.handle,n,this.javaLangClass().getName);try{return this.stringFromJni(e)}finally{this.deleteLocalRef(e)}};y.prototype.getObjectClassName=function(n){let e=this.getObjectClass(n);try{return this.getClassName(e)}finally{this.deleteLocalRef(e)}};y.prototype.getActualTypeArgument=function(n){let e=this.vaMethod("pointer",[])(this.handle,n,this.javaLangReflectParameterizedType().getActualTypeArguments);if(this.throwIfExceptionPending(),!e.isNull())try{return this.getTypeNameFromFirstTypeElement(e)}finally{this.deleteLocalRef(e)}};y.prototype.getTypeNameFromFirstTypeElement=function(n){if(this.getArrayLength(n)>0){let t=this.getObjectArrayElement(n,0);try{return this.getTypeName(t)}finally{this.deleteLocalRef(t)}}else return"java.lang.Object"};y.prototype.getTypeName=function(n,e){let t=this.vaMethod("pointer",[]);if(this.isInstanceOf(n,this.javaLangClass().handle))return this.getClassName(n);if(this.isInstanceOf(n,this.javaLangReflectGenericArrayType().handle))return this.getArrayTypeName(n);if(this.isInstanceOf(n,this.javaLangReflectParameterizedType().handle)){let r=t(this.handle,n,this.javaLangReflectParameterizedType().getRawType);this.throwIfExceptionPending();let o;try{o=this.getTypeName(r)}finally{this.deleteLocalRef(r)}return e&&(o+="<"+this.getActualTypeArgument(n)+">"),o}else return this.isInstanceOf(n,this.javaLangReflectTypeVariable().handle)||this.isInstanceOf(n,this.javaLangReflectWildcardType().handle),"java.lang.Object"};y.prototype.getArrayTypeName=function(n){let e=this.vaMethod("pointer",[]);if(this.isInstanceOf(n,this.javaLangClass().handle))return this.getClassName(n);if(this.isInstanceOf(n,this.javaLangReflectGenericArrayType().handle)){let t=e(this.handle,n,this.javaLangReflectGenericArrayType().getGenericComponentType);this.throwIfExceptionPending();try{return"[L"+this.getTypeName(t)+";"}finally{this.deleteLocalRef(t)}}else return"[Ljava.lang.Object;"};y.prototype.stringFromJni=function(n){let e=this.getStringChars(n);if(e.isNull())throw new Error("Unable to access string");try{let t=this.getStringLength(n);return e.readUtf16String(t)}finally{this.releaseStringChars(n,e)}};var Br=65542,He=Process.pointerSize,mn=Process.getCurrentThreadId(),Ue=new Map,ot=new Map;function we(n){let e=n.vm,t=null,r=null,o=null;function s(){let c=e.readPointer(),a={exceptions:"propagate"};t=new NativeFunction(c.add(4*He).readPointer(),"int32",["pointer","pointer","pointer"],a),r=new NativeFunction(c.add(5*He).readPointer(),"int32",["pointer"],a),o=new NativeFunction(c.add(6*He).readPointer(),"int32",["pointer","pointer","int32"],a)}this.handle=e,this.perform=function(c){let a=Process.getCurrentThreadId(),l=i(a);if(l!==null)return c(l);let d=this._tryGetEnv(),u=d!==null;u||(d=this.attachCurrentThread(),Ue.set(a,!0)),this.link(a,d);try{return c(d)}finally{let f=a===mn;if(f||this.unlink(a),!u&&!f){let p=Ue.get(a);Ue.delete(a),p&&this.detachCurrentThread()}}},this.attachCurrentThread=function(){let c=Memory.alloc(He);return de("VM::AttachCurrentThread",t(e,c,NULL)),new y(c.readPointer(),this)},this.detachCurrentThread=function(){de("VM::DetachCurrentThread",r(e))},this.preventDetachDueToClassLoader=function(){let c=Process.getCurrentThreadId();Ue.has(c)&&Ue.set(c,!1)},this.getEnv=function(){let c=i(Process.getCurrentThreadId());if(c!==null)return c;let a=Memory.alloc(He),l=o(e,a,Br);if(l===-2)throw new Error("Current thread is not attached to the Java VM; please move this code inside a Java.perform() callback");return de("VM::GetEnv",l),new y(a.readPointer(),this)},this.tryGetEnv=function(){let c=i(Process.getCurrentThreadId());return c!==null?c:this._tryGetEnv()},this._tryGetEnv=function(){let c=this.tryGetEnvHandle(Br);return c===null?null:new y(c,this)},this.tryGetEnvHandle=function(c){let a=Memory.alloc(He);return o(e,a,c)!==0?null:a.readPointer()},this.makeHandleDestructor=function(c){return()=>{this.perform(a=>{a.deleteGlobalRef(c)})}},this.link=function(c,a){let l=ot.get(c);l===void 0?ot.set(c,[a,1]):l[1]++},this.unlink=function(c){let a=ot.get(c);a[1]===1?ot.delete(c):a[1]--};function i(c){let a=ot.get(c);return a===void 0?null:a[0]}s.call(this)}we.dispose=function(n){Ue.get(mn)===!0&&(Ue.delete(mn),n.detachCurrentThread())};var _a=4,S=Process.pointerSize,{readU32:ma,readPointer:ga,writeU32:ba,writePointer:ya}=NativePointer.prototype,Ea=1,va=8,Sa=16,At=256,wa=524288,Ia=2097152,to=1073741824,Ta=524288,Ca=134217728,Vr=1048576,Aa=2097152,La=268435456,xa=268435456,ka=0,Cn=3,An=5,Fn=ptr(1).not(),Na=2147467263,Ma=4294963200,Ot=17*S,Ra=18*S,no=12,Oa=112,ja=116,Pa=0,bn=56,zr=4,Fa=8,Ua=10,Da=12,Ba=14,Va=28,za=36,Ja=0,$a=1,Ga=2,Ha=3,Za=4,Wa=5,qa=6,Ka=7,Jr=2147483648,Qa=28,ct=3*S,Ya=3*S,Xa=1,ec=1,ro=le(uc),tc=le(Ec),Ie=le(Sc),We=le(wc),nc=le(Ic),rc=le(Mc),ut=le(Lc),oo=le(xc),ee=le(kc),oc=le(Pc),sc=Process.arch==="ia32"?El:yl,q={exceptions:"propagate"},st={},yn=null,En=null,so=null,ce=null,Un=[],Lt=new Map,io=[],vn=null,$r=0,Gr=!1,Hr=!1,it=null,ic=[],Sn=null,It=null;function J(){return yn===null&&(yn=ac()),yn}function ac(){let n=Process.enumerateModules().filter(p=>/^lib(art|dvm).so$/.test(p.name)).filter(p=>!/\/system\/fake-libs/.test(p.path));if(n.length===0)return null;let e=n[0],t=e.name.indexOf("art")!==-1?"art":"dalvik",r=t==="art",o={module:e,find(p){let{module:_}=this,h=_.findExportByName(p);return h===null&&(h=_.findSymbolByName(p)),h},flavor:t,addLocalReference:null};o.isApiLevel34OrApexEquivalent=r&&(o.find("_ZN3art7AppInfo29GetPrimaryApkReferenceProfileEv")!==null||o.find("_ZN3art6Thread15RunFlipFunctionEPS0_")!==null);let s=r?{functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],artInterpreterToCompiledCodeBridge:function(p){this.artInterpreterToCompiledCodeBridge=p},_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art17ReaderWriterMutex13ExclusiveLockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveLock","void",["pointer","pointer"]],_ZN3art17ReaderWriterMutex15ExclusiveUnlockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveUnlock","void",["pointer","pointer"]],_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE:function(p){this["art::IndirectReferenceTable::Add"]=new NativeFunction(p,"pointer",["pointer","uint","pointer"],q)},_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE:function(p){this["art::IndirectReferenceTable::Add"]=new NativeFunction(p,"pointer",["pointer","uint","pointer"],q)},_ZN3art9JavaVMExt12DecodeGlobalEPv:function(p){let _;ee()>=26?_=sc(p,["pointer","pointer"]):_=new NativeFunction(p,"pointer",["pointer","pointer"],q),this["art::JavaVMExt::DecodeGlobal"]=function(h,g,b){return _(h,b)}},_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv:["art::JavaVMExt::DecodeGlobal","pointer",["pointer","pointer","pointer"]],_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZNK3art6Thread13DecodeJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZN3art10ThreadList10SuspendAllEPKcb:["art::ThreadList::SuspendAll","void",["pointer","pointer","bool"]],_ZN3art10ThreadList10SuspendAllEv:function(p){let _=new NativeFunction(p,"void",["pointer"],q);this["art::ThreadList::SuspendAll"]=function(h,g,b){return _(h)}},_ZN3art10ThreadList9ResumeAllEv:["art::ThreadList::ResumeAll","void",["pointer"]],_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE:["art::ClassLinker::VisitClasses","void",["pointer","pointer"]],_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_:function(p){let _=new NativeFunction(p,"void",["pointer","pointer","pointer"],q);this["art::ClassLinker::VisitClasses"]=function(h,g){_(h,g,NULL)}},_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE:["art::ClassLinker::VisitClassLoaders","void",["pointer","pointer"]],_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_:["art::gc::Heap::VisitObjects","void",["pointer","pointer","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:["art::gc::Heap::GetInstances","void",["pointer","pointer","pointer","int","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:function(p){let _=new NativeFunction(p,"void",["pointer","pointer","pointer","bool","int","pointer"],q);this["art::gc::Heap::GetInstances"]=function(h,g,b,v,I){_(h,g,b,0,v,I)}},_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","uint","bool"]],_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","size_t","bool"]],_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb:["art::StackVisitor::WalkStack","void",["pointer","bool"]],_ZNK3art12StackVisitor9GetMethodEv:["art::StackVisitor::GetMethod","pointer",["pointer"]],_ZNK3art12StackVisitor16DescribeLocationEv:function(p){this["art::StackVisitor::DescribeLocation"]=Ct(p,["pointer"])},_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv:function(p){this["art::StackVisitor::GetCurrentQuickFrameInfo"]=jc(p)},_ZN3art6Thread18GetLongJumpContextEv:["art::Thread::GetLongJumpContext","pointer",["pointer"]],_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE:function(p){this["art::mirror::Class::GetDescriptor"]=p},_ZN3art6mirror5Class11GetLocationEv:function(p){this["art::mirror::Class::GetLocation"]=Ct(p,["pointer"])},_ZN3art9ArtMethod12PrettyMethodEb:function(p){this["art::ArtMethod::PrettyMethod"]=Ct(p,["pointer","bool"])},_ZN3art12PrettyMethodEPNS_9ArtMethodEb:function(p){this["art::ArtMethod::PrettyMethodNullSafe"]=Ct(p,["pointer","bool"])},_ZN3art6Thread14CurrentFromGdbEv:["art::Thread::CurrentFromGdb","pointer",[]],_ZN3art6mirror6Object5CloneEPNS_6ThreadE:function(p){this["art::mirror::Object::Clone"]=new NativeFunction(p,"pointer",["pointer","pointer"],q)},_ZN3art6mirror6Object5CloneEPNS_6ThreadEm:function(p){let _=new NativeFunction(p,"pointer",["pointer","pointer","pointer"],q);this["art::mirror::Object::Clone"]=function(h,g){let b=NULL;return _(h,g,b)}},_ZN3art6mirror6Object5CloneEPNS_6ThreadEj:function(p){let _=new NativeFunction(p,"pointer",["pointer","pointer","uint"],q);this["art::mirror::Object::Clone"]=function(h,g){return _(h,g,0)}},_ZN3art3Dbg14SetJdwpAllowedEb:["art::Dbg::SetJdwpAllowed","void",["bool"]],_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE:["art::Dbg::ConfigureJdwp","void",["pointer"]],_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv:["art::InternalDebuggerControlCallback::StartDebugger","void",["pointer"]],_ZN3art3Dbg9StartJdwpEv:["art::Dbg::StartJdwp","void",[]],_ZN3art3Dbg8GoActiveEv:["art::Dbg::GoActive","void",[]],_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE:["art::Dbg::RequestDeoptimization","void",["pointer"]],_ZN3art3Dbg20ManageDeoptimizationEv:["art::Dbg::ManageDeoptimization","void",[]],_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv:["art::Instrumentation::EnableDeoptimization","void",["pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc:["art::Instrumentation::DeoptimizeEverything","void",["pointer","pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv:function(p){let _=new NativeFunction(p,"void",["pointer"],q);this["art::Instrumentation::DeoptimizeEverything"]=function(h,g){_(h)}},_ZN3art7Runtime19DeoptimizeBootImageEv:["art::Runtime::DeoptimizeBootImage","void",["pointer"]],_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE:["art::Instrumentation::Deoptimize","void",["pointer","pointer"]],_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID:["art::jni::JniIdManager::DecodeMethodId","pointer",["pointer","pointer"]],_ZN3art11interpreter18GetNterpEntryPointEv:["art::interpreter::GetNterpEntryPoint","pointer",[]],_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi:["art::Monitor::TranslateLocation","void",["pointer","uint32","pointer","pointer"]]},variables:{_ZN3art3Dbg9gRegistryE:function(p){this.isJdwpStarted=()=>!p.readPointer().isNull()},_ZN3art3Dbg15gDebuggerActiveE:function(p){this.isDebuggerActive=()=>!!p.readU8()}},optionals:new Set(["artInterpreterToCompiledCodeBridge","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE","_ZN3art9JavaVMExt12DecodeGlobalEPv","_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv","_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject","_ZNK3art6Thread13DecodeJObjectEP8_jobject","_ZN3art10ThreadList10SuspendAllEPKcb","_ZN3art10ThreadList10SuspendAllEv","_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE","_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_","_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE","_ZN3art6mirror6Object5CloneEPNS_6ThreadE","_ZN3art6mirror6Object5CloneEPNS_6ThreadEm","_ZN3art6mirror6Object5CloneEPNS_6ThreadEj","_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE","_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb","_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb","_ZNK3art12StackVisitor9GetMethodEv","_ZNK3art12StackVisitor16DescribeLocationEv","_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv","_ZN3art6Thread18GetLongJumpContextEv","_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE","_ZN3art6mirror5Class11GetLocationEv","_ZN3art9ArtMethod12PrettyMethodEb","_ZN3art12PrettyMethodEPNS_9ArtMethodEb","_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE","_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv","_ZN3art3Dbg15gDebuggerActiveE","_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv","_ZN3art7Runtime19DeoptimizeBootImageEv","_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE","_ZN3art3Dbg9StartJdwpEv","_ZN3art3Dbg8GoActiveEv","_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE","_ZN3art3Dbg20ManageDeoptimizationEv","_ZN3art3Dbg9gRegistryE","_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID","_ZN3art11interpreter18GetNterpEntryPointEv","_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi"])}:{functions:{_Z20dvmDecodeIndirectRefP6ThreadP8_jobject:["dvmDecodeIndirectRef","pointer",["pointer","pointer"]],_Z15dvmUseJNIBridgeP6MethodPv:["dvmUseJNIBridge","void",["pointer","pointer"]],_Z20dvmHeapSourceGetBasev:["dvmHeapSourceGetBase","pointer",[]],_Z21dvmHeapSourceGetLimitv:["dvmHeapSourceGetLimit","pointer",[]],_Z16dvmIsValidObjectPK6Object:["dvmIsValidObject","uint8",["pointer"]],JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]]},variables:{gDvmJni:function(p){this.gDvmJni=p},gDvm:function(p){this.gDvm=p}}},{functions:i={},variables:c={},optionals:a=new Set}=s,l=[];for(let[p,_]of Object.entries(i)){let h=o.find(p);h!==null?typeof _=="function"?_.call(o,h):o[_[0]]=new NativeFunction(h,_[1],_[2],q):a.has(p)||l.push(p)}for(let[p,_]of Object.entries(c)){let h=o.find(p);h!==null?_.call(o,h):a.has(p)||l.push(p)}if(l.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+l.join(", "));let d=Memory.alloc(S),u=Memory.alloc(_a);if(de("JNI_GetCreatedJavaVMs",o.JNI_GetCreatedJavaVMs(d,1,u)),u.readInt()===0)return null;if(o.vm=d.readPointer(),r){let p=ee(),_;p>=27?_=33554432:p>=24?_=16777216:_=0,o.kAccCompileDontBother=_;let h=o.vm.add(S).readPointer();o.artRuntime=h;let g=ro(o),b=g.offset,v=b.instrumentation;o.artInstrumentation=v!==null?h.add(v):null,o.artHeap=h.add(b.heap).readPointer(),o.artThreadList=h.add(b.threadList).readPointer();let I=h.add(b.classLinker).readPointer(),x=vc(h,g).offset,N=I.add(x.quickResolutionTrampoline).readPointer(),M=I.add(x.quickImtConflictTrampoline).readPointer(),k=I.add(x.quickGenericJniTrampoline).readPointer(),j=I.add(x.quickToInterpreterBridgeTrampoline).readPointer();o.artClassLinker={address:I,quickResolutionTrampoline:N,quickImtConflictTrampoline:M,quickGenericJniTrampoline:k,quickToInterpreterBridgeTrampoline:j};let E=new we(o);o.artQuickGenericJniTrampoline=wn(k,E),o.artQuickToInterpreterBridge=wn(j,E),o.artQuickResolutionTrampoline=wn(N,E),o["art::JavaVMExt::AddGlobalRef"]===void 0&&(o["art::JavaVMExt::AddGlobalRef"]=fl(o)),o["art::JavaVMExt::DecodeGlobal"]===void 0&&(o["art::JavaVMExt::DecodeGlobal"]=hl(o)),o["art::ArtMethod::PrettyMethod"]===void 0&&(o["art::ArtMethod::PrettyMethod"]=o["art::ArtMethod::PrettyMethodNullSafe"]),o["art::interpreter::GetNterpEntryPoint"]!==void 0?o.artNterpEntryPoint=o["art::interpreter::GetNterpEntryPoint"]():o.artNterpEntryPoint=o.find("ExecuteNterpImpl"),ce=Dc(o,E),bl(o);let L=null;Object.defineProperty(o,"jvmti",{get(){return L===null&&(L=[cc(E,this.artRuntime)]),L[0]}})}let f=e.enumerateImports().filter(p=>p.name.indexOf("_Z")===0).reduce((p,_)=>(p[_.name]=_.address,p),{});return o.$new=new NativeFunction(f._Znwm||f._Znwj,"pointer",["ulong"],q),o.$delete=new NativeFunction(f._ZdlPv,"void",["pointer"],q),so=r?Rn:On,o}function cc(n,e){let t=null;return n.perform(()=>{let r=J().find("_ZN3art7Runtime18EnsurePluginLoadedEPKcPNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEE");if(r===null)return;let o=new NativeFunction(r,"bool",["pointer","pointer","pointer"]),s=Memory.alloc(S);if(!o(e,Memory.allocUtf8String("libopenjdkjvmti.so"),s))return;let c=yt.v1_2|1073741824,a=n.tryGetEnvHandle(c);if(a===null)return;t=new xe(a,n);let l=Memory.alloc(8);l.writeU64(Et.canTagObjects),t.addCapabilities(l)!==0&&(t=null)}),t}function lc(n,e){J().flavor==="art"&&(n.getFieldId(e,"x","Z"),n.exceptionClear())}function dc(n){return{offset:S===4?{globalsLock:32,globals:72}:{globalsLock:64,globals:112}}}function uc(n){let e=n.vm,t=n.artRuntime,r=S===4?200:384,o=r+100*S,s=ee(),i=oo(),{isApiLevel34OrApexEquivalent:c}=n,a=null;for(let l=r;l!==o;l+=S)if(t.add(l).readPointer().equals(e)){let u,f=null;s>=33||i==="Tiramisu"||c?(u=[l-4*S],f=l-S):s>=30||i==="R"?(u=[l-3*S,l-4*S],f=l-S):s>=29?u=[l-2*S]:s>=27?u=[l-ct-3*S]:u=[l-ct-2*S];for(let p of u){let _=p-S,h=_-S,g;c?g=h-9*S:s>=24?g=h-8*S:s>=23?g=h-7*S:g=h-4*S;let b={offset:{heap:g,threadList:h,internTable:_,classLinker:p,jniIdManager:f}};if(ao(t,b)!==null){a=b;break}}break}if(a===null)throw new Error("Unable to determine Runtime field offsets");return a.offset.instrumentation=fc(n),a.offset.jniIdsIndirection=gc(n),a}var pc={ia32:Zr,x64:Zr,arm:hc,arm64:_c};function fc(n){let e=n["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:Me(e,pc[Process.arch],{limit:30})}function Zr(n){if(n.mnemonic!=="lea")return null;let e=n.operands[1].value.disp;return e<256||e>1024?null:e}function hc(n){if(n.mnemonic!=="add.w")return null;let e=n.operands;if(e.length!==3)return null;let t=e[2];return t.type!=="imm"?null:t.value}function _c(n){if(n.mnemonic!=="add")return null;let e=n.operands;if(e.length!==3||e[0].value==="sp"||e[1].value==="sp")return null;let t=e[2];if(t.type!=="imm")return null;let r=t.value.valueOf();return r<256||r>1024?null:r}var mc={ia32:Wr,x64:Wr,arm:bc,arm64:yc};function gc(n){let e=n.find("_ZN3art7Runtime12SetJniIdTypeENS_9JniIdTypeE");if(e===null)return null;let t=Me(e,mc[Process.arch],{limit:20});if(t===null)throw new Error("Unable to determine Runtime.jni_ids_indirection_ offset");return t}function Wr(n){return n.mnemonic==="cmp"?n.operands[0].value.disp:null}function bc(n){return n.mnemonic==="ldr.w"?n.operands[1].value.disp:null}function yc(n,e){if(e===null)return null;let{mnemonic:t}=n,{mnemonic:r}=e;return t==="cmp"&&r==="ldr"||t==="bl"&&r==="str"?e.operands[1].value.disp:null}function Ec(){let e={"4-21":136,"4-22":136,"4-23":172,"4-24":196,"4-25":196,"4-26":196,"4-27":196,"4-28":212,"4-29":172,"4-30":180,"4-31":180,"8-21":224,"8-22":224,"8-23":296,"8-24":344,"8-25":344,"8-26":352,"8-27":352,"8-28":392,"8-29":328,"8-30":336,"8-31":336}[`${S}-${ee()}`];if(e===void 0)throw new Error("Unable to determine Instrumentation field offsets");return{offset:{forcedInterpretOnly:4,deoptimizationEnabled:e}}}function vc(n,e){let t=ao(n,e);if(t===null)throw new Error("Unable to determine ClassLinker field offsets");return t}function ao(n,e){if(En!==null)return En;let{classLinker:t,internTable:r}=e.offset,o=n.add(t).readPointer(),s=n.add(r).readPointer(),i=S===4?100:200,c=i+100*S,a=ee(),l=null;for(let d=i;d!==c;d+=S)if(o.add(d).readPointer().equals(s)){let f;a>=30||oo()==="R"?f=6:a>=29?f=4:a>=23?f=3:f=5;let p=d+f*S,_;a>=23?_=p-2*S:_=p-3*S,l={offset:{quickResolutionTrampoline:_,quickImtConflictTrampoline:p-S,quickGenericJniTrampoline:p,quickToInterpreterBridgeTrampoline:p+S}};break}if(l!==null)En=l;else throw new Error("Unable to determine ClassLinker field offsets");return l}function Dn(n){let e;try{e=ee()}catch{return null}if(e<24)return null;let t,r;return e>=26?(t=40,r=116):(t=56,r=124),{offset:{ifields:t,methods:t+8,sfields:t+16,copiedMethodsOffset:r}}}function Sc(n){let e=J(),t;return n.perform(r=>{let o=r.findClass("android/os/Process"),s=co(r.getStaticMethodId(o,"getElapsedCpuTime","()J"));r.deleteLocalRef(o);let i=Process.getModuleByName("libandroid_runtime.so"),c=i.base,a=c.add(i.size),l=ee(),d=l<=21?8:S,u=Ea|va|Sa|At,f=~(to|La|Aa)>>>0,p=null,_=null,h=2;for(let v=0;v!==64&&h!==0;v+=4){let I=s.add(v);if(p===null){let x=I.readPointer();x.compare(c)>=0&&x.compare(a)<0&&(p=v,h--)}_===null&&(I.readU32()&f)===u&&(_=v,h--)}if(h!==0)throw new Error("Unable to determine ArtMethod field offsets");let g=p+d;t={size:l<=21?g+32:g+S,offset:{jniCode:p,quickCode:g,accessFlags:_}},"artInterpreterToCompiledCodeBridge"in e&&(t.offset.interpreterCode=p-d)}),t}function Bn(n){let e=ee();return e>=23?{size:16,offset:{accessFlags:4}}:e>=21?{size:24,offset:{accessFlags:12}}:null}function wc(n){let e=ee(),t;return n.perform(r=>{let o=jt(r),s=r.handle,i=null,c=null,a=null,l=null,d=null,u=null;for(let f=144;f!==256;f+=S)if(o.add(f).readPointer().equals(s)){c=f-6*S,d=f-4*S,u=f+2*S,e<=22&&(c-=S,i=c-S-9*8-3*4,a=f+6*S,d-=S,u-=S),l=f+9*S,e<=22&&(l+=2*S+4,S===8&&(l+=4)),e>=23&&(l+=S);break}if(l===null)throw new Error("Unable to determine ArtThread field offsets");t={offset:{isExceptionReportedToInstrumentation:i,exception:c,throwLocation:a,topHandleScope:l,managedStack:d,self:u}}}),t}function Ic(){return ee()>=23?{offset:{topQuickFrame:0,link:S}}:{offset:{topQuickFrame:2*S,link:0}}}var Tc={ia32:qr,x64:qr,arm:Cc,arm64:Ac};function wn(n,e){let t;return e.perform(r=>{let o=jt(r),s=Tc[Process.arch],i=Instruction.parse(n),c=s(i);c!==null?t=o.add(c).readPointer():t=n}),t}function qr(n){return n.mnemonic==="jmp"?n.operands[0].value.disp:null}function Cc(n){return n.mnemonic==="ldr.w"?n.operands[1].value.disp:null}function Ac(n){return n.mnemonic==="ldr"?n.operands[1].value.disp:null}function jt(n){return n.handle.add(S).readPointer()}function Lc(){return Vn("ro.build.version.release")}function xc(){return Vn("ro.build.version.codename")}function kc(){return parseInt(Vn("ro.build.version.sdk"),10)}var In=null,Nc=92;function Vn(n){In===null&&(In=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("__system_property_get"),"int",["pointer","pointer"],q));let e=Memory.alloc(Nc);return In(Memory.allocUtf8String(n),e),e.readUtf8String()}function Ee(n,e,t){let r=rc(n,e),o=jt(e).toString();if(st[o]=t,r(e.handle),st[o]!==void 0)throw delete st[o],new Error("Unable to perform state transition; please file a bug")}function Mc(n,e){let t=new NativeCallback(Rc,"void",["pointer"]);return uo(n,e,t)}function Rc(n){let e=n.toString(),t=st[e];delete st[e],t(n)}function zn(n){let e=J(),t=e.artThreadList;e["art::ThreadList::SuspendAll"](t,Memory.allocUtf8String("frida"),!1?1:0);try{n()}finally{e["art::ThreadList::ResumeAll"](t)}}var Ln=class{constructor(e){let t=Memory.alloc(4*S),r=t.add(S);t.writePointer(r);let o=new NativeCallback((s,i)=>e(i)===!0?1:0,"bool",["pointer","pointer"]);r.add(2*S).writePointer(o),this.handle=t,this._onVisit=o}};function Jn(n){return J()["art::ClassLinker::VisitClasses"]instanceof NativeFunction?new Ln(n):new NativeCallback(t=>n(t)===!0?1:0,"bool",["pointer","pointer"])}var xn=class{constructor(e){let t=Memory.alloc(4*S),r=t.add(S);t.writePointer(r);let o=new NativeCallback((s,i)=>{e(i)},"void",["pointer","pointer"]);r.add(2*S).writePointer(o),this.handle=t,this._onVisit=o}};function $n(n){return new xn(n)}var Oc={"include-inlined-frames":0,"skip-inlined-frames":1},kn=class{constructor(e,t,r,o=0,s=!0){let i=J(),c=512,a=3*S,l=Memory.alloc(c+a);i["art::StackVisitor::StackVisitor"](l,e,t,Oc[r],o,s?1:0);let d=l.add(c);l.writePointer(d);let u=new NativeCallback(this._visitFrame.bind(this),"bool",["pointer"]);d.add(2*S).writePointer(u),this.handle=l,this._onVisitFrame=u;let f=l.add(S===4?12:24);this._curShadowFrame=f,this._curQuickFrame=f.add(S),this._curQuickFramePc=f.add(2*S),this._curOatQuickMethodHeader=f.add(3*S),this._getMethodImpl=i["art::StackVisitor::GetMethod"],this._descLocImpl=i["art::StackVisitor::DescribeLocation"],this._getCQFIImpl=i["art::StackVisitor::GetCurrentQuickFrameInfo"]}walkStack(e=!1){J()["art::StackVisitor::WalkStack"](this.handle,e?1:0)}_visitFrame(){return this.visitFrame()?1:0}visitFrame(){throw new Error("Subclass must implement visitFrame")}getMethod(){let e=this._getMethodImpl(this.handle);return e.isNull()?null:new xt(e)}getCurrentQuickFramePc(){return this._curQuickFramePc.readPointer()}getCurrentQuickFrame(){return this._curQuickFrame.readPointer()}getCurrentShadowFrame(){return this._curShadowFrame.readPointer()}describeLocation(){let e=new Mt;return this._descLocImpl(e,this.handle),e.disposeToString()}getCurrentOatQuickMethodHeader(){return this._curOatQuickMethodHeader.readPointer()}getCurrentQuickFrameInfo(){return this._getCQFIImpl(this.handle)}},xt=class{constructor(e){this.handle=e}prettyMethod(e=!0){let t=new Mt;return J()["art::ArtMethod::PrettyMethod"](t,this.handle,e?1:0),t.disposeToString()}toString(){return`ArtMethod(handle=${this.handle})`}};function jc(n){return function(e){let t=Memory.alloc(12);return oc(n)(t,e),{frameSizeInBytes:t.readU32(),coreSpillMask:t.add(4).readU32(),fpSpillMask:t.add(8).readU32()}}}function Pc(n){let e=NULL;switch(Process.arch){case"ia32":e=Ze(32,t=>{t.putMovRegRegOffsetPtr("ecx","esp",4),t.putMovRegRegOffsetPtr("edx","esp",8),t.putCallAddressWithArguments(n,["ecx","edx"]),t.putMovRegReg("esp","ebp"),t.putPopReg("ebp"),t.putRet()});break;case"x64":e=Ze(32,t=>{t.putPushReg("rdi"),t.putCallAddressWithArguments(n,["rsi"]),t.putPopReg("rdi"),t.putMovRegPtrReg("rdi","rax"),t.putMovRegOffsetPtrReg("rdi",8,"edx"),t.putRet()});break;case"arm":e=Ze(16,t=>{t.putCallAddressWithArguments(n,["r0","r1"]),t.putPopRegs(["r0","lr"]),t.putMovRegReg("pc","lr")});break;case"arm64":e=Ze(64,t=>{t.putPushRegReg("x0","lr"),t.putCallAddressWithArguments(n,["x1"]),t.putPopRegReg("x2","lr"),t.putStrRegRegOffset("x0","x2",0),t.putStrRegRegOffset("w1","x2",8),t.putRet()});break}return new NativeFunction(e,"void",["pointer","pointer"],q)}var Fc={ia32:globalThis.X86Relocator,x64:globalThis.X86Relocator,arm:globalThis.ThumbRelocator,arm64:globalThis.Arm64Relocator},Nn={ia32:globalThis.X86Writer,x64:globalThis.X86Writer,arm:globalThis.ThumbWriter,arm64:globalThis.Arm64Writer};function Ze(n,e){vn===null&&(vn=Memory.alloc(Process.pageSize));let t=vn.add($r),r=Process.arch,o=Nn[r];return Memory.patchCode(t,n,s=>{let i=new o(s,{pc:t});if(e(i),i.flush(),i.offset>n)throw new Error(`Wrote ${i.offset}, exceeding maximum of ${n}`)}),$r+=n,r==="arm"?t.or(1):t}function Uc(n,e){Bc(e),Jc(e)}function Dc(n,e){let t=We(e).offset,r=nc().offset,o=`
#include <gum/guminterceptor.h>

extern GMutex lock;
extern GHashTable * methods;
extern GHashTable * replacements;
extern gpointer last_seen_art_method;

extern gpointer get_oat_quick_method_header_impl (gpointer method, gpointer pc);

void
init (void)
{
  g_mutex_init (&lock);
  methods = g_hash_table_new_full (NULL, NULL, NULL, NULL);
  replacements = g_hash_table_new_full (NULL, NULL, NULL, NULL);
}

void
finalize (void)
{
  g_hash_table_unref (replacements);
  g_hash_table_unref (methods);
  g_mutex_clear (&lock);
}

gboolean
is_replacement_method (gpointer method)
{
  gboolean is_replacement;

  g_mutex_lock (&lock);

  is_replacement = g_hash_table_contains (replacements, method);

  g_mutex_unlock (&lock);

  return is_replacement;
}

gpointer
get_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);

  g_mutex_unlock (&lock);

  return replacement_method;
}

void
set_replacement_method (gpointer original_method,
                        gpointer replacement_method)
{
  g_mutex_lock (&lock);

  g_hash_table_insert (methods, original_method, replacement_method);
  g_hash_table_insert (replacements, replacement_method, original_method);

  g_mutex_unlock (&lock);
}

void
delete_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);
  if (replacement_method != NULL)
  {
    g_hash_table_remove (methods, original_method);
    g_hash_table_remove (replacements, replacement_method);
  }

  g_mutex_unlock (&lock);
}

gpointer
translate_method (gpointer method)
{
  gpointer translated_method;

  g_mutex_lock (&lock);

  translated_method = g_hash_table_lookup (replacements, method);

  g_mutex_unlock (&lock);

  return (translated_method != NULL) ? translated_method : method;
}

gpointer
find_replacement_method_from_quick_code (gpointer method,
                                         gpointer thread)
{
  gpointer replacement_method;
  gpointer managed_stack;
  gpointer top_quick_frame;
  gpointer link_managed_stack;
  gpointer * link_top_quick_frame;

  replacement_method = get_replacement_method (method);
  if (replacement_method == NULL)
    return NULL;

  /*
   * Stack check.
   *
   * Return NULL to indicate that the original method should be invoked, otherwise
   * return a pointer to the replacement ArtMethod.
   *
   * If the caller is our own JNI replacement stub, then a stack transition must
   * have been pushed onto the current thread's linked list.
   *
   * Therefore, we invoke the original method if the following conditions are met:
   *   1- The current managed stack is empty.
   *   2- The ArtMethod * inside the linked managed stack's top quick frame is the
   *      same as our replacement.
   */
  managed_stack = thread + ${t.managedStack};
  top_quick_frame = *((gpointer *) (managed_stack + ${r.topQuickFrame}));
  if (top_quick_frame != NULL)
    return replacement_method;

  link_managed_stack = *((gpointer *) (managed_stack + ${r.link}));
  if (link_managed_stack == NULL)
    return replacement_method;

  link_top_quick_frame = GSIZE_TO_POINTER (*((gsize *) (link_managed_stack + ${r.topQuickFrame})) & ~((gsize) 1));
  if (link_top_quick_frame == NULL || *link_top_quick_frame != replacement_method)
    return replacement_method;

  return NULL;
}

void
on_interpreter_do_call (GumInvocationContext * ic)
{
  gpointer method, replacement_method;

  method = gum_invocation_context_get_nth_argument (ic, 0);

  replacement_method = get_replacement_method (method);
  if (replacement_method != NULL)
    gum_invocation_context_replace_nth_argument (ic, 0, replacement_method);
}

gpointer
on_art_method_get_oat_quick_method_header (gpointer method,
                                           gpointer pc)
{
  if (is_replacement_method (method))
    return NULL;

  return get_oat_quick_method_header_impl (method, pc);
}

void
on_art_method_pretty_method (GumInvocationContext * ic)
{
  const guint this_arg_index = ${Process.arch==="arm64"?0:1};
  gpointer method;

  method = gum_invocation_context_get_nth_argument (ic, this_arg_index);
  if (method == NULL)
    gum_invocation_context_replace_nth_argument (ic, this_arg_index, last_seen_art_method);
  else
    last_seen_art_method = method;
}

void
on_leave_gc_concurrent_copying_copying_phase (GumInvocationContext * ic)
{
  GHashTableIter iter;
  gpointer hooked_method, replacement_method;

  g_mutex_lock (&lock);

  g_hash_table_iter_init (&iter, methods);
  while (g_hash_table_iter_next (&iter, &hooked_method, &replacement_method))
    *((uint32_t *) replacement_method) = *((uint32_t *) hooked_method);

  g_mutex_unlock (&lock);
}
`,s=8,i=S,c=S,a=S,d=Memory.alloc(s+i+c+a),u=d.add(s),f=u.add(i),p=f.add(c),_=n.find(S===4?"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEj":"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEm"),h=new CModule(o,{lock:d,methods:u,replacements:f,last_seen_art_method:p,get_oat_quick_method_header_impl:_??ptr("0xdeadbeef")}),g={exceptions:"propagate",scheduling:"exclusive"};return{handle:h,replacedMethods:{isReplacement:new NativeFunction(h.is_replacement_method,"bool",["pointer"],g),get:new NativeFunction(h.get_replacement_method,"pointer",["pointer"],g),set:new NativeFunction(h.set_replacement_method,"void",["pointer","pointer"],g),delete:new NativeFunction(h.delete_replacement_method,"void",["pointer"],g),translate:new NativeFunction(h.translate_method,"pointer",["pointer"],g),findReplacementFromQuickCode:h.find_replacement_method_from_quick_code},getOatQuickMethodHeaderImpl:_,hooks:{Interpreter:{doCall:h.on_interpreter_do_call},ArtMethod:{getOatQuickMethodHeader:h.on_art_method_get_oat_quick_method_header,prettyMethod:h.on_art_method_pretty_method},Gc:{copyingPhase:{onLeave:h.on_leave_gc_concurrent_copying_copying_phase},runFlip:{onEnter:h.on_leave_gc_concurrent_copying_copying_phase}}}}}function Bc(n){Hr||(Hr=!0,Vc(n),zc())}function Vc(n){let e=J();[e.artQuickGenericJniTrampoline,e.artQuickToInterpreterBridge,e.artQuickResolutionTrampoline].forEach(r=>{Memory.protect(r,32,"rwx");let o=new Nt(r);o.activate(n),io.push(o)})}function zc(){let n=J(),e=ee(),{isApiLevel34OrApexEquivalent:t}=n,r;if(e<=22)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_6mirror9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(e<=33&&!t)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(t)r=/^_ZN3art11interpreter6DoCallILb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtbPNS_6JValueE$/;else throw new Error("Unable to find method invocation in ART; please file a bug");let o=n.module,s=[...o.enumerateExports(),...o.enumerateSymbols()].filter(i=>r.test(i.name));if(s.length===0)throw new Error("Unable to find method invocation in ART; please file a bug");for(let i of s)Interceptor.attach(i.address,ce.hooks.Interpreter.doCall)}function Jc(n){if(Gr)return;if(Gr=!0,!Gc()){let{getOatQuickMethodHeaderImpl:s}=ce;if(s===null)return;try{Interceptor.replace(s,ce.hooks.ArtMethod.getOatQuickMethodHeader)}catch{}}let e=ee(),t=null,r=J();e>28?t=r.find("_ZN3art2gc9collector17ConcurrentCopying12CopyingPhaseEv"):e>22&&(t=r.find("_ZN3art2gc9collector17ConcurrentCopying12MarkingPhaseEv")),t!==null&&Interceptor.attach(t,ce.hooks.Gc.copyingPhase);let o=null;o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_"),o===null&&(o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_b")),o!==null&&Interceptor.attach(o,ce.hooks.Gc.runFlip)}var $c={arm:{signatures:[{pattern:["b0 68","01 30","0c d0","1b 98",":","c0 ff","c0 ff","00 ff","00 2f"],validateMatch:Tn},{pattern:["d8 f8 08 00","01 30","0c d0","1b 98",":","f0 ff ff 0f","ff ff","00 ff","00 2f"],validateMatch:Tn},{pattern:["b0 68","01 30","40 f0 c3 80","00 25",":","c0 ff","c0 ff","c0 fb 00 d0","ff f8"],validateMatch:Tn}],instrument:Zc},arm64:{signatures:[{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","88 39 00 f0",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 00 00 9f"],offset:1,validateMatch:Kr},{pattern:["0a 40 b9","1f 05 00 31","01 34 00 54","e0 03 1f aa",":","fc ff ff","1f fc ff ff","1f 00 00 ff","e0 ff ff ff"],offset:1,validateMatch:Kr}],instrument:Wc}};function Tn({address:n,size:e}){let t=Instruction.parse(n.or(1)),[r,o]=t.operands,s=o.value.base,i=r.value,c=Instruction.parse(t.next.add(2)),a=ptr(c.operands[0].value),l=c.address.add(c.size),d,u;return c.mnemonic==="beq"?(d=l,u=a):(d=a,u=l),Me(d.or(1),f,{limit:3});function f(p){let{mnemonic:_}=p;if(!(_==="ldr"||_==="ldr.w"))return null;let{base:h,disp:g}=p.operands[1].value;return h===s&&g===20?{methodReg:s,scratchReg:i,target:{whenTrue:a,whenRegularMethod:d,whenRuntimeMethod:u}}:null}}function Kr({address:n,size:e}){let[t,r]=Instruction.parse(n).operands,o=r.value.base,s="x"+t.value.substring(1),i=Instruction.parse(n.add(8)),c=ptr(i.operands[0].value),a=n.add(12),l,d;return i.mnemonic==="b.eq"?(l=a,d=c):(l=c,d=a),Me(l,u,{limit:3});function u(f){if(f.mnemonic!=="ldr")return null;let{base:p,disp:_}=f.operands[1].value;return p===o&&_===24?{methodReg:o,scratchReg:s,target:{whenTrue:c,whenRegularMethod:l,whenRuntimeMethod:d}}:null}}function Gc(){if(ee()<31)return!1;let n=$c[Process.arch];if(n===void 0)return!1;let e=n.signatures.map(({pattern:r,offset:o=0,validateMatch:s=Hc})=>({pattern:new MatchPattern(r.join("")),offset:o,validateMatch:s})),t=[];for(let{base:r,size:o}of J().module.enumerateRanges("--x"))for(let{pattern:s,offset:i,validateMatch:c}of e){let a=Memory.scanSync(r,o,s).map(({address:l,size:d})=>({address:l.sub(i),size:d+i})).filter(l=>{let d=c(l);return d===null?!1:(l.validationResult=d,!0)});t.push(...a)}return t.length===0?!1:(t.forEach(n.instrument),!0)}function Hc(){return{}}var kt=class{constructor(e,t,r){this.address=e,this.size=t,this.originalCode=e.readByteArray(t),this.trampoline=r}revert(){Memory.patchCode(this.address,this.size,e=>{e.writeByteArray(this.originalCode)})}};function Zc({address:n,size:e,validationResult:t}){let{methodReg:r,target:o}=t,s=Memory.alloc(Process.pageSize),i=e;Memory.patchCode(s,256,c=>{let a=new ThumbWriter(c,{pc:s}),l=new ThumbRelocator(n,a);for(let _=0;_!==2;_++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=[45,237,16,10];a.putBytes(d);let u=["r0","r1","r2","r3"];a.putPushRegs(u),a.putCallAddressWithArguments(ce.replacedMethods.isReplacement,[r]),a.putCmpRegImm("r0",0),a.putPopRegs(u);let f=[189,236,16,10];a.putBytes(f),a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),l.readOne();let p=l.input.address.equals(o.whenRegularMethod);for(a.putLabel(p?"regular_method":"runtime_or_replacement_method"),l.writeOne();i<10;){let _=l.readOne();if(_===0){i=10;break}i=_}l.writeAll(),a.putBranchAddress(n.add(i+1)),a.putLabel(p?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(o.whenTrue),a.flush()}),Un.push(new kt(n,i,s)),Memory.patchCode(n,i,c=>{let a=new ThumbWriter(c,{pc:n});a.putLdrRegAddress("pc",s.or(1)),a.flush()})}function Wc({address:n,size:e,validationResult:t}){let{methodReg:r,scratchReg:o,target:s}=t,i=Memory.alloc(Process.pageSize);Memory.patchCode(i,256,c=>{let a=new Arm64Writer(c,{pc:i}),l=new Arm64Relocator(n,a);for(let _=0;_!==2;_++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=["d0","d1","d2","d3","d4","d5","d6","d7","x0","x1","x2","x3","x4","x5","x6","x7","x8","x9","x10","x11","x12","x13","x14","x15","x16","x17"],u=d.length;for(let _=0;_!==u;_+=2)a.putPushRegReg(d[_],d[_+1]);a.putCallAddressWithArguments(ce.replacedMethods.isReplacement,[r]),a.putCmpRegReg("x0","xzr");for(let _=u-2;_>=0;_-=2)a.putPopRegReg(d[_],d[_+1]);a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),l.readOne();let f=l.input,p=f.address.equals(s.whenRegularMethod);a.putLabel(p?"regular_method":"runtime_or_replacement_method"),l.writeOne(),a.putBranchAddress(f.next),a.putLabel(p?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(s.whenTrue),a.flush()}),Un.push(new kt(n,e,i)),Memory.patchCode(n,e,c=>{let a=new Arm64Writer(c,{pc:n});a.putLdrRegAddress(o,i),a.putBrReg(o),a.flush()})}function qc(n){return new so(n)}function Kc(n){return ce.replacedMethods.translate(n)}function Gn(n,e={}){let{limit:t=16}=e,r=n.getEnv();return it===null&&(it=Qc(n,r)),it.backtrace(r,t)}function Qc(n,e){let t=J(),r=Memory.alloc(Process.pointerSize),o=new CModule(`
#include <glib.h>
#include <stdbool.h>
#include <string.h>
#include <gum/gumtls.h>
#include <json-glib/json-glib.h>

typedef struct _ArtBacktrace ArtBacktrace;
typedef struct _ArtStackFrame ArtStackFrame;

typedef struct _ArtStackVisitor ArtStackVisitor;
typedef struct _ArtStackVisitorVTable ArtStackVisitorVTable;

typedef struct _ArtClass ArtClass;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtThread ArtThread;
typedef struct _ArtContext ArtContext;

typedef struct _JNIEnv JNIEnv;

typedef struct _StdString StdString;
typedef struct _StdTinyString StdTinyString;
typedef struct _StdLargeString StdLargeString;

typedef enum {
  STACK_WALK_INCLUDE_INLINED_FRAMES,
  STACK_WALK_SKIP_INLINED_FRAMES,
} StackWalkKind;

struct _StdTinyString
{
  guint8 unused;
  gchar data[(3 * sizeof (gpointer)) - 1];
};

struct _StdLargeString
{
  gsize capacity;
  gsize size;
  gchar * data;
};

struct _StdString
{
  union
  {
    guint8 flags;
    StdTinyString tiny;
    StdLargeString large;
  };
};

struct _ArtBacktrace
{
  GChecksum * id;
  GArray * frames;
  gchar * frames_json;
};

struct _ArtStackFrame
{
  ArtMethod * method;
  gsize dexpc;
  StdString description;
};

struct _ArtStackVisitorVTable
{
  void (* unused1) (void);
  void (* unused2) (void);
  bool (* visit) (ArtStackVisitor * visitor);
};

struct _ArtStackVisitor
{
  ArtStackVisitorVTable * vtable;

  guint8 padding[512];

  ArtStackVisitorVTable vtable_storage;

  ArtBacktrace * backtrace;
};

struct _ArtMethod
{
  guint32 declaring_class;
  guint32 access_flags;
};

extern GumTlsKey current_backtrace;

extern void (* perform_art_thread_state_transition) (JNIEnv * env);

extern ArtContext * art_thread_get_long_jump_context (ArtThread * thread);

extern void art_stack_visitor_init (ArtStackVisitor * visitor, ArtThread * thread, void * context, StackWalkKind walk_kind,
    size_t num_frames, bool check_suspended);
extern void art_stack_visitor_walk_stack (ArtStackVisitor * visitor, bool include_transitions);
extern ArtMethod * art_stack_visitor_get_method (ArtStackVisitor * visitor);
extern void art_stack_visitor_describe_location (StdString * description, ArtStackVisitor * visitor);
extern ArtMethod * translate_method (ArtMethod * method);
extern void translate_location (ArtMethod * method, guint32 pc, const gchar ** source_file, gint32 * line_number);
extern void get_class_location (StdString * result, ArtClass * klass);
extern void cxx_delete (void * mem);
extern unsigned long strtoul (const char * str, char ** endptr, int base);

static bool visit_frame (ArtStackVisitor * visitor);
static void art_stack_frame_destroy (ArtStackFrame * frame);

static void append_jni_type_name (GString * s, const gchar * name, gsize length);

static void std_string_destroy (StdString * str);
static gchar * std_string_get_data (StdString * str);

void
init (void)
{
  current_backtrace = gum_tls_key_new ();
}

void
finalize (void)
{
  gum_tls_key_free (current_backtrace);
}

ArtBacktrace *
_create (JNIEnv * env,
         guint limit)
{
  ArtBacktrace * bt;

  bt = g_new (ArtBacktrace, 1);
  bt->id = g_checksum_new (G_CHECKSUM_SHA1);
  bt->frames = (limit != 0)
      ? g_array_sized_new (FALSE, FALSE, sizeof (ArtStackFrame), limit)
      : g_array_new (FALSE, FALSE, sizeof (ArtStackFrame));
  g_array_set_clear_func (bt->frames, (GDestroyNotify) art_stack_frame_destroy);
  bt->frames_json = NULL;

  gum_tls_key_set_value (current_backtrace, bt);

  perform_art_thread_state_transition (env);

  gum_tls_key_set_value (current_backtrace, NULL);

  return bt;
}

void
_on_thread_state_transition_complete (ArtThread * thread)
{
  ArtContext * context;
  ArtStackVisitor visitor = {
    .vtable_storage = {
      .visit = visit_frame,
    },
  };

  context = art_thread_get_long_jump_context (thread);

  art_stack_visitor_init (&visitor, thread, context, STACK_WALK_SKIP_INLINED_FRAMES, 0, true);
  visitor.vtable = &visitor.vtable_storage;
  visitor.backtrace = gum_tls_key_get_value (current_backtrace);

  art_stack_visitor_walk_stack (&visitor, false);

  cxx_delete (context);
}

static bool
visit_frame (ArtStackVisitor * visitor)
{
  ArtBacktrace * bt = visitor->backtrace;
  ArtStackFrame frame;
  const gchar * description, * dexpc_part;

  frame.method = art_stack_visitor_get_method (visitor);

  art_stack_visitor_describe_location (&frame.description, visitor);

  description = std_string_get_data (&frame.description);
  if (strstr (description, " '<") != NULL)
    goto skip;

  dexpc_part = strstr (description, " at dex PC 0x");
  if (dexpc_part == NULL)
    goto skip;
  frame.dexpc = strtoul (dexpc_part + 13, NULL, 16);

  g_array_append_val (bt->frames, frame);

  g_checksum_update (bt->id, (guchar *) &frame.method, sizeof (frame.method));
  g_checksum_update (bt->id, (guchar *) &frame.dexpc, sizeof (frame.dexpc));

  return true;

skip:
  std_string_destroy (&frame.description);
  return true;
}

static void
art_stack_frame_destroy (ArtStackFrame * frame)
{
  std_string_destroy (&frame->description);
}

void
_destroy (ArtBacktrace * backtrace)
{
  g_free (backtrace->frames_json);
  g_array_free (backtrace->frames, TRUE);
  g_checksum_free (backtrace->id);
  g_free (backtrace);
}

const gchar *
_get_id (ArtBacktrace * backtrace)
{
  return g_checksum_get_string (backtrace->id);
}

const gchar *
_get_frames (ArtBacktrace * backtrace)
{
  GArray * frames = backtrace->frames;
  JsonBuilder * b;
  guint i;
  JsonNode * root;

  if (backtrace->frames_json != NULL)
    return backtrace->frames_json;

  b = json_builder_new_immutable ();

  json_builder_begin_array (b);

  for (i = 0; i != frames->len; i++)
  {
    ArtStackFrame * frame = &g_array_index (frames, ArtStackFrame, i);
    gchar * description, * ret_type, * paren_open, * paren_close, * arg_types, * token, * method_name, * class_name;
    GString * signature;
    gchar * cursor;
    ArtMethod * translated_method;
    StdString location;
    gsize dexpc;
    const gchar * source_file;
    gint32 line_number;

    description = std_string_get_data (&frame->description);

    ret_type = strchr (description, '\\'') + 1;

    paren_open = strchr (ret_type, '(');
    paren_close = strchr (paren_open, ')');
    *paren_open = '\\0';
    *paren_close = '\\0';

    arg_types = paren_open + 1;

    token = strrchr (ret_type, '.');
    *token = '\\0';

    method_name = token + 1;

    token = strrchr (ret_type, ' ');
    *token = '\\0';

    class_name = token + 1;

    signature = g_string_sized_new (128);

    append_jni_type_name (signature, class_name, method_name - class_name - 1);
    g_string_append_c (signature, ',');
    g_string_append (signature, method_name);
    g_string_append (signature, ",(");

    if (arg_types != paren_close)
    {
      for (cursor = arg_types; cursor != NULL;)
      {
        gsize length;
        gchar * next;

        token = strstr (cursor, ", ");
        if (token != NULL)
        {
          length = token - cursor;
          next = token + 2;
        }
        else
        {
          length = paren_close - cursor;
          next = NULL;
        }

        append_jni_type_name (signature, cursor, length);

        cursor = next;
      }
    }

    g_string_append_c (signature, ')');

    append_jni_type_name (signature, ret_type, class_name - ret_type - 1);

    translated_method = translate_method (frame->method);
    dexpc = (translated_method == frame->method) ? frame->dexpc : 0;

    get_class_location (&location, GSIZE_TO_POINTER (translated_method->declaring_class));

    translate_location (translated_method, dexpc, &source_file, &line_number);

    json_builder_begin_object (b);

    json_builder_set_member_name (b, "signature");
    json_builder_add_string_value (b, signature->str);

    json_builder_set_member_name (b, "origin");
    json_builder_add_string_value (b, std_string_get_data (&location));

    json_builder_set_member_name (b, "className");
    json_builder_add_string_value (b, class_name);

    json_builder_set_member_name (b, "methodName");
    json_builder_add_string_value (b, method_name);

    json_builder_set_member_name (b, "methodFlags");
    json_builder_add_int_value (b, translated_method->access_flags);

    json_builder_set_member_name (b, "fileName");
    json_builder_add_string_value (b, source_file);

    json_builder_set_member_name (b, "lineNumber");
    json_builder_add_int_value (b, line_number);

    json_builder_end_object (b);

    std_string_destroy (&location);
    g_string_free (signature, TRUE);
  }

  json_builder_end_array (b);

  root = json_builder_get_root (b);
  backtrace->frames_json = json_to_string (root, FALSE);
  json_node_unref (root);

  return backtrace->frames_json;
}

static void
append_jni_type_name (GString * s,
                      const gchar * name,
                      gsize length)
{
  gchar shorty = '\\0';
  gsize i;

  switch (name[0])
  {
    case 'b':
      if (strncmp (name, "boolean", length) == 0)
        shorty = 'Z';
      else if (strncmp (name, "byte", length) == 0)
        shorty = 'B';
      break;
    case 'c':
      if (strncmp (name, "char", length) == 0)
        shorty = 'C';
      break;
    case 'd':
      if (strncmp (name, "double", length) == 0)
        shorty = 'D';
      break;
    case 'f':
      if (strncmp (name, "float", length) == 0)
        shorty = 'F';
      break;
    case 'i':
      if (strncmp (name, "int", length) == 0)
        shorty = 'I';
      break;
    case 'l':
      if (strncmp (name, "long", length) == 0)
        shorty = 'J';
      break;
    case 's':
      if (strncmp (name, "short", length) == 0)
        shorty = 'S';
      break;
    case 'v':
      if (strncmp (name, "void", length) == 0)
        shorty = 'V';
      break;
  }

  if (shorty != '\\0')
  {
    g_string_append_c (s, shorty);

    return;
  }

  if (length > 2 && name[length - 2] == '[' && name[length - 1] == ']')
  {
    g_string_append_c (s, '[');
    append_jni_type_name (s, name, length - 2);

    return;
  }

  g_string_append_c (s, 'L');

  for (i = 0; i != length; i++)
  {
    gchar ch = name[i];
    if (ch != '.')
      g_string_append_c (s, ch);
    else
      g_string_append_c (s, '/');
  }

  g_string_append_c (s, ';');
}

static void
std_string_destroy (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  if (is_large)
    cxx_delete (str->large.data);
}

static gchar *
std_string_get_data (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  return is_large ? str->large.data : str->tiny.data;
}
`,{current_backtrace:Memory.alloc(Process.pointerSize),perform_art_thread_state_transition:r,art_thread_get_long_jump_context:t["art::Thread::GetLongJumpContext"],art_stack_visitor_init:t["art::StackVisitor::StackVisitor"],art_stack_visitor_walk_stack:t["art::StackVisitor::WalkStack"],art_stack_visitor_get_method:t["art::StackVisitor::GetMethod"],art_stack_visitor_describe_location:t["art::StackVisitor::DescribeLocation"],translate_method:ce.replacedMethods.translate,translate_location:t["art::Monitor::TranslateLocation"],get_class_location:t["art::mirror::Class::GetLocation"],cxx_delete:t.$delete,strtoul:Process.getModuleByName("libc.so").getExportByName("strtoul")}),s=new NativeFunction(o._create,"pointer",["pointer","uint"],q),i=new NativeFunction(o._destroy,"void",["pointer"],q),c={exceptions:"propagate",scheduling:"exclusive"},a=new NativeFunction(o._get_id,"pointer",["pointer"],c),l=new NativeFunction(o._get_frames,"pointer",["pointer"],c),d=uo(n,e,o._on_thread_state_transition_complete);o._performData=d,r.writePointer(d),o.backtrace=(f,p)=>{let _=s(f,p),h=new Mn(_);return Script.bindWeak(h,u.bind(null,_)),h};function u(f){i(f)}return o.getId=f=>a(f).readUtf8String(),o.getFrames=f=>JSON.parse(l(f).readUtf8String()),o}var Mn=class{constructor(e){this.handle=e}get id(){return it.getId(this.handle)}get frames(){return it.getFrames(this.handle)}};function Hn(){Lt.forEach(n=>{n.vtablePtr.writePointer(n.vtable),n.vtableCountPtr.writeS32(n.vtableCount)}),Lt.clear();for(let n of io.splice(0))n.deactivate();for(let n of Un.splice(0))n.revert()}function co(n){let e=J(),t=ro(e).offset,r=t.jniIdManager,o=t.jniIdsIndirection;if(r!==null&&o!==null){let s=e.artRuntime;if(s.add(o).readInt()!==ka){let c=s.add(r).readPointer();return e["art::jni::JniIdManager::DecodeMethodId"](c,n)}}return n}var Yc={ia32:Xc,x64:el,arm:tl,arm64:nl};function Xc(n,e,t,r,o){let s=We(o).offset,i=Ie(o).offset,c;return Memory.patchCode(n,128,a=>{let l=new X86Writer(a,{pc:n}),d=new X86Relocator(e,l),u=[15,174,4,36],f=[15,174,12,36];l.putPushax(),l.putMovRegReg("ebp","esp"),l.putAndRegU32("esp",4294967280),l.putSubRegImm("esp",512),l.putBytes(u),l.putMovRegFsU32Ptr("ebx",s.self),l.putCallAddressWithAlignedArguments(ce.replacedMethods.findReplacementFromQuickCode,["eax","ebx"]),l.putTestRegReg("eax","eax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("ebp",7*4,"eax"),l.putLabel("restore_registers"),l.putBytes(f),l.putMovRegReg("esp","ebp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do c=d.readOne();while(c<t&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(c)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("eax",i.quickCode),l.flush()}),c}function el(n,e,t,r,o){let s=We(o).offset,i=Ie(o).offset,c;return Memory.patchCode(n,256,a=>{let l=new X86Writer(a,{pc:n}),d=new X86Relocator(e,l),u=[15,174,4,36],f=[15,174,12,36];l.putPushax(),l.putMovRegReg("rbp","rsp"),l.putAndRegU32("rsp",4294967280),l.putSubRegImm("rsp",512),l.putBytes(u),l.putMovRegGsU32Ptr("rbx",s.self),l.putCallAddressWithAlignedArguments(ce.replacedMethods.findReplacementFromQuickCode,["rdi","rbx"]),l.putTestRegReg("rax","rax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("rbp",8*8,"rax"),l.putLabel("restore_registers"),l.putBytes(f),l.putMovRegReg("rsp","rbp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do c=d.readOne();while(c<t&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(c)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("rdi",i.quickCode),l.flush()}),c}function tl(n,e,t,r,o){let s=Ie(o).offset,i=e.and(Fn),c;return Memory.patchCode(n,128,a=>{let l=new ThumbWriter(a,{pc:n}),d=new ThumbRelocator(i,l),u=[45,237,16,10],f=[189,236,16,10];l.putPushRegs(["r1","r2","r3","r5","r6","r7","r8","r10","r11","lr"]),l.putBytes(u),l.putSubRegRegImm("sp","sp",8),l.putStrRegRegOffset("r0","sp",0),l.putCallAddressWithArguments(ce.replacedMethods.findReplacementFromQuickCode,["r0","r9"]),l.putCmpRegImm("r0",0),l.putBCondLabel("eq","restore_registers"),l.putStrRegRegOffset("r0","sp",0),l.putLabel("restore_registers"),l.putLdrRegRegOffset("r0","sp",0),l.putAddRegRegImm("sp","sp",8),l.putBytes(f),l.putPopRegs(["lr","r11","r10","r8","r7","r6","r5","r3","r2","r1"]),l.putBCondLabel("ne","invoke_replacement");do c=d.readOne();while(c<t&&!d.eoi);d.writeAll(),d.eoi||l.putLdrRegAddress("pc",e.add(c)),l.putLabel("invoke_replacement"),l.putLdrRegRegOffset("pc","r0",s.quickCode),l.flush()}),c}function nl(n,e,t,{availableScratchRegs:r},o){let s=Ie(o).offset,i;return Memory.patchCode(n,256,c=>{let a=new Arm64Writer(c,{pc:n}),l=new Arm64Relocator(e,a);a.putPushRegReg("d0","d1"),a.putPushRegReg("d2","d3"),a.putPushRegReg("d4","d5"),a.putPushRegReg("d6","d7"),a.putPushRegReg("x1","x2"),a.putPushRegReg("x3","x4"),a.putPushRegReg("x5","x6"),a.putPushRegReg("x7","x20"),a.putPushRegReg("x21","x22"),a.putPushRegReg("x23","x24"),a.putPushRegReg("x25","x26"),a.putPushRegReg("x27","x28"),a.putPushRegReg("x29","lr"),a.putSubRegRegImm("sp","sp",16),a.putStrRegRegOffset("x0","sp",0),a.putCallAddressWithArguments(ce.replacedMethods.findReplacementFromQuickCode,["x0","x19"]),a.putCmpRegReg("x0","xzr"),a.putBCondLabel("eq","restore_registers"),a.putStrRegRegOffset("x0","sp",0),a.putLabel("restore_registers"),a.putLdrRegRegOffset("x0","sp",0),a.putAddRegRegImm("sp","sp",16),a.putPopRegReg("x29","lr"),a.putPopRegReg("x27","x28"),a.putPopRegReg("x25","x26"),a.putPopRegReg("x23","x24"),a.putPopRegReg("x21","x22"),a.putPopRegReg("x7","x20"),a.putPopRegReg("x5","x6"),a.putPopRegReg("x3","x4"),a.putPopRegReg("x1","x2"),a.putPopRegReg("d6","d7"),a.putPopRegReg("d4","d5"),a.putPopRegReg("d2","d3"),a.putPopRegReg("d0","d1"),a.putBCondLabel("ne","invoke_replacement");do i=l.readOne();while(i<t&&!l.eoi);if(l.writeAll(),!l.eoi){let d=Array.from(r)[0];a.putLdrRegAddress(d,e.add(i)),a.putBrReg(d)}a.putLabel("invoke_replacement"),a.putLdrRegRegOffset("x16","x0",s.quickCode),a.putBrReg("x16"),a.flush()}),i}var rl={ia32:Qr,x64:Qr,arm:ol,arm64:sl};function Qr(n,e,t){Memory.patchCode(n,16,r=>{let o=new X86Writer(r,{pc:n});o.putJmpAddress(e),o.flush()})}function ol(n,e,t){let r=n.and(Fn);Memory.patchCode(r,16,o=>{let s=new ThumbWriter(o,{pc:r});s.putLdrRegAddress("pc",e.or(1)),s.flush()})}function sl(n,e,t){Memory.patchCode(n,16,r=>{let o=new Arm64Writer(r,{pc:n});t===16?o.putLdrRegAddress("x16",e):o.putAdrpRegAddress("x16",e),o.putBrReg("x16"),o.flush()})}var il={ia32:5,x64:16,arm:8,arm64:16},Nt=class{constructor(e){this.quickCode=e,this.quickCodeAddress=Process.arch==="arm"?e.and(Fn):e,this.redirectSize=0,this.trampoline=null,this.overwrittenPrologue=null,this.overwrittenPrologueLength=0}_canRelocateCode(e,t){let r=Nn[Process.arch],o=Fc[Process.arch],{quickCodeAddress:s}=this,i=new r(s),c=new o(s,i),a;if(Process.arch==="arm64"){let l=new Set(["x16","x17"]);do{let d=c.readOne(),u=new Set(l),{read:f,written:p}=c.input.regsAccessed;for(let _ of[f,p])for(let h of _){let g;h.startsWith("w")?g="x"+h.substring(1):g=h,u.delete(g)}if(u.size===0)break;a=d,l=u}while(a<e&&!c.eoi);t.availableScratchRegs=l}else do a=c.readOne();while(a<e&&!c.eoi);return a>=e}_allocateTrampoline(){It===null&&(It=en(S===4?128:256));let e=il[Process.arch],t,r,o=1,s={};if(S===4||this._canRelocateCode(e,s))t=e,r={};else{let i;Process.arch==="x64"?(t=5,i=Na):Process.arch==="arm64"&&(t=8,i=Ma,o=4096),r={near:this.quickCodeAddress,maxDistance:i}}return this.redirectSize=t,this.trampoline=It.allocateSlice(r,o),s}_destroyTrampoline(){It.freeSlice(this.trampoline)}activate(e){let t=this._allocateTrampoline(),{trampoline:r,quickCode:o,redirectSize:s}=this,i=Yc[Process.arch],c=i(r,o,s,t,e);this.overwrittenPrologueLength=c,this.overwrittenPrologue=Memory.dup(this.quickCodeAddress,c);let a=rl[Process.arch];a(o,r,s)}deactivate(){let{quickCodeAddress:e,overwrittenPrologueLength:t}=this,r=Nn[Process.arch];Memory.patchCode(e,t,o=>{let s=new r(o,{pc:e}),{overwrittenPrologue:i}=this;s.putBytes(i.readByteArray(t)),s.flush()}),this._destroyTrampoline()}};function al(n){let e=J(),{module:t,artClassLinker:r}=e;return n.equals(r.quickGenericJniTrampoline)||n.equals(r.quickToInterpreterBridgeTrampoline)||n.equals(r.quickResolutionTrampoline)||n.equals(r.quickImtConflictTrampoline)||n.compare(t.base)>=0&&n.compare(t.base.add(t.size))<0}var Rn=class{constructor(e){let t=co(e);this.methodId=t,this.originalMethod=null,this.hookedMethodId=t,this.replacementMethodId=null,this.interceptor=null}replace(e,t,r,o,s){let{kAccCompileDontBother:i,artNterpEntryPoint:c}=s;this.originalMethod=Yr(this.methodId,o);let a=this.originalMethod.accessFlags;if((a&xa)!==0&&cl()){let p=this.originalMethod.jniCode;this.hookedMethodId=p.add(2*S).readPointer(),this.originalMethod=Yr(this.hookedMethodId,o)}let{hookedMethodId:l}=this,d=dl(l,o);this.replacementMethodId=d,Tt(d,{jniCode:e,accessFlags:(a&~(Ia|wa|Vr)|At|i)>>>0,quickCode:s.artClassLinker.quickGenericJniTrampoline,interpreterCode:s.artInterpreterToCompiledCodeBridge},o);let u=to|Ca|Vr;(a&At)===0&&(u|=Ta),Tt(l,{accessFlags:(a&~u|i)>>>0},o);let f=this.originalMethod.quickCode;if(c!==null&&f.equals(c)&&Tt(l,{quickCode:s.artQuickToInterpreterBridge},o),!al(f)){let p=new Nt(f);p.activate(o),this.interceptor=p}ce.replacedMethods.set(l,d),Uc(l,o)}revert(e){let{hookedMethodId:t,interceptor:r}=this;Tt(t,this.originalMethod,e),ce.replacedMethods.delete(t),r!==null&&(r.deactivate(),this.interceptor=null)}resolveTarget(e,t,r,o){return this.hookedMethodId}};function cl(){return ee()<28}function Yr(n,e){let r=Ie(e).offset;return["jniCode","accessFlags","quickCode","interpreterCode"].reduce((o,s)=>{let i=r[s];if(i===void 0)return o;let c=n.add(i),a=s==="accessFlags"?ma:ga;return o[s]=a.call(c),o},{})}function Tt(n,e,t){let o=Ie(t).offset;Object.keys(e).forEach(s=>{let i=o[s];if(i===void 0)return;let c=n.add(i);(s==="accessFlags"?ba:ya).call(c,e[s])})}var On=class{constructor(e){this.methodId=e,this.originalMethod=null}replace(e,t,r,o,s){let{methodId:i}=this;this.originalMethod=Memory.dup(i,bn);let c=r.reduce((f,p)=>f+p.size,0);t&&c++;let a=(i.add(zr).readU32()|At)>>>0,l=c,d=0,u=c;i.add(zr).writeU32(a),i.add(Ua).writeU16(l),i.add(Da).writeU16(d),i.add(Ba).writeU16(u),i.add(za).writeU32(ll(i)),s.dvmUseJNIBridge(i,e)}revert(e){Memory.copy(this.methodId,this.originalMethod,bn)}resolveTarget(e,t,r,o){let s=r.handle.add(no).readPointer(),i;if(t)i=o.dvmDecodeIndirectRef(s,e.$h);else{let f=e.$borrowClassHandle(r);i=o.dvmDecodeIndirectRef(s,f.value),f.unref(r)}let c;t?c=i.add(Pa).readPointer():c=i;let a=c.toString(16),l=Lt.get(a);if(l===void 0){let f=c.add(ja),p=c.add(Oa),_=f.readPointer(),h=p.readS32(),g=h*S,b=Memory.alloc(2*g);Memory.copy(b,_,g),f.writePointer(b),l={classObject:c,vtablePtr:f,vtableCountPtr:p,vtable:_,vtableCount:h,shadowVtable:b,shadowVtableCount:h,targetMethods:new Map},Lt.set(a,l)}let d=this.methodId.toString(16),u=l.targetMethods.get(d);if(u===void 0){u=Memory.dup(this.originalMethod,bn);let f=l.shadowVtableCount++;l.shadowVtable.add(f*S).writePointer(u),u.add(Fa).writeU16(f),l.vtableCountPtr.writeS32(l.shadowVtableCount),l.targetMethods.set(d,u)}return u}};function ll(n){if(Process.arch!=="ia32")return Jr;let e=n.add(Va).readPointer().readCString();if(e===null||e.length===0||e.length>65535)return Jr;let t;switch(e[0]){case"V":t=Ja;break;case"F":t=$a;break;case"D":t=Ga;break;case"J":t=Ha;break;case"Z":case"B":t=Ka;break;case"C":t=qa;break;case"S":t=Wa;break;default:t=Za;break}let r=0;for(let o=e.length-1;o>0;o--){let s=e[o];r+=s==="D"||s==="J"?2:1}return t<<Qa|r}function dl(n,e){let t=J();if(ee()<23){let r=t["art::Thread::CurrentFromGdb"]();return t["art::mirror::Object::Clone"](n,r)}return Memory.dup(n,Ie(e).size)}function Zn(n,e,t){lo(n,e,An,t)}function Wn(n,e){lo(n,e,Cn)}function qn(n,e){let t=J();if(ee()<26)throw new Error("This API is only available on Android >= 8.0");Ee(n,e,r=>{t["art::Runtime::DeoptimizeBootImage"](t.artRuntime)})}function lo(n,e,t,r){let o=J();if(ee()<24)throw new Error("This API is only available on Android >= 7.0");Ee(n,e,s=>{if(ee()<30){if(!o.isJdwpStarted()){let c=ul(o);ic.push(c)}o.isDebuggerActive()||o["art::Dbg::GoActive"]();let i=Memory.alloc(8+S);switch(i.writeU32(t),t){case Cn:break;case An:i.add(8).writePointer(r);break;default:throw new Error("Unsupported deoptimization kind")}o["art::Dbg::RequestDeoptimization"](i),o["art::Dbg::ManageDeoptimization"]()}else{let i=o.artInstrumentation;if(i===null)throw new Error("Unable to find Instrumentation class in ART; please file a bug");let c=o["art::Instrumentation::EnableDeoptimization"];switch(c!==void 0&&(i.add(tc().offset.deoptimizationEnabled).readU8()||c(i)),t){case Cn:o["art::Instrumentation::DeoptimizeEverything"](i,Memory.allocUtf8String("frida"));break;case An:o["art::Instrumentation::Deoptimize"](i,r);break;default:throw new Error("Unsupported deoptimization kind")}}})}var jn=class{constructor(){let e=Process.getModuleByName("libart.so"),t=e.getExportByName("_ZN3art4JDWP12JdwpAdbState6AcceptEv"),r=e.getExportByName("_ZN3art4JDWP12JdwpAdbState15ReceiveClientFdEv"),o=Xr(),s=Xr();this._controlFd=o[0],this._clientFd=s[0];let i=null;i=Interceptor.attach(t,function(c){let a=c[0];Memory.scanSync(a.add(8252),256,"00 ff ff ff ff 00")[0].address.add(1).writeS32(o[1]),i.detach()}),Interceptor.replace(r,new NativeCallback(function(c){return Interceptor.revert(r),s[1]},"int",["pointer"])),Interceptor.flush(),this._handshakeRequest=this._performHandshake()}async _performHandshake(){let e=new UnixInputStream(this._clientFd,{autoClose:!1}),t=new UnixOutputStream(this._clientFd,{autoClose:!1}),r=[74,68,87,80,45,72,97,110,100,115,104,97,107,101];try{await t.writeAll(r),await e.readAll(r.length)}catch{}}};function ul(n){let e=new jn;n["art::Dbg::SetJdwpAllowed"](1);let t=pl();n["art::Dbg::ConfigureJdwp"](t);let r=n["art::InternalDebuggerControlCallback::StartDebugger"];return r!==void 0?r(NULL):n["art::Dbg::StartJdwp"](),e}function pl(){let n=ee()<28?2:3,e=0,t=n,r=!0,o=!1,s=e,i=8+ct+2,c=Memory.alloc(i);return c.writeU32(t).add(4).writeU8(r?1:0).add(1).writeU8(o?1:0).add(1).add(ct).writeU16(s),c}function Xr(){Sn===null&&(Sn=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("socketpair"),"int",["int","int","int","pointer"]));let n=Memory.alloc(8);if(Sn(Xa,ec,0,n)===-1)throw new Error("Unable to create socketpair for JDWP");return[n.readS32(),n.add(4).readS32()]}function fl(n){let e=dc().offset,t=n.vm.add(e.globalsLock),r=n.vm.add(e.globals),o=n["art::IndirectReferenceTable::Add"],s=n["art::ReaderWriterMutex::ExclusiveLock"],i=n["art::ReaderWriterMutex::ExclusiveUnlock"],c=0;return function(a,l,d){s(t,l);try{return o(r,c,d)}finally{i(t,l)}}}function hl(n){let e=n["art::Thread::DecodeJObject"];if(e===void 0)throw new Error("art::Thread::DecodeJObject is not available; please file a bug");return function(t,r,o){return e(r,o)}}var _l={ia32:eo,x64:eo,arm:ml,arm64:gl};function uo(n,e,t){let r=J(),o=e.handle.readPointer(),s,i=r.find("_ZN3art3JNIILb1EE14ExceptionClearEP7_JNIEnv");i!==null?s=i:s=o.add(Ot).readPointer();let c,a=r.find("_ZN3art3JNIILb1EE10FatalErrorEP7_JNIEnvPKc");a!==null?c=a:c=o.add(Ra).readPointer();let l=_l[Process.arch];if(l===void 0)throw new Error("Not yet implemented for "+Process.arch);let d=null,u=We(n).offset,f=u.exception,p=new Set,_=u.isExceptionReportedToInstrumentation;_!==null&&p.add(_);let h=u.throwLocation;h!==null&&(p.add(h),p.add(h+S),p.add(h+2*S));let g=65536,b=Memory.alloc(g);return Memory.patchCode(b,g,v=>{d=l(v,b,s,c,f,p,t)}),d._code=b,d._callback=t,d}function eo(n,e,t,r,o,s,i){let c={},a=new Set,l=[t];for(;l.length>0;){let h=l.shift();if(Object.values(c).some(({begin:N,end:M})=>h.compare(N)>=0&&h.compare(M)<0))continue;let b=h.toString(),v={begin:h},I=null,x=!1;do{if(h.equals(r)){x=!0;break}let N=Instruction.parse(h);I=N;let M=c[N.address.toString()];if(M!==void 0){delete c[M.begin.toString()],c[b]=M,M.begin=v.begin,v=null;break}let k=null;switch(N.mnemonic){case"jmp":k=ptr(N.operands[0].value),x=!0;break;case"je":case"jg":case"jle":case"jne":case"js":k=ptr(N.operands[0].value);break;case"ret":x=!0;break}k!==null&&(a.add(k.toString()),l.push(k),l.sort((j,E)=>j.compare(E))),h=N.next}while(!x);v!==null&&(v.end=I.address.add(I.size),c[b]=v)}let d=Object.keys(c).map(h=>c[h]);d.sort((h,g)=>h.begin.compare(g.begin));let u=c[t.toString()];d.splice(d.indexOf(u),1),d.unshift(u);let f=new X86Writer(n,{pc:e}),p=!1,_=null;return d.forEach(h=>{let g=h.end.sub(h.begin).toInt32(),b=new X86Relocator(h.begin,f),v;for(;(v=b.readOne())!==0;){let I=b.input,{mnemonic:x}=I,N=I.address.toString();a.has(N)&&f.putLabel(N);let M=!0;switch(x){case"jmp":f.putJmpNearLabel(fe(I.operands[0])),M=!1;break;case"je":case"jg":case"jle":case"jne":case"js":f.putJccNearLabel(x,fe(I.operands[0]),"no-hint"),M=!1;break;case"mov":{let[k,j]=I.operands;if(k.type==="mem"&&j.type==="imm"){let E=k.value,L=E.disp;if(L===o&&j.value.valueOf()===0){if(_=E.base,f.putPushfx(),f.putPushax(),f.putMovRegReg("xbp","xsp"),S===4)f.putAndRegU32("esp",4294967280);else{let R=_!=="rdi"?"rdi":"rsi";f.putMovRegU64(R,uint64("0xfffffffffffffff0")),f.putAndRegReg("rsp",R)}f.putCallAddressWithAlignedArguments(i,[_]),f.putMovRegReg("xsp","xbp"),f.putPopax(),f.putPopfx(),p=!0,M=!1}else s.has(L)&&E.base===_&&(M=!1)}break}case"call":{let k=I.operands[0];k.type==="mem"&&k.value.disp===Ot&&(S===4?(f.putPopReg("eax"),f.putMovRegRegOffsetPtr("eax","eax",4),f.putPushReg("eax")):f.putMovRegRegOffsetPtr("rdi","rdi",8),f.putCallAddressWithArguments(i,[]),p=!0,M=!1);break}}if(M?b.writeAll():b.skipOne(),v===g)break}b.dispose()}),f.dispose(),p||Kn(),new NativeFunction(e,"void",["pointer"],q)}function ml(n,e,t,r,o,s,i){let c={},a=new Set,l=ptr(1).not(),d=[t];for(;d.length>0;){let b=d.shift();if(Object.values(c).some(({begin:L,end:R})=>b.compare(L)>=0&&b.compare(R)<0))continue;let I=b.and(l),x=I.toString(),N=b.and(1),M={begin:I},k=null,j=!1,E=0;do{if(b.equals(r)){j=!0;break}let L=Instruction.parse(b),{mnemonic:R}=L;k=L;let O=b.and(l).toString(),U=c[O];if(U!==void 0){delete c[U.begin.toString()],c[x]=U,U.begin=M.begin,M=null;break}let D=E===0,F=null;switch(R){case"b":F=ptr(L.operands[0].value),j=D;break;case"beq.w":case"beq":case"bne":case"bne.w":case"bgt":F=ptr(L.operands[0].value);break;case"cbz":case"cbnz":F=ptr(L.operands[1].value);break;case"pop.w":D&&(j=L.operands.filter(V=>V.value==="pc").length===1);break}switch(R){case"it":E=1;break;case"itt":E=2;break;case"ittt":E=3;break;case"itttt":E=4;break;default:E>0&&E--;break}F!==null&&(a.add(F.toString()),d.push(F.or(N)),d.sort((V,X)=>V.compare(X))),b=L.next}while(!j);M!==null&&(M.end=k.address.add(k.size),c[x]=M)}let u=Object.keys(c).map(b=>c[b]);u.sort((b,v)=>b.begin.compare(v.begin));let f=c[t.and(l).toString()];u.splice(u.indexOf(f),1),u.unshift(f);let p=new ThumbWriter(n,{pc:e}),_=!1,h=null,g=null;return u.forEach(b=>{let v=new ThumbRelocator(b.begin,p),I=b.begin,x=b.end,N=0;do{if(v.readOne()===0)throw new Error("Unexpected end of block");let k=v.input;I=k.address,N=k.size;let{mnemonic:j}=k,E=I.toString();a.has(E)&&p.putLabel(E);let L=!0;switch(j){case"b":p.putBLabel(fe(k.operands[0])),L=!1;break;case"beq.w":p.putBCondLabelWide("eq",fe(k.operands[0])),L=!1;break;case"bne.w":p.putBCondLabelWide("ne",fe(k.operands[0])),L=!1;break;case"beq":case"bne":case"bgt":p.putBCondLabelWide(j.substr(1),fe(k.operands[0])),L=!1;break;case"cbz":{let R=k.operands;p.putCbzRegLabel(R[0].value,fe(R[1])),L=!1;break}case"cbnz":{let R=k.operands;p.putCbnzRegLabel(R[0].value,fe(R[1])),L=!1;break}case"str":case"str.w":{let R=k.operands[1].value,w=R.disp;if(w===o){h=R.base;let O=h!=="r4"?"r4":"r5",U=["r0","r1","r2","r3",O,"r9","r12","lr"];p.putPushRegs(U),p.putMrsRegReg(O,"apsr-nzcvq"),p.putCallAddressWithArguments(i,[h]),p.putMsrRegReg("apsr-nzcvq",O),p.putPopRegs(U),_=!0,L=!1}else s.has(w)&&R.base===h&&(L=!1);break}case"ldr":{let[R,w]=k.operands;if(w.type==="mem"){let O=w.value;O.base[0]==="r"&&O.disp===Ot&&(g=R.value)}break}case"blx":k.operands[0].value===g&&(p.putLdrRegRegOffset("r0","r0",4),p.putCallAddressWithArguments(i,["r0"]),_=!0,g=null,L=!1);break}L?v.writeAll():v.skipOne()}while(!I.add(N).equals(x));v.dispose()}),p.dispose(),_||Kn(),new NativeFunction(e.or(1),"void",["pointer"],q)}function gl(n,e,t,r,o,s,i){let c={},a=new Set,l=[t];for(;l.length>0;){let b=l.shift();if(Object.values(c).some(({begin:k,end:j})=>b.compare(k)>=0&&b.compare(j)<0))continue;let I=b.toString(),x={begin:b},N=null,M=!1;do{if(b.equals(r)){M=!0;break}let k;try{k=Instruction.parse(b)}catch(L){if(b.readU32()===0){M=!0;break}else throw L}N=k;let j=c[k.address.toString()];if(j!==void 0){delete c[j.begin.toString()],c[I]=j,j.begin=x.begin,x=null;break}let E=null;switch(k.mnemonic){case"b":E=ptr(k.operands[0].value),M=!0;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":E=ptr(k.operands[0].value);break;case"cbz":case"cbnz":E=ptr(k.operands[1].value);break;case"tbz":case"tbnz":E=ptr(k.operands[2].value);break;case"ret":M=!0;break}E!==null&&(a.add(E.toString()),l.push(E),l.sort((L,R)=>L.compare(R))),b=k.next}while(!M);x!==null&&(x.end=N.address.add(N.size),c[I]=x)}let d=Object.keys(c).map(b=>c[b]);d.sort((b,v)=>b.begin.compare(v.begin));let u=c[t.toString()];d.splice(d.indexOf(u),1),d.unshift(u);let f=new Arm64Writer(n,{pc:e});f.putBLabel("performTransition");let p=e.add(f.offset);f.putPushAllXRegisters(),f.putCallAddressWithArguments(i,["x0"]),f.putPopAllXRegisters(),f.putRet(),f.putLabel("performTransition");let _=!1,h=null,g=null;return d.forEach(b=>{let v=b.end.sub(b.begin).toInt32(),I=new Arm64Relocator(b.begin,f),x;for(;(x=I.readOne())!==0;){let N=I.input,{mnemonic:M}=N,k=N.address.toString();a.has(k)&&f.putLabel(k);let j=!0;switch(M){case"b":f.putBLabel(fe(N.operands[0])),j=!1;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":f.putBCondLabel(M.substr(2),fe(N.operands[0])),j=!1;break;case"cbz":{let E=N.operands;f.putCbzRegLabel(E[0].value,fe(E[1])),j=!1;break}case"cbnz":{let E=N.operands;f.putCbnzRegLabel(E[0].value,fe(E[1])),j=!1;break}case"tbz":{let E=N.operands;f.putTbzRegImmLabel(E[0].value,E[1].value.valueOf(),fe(E[2])),j=!1;break}case"tbnz":{let E=N.operands;f.putTbnzRegImmLabel(E[0].value,E[1].value.valueOf(),fe(E[2])),j=!1;break}case"str":{let E=N.operands,L=E[0].value,R=E[1].value,w=R.disp;L==="xzr"&&w===o?(h=R.base,f.putPushRegReg("x0","lr"),f.putMovRegReg("x0",h),f.putBlImm(p),f.putPopRegReg("x0","lr"),_=!0,j=!1):s.has(w)&&R.base===h&&(j=!1);break}case"ldr":{let E=N.operands,L=E[1].value;L.base[0]==="x"&&L.disp===Ot&&(g=E[0].value);break}case"blr":N.operands[0].value===g&&(f.putLdrRegRegOffset("x0","x0",8),f.putCallAddressWithArguments(i,["x0"]),_=!0,g=null,j=!1);break}if(j?I.writeAll():I.skipOne(),x===v)break}I.dispose()}),f.dispose(),_||Kn(),new NativeFunction(e,"void",["pointer"],q)}function Kn(){throw new Error("Unable to parse ART internals; please file a bug")}function bl(n){let e=n["art::ArtMethod::PrettyMethod"];e!==void 0&&(Interceptor.attach(e.impl,ce.hooks.ArtMethod.prettyMethod),Interceptor.flush())}function fe(n){return ptr(n.value).toString()}function yl(n,e){return new NativeFunction(n,"pointer",e,q)}function El(n,e){let t=new NativeFunction(n,"void",["pointer"].concat(e),q);return function(){let r=Memory.alloc(S);return t(r,...arguments),r.readPointer()}}function Ct(n,e){let{arch:t}=Process;switch(t){case"ia32":case"arm64":{let r;t==="ia32"?r=Ze(64,i=>{let c=1+e.length,a=c*4;i.putSubRegImm("esp",a);for(let l=0;l!==c;l++){let d=l*4;i.putMovRegRegOffsetPtr("eax","esp",a+4+d),i.putMovRegOffsetPtrReg("esp",d,"eax")}i.putCallAddress(n),i.putAddRegImm("esp",a-4),i.putRet()}):r=Ze(32,i=>{i.putMovRegReg("x8","x0"),e.forEach((c,a)=>{i.putMovRegReg("x"+a,"x"+(a+1))}),i.putLdrRegAddress("x7",n),i.putBrReg("x7")});let o=new NativeFunction(r,"void",["pointer"].concat(e),q),s=function(...i){o(...i)};return s.handle=r,s.impl=n,s}default:{let r=new NativeFunction(n,"void",["pointer"].concat(e),q);return r.impl=n,r}}}var Mt=class{constructor(){this.handle=Memory.alloc(ct)}dispose(){let[e,t]=this._getData();t||J().$delete(e)}disposeToString(){let e=this.toString();return this.dispose(),e}toString(){let[e]=this._getData();return e.readUtf8String()}_getData(){let e=this.handle,t=(e.readU8()&1)===0;return[t?e.add(1):e.add(2*S).readPointer(),t]}},Pn=class{$delete(){this.dispose(),J().$delete(this)}constructor(e,t){this.handle=e,this._begin=e,this._end=e.add(S),this._storage=e.add(2*S),this._elementSize=t}init(){this.begin=NULL,this.end=NULL,this.storage=NULL}dispose(){J().$delete(this.begin)}get begin(){return this._begin.readPointer()}set begin(e){this._begin.writePointer(e)}get end(){return this._end.readPointer()}set end(e){this._end.writePointer(e)}get storage(){return this._storage.readPointer()}set storage(e){this._storage.writePointer(e)}get size(){return this.end.sub(this.begin).toInt32()/this._elementSize}},lt=class n extends Pn{static $new(){let e=new n(J().$new(Ya));return e.init(),e}constructor(e){super(e,S)}get handles(){let e=[],t=this.begin,r=this.end;for(;!t.equals(r);)e.push(t.readPointer()),t=t.add(S);return e}},vl=0,po=S,fo=po+4,Sl=-1,Rt=class n{$delete(){this.dispose(),J().$delete(this)}constructor(e){this.handle=e,this._link=e.add(vl),this._numberOfReferences=e.add(po)}init(e,t){this.link=e,this.numberOfReferences=t}dispose(){}get link(){return new n(this._link.readPointer())}set link(e){this._link.writePointer(e)}get numberOfReferences(){return this._numberOfReferences.readS32()}set numberOfReferences(e){this._numberOfReferences.writeS32(e)}},ho=Cl(fo),_o=ho+S,wl=_o+S,dt=class n extends Rt{static $new(e,t){let r=new n(J().$new(wl));return r.init(e,t),r}constructor(e){super(e),this._self=e.add(ho),this._currentScope=e.add(_o);let o=(64-S-4-4)/4;this._scopeLayout=at.layoutForCapacity(o),this._topHandleScopePtr=null}init(e,t){let r=e.add(We(t).offset.topHandleScope);this._topHandleScopePtr=r,super.init(r.readPointer(),Sl),this.self=e,this.currentScope=at.$new(this._scopeLayout),r.writePointer(this)}dispose(){this._topHandleScopePtr.writePointer(this.link);let e;for(;(e=this.currentScope)!==null;){let t=e.link;e.$delete(),this.currentScope=t}}get self(){return this._self.readPointer()}set self(e){this._self.writePointer(e)}get currentScope(){let e=this._currentScope.readPointer();return e.isNull()?null:new at(e,this._scopeLayout)}set currentScope(e){this._currentScope.writePointer(e)}newHandle(e){return this.currentScope.newHandle(e)}},at=class n extends Rt{static $new(e){let t=new n(J().$new(e.size),e);return t.init(),t}constructor(e,t){super(e);let{offset:r}=t;this._refsStorage=e.add(r.refsStorage),this._pos=e.add(r.pos),this._layout=t}init(){super.init(NULL,this._layout.numberOfReferences),this.pos=0}get pos(){return this._pos.readU32()}set pos(e){this._pos.writeU32(e)}newHandle(e){let t=this.pos,r=this._refsStorage.add(t*4);return r.writeS32(e.toInt32()),this.pos=t+1,r}static layoutForCapacity(e){let t=fo,r=t+e*4;return{size:r+4,numberOfReferences:e,offset:{refsStorage:t,pos:r}}}},Il={arm:function(n,e){let t=Process.pageSize,r=Memory.alloc(t);Memory.protect(r,t,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let s=[26625,18947,17041,53505,19202,18200,18288,48896],i=s.length*2,c=i+4,a=c+4;return Memory.patchCode(r,a,function(l){s.forEach((d,u)=>{l.add(u*2).writeU16(d)}),l.add(i).writeS32(n),l.add(c).writePointer(o)}),r.or(1)},arm64:function(n,e){let t=Process.pageSize,r=Memory.alloc(t);Memory.protect(r,t,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let s=[3107979265,402653378,1795293247,1409286241,1476395139,3592355936,3596551104],i=s.length*4,c=i+4,a=c+8;return Memory.patchCode(r,a,function(l){s.forEach((d,u)=>{l.add(u*4).writeU32(d)}),l.add(i).writeS32(n),l.add(c).writePointer(o)}),r}};function Qn(n,e){return(Il[Process.arch]||Tl)(n,e)}function Tl(n,e){return new NativeCallback(t=>{t.readS32()===n&&e(t)},"void",["pointer","pointer"])}function Cl(n){let e=n%S;return e!==0?n+S-e:n}var Al=4,{pointerSize:z}=Process,Ll=256,xl=65536,kl=131072,Nl=33554432,Ml=67108864,Rl=134217728,De={exceptions:"propagate"},yo=le(Hl),Ol=le(Wl),jl=le(Jl),Yn=null,Xn=!1,Ft=new Map,pt=new Map;function Te(){return Yn===null&&(Yn=Pl()),Yn}function Pl(){let n=Process.enumerateModules().filter(a=>/jvm.(dll|dylib|so)$/.test(a.name));if(n.length===0)return null;let e=n[0],t={flavor:"jvm"},r=Process.platform==="windows"?[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]],"VMThread::execute":["VMThread::execute","void",["pointer"]],"Method::size":["Method::size","int",["int"]],"Method::set_native_function":["Method::set_native_function","void",["pointer","pointer","int"]],"Method::clear_native_function":["Method::clear_native_function","void",["pointer"]],"Method::jmethod_id":["Method::jmethod_id","pointer",["pointer"]],"ClassLoaderDataGraph::classes_do":["ClassLoaderDataGraph::classes_do","void",["pointer"]],"NMethodSweeper::sweep_code_cache":["NMethodSweeper::sweep_code_cache","void",[]],"OopMapCache::flush_obsolete_entries":["OopMapCache::flush_obsolete_entries","void",["pointer"]]},variables:{"VM_RedefineClasses::`vftable'":function(a){this.vtableRedefineClasses=a},"VM_RedefineClasses::doit":function(a){this.redefineClassesDoIt=a},"VM_RedefineClasses::doit_prologue":function(a){this.redefineClassesDoItPrologue=a},"VM_RedefineClasses::doit_epilogue":function(a){this.redefineClassesDoItEpilogue=a},"VM_RedefineClasses::allow_nested_vm_operations":function(a){this.redefineClassesAllow=a},"NMethodSweeper::_traversals":function(a){this.traversals=a},"NMethodSweeper::_should_sweep":function(a){this.shouldSweep=a}},optionals:[]}]:[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],_ZN6Method4sizeEb:["Method::size","int",["int"]],_ZN6Method19set_native_functionEPhb:["Method::set_native_function","void",["pointer","pointer","int"]],_ZN6Method21clear_native_functionEv:["Method::clear_native_function","void",["pointer"]],_ZN6Method24restore_unshareable_infoEP10JavaThread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method24restore_unshareable_infoEP6Thread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method11link_methodERK12methodHandleP10JavaThread:["Method::link_method","void",["pointer","pointer","pointer"]],_ZN6Method10jmethod_idEv:["Method::jmethod_id","pointer",["pointer"]],_ZN6Method10clear_codeEv:function(a){let l=new NativeFunction(a,"void",["pointer"],De);this["Method::clear_code"]=function(d){l(d)}},_ZN6Method10clear_codeEb:function(a){let l=new NativeFunction(a,"void",["pointer","int"],De),d=0;this["Method::clear_code"]=function(u){l(u,d)}},_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass:["VM_RedefineClasses::mark_dependent_code","void",["pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeEv:["VM_RedefineClasses::flush_dependent_code","void",[]],_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN19ResolvedMethodTable21adjust_method_entriesEPb:["ResolvedMethodTable::adjust_method_entries","void",["pointer"]],_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb:["MemberNameTable::adjust_method_entries","void",["pointer","pointer","pointer"]],_ZN17ConstantPoolCache21adjust_method_entriesEPb:function(a){let l=new NativeFunction(a,"void",["pointer","pointer"],De);this["ConstantPoolCache::adjust_method_entries"]=function(d,u,f){l(d,f)}},_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb:function(a){let l=new NativeFunction(a,"void",["pointer","pointer","pointer"],De);this["ConstantPoolCache::adjust_method_entries"]=function(d,u,f){l(d,u,f)}},_ZN20ClassLoaderDataGraph10classes_doEP12KlassClosure:["ClassLoaderDataGraph::classes_do","void",["pointer"]],_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb:["ClassLoaderDataGraph::clean_deallocate_lists","void",["int"]],_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_:["JavaThread::thread_from_jni_environment","pointer",["pointer"]],_ZN8VMThread7executeEP12VM_Operation:["VMThread::execute","void",["pointer"]],_ZN11OopMapCache22flush_obsolete_entriesEv:["OopMapCache::flush_obsolete_entries","void",["pointer"]],_ZN14NMethodSweeper11force_sweepEv:["NMethodSweeper::force_sweep","void",[]],_ZN14NMethodSweeper16sweep_code_cacheEv:["NMethodSweeper::sweep_code_cache","void",[]],_ZN14NMethodSweeper17sweep_in_progressEv:["NMethodSweeper::sweep_in_progress","bool",[]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]]},variables:{_ZN18VM_RedefineClasses14_the_class_oopE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses10_the_classE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass:function(a){this.doKlass=a},_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass:function(a){this.doKlass=a},_ZTV18VM_RedefineClasses:function(a){this.vtableRedefineClasses=a},_ZN18VM_RedefineClasses4doitEv:function(a){this.redefineClassesDoIt=a},_ZN18VM_RedefineClasses13doit_prologueEv:function(a){this.redefineClassesDoItPrologue=a},_ZN18VM_RedefineClasses13doit_epilogueEv:function(a){this.redefineClassesDoItEpilogue=a},_ZN18VM_RedefineClassesD0Ev:function(a){this.redefineClassesDispose0=a},_ZN18VM_RedefineClassesD1Ev:function(a){this.redefineClassesDispose1=a},_ZNK18VM_RedefineClasses26allow_nested_vm_operationsEv:function(a){this.redefineClassesAllow=a},_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream:function(a){this.redefineClassesOnError=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread:function(a){this.createNewDefaultVtableIndices=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread:function(a){this.createNewDefaultVtableIndices=a},_ZN19Abstract_VM_Version19jre_release_versionEv:function(a){let d=new NativeFunction(a,"pointer",[],De)().readCString();this.version=d.startsWith("1.8")?8:d.startsWith("9.")?9:parseInt(d.slice(0,2),10),this.versionS=d},_ZN14NMethodSweeper11_traversalsE:function(a){this.traversals=a},_ZN14NMethodSweeper21_sweep_fractions_leftE:function(a){this.fractions=a},_ZN14NMethodSweeper13_should_sweepE:function(a){this.shouldSweep=a}},optionals:["_ZN6Method24restore_unshareable_infoEP10JavaThread","_ZN6Method24restore_unshareable_infoEP6Thread","_ZN6Method11link_methodERK12methodHandleP10JavaThread","_ZN6Method10clear_codeEv","_ZN6Method10clear_codeEb","_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass","_ZN18VM_RedefineClasses20flush_dependent_codeEv","_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread","_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread","_ZN19ResolvedMethodTable21adjust_method_entriesEPb","_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb","_ZN17ConstantPoolCache21adjust_method_entriesEPb","_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb","_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb","_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_","_ZN14NMethodSweeper11force_sweepEv","_ZN14NMethodSweeper17sweep_in_progressEv","_ZN18VM_RedefineClasses14_the_class_oopE","_ZN18VM_RedefineClasses10_the_classE","_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass","_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass","_ZN18VM_RedefineClassesD0Ev","_ZN18VM_RedefineClassesD1Ev","_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread","_ZN14NMethodSweeper21_sweep_fractions_leftE"]}],o=[];if(r.forEach(function(a){let l=a.module,d=a.functions||{},u=a.variables||{},f=new Set(a.optionals||[]),p=l.enumerateExports().reduce(function(h,g){return h[g.name]=g,h},{}),_=l.enumerateSymbols().reduce(function(h,g){return h[g.name]=g,h},p);Object.keys(d).forEach(function(h){let g=_[h];if(g!==void 0){let b=d[h];typeof b=="function"?b.call(t,g.address):t[b[0]]=new NativeFunction(g.address,b[1],b[2],De)}else f.has(h)||o.push(h)}),Object.keys(u).forEach(function(h){let g=_[h];g!==void 0?u[h].call(t,g.address):f.has(h)||o.push(h)})}),o.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+o.join(", "));let s=Memory.alloc(z),i=Memory.alloc(Al);if(de("JNI_GetCreatedJavaVMs",t.JNI_GetCreatedJavaVMs(s,1,i)),i.readInt()===0)return null;t.vm=s.readPointer();let c=Process.platform==="windows"?{$new:["??2@YAPEAX_K@Z","pointer",["ulong"]],$delete:["??3@YAXPEAX@Z","void",["pointer"]]}:{$new:["_Znwm","pointer",["ulong"]],$delete:["_ZdlPv","void",["pointer"]]};for(let[a,[l,d,u]]of Object.entries(c)){let f=Module.findGlobalExportByName(l);if(f===null&&(f=DebugSymbol.fromName(l).address,f.isNull()))throw new Error(`unable to find C++ allocator API, missing: '${l}'`);t[a]=new NativeFunction(f,d,u,De)}return t.jvmti=Fl(t),t["JavaThread::thread_from_jni_environment"]===void 0&&(t["JavaThread::thread_from_jni_environment"]=Dl(t)),t}function Fl(n){let e=new we(n),t;return e.perform(()=>{let r=e.tryGetEnvHandle(yt.v1_0);if(r===null)throw new Error("JVMTI not available");t=new xe(r,e);let o=Memory.alloc(8);o.writeU64(Et.canTagObjects);let s=t.addCapabilities(o);de("getEnvJvmti::AddCapabilities",s)}),t}var Ul={x64:Bl};function Dl(n){let e=null,t=Ul[Process.arch];if(t!==void 0){let o=new we(n).perform(s=>s.handle.readPointer().add(6*z).readPointer());e=Me(o,t,{limit:11})}return e===null?()=>{throw new Error("Unable to make thread_from_jni_environment() helper for the current architecture")}:r=>r.add(e)}function Bl(n){if(n.mnemonic!=="lea")return null;let{base:e,disp:t}=n.operands[1].value;return e==="rdi"&&t<0?t:null}function Eo(n,e){}var er=class{constructor(e){this.methodId=e,this.method=e.readPointer(),this.originalMethod=null,this.newMethod=null,this.resolved=null,this.impl=null,this.key=e.toString(16)}replace(e,t,r,o,s){let{key:i}=this,c=pt.get(i);c!==void 0&&(pt.delete(i),this.method=c.method,this.originalMethod=c.originalMethod,this.newMethod=c.newMethod,this.resolved=c.resolved),this.impl=e,Ft.set(i,this),mo(o)}revert(e){let{key:t}=this;Ft.delete(t),pt.set(t,this),mo(e)}resolveTarget(e,t,r,o){let{resolved:s,originalMethod:i,methodId:c}=this;if(s!==null)return s;if(i===null)return c;i.oldMethod.vtableIndexPtr.writeS32(-2);let l=Memory.alloc(z);return l.writePointer(this.method),this.resolved=l,l}};function mo(n){Xn||(Xn=!0,Script.nextTick(Vl,n))}function Vl(n){let e=new Map(Ft),t=new Map(pt);Ft.clear(),pt.clear(),Xn=!1,n.perform(r=>{let o=Te(),s=o["JavaThread::thread_from_jni_environment"](r.handle),i=!1;vo(()=>{e.forEach(c=>{let{method:a,originalMethod:l,impl:d,methodId:u,newMethod:f}=c;l===null?(c.originalMethod=wo(a),c.newMethod=$l(a,d,s),go(c.newMethod,u,s)):o["Method::set_native_function"](f.method,d,0)}),t.forEach(c=>{let{originalMethod:a,methodId:l,newMethod:d}=c;if(a!==null){Gl(a);let u=a.oldMethod;u.oldMethod=d,go(u,l,s),i=!0}})}),i&&zl(r.handle)})}function zl(n){let{fractions:e,shouldSweep:t,traversals:r,"NMethodSweeper::sweep_code_cache":o,"NMethodSweeper::sweep_in_progress":s,"NMethodSweeper::force_sweep":i,JVM_Sleep:c}=Te();if(i!==void 0)Thread.sleep(.05),i(),Thread.sleep(.05),i();else{let a=r.readS64(),l=a+2;for(;l>a;)e.writeS32(1),c(n,NULL,50),s()||vo(()=>{Thread.sleep(.05)}),t.readU8()===0&&(e.writeS32(1),o()),a=r.readS64()}}function vo(n,e,t){let{execute:r,vtable:o,vtableSize:s,doItOffset:i,prologueOffset:c,epilogueOffset:a}=jl(),l=Memory.dup(o,s),d=Memory.alloc(z*25);d.writePointer(l);let u=new NativeCallback(n,"void",["pointer"]);l.add(i).writePointer(u);let f=null;e!==void 0&&(f=new NativeCallback(e,"int",["pointer"]),l.add(c).writePointer(f));let p=null;t!==void 0&&(p=new NativeCallback(t,"void",["pointer"]),l.add(a).writePointer(p)),r(d)}function Jl(){let{vtableRedefineClasses:n,redefineClassesDoIt:e,redefineClassesDoItPrologue:t,redefineClassesDoItEpilogue:r,redefineClassesOnError:o,redefineClassesAllow:s,redefineClassesDispose0:i,redefineClassesDispose1:c,"VMThread::execute":a}=Te(),l=n.add(2*z),d=15*z,u=Memory.dup(l,d),f=new NativeCallback(()=>{},"void",["pointer"]),p,_,h;for(let g=0;g!==d;g+=z){let b=u.add(g),v=b.readPointer();o!==void 0&&v.equals(o)||i!==void 0&&v.equals(i)||c!==void 0&&v.equals(c)?b.writePointer(f):v.equals(e)?p=g:v.equals(t)?(_=g,b.writePointer(s)):v.equals(r)&&(h=g,b.writePointer(f))}return{execute:a,emptyCallback:f,vtable:u,vtableSize:d,doItOffset:p,prologueOffset:_,epilogueOffset:h}}function So(n){return new er(n)}function go(n,e,t){let{method:r,oldMethod:o}=n,s=Te();n.methodsArray.add(n.methodIndex*z).writePointer(r),n.vtableIndex>=0&&n.vtable.add(n.vtableIndex*z).writePointer(r),e.writePointer(r),o.accessFlagsPtr.writeU32((o.accessFlags|xl|kl)>>>0);let i=s["OopMapCache::flush_obsolete_entries"];if(i!==void 0){let{oopMapCache:_}=n;_.isNull()||i(_)}let c=s["VM_RedefineClasses::mark_dependent_code"],a=s["VM_RedefineClasses::flush_dependent_code"];c!==void 0?(c(NULL,n.instanceKlass),a()):a(NULL,n.instanceKlass,t);let l=Memory.alloc(1);l.writeU8(1),s["ConstantPoolCache::adjust_method_entries"](n.cache,n.instanceKlass,l);let d=Memory.alloc(3*z),u=Memory.alloc(z);u.writePointer(s.doKlass),d.writePointer(u),d.add(z).writePointer(t),d.add(2*z).writePointer(t),s.redefineClass!==void 0&&s.redefineClass.writePointer(n.instanceKlass),s["ClassLoaderDataGraph::classes_do"](d);let f=s["ResolvedMethodTable::adjust_method_entries"];if(f!==void 0)f(l);else{let{memberNames:_}=n;if(!_.isNull()){let h=s["MemberNameTable::adjust_method_entries"];h!==void 0&&h(_,n.instanceKlass,l)}}let p=s["ClassLoaderDataGraph::clean_deallocate_lists"];p!==void 0&&p(0)}function $l(n,e,t){let r=Te(),o=wo(n);o.constPtr.writePointer(o.const);let s=(o.accessFlags|Ll|Nl|Ml|Rl)>>>0;if(o.accessFlagsPtr.writeU32(s),o.signatureHandler.writePointer(NULL),o.adapter.writePointer(NULL),o.i2iEntry.writePointer(NULL),r["Method::clear_code"](o.method),o.dataPtr.writePointer(NULL),o.countersPtr.writePointer(NULL),o.stackmapPtr.writePointer(NULL),r["Method::clear_native_function"](o.method),r["Method::set_native_function"](o.method,e,0),r["Method::restore_unshareable_info"](o.method,t),r.version>=17){let i=Memory.alloc(2*z);i.writePointer(o.method),i.add(z).writePointer(t),r["Method::link_method"](o.method,i,t)}return o}function wo(n){let e=yo(),t=n.add(e.method.constMethodOffset).readPointer(),r=t.add(e.constMethod.sizeOffset).readS32()*z,o=Memory.alloc(r+e.method.size);Memory.copy(o,t,r);let s=o.add(r);Memory.copy(s,n,e.method.size);let i=bo(s,o,r),c=bo(n,t,r);return i.oldMethod=c,i}function bo(n,e,t){let r=Te(),o=yo(),s=n.add(o.method.constMethodOffset),i=n.add(o.method.methodDataOffset),c=n.add(o.method.methodCountersOffset),a=n.add(o.method.accessFlagsOffset),l=a.readU32(),d=o.getAdapterPointer(n,e),u=n.add(o.method.i2iEntryOffset),f=n.add(o.method.signatureHandlerOffset),p=e.add(o.constMethod.constantPoolOffset).readPointer(),_=e.add(o.constMethod.stackmapDataOffset),h=p.add(o.constantPool.instanceKlassOffset).readPointer(),g=p.add(o.constantPool.cacheOffset).readPointer(),b=Ol(),v=h.add(b.methodsOffset).readPointer(),I=v.readS32(),x=v.add(z),N=e.add(o.constMethod.methodIdnumOffset).readU16(),M=n.add(o.method.vtableIndexOffset),k=M.readS32(),j=h.add(b.vtableOffset),E=h.add(b.oopMapCacheOffset).readPointer(),L=r.version>=10?h.add(b.memberNamesOffset).readPointer():NULL;return{method:n,methodSize:o.method.size,const:e,constSize:t,constPtr:s,dataPtr:i,countersPtr:c,stackmapPtr:_,instanceKlass:h,methodsArray:x,methodsCount:I,methodIndex:N,vtableIndex:k,vtableIndexPtr:M,vtable:j,accessFlags:l,accessFlagsPtr:a,adapter:d,i2iEntry:u,signatureHandler:f,memberNames:L,cache:g,oopMapCache:E}}function Gl(n){let{oldMethod:e}=n;e.accessFlagsPtr.writeU32(e.accessFlags),e.vtableIndexPtr.writeS32(e.vtableIndex)}function Hl(){let n=Te(),{version:e}=n,t;e>=17?t="method:early":e>=9&&e<=16?t="const-method":t="method:late";let o=n["Method::size"](1)*z,s=z,i=2*z,c=3*z,a=4*z,l=t==="method:early"?z:0,d=a+l,u=d+4,f=u+4+8,p=f+z,_=l!==0?a:p,h=o-2*z,g=o-z,b=8,v=b+z,I=v+z,x=t==="const-method"?z:0,N=I+x,M=N+14,k=2*z,j=3*z;return{getAdapterPointer:x!==0?function(L,R){return R.add(I)}:function(L,R){return L.add(_)},method:{size:o,constMethodOffset:s,methodDataOffset:i,methodCountersOffset:c,accessFlagsOffset:d,vtableIndexOffset:u,i2iEntryOffset:f,nativeFunctionOffset:h,signatureHandlerOffset:g},constMethod:{constantPoolOffset:b,stackmapDataOffset:v,sizeOffset:N,methodIdnumOffset:M},constantPool:{cacheOffset:k,instanceKlassOffset:j}}}var Zl={x64:ql};function Wl(){let{version:n,createNewDefaultVtableIndices:e}=Te(),t=Zl[Process.arch];if(t===void 0)throw new Error(`Missing vtable offset parser for ${Process.arch}`);let r=Me(e,t,{limit:32});if(r===null)throw new Error("Unable to deduce vtable offset");let o=n>=10&&n<=11||n>=15?17:18,s=r-7*z,i=r-17*z,c=r-o*z;return{vtableOffset:r,methodsOffset:s,memberNamesOffset:i,oopMapCacheOffset:c}}function ql(n){if(n.mnemonic!=="mov")return null;let e=n.operands[0];if(e.type!=="mem")return null;let{value:t}=e;if(t.scale!==1)return null;let{disp:r}=t;return r<256?null:r+16}var Io=J;try{ut()}catch{Io=Te}var To=Io;var Kl=`#include <json-glib/json-glib.h>
#include <string.h>

#define kAccStatic 0x0008
#define kAccConstructor 0x00010000

typedef struct _Model Model;
typedef struct _EnumerateMethodsContext EnumerateMethodsContext;

typedef struct _JavaApi JavaApi;
typedef struct _JavaClassApi JavaClassApi;
typedef struct _JavaMethodApi JavaMethodApi;
typedef struct _JavaFieldApi JavaFieldApi;

typedef struct _JNIEnv JNIEnv;
typedef guint8 jboolean;
typedef gint32 jint;
typedef jint jsize;
typedef gpointer jobject;
typedef jobject jclass;
typedef jobject jstring;
typedef jobject jarray;
typedef jarray jobjectArray;
typedef gpointer jfieldID;
typedef gpointer jmethodID;

typedef struct _jvmtiEnv jvmtiEnv;
typedef enum
{
  JVMTI_ERROR_NONE = 0
} jvmtiError;

typedef struct _ArtApi ArtApi;
typedef guint32 ArtHeapReference;
typedef struct _ArtObject ArtObject;
typedef struct _ArtClass ArtClass;
typedef struct _ArtClassLinker ArtClassLinker;
typedef struct _ArtClassVisitor ArtClassVisitor;
typedef struct _ArtClassVisitorVTable ArtClassVisitorVTable;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtString ArtString;

typedef union _StdString StdString;
typedef struct _StdStringShort StdStringShort;
typedef struct _StdStringLong StdStringLong;

typedef void (* ArtVisitClassesFunc) (ArtClassLinker * linker, ArtClassVisitor * visitor);
typedef const char * (* ArtGetClassDescriptorFunc) (ArtClass * klass, StdString * storage);
typedef void (* ArtPrettyMethodFunc) (StdString * result, ArtMethod * method, jboolean with_signature);

struct _Model
{
  GHashTable * members;
};

struct _EnumerateMethodsContext
{
  GPatternSpec * class_query;
  GPatternSpec * method_query;
  jboolean include_signature;
  jboolean ignore_case;
  jboolean skip_system_classes;
  GHashTable * groups;
};

struct _JavaClassApi
{
  jmethodID get_declared_methods;
  jmethodID get_declared_fields;
};

struct _JavaMethodApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaFieldApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaApi
{
  JavaClassApi clazz;
  JavaMethodApi method;
  JavaFieldApi field;
};

struct _JNIEnv
{
  gpointer * functions;
};

struct _jvmtiEnv
{
  gpointer * functions;
};

struct _ArtApi
{
  gboolean available;

  guint class_offset_ifields;
  guint class_offset_methods;
  guint class_offset_sfields;
  guint class_offset_copied_methods_offset;

  guint method_size;
  guint method_offset_access_flags;

  guint field_size;
  guint field_offset_access_flags;

  guint alignment_padding;

  ArtClassLinker * linker;
  ArtVisitClassesFunc visit_classes;
  ArtGetClassDescriptorFunc get_class_descriptor;
  ArtPrettyMethodFunc pretty_method;

  void (* free) (gpointer mem);
};

struct _ArtObject
{
  ArtHeapReference klass;
  ArtHeapReference monitor;
};

struct _ArtClass
{
  ArtObject parent;

  ArtHeapReference class_loader;
};

struct _ArtClassVisitor
{
  ArtClassVisitorVTable * vtable;
  gpointer user_data;
};

struct _ArtClassVisitorVTable
{
  void (* reserved1) (ArtClassVisitor * self);
  void (* reserved2) (ArtClassVisitor * self);
  jboolean (* visit) (ArtClassVisitor * self, ArtClass * klass);
};

struct _ArtString
{
  ArtObject parent;

  gint32 count;
  guint32 hash_code;

  union
  {
    guint16 value[0];
    guint8 value_compressed[0];
  };
};

struct _StdStringShort
{
  guint8 size;
  gchar data[(3 * sizeof (gpointer)) - sizeof (guint8)];
};

struct _StdStringLong
{
  gsize capacity;
  gsize size;
  gchar * data;
};

union _StdString
{
  StdStringShort s;
  StdStringLong l;
};

static void model_add_method (Model * self, const gchar * name, jmethodID id, jint modifiers);
static void model_add_field (Model * self, const gchar * name, jfieldID id, jint modifiers);
static void model_free (Model * model);

static jboolean collect_matching_class_methods (ArtClassVisitor * self, ArtClass * klass);
static gchar * finalize_method_groups_to_json (GHashTable * groups);
static GPatternSpec * make_pattern_spec (const gchar * pattern, jboolean ignore_case);
static gchar * class_name_from_signature (const gchar * signature);
static gchar * format_method_signature (const gchar * name, const gchar * signature);
static void append_type (GString * output, const gchar ** type);

static gpointer read_art_array (gpointer object_base, guint field_offset, guint length_size, guint * length);

static void std_string_destroy (StdString * str);
static gchar * std_string_c_str (StdString * self);

extern GMutex lock;
extern GArray * models;
extern JavaApi java_api;
extern ArtApi art_api;

void
init (void)
{
  g_mutex_init (&lock);
  models = g_array_new (FALSE, FALSE, sizeof (Model *));
}

void
finalize (void)
{
  guint n, i;

  n = models->len;
  for (i = 0; i != n; i++)
  {
    Model * model = g_array_index (models, Model *, i);
    model_free (model);
  }

  g_array_unref (models);
  g_mutex_clear (&lock);
}

Model *
model_new (jclass class_handle,
           gpointer class_object,
           JNIEnv * env)
{
  Model * model;
  GHashTable * members;
  gpointer * funcs = env->functions;
  jmethodID (* from_reflected_method) (JNIEnv *, jobject) = funcs[7];
  jfieldID (* from_reflected_field) (JNIEnv *, jobject) = funcs[8];
  jobject (* to_reflected_method) (JNIEnv *, jclass, jmethodID, jboolean) = funcs[9];
  jobject (* to_reflected_field) (JNIEnv *, jclass, jfieldID, jboolean) = funcs[12];
  void (* delete_local_ref) (JNIEnv *, jobject) = funcs[23];
  jobject (* call_object_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[34];
  jint (* call_int_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[49];
  const char * (* get_string_utf_chars) (JNIEnv *, jstring, jboolean *) = funcs[169];
  void (* release_string_utf_chars) (JNIEnv *, jstring, const char *) = funcs[170];
  jsize (* get_array_length) (JNIEnv *, jarray) = funcs[171];
  jobject (* get_object_array_element) (JNIEnv *, jobjectArray, jsize) = funcs[173];
  jsize n, i;

  model = g_new (Model, 1);

  members = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, g_free);
  model->members = members;

  if (art_api.available)
  {
    gpointer elements;
    guint n, i;
    const guint field_arrays[] = {
      art_api.class_offset_ifields,
      art_api.class_offset_sfields
    };
    guint field_array_cursor;

    elements = read_art_array (class_object, art_api.class_offset_methods, sizeof (gsize), NULL);
    n = *(guint16 *) (class_object + art_api.class_offset_copied_methods_offset);
    for (i = 0; i != n; i++)
    {
      jmethodID id;
      guint32 access_flags;
      jboolean is_static;
      jobject method, name;
      const char * name_str;
      jint modifiers;

      id = elements + (i * art_api.method_size);

      access_flags = *(guint32 *) (id + art_api.method_offset_access_flags);
      if ((access_flags & kAccConstructor) != 0)
        continue;
      is_static = (access_flags & kAccStatic) != 0;
      method = to_reflected_method (env, class_handle, id, is_static);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      modifiers = access_flags & 0xffff;

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }

    for (field_array_cursor = 0; field_array_cursor != G_N_ELEMENTS (field_arrays); field_array_cursor++)
    {
      jboolean is_static;

      is_static = field_array_cursor == 1;

      elements = read_art_array (class_object, field_arrays[field_array_cursor], sizeof (guint32), &n);
      for (i = 0; i != n; i++)
      {
        jfieldID id;
        guint32 access_flags;
        jobject field, name;
        const char * name_str;
        jint modifiers;

        id = elements + (i * art_api.field_size);

        access_flags = *(guint32 *) (id + art_api.field_offset_access_flags);
        field = to_reflected_field (env, class_handle, id, is_static);
        name = call_object_method (env, field, java_api.field.get_name);
        name_str = get_string_utf_chars (env, name, NULL);
        modifiers = access_flags & 0xffff;

        model_add_field (model, name_str, id, modifiers);

        release_string_utf_chars (env, name, name_str);
        delete_local_ref (env, name);
        delete_local_ref (env, field);
      }
    }
  }
  else
  {
    jobject elements;

    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_methods);
    n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject method, name;
      const char * name_str;
      jmethodID id;
      jint modifiers;

      method = get_object_array_element (env, elements, i);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_method (env, method);
      modifiers = call_int_method (env, method, java_api.method.get_modifiers);

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }
    delete_local_ref (env, elements);

    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_fields);
    n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject field, name;
      const char * name_str;
      jfieldID id;
      jint modifiers;

      field = get_object_array_element (env, elements, i);
      name = call_object_method (env, field, java_api.field.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_field (env, field);
      modifiers = call_int_method (env, field, java_api.field.get_modifiers);

      model_add_field (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, field);
    }
    delete_local_ref (env, elements);
  }

  g_mutex_lock (&lock);
  g_array_append_val (models, model);
  g_mutex_unlock (&lock);

  return model;
}

static void
model_add_method (Model * self,
                  const gchar * name,
                  jmethodID id,
                  jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;
  const gchar * value;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  value = g_hash_table_lookup (members, key);
  if (value == NULL)
    g_hash_table_insert (members, key, g_strdup_printf ("m:%c0x%zx", type, id));
  else
    g_hash_table_insert (members, key, g_strdup_printf ("%s:%c0x%zx", value, type, id));
}

static void
model_add_field (Model * self,
                 const gchar * name,
                 jfieldID id,
                 jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);
  while (g_hash_table_contains (members, key))
  {
    gchar * new_key = g_strdup_printf ("_%s", key);
    g_free (key);
    key = new_key;
  }

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  g_hash_table_insert (members, key, g_strdup_printf ("f:%c0x%zx", type, id));
}

static void
model_free (Model * model)
{
  g_hash_table_unref (model->members);

  g_free (model);
}

gboolean
model_has (Model * self,
           const gchar * member)
{
  return g_hash_table_contains (self->members, member);
}

const gchar *
model_find (Model * self,
            const gchar * member)
{
  return g_hash_table_lookup (self->members, member);
}

gchar *
model_list (Model * self)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  const gchar * name;

  result = g_string_sized_new (128);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, self->members);
  for (i = 0; g_hash_table_iter_next (&iter, (gpointer *) &name, NULL); i++)
  {
    if (i > 0)
      g_string_append_c (result, ',');

    g_string_append_c (result, '"');
    g_string_append (result, name);
    g_string_append_c (result, '"');
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

gchar *
enumerate_methods_art (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes)
{
  gchar * result;
  EnumerateMethodsContext ctx;
  ArtClassVisitor visitor;
  ArtClassVisitorVTable visitor_vtable = { NULL, };

  ctx.class_query = make_pattern_spec (class_query, ignore_case);
  ctx.method_query = make_pattern_spec (method_query, ignore_case);
  ctx.include_signature = include_signature;
  ctx.ignore_case = ignore_case;
  ctx.skip_system_classes = skip_system_classes;
  ctx.groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  visitor.vtable = &visitor_vtable;
  visitor.user_data = &ctx;

  visitor_vtable.visit = collect_matching_class_methods;

  art_api.visit_classes (art_api.linker, &visitor);

  result = finalize_method_groups_to_json (ctx.groups);

  g_hash_table_unref (ctx.groups);
  g_pattern_spec_free (ctx.method_query);
  g_pattern_spec_free (ctx.class_query);

  return result;
}

static jboolean
collect_matching_class_methods (ArtClassVisitor * self,
                                ArtClass * klass)
{
  EnumerateMethodsContext * ctx = self->user_data;
  const char * descriptor;
  StdString descriptor_storage = { 0, };
  gchar * class_name = NULL;
  gchar * class_name_copy = NULL;
  const gchar * normalized_class_name;
  JsonBuilder * group;
  size_t class_name_length;
  GHashTable * seen_method_names;
  gpointer elements;
  guint n, i;

  if (ctx->skip_system_classes && klass->class_loader == 0)
    goto skip_class;

  descriptor = art_api.get_class_descriptor (klass, &descriptor_storage);
  if (descriptor[0] != 'L')
    goto skip_class;

  class_name = class_name_from_signature (descriptor);

  if (ctx->ignore_case)
  {
    class_name_copy = g_utf8_strdown (class_name, -1);
    normalized_class_name = class_name_copy;
  }
  else
  {
    normalized_class_name = class_name;
  }

  if (!g_pattern_match_string (ctx->class_query, normalized_class_name))
    goto skip_class;

  group = NULL;
  class_name_length = strlen (class_name);
  seen_method_names = ctx->include_signature ? NULL : g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

  elements = read_art_array (klass, art_api.class_offset_methods, sizeof (gsize), NULL);
  n = *(guint16 *) ((gpointer) klass + art_api.class_offset_copied_methods_offset);
  for (i = 0; i != n; i++)
  {
    ArtMethod * method;
    guint32 access_flags;
    jboolean is_constructor;
    StdString method_name = { 0, };
    const gchar * bare_method_name;
    gchar * bare_method_name_copy = NULL;
    const gchar * normalized_method_name;
    gchar * normalized_method_name_copy = NULL;

    method = elements + (i * art_api.method_size);

    access_flags = *(guint32 *) ((gpointer) method + art_api.method_offset_access_flags);
    is_constructor = (access_flags & kAccConstructor) != 0;

    art_api.pretty_method (&method_name, method, ctx->include_signature);
    bare_method_name = std_string_c_str (&method_name);
    if (ctx->include_signature)
    {
      const gchar * return_type_end, * name_begin;
      GString * name;

      return_type_end = strchr (bare_method_name, ' ');
      name_begin = return_type_end + 1 + class_name_length + 1;
      if (is_constructor && g_str_has_prefix (name_begin, "<clinit>"))
        goto skip_method;

      name = g_string_sized_new (64);

      if (is_constructor)
      {
        g_string_append (name, "$init");
        g_string_append (name, strchr (name_begin, '>') + 1);
      }
      else
      {
        g_string_append (name, name_begin);
      }
      g_string_append (name, ": ");
      g_string_append_len (name, bare_method_name, return_type_end - bare_method_name);

      bare_method_name_copy = g_string_free (name, FALSE);
      bare_method_name = bare_method_name_copy;
    }
    else
    {
      const gchar * name_begin;

      name_begin = bare_method_name + class_name_length + 1;
      if (is_constructor && strcmp (name_begin, "<clinit>") == 0)
        goto skip_method;

      if (is_constructor)
        bare_method_name = "$init";
      else
        bare_method_name += class_name_length + 1;
    }

    if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, bare_method_name))
      goto skip_method;

    if (ctx->ignore_case)
    {
      normalized_method_name_copy = g_utf8_strdown (bare_method_name, -1);
      normalized_method_name = normalized_method_name_copy;
    }
    else
    {
      normalized_method_name = bare_method_name;
    }

    if (!g_pattern_match_string (ctx->method_query, normalized_method_name))
      goto skip_method;

    if (group == NULL)
    {
      group = g_hash_table_lookup (ctx->groups, GUINT_TO_POINTER (klass->class_loader));
      if (group == NULL)
      {
        group = json_builder_new_immutable ();
        g_hash_table_insert (ctx->groups, GUINT_TO_POINTER (klass->class_loader), group);

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "loader");
        json_builder_add_int_value (group, klass->class_loader);

        json_builder_set_member_name (group, "classes");
        json_builder_begin_array (group);
      }

      json_builder_begin_object (group);

      json_builder_set_member_name (group, "name");
      json_builder_add_string_value (group, class_name);

      json_builder_set_member_name (group, "methods");
      json_builder_begin_array (group);
    }

    json_builder_add_string_value (group, bare_method_name);

    if (seen_method_names != NULL)
      g_hash_table_add (seen_method_names, g_strdup (bare_method_name));

skip_method:
    g_free (normalized_method_name_copy);
    g_free (bare_method_name_copy);
    std_string_destroy (&method_name);
  }

  if (seen_method_names != NULL)
    g_hash_table_unref (seen_method_names);

  if (group == NULL)
    goto skip_class;

  json_builder_end_array (group);
  json_builder_end_object (group);

skip_class:
  g_free (class_name_copy);
  g_free (class_name);
  std_string_destroy (&descriptor_storage);

  return TRUE;
}

gchar *
enumerate_methods_jvm (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes,
                       JNIEnv * env,
                       jvmtiEnv * jvmti)
{
  gchar * result;
  GPatternSpec * class_pattern, * method_pattern;
  GHashTable * groups;
  gpointer * ef = env->functions;
  jobject (* new_global_ref) (JNIEnv *, jobject) = ef[21];
  void (* delete_local_ref) (JNIEnv *, jobject) = ef[23];
  jboolean (* is_same_object) (JNIEnv *, jobject, jobject) = ef[24];
  gpointer * jf = jvmti->functions - 1;
  jvmtiError (* deallocate) (jvmtiEnv *, void * mem) = jf[47];
  jvmtiError (* get_class_signature) (jvmtiEnv *, jclass, char **, char **) = jf[48];
  jvmtiError (* get_class_methods) (jvmtiEnv *, jclass, jint *, jmethodID **) = jf[52];
  jvmtiError (* get_class_loader) (jvmtiEnv *, jclass, jobject *) = jf[57];
  jvmtiError (* get_method_name) (jvmtiEnv *, jmethodID, char **, char **, char **) = jf[64];
  jvmtiError (* get_loaded_classes) (jvmtiEnv *, jint *, jclass **) = jf[78];
  jint class_count, class_index;
  jclass * classes;

  class_pattern = make_pattern_spec (class_query, ignore_case);
  method_pattern = make_pattern_spec (method_query, ignore_case);
  groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  if (get_loaded_classes (jvmti, &class_count, &classes) != JVMTI_ERROR_NONE)
    goto emit_results;

  for (class_index = 0; class_index != class_count; class_index++)
  {
    jclass klass = classes[class_index];
    jobject loader = NULL;
    gboolean have_loader = FALSE;
    char * signature = NULL;
    gchar * class_name = NULL;
    gchar * class_name_copy = NULL;
    const gchar * normalized_class_name;
    jint method_count, method_index;
    jmethodID * methods = NULL;
    JsonBuilder * group = NULL;
    GHashTable * seen_method_names = NULL;

    if (skip_system_classes)
    {
      if (get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
        goto skip_class;
      have_loader = TRUE;

      if (loader == NULL)
        goto skip_class;
    }

    if (get_class_signature (jvmti, klass, &signature, NULL) != JVMTI_ERROR_NONE)
      goto skip_class;

    class_name = class_name_from_signature (signature);

    if (ignore_case)
    {
      class_name_copy = g_utf8_strdown (class_name, -1);
      normalized_class_name = class_name_copy;
    }
    else
    {
      normalized_class_name = class_name;
    }

    if (!g_pattern_match_string (class_pattern, normalized_class_name))
      goto skip_class;

    if (get_class_methods (jvmti, klass, &method_count, &methods) != JVMTI_ERROR_NONE)
      goto skip_class;

    if (!include_signature)
      seen_method_names = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

    for (method_index = 0; method_index != method_count; method_index++)
    {
      jmethodID method = methods[method_index];
      const gchar * method_name;
      char * method_name_value = NULL;
      char * method_signature_value = NULL;
      gchar * method_name_copy = NULL;
      const gchar * normalized_method_name;
      gchar * normalized_method_name_copy = NULL;

      if (get_method_name (jvmti, method, &method_name_value, include_signature ? &method_signature_value : NULL, NULL) != JVMTI_ERROR_NONE)
        goto skip_method;
      method_name = method_name_value;

      if (method_name[0] == '<')
      {
        if (strcmp (method_name, "<init>") == 0)
          method_name = "$init";
        else if (strcmp (method_name, "<clinit>") == 0)
          goto skip_method;
      }

      if (include_signature)
      {
        method_name_copy = format_method_signature (method_name, method_signature_value);
        method_name = method_name_copy;
      }

      if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, method_name))
        goto skip_method;

      if (ignore_case)
      {
        normalized_method_name_copy = g_utf8_strdown (method_name, -1);
        normalized_method_name = normalized_method_name_copy;
      }
      else
      {
        normalized_method_name = method_name;
      }

      if (!g_pattern_match_string (method_pattern, normalized_method_name))
        goto skip_method;

      if (group == NULL)
      {
        if (!have_loader && get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
          goto skip_method;

        if (loader == NULL)
        {
          group = g_hash_table_lookup (groups, NULL);
        }
        else
        {
          GHashTableIter iter;
          jobject cur_loader;
          JsonBuilder * cur_group;

          g_hash_table_iter_init (&iter, groups);
          while (g_hash_table_iter_next (&iter, (gpointer *) &cur_loader, (gpointer *) &cur_group))
          {
            if (cur_loader != NULL && is_same_object (env, cur_loader, loader))
            {
              group = cur_group;
              break;
            }
          }
        }

        if (group == NULL)
        {
          jobject l;
          gchar * str;

          l = (loader != NULL) ? new_global_ref (env, loader) : NULL;

          group = json_builder_new_immutable ();
          g_hash_table_insert (groups, l, group);

          json_builder_begin_object (group);

          json_builder_set_member_name (group, "loader");
          str = g_strdup_printf ("0x%" G_GSIZE_MODIFIER "x", GPOINTER_TO_SIZE (l));
          json_builder_add_string_value (group, str);
          g_free (str);

          json_builder_set_member_name (group, "classes");
          json_builder_begin_array (group);
        }

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "name");
        json_builder_add_string_value (group, class_name);

        json_builder_set_member_name (group, "methods");
        json_builder_begin_array (group);
      }

      json_builder_add_string_value (group, method_name);

      if (seen_method_names != NULL)
        g_hash_table_add (seen_method_names, g_strdup (method_name));

skip_method:
      g_free (normalized_method_name_copy);
      g_free (method_name_copy);
      deallocate (jvmti, method_signature_value);
      deallocate (jvmti, method_name_value);
    }

skip_class:
    if (group != NULL)
    {
      json_builder_end_array (group);
      json_builder_end_object (group);
    }

    if (seen_method_names != NULL)
      g_hash_table_unref (seen_method_names);

    deallocate (jvmti, methods);

    g_free (class_name_copy);
    g_free (class_name);
    deallocate (jvmti, signature);

    if (loader != NULL)
      delete_local_ref (env, loader);

    delete_local_ref (env, klass);
  }

  deallocate (jvmti, classes);

emit_results:
  result = finalize_method_groups_to_json (groups);

  g_hash_table_unref (groups);
  g_pattern_spec_free (method_pattern);
  g_pattern_spec_free (class_pattern);

  return result;
}

static gchar *
finalize_method_groups_to_json (GHashTable * groups)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  JsonBuilder * group;

  result = g_string_sized_new (1024);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, groups);
  for (i = 0; g_hash_table_iter_next (&iter, NULL, (gpointer *) &group); i++)
  {
    JsonNode * root;
    gchar * json;

    if (i > 0)
      g_string_append_c (result, ',');

    json_builder_end_array (group);
    json_builder_end_object (group);

    root = json_builder_get_root (group);
    json = json_to_string (root, FALSE);
    g_string_append (result, json);
    g_free (json);
    json_node_unref (root);

    g_object_unref (group);
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

static GPatternSpec *
make_pattern_spec (const gchar * pattern,
                   jboolean ignore_case)
{
  GPatternSpec * spec;

  if (ignore_case)
  {
    gchar * str = g_utf8_strdown (pattern, -1);
    spec = g_pattern_spec_new (str);
    g_free (str);
  }
  else
  {
    spec = g_pattern_spec_new (pattern);
  }

  return spec;
}

static gchar *
class_name_from_signature (const gchar * descriptor)
{
  gchar * result, * c;

  result = g_strdup (descriptor + 1);

  for (c = result; *c != '\\0'; c++)
  {
    if (*c == '/')
      *c = '.';
  }

  c[-1] = '\\0';

  return result;
}

static gchar *
format_method_signature (const gchar * name,
                         const gchar * signature)
{
  GString * sig;
  const gchar * cursor;
  gint arg_index;

  sig = g_string_sized_new (128);

  g_string_append (sig, name);

  cursor = signature;
  arg_index = -1;
  while (TRUE)
  {
    const gchar c = *cursor;

    if (c == '(')
    {
      g_string_append_c (sig, c);
      cursor++;
      arg_index = 0;
    }
    else if (c == ')')
    {
      g_string_append_c (sig, c);
      cursor++;
      break;
    }
    else
    {
      if (arg_index >= 1)
        g_string_append (sig, ", ");

      append_type (sig, &cursor);

      if (arg_index != -1)
        arg_index++;
    }
  }

  g_string_append (sig, ": ");
  append_type (sig, &cursor);

  return g_string_free (sig, FALSE);
}

static void
append_type (GString * output,
             const gchar ** type)
{
  const gchar * cursor = *type;

  switch (*cursor)
  {
    case 'Z':
      g_string_append (output, "boolean");
      cursor++;
      break;
    case 'B':
      g_string_append (output, "byte");
      cursor++;
      break;
    case 'C':
      g_string_append (output, "char");
      cursor++;
      break;
    case 'S':
      g_string_append (output, "short");
      cursor++;
      break;
    case 'I':
      g_string_append (output, "int");
      cursor++;
      break;
    case 'J':
      g_string_append (output, "long");
      cursor++;
      break;
    case 'F':
      g_string_append (output, "float");
      cursor++;
      break;
    case 'D':
      g_string_append (output, "double");
      cursor++;
      break;
    case 'V':
      g_string_append (output, "void");
      cursor++;
      break;
    case 'L':
    {
      gchar ch;

      cursor++;
      for (; (ch = *cursor) != ';'; cursor++)
      {
        g_string_append_c (output, (ch != '/') ? ch : '.');
      }
      cursor++;

      break;
    }
    case '[':
      *type = cursor + 1;
      append_type (output, type);
      g_string_append (output, "[]");
      return;
    default:
      g_string_append (output, "BUG");
      cursor++;
  }

  *type = cursor;
}

void
dealloc (gpointer mem)
{
  g_free (mem);
}

static gpointer
read_art_array (gpointer object_base,
                guint field_offset,
                guint length_size,
                guint * length)
{
  gpointer result, header;
  guint n;

  header = GSIZE_TO_POINTER (*(guint64 *) (object_base + field_offset));
  if (header != NULL)
  {
    result = header + length_size;
    if (length_size == sizeof (guint32))
      n = *(guint32 *) header;
    else
      n = *(guint64 *) header;
  }
  else
  {
    result = NULL;
    n = 0;
  }

  if (length != NULL)
    *length = n;

  return result;
}

static void
std_string_destroy (StdString * str)
{
  if ((str->l.capacity & 1) != 0)
    art_api.free (str->l.data);
}

static gchar *
std_string_c_str (StdString * self)
{
  if ((self->l.capacity & 1) != 0)
    return self->l.data;

  return self->s.data;
}
`,Ql=/(.+)!([^/]+)\/?([isu]+)?/,be=null,Ao=null,Be=class n{static build(e,t){return Co(t),Ao(e,t,r=>new n(be.new(e,r,t)))}static enumerateMethods(e,t,r){Co(r);let o=e.match(Ql);if(o===null)throw new Error("Invalid query; format is: class!method -- see documentation of Java.enumerateMethods(query) for details");let s=Memory.allocUtf8String(o[1]),i=Memory.allocUtf8String(o[2]),c=!1,a=!1,l=!1,d=o[3];d!==void 0&&(c=d.indexOf("s")!==-1,a=d.indexOf("i")!==-1,l=d.indexOf("u")!==-1);let u;if(t.flavor==="jvm"){let f=be.enumerateMethodsJvm(s,i,qe(c),qe(a),qe(l),r,t.jvmti);try{u=JSON.parse(f.readUtf8String()).map(p=>{let _=ptr(p.loader);return p.loader=_.isNull()?null:_,p})}finally{be.dealloc(f)}}else Ee(r.vm,r,f=>{let p=be.enumerateMethodsArt(s,i,qe(c),qe(a),qe(l));try{let _=t["art::JavaVMExt::AddGlobalRef"],{vm:h}=t;u=JSON.parse(p.readUtf8String()).map(g=>{let b=g.loader;return g.loader=b!==0?_(h,f,ptr(b)):null,g})}finally{be.dealloc(p)}});return u}constructor(e){this.handle=e}has(e){return be.has(this.handle,Memory.allocUtf8String(e))!==0}find(e){return be.find(this.handle,Memory.allocUtf8String(e)).readUtf8String()}list(){let e=be.list(this.handle);try{return JSON.parse(e.readUtf8String())}finally{be.dealloc(e)}}};function Co(n){be===null&&(be=Yl(n),Ao=Xl(be,n.vm))}function Yl(n){let{pointerSize:e}=Process,t=8,r=e,o=6*e,s=10*4+5*e,i=t+r+o+s,a=Memory.alloc(i),l=a.add(t),d=l.add(r),{getDeclaredMethods:u,getDeclaredFields:f}=n.javaLangClass(),p=n.javaLangReflectMethod(),_=n.javaLangReflectField(),h=d;[u,f,p.getName,p.getModifiers,_.getName,_.getModifiers].forEach(M=>{h=h.writePointer(M).add(e)});let g=d.add(o),{vm:b}=n,v=Dn(b);if(v!==null){let M=v.offset,k=Ie(b),j=Bn(b),E=g;[1,M.ifields,M.methods,M.sfields,M.copiedMethodsOffset,k.size,k.offset.accessFlags,j.size,j.offset.accessFlags,4294967295].forEach(R=>{E=E.writeUInt(R).add(4)});let L=J();[L.artClassLinker.address,L["art::ClassLinker::VisitClasses"],L["art::mirror::Class::GetDescriptor"],L["art::ArtMethod::PrettyMethod"],Process.getModuleByName("libc.so").getExportByName("free")].forEach((R,w)=>{R===void 0&&(R=NULL),E=E.writePointer(R).add(e)})}let I=new CModule(Kl,{lock:a,models:l,java_api:d,art_api:g}),x={exceptions:"propagate"},N={exceptions:"propagate",scheduling:"exclusive"};return{handle:I,mode:v!==null?"full":"basic",new:new NativeFunction(I.model_new,"pointer",["pointer","pointer","pointer"],x),has:new NativeFunction(I.model_has,"bool",["pointer","pointer"],N),find:new NativeFunction(I.model_find,"pointer",["pointer","pointer"],N),list:new NativeFunction(I.model_list,"pointer",["pointer"],N),enumerateMethodsArt:new NativeFunction(I.enumerate_methods_art,"pointer",["pointer","pointer","bool","bool","bool"],x),enumerateMethodsJvm:new NativeFunction(I.enumerate_methods_jvm,"pointer",["pointer","pointer","bool","bool","bool","pointer","pointer"],x),dealloc:new NativeFunction(I.dealloc,"void",["pointer"],N)}}function Xl(n,e){if(n.mode==="basic")return ed;let t=J()["art::JavaVMExt::DecodeGlobal"];return function(r,o,s){let i;return Ee(e,o,c=>{let a=t(e,c,r);i=s(a)}),i}}function ed(n,e,t){return t(NULL)}function qe(n){return n?1:0}var ft=class{constructor(e,t){this.items=new Map,this.capacity=e,this.destroy=t}dispose(e){let{items:t,destroy:r}=this;t.forEach(o=>{r(o,e)}),t.clear()}get(e){let{items:t}=this,r=t.get(e);return r!==void 0&&(t.delete(e),t.set(e,r)),r}set(e,t,r){let{items:o}=this,s=o.get(e);if(s!==void 0)o.delete(e),this.destroy(s,r);else if(o.size===this.capacity){let i=o.keys().next().value,c=o.get(i);o.delete(i),this.destroy(c,r)}o.set(e,t)}};var ht=1,rr=256,Lo=65536,td=305419896,xo=32,ko=12,No=8,Mo=8,Ro=4,Oo=4,jo=12,nd=0,rd=1,od=2,sd=3,id=4,ad=5,cd=6,ld=4096,dd=4097,ud=4099,pd=8192,fd=8193,hd=8194,_d=8195,md=8196,gd=8198,bd=24,yd=28,Ed=2,vd=24,Po=m.from([3,0,7,14,0]),tr="Ldalvik/annotation/Throws;",Sd=m.from([0]);function wd(n){let e=new or,t=Object.assign({},n);return e.addClass(t),e.build()}var or=class{constructor(){this.classes=[]}addClass(e){this.classes.push(e)}build(){let e=Cd(this.classes),{classes:t,interfaces:r,fields:o,methods:s,protos:i,parameters:c,annotationDirectories:a,annotationSets:l,throwsAnnotations:d,types:u,strings:f}=e,p=0,_=0,h=8,g=12,b=20,v=112;p+=v;let I=p,x=f.length*Oo;p+=x;let N=p,M=u.length*Ro;p+=M;let k=p,j=i.length*ko;p+=j;let E=p,L=o.length*No;p+=L;let R=p,w=s.length*Mo;p+=w;let O=p,U=t.length*xo;p+=U;let D=p,F=l.map(C=>{let P=p;return C.offset=P,p+=4+C.items.length*4,P}),V=t.reduce((C,P)=>(P.classData.constructorMethods.forEach(H=>{let[,W,Z]=H;(W&rr)===0&&Z>=0&&(H.push(p),C.push({offset:p,superConstructor:Z}),p+=vd)}),C),[]);a.forEach(C=>{C.offset=p,p+=16+C.methods.length*8});let X=r.map(C=>{p=nr(p,4);let P=p;return C.offset=P,p+=4+2*C.types.length,P}),te=c.map(C=>{p=nr(p,4);let P=p;return C.offset=P,p+=4+2*C.types.length,P}),ie=[],Q=f.map(C=>{let P=p,B=m.from(_e(C.length)),H=m.from(C,"utf8"),W=m.concat([B,H,Sd]);return ie.push(W),p+=W.length,P}),oe=V.map(C=>{let P=p;return p+=Po.length,P}),Y=d.map(C=>{let P=Td(C);return C.offset=p,p+=P.length,P}),ne=t.map((C,P)=>{C.classData.offset=p;let B=Id(C);return p+=B.length,B}),ve=0,Xe=0;p=nr(p,4);let G=p,he=r.length+c.length,Ae=4+(o.length>0?1:0)+2+l.length+V.length+a.length+(he>0?1:0)+1+oe.length+d.length+t.length+1,je=4+Ae*jo;p+=je;let Ne=p-D,Je=p,T=m.alloc(Je);T.write(`dex
035`),T.writeUInt32LE(Je,32),T.writeUInt32LE(v,36),T.writeUInt32LE(td,40),T.writeUInt32LE(ve,44),T.writeUInt32LE(Xe,48),T.writeUInt32LE(G,52),T.writeUInt32LE(f.length,56),T.writeUInt32LE(I,60),T.writeUInt32LE(u.length,64),T.writeUInt32LE(N,68),T.writeUInt32LE(i.length,72),T.writeUInt32LE(k,76),T.writeUInt32LE(o.length,80),T.writeUInt32LE(o.length>0?E:0,84),T.writeUInt32LE(s.length,88),T.writeUInt32LE(R,92),T.writeUInt32LE(t.length,96),T.writeUInt32LE(O,100),T.writeUInt32LE(Ne,104),T.writeUInt32LE(D,108),Q.forEach((C,P)=>{T.writeUInt32LE(C,I+P*Oo)}),u.forEach((C,P)=>{T.writeUInt32LE(C,N+P*Ro)}),i.forEach((C,P)=>{let[B,H,W]=C,Z=k+P*ko;T.writeUInt32LE(B,Z),T.writeUInt32LE(H,Z+4),T.writeUInt32LE(W!==null?W.offset:0,Z+8)}),o.forEach((C,P)=>{let[B,H,W]=C,Z=E+P*No;T.writeUInt16LE(B,Z),T.writeUInt16LE(H,Z+2),T.writeUInt32LE(W,Z+4)}),s.forEach((C,P)=>{let[B,H,W]=C,Z=R+P*Mo;T.writeUInt16LE(B,Z),T.writeUInt16LE(H,Z+2),T.writeUInt32LE(W,Z+4)}),t.forEach((C,P)=>{let{interfaces:B,annotationsDirectory:H}=C,W=B!==null?B.offset:0,Z=H!==null?H.offset:0,et=0,me=O+P*xo;T.writeUInt32LE(C.index,me),T.writeUInt32LE(C.accessFlags,me+4),T.writeUInt32LE(C.superClassIndex,me+8),T.writeUInt32LE(W,me+12),T.writeUInt32LE(C.sourceFileIndex,me+16),T.writeUInt32LE(Z,me+20),T.writeUInt32LE(C.classData.offset,me+24),T.writeUInt32LE(et,me+28)}),l.forEach((C,P)=>{let{items:B}=C,H=F[P];T.writeUInt32LE(B.length,H),B.forEach((W,Z)=>{T.writeUInt32LE(W.offset,H+4+Z*4)})}),V.forEach((C,P)=>{let{offset:B,superConstructor:H}=C,W=1,Z=1,et=1,me=0,gt=4;T.writeUInt16LE(W,B),T.writeUInt16LE(Z,B+2),T.writeUInt16LE(et,B+4),T.writeUInt16LE(me,B+6),T.writeUInt32LE(oe[P],B+8),T.writeUInt32LE(gt,B+12),T.writeUInt16LE(4208,B+16),T.writeUInt16LE(H,B+18),T.writeUInt16LE(0,B+20),T.writeUInt16LE(14,B+22)}),a.forEach(C=>{let P=C.offset,B=0,H=0,W=C.methods.length,Z=0;T.writeUInt32LE(B,P),T.writeUInt32LE(H,P+4),T.writeUInt32LE(W,P+8),T.writeUInt32LE(Z,P+12),C.methods.forEach((et,me)=>{let gt=P+16+me*8,[cs,ls]=et;T.writeUInt32LE(cs,gt),T.writeUInt32LE(ls.offset,gt+4)})}),r.forEach((C,P)=>{let B=X[P];T.writeUInt32LE(C.types.length,B),C.types.forEach((H,W)=>{T.writeUInt16LE(H,B+4+W*2)})}),c.forEach((C,P)=>{let B=te[P];T.writeUInt32LE(C.types.length,B),C.types.forEach((H,W)=>{T.writeUInt16LE(H,B+4+W*2)})}),ie.forEach((C,P)=>{C.copy(T,Q[P])}),oe.forEach(C=>{Po.copy(T,C)}),Y.forEach((C,P)=>{C.copy(T,d[P].offset)}),ne.forEach((C,P)=>{C.copy(T,t[P].classData.offset)}),T.writeUInt32LE(Ae,G);let ae=[[nd,1,_],[rd,f.length,I],[od,u.length,N],[sd,i.length,k]];o.length>0&&ae.push([id,o.length,E]),ae.push([ad,s.length,R]),ae.push([cd,t.length,O]),l.forEach((C,P)=>{ae.push([ud,C.items.length,F[P]])}),V.forEach(C=>{ae.push([fd,1,C.offset])}),a.forEach(C=>{ae.push([gd,1,C.offset])}),he>0&&ae.push([dd,he,X.concat(te)[0]]),ae.push([hd,f.length,Q[0]]),oe.forEach(C=>{ae.push([_d,1,C])}),d.forEach(C=>{ae.push([md,1,C.offset])}),t.forEach(C=>{ae.push([pd,1,C.classData.offset])}),ae.push([ld,1,G]),ae.forEach((C,P)=>{let[B,H,W]=C,Z=G+4+P*jo;T.writeUInt16LE(B,Z),T.writeUInt32LE(H,Z+4),T.writeUInt32LE(W,Z+8)});let Er=new Checksum("sha1");return Er.update(T.slice(g+b)),m.from(Er.getDigest()).copy(T,g),T.writeUInt32LE(Md(T,g),h),T}};function Id(n){let{instanceFields:e,constructorMethods:t,virtualMethods:r}=n.classData;return m.from([0].concat(_e(e.length)).concat(_e(t.length)).concat(_e(r.length)).concat(e.reduce((s,[i,c])=>s.concat(_e(i)).concat(_e(c)),[])).concat(t.reduce((s,[i,c,,a])=>s.concat(_e(i)).concat(_e(c)).concat(_e(a||0)),[])).concat(r.reduce((s,[i,c])=>s.concat(_e(i)).concat(_e(c)).concat([0]),[])))}function Td(n){let{thrownTypes:e}=n;return m.from([Ed].concat(_e(n.type)).concat([1]).concat(_e(n.value)).concat([yd,e.length]).concat(e.reduce((t,r)=>(t.push(bd,r),t),[])))}function Cd(n){let e=new Set,t=new Set,r={},o=[],s=[],i={},c=new Set,a=new Set;n.forEach(w=>{let{name:O,superClass:U,sourceFileName:D}=w;e.add("this"),e.add(O),t.add(O),e.add(U),t.add(U),e.add(D),w.interfaces.forEach(F=>{e.add(F),t.add(F)}),w.fields.forEach(F=>{let[V,X]=F;e.add(V),e.add(X),t.add(X),o.push([w.name,X,V])}),w.methods.some(([F])=>F==="<init>")||(w.methods.unshift(["<init>","V",[]]),c.add(O)),w.methods.forEach(F=>{let[V,X,te,ie=[],Q]=F;e.add(V);let oe=l(X,te),Y=null;if(ie.length>0){let ne=ie.slice();ne.sort(),Y=ne.join("|");let ve=i[Y];ve===void 0&&(ve={id:Y,types:ne},i[Y]=ve),e.add(tr),t.add(tr),ie.forEach(Xe=>{e.add(Xe),t.add(Xe)}),e.add("value")}if(s.push([w.name,oe,V,Y,Q]),V==="<init>"){a.add(O+"|"+oe);let ne=U+"|"+oe;c.has(O)&&!a.has(ne)&&(s.push([U,oe,V,null,0]),a.add(ne))}})});function l(w,O){let U=[w].concat(O),D=U.join("|");if(r[D]!==void 0)return D;e.add(w),t.add(w),O.forEach(V=>{e.add(V),t.add(V)});let F=U.map(Nd).join("");return e.add(F),r[D]=[D,F,w,O],D}let d=Array.from(e);d.sort();let u=d.reduce((w,O,U)=>(w[O]=U,w),{}),f=Array.from(t).map(w=>u[w]);f.sort(Fo);let p=f.reduce((w,O,U)=>(w[d[O]]=U,w),{}),_=Object.keys(r).map(w=>r[w]);_.sort(Ld);let h={},g=_.map(w=>{let[,O,U,D]=w,F;if(D.length>0){let V=D.join("|");F=h[V],F===void 0&&(F={types:D.map(X=>p[X]),offset:-1},h[V]=F)}else F=null;return[u[O],p[U],F]}),b=_.reduce((w,O,U)=>{let[D]=O;return w[D]=U,w},{}),v=Object.keys(h).map(w=>h[w]),I=o.map(w=>{let[O,U,D]=w;return[p[O],p[U],u[D]]});I.sort(xd);let x=s.map(w=>{let[O,U,D,F,V]=w;return[p[O],b[U],u[D],F,V]});x.sort(kd);let N=Object.keys(i).map(w=>i[w]).map(w=>({id:w.id,type:p[tr],value:u.value,thrownTypes:w.types.map(O=>p[O]),offset:-1})),M=N.map(w=>({id:w.id,items:[w],offset:-1})),k=M.reduce((w,O,U)=>(w[O.id]=U,w),{}),j={},E=[],L=n.map(w=>{let O=p[w.name],U=ht,D=p[w.superClass],F,V=w.interfaces.map(G=>p[G]);if(V.length>0){V.sort(Fo);let G=V.join("|");F=j[G],F===void 0&&(F={types:V,offset:-1},j[G]=F)}else F=null;let X=u[w.sourceFileName],te=x.reduce((G,he,Ae)=>{let[je,Ne,Je,T,ae]=he;return je===O&&G.push([Ae,Je,T,Ne,ae]),G},[]),ie=null,Q=te.filter(([,,G])=>G!==null).map(([G,,he])=>[G,M[k[he]]]);Q.length>0&&(ie={methods:Q,offset:-1},E.push(ie));let oe=I.reduce((G,he,Ae)=>{let[je]=he;return je===O&&G.push([Ae>0?1:0,ht]),G},[]),Y=u["<init>"],ne=te.filter(([,G])=>G===Y).map(([G,,,he])=>{if(c.has(w.name)){let Ae=-1,je=x.length;for(let Ne=0;Ne!==je;Ne++){let[Je,T,ae]=x[Ne];if(Je===D&&ae===Y&&T===he){Ae=Ne;break}}return[G,ht|Lo,Ae]}else return[G,ht|Lo|rr,-1]}),ve=Ad(te.filter(([,G])=>G!==Y).map(([G,,,,he])=>[G,he|ht|rr]));return{index:O,accessFlags:U,superClassIndex:D,interfaces:F,sourceFileIndex:X,annotationsDirectory:ie,classData:{instanceFields:oe,constructorMethods:ne,virtualMethods:ve,offset:-1}}}),R=Object.keys(j).map(w=>j[w]);return{classes:L,interfaces:R,fields:I,methods:x,protos:g,parameters:v,annotationDirectories:E,annotationSets:M,throwsAnnotations:N,types:f,strings:d}}function Ad(n){let e=0;return n.map(([t,r],o)=>{let s;return o===0?s=[t,r]:s=[t-e,r],e=t,s})}function Fo(n,e){return n-e}function Ld(n,e){let[,,t,r]=n,[,,o,s]=e;if(t<o)return-1;if(t>o)return 1;let i=r.join("|"),c=s.join("|");return i<c?-1:i>c?1:0}function xd(n,e){let[t,r,o]=n,[s,i,c]=e;return t!==s?t-s:o!==c?o-c:r-i}function kd(n,e){let[t,r,o]=n,[s,i,c]=e;return t!==s?t-s:o!==c?o-c:r-i}function Nd(n){let e=n[0];return e==="L"||e==="["?"L":n}function _e(n){if(n<=127)return[n];let e=[],t=!1;do{let r=n&127;n>>=7,t=n!==0,t&&(r|=128),e.push(r)}while(t);return e}function nr(n,e){let t=n%e;return t===0?n:n+e-t}function Md(n,e){let t=1,r=0,o=n.length;for(let s=e;s<o;s++)t=(t+n[s])%65521,r=(r+t)%65521;return(r<<16|t)>>>0}var Uo=wd;var Rd=1,sr=null,Do=null;function Bo(n){sr=n}function ir(n,e,t){let r=Ke(n);return r===null&&(n.indexOf("[")===0?r=ar(n,e,t):(n[0]==="L"&&n[n.length-1]===";"&&(n=n.substring(1,n.length-1)),r=jd(n,e,t))),Object.assign({className:n},r)}var Vo={boolean:{name:"Z",type:"uint8",size:1,byteSize:1,defaultValue:!1,isCompatible(n){return typeof n=="boolean"},fromJni(n){return!!n},toJni(n){return n?1:0},read(n){return n.readU8()},write(n,e){n.writeU8(e)},toString(){return this.name}},byte:{name:"B",type:"int8",size:1,byteSize:1,defaultValue:0,isCompatible(n){return Number.isInteger(n)&&n>=-128&&n<=127},fromJni:ye,toJni:ye,read(n){return n.readS8()},write(n,e){n.writeS8(e)},toString(){return this.name}},char:{name:"C",type:"uint16",size:1,byteSize:2,defaultValue:0,isCompatible(n){if(typeof n!="string"||n.length!==1)return!1;let e=n.charCodeAt(0);return e>=0&&e<=65535},fromJni(n){return String.fromCharCode(n)},toJni(n){return n.charCodeAt(0)},read(n){return n.readU16()},write(n,e){n.writeU16(e)},toString(){return this.name}},short:{name:"S",type:"int16",size:1,byteSize:2,defaultValue:0,isCompatible(n){return Number.isInteger(n)&&n>=-32768&&n<=32767},fromJni:ye,toJni:ye,read(n){return n.readS16()},write(n,e){n.writeS16(e)},toString(){return this.name}},int:{name:"I",type:"int32",size:1,byteSize:4,defaultValue:0,isCompatible(n){return Number.isInteger(n)&&n>=-2147483648&&n<=2147483647},fromJni:ye,toJni:ye,read(n){return n.readS32()},write(n,e){n.writeS32(e)},toString(){return this.name}},long:{name:"J",type:"int64",size:2,byteSize:8,defaultValue:0,isCompatible(n){return typeof n=="number"||n instanceof Int64},fromJni:ye,toJni:ye,read(n){return n.readS64()},write(n,e){n.writeS64(e)},toString(){return this.name}},float:{name:"F",type:"float",size:1,byteSize:4,defaultValue:0,isCompatible(n){return typeof n=="number"},fromJni:ye,toJni:ye,read(n){return n.readFloat()},write(n,e){n.writeFloat(e)},toString(){return this.name}},double:{name:"D",type:"double",size:2,byteSize:8,defaultValue:0,isCompatible(n){return typeof n=="number"},fromJni:ye,toJni:ye,read(n){return n.readDouble()},write(n,e){n.writeDouble(e)},toString(){return this.name}},void:{name:"V",type:"void",size:0,byteSize:0,defaultValue:void 0,isCompatible(n){return n===void 0},fromJni(){},toJni(){return NULL},toString(){return this.name}}},Od=new Set(Object.values(Vo).map(n=>n.name));function Ke(n){let e=Vo[n];return e!==void 0?e:null}function jd(n,e,t){let r=t._types[e?1:0],o=r[n];return o!==void 0||(n==="java.lang.Object"?o=Pd(t):o=Fd(n,e,t),r[n]=o),o}function Pd(n){return{name:"Ljava/lang/Object;",type:"pointer",size:1,defaultValue:NULL,isCompatible(e){return e===null?!0:e===void 0?!1:e.$h instanceof NativePointer?!0:typeof e=="string"},fromJni(e,t,r){return e.isNull()?null:n.cast(e,n.use("java.lang.Object"),r)},toJni(e,t){return e===null?NULL:typeof e=="string"?t.newStringUtf(e):e.$h}}}function Fd(n,e,t){let r=null,o=null,s=null;function i(){return r===null&&(r=t.use(n).class),r}function c(l){let d=i();return o===null&&(o=d.isInstance.overload("java.lang.Object")),o.call(d,l)}function a(){if(s===null){let l=i();s=t.use("java.lang.String").class.isAssignableFrom(l)}return s}return{name:Ve(n),type:"pointer",size:1,defaultValue:NULL,isCompatible(l){return l===null?!0:l===void 0?!1:l.$h instanceof NativePointer?c(l):typeof l=="string"&&a()},fromJni(l,d,u){return l.isNull()?null:a()&&e?d.stringFromJni(l):t.cast(l,t.use(n),u)},toJni(l,d){return l===null?NULL:typeof l=="string"?d.newStringUtf(l):l.$h},toString(){return this.name}}}var Ud=[["Z","boolean"],["B","byte"],["C","char"],["D","double"],["F","float"],["I","int"],["J","long"],["S","short"]].reduce((n,[e,t])=>(n["["+e]=Dd("["+e,t),n),{});function Dd(n,e){let t=y.prototype,r=$d(e),o={typeName:e,newArray:t["new"+r+"Array"],setRegion:t["set"+r+"ArrayRegion"],getElements:t["get"+r+"ArrayElements"],releaseElements:t["release"+r+"ArrayElements"]};return{name:n,type:"pointer",size:1,defaultValue:NULL,isCompatible(s){return Jd(s,e)},fromJni(s,i,c){return Vd(s,o,i,c)},toJni(s,i){return zd(s,o,i)}}}function ar(n,e,t){let r=Ud[n];if(r!==void 0)return r;if(n.indexOf("[")!==0)throw new Error("Unsupported type: "+n);let o=n.substring(1),s=ir(o,e,t),i=0,c=o.length;for(;i!==c&&o[i]==="[";)i++;o=o.substring(i),o[0]==="L"&&o[o.length-1]===";"&&(o=o.substring(1,o.length-1));let a=o.replace(/\./g,"/");Od.has(a)?a="[".repeat(i)+a:a="[".repeat(i)+"L"+a+";";let l="["+a;return o="[".repeat(i)+o,{name:n.replace(/\./g,"/"),type:"pointer",size:1,defaultValue:NULL,isCompatible(d){return d===null?!0:typeof d!="object"||d.length===void 0?!1:d.every(function(u){return s.isCompatible(u)})},fromJni(d,u,f){if(d.isNull())return null;let p=[],_=u.getArrayLength(d);for(let h=0;h!==_;h++){let g=u.getObjectArrayElement(d,h);try{p.push(s.fromJni(g,u))}finally{u.deleteLocalRef(g)}}try{p.$w=t.cast(d,t.use(l),f)}catch{t.use("java.lang.reflect.Array").newInstance(t.use(o).class,0),p.$w=t.cast(d,t.use(l),f)}return p.$dispose=Bd,p},toJni(d,u){if(d===null)return NULL;if(!(d instanceof Array))throw new Error("Expected an array");let f=d.$w;if(f!==void 0)return f.$h;let p=d.length,h=t.use(o).$borrowClassHandle(u);try{let g=u.newObjectArray(p,h.value,NULL);u.throwIfExceptionPending();for(let b=0;b!==p;b++){let v=s.toJni(d[b],u);try{u.setObjectArrayElement(g,b,v)}finally{s.type==="pointer"&&u.getObjectRefType(v)===Rd&&u.deleteLocalRef(v)}u.throwIfExceptionPending()}return g}finally{h.unref(u)}}}}function Bd(){let n=this.length;for(let e=0;e!==n;e++){let t=this[e];if(t===null)continue;let r=t.$dispose;if(r===void 0)break;r.call(t)}this.$w.$dispose()}function Vd(n,e,t,r){if(n.isNull())return null;let o=Ke(e.typeName),s=t.getArrayLength(n);return new Ut(n,e,o,s,t,r)}function zd(n,e,t){if(n===null)return NULL;let r=n.$h;if(r!==void 0)return r;let o=n.length,s=Ke(e.typeName),i=e.newArray.call(t,o);if(i.isNull())throw new Error("Unable to construct array");if(o>0){let c=s.byteSize,a=s.write,l=s.toJni,d=Memory.alloc(o*s.byteSize);for(let u=0;u!==o;u++)a(d.add(u*c),l(n[u]));e.setRegion.call(t,i,0,o,d),t.throwIfExceptionPending()}return i}function Jd(n,e){if(n===null)return!0;if(n instanceof Ut)return n.$s.typeName===e;if(!(typeof n=="object"&&n.length!==void 0))return!1;let r=Ke(e);return Array.prototype.every.call(n,o=>r.isCompatible(o))}function Ut(n,e,t,r,o,s=!0){if(s){let i=o.newGlobalRef(n);this.$h=i,this.$r=Script.bindWeak(this,o.vm.makeHandleDestructor(i))}else this.$h=n,this.$r=null;return this.$s=e,this.$t=t,this.length=r,new Proxy(this,Do)}Do={has(n,e){return e in n?!0:n.tryParseIndex(e)!==null},get(n,e,t){let r=n.tryParseIndex(e);return r===null?n[e]:n.readElement(r)},set(n,e,t,r){let o=n.tryParseIndex(e);return o===null?(n[e]=t,!0):(n.writeElement(o,t),!0)},ownKeys(n){let e=[],{length:t}=n;for(let r=0;r!==t;r++){let o=r.toString();e.push(o)}return e.push("length"),e},getOwnPropertyDescriptor(n,e){return n.tryParseIndex(e)!==null?{writable:!0,configurable:!0,enumerable:!0}:Object.getOwnPropertyDescriptor(n,e)}};Object.defineProperties(Ut.prototype,{$dispose:{enumerable:!0,value(){let n=this.$r;n!==null&&(this.$r=null,Script.unbindWeak(n))}},$clone:{value(n){return new Ut(this.$h,this.$s,this.$t,this.length,n)}},tryParseIndex:{value(n){if(typeof n=="symbol")return null;let e=parseInt(n);return isNaN(e)||e<0||e>=this.length?null:e}},readElement:{value(n){return this.withElements(e=>{let t=this.$t;return t.fromJni(t.read(e.add(n*t.byteSize)))})}},writeElement:{value(n,e){let{$h:t,$s:r,$t:o}=this,s=sr.getEnv(),i=Memory.alloc(o.byteSize);o.write(i,o.toJni(e)),r.setRegion.call(s,t,n,1,i)}},withElements:{value(n){let{$h:e,$s:t}=this,r=sr.getEnv(),o=t.getElements.call(r,e);if(o.isNull())throw new Error("Unable to get array elements");try{return n(o)}finally{t.releaseElements.call(r,e,o)}}},toJSON:{value(){let{length:n,$t:e}=this,{byteSize:t,fromJni:r,read:o}=e;return this.withElements(s=>{let i=[];for(let c=0;c!==n;c++){let a=r(o(s.add(c*t)));i.push(a)}return i})}},toString:{value(){return this.toJSON().toString()}}});function Ve(n){return"L"+n.replace(/\./g,"/")+";"}function $d(n){return n.charAt(0).toUpperCase()+n.slice(1)}function ye(n){return n}var Gd=4,{ensureClassInitialized:zo,makeMethodMangler:Wo}=Pt,Hd=8,dr=1,mt=2,ke=3,cr=1,ur=2,Dt=1,qo=2,Jo=Symbol("PENDING_USE"),$o="/data/local/tmp",{getCurrentThreadId:Vt,pointerSize:_t}=Process,ue={state:"empty",factories:[],loaders:null,Integer:null},$=null,K=null,Ko=null,Qo=null,Yo=null,Xo=null,es=null,Go=null,lr=null,Ye=new Map,Oe=class n{static _initialize(e,t){$=e,K=t,Ko=t.flavor==="art",t.flavor==="jvm"&&(zo=Eo,Wo=So)}static _disposeAll(e){ue.factories.forEach(t=>{t._dispose(e)})}static get(e){let t=pu(),r=t.factories[0];if(e===null)return r;let o=t.loaders.get(e);if(o!==null){let i=r.cast(o,t.Integer);return t.factories[i.intValue()]}let s=new n;return s.loader=e,s.cacheDir=r.cacheDir,hr(s,e),s}constructor(){this.cacheDir=$o,this.codeCacheDir=$o+"/dalvik-cache",this.tempFileNaming={prefix:"frida",suffix:""},this._classes={},this._classHandles=new ft(10,Wd),this._patchedMethods=new Set,this._loader=null,this._types=[{},{}],ue.factories.push(this)}_dispose(e){Array.from(this._patchedMethods).forEach(t=>{t.implementation=null}),this._patchedMethods.clear(),Hn(),this._classHandles.dispose(e),this._classes={}}get loader(){return this._loader}set loader(e){let t=this._loader===null&&e!==null;this._loader=e,t&&ue.state==="ready"&&this===ue.factories[0]&&hr(this,e)}use(e,t={}){let r=t.cache!=="skip",o=r?this._getUsedClass(e):void 0;if(o===void 0)try{let s=$.getEnv(),{_loader:i}=this,c=i!==null?Kd(e,i,s):qd(e);o=this._make(e,c,s)}finally{r&&this._setUsedClass(e,o)}return o}_getUsedClass(e){let t;for(;(t=this._classes[e])===Jo;)Thread.sleep(.05);return t===void 0&&(this._classes[e]=Jo),t}_setUsedClass(e,t){t!==void 0?this._classes[e]=t:delete this._classes[e]}_make(e,t,r){let o=Zd(),s=Object.create(mr.prototype,{[Symbol.for("n")]:{value:e},$n:{get(){return this[Symbol.for("n")]}},[Symbol.for("C")]:{value:o},$C:{get(){return this[Symbol.for("C")]}},[Symbol.for("w")]:{value:null,writable:!0},$w:{get(){return this[Symbol.for("w")]},set(a){this[Symbol.for("w")]=a}},[Symbol.for("_s")]:{writable:!0},$_s:{get(){return this[Symbol.for("_s")]},set(a){this[Symbol.for("_s")]=a}},[Symbol.for("c")]:{value:[null]},$c:{get(){return this[Symbol.for("c")]}},[Symbol.for("m")]:{value:new Map},$m:{get(){return this[Symbol.for("m")]}},[Symbol.for("l")]:{value:null,writable:!0},$l:{get(){return this[Symbol.for("l")]},set(a){this[Symbol.for("l")]=a}},[Symbol.for("gch")]:{value:t},$gch:{get(){return this[Symbol.for("gch")]}},[Symbol.for("f")]:{value:this},$f:{get(){return this[Symbol.for("f")]}}});o.prototype=s;let i=new o(null);s[Symbol.for("w")]=i,s.$w=i;let c=i.$borrowClassHandle(r);try{let a=c.value;zo(r,a),s.$l=Be.build(a,r)}finally{c.unref(r)}return i}retain(e){let t=$.getEnv();return e.$clone(t)}cast(e,t,r){let o=$.getEnv(),s=e.$h;s===void 0&&(s=e);let i=t.$borrowClassHandle(o);try{if(!o.isInstanceOf(s,i.value))throw new Error(`Cast from '${o.getObjectClassName(s)}' to '${t.$n}' isn't possible`)}finally{i.unref(o)}let c=t.$C;return new c(s,Dt,o,r)}wrap(e,t,r){let o=t.$C,s=new o(e,Dt,r,!1);return s.$r=Script.bindWeak(s,$.makeHandleDestructor(e)),s}array(e,t){let r=$.getEnv(),o=Ke(e);o!==null&&(e=o.name);let s=ar("["+e,!1,this),i=s.toJni(t,r);return s.fromJni(i,r,!0)}registerClass(e){let t=$.getEnv(),r=[];try{let o=this.use("java.lang.Class"),s=t.javaLangReflectMethod(),i=t.vaMethod("pointer",[]),c=e.name,a=e.implements||[],l=e.superClass||this.use("java.lang.Object"),d=[],u=[],f={name:Ve(c),sourceFileName:hu(c),superClass:Ve(l.$n),interfaces:a.map(E=>Ve(E.$n)),fields:d,methods:u},p=a.slice();a.forEach(E=>{Array.prototype.slice.call(E.class.getInterfaces()).forEach(L=>{let R=this.cast(L,o).getCanonicalName();p.push(this.use(R))})});let _=e.fields||{};Object.getOwnPropertyNames(_).forEach(E=>{let L=this._getType(_[E]);d.push([E,L.name])});let h={},g={};p.forEach(E=>{let L=E.$borrowClassHandle(t);r.push(L);let R=L.value;E.$ownMembers.filter(w=>E[w].overloads!==void 0).forEach(w=>{let O=E[w],U=O.overloads,D=U.map(F=>Ho(w,F.returnType,F.argumentTypes));h[w]=[O,D,R],U.forEach((F,V)=>{let X=D[V];g[X]=[F,R]})})});let b=e.methods||{},I=Object.keys(b).reduce((E,L)=>{let R=b[L],w=L==="$init"?"<init>":L;return R instanceof Array?E.push(...R.map(O=>[w,O])):E.push([w,R]),E},[]),x=[];I.forEach(([E,L])=>{let R=ke,w,O,U=[],D;if(typeof L=="function"){let te=h[E];if(te!==void 0&&Array.isArray(te)){let[ie,Q,oe]=te;if(Q.length>1)throw new Error(`More than one overload matching '${E}': signature must be specified`);delete g[Q[0]];let Y=ie.overloads[0];R=Y.type,w=Y.returnType,O=Y.argumentTypes,D=L;let ne=t.toReflectedMethod(oe,Y.handle,0),ve=i(t.handle,ne,s.getGenericExceptionTypes);U=_r(t,ve).map(Ve),t.deleteLocalRef(ve),t.deleteLocalRef(ne)}else w=this._getType("void"),O=[],D=L}else{if(L.isStatic&&(R=mt),w=this._getType(L.returnType||"void"),O=(L.argumentTypes||[]).map(Q=>this._getType(Q)),D=L.implementation,typeof D!="function")throw new Error("Expected a function implementation for method: "+E);let te=Ho(E,w,O),ie=g[te];if(ie!==void 0){let[Q,oe]=ie;delete g[te],R=Q.type,w=Q.returnType,O=Q.argumentTypes;let Y=t.toReflectedMethod(oe,Q.handle,0),ne=i(t.handle,Y,s.getGenericExceptionTypes);U=_r(t,ne).map(Ve),t.deleteLocalRef(ne),t.deleteLocalRef(Y)}}let F=w.name,V=O.map(te=>te.name),X="("+V.join("")+")"+F;u.push([E,F,V,U,R===mt?Hd:0]),x.push([E,X,R,w,O,D])});let N=Object.keys(g);if(N.length>0)throw new Error("Missing implementation for: "+N.join(", "));let M=Bt.fromBuffer(Uo(f),this);try{M.load()}finally{M.file.delete()}let k=this.use(e.name),j=I.length;if(j>0){let E=3*_t,L=Memory.alloc(j*E),R=[],w=[];x.forEach(([D,F,V,X,te,ie],Q)=>{let oe=Memory.allocUtf8String(D),Y=Memory.allocUtf8String(F),ne=ts(D,k,V,X,te,ie);L.add(Q*E).writePointer(oe),L.add(Q*E+_t).writePointer(Y),L.add(Q*E+2*_t).writePointer(ne),w.push(oe,Y),R.push(ne)});let O=k.$borrowClassHandle(t);r.push(O);let U=O.value;t.registerNatives(U,L,j),t.throwIfExceptionPending(),k.$nativeMethods=R}return k}finally{r.forEach(o=>{o.unref(t)})}}choose(e,t){let r=$.getEnv(),{flavor:o}=K;if(o==="jvm")this._chooseObjectsJvm(e,r,t);else if(o==="art"){let s=K["art::gc::Heap::VisitObjects"]===void 0;if(s&&K["art::gc::Heap::GetInstances"]===void 0)return this._chooseObjectsJvm(e,r,t);Ee($,r,i=>{s?this._chooseObjectsArtPreA12(e,r,i,t):this._chooseObjectsArtLegacy(e,r,i,t)})}else this._chooseObjectsDalvik(e,r,t)}_chooseObjectsJvm(e,t,r){let o=this.use(e),{jvmti:s}=K,i=1,c=3,a=o.$borrowClassHandle(t),l=int64(a.value.toString());try{let d=new NativeCallback((b,v,I,x)=>(I.writeS64(l),i),"int",["int64","int64","pointer","pointer"]);s.iterateOverInstancesOfClass(a.value,c,d,a.value);let u=Memory.alloc(8);u.writeS64(l);let f=Memory.alloc(Gd),p=Memory.alloc(_t);s.getObjectsWithTags(1,u,f,p,NULL);let _=f.readS32(),h=p.readPointer(),g=[];for(let b=0;b!==_;b++)g.push(h.add(b*_t).readPointer());s.deallocate(h);try{for(let b of g){let v=this.cast(b,o);if(r.onMatch(v)==="stop")break}r.onComplete()}finally{g.forEach(b=>{t.deleteLocalRef(b)})}}finally{a.unref(t)}}_chooseObjectsArtPreA12(e,t,r,o){let s=this.use(e),i=dt.$new(r,$),c,a=s.$borrowClassHandle(t);try{let f=K["art::JavaVMExt::DecodeGlobal"](K.vm,r,a.value);c=i.newHandle(f)}finally{a.unref(t)}let l=0,d=lt.$new();K["art::gc::Heap::GetInstances"](K.artHeap,i,c,l,d);let u=d.handles.map(f=>t.newGlobalRef(f));d.$delete(),i.$delete();try{for(let f of u){let p=this.cast(f,s);if(o.onMatch(p)==="stop")break}o.onComplete()}finally{u.forEach(f=>{t.deleteGlobalRef(f)})}}_chooseObjectsArtLegacy(e,t,r,o){let s=this.use(e),i=[],c=K["art::JavaVMExt::AddGlobalRef"],a=K.vm,l,d=s.$borrowClassHandle(t);try{l=K["art::JavaVMExt::DecodeGlobal"](a,r,d.value).toInt32()}finally{d.unref(t)}let u=Qn(l,f=>{i.push(c(a,r,f))});K["art::gc::Heap::VisitObjects"](K.artHeap,u,NULL);try{for(let f of i){let p=this.cast(f,s);if(o.onMatch(p)==="stop")break}}finally{i.forEach(f=>{t.deleteGlobalRef(f)})}o.onComplete()}_chooseObjectsDalvik(e,t,r){let o=this.use(e);if(K.addLocalReference===null){let i=Process.getModuleByName("libdvm.so"),c;switch(Process.arch){case"arm":c="2d e9 f0 41 05 46 15 4e 0c 46 7e 44 11 b3 43 68";break;case"ia32":c="8d 64 24 d4 89 5c 24 1c 89 74 24 20 e8 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 85 d2";break}Memory.scan(i.base,i.size,c,{onMatch:(a,l)=>{let d;if(Process.arch==="arm")a=a.or(1),d=new NativeFunction(a,"pointer",["pointer","pointer"]);else{let u=Memory.alloc(Process.pageSize);Memory.patchCode(u,16,f=>{let p=new X86Writer(f,{pc:u});p.putMovRegRegOffsetPtr("eax","esp",4),p.putMovRegRegOffsetPtr("edx","esp",8),p.putJmpAddress(a),p.flush()}),d=new NativeFunction(u,"pointer",["pointer","pointer"]),d._thunk=u}return K.addLocalReference=d,$.perform(u=>{s(this,u)}),"stop"},onError(a){},onComplete(){K.addLocalReference===null&&r.onComplete()}})}else s(this,t);function s(i,c){let{DVM_JNI_ENV_OFFSET_SELF:a}=Pt,l=c.handle.add(a).readPointer(),d,u=o.$borrowClassHandle(c);try{d=K.dvmDecodeIndirectRef(l,u.value)}finally{u.unref(c)}let f=d.toMatchPattern(),p=K.dvmHeapSourceGetBase(),h=K.dvmHeapSourceGetLimit().sub(p).toInt32();Memory.scan(p,h,f,{onMatch:(g,b)=>{K.dvmIsValidObject(g)&&$.perform(v=>{let I=v.handle.add(a).readPointer(),x,N=K.addLocalReference(I,g);try{x=i.cast(N,o)}finally{v.deleteLocalRef(N)}if(r.onMatch(x)==="stop")return"stop"})},onError(g){},onComplete(){r.onComplete()}})}}openClassFile(e){return new Bt(e,null,this)}_getType(e,t=!0){return ir(e,t,this)}};function Zd(){return function(n,e,t,r){return mr.call(this,n,e,t,r)}}function mr(n,e,t,r=!0){if(n!==null)if(r){let o=t.newGlobalRef(n);this.$h=o,this.$r=Script.bindWeak(this,$.makeHandleDestructor(o))}else this.$h=n,this.$r=null;else this.$h=null,this.$r=null;return this.$t=e,new Proxy(this,Qo)}Qo={has(n,e){return e in n?!0:n.$has(e)},get(n,e,t){if(typeof e!="string"||e.startsWith("$")||e==="class")return n[e];let r=n.$find(e);return r!==null?r(t):n[e]},set(n,e,t,r){return n[e]=t,!0},ownKeys(n){return n.$list()},getOwnPropertyDescriptor(n,e){return Object.prototype.hasOwnProperty.call(n,e)?Object.getOwnPropertyDescriptor(n,e):{writable:!1,configurable:!0,enumerable:!0}}};Object.defineProperties(mr.prototype,{[Symbol.for("new")]:{enumerable:!1,get(){return this.$getCtor("allocAndInit")}},$new:{enumerable:!0,get(){return this[Symbol.for("new")]}},[Symbol.for("alloc")]:{enumerable:!1,value(){let n=$.getEnv(),e=this.$borrowClassHandle(n);try{let t=n.allocObject(e.value);return this.$f.cast(t,this)}finally{e.unref(n)}}},$alloc:{enumerable:!0,get(){return this[Symbol.for("$alloc")]}},[Symbol.for("init")]:{enumerable:!1,get(){return this.$getCtor("initOnly")}},$init:{enumerable:!0,get(){return this[Symbol.for("init")]}},[Symbol.for("dispose")]:{enumerable:!1,value(){let n=this.$r;n!==null&&(this.$r=null,Script.unbindWeak(n)),this.$h!==null&&(this.$h=void 0)}},$dispose:{enumerable:!0,get(){return this[Symbol.for("dispose")]}},[Symbol.for("clone")]:{enumerable:!1,value(n){let e=this.$C;return new e(this.$h,this.$t,n)}},$clone:{value(n){return this[Symbol.for("clone")](n)}},[Symbol.for("class")]:{enumerable:!1,get(){let n=$.getEnv(),e=this.$borrowClassHandle(n);try{let t=this.$f;return t.cast(e.value,t.use("java.lang.Class"))}finally{e.unref(n)}}},class:{enumerable:!0,get(){return this[Symbol.for("class")]}},[Symbol.for("className")]:{enumerable:!1,get(){let n=this.$h;return n===null?this.$n:$.getEnv().getObjectClassName(n)}},$className:{enumerable:!0,get(){return this[Symbol.for("className")]}},[Symbol.for("ownMembers")]:{enumerable:!1,get(){return this.$l.list()}},$ownMembers:{enumerable:!0,get(){return this[Symbol.for("ownMembers")]}},[Symbol.for("super")]:{enumerable:!1,get(){let n=$.getEnv(),e=this.$s.$C;return new e(this.$h,qo,n)}},$super:{enumerable:!0,get(){return this[Symbol.for("super")]}},[Symbol.for("s")]:{enumerable:!1,get(){let n=Object.getPrototypeOf(this),e=n.$_s;if(e===void 0){let t=$.getEnv(),r=this.$borrowClassHandle(t);try{let o=t.getSuperclass(r.value);if(o.isNull())e=null;else try{let s=t.getClassName(o),i=n.$f;if(e=i._getUsedClass(s),e===void 0)try{let c=Qd(this);e=i._make(s,c,t)}finally{i._setUsedClass(s,e)}}finally{t.deleteLocalRef(o)}}finally{r.unref(t)}n.$_s=e}return e}},$s:{get(){return this[Symbol.for("s")]}},[Symbol.for("isSameObject")]:{enumerable:!1,value(n){return $.getEnv().isSameObject(n.$h,this.$h)}},$isSameObject:{value(n){return this[Symbol.for("isSameObject")](n)}},[Symbol.for("getCtor")]:{enumerable:!1,value(n){let e=this.$c,t=e[0];if(t===null){let r=$.getEnv(),o=this.$borrowClassHandle(r);try{t=Yd(o.value,this.$w,r),e[0]=t}finally{o.unref(r)}}return t[n]}},$getCtor:{value(n){return this[Symbol.for("getCtor")](n)}},[Symbol.for("borrowClassHandle")]:{enumerable:!1,value(n){let e=this.$n,t=this.$f._classHandles,r=t.get(e);return r===void 0&&(r=new gr(this.$gch(n),n),t.set(e,r,n)),r.ref()}},$borrowClassHandle:{value(n){return this[Symbol.for("borrowClassHandle")](n)}},[Symbol.for("copyClassHandle")]:{enumerable:!1,value(n){let e=this.$borrowClassHandle(n);try{return n.newLocalRef(e.value)}finally{e.unref(n)}}},$copyClassHandle:{value(n){return this[Symbol.for("copyClassHandle")](n)}},[Symbol.for("getHandle")]:{enumerable:!1,value(n){let e=this.$h;if(e===void 0)throw new Error("Wrapper is disposed; perhaps it was borrowed from a hook instead of calling Java.retain() to make a long-lived wrapper?");return e}},$getHandle:{value(n){return this[Symbol.for("getHandle")](n)}},[Symbol.for("list")]:{enumerable:!1,value(){let n=this.$s,e=n!==null?n.$list():[],t=this.$l;return Array.from(new Set(e.concat(t.list())))}},$list:{get(){return this[Symbol.for("list")]}},[Symbol.for("has")]:{enumerable:!1,value(n){if(this.$m.has(n)||this.$l.has(n))return!0;let r=this.$s;return!!(r!==null&&r.$has(n))}},$has:{value(n){return this[Symbol.for("has")](n)}},[Symbol.for("find")]:{enumerable:!1,value(n){let e=this.$m,t=e.get(n);if(t!==void 0)return t;let o=this.$l.find(n);if(o!==null){let i=$.getEnv(),c=this.$borrowClassHandle(i);try{t=Xd(n,o,c.value,this.$w,i)}finally{c.unref(i)}return e.set(n,t),t}let s=this.$s;return s!==null?s.$find(n):null}},$find:{value(n){return this[Symbol.for("find")](n)}},[Symbol.for("toJSON")]:{enumerable:!1,value(){let n=this.$n;if(this.$h===null)return`<class: ${n}>`;let t=this.$className;return n===t?`<instance: ${n}>`:`<instance: ${n}, $className: ${t}>`}},toJSON:{get(){return this[Symbol.for("toJSON")]}}});function gr(n,e){this.value=e.newGlobalRef(n),e.deleteLocalRef(n),this.refs=1}gr.prototype.ref=function(){return this.refs++,this};gr.prototype.unref=function(n){--this.refs===0&&n.deleteGlobalRef(this.value)};function Wd(n,e){n.unref(e)}function qd(n){let e=n.replace(/\./g,"/");return function(t){let r=Vt();rs(r);try{return t.findClass(e)}finally{os(r)}}}function Kd(n,e,t){return lr===null&&(Go=t.vaMethod("pointer",["pointer"]),lr=e.loadClass.overload("java.lang.String").handle),t=null,function(r){let o=r.newStringUtf(n),s=Vt();rs(s);try{let i=Go(r.handle,e.$h,lr,o);return r.throwIfExceptionPending(),i}finally{os(s),r.deleteLocalRef(o)}}}function Qd(n){return function(e){let t=n.$borrowClassHandle(e);try{return e.getSuperclass(t.value)}finally{t.unref(e)}}}function Yd(n,e,t){let{$n:r,$f:o}=e,s=fu(r),i=t.javaLangClass(),c=t.javaLangReflectConstructor(),a=t.vaMethod("pointer",[]),l=t.vaMethod("uint8",[]),d=[],u=[],f=o._getType(r,!1),p=o._getType("void",!1),_=a(t.handle,n,i.getDeclaredConstructors);try{let h=t.getArrayLength(_);if(h!==0)for(let g=0;g!==h;g++){let b,v,I=t.getObjectArrayElement(_,g);try{b=t.fromReflectedMethod(I),v=a(t.handle,I,c.getGenericParameterTypes)}finally{t.deleteLocalRef(I)}let x;try{x=_r(t,v).map(N=>o._getType(N))}finally{t.deleteLocalRef(v)}d.push(Qe(s,e,dr,b,f,x,t)),u.push(Qe(s,e,ke,b,p,x,t))}else{if(l(t.handle,n,i.isInterface))throw new Error("cannot instantiate an interface");let b=t.javaLangObject(),v=t.getMethodId(b,"<init>","()V");d.push(Qe(s,e,dr,v,f,[],t)),u.push(Qe(s,e,ke,v,p,[],t))}}finally{t.deleteLocalRef(_)}if(u.length===0)throw new Error("no supported overloads");return{allocAndInit:pr(d),initOnly:pr(u)}}function Xd(n,e,t,r,o){return e.startsWith("m")?eu(n,e,t,r,o):lu(n,e,t,r,o)}function eu(n,e,t,r,o){let{$f:s}=r,i=e.split(":").slice(1),c=o.javaLangReflectMethod(),a=o.vaMethod("pointer",[]),l=o.vaMethod("uint8",[]),d=i.map(f=>{let p=f[0]==="s"?mt:ke,_=ptr(f.substr(1)),h,g=[],b=o.toReflectedMethod(t,_,p===mt?1:0);try{let v=!!l(o.handle,b,c.isVarArgs),I=a(o.handle,b,c.getGenericReturnType);o.throwIfExceptionPending();try{h=s._getType(o.getTypeName(I))}finally{o.deleteLocalRef(I)}let x=a(o.handle,b,c.getParameterTypes);try{let N=o.getArrayLength(x);for(let M=0;M!==N;M++){let k=o.getObjectArrayElement(x,M),j;try{j=v&&M===N-1?o.getArrayTypeName(k):o.getTypeName(k)}finally{o.deleteLocalRef(k)}let E=s._getType(j);g.push(E)}}finally{o.deleteLocalRef(x)}}catch{return null}finally{o.deleteLocalRef(b)}return Qe(n,r,p,_,h,g,o)}).filter(f=>f!==null);if(d.length===0)throw new Error("No supported overloads");n==="valueOf"&&iu(d);let u=pr(d);return function(f){return u}}function pr(n){let e=tu();return Object.setPrototypeOf(e,Yo),e._o=n,e}function tu(){let n=function(){return n.invoke(this,arguments)};return n}Yo=Object.create(Function.prototype,{overloads:{enumerable:!0,get(){return this._o}},overload:{value(...n){let e=this._o,t=n.length,r=n.join(":");for(let o=0;o!==e.length;o++){let s=e[o],{argumentTypes:i}=s;if(i.length!==t)continue;if(i.map(a=>a.className).join(":")===r)return s}fr(this.methodName,this.overloads,"specified argument types do not match any of:")}},methodName:{enumerable:!0,get(){return this._o[0].methodName}},holder:{enumerable:!0,get(){return this._o[0].holder}},type:{enumerable:!0,get(){return this._o[0].type}},handle:{enumerable:!0,get(){return ze(this),this._o[0].handle}},implementation:{enumerable:!0,get(){return ze(this),this._o[0].implementation},set(n){ze(this),this._o[0].implementation=n}},returnType:{enumerable:!0,get(){return ze(this),this._o[0].returnType}},argumentTypes:{enumerable:!0,get(){return ze(this),this._o[0].argumentTypes}},canInvokeWith:{enumerable:!0,get(n){return ze(this),this._o[0].canInvokeWith}},clone:{enumerable:!0,value(n){return ze(this),this._o[0].clone(n)}},invoke:{value(n,e){let t=this._o,r=n.$h!==null;for(let o=0;o!==t.length;o++){let s=t[o];if(s.canInvokeWith(e)){if(s.type===ke&&!r){let i=this.methodName;if(i==="toString")return`<class: ${n.$n}>`;throw new Error(i+": cannot call instance method without an instance")}return s.apply(n,e)}}if(this.methodName==="toString")return`<class: ${n.$n}>`;fr(this.methodName,this.overloads,"argument types do not match any of:")}}});function Ho(n,e,t){return`${e.className} ${n}(${t.map(r=>r.className).join(", ")})`}function ze(n){let e=n._o;e.length>1&&fr(e[0].methodName,e,"has more than one overload, use .overload(<signature>) to choose from:")}function fr(n,e,t){let o=e.slice().sort((s,i)=>s.argumentTypes.length-i.argumentTypes.length).map(s=>s.argumentTypes.length>0?".overload('"+s.argumentTypes.map(c=>c.className).join("', '")+"')":".overload()");throw new Error(`${n}(): ${t}
	${o.join(`
	`)}`)}function Qe(n,e,t,r,o,s,i,c){let a=o.type,l=s.map(f=>f.type);i===null&&(i=$.getEnv());let d,u;return t===ke?(d=i.vaMethod(a,l,c),u=i.nonvirtualVaMethod(a,l,c)):t===mt?(d=i.staticVaMethod(a,l,c),u=d):(d=i.constructor(l,c),u=d),nu([n,e,t,r,o,s,d,u])}function nu(n){let e=ru();return Object.setPrototypeOf(e,Xo),e._p=n,e}function ru(){let n=function(){return n.invoke(this,arguments)};return n}Xo=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return this._p[0]}},holder:{enumerable:!0,get(){return this._p[1]}},type:{enumerable:!0,get(){return this._p[2]}},handle:{enumerable:!0,get(){return this._p[3]}},implementation:{enumerable:!0,get(){let n=this._r;return n!==void 0?n:null},set(n){let e=this._p,t=e[1];if(e[2]===dr)throw new Error("Reimplementing $new is not possible; replace implementation of $init instead");let o=this._r;if(o!==void 0&&(t.$f._patchedMethods.delete(this),o._m.revert($),this._r=void 0),n!==null){let[s,i,c,a,l,d]=e,u=ts(s,i,c,l,d,n,this),f=Wo(a);u._m=f,this._r=u,f.replace(u,c===ke,d,$,K),t.$f._patchedMethods.add(this)}}},returnType:{enumerable:!0,get(){return this._p[4]}},argumentTypes:{enumerable:!0,get(){return this._p[5]}},canInvokeWith:{enumerable:!0,value(n){let e=this._p[5];return n.length!==e.length?!1:e.every((t,r)=>t.isCompatible(n[r]))}},clone:{enumerable:!0,value(n){let e=this._p.slice(0,6);return Qe(...e,null,n)}},invoke:{value(n,e){let t=$.getEnv(),r=this._p,o=r[2],s=r[4],i=r[5],c=this._r,a=o===ke,l=e.length,d=2+l;t.pushLocalFrame(d);let u=null;try{let f;a?f=n.$getHandle():(u=n.$borrowClassHandle(t),f=u.value);let p,_=n.$t;c===void 0?p=r[3]:(p=c._m.resolveTarget(n,a,t,K),Ko&&c._c.has(Vt())&&(_=qo));let h=[t.handle,f,p];for(let v=0;v!==l;v++)h.push(i[v].toJni(e[v],t));let g;_===Dt?g=r[6]:(g=r[7],a&&h.splice(2,0,n.$copyClassHandle(t)));let b=g.apply(null,h);return t.throwIfExceptionPending(),s.fromJni(b,t,!0)}finally{u!==null&&u.unref(t),t.popLocalFrame(NULL)}}},toString:{enumerable:!0,value(){return`function ${this.methodName}(${this.argumentTypes.map(n=>n.className).join(", ")}): ${this.returnType.className}`}}});function ts(n,e,t,r,o,s,i=null){let c=new Set,a=ou([n,e,t,r,o,s,i,c]),l=new NativeCallback(a,r.type,["pointer","pointer"].concat(o.map(d=>d.type)));return l._c=c,l}function ou(n){return function(){return su(arguments,n)}}function su(n,e){let t=new y(n[0],$),[r,o,s,i,c,a,l,d]=e,u=[],f;if(s===ke){let h=o.$C;f=new h(n[1],Dt,t,!1)}else f=o;let p=Vt();t.pushLocalFrame(3);let _=!0;$.link(p,t);try{d.add(p);let h;l===null||!Ye.has(p)?h=a:h=l;let g=[],b=n.length-2;for(let x=0;x!==b;x++){let M=c[x].fromJni(n[2+x],t,!1);g.push(M),u.push(M)}let v=h.apply(f,g);if(!i.isCompatible(v))throw new Error(`Implementation for ${r} expected return value compatible with ${i.className}`);let I=i.toJni(v,t);return i.type==="pointer"&&(I=t.popLocalFrame(I),_=!1,u.push(v)),I}catch(h){let g=h.$h;return g!==void 0?t.throw(g):Script.nextTick(()=>{throw h}),i.defaultValue}finally{$.unlink(p),_&&t.popLocalFrame(NULL),d.delete(p),u.forEach(h=>{if(h===null)return;let g=h.$dispose;g!==void 0&&g.call(h)})}}function iu(n){let{holder:e,type:t}=n[0];n.some(o=>o.type===t&&o.argumentTypes.length===0)||n.push(au([e,t]))}function au(n){let e=cu();return Object.setPrototypeOf(e,es),e._p=n,e}function cu(){return function(){return this}}es=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return"valueOf"}},holder:{enumerable:!0,get(){return this._p[0]}},type:{enumerable:!0,get(){return this._p[1]}},handle:{enumerable:!0,get(){return NULL}},implementation:{enumerable:!0,get(){return null},set(n){}},returnType:{enumerable:!0,get(){let n=this.holder;return n.$f.use(n.$n)}},argumentTypes:{enumerable:!0,get(){return[]}},canInvokeWith:{enumerable:!0,value(n){return n.length===0}},clone:{enumerable:!0,value(n){throw new Error("Invalid operation")}}});function lu(n,e,t,r,o){let s=e[2]==="s"?cr:ur,i=ptr(e.substr(3)),{$f:c}=r,a,l=o.toReflectedField(t,i,s===cr?1:0);try{a=o.vaMethod("pointer",[])(o.handle,l,o.javaLangReflectField().getGenericType),o.throwIfExceptionPending()}finally{o.deleteLocalRef(l)}let d;try{d=c._getType(o.getTypeName(a))}finally{o.deleteLocalRef(a)}let u,f,p=d.type;return s===cr?(u=o.getStaticField(p),f=o.setStaticField(p)):(u=o.getField(p),f=o.setField(p)),du([s,d,i,u,f])}function du(n){return function(e){return new ns([e].concat(n))}}function ns(n){this._p=n}Object.defineProperties(ns.prototype,{value:{enumerable:!0,get(){let[n,e,t,r,o]=this._p,s=$.getEnv();s.pushLocalFrame(4);let i=null;try{let c;if(e===ur){if(c=n.$getHandle(),c===null)throw new Error("Cannot access an instance field without an instance")}else i=n.$borrowClassHandle(s),c=i.value;let a=o(s.handle,c,r);return s.throwIfExceptionPending(),t.fromJni(a,s,!0)}finally{i!==null&&i.unref(s),s.popLocalFrame(NULL)}},set(n){let[e,t,r,o,,s]=this._p,i=$.getEnv();i.pushLocalFrame(4);let c=null;try{let a;if(t===ur){if(a=e.$getHandle(),a===null)throw new Error("Cannot access an instance field without an instance")}else c=e.$borrowClassHandle(i),a=c.value;if(!r.isCompatible(n))throw new Error(`Expected value compatible with ${r.className}`);let l=r.toJni(n,i);s(i.handle,a,o,l),i.throwIfExceptionPending()}finally{c!==null&&c.unref(i),i.popLocalFrame(NULL)}}},holder:{enumerable:!0,get(){return this._p[0]}},fieldType:{enumerable:!0,get(){return this._p[1]}},fieldReturnType:{enumerable:!0,get(){return this._p[2]}},toString:{enumerable:!0,value(){let n=`Java.Field{holder: ${this.holder}, fieldType: ${this.fieldType}, fieldReturnType: ${this.fieldReturnType}, value: ${this.value}}`;return n.length<200?n:`Java.Field{
	holder: ${this.holder},
	fieldType: ${this.fieldType},
	fieldReturnType: ${this.fieldReturnType},
	value: ${this.value},
}`.split(`
`).map(t=>t.length>200?t.slice(0,t.indexOf(" ")+1)+"...,":t).join(`
`)}}});var Bt=class n{static fromBuffer(e,t){let r=Zo(t),o=r.getCanonicalPath().toString(),s=new File(o,"w");return s.write(e.buffer),s.close(),uu(o,t),new n(o,r,t)}constructor(e,t,r){this.path=e,this.file=t,this._factory=r}load(){let{_factory:e}=this,{codeCacheDir:t}=e,r=e.use("dalvik.system.DexClassLoader"),o=e.use("java.io.File"),s=this.file;if(s===null&&(s=e.use("java.io.File").$new(this.path)),!s.exists())throw new Error("File not found");o.$new(t).mkdirs(),e.loader=r.$new(s.getCanonicalPath(),t,null,e.loader),$.preventDetachDueToClassLoader()}getClassNames(){let{_factory:e}=this,t=e.use("dalvik.system.DexFile"),r=Zo(e),o=t.loadDex(this.path,r.getCanonicalPath(),0),s=[],i=o.entries();for(;i.hasMoreElements();)s.push(i.nextElement().toString());return s}};function Zo(n){let{cacheDir:e,tempFileNaming:t}=n,r=n.use("java.io.File"),o=r.$new(e);return o.mkdirs(),r.createTempFile(t.prefix,t.suffix+".dex",o)}function uu(n,e){e.use("java.io.File").$new(n).setWritable(!1,!1)}function pu(){switch(ue.state){case"empty":{ue.state="pending";let n=ue.factories[0],e=n.use("java.util.HashMap"),t=n.use("java.lang.Integer");ue.loaders=e.$new(),ue.Integer=t;let r=n.loader;return r!==null&&hr(n,r),ue.state="ready",ue}case"pending":do Thread.sleep(.05);while(ue.state==="pending");return ue;case"ready":return ue}}function hr(n,e){let{factories:t,loaders:r,Integer:o}=ue,s=o.$new(t.indexOf(n));r.put(e,s);for(let i=e.getParent();i!==null&&!r.containsKey(i);i=i.getParent())r.put(i,s)}function rs(n){let e=Ye.get(n);e===void 0&&(e=0),e++,Ye.set(n,e)}function os(n){let e=Ye.get(n);if(e===void 0)throw new Error(`Thread ${n} is not ignored`);e--,e===0?Ye.delete(n):Ye.set(n,e)}function fu(n){return n.slice(n.lastIndexOf(".")+1)}function _r(n,e){let t=[],r=n.getArrayLength(e);for(let o=0;o!==r;o++){let s=n.getObjectArrayElement(e,o);try{t.push(n.getTypeName(s))}finally{n.deleteLocalRef(s)}}return t}function hu(n){let e=n.split(".");return e[e.length-1]+".java"}var _u=4,ss=Process.pointerSize,br=class{ACC_PUBLIC=1;ACC_PRIVATE=2;ACC_PROTECTED=4;ACC_STATIC=8;ACC_FINAL=16;ACC_SYNCHRONIZED=32;ACC_BRIDGE=64;ACC_VARARGS=128;ACC_NATIVE=256;ACC_ABSTRACT=1024;ACC_STRICT=2048;ACC_SYNTHETIC=4096;constructor(){this.classFactory=null,this.ClassFactory=Oe,this.vm=null,this.api=null,this._initialized=!1,this._apiError=null,this._wakeupHandler=null,this._pollListener=null,this._pendingMainOps=[],this._pendingVmOps=[],this._cachedIsAppProcess=null;try{this._tryInitialize()}catch{}}_tryInitialize(){if(this._initialized)return!0;if(this._apiError!==null)throw this._apiError;let e;try{e=To(),this.api=e}catch(r){throw this._apiError=r,r}if(e===null)return!1;let t=new we(e);return this.vm=t,Bo(t),Oe._initialize(t,e),this.classFactory=new Oe,this._initialized=!0,!0}_dispose(){if(this.api===null)return;let{vm:e}=this;e.perform(t=>{Oe._disposeAll(t),y.dispose(t)}),Script.nextTick(()=>{we.dispose(e)})}get available(){return this._tryInitialize()}get androidVersion(){return ut()}synchronized(e,t){let{$h:r=e}=e;if(!(r instanceof NativePointer))throw new Error("Java.synchronized: the first argument `obj` must be either a pointer or a Java instance");let o=this.vm.getEnv();de("VM::MonitorEnter",o.monitorEnter(r));try{t()}finally{o.monitorExit(r)}}enumerateLoadedClasses(e){this._checkAvailable();let{flavor:t}=this.api;t==="jvm"?this._enumerateLoadedClassesJvm(e):t==="art"?this._enumerateLoadedClassesArt(e):this._enumerateLoadedClassesDalvik(e)}enumerateLoadedClassesSync(){let e=[];return this.enumerateLoadedClasses({onMatch(t){e.push(t)},onComplete(){}}),e}enumerateClassLoaders(e){this._checkAvailable();let{flavor:t}=this.api;if(t==="jvm")this._enumerateClassLoadersJvm(e);else if(t==="art")this._enumerateClassLoadersArt(e);else throw new Error("Enumerating class loaders is not supported on Dalvik")}enumerateClassLoadersSync(){let e=[];return this.enumerateClassLoaders({onMatch(t){e.push(t)},onComplete(){}}),e}_enumerateLoadedClassesJvm(e){let{api:t,vm:r}=this,{jvmti:o}=t,s=r.getEnv(),i=Memory.alloc(_u),c=Memory.alloc(ss);o.getLoadedClasses(i,c);let a=i.readS32(),l=c.readPointer(),d=[];for(let u=0;u!==a;u++)d.push(l.add(u*ss).readPointer());o.deallocate(l);try{for(let u of d){let f=s.getClassName(u);e.onMatch(f,u)}e.onComplete()}finally{d.forEach(u=>{s.deleteLocalRef(u)})}}_enumerateClassLoadersJvm(e){this.choose("java.lang.ClassLoader",e)}_enumerateLoadedClassesArt(e){let{vm:t,api:r}=this,o=t.getEnv(),s=r["art::JavaVMExt::AddGlobalRef"],{vm:i}=r;Ee(t,o,c=>{let a=Jn(l=>{let d=s(i,c,l);try{let u=o.getClassName(d);e.onMatch(u,d)}finally{o.deleteGlobalRef(d)}return!0});r["art::ClassLinker::VisitClasses"](r.artClassLinker.address,a)}),e.onComplete()}_enumerateClassLoadersArt(e){let{classFactory:t,vm:r,api:o}=this,s=r.getEnv(),i=o["art::ClassLinker::VisitClassLoaders"];if(i===void 0)throw new Error("This API is only available on Android >= 7.0");let c=t.use("java.lang.ClassLoader"),a=[],l=o["art::JavaVMExt::AddGlobalRef"],{vm:d}=o;Ee(r,s,u=>{let f=$n(p=>(a.push(l(d,u,p)),!0));zn(()=>{i(o.artClassLinker.address,f)})});try{a.forEach(u=>{let f=t.cast(u,c);e.onMatch(f)})}finally{a.forEach(u=>{s.deleteGlobalRef(u)})}e.onComplete()}_enumerateLoadedClassesDalvik(e){let{api:t}=this,r=ptr("0xcbcacccd"),o=172,s=8,c=t.gDvm.add(o).readPointer(),a=c.readS32(),d=c.add(12).readPointer(),u=a*s;for(let f=0;f<u;f+=s){let _=d.add(f).add(4).readPointer();if(_.isNull()||_.equals(r))continue;let g=_.add(24).readPointer().readUtf8String();if(g.startsWith("L")){let b=g.substring(1,g.length-1).replace(/\//g,".");e.onMatch(b)}}e.onComplete()}enumerateMethods(e){let{classFactory:t}=this,r=this.vm.getEnv(),o=t.use("java.lang.ClassLoader");return Be.enumerateMethods(e,this.api,r).map(s=>{let i=s.loader;return s.loader=i!==null?t.wrap(i,o,r):null,s})}scheduleOnMainThread(e){this.performNow(()=>{this._pendingMainOps.push(e);let{_wakeupHandler:t}=this;if(t===null){let{classFactory:r}=this,o=r.use("android.os.Handler"),s=r.use("android.os.Looper");t=o.$new(s.getMainLooper()),this._wakeupHandler=t}this._pollListener===null&&(this._pollListener=Interceptor.attach(Process.getModuleByName("libc.so").getExportByName("epoll_wait"),this._makePollHook()),Interceptor.flush()),t.sendEmptyMessage(1)})}_makePollHook(){let e=Process.id,{_pendingMainOps:t}=this;return function(){if(this.threadId!==e)return;let r;for(;(r=t.shift())!==void 0;)try{r()}catch(o){Script.nextTick(()=>{throw o})}}}perform(e){if(this._checkAvailable(),!this._isAppProcess()||this.classFactory.loader!==null)try{this.vm.perform(e)}catch(t){Script.nextTick(()=>{throw t})}else this._pendingVmOps.push(e),this._pendingVmOps.length===1&&this._performPendingVmOpsWhenReady()}performNow(e){return this._checkAvailable(),this.vm.perform(()=>{let{classFactory:t}=this;if(this._isAppProcess()&&t.loader===null){let o=t.use("android.app.ActivityThread").currentApplication();o!==null&&is(t,o)}return e()})}_performPendingVmOpsWhenReady(){this.vm.perform(()=>{let{classFactory:e}=this,t=e.use("android.app.ActivityThread"),r=t.currentApplication();if(r!==null){is(e,r),this._performPendingVmOps();return}let o=this,s=!1,i="early",c=t.handleBindApplication;c.implementation=function(d){if(d.instrumentationName.value!==null){i="late";let f=e.use("android.app.LoadedApk").makeApplication;f.implementation=function(p,_){return s||(s=!0,as(e,this),o._performPendingVmOps()),f.apply(this,arguments)}}c.apply(this,arguments)};let l=t.getPackageInfo.overloads.map(d=>[d.argumentTypes.length,d]).sort(([d],[u])=>u-d).map(([d,u])=>u)[0];l.implementation=function(...d){let u=l.call(this,...d);return!s&&i==="early"&&(s=!0,as(e,u),o._performPendingVmOps()),u}})}_performPendingVmOps(){let{vm:e,_pendingVmOps:t}=this,r;for(;(r=t.shift())!==void 0;)try{e.perform(r)}catch(o){Script.nextTick(()=>{throw o})}}use(e,t){return this.classFactory.use(e,t)}openClassFile(e){return this.classFactory.openClassFile(e)}choose(e,t){this.classFactory.choose(e,t)}retain(e){return this.classFactory.retain(e)}cast(e,t){return this.classFactory.cast(e,t)}array(e,t){return this.classFactory.array(e,t)}backtrace(e){return Gn(this.vm,e)}isMainThread(){let e=this.classFactory.use("android.os.Looper"),t=e.getMainLooper(),r=e.myLooper();return r===null?!1:t.$isSameObject(r)}registerClass(e){return this.classFactory.registerClass(e)}deoptimizeEverything(){let{vm:e}=this;return Wn(e,e.getEnv())}deoptimizeBootImage(){let{vm:e}=this;return qn(e,e.getEnv())}deoptimizeMethod(e){let{vm:t}=this;return Zn(t,t.getEnv(),e)}_checkAvailable(){if(!this.available)throw new Error("Java API not available")}_isAppProcess(){let e=this._cachedIsAppProcess;if(e===null){if(this.api.flavor==="jvm")return e=!1,this._cachedIsAppProcess=e,e;let t=new NativeFunction(Module.getGlobalExportByName("readlink"),"pointer",["pointer","pointer","pointer"],{exceptions:"propagate"}),r=Memory.allocUtf8String("/proc/self/exe"),o=1024,s=Memory.alloc(o),i=t(r,s,ptr(o)).toInt32();if(i!==-1){let c=s.readUtf8String(i);e=/^\/system\/bin\/app_process/.test(c)}else e=!0;this._cachedIsAppProcess=e}return e}};function is(n,e){let t=n.use("android.os.Process");n.loader=e.getClassLoader(),t.myUid()===t.SYSTEM_UID.value?(n.cacheDir="/data/system",n.codeCacheDir="/data/dalvik-cache"):"getCodeCacheDir"in e?(n.cacheDir=e.getCacheDir().getCanonicalPath(),n.codeCacheDir=e.getCodeCacheDir().getCanonicalPath()):(n.cacheDir=e.getFilesDir().getCanonicalPath(),n.codeCacheDir=e.getCacheDir().getCanonicalPath())}function as(n,e){let t=n.use("java.io.File");n.loader=e.getClassLoader();let r=t.$new(e.getDataDir()).getCanonicalPath();n.cacheDir=r,n.codeCacheDir=r+"/cache"}var yr=new br;Script.bindWeak(yr,()=>{yr._dispose()});var Ce=yr;Ce.perform(function(){let n=Ce.use("com.beantechs.accountservice.BuxAccountManager"),e=Ce.use("com.beantechs.accountservice.UserManager"),t=Ce.use("com.beantechs.accountservice.model.User"),r=Ce.use("com.beantechs.accountservice.NetworkResponseListener"),o=Ce.use("java.util.HashMap"),s=Ce.use("org.json.JSONObject");console.log("Accessing BuxAccountManager and UserManager...");let i=n.mInstance.value,c=e.getInstance();console.log("BuxAccountManager instance:",i),console.log("UserManager instance:",c),console.log("UserManager getAllUser method:",c.getAllUser);let a=c.getAllUser();if(a==null||a.size()===0){console.log("No users found in UserManager.");return}console.log(`Found ${a.size()} users in UserManager.`);let l=Ce.registerClass({name:"com.hook.RefreshCallback"+Date.now(),implements:[r],fields:{bux:"com.beantechs.accountservice.BuxAccountManager",userManager:"com.beantechs.accountservice.UserManager",user:"com.beantechs.accountservice.model.User"},methods:{"<init>":[{returnType:"void",argumentTypes:["com.beantechs.accountservice.BuxAccountManager","com.beantechs.accountservice.UserManager","com.beantechs.accountservice.model.User"],implementation:function(d,u,f){this.bux.value=d,this.userManager.value=u,this.user.value=f}}],onSuccess:[{returnType:"void",argumentTypes:["java.lang.String"],implementation:function(d){console.log("REFRESH OK for user "+this.user.value.getUid()+" \u2192 "+d);let f=s.$new(d).getJSONObject("data"),p=f.getString("accessToken"),_=f.getString("refreshToken");console.log("New access token: "+p),console.log("New refresh token: "+_),this.user.value.setAccessToken(p),this.user.value.setRefreshToken(_),this.user.value.updateTokenTime(),this.userManager.value.saveUser(this.user.value),console.log("User saved with new tokens")}}],onFail:[{returnType:"void",argumentTypes:["int","java.lang.String"],implementation:function(d,u){console.log("REFRESH FAIL for user "+this.user.value.getUid()+" \u2192 "+d+" | "+u)}}]}});for(let d=0;d<a.size();d++)try{let u=Ce.cast(a.get(d),t);if(console.log(`User ${d+1}:`,u),u!=null){let f=u.getEmail();console.log(`User ${d+1} Email:`,f);let p=u.getUid();console.log(`User ${d+1} UID:`,p);let _=u.getAccessToken();console.log(`User ${d+1} AccessToken:`,_);let h=u.getRefreshToken();console.log(`User ${d+1} RefreshToken:`,h);let g=u.getTokenTime();console.log(`User ${d+1} TokenTime:`,g);let b=u.isValid();if(console.log(`User ${d+1} IsValid:`,b),console.log(`User ${d+1}: Email: ${f}, UID: ${p}, AccessToken: ${_}, RefreshToken: ${h}, TokenTime: ${g}, IsValid: ${b}`),!b){console.log(`User ${d+1} is not valid, refreshing token...`);let v=o.$new();v.put("accessToken",u.getAccessToken()),v.put("refreshToken",u.getRefreshToken()),i.mNetwork.value.post(i.ACTION_REFRESH_TOKEN.value,v,l.$new(i,c,u))}}else console.log("User is null")}catch(u){console.log(`Error processing user ${d+1}:`,u)}console.log("Script injected")});})();
