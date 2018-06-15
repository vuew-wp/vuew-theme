<template>

    <anchor :menu="menu" :class="{ 'uk-parent' : menu.children }">

        <ul v-if="menu.children">
            <menu-tree-item class="item" v-for="item in menu.children" :key="item.path" :menu="item"></menu-tree-item>
        </ul>

    </anchor>

</template>

<script>

    import Anchor from '../../Proxy/Anchor';

    export default {
        name: 'menu-tree-item',
        props: [
            'menu'
        ],
        components: {
            Anchor
        }
    }
</script>