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
import e,{readdir as t,writeFile as a,readFile as r,statSync as i}from"fs-extra";import{resolve as n,basename as s}from"path";import o from"crypto";import c from"strip-json-comments";import l from"jsonminify";import p from"chalk";import h from"chokidar";import d from"inquirer";import u from"figlet";import m from"boxen";import g from"console-clear";var f=class{static normalizeInput(e){if(null==e)throw new Error("required origin");return"object"==typeof e&&(e=JSON.stringify(e)),"string"!=typeof e&&(e=e.toString()),e}static normalizeOutput(e){try{return JSON.parse(e)}catch(t){return e}}};const y=[],b=(e,t)=>void 0!==e&&(t=t||e,y.includes(t)||y.push(t),console.warn("["+b.title+"]",t),!0);b.title="DeprecationWarning";var w=b,j=y;w.once=(...e)=>!y.includes(e[1]||e[0])&&b.apply(void 0,e),w._list=j;const{ALGORITHM:v}={ALGORITHM:["aes-256-cbc","aes-256-cbc-hmac-sha1","aes-256-cbc-hmac-sha256","aes-256-cfb","aes-256-cfb1","aes-256-cfb8","aes-256-ctr","aes-256-ofb","aes256","camellia-256-cbc","camellia-256-cfb","camellia-256-cfb1","camellia-256-cfb8","camellia-256-ofb","camellia256"]};class ${constructor(e,t="aes-256-ctr"){if("string"!=typeof e)throw new Error("required an string key");if(""===e)throw new Error("key cannot be empty");if(!v.includes(t))throw new Error(`algorithm ${t} not supported, use those available: ${v.join(", ")}`);e=this.constructor.hash(e,"md5"),Object.defineProperties(this,{algorithm:{value:t},key:{value:e},iv:{value:e.substr(16)},options:{value:{}}})}encode(e){e=f.normalizeInput(e);const t=o.createCipheriv(this.algorithm,this.key,this.iv,this.options);return t.update(e,"utf8","hex")+t.final("hex")}decode(e){e=f.normalizeInput(e);const t=o.createDecipheriv(this.algorithm,this.key,this.iv,this.options),a=t.update(e,"hex","utf8")+t.final("utf8");return f.normalizeOutput(a)}static getCiphers(){return o.getCiphers()}static getHashes(){return o.getHashes()}static md5(e){return w('md5 is deprecated, use hash method instead. e.g. hash("your string", "md5")'),o.createHash("md5").update(e).digest("hex")}static sha1(e){return w('sha1 is deprecated, use hash method instead. e.g. hash("your string", "sha1")'),o.createHash("sha1").update(e).digest("hex")}static hash(e,t){if($.hasHash(t))return o.createHash(t).update(e).digest("hex");throw new Error("hash "+t+" not found in your platform")}static hasHash(e){return-1!==$.getHashes().indexOf(e)}}var S=$;const{log:k}=console,x=e=>t=>{const a=p`{red ${e}}\n${t}\n`;return k(p`{redBright Error} in ${a}`)},O=async(e,t,r,i)=>{const n=new S("sissel siv"),s=n.encode(i),o=n.encode(e);return await a(`${t}/${o}.js`,`module.exports="${s}";`),global.watch||k(p`encrypted {magenta ${e}} to {green ${o}}`),r.encrypt[o]=`${o}=require("./${o}")`,r},C=async(e,t)=>{await O("specs",e,t,t.specs),await O("grammar",e,t,t.grammar);const{parsing:r}=(e=>{const{parsing:t,cache:a,cache:{standard:r}}=e;for(const i in a){"object"!=typeof t[i]&&(t[i]={});const{filter:n=[],object:s=[]}=a[i];e.parsing[i].objects=[...s].sort(),e.parsing[i].filters="standard"!==i?[...n,...r.filter].sort():r.filter.sort()}return e})(t),{encrypt:i}=await O("parsing",e,t,r),n=`${"const "+Object.values(i).join(",")};module.exports={${Object.keys(i).join(",")}};`;await a(e+"/index.js",n)},N=(e,t)=>async a=>{const i=a?`${e}/${a}`:e,n=s(i).replace(/\.[^/.]+$/,""),o=await r(i),p=c(o.toString()),h=JSON.parse(l(p)),{cache:d}=((e,t,a)=>{t.cache[e]={deprecated:[]};for(const[r,{type:i,deprecated:n}]of Object.entries(a))t.cache[e][i]||(t.cache[e][i]=[]),n?t.cache[e].deprecated.push(r):t.cache[e][i].push(r);return t})(n,t,h);t.specs[n]=h,t.grammar[n]=((e,t={})=>{for(const a in e)e[a].length&&(t[a]=`(${e[a].join("|")})`);return t})(d[n])},P=async(e,a,r)=>{const i=await t(e),n=N(e,r),s=x(e);for(const e of i)await n(e).catch(s);return await C(a,r).catch(s),r};require("./../../package.json");const{log:L}=console,q=require("execa");const E=require("./../../package.json"),{log:I}=console;var H={generate:async t=>{const a=await d.prompt([{type:"list",name:"bundle",message:"Select the type of Grammar",choices:["include","injection"]},{type:"input",name:"filename",message:"Enter the filename"}]),r="include"===a.bundle?a.bundle:"injects",i=`./packages/grammar/${r}/${a.filename}.json`;return await e.writeFile(i,JSON.stringify("include"===r?{$schema:"https://cdn.liquify.dev/schema/include-tmlanguage.json",patterns:[]}:{$schema:"https://cdn.liquify.dev/schema/tmlanguage.json",injectionSelector:"",scopeName:"",patterns:[]},null,2)),a},rollup:async(t={grammar:{},parser:{},syntax:{}})=>{const a=await(async t=>{const{grammar:a}=t,r=await e.readdir("./packages/specs/variations");for(const t of r){const r=await e.readFile("./packages/specs/variations/"+t),i=JSON.parse(c(r.toString())),n=t.replace(/\.[^/.]+$/,"");a[n]={deprecated:[]};for(const[e,{type:t,deprecated:r}]of Object.entries(i))a[n][t]||(a[n][t]=[]),r?a[n].deprecated.push(e):a[n][t].push(e)}return(t=>{const{grammar:a,parser:r}=t,{standard:i}=a;for(const e in a){"object"!=typeof r[e]&&(r[e]={});const{filter:n=[],object:s=[]}=a[e];t.parser[e].objects=[...s].sort(),t.parser[e].filters="standard"!==e?[...n,...i.filter].sort():i.filter.sort()}return(async t=>{const a=await e.readFile("./packages/grammar/liquid.jsonc"),r=JSON.parse(c(a.toString()));return console.log(r),t})(t)})(t)})(t);console.log(a)}};const R=async(e,t)=>{switch(e){case"specs":await(async(e,t={specs:{},cache:{},grammar:{},parsing:{},encrypt:{}})=>{const a=process.cwd(),r=n(a,e.input),i=n(a,e.output),o=x(r);if(e.build)k(p`{bold.cyan Liquid Specifications}\n`),await P(r,i,t).catch(o);else if(e.watch){k(p`{bold.cyan Liquid Specifications}\n`),await P(r,i,t).catch(o);const e=h.watch(r+"/**",{persistent:!0}),a=((e,t)=>async a=>{const r=s(a),i=x(r);k(p`{cyan changed} '{yellow ${r}}'`);const n=N(a,t);await n().catch(i),await C(e,t).catch(i)})(i,t);global.watch=!0,e.on("change",a).on("error",o)}})(t);break;default:await(async()=>{const e=u.textSync("Liquify CLI",{font:"Slant",horizontalLayout:"controlled smushing"}),t=p`{cyan ${e}}\n`,a=m([p`{magentaBright Package}{dim :} ${E.name}                              `,p`{magentaBright Version}{dim :} ${E.version}                           `,p`{magentaBright Private}{dim :} ${E.private||!1} `].join("\n"),{padding:0,borderColor:"gray",dimBorder:!0,borderStyle:{topLeft:" ",topRight:" ",bottomLeft:" ",bottomRight:" ",horizontal:"-",vertical:" "}});g(!0),I(t),I(a);const{run:r}=await d.prompt([{type:"list",name:"run",message:"Select operation:",choices:[p`Bundle    {gray.italic Build and compile bundles}`,p`Package   {gray.italic Packaging execution, eg: npm pack}`,p`Git       {gray.italic Common git related operations for the project}`,p`Publish   {gray.italic Publish to CDN, Netlify, Marketplace etc}`,p`Test      {gray.italic Run various tests}`,p`Config    {gray.italic Project configuration and settings}`]}]);r.toLowerCase().substring(0,r.indexOf(" ")),await(async()=>{const{bundle:e}=await d.prompt([{type:"list",name:"bundle",message:"Select Bundle",choices:[p`Client    {gray.italic Build and compile bundles}`,p`Grammar   {gray.italic Packaging execution, eg: npm pack}`,p`Schema    {gray.italic Common git related operations for the project}`,p`Server    {gray.italic Publish to CDN, Netlify, Marketplace etc}`,p`Specs     {gray.italic Run various tests}`,p`{magenta < Go Back}`]}]);return e.toLowerCase().substring(0,e.indexOf(" ")),(async e=>{const t=q("pnpm",["run","build","--filter","./packages/specs"],{stdio:"inherit"});try{await t}catch(e){L(""+e.shortMessage)}})(),e.toLowerCase().substring(0,e.indexOf(" "))})()})()}},B=({name:e,main:t,version:a,author:r})=>`\n/**\n * @license\n *\n * THIS IS PROPRIETARY CODE\n *\n * Copyright of Vellocet, Inc - All Rights Reserved.\n * Unauthorized copying or modification of this file, via any medium is strictly prohibited.\n * Please refer to the LICENSE.txt and/or ThirdPartyNotices.txt files included in bundle.\n *\n * ${s(t)}\n *\n * Package:  ${e}\n * Version:  ${a}\n * Updated:  ${new Date(i(t).mtimeMs).toISOString().replace(/T/," ").substr(0,19)}\n * Website:  https://www.liquify.dev\n * License:  See LICENSE.txt\n * Notices:  See ThirdPartyNotices.txt\n *\n * Written by ${r}\n *\n */`;export{B as banner,H as grammar,R as run};
