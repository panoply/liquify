/**
 * @license
 *
 * MIT License
 *
 * index.js
 *
 * Copyright © [object Object]
 *
 * Package:  @liquify/rollup-enums
 * Version:  1.0.0
 * Updated:  2022-05-14 12:24:52
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import{createFilter as e}from"@rollup/pluginutils";function n(n){const{enums:u,include:l,exclude:s}=Object.assign({sourcemap:!0,include:[],exclude:[],enums:{}},n),c=e(l,s),t=`(?<=type:\\s{0,})['"]\\b(${Object.keys(u).join("|")})\\b['"](?=[\n,]?)`,o=new RegExp(t,"g");return{name:"enums",transform:(e,n)=>c(n)?{code:e.replace(o,((e,n)=>u[n])),map:null}:null}}export{n as default};
