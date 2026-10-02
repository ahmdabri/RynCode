import{c as n,j as e,r as c}from"./index-ryp9ZMvH.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=n("Pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]),b=({isActive:a})=>e.jsxs("span",{className:`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${a?"bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400":"bg-slate-100 text-slate-500 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"}`,children:[e.jsx("span",{className:`h-1.5 w-1.5 rounded-full ${a?"bg-emerald-500 animate-pulse":"bg-slate-400"}`}),a?"Aktif":"Nonaktif"]}),m=c.forwardRef(({label:a,error:t,helperText:r,id:d,className:o="",...s},x)=>{const l=d||s.name;return e.jsxs("div",{className:"w-full",children:[a&&e.jsx("label",{htmlFor:l,className:"block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1",children:a}),e.jsx("textarea",{id:l,ref:x,className:`w-full rounded-lg border px-3 py-2 text-xs transition duration-150 outline-none
            bg-white text-slate-900 border-slate-300 placeholder:text-slate-400
            focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
            dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500
            dark:focus:border-emerald-500 dark:focus:ring-emerald-500
            ${t?"border-rose-500 focus:border-rose-500 focus:ring-rose-500 dark:border-rose-500":""}
            ${o}`,...s}),t?e.jsx("p",{className:"mt-1 text-[11px] text-rose-500",children:t}):r?e.jsx("p",{className:"mt-1 text-[11px] text-slate-500 dark:text-slate-400",children:r}):null]})});m.displayName="Textarea";export{i as P,b as S,m as T};
