/**
 * WebPack Entry main
 */
/** LESS */
require('../less/uikit.less');
require('../less/main.less');

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { HTTP_Proxy as axios } from './utils/HTTP_Proxy';

Vue.prototype.$http = axios;

Vue.use( Vuex );
Vue.use( VueRouter );

import header from './partials/header.vue';
Vue.component( 'wp-header', header );

const App = Vue.extend( {
    template: '<main><wp-header></wp-header><router-view></router-view></main>'
} );

const Home = { template: '<div>This is Home</div>' }
const Foo = { template: '<div>This is Foo</div>' }
const Bar = { template: '<div>This is Bar {{ $route.params.id }}</div>' }

const router = new VueRouter( {
    mode: 'history',
    base: '',
    /*routes: [
        {
            path: '/:page?',
            name: 'page',
            component: require( './template/home.vue' ).default
        },
        {
            path: '/',
            redirect: '/'
        }
    ]*/
    routes: [
        { path: '/', name: 'home', component: require( './template/Home.vue' ).default },
        { path: '/:id', name: 'post_type', component: require( './template/Page.vue' ).default },
        { path: '/:taxonomy/:id', name: 'taxonomy', component: require( './template/Taxonomy.vue' ).default  }
    ]
} );

//Define vuex store
const store = new Vuex.Store( {
    state: {
        title: ''
    },
    mutations: {
        //Do something cool on state change
    }
} );

new App( {
    store,
    router
} ).$mount( '#vuew-app' );