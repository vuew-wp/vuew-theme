<template>
    <router-link tag="li" :to="setMenuItemParams" :class="{ 'uk-parent' : menu.children }" exact>
        <a>{{ menu.title }}</a>
        <div class="uk-navbar-dropdown" v-if="menu.children">
            <ul class="uk-nav uk-navbar-dropdown-nav">
                <nav-menu-item class="item" v-for="item in menu.children" :key="item.path" :menu="item"></nav-menu-item>
            </ul>
        </div>
    </router-link>
</template>

<script>

    export default {
        name: 'nav-menu-item',
        props: [
            'menu'
        ],
        computed: {
            setMenuItemParams: function () {

                const vm = this;

                const breadcrumbs = vm.menu.breadcrumb;
                const type = vm.menu.type; //post_type, taxonomy :)
                const type_value = vm.menu.type_value; //page, post, post_tag, category
                const base = breadcrumbs.length > 0 ? breadcrumbs[0] : '';
                const name = '' === base ? 'home' : type;

                let menu = {
                    name: name,
                    params: {
                        base: base,
                        id: vm.menu.id,
                        type: type,
                        type_value: type_value,
                    }
                };

                menu.params.rest_base = vm.menu.rest_base;

                for( let i = 1, m = breadcrumbs.length; i < m; i++ ){
                    menu.params[ 'slug' + ( i + 1 ) ] = breadcrumbs[i];
                }

                return menu;
            }
        }
    }
</script>