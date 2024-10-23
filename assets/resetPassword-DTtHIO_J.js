import{d as U,u as M,r as n,a as j,c as g,b as o,e as s,_ as b,f as y,w as a,g as q,h as A,i as r,o as x,H,j as T,t as w,k as h,p as $,l as E,m as L}from"./index-BTovWneT.js";const Z={class:"position-relative bg-offWhite overflow-hidden"},z={class:"py-16 reset-password-page"},D={class:"card-slide mr-4 pa-6 border border-white"},F={class:"d-flex flex-column align-center"},W={class:"text-blackText text-center mt-2"},G={class:"mt-10"},J={class:"my-4"},K={class:"d-flex align-center justify-space-between w-100"},O={key:0,class:"mt-4 text-error"},Q=U({__name:"resetPassword",setup(X){const{t:c}=M(),u=q(),k=A(),l=n(""),p=n(""),m=n(!1),v=n(!1),d=n(""),P=n(k.query.token),_=j();n(!!localStorage.getItem("token")).value&&u.push("/dashboard");const C=async()=>{var e;if(l.value!==p.value){d.value="Passwords do not match!";return}if(!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(l.value)){d.value="Must be 8 characters or longer, include 1 number, and 1 uppercase letter";return}try{const t=await E.post("/auth/reset-password",{token:P.value,newPassword:l.value});t.status===200&&(alert(c("Password reset successfully!")),u.push("/login")),((e=t.data)==null?void 0:e.status)==="logged_in"&&t.data.access_token&&(localStorage.setItem("token",t.data.access_token),t.data.user.role==="realtor"?(_.setUser(t.data.user),u.push({name:"dashboard"})):(_.setUser(t.data.user),u.push({name:"tenant"})))}catch{d.value="An error occurred. Please try again.."}};return(V,e)=>{const t=r("inline-svg"),f=r("v-text-field"),I=r("v-btn"),N=r("v-form"),R=r("v-col"),S=r("v-row"),B=r("v-container");return x(),g("main",null,[o(H),s("div",Z,[e[7]||(e[7]=s("img",{src:b,class:"shadowTop",alt:""},null,-1)),e[8]||(e[8]=s("img",{src:y,class:"shadowTop",alt:""},null,-1)),e[9]||(e[9]=s("img",{src:b,class:"shadowBottom",alt:""},null,-1)),e[10]||(e[10]=s("img",{src:y,class:"shadowBottom",alt:""},null,-1)),s("div",z,[o(B,null,{default:a(()=>[o(S,null,{default:a(()=>[o(R,{cols:"12",class:"py-4"},{default:a(()=>[o(N,{onSubmit:T(C,["prevent"]),class:"reset-password-form"},{default:a(()=>[s("div",D,[s("div",F,[s("h6",W,w(h(c)("Create a New Password!")),1)]),s("div",G,[e[4]||(e[4]=s("div",{class:"body2 text-gray mb-2"},"New Password",-1)),o(f,{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=i=>l.value=i),type:v.value?"text":"password","hide-details":"auto",placeholder:"Enter your password",class:"text-input mb-2 mb-sm-0 w-sm-auto w-100",variant:"solo",density:"compact",required:"",autocomplete:"current-password"},{"prepend-inner":a(()=>[o(t,{src:"/lock.svg",class:"prepend-inner-icon"})]),"append-inner":a(()=>[o(t,{src:"/eye.svg",class:"append-inner-icon cursor-pointer",onClick:e[0]||(e[0]=i=>v.value=!v.value)})]),_:1},8,["modelValue","type"])]),s("div",J,[e[5]||(e[5]=s("div",{class:"body2 text-gray mb-2"}," Password Confirmation ",-1)),o(f,{modelValue:p.value,"onUpdate:modelValue":e[3]||(e[3]=i=>p.value=i),type:m.value?"text":"password","hide-details":"auto",placeholder:"Re-enter your password",class:"text-input mb-2 mb-sm-0 w-sm-auto w-100",variant:"solo",density:"compact",required:"",autocomplete:"current-password"},{"prepend-inner":a(()=>[o(t,{src:"/lock.svg",class:"prepend-inner-icon"})]),"append-inner":a(()=>[o(t,{src:"/eye.svg",class:"append-inner-icon cursor-pointer",onClick:e[2]||(e[2]=i=>m.value=!m.value)})]),_:1},8,["modelValue","type"]),e[6]||(e[6]=s("div",{class:"body3 text-gray mt-3 d-flex justify-space-between"},[s("span",null," Must be 8 characters or longer, include 1 number, and 1 uppercase letter ")],-1))]),o(I,{class:"main-btn w-100 d-flex align-center mt-8",type:"submit"},{default:a(()=>[s("div",K,[s("span",null,w(h(c)("Confirm")),1),o(t,{src:"/arrowRight.svg",class:"ml-2"})])]),_:1}),d.value?(x(),g("div",O,w(d.value),1)):$("",!0)])]),_:1})]),_:1})]),_:1})]),_:1})])])])}}}),se=L(Q,[["__scopeId","data-v-067ddcb7"]]);export{se as default};