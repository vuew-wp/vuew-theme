<template>

    <anchor :menu="menu" :class="{ 'uk-parent' : menu.children }">

        <ul v-if="menu.children">
            <nav-menu-item class="item" v-for="item in menu.children" :key="item.path" :menu="item"></nav-menu-item>
        </ul>

    </anchor>

</template>

<script>

    import Anchor from '../../Proxy/Anchor';

    export default {
        name: 'nav-menu-item',
        props: [
            'menu'
        ],
        components: {
            'anchor': Anchor
        }
    }
</script>