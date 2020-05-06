/**
 * @license
 *
 * THIS IS PROPRIETARY CODE
 *
 * Copyright of Vellocet, Inc - All Rights Reserved.
 * Unauthorized copying or modification of this file, via any medium is strictly prohibited.
 * Please refer to the LICENSE.txt and/or ThirdPartyNotices.txt files included in bundle.
 *
 * LiquifyCLI.cjs.js
 *
 * Package:  @liquify/cli
 * Version:  0.0.1
 * Updated:  2020-05-06 10:53:34
 * Website:  https://www.liquify.dev
 * License:  See LICENSE.txt
 * Notices:  See ThirdPartyNotices.txt
 *
 * Written by Nikolas Savvidis <nicos@gmx.com>
 *
 */
function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var t=require("fs-extra"),a=e(t),r=require("path"),i=e(require("crypto")),n=e(require("strip-json-comments")),s=e(require("jsonminify")),c=e(require("chalk")),o=e(require("chokidar")),l=e(require("inquirer")),u=e(require("figlet")),p=e(require("boxen")),d=e(require("console-clear")),h=class{static normalizeInput(e){if(null==e)throw new Error("required origin");return"object"==typeof e&&(e=JSON.stringify(e)),"string"!=typeof e&&(e=e.toString()),e}static normalizeOutput(e){try{return JSON.parse(e)}catch(t){return e}}};const g=[],m=(e,t)=>void 0!==e&&(t=t||e,g.includes(t)||g.push(t),console.warn("["+m.title+"]",t),!0);m.title="DeprecationWarning";var f=m,y=g;f.once=(...e)=>!g.includes(e[1]||e[0])&&m.apply(void 0,e),f._list=y;const{ALGORITHM:b}={ALGORITHM:["aes-256-cbc","aes-256-cbc-hmac-sha1","aes-256-cbc-hmac-sha256","aes-256-cfb","aes-256-cfb1","aes-256-cfb8","aes-256-ctr","aes-256-ofb","aes256","camellia-256-cbc","camellia-256-cfb","camellia-256-cfb1","camellia-256-cfb8","camellia-256-ofb","camellia256"]};class w{constructor(e,t="aes-256-ctr"){if("string"!=typeof e)throw new Error("required an string key");if(""===e)throw new Error("key cannot be empty");if(!b.includes(t))throw new Error(`algorithm ${t} not supported, use those available: ${b.join(", ")}`);e=this.constructor.hash(e,"md5"),Object.defineProperties(this,{algorithm:{value:t},key:{value:e},iv:{value:e.substr(16)},options:{value:{}}})}encode(e){e=h.normalizeInput(e);const t=i.createCipheriv(this.algorithm,this.key,this.iv,this.options);return t.update(e,"utf8","hex")+t.final("hex")}decode(e){e=h.normalizeInput(e);const t=i.createDecipheriv(this.algorithm,this.key,this.iv,this.options),a=t.update(e,"hex","utf8")+t.final("utf8");return h.normalizeOutput(a)}static getCiphers(){return i.getCiphers()}static getHashes(){return i.getHashes()}static md5(e){return f('md5 is deprecated, use hash method instead. e.g. hash("your string", "md5")'),i.createHash("md5").update(e).digest("hex")}static sha1(e){return f('sha1 is deprecated, use hash method instead. e.g. hash("your string", "sha1")'),i.createHash("sha1").update(e).digest("hex")}static hash(e,t){if(w.hasHash(t))return i.createHash(t).update(e).digest("hex");throw new Error("hash "+t+" not found in your platform")}static hasHash(e){return-1!==w.getHashes().indexOf(e)}}var v=w;const{log:j}=console,$=e=>t=>{const a=c`{red ${e}}\n${t}\n`;return j(c`{redBright Error} in ${a}`)},S=async(e,a,r,i)=>{const n=new v("sissel siv"),s=n.encode(i),o=n.encode(e);return await t.writeFile(`${a}/${o}.js`,`module.exports="${s}";`),global.watch||j(c`encrypted {magenta ${e}} to {green ${o}}`),r.encrypt[o]=`${o}=require("./${o}")`,r},x=async(e,a)=>{await S("specs",e,a,a.specs),await S("grammar",e,a,a.grammar);const{parsing:r}=(e=>{const{parsing:t,cache:a,cache:{standard:r}}=e;for(const i in a){"object"!=typeof t[i]&&(t[i]={});const{filter:n=[],object:s=[]}=a[i];e.parsing[i].objects=[...s].sort(),e.parsing[i].filters="standard"!==i?[...n,...r.filter].sort():r.filter.sort()}return e})(a),{encrypt:i}=await S("parsing",e,a,r),n=`${"const "+Object.values(i).join(",")};module.exports={${Object.keys(i).join(",")}};`;await t.writeFile(e+"/index.js",n)},k=(e,a)=>async i=>{const c=i?`${e}/${i}`:e,o=r.basename(c).replace(/\.[^/.]+$/,""),l=await t.readFile(c),u=n(l.toString()),p=JSON.parse(s(u)),{cache:d}=((e,t,a)=>{t.cache[e]={deprecated:[]};for(const[r,{type:i,deprecated:n}]of Object.entries(a))t.cache[e][i]||(t.cache[e][i]=[]),n?t.cache[e].deprecated.push(r):t.cache[e][i].push(r);return t})(o,a,p);a.specs[o]=p,a.grammar[o]=((e,t={})=>{for(const a in e)e[a].length&&(t[a]=`(${e[a].join("|")})`);return t})(d[o])},q=async(e,a,r)=>{const i=await t.readdir(e),n=k(e,r),s=$(e);for(const e of i)await n(e).catch(s);return await x(a,r).catch(s),r};require("../../package.json");const{log:O}=console,C=require("execa");const P=require("../../package.json"),{log:N}=console;var L={generate:async e=>{const t=await l.prompt([{type:"list",name:"bundle",message:"Select the type of Grammar",choices:["include","injection"]},{type:"input",name:"filename",message:"Enter the filename"}]),r="include"===t.bundle?t.bundle:"injects",i=`./packages/grammar/${r}/${t.filename}.json`;return await a.writeFile(i,JSON.stringify("include"===r?{$schema:"https://cdn.liquify.dev/schema/include-tmlanguage.json",patterns:[]}:{$schema:"https://cdn.liquify.dev/schema/tmlanguage.json",injectionSelector:"",scopeName:"",patterns:[]},null,2)),t},rollup:async(e={grammar:{},parser:{},syntax:{}})=>{const t=await(async e=>{const{grammar:t}=e,r=await a.readdir("./packages/specs/variations");for(const e of r){const r=await a.readFile("./packages/specs/variations/"+e),i=JSON.parse(n(r.toString())),s=e.replace(/\.[^/.]+$/,"");t[s]={deprecated:[]};for(const[e,{type:a,deprecated:r}]of Object.entries(i))t[s][a]||(t[s][a]=[]),r?t[s].deprecated.push(e):t[s][a].push(e)}return(e=>{const{grammar:t,parser:r}=e,{standard:i}=t;for(const a in t){"object"!=typeof r[a]&&(r[a]={});const{filter:n=[],object:s=[]}=t[a];e.parser[a].objects=[...s].sort(),e.parser[a].filters="standard"!==a?[...n,...i.filter].sort():i.filter.sort()}return(async e=>{const t=await a.readFile("./packages/grammar/liquid.jsonc"),r=JSON.parse(n(t.toString()));return console.log(r),e})(e)})(e)})(e);console.log(t)}};exports.banner=({name:e,main:a,version:i,author:n})=>`\n/**\n * @license\n *\n * THIS IS PROPRIETARY CODE\n *\n * Copyright of Vellocet, Inc - All Rights Reserved.\n * Unauthorized copying or modification of this file, via any medium is strictly prohibited.\n * Please refer to the LICENSE.txt and/or ThirdPartyNotices.txt files included in bundle.\n *\n * ${r.basename(a)}\n *\n * Package:  ${e}\n * Version:  ${i}\n * Updated:  ${new Date(t.statSync(a).mtimeMs).toISOString().replace(/T/," ").substr(0,19)}\n * Website:  https://www.liquify.dev\n * License:  See LICENSE.txt\n * Notices:  See ThirdPartyNotices.txt\n *\n * Written by ${n}\n *\n */`,exports.grammar=L,exports.run=async(e,t)=>{switch(e){case"specs":await(async(e,t={specs:{},cache:{},grammar:{},parsing:{},encrypt:{}})=>{const a=process.cwd(),i=r.resolve(a,e.input),n=r.resolve(a,e.output),s=$(i);if(e.build)j(c`{bold.cyan Liquid Specifications}\n`),await q(i,n,t).catch(s);else if(e.watch){j(c`{bold.cyan Liquid Specifications}\n`),await q(i,n,t).catch(s);const e=o.watch(i+"/**",{persistent:!0}),a=((e,t)=>async a=>{const i=r.basename(a),n=$(i);j(c`{cyan changed} '{yellow ${i}}'`);const s=k(a,t);await s().catch(n),await x(e,t).catch(n)})(n,t);global.watch=!0,e.on("change",a).on("error",s)}})(t);break;default:await(async()=>{const e=u.textSync("Liquify CLI",{font:"Slant",horizontalLayout:"controlled smushing"}),t=c`{cyan ${e}}\n`,a=p([c`{magentaBright Package}{dim :} ${P.name}                              `,c`{magentaBright Version}{dim :} ${P.version}                           `,c`{magentaBright Private}{dim :} ${P.private||!1} `].join("\n"),{padding:0,borderColor:"gray",dimBorder:!0,borderStyle:{topLeft:" ",topRight:" ",bottomLeft:" ",bottomRight:" ",horizontal:"-",vertical:" "}});d(!0),N(t),N(a);const{run:r}=await l.prompt([{type:"list",name:"run",message:"Select operation:",choices:[c`Bundle    {gray.italic Build and compile bundles}`,c`Package   {gray.italic Packaging execution, eg: npm pack}`,c`Git       {gray.italic Common git related operations for the project}`,c`Publish   {gray.italic Publish to CDN, Netlify, Marketplace etc}`,c`Test      {gray.italic Run various tests}`,c`Config    {gray.italic Project configuration and settings}`]}]);r.toLowerCase().substring(0,r.indexOf(" ")),await(async()=>{const{bundle:e}=await l.prompt([{type:"list",name:"bundle",message:"Select Bundle",choices:[c`Client    {gray.italic Build and compile bundles}`,c`Grammar   {gray.italic Packaging execution, eg: npm pack}`,c`Schema    {gray.italic Common git related operations for the project}`,c`Server    {gray.italic Publish to CDN, Netlify, Marketplace etc}`,c`Specs     {gray.italic Run various tests}`,c`{magenta < Go Back}`]}]);return e.toLowerCase().substring(0,e.indexOf(" ")),(async e=>{const t=C("pnpm",["run","build","--filter","./packages/specs"],{stdio:"inherit"});try{await t}catch(e){O(""+e.shortMessage)}})(),e.toLowerCase().substring(0,e.indexOf(" "))})()})()}};
