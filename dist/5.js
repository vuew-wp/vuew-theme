webpackJsonp([5],{"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Single/Single.vue":function(e,t,s){"use strict";var a=s("./src/Partials/Attachment.vue");t.a={components:{Attachment:a.a},props:["queryData"],computed:{postData:function(){if(this.queryData.payload.hasOwnProperty("cached")){return this.$store.getters["cache/getPostsCache"][this.$store.getters.getCurrentPath]}return this.queryData.payload}},data:function(){return{title:"Loading..."}}}},'./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-d69fced2","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Single/Single.vue':function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("figure",{staticClass:"vw-featured-image"},[s("Attachment",{staticClass:"uk-position-relative",staticStyle:{height:"300px",width:"100%"},attrs:{src:e.postData.featured_media.large,"use-fallback":!1,type:"background"}},[s("h1",{staticClass:"uk-container uk-position-center"},[s("span",{domProps:{innerHTML:e._s(e.postData.title)}})])])],1),e._v(" "),s("div",{staticClass:"uk-container uk-section"},[s("div",{staticClass:"uk-block",domProps:{innerHTML:e._s(e.postData.content)}})])])},l=[],n={render:a,staticRenderFns:l};t.a=n},"./src/Single/Single.vue":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/Single/Single.vue"),l=s('./node_modules/vue-loader/lib/template-compiler/index.js?{"id":"data-v-d69fced2","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/Single/Single.vue'),n=s("./node_modules/vue-loader/lib/component-normalizer.js"),i=n(a.a,l.a,!1,null,null,null);t.default=i.exports}});