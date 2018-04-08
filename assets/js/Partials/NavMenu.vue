<template>
    <router-link :to="setMenuItemParams">
        {{ menu.title }}
        <!--<ul v-if="false !== menu.children">
            <li v-for="item in menu.children">
                {{ item.title }}
            </li>
        </ul>-->
    </router-link>
</template>

<script>

    export default {

        props: [
            'menu'
        ],

        mounted:function(){
            //console.log("Loaded");
        },

        computed: {
            setMenuItemParams: function () {

                const vm = this;

                const object_type   = vm.menu.type; //post_type, taxonomy :)
                const object_value  = vm.menu.object; //page, post, post_tag, category
                let breadcrumbs     = vm.menu.breadcrumb;

                let menu = {
                    name: object_type,
                    params: {
                        base: breadcrumbs[0],

                        object_id: vm.menu.object_id,
                        object_type: object_type,
                        object_value: object_value,
                    }
                };

                menu.params.rest_base = Vuew.routing.bases[ object_type ][ object_value ];
                breadcrumbs.shift();

                for( let i = 0, m = breadcrumbs.length; i < m; i++ ){
                    menu.params[ 'slug' + ( i + 1 ) ] = breadcrumbs[i];
                }

                return menu;
            }
        }



    };
</script>
