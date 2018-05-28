<template>
    <router-link v-if="menu.type !== 'external'" tag="li" :to="setMenuItemParams" exact>
        <a v-html="menu.title"></a> <span v-if="menu.type === 404" class="uk-text-danger uk-float-right">(404)</span>
        <slot></slot>
    </router-link>
    <li v-else :class="{ 'uk-parent' : menu.children }">
        <a :href="menu.href" :target="menu.target" v-html="menu.title"></a>
        <slot></slot>
    </li>
</template>
<script>
    export default {
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
                        rest_base: vm.menu.rest_base
                    }
                };

                for (let i = 1, m = breadcrumbs.length; i < m; i++) {
                    menu.params['slug' + i] = breadcrumbs[i];
                }

                return menu;
            }
        },

    };
</script>