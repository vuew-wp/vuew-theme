<template>
        <off-canvas target="offCanvasMenu">
            <nav-menu :menu="menu"></nav-menu>
        </off-canvas>
</template>
<script>

    import NavMenu from '../NavMenu/NavMenu.vue';
    import OffCanvas from "./OffCanvas";

    export default {
        components: {
            OffCanvas,
            NavMenu
        },
        data() {
            return {
                menu: Vuew.config.navigation.menus.primary_menu
            };
        }
    };

</script>