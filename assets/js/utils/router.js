/**
 * VueRouter
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

/** Tell Vue to use vue-router as router */
Vue.use(VueRouter);

/**
 * Vue Router routes
 * @returns {[]}
 */
const routes = function(){
    let paths = [
        { path: '/', name: 'home', component: require( '../Templates/Home.vue' ).default, props: true }
    ];
    for ( let type in Vuew.routing.paths ){
        if( Vuew.routing.paths.hasOwnProperty( type ) ) {
            paths.push({
                component: require('../Proxy/Component.vue').default,
                path: Vuew.routing.paths[type],
                name: type
            });
        }
    }
    return paths;
};

const router = new VueRouter({
    mode: 'history',
    routes: routes()
});

export default router;