import{d as C,u as D,r as i,c as R,a as t,b as e,w as n,e as q,f as F,g as o,o as H,H as T,h as U,t as v,i as h,p as j,j as L,_ as f,k as b,l as A,m as E}from"./index-C72SU0hx.js";const s=c=>(j("data-v-16593c55"),c=c(),L(),c),J={class:"position-relative bg-offWhite overflow-hidden"},M=s(()=>e("img",{src:f,class:"shadowTop",alt:""},null,-1)),O=s(()=>e("img",{src:b,class:"shadowTop",alt:""},null,-1)),W=s(()=>e("img",{src:f,class:"shadowBottom",alt:""},null,-1)),z=s(()=>e("img",{src:b,class:"shadowBottom",alt:""},null,-1)),G={class:"py-16 profile-page"},K={class:"card-slide mr-4 pa-6 border border-white"},P={class:"d-flex flex-column align-center"},Q={class:"text-blackText text-center mt-2"},X={class:"mt-10"},Y=s(()=>e("div",{class:"body2 text-gray mb-2"},"First Name",-1)),Z={class:"my-4"},$=s(()=>e("div",{class:"body2 text-gray mb-2"},"Last Name",-1)),ee={class:"my-4"},te=s(()=>e("div",{class:"body2 text-gray mb-2"}," Brokerage Name (Optional) ",-1)),oe={class:"d-flex align-center justify-space-between w-100"},se=C({__name:"profile",setup(c){const{t:_}=D(),g=q(),w=F(),d=i(""),r=i(""),m=i(""),x=i(w.query.token),y=async()=>{try{await A.post("auth/complete-signup",{token:x.value,firstName:d.value,lastName:r.value,brokerageName:m.value}),g.push("/signin")}catch(p){console.error("Failed to complete signup",p)}};return(p,a)=>{const u=o("v-text-field"),k=o("inline-svg"),N=o("v-btn"),V=o("v-form"),B=o("v-col"),I=o("v-row"),S=o("v-container");return H(),R("main",null,[t(T),e("div",J,[M,O,W,z,e("div",G,[t(S,null,{default:n(()=>[t(I,null,{default:n(()=>[t(B,{cols:"12",class:"py-4"},{default:n(()=>[t(V,{onSubmit:U(y,["prevent"]),class:"profile-form"},{default:n(()=>[e("div",K,[e("div",P,[e("h6",Q,v(h(_)("Let's get to know each other")),1)]),e("div",X,[Y,t(u,{modelValue:d.value,"onUpdate:modelValue":a[0]||(a[0]=l=>d.value=l),type:"text","hide-details":"auto",placeholder:"John",class:"text-input mb-2 mb-sm-0 w-sm-auto w-100",variant:"solo",density:"compact",required:"",autocomplete:"text"},null,8,["modelValue"])]),e("div",Z,[$,t(u,{modelValue:r.value,"onUpdate:modelValue":a[1]||(a[1]=l=>r.value=l),type:"text","hide-details":"auto",placeholder:"Doe",class:"text-input mb-2 mb-sm-0 w-sm-auto w-100",variant:"solo",density:"compact",required:"",autocomplete:"text"},null,8,["modelValue"])]),e("div",ee,[te,t(u,{modelValue:m.value,"onUpdate:modelValue":a[2]||(a[2]=l=>m.value=l),type:"text","hide-details":"auto",placeholder:"DABC Realtyoe",class:"text-input mb-2 mb-sm-0 w-sm-auto w-100",variant:"solo",density:"compact"},null,8,["modelValue"])]),t(N,{class:"main-btn w-100 d-flex align-center mt-8",type:"submit"},{default:n(()=>[e("div",oe,[e("span",null,v(h(_)("Done")),1),t(k,{src:"/arrowRight.svg",class:"ml-2"})])]),_:1})])]),_:1})]),_:1})]),_:1})]),_:1})])])])}}}),le=E(se,[["__scopeId","data-v-16593c55"]]);export{le as default};