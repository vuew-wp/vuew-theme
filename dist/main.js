webpackJsonp([6],{"./assets/less/main.less":function(e,t){},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/App.vue":function(e,t,o){"use strict";var s=o("./src/Partials/Header.vue"),a=o("./src/Partials/Footer.vue"),n=o("./src/Proxy/Template.vue"),r=o("./src/Proxy/PreLoader.vue"),i=o("./src/Partials/OffCanvas/OffCanvasToggle.vue"),d=o("./src/common/helpers.js"),l=o("./src/debug/index.js");t.a={components:{"user-off-canvas":function(){return{component:o.e(0).then(o.bind(null,"./src/User/UserOffCanvas.vue"))}},"off-canvas-menu":function(){return{component:o.e(0).then(o.bind(null,"./src/Partials/OffCanvas/OffCanvasMenu.vue"))}},OffCanvasToggle:i.a,PreLoader:r.a,VwHeader:s.a,VwFooter:a.a,VwTemplate:n.default},data:function(){return{pending:!0}},mounted:function(){this.dispatchNavigation(this.$store,Vuew.config.boot)},watch:{$route:function(e,t){var o=e.params,s=!!o.hasOwnProperty("id")&&o.id,a=d.a.getComponent(o.type,s,e.path);this.dispatchNavigation(this.$store,{path:e.path,type:o.type,type_value:o.type_value,id:!!o.hasOwnProperty("id")&&o.id,rest_base:"home"===a&&Vuew.config.pageOnFront>0?"pages":o.rest_base})},query:function(){var e=this;e.pending=!0,e.$store.getters["query/isLoaded"]&&(l.a.log("QUERY CHANGED"),setTimeout(function(){e.pending=!1},400))}},methods:{dispatchNavigation:function(e,t){e.dispatch("query/navigate",d.a.prepareQuery(t),{root:!0})}},computed:{query:function(){var e=this.$store.getters["query/getCurrentQueriedObject"];return e||!1},isLoaded:function(){return this.$store.getters["query/isLoaded"]},notify:function(){return this.$store.getters["notify/getNotifications"]},bodyClass:function(){var e="",t=this.query;switch(t.component){case"post_type_archive":e+="archive post-type-archive post-type-archive-"+t.type_value;break;case"taxonomy":"post_tag"===t.type_value&&(e+="tag "),"category"===t.type_value&&(e+="category "),e+="archive tax-"+t.type_value+" term-"+t.payload.slug+" term-"+t.id;break;case"single":e+="post-template-default single single-"+t.type_value+" postid-"+t.id+" single-format-standard";break;case"home":e+="home blog";break;case"four04":e+="error404"}return e}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/Attachment.vue":function(e,t,o){"use strict";var s=o("./src/Proxy/PreLoader.vue");t.a={components:{PreLoader:s.a},props:{type:{default:"standard",type:String},src:{default:"",type:String},useFallback:{default:!0,type:Boolean}},data:function(){return{pending:!0,loaded:!1,imageElement:"",imageStyles:"",four04:!1,fallBackImage:Vuew.config.customLogo}},mounted:function(){var e=this;console.log(this.src),e.$nextTick(function(){e.loaded||e.isInView(e.$el)?e.getImage(e):window.addEventListener("scroll",e.handleScroll)})},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){console.log("SCROLLING"),(this.loaded||this.isInView(this.$el))&&this.getImage(this)},isInView:function(e){var t=e.getBoundingClientRect(),o=window.innerHeight||document.documentElement.clientHeight;return t.top<=o&&t.top+t.height>=0},getImage:function(e){window.removeEventListener("scroll",e.handleScroll);var t=e.src;e.imageElement="",e.loaded=e.pending=!1;var o=e.$store.getters["cache/imageCached"](t);if(!1!==o)return 404===o.code&&(e.four04=!0),200===o.code&&("background"===e.type?e.imageStyles="background-image: url("+t+");":e.imageElement=t),void(e.loaded=!0);if(""===t)return e.useFallback&&("background"===e.type?e.imageStyles="background-image: url("+e.fallBackImage+");":e.imageElement=e.fallBackImage),e.pending=!1,void(e.loaded=!0);e.pending=!0;var s=new Image;s.onload=function(){if("naturalHeight"in this){if(this.naturalHeight+this.naturalWidth===0)return void this.onerror()}else if(this.width+this.height===0)return void this.onerror();e.$nextTick(function(){"background"===e.type?e.imageStyles="background-image: url("+t+");":e.imageElement=t,e.$store.getters["cache/imageCached"](t)||e.$store.dispatch("cache/addImagePath",{src:t,code:200},{root:!0}),e.pending=!1,e.loaded=!0})},s.onerror=function(o){console.error("Image load ERROR",o),e.$store.getters["cache/imageCached"](t)||e.$store.dispatch("cache/addImagePath",{src:t,code:404},{root:!0}),e.four04=!0,e.loaded=!0,e.pending=!1},s.src=t}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/CustomLogo.vue":function(e,t,o){"use strict";var s=o("./src/Partials/Attachment.vue");t.a={components:{Attachment:s.a},mounted:function(){this.customLogo=Vuew.config.customLogo},data:function(){return{brandName:"VUEW - A VueJs and WordPress theme",customLogo:!1}},computed:{setHomeRouteParams:function(){var e=Vuew.config.pageOnFront,t={name:"home",params:{base:"home",id:0,type:"home",type_value:!1,rest_base:!1}};return e>0&&(t.params.base="pages",t.params.id=e,t.params.type="post_type",t.params.type_value="page",t.params.rest_base="pages"),t}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/Footer.vue":function(e,t,o){"use strict";t.a={}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/Header.vue":function(e,t,o){"use strict";var s=o("./src/Partials/CustomLogo.vue"),a=o("./src/Partials/OffCanvas/OffCanvasToggle.vue"),n=o("./node_modules/lodash/lodash.js"),r=o.n(n);t.a={components:{OffCanvasToggle:a.a,CustomLogo:s.a},methods:{visibile:function(e){this.$el.style.top=e?"0":"-100px",this.visible=e},handleScroll:r.a.throttle(function(){var e=this,t=window.pageYOffset;if(e.$store.getters["layout/hasActiveCanvas"]||t<100||t===e.prevScrollPos)return void this.visibile(!0);var o=e.prevScrollPos>t;if(e.prevScrollPos=t,o)return void(this.visible||this.visibile(!0));this.visible&&this.visibile(!1)},100)},computed:{canListen:function(){return this.$store.getters.getOffCanvasState}},data:function(){return{site_name:"Vuew Theme",prevScrollPos:0,visible:!0}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/OffCanvas/OffCanvasToggle.vue":function(e,t,o){"use strict";t.a={props:{target:""},methods:{toggleOffCanvas:function(){var e=this.$store.getters["layout/offCanvasState"](this.target);this.$store.dispatch("layout/toggleOffCanvas",{target:this.target,open:!e},{root:!0})}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Proxy/PreLoader.vue":function(e,t,o){"use strict";t.a={props:{loadingText:{default:"Loading",type:String}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Proxy/Template.vue":function(e,t,o){"use strict";var s=o("./src/Proxy/PreLoader.vue"),a=o("./src/Templates/404.vue"),n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s])}return e},r={error:a.default,loading:s.a};t.a={components:{taxonomy:function(){return n({component:o.e(2).then(o.bind(null,"./src/Archive/Taxonomy.vue"))},r)},post_type_archive:function(){return n({component:o.e(3).then(o.bind(null,"./src/Archive/PostType.vue"))},r)},single:function(){return n({component:o.e(5).then(o.bind(null,"./src/Single/Single.vue"))},r)},home:function(){return n({component:parseInt(Vuew.config.pageOnFront)>0?o.e(4).then(o.bind(null,"./src/Templates/Home.vue")):o.e(1).then(o.bind(null,"./src/Templates/Index.vue"))},r)},PreLoader:s.a,four04:a.default},props:["query"],data:function(){return{applyFilters:wp.hooks.applyFilters}},computed:{queryData:function(){return"four04"===this.query.type?this.query.path:this.query}}}},"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Templates/404.vue":function(e,t,o){"use strict";t.a={props:["queryData"],data:function(){return{loaded:!1,siteUrl:Vuew.baseUrl}}}},'./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-405dd446","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/App.vue':function(e,t,o){t=e.exports=o("./node_modules/css-loader/lib/css-base.js")(!1),t.push([e.i,"",""])},'./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-9144723c","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/Header.vue':function(e,t,o){t=e.exports=o("./node_modules/css-loader/lib/css-base.js")(!1),t.push([e.i,".vw-primary-header{z-index:2;top:0;transition:top .3s}.admin-bar .vw-primary-header{top:46px}",""])},'./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-b2690f4c","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Proxy/Template.vue':function(e,t,o){t=e.exports=o("./node_modules/css-loader/lib/css-base.js")(!1),t.push([e.i,".vw-site-container{margin-top:100px}",""])},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-251b85aa","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/Footer.vue':function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement;return(e._self._c||t)("footer")},a=[],n={render:s,staticRenderFns:a};t.a=n},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-38b54464","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Proxy/PreLoader.vue':function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"uk-position-cover",staticStyle:{background:"#111111"}},[s("div",{staticClass:"triangle-wrapper uk-position-center"},[e._l(5,function(t,a){return s("div",{staticClass:"triangle",class:"triangle-"+a},[s("i",{domProps:{innerHTML:e._s(o("./src/svg/triangle.svg"))}})])}),e._v(" "),s("p",{staticClass:"triangle-loading",domProps:{innerHTML:e._s(e.loadingText)}})],2)])},a=[],n={render:s,staticRenderFns:a};t.a=n},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-405dd446","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/App.vue':function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("main",{class:[e.bodyClass,e.isLoaded?"vw-component-loaded":"vw-component-pending"]},[o("vw-header"),e._v(" "),e._e(),e._v(" "),o("transition",{attrs:{name:"vw-fade-transition"}},[e.pending?e._e():o("vw-template",{attrs:{query:e.query}})],1),e._v(" "),o("pre-loader",{directives:[{name:"show",rawName:"v-show",value:!e.isLoaded,expression:"!isLoaded"}]}),e._v(" "),o("vw-footer"),e._v(" "),o("off-canvas-menu"),e._v(" "),o("user-off-canvas"),e._v(" "),o("off-canvas-toggle",{staticClass:"vw-off-canvas-overlay uk-position-top uk-position-fixed uk-width-1-1 uk-height-1-1"})],1)},a=[],n={render:s,staticRenderFns:a};t.a=n},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-5f7bd074","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/CustomLogo.vue':function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("router-link",{attrs:{to:e.setHomeRouteParams,exact:""}},[e.customLogo?o("Attachment",{staticStyle:{width:"100px"},attrs:{alt:e.brandName,src:e.customLogo}}):o("h1",[e._v(e._s(e.brandName))])],1)},a=[],n={render:s,staticRenderFns:a};t.a=n},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-7eb198bc","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/Attachment.vue':function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.four04?s("div",{domProps:{innerHTML:e._s(o("./src/svg/image-404.svg"))}}):e.loaded&&"background"===e.type?s("div",{staticClass:"uk-background-cover uk-position-cover",style:e.imageStyles},[e._t("default")],2):e.loaded&&"standard"===e.type?s("img",{attrs:{src:e.imageElement}}):e.pending?s("pre-loader",{staticClass:"uk-background-cover"}):e._e()},a=[],n={render:s,staticRenderFns:a};t.a=n},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-9144723c","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/Header.vue':function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("header",{staticClass:"vw-primary-header uk-position-fixed uk-width-1-1 uk-box-shadow-small uk-box-shadow-hover-medium"},[o("custom-logo"),e._v(" "),o("off-canvas-toggle",{attrs:{target:"offCanvasMenu"}},[e._v("MENU")]),e._v(" / "),o("off-canvas-toggle",{attrs:{target:"userOffCanvas"}},[e._v("USER")])],1)},a=[],n={render:s,staticRenderFns:a};t.a=n},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-a8249aa0","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Templates/404.vue':function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"uk-container"},[o("h1",[e._v("404")]),e._v(" "),o("div",{staticClass:"uk-width-1-1"},[e._v("URL: "),o("strong",[e._v(e._s(e.siteUrl+e.queryData.path))]),e._v(", could not be resolved.")])])},a=[],n={render:s,staticRenderFns:a};t.a=n},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-b2690f4c","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Proxy/Template.vue':function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement;return(e._self._c||t)(e.query.component,{tag:"component",staticClass:"vw-site-container",attrs:{"query-data":e.queryData}})},a=[],n={render:s,staticRenderFns:a};t.a=n},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-e79b5540","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/OffCanvas/OffCanvasToggle.vue':function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement;return(e._self._c||t)("a",{on:{click:e.toggleOffCanvas}},[e._t("default")],2)},a=[],n={render:s,staticRenderFns:a};t.a=n},'./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-405dd446","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/App.vue':function(e,t,o){var s=o('./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-405dd446","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/App.vue');"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);o("./node_modules/vue-style-loader/lib/addStylesClient.js")("4c07c120",s,!0,{})},'./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-9144723c","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/Header.vue':function(e,t,o){var s=o('./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-9144723c","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/Header.vue');"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);o("./node_modules/vue-style-loader/lib/addStylesClient.js")("7defdee7",s,!0,{})},'./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-b2690f4c","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Proxy/Template.vue':function(e,t,o){var s=o('./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-b2690f4c","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Proxy/Template.vue');"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);o("./node_modules/vue-style-loader/lib/addStylesClient.js")("793ff56c",s,!0,{})},"./src/App.vue":function(e,t,o){"use strict";function s(e){o('./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-405dd446","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/App.vue')}var a=o("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/App.vue"),n=o('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-405dd446","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/App.vue'),r=o("./node_modules/vue-loader/lib/component-normalizer.js"),i=s,d=r(a.a,n.a,!1,i,null,null);t.a=d.exports},"./src/Partials/Attachment.vue":function(e,t,o){"use strict";var s=o("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/Attachment.vue"),a=o('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-7eb198bc","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/Attachment.vue'),n=o("./node_modules/vue-loader/lib/component-normalizer.js"),r=n(s.a,a.a,!1,null,null,null);t.a=r.exports},"./src/Partials/CustomLogo.vue":function(e,t,o){"use strict";var s=o("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/CustomLogo.vue"),a=o('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-5f7bd074","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/CustomLogo.vue'),n=o("./node_modules/vue-loader/lib/component-normalizer.js"),r=n(s.a,a.a,!1,null,null,null);t.a=r.exports},"./src/Partials/Footer.vue":function(e,t,o){"use strict";var s=o("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/Footer.vue"),a=o('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-251b85aa","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/Footer.vue'),n=o("./node_modules/vue-loader/lib/component-normalizer.js"),r=n(s.a,a.a,!1,null,null,null);t.a=r.exports},"./src/Partials/Header.vue":function(e,t,o){"use strict";function s(e){o('./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-9144723c","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Partials/Header.vue')}var a=o("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/Header.vue"),n=o('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-9144723c","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/Header.vue'),r=o("./node_modules/vue-loader/lib/component-normalizer.js"),i=s,d=r(a.a,n.a,!1,i,null,null);t.a=d.exports},"./src/Partials/OffCanvas/OffCanvasToggle.vue":function(e,t,o){"use strict";var s=o("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Partials/OffCanvas/OffCanvasToggle.vue"),a=o('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-e79b5540","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Partials/OffCanvas/OffCanvasToggle.vue'),n=o("./node_modules/vue-loader/lib/component-normalizer.js"),r=n(s.a,a.a,!1,null,null,null);t.a=r.exports},"./src/Proxy/PreLoader.vue":function(e,t,o){"use strict";var s=o("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Proxy/PreLoader.vue"),a=o('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-38b54464","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Proxy/PreLoader.vue'),n=o("./node_modules/vue-loader/lib/component-normalizer.js"),r=n(s.a,a.a,!1,null,null,null);t.a=r.exports},"./src/Proxy/Template.vue":function(e,t,o){"use strict";function s(e){o('./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?minimize!./node_modules/vue-loader/lib/style-compiler/index.js?{"vue":true,"id":"data-v-b2690f4c","scoped":false,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/Proxy/Template.vue')}Object.defineProperty(t,"__esModule",{value:!0});var a=o("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Proxy/Template.vue"),n=o('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-b2690f4c","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Proxy/Template.vue'),r=o("./node_modules/vue-loader/lib/component-normalizer.js"),i=s,d=r(a.a,n.a,!1,i,null,null);t.default=d.exports},"./src/Templates/404.vue":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Templates/404.vue"),a=o('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-a8249aa0","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Templates/404.vue'),n=o("./node_modules/vue-loader/lib/component-normalizer.js"),r=n(s.a,a.a,!1,null,null,null);t.default=r.exports},"./src/common/helpers.js":function(e,t,o){"use strict";o.d(t,"a",function(){return s});var s={getComponent:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"/"===(arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/")?"home":404===e?"four04":"post_type"===e&&t>0?"single":e},getArchiveEndpoint:function(e){switch(e.type){case"post_type_archive":return"types/"+e.type_value;case"taxonomy":return e.rest_base+"/"+e.id;case"home":return"types/post"}},getArchivePaginationEndpoint:function(e){switch(e.type){case"post_type_archive":return e.rest_base+"?";case"taxonomy":if("post_tag"===e.type_value||"category"===e.type_value)return"posts?"+e.rest_base+"[]="+e.id+"&";return Vuew.config.navigation.restBases.post_type[e.payload.post_type]+"?taxonomies[]="+e.id+"&";case"home":return"posts?"}},prepareQuery:function(e){return{id:e.id,path:e.path,component:s.getComponent(e.type,e.id,e.path),type:e.type,payload:e,rest_base:e.rest_base,type_value:e.type_value,isArchive:"home"===e.type&&0===Vuew.config.pageOnFront||"taxonomy"===e.type||"post_type_archive"===e.type}}}},"./src/common/http_proxy.js":function(e,t,o){"use strict";o.d(t,"a",function(){return n}),o.d(t,"b",function(){return r});var s=o("./node_modules/axios/index.js"),a=o.n(s),n=a.a.create({baseURL:Vuew.restRoot+"wp/v2/",headers:{"X-WP-Nonce":Vuew.nonces.main},params:{vr:1}}),r=a.a.create({baseURL:Vuew.restRoot+"vuew/v2/",headers:{"X-WP-Nonce":Vuew.nonces.main},params:{vr:1}})},"./src/debug/index.js":function(e,t,o){"use strict";o.d(t,"a",function(){return a});var s={error:function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];console.error(t)},force:function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];console.error(t)}};s.log=function(){};var a=s},"./src/main.js":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o("./node_modules/vue/dist/vue.esm.js"),a=o("./src/router/index.js"),n=o("./src/store/index.js"),r=o("./src/App.vue");o("./assets/less/main.less"),function(e,t){e.wp=e.wp||{},e.wp.hooks=e.wp.hooks||new function(){function e(e,t,o,s){var a,n,i;if(r[e][t])if(o)if(a=r[e][t],s)for(i=a.length;i--;)(n=a[i]).callback===o&&n.context===s&&a.splice(i,1);else for(i=a.length;i--;)a[i].callback===o&&a.splice(i,1);else r[e][t]=[]}function t(e,t,s,a,n){var i={callback:s,priority:a,context:n},d=r[e][t];d?(d.push(i),d=o(d)):d=[i],r[e][t]=d}function o(e){for(var t,o,s,a=1,n=e.length;a<n;a++){for(t=e[a],o=a;(s=e[o-1])&&s.priority>t.priority;)e[o]=e[o-1],--o;e[o]=t}return e}function s(e,t,o){var s,a,n=r[e][t];if(!n)return"filters"===e&&o[0];if(a=n.length,"filters"===e)for(s=0;s<a;s++)o[0]=n[s].callback.apply(n[s].context,o);else for(s=0;s<a;s++)n[s].callback.apply(n[s].context,o);return"filters"!==e||o[0]}var a=Array.prototype.slice,n={removeFilter:function(t,o){return"string"==typeof t&&e("filters",t,o),n},applyFilters:function(){var e=a.call(arguments),t=e.shift();return"string"==typeof t?s("filters",t,e):n},addFilter:function(e,o,s,a){return"string"==typeof e&&"function"==typeof o&&t("filters",e,o,s=parseInt(s||10,10),a),n},removeAction:function(t,o){return"string"==typeof t&&e("actions",t,o),n},doAction:function(){var e=a.call(arguments),t=e.shift();return"string"==typeof t&&s("actions",t,e),n},addAction:function(e,o,s,a){return"string"==typeof e&&"function"==typeof o&&t("actions",e,o,s=parseInt(s||10,10),a),n}},r={actions:{},filters:{}};return n}}(window);window.Vuew;new s.a({router:a.a,store:n.a,render:function(e){return e(r.a)}}).$mount("#vuew-app")},"./src/router/index.js":function(e,t,o){"use strict";var s=o("./node_modules/vue/dist/vue.esm.js"),a=o("./node_modules/vue-router/dist/vue-router.esm.js"),n=o("./src/store/index.js");s.a.use(a.a);var r=new a.a({mode:"history",routes:function(){var e=[];for(var t in Vuew.config.navigation.paths)e.push({component:o("./src/Proxy/Template.vue").default,path:Vuew.config.navigation.paths[t],name:t});return e.push({component:o("./src/Templates/404.vue").default,path:"*",name:"four04"}),e}(),linkActiveClass:"uk-active",linkExactActiveClass:"uk-active"});r.beforeEach(function(e,t,o){o(!n.a.getters["query/isPending"])}),t.a=r},"./src/store/actions.js":function(e,t,o){"use strict";o.d(t,"a",function(){return s});var s={updateCurrentPath:function(e,t){e.commit("UPDATE_CURRENT_PATH",t),e.dispatch("notify/addNotification","<strong>> Current path</strong> -> "+t,{root:!0})}}},"./src/store/getters.js":function(e,t,o){"use strict";o.d(t,"a",function(){return s});var s={getCurrentPath:function(e){if(e.currentPath)return"/"===e.currentPath?"/":e.currentPath.replace(/\/$/,"")}}},"./src/store/index.js":function(e,t,o){"use strict";o.d(t,"a",function(){return m});var s=o("./node_modules/vue/dist/vue.esm.js"),a=o("./node_modules/vuex/dist/vuex.esm.js"),n=o("./src/store/state.js"),r=o("./src/store/actions.js"),i=o("./src/store/getters.js"),d=o("./src/store/mutations.js"),l=o("./src/store/modules/query.js"),u=o("./src/store/modules/cache.js"),c=o("./src/store/modules/notify.js"),p=o("./src/store/modules/layout.js");s.a.use(a.a);var m=new a.a.Store({state:n,actions:r.a,getters:i.a,mutations:d.a,modules:{query:l.a,cache:u.a,notify:c.a,layout:p.a},strict:!1,plugins:[]})},"./src/store/modules/cache.js":function(e,t,o){"use strict";function s(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}var a=o("./node_modules/vue/dist/vue.esm.js"),n=o("./src/debug/index.js"),r={excludeIds:[],queriesCache:{},pathsCache:[],postsCache:{},imagePaths:[]},i={CACHE_ADD_IDS_TO_EXCLUDE:function(e,t){e.excludeIds.push(t)},CACHE_ADD_POST:function(e,t){a.a.set(e.postsCache,t.route.path,t),n.a.log("CACHE_ADD_POST",e.postsCache)},CACHE_ADD_QUERY:function(e,t){a.a.set(e.queriesCache,t.path,t),n.a.log("CACHE_ADD_QUERY",e.queriesCache)},CACHE_UPDATE_QUERY_POST_LIST:function(e,t){a.a.set(e.queriesCache[t.path].payload,"post_paths",[].concat(s(e.queriesCache[t.path].payload.post_paths),s(t.posts))),e.queriesCache[t.path].payload.post_count+=t.posts.length,n.a.log("CACHE_UPDATE_POST_LIST",e.queriesCache[t.path].payload.post_paths)},CACHE_ADD_404:function(e,t){a.a.set(e.queriesCache,t.path,t),n.a.log(e.queriesCache)},CACHE_ADD_IMAGE_PATH:function(e,t){e.imagePaths.push(t),n.a.log("CACHE_ADD_IMAGE_PATH",e.imagePaths)}},d={addIdToExclude:function(e,t){e.commit("CACHE_ADD_PATH",t)},addPostToCache:function(e,t){e.commit("CACHE_ADD_POST",t),e.dispatch("notify/addNotification","<strong>> Post cached</strong> -> "+t.title,{root:!0})},addPostsToCache:function(e,t){var o="";for(var s in t)e.commit("CACHE_ADD_POST",t[s]),o+=t[s].title+", ";e.dispatch("notify/addNotification","<strong>> Posts cached</strong> -> "+o,{root:!0})},addRouteQuery:function(e,t){var o=[],s=t;if(s.payload.path=e.rootGetters.getCurrentPath,s.payload.hasOwnProperty("posts")){var a=s.payload.posts;for(var n in a)o.push(a[n].route.path),e.commit("CACHE_ADD_IDS_TO_EXCLUDE",a[n].id);s.payload.post_paths=o,delete s.payload.posts,e.dispatch("addPostsToCache",a)}e.commit("CACHE_ADD_QUERY",s),e.dispatch("notify/addNotification","<strong>> Route query cached</strong>",{root:!0})},updateQueryPostList:function(e,t){var o=[];for(var s in t.posts)o.push(t.posts[s].route.path),e.commit("CACHE_ADD_IDS_TO_EXCLUDE",t.posts[s].id);e.dispatch("addPostsToCache",t.posts),e.commit("CACHE_UPDATE_QUERY_POST_LIST",{path:e.rootGetters.getCurrentPath,posts:o}),e.dispatch("notify/addNotification","<strong>> Query post list updated</strong>",{root:!0})},add404:function(e,t){e.commit("CACHE_ADD_404",t)},addImagePath:function(e,t){e.commit("CACHE_ADD_IMAGE_PATH",t)}},l={cacheExists:function(e,t){return function(t){return e.pathsCache.indexOf(t)>=0}},postCacheExists:function(e,t){return function(t){return t in e.postsCache}},queryCacheExists:function(e,t,o,s){return s.getCurrentPath in e.queriesCache},getQueriesCache:function(e){return e.queriesCache},getPostsCache:function(e){return e.postsCache},imageCached:function(e){return function(t){for(var o=0,s=e.imagePaths.length;o<s;o++)if(e.imagePaths[o].src===t)return e.imagePaths[o];return!1}}};t.a={namespaced:!0,state:r,getters:l,actions:d,mutations:i}},"./src/store/modules/layout.js":function(e,t,o){"use strict";var s=o("./node_modules/vue/dist/vue.esm.js"),a={offCanvases:{active:""}},n={TOGGLE_OFF_CANVAS:function(e,t){var o=Object.keys(e.offCanvases).find(function(t){return!0===e.offCanvases[t]});if(o===t.target)e.offCanvases.active="";else{if(void 0!==o&&(s.a.set(e.offCanvases,[o],!1),void 0===t.target))return void(e.offCanvases.active="");e.offCanvases.active=t.target}s.a.set(e.offCanvases,[t.target],t.open)},ADD_OFF_CANVAS:function(e,t){s.a.set(e.offCanvases,[t],!1)}},r={toggleOffCanvas:function(e,t){e.commit("TOGGLE_OFF_CANVAS",{open:t.open,target:t.target})},addOffCanvas:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{open:!0};e.commit("ADD_OFF_CANVAS",t.target)}},i={offCanvasState:function(e){return function(t){return e.offCanvases[t]}},hasActiveCanvas:function(e){return""!==e.offCanvases.active}};t.a={namespaced:!0,state:a,getters:i,actions:r,mutations:n}},"./src/store/modules/notify.js":function(e,t,o){"use strict";var s={routeChange:"",routeChangeVerbose:""},a={ADD_NOTIFICATION:function(e,t){e.routeChange=t}},n={clearNotification:function(e){e.commit("ADD_NOTIFICATION","")},addNotification:function(e,t){var o=e.getters.getNotifications;e.commit("ADD_NOTIFICATION",o+"<br>"+t)}},r={getNotifications:function(e){return e.routeChange}};t.a={namespaced:!0,state:s,getters:r,actions:n,mutations:a}},"./src/store/modules/query.js":function(e,t,o){"use strict";var s=o("./src/common/http_proxy.js"),a=o("./src/debug/index.js"),n=o("./src/common/helpers.js"),r={loaded:!0,pending:!1,paginationPending:!1},i={ADD_404:function(e,t){t.type=t.component="four04",t.type_value=!1,e.queries[t.path]=t},UPDATE_REQUEST_STATE:function(e,t){e.pending=t.pending,e.loaded=t.loaded},PAGINATION_PENDING:function(e,t){e.paginationPending=t},UPDATE_CACHE_STORE:function(e,t){e.cacheStore=t}},d={navigate:function(e,t){e.dispatch("notify/clearNotification",null,{root:!0}),e.dispatch("notify/addNotification","<strong>> Navigation started</strong>",{root:!0}),e.commit("UPDATE_REQUEST_STATE",{loaded:!1,pending:!0});var o=t.path;return e.dispatch("updateCurrentPath",o,{root:!0}),404===t.type?void e.dispatch("force404",t):e.rootGetters["cache/queryCacheExists"]?(!1===t.id?e.dispatch("notify/addNotification","<strong>> BACK / FORWARD in browser</strong>",{root:!0}):e.dispatch("notify/addNotification","<strong>> Cache exists</strong>",{root:!0}),void e.commit("UPDATE_REQUEST_STATE",{loaded:!0,pending:!1})):(e.dispatch("notify/addNotification","<strong>> Component</strong> -> "+t.component,{root:!0}),e.rootGetters["cache/postCacheExists"](o)?(t.payload.cached=!0,e.dispatch("cache/addRouteQuery",t,{root:!0}),void e.commit("UPDATE_REQUEST_STATE",{loaded:!0,pending:!1})):t.isArchive?void e.dispatch("fetchArchive",t):(e.dispatch("notify/addNotification","<strong>> Fetching from</strong> -> "+t.rest_base+"/"+t.id,{root:!0}),void s.a.get(t.rest_base+"/"+t.id).then(function(o){e.dispatch("notify/addNotification","<strong>> Response rehtfhtceived</strong>",{root:!0}),t.payload={cached:!0,posts:[o.data]},e.dispatch("cache/addRouteQuery",t,{root:!0}),e.commit("UPDATE_REQUEST_STATE",{loaded:!0,pending:!1})}).catch(function(o){e.dispatch("force404",t)})))},force404:function(e,t){s.a.get("VUEW_QUERY_FORCE_404?path="+encodeURI(t.path)).catch(function(o){e.dispatch("cache/add404",t,{root:!0}),e.commit("UPDATE_REQUEST_STATE",{loaded:!0,pending:!1}),e.dispatch("notify/addNotification","<strong>> ERROR: Server response</strong> -> "+o,{root:!0})})},fetchArchive:function(e,t){var o=n.a.getArchiveEndpoint(t);e.dispatch("notify/addNotification","<strong>> Fetching archive</strong> -> "+o,{root:!0}),s.a.get(o).then(function(o){t.payload=o.data,e.dispatch("cache/addRouteQuery",t,{root:!0}),e.commit("UPDATE_REQUEST_STATE",{loaded:!0,pending:!1}),e.dispatch("notify/addNotification","<strong>> Response received</strong> -> "+o.data.found_posts+" posts found.",{root:!0})}).catch(function(t){a.a.force(t),e.commit("UPDATE_REQUEST_STATE",{loaded:!0,pending:!1})})},addPostsToList:function(e){var t=e.getters.getCurrentQueriedObject,o=Vuew.config.query.ppp,r=t.payload.post_count,i=r/o+1,d=n.a.getArchivePaginationEndpoint(t);e.commit("PAGINATION_PENDING",!0),s.a.get(d+"page="+i+"&per_page="+o).then(function(t){e.dispatch("cache/updateQueryPostList",{posts:t.data},{root:!0}),e.commit("PAGINATION_PENDING",!1)}).catch(function(t){e.commit("PAGINATION_PENDING",!1),a.a.force(t)})}},l={getCurrentQueriedObject:function(e,t,o,s){var a=s["cache/getQueriesCache"],n=s.getCurrentPath;if(n&&a.hasOwnProperty(n))return a[n]},paginationPending:function(e){return e.paginationPending},isLoaded:function(e){return e.loaded},isPending:function(e){return e.pending}};t.a={namespaced:!0,state:r,getters:l,actions:d,mutations:i}},"./src/store/mutations.js":function(e,t,o){"use strict";o.d(t,"a",function(){return a});var s=o("./node_modules/vue/dist/vue.esm.js"),a={UPDATE_CURRENT_PATH:function(e,t){s.a.set(e,"currentPath",t)}}},"./src/store/state.js":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={currentPath:""}},"./src/svg/image-404.svg":function(e,t){e.exports='<?xml version="1.0" encoding="iso-8859-1"?> <svg version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px viewBox="0 0 75.156 75.156" style="enable-background:new 0 0 75.156 75.156" xml:space=preserve> <g><g><polygon style=fill:#999 points="25.052,59.312 17.894,66.47 53.683,66.47 46.525,59.312 \t\t"/> <polygon style=fill:#999 points="0,8.686 0,55.211 60.951,55.211 14.426,8.686 \t\t"/> <polygon style=fill:#999 points="20.535,12.265 67.061,58.79 75.156,58.79 75.156,12.265 \t\t"/> </g></g> </svg>'},"./src/svg/triangle.svg":function(e,t){e.exports='<?xml version="1.0" encoding="iso-8859-1"?> <svg class=triangle-svg viewBox="0 0 140 141"> <g stroke=none stroke-width=1 fill=none fill-rule=evenodd> <polygon class=triangle-polygon points="136 138 4 138 70 6"></polygon> </g> </svg>'}},["./src/main.js"]);