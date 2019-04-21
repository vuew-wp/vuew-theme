webpackJsonp([0],{"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Form/Form.vue":function(e,s,a){"use strict";var t=a("./node_modules/lodash/lodash.js"),o=a.n(t),r=a("./src/common/http_proxy.js"),l=a("./src/Form/FormField.vue"),i=a("./src/Form/FormFieldPassword.vue"),n=a("./src/Form/FormFieldTextArea.vue");s.a={components:{FormField:l.a,FormFieldTextArea:n.a,FormFieldPassword:i.a},mounted:function(){for(var e=o.a.filter(this.formData.properties,"required"),s=0,a=e.length;s<a;s++)this.requiredFields[e[s].id]={valid:!1}},methods:{handleSubmit:function(){this.submit(this.userData)},handleChange:function(e){this.userData[e.id]=e.value,console.log(this.requiredFields),Object.prototype.hasOwnProperty.call(this.requiredFields,e.id)&&(this.requiredFields[e.id].valid=e.valid,this.isDisabled=o.a.findKey(this.requiredFields,["valid",!1]))},submit:function(e){var s=this;this.status="Submitting info...",e.nonce=this.$store.getters["user/getNonce"]("userAuth"),r.b.post(this.endPoint,e,{headers:{"X-WP-Nonce":this.$store.getters["user/getNonce"]("wpRest")}}).then(function(e){s.status=e.data.message.text,s.$store.dispatch("user/updateUserId",e.data.message.userId),s.$store.dispatch("user/updateNonce",{name:"wpRest",nonce:e.data.message.wpRest}),s.$store.dispatch("user/updateNonce",{name:"userAuth",nonce:e.data.message.userAuth})}).catch(function(e){s.handleError(e.response.data)})},handleError:function(e){console.log(e),this.status=e.message}},data:function(){return{status:"",userData:{},formData:{},isDisabled:!0,requiredFields:{}}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Form/FormField.vue":function(e,s,a){"use strict";var t=a("./src/Form/form-field-types.json"),o=a.n(t);s.a={props:["field"],data:function(){return{json:{},valid:!1,touched:!1}},mounted:function(){this.json=Object.assign({},o.a[this.field.type],this.field)},computed:{inputStateChangeClass:function(){var e=this;return this.field.required&&e.touched?e.valid?"uk-form-success":"uk-form-danger":""}},methods:{validate:function(e,s){var a=this,t=a.json.validate_callback;this.$emit("input",{value:e,id:s.id,valid:a[t](e)})},validText:function(e){return this.valid=""!==e,this.valid},validEmail:function(e){return this.valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),this.valid},validTextarea:function(e){return this.valid=""!==e,this.valid}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Form/FormFieldPassword.vue":function(e,s,a){"use strict";var t=a("./src/Form/FormField.vue");s.a={extends:t.a,data:function(){return{passwordRegex:{hasSpace:/\s/,hasDigit:/(?=.*[0-9])/,hasLowerCaseChar:/(?=.*[a-z])/,hasUpperCaseChar:/(?=.*[A-Z])/,hasSpecialChar:/(?=.*[|!@#$&*?^~])/,hasRepetition:/([a-zA-Z0-9|!@#$&*?^~]).*?\1/},strength:0,password:"",passwordMatch:""}},methods:{matchField:function(e){return this.passwordMatch=e,this.isValid(),this.password===this.passwordMatch},isValid:function(){this.valid=this.password.length>=8&&this.password===this.passwordMatch&&this.strength>=7},validPassword:function(e){var s=e.length;if("login"===this.json.formType)return this.valid=s>=8,this.valid;var a=0,t=0,o=0;for(var r in this.passwordRegex)this.passwordRegex.hasOwnProperty(r)&&"hasRepetition"!==r&&"hasSpace"!==r&&this.passwordRegex[r].test(e)&&++a;return s>4&&(t=s<=8?s/2:4),o=a+t,s>=1&&s<9&&this.passwordRegex.hasRepetition.test(e)&&--o,this.password=e,this.strength=o,this.isValid(),this.strength>=7}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Form/FormFieldTextArea.vue":function(e,s,a){"use strict";var t=a("./src/Form/form-field-types.json"),o=(a.n(t),a("./src/Form/FormField.vue"));s.a={mixins:[o.a],name:"FormFieldTextArea",methods:{validate:function(e,s){var a=this,t=a.json.validate_callback;this.$emit("input",{value:e,id:s.id,valid:a[t](e)})},validTextArea:function(e){return this.valid=""!==e,this.valid}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/Menu/MenuTree.vue":function(e,s,a){"use strict";var t=a("./src/Partials/Menu/MenuTreeItem.vue");s.a={props:["menu"],components:{MenuTreeItem:t.a},computed:{isPending:function(){return this.$store.getters["query/isPending"]}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/OffCanvas/OffCanvas.vue":function(e,s,a){"use strict";s.a={props:{target:""},mounted:function(){this.$store.dispatch("layout/addOffCanvas",{target:this.target,open:!1},{root:!0})},watch:{isVisible:function(e){var s=document.body,a="vw-off-canvas-open-"+this.target;if(e)return void(s.classList.contains(a)||s.classList.add(a));s.classList.contains(a)&&s.classList.remove(a)}},computed:{isVisible:function(){return this.$store.getters["layout/offCanvasState"](this.target)}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/OffCanvas/OffCanvasMenu.vue":function(e,s,a){"use strict";var t=a("./src/Partials/Menu/MenuTree.vue"),o=a("./src/Partials/OffCanvas/OffCanvas.vue");s.a={components:{OffCanvas:o.a,MenuTree:t.a},data:function(){return{menu:Vuew.config.navigation.menus.off_canvas}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/User/UserLogin.vue":function(e,s,a){"use strict";var t=a("./src/Form/Form.vue"),o=a("./src/Form/user-login.json"),r=a.n(o);s.a={mixins:[t.a],data:function(){return{endPoint:"user/login",formData:r.a}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/User/UserLogout.vue":function(e,s,a){"use strict";var t=a("./src/common/http_proxy.js");s.a={name:"UserLogout",data:function(){return{status:""}},methods:{logUserOut:function(e){var s=this;this.status="Submitting info...",e.nonce=this.$store.getters["user/getNonce"]("userAuth"),t.b.post("user/logout",e,{headers:{"X-WP-Nonce":this.$store.getters["user/getNonce"]("wpRest")}}).then(function(e){s.status=e.data.message.text,s.$store.dispatch("user/updateUserId",e.data.message.userId),s.$store.dispatch("user/updateNonce",{name:"wpRest",nonce:e.data.message.wpRest}),s.$store.dispatch("user/updateNonce",{name:"userAuth",nonce:e.data.message.userAuth})}).catch(function(e){s.handleError(e.response.data)})},handleError:function(e){console.log(e),this.status=e.message}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/User/UserOffCanvas.vue":function(e,s,a){"use strict";var t=a("./src/User/UserRegistration.vue"),o=a("./src/Partials/OffCanvas/OffCanvas.vue"),r=a("./src/User/UserLogin.vue"),l=a("./src/User/UserLogout.vue");s.a={components:{UserLogout:l.a,UserLogin:r.a,OffCanvas:o.a,UserRegistration:t.a},computed:{isUserLoggedIn:function(){return this.$store.getters["user/getId"]>-1}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/User/UserRegistration.vue":function(e,s,a){"use strict";var t=a("./src/Form/Form.vue"),o=a("./src/Form/user-registration.json"),r=a.n(o);s.a={extends:t.a,data:function(){return{endPoint:"user/register",formData:r.a}}}},'./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-62e15ca1","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Form/FormFieldPassword.vue':function(e,s,a){s=e.exports=a("./node_modules/css-loader/lib/css-base.js")(!1),s.push([e.i,".vw-password-strength-indicator,.vw-password-strength-indicator>*{height:4px}.vw-password-strength-indicator .uk-float-left{width:25%}.vw-password-strength-indicator>div{background-color:#f8f8f8}",""])},'./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-66a27b03","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/OffCanvas/OffCanvas.vue':function(e,s,a){s=e.exports=a("./node_modules/css-loader/lib/css-base.js")(!1),s.push([e.i,".vw-off-canvas-bar{position:fixed;top:0;padding-top:100px;bottom:0;width:90%;z-index:1;background-color:#f1f1f1;overflow-x:hidden;transition:transform .4s}.vw-off-canvas-overlay{height:0;opacity:0;transition:opacity .6s,height 0s;background-color:#111}.vw-off-canvas-bar-userOffCanvas{right:-90%}.vw-off-canvas-bar-offCanvasMenu{left:-90%}.vw-off-canvas-open-offCanvasMenu .vw-off-canvas-bar-offCanvasMenu{transform:translateX(100%)}.vw-off-canvas-open-offCanvasMenu .vw-site-container{transform:translateX(90%);opacity:.6}.vw-off-canvas-open-userOffCanvas .vw-off-canvas-bar-userOffCanvas{transform:translateX(-100%)}.vw-off-canvas-open-userOffCanvas .vw-site-container{transform:translateX(-90%);opacity:.6}.vw-off-canvas-open-offCanvasMenu .vw-off-canvas-overlay,.vw-off-canvas-open-userOffCanvas .vw-off-canvas-overlay{transition:height 0s,opacity .6s;height:100%;opacity:.6}.vw-off-canvas-open-offCanvasMenu .vw-site-container,.vw-off-canvas-open-userOffCanvas .vw-site-container{opacity:.6}main{overflow:hidden}.vw-site-container{transform:translateX(0);transition:transform .4s;display:block!important}@media (min-width:960px){.vw-off-canvas-bar-userOffCanvas{width:50%;right:-50%}.vw-off-canvas-bar-offCanvasMenu{width:50%;left:-50%}.vw-off-canvas-open-offCanvasMenu .vw-site-container{transform:translateX(50%)}.vw-off-canvas-open-userOffCanvas .vw-site-container{transform:translateX(-50%)}}",""])},'./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-68361a40","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/Menu/MenuTree.vue':function(e,s,a){s=e.exports=a("./node_modules/css-loader/lib/css-base.js")(!1),s.push([e.i,"",""])},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-23dce346","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Form/FormFieldTextArea.vue':function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"uk-margin-bottom",class:e.inputStateChangeClass},[e.field.label?a("label",{staticClass:"uk-form-label"},[a("span",{domProps:{textContent:e._s(e.field.label)}}),e._v(" "),a("textarea",{staticClass:"uk-input",attrs:{type:e.field.type,placeholder:e.field.placeholder,name:e.field.id},on:{input:function(s){e.validate(s.target.value,e.field)},focus:function(s){e.touched=!0}}})]):e._e(),e._v(" "),e.field.desc?a("span",{staticClass:"uk-text-small",domProps:{innerHTML:e._s(e.field.desc)}}):e._e()])},o=[],r={render:t,staticRenderFns:o};s.a=r},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-267f84cc","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Form/FormField.vue':function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"uk-margin-bottom",class:e.inputStateChangeClass},[e.field.label?a("label",{staticClass:"uk-form-label"},[a("span",{domProps:{textContent:e._s(e.field.label)}}),e._v(" "),a("input",{staticClass:"uk-input",attrs:{type:e.field.type,placeholder:e.field.placeholder,name:e.field.id},on:{input:function(s){e.validate(s.target.value,e.field)},focus:function(s){e.touched=!0}}})]):e._e(),e._v(" "),e.field.desc?a("span",{staticClass:"uk-text-small",domProps:{innerHTML:e._s(e.field.desc)}}):e._e()])},o=[],r={render:t,staticRenderFns:o};s.a=r},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-2a5ec076","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Form/Form.vue':function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"uk-padding-large"},[a("h3",{staticClass:"uk-h3",domProps:{innerHTML:e._s(e.formData.title)}}),e._v(" "),a("p",{domProps:{innerHTML:e._s(e.status)}}),e._v(" "),a("form",{staticClass:"uk-grid uk-form-stacked",attrs:{novalidate:"novalidate"},on:{submit:function(s){return s.preventDefault(),e.handleSubmit(s)}}},[e._l(e.formData.properties,function(s){return a("div",{key:s.id,staticClass:"uk-width-1-1"},["text"===s.type||"email"===s.type?a("form-field",{attrs:{field:s},on:{input:e.handleChange}}):"textarea"===s.type?a("form-field-text-area",{attrs:{field:s},on:{input:e.handleChange}}):"password"===s.type?a("form-field-password",{attrs:{field:s},on:{input:e.handleChange}}):e._e()],1)}),e._v(" "),a("div",{staticClass:"uk-width-1-1"},[a("input",{staticClass:"uk-button uk-button-default",attrs:{type:"submit",value:"Submit",disabled:e.isDisabled}})])],2)])},o=[],r={render:t,staticRenderFns:o};s.a=r},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-577b50af","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/OffCanvas/OffCanvasMenu.vue':function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("off-canvas",{attrs:{target:"offCanvasMenu"}},[a("menu-tree",{attrs:{menu:e.menu}})],1)},o=[],r={render:t,staticRenderFns:o};s.a=r},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-62e15ca1","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Form/FormFieldPassword.vue':function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"uk-margin-bottom",class:e.inputStateChangeClass},[e.field.label?a("label",{attrs:{for:"vw-form-field-"+e.field.id},domProps:{innerHTML:e._s(e.field.label)}}):e._e(),e._v(" "),a("input",{staticClass:"uk-input",attrs:{type:e.field.type,placeholder:e.field.placeholder,name:e.field.id,id:"vw-form-field-"+e.field.id},on:{input:function(s){e.validate(s.target.value,e.field)},focus:function(s){e.touched=!0}}}),e._v(" "),e.field.confirmInput?a("div",[a("label",{attrs:{for:"vw-form-field-"+e.field.id+"-confirm"}},[e._v("Confirm Password")]),e._v(" "),a("input",{staticClass:"uk-input",attrs:{id:"vw-form-field-"+e.field.id+"-confirm",type:"password",placeholder:"Confirm password"},on:{input:function(s){e.matchField(s.target.value,e.field)}}})]):e._e(),e._v(" "),e.field.strengthIndicator?a("div",[a("p",{domProps:{innerHTML:e._s(e.strength/8*100+"%")}}),e._v(" "),a("div",{staticClass:"uk-width-1-1 uk-position-relative vw-password-strength-indicator"},[a("div",{staticClass:"uk-position-top-right",style:{width:100-e.strength/8*100+"%"}}),e._v(" "),a("div",{staticClass:"uk-float-left",staticStyle:{"background-color":"red"}}),e._v(" "),a("div",{staticClass:"uk-float-left",staticStyle:{"background-color":"orange"}}),e._v(" "),a("div",{staticClass:"uk-float-left",staticStyle:{"background-color":"yellow"}}),e._v(" "),a("div",{staticClass:"uk-float-left",staticStyle:{"background-color":"green"}})])]):e._e(),e._v(" "),e.field.desc?a("p",{staticClass:"uk-text-small",domProps:{innerHTML:e._s(e.field.desc)}}):e._e()])},o=[],r={render:t,staticRenderFns:o};s.a=r},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-66a27b03","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/OffCanvas/OffCanvas.vue':function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement;return(e._self._c||s)("div",{staticClass:"vw-off-canvas-bar uk-box-shadow-small",class:"vw-off-canvas-bar-"+e.target,attrs:{"is-visible":e.isVisible}},[e._t("default")],2)},o=[],r={render:t,staticRenderFns:o};s.a=r},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-68361a40","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/Menu/MenuTree.vue':function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("nav",[a("div",{class:{"vw-navbar-disabled":e.isPending}},[a("ul",{staticClass:"tree"},e._l(e.menu,function(s){return a("menu-tree-item",{key:e.menu.path,attrs:{menu:s}})}),1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isPending,expression:"isPending"}],staticClass:"uk-position-cover",staticStyle:{"background-color":"rgba(255,255,255,0.4)"}},[e._v("\n        Loading...\n    ")])])},o=[],r={render:t,staticRenderFns:o};s.a=r},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-e3c9ecac","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/User/UserLogout.vue':function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"uk-padding-large"},[a("h3",{staticClass:"uk-h3",domProps:{innerHTML:e._s("Logout")}}),e._v(" "),a("p",{domProps:{innerHTML:e._s(e.status)}}),e._v(" "),a("button",{on:{click:e.logUserOut}},[e._v("Logout")])])},o=[],r={render:t,staticRenderFns:o};s.a=r},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-f0cddefe","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/User/UserOffCanvas.vue':function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("off-canvas",{attrs:{target:"userOffCanvas"}},[e.isUserLoggedIn?e._e():a("user-registration"),e._v(" "),a(e.isUserLoggedIn?"user-logout":"user-login")],1)},o=[],r={render:t,staticRenderFns:o};s.a=r},'./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-62e15ca1","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Form/FormFieldPassword.vue':function(e,s,a){var t=a('./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-62e15ca1","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Form/FormFieldPassword.vue');"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a("./node_modules/vue-style-loader/lib/addStylesClient.js")("7bd771b2",t,!0,{})},'./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-66a27b03","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/OffCanvas/OffCanvas.vue':function(e,s,a){var t=a('./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-66a27b03","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/OffCanvas/OffCanvas.vue');"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a("./node_modules/vue-style-loader/lib/addStylesClient.js")("3e0d4aaf",t,!0,{})},'./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-68361a40","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/Menu/MenuTree.vue':function(e,s,a){var t=a('./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-68361a40","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/Menu/MenuTree.vue');"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a("./node_modules/vue-style-loader/lib/addStylesClient.js")("2f4b2a27",t,!0,{})},"./src/Form/Form.vue":function(e,s,a){"use strict";var t=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Form/Form.vue"),o=a('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-2a5ec076","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Form/Form.vue'),r=a("./node_modules/vue-loader/lib/component-normalizer.js"),l=r(t.a,o.a,!1,null,null,null);s.a=l.exports},"./src/Form/FormField.vue":function(e,s,a){"use strict";var t=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Form/FormField.vue"),o=a('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-267f84cc","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Form/FormField.vue'),r=a("./node_modules/vue-loader/lib/component-normalizer.js"),l=r(t.a,o.a,!1,null,null,null);s.a=l.exports},"./src/Form/FormFieldPassword.vue":function(e,s,a){"use strict";function t(e){a('./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-62e15ca1","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Form/FormFieldPassword.vue')}var o=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Form/FormFieldPassword.vue"),r=a('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-62e15ca1","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Form/FormFieldPassword.vue'),l=a("./node_modules/vue-loader/lib/component-normalizer.js"),i=t,n=l(o.a,r.a,!1,i,null,null);s.a=n.exports},"./src/Form/FormFieldTextArea.vue":function(e,s,a){"use strict";var t=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Form/FormFieldTextArea.vue"),o=a('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-23dce346","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Form/FormFieldTextArea.vue'),r=a("./node_modules/vue-loader/lib/component-normalizer.js"),l=r(t.a,o.a,!1,null,null,null);s.a=l.exports},"./src/Form/form-field-types.json":function(e,s){e.exports={password:{default:"",minChars:8,validate_callback:"validPassword",error_message:"Password is not valid",confirmInput:!1,strengthIndicator:!1,formType:"login"},text:{default:"",validate_callback:"validText",error_message:"Text is not valid"},number:{default:"",validate_callback:"validNumber",error_message:"Number is not valid"},email:{default:"",validate_callback:"validEmail",error_message:"Email is not valid"},checkbox:{default:"",validate_callback:"validCheckbox",error_message:"Checkbox is not valid"},select:{default:"",validate_callback:"validSelect",error_message:"Select is not valid"},textarea:{default:"",validate_callback:"validTextArea",error_message:"Textarea is not valid"}}},"./src/Form/user-login.json":function(e,s){e.exports={$schema:"",title:"Login:",properties:[{label:"Username or email:",id:"login-username",type:"text",required:!0,placeholder:"Username or email?"},{label:"Password:",id:"login-password",type:"password",placeholder:"Your password?",confirmInput:!1,formType:"login"}]}},"./src/Form/user-registration.json":function(e,s){e.exports={$schema:"",title:"Register:",properties:[{label:"Username:",id:"register-username",required:!0,type:"text",desc:"Select a unique username.",placeholder:"Username?"},{label:"First name?",id:"register-firstname",required:!0,type:"text",placeholder:"First name?"},{label:"Last name?",id:"register-lastname",type:"text",placeholder:"Last name?"},{label:"Email?",id:"register-email",required:!0,type:"email",placeholder:"Email?"},{label:"Password:",id:"register-password",required:!0,type:"password",placeholder:"Password?",desc:"Password must be 8 characters or more and contain a uppercase, lowercase, special character (|!@#$&*?^~) and number.",confirmInput:!0,strengthIndicator:!0,formType:"register"}]}},"./src/Partials/Menu/MenuTree.vue":function(e,s,a){"use strict";function t(e){a('./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-68361a40","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/Menu/MenuTree.vue')}var o=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/Menu/MenuTree.vue"),r=a('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-68361a40","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/Menu/MenuTree.vue'),l=a("./node_modules/vue-loader/lib/component-normalizer.js"),i=t,n=l(o.a,r.a,!1,i,null,null);s.a=n.exports},"./src/Partials/OffCanvas/OffCanvas.vue":function(e,s,a){"use strict";function t(e){a('./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-66a27b03","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/OffCanvas/OffCanvas.vue')}var o=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/OffCanvas/OffCanvas.vue"),r=a('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-66a27b03","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/OffCanvas/OffCanvas.vue'),l=a("./node_modules/vue-loader/lib/component-normalizer.js"),i=t,n=l(o.a,r.a,!1,i,null,null);s.a=n.exports},"./src/Partials/OffCanvas/OffCanvasMenu.vue":function(e,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/OffCanvas/OffCanvasMenu.vue"),o=a('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-577b50af","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/OffCanvas/OffCanvasMenu.vue'),r=a("./node_modules/vue-loader/lib/component-normalizer.js"),l=r(t.a,o.a,!1,null,null,null);s.default=l.exports},"./src/User/UserLogin.vue":function(e,s,a){"use strict";var t=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/User/UserLogin.vue"),o=a("./node_modules/vue-loader/lib/component-normalizer.js"),r=o(t.a,null,!1,null,null,null);s.a=r.exports},"./src/User/UserLogout.vue":function(e,s,a){"use strict";var t=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/User/UserLogout.vue"),o=a('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-e3c9ecac","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/User/UserLogout.vue'),r=a("./node_modules/vue-loader/lib/component-normalizer.js"),l=r(t.a,o.a,!1,null,null,null);s.a=l.exports},"./src/User/UserOffCanvas.vue":function(e,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/User/UserOffCanvas.vue"),o=a('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-f0cddefe","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/User/UserOffCanvas.vue'),r=a("./node_modules/vue-loader/lib/component-normalizer.js"),l=r(t.a,o.a,!1,null,null,null);s.default=l.exports},"./src/User/UserRegistration.vue":function(e,s,a){"use strict";var t=a("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/User/UserRegistration.vue"),o=a("./node_modules/vue-loader/lib/component-normalizer.js"),r=o(t.a,null,!1,null,null,null);s.a=r.exports}});