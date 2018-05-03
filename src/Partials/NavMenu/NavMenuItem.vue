<template>

    <anchor :menu="menu">

        <div class="uk-navbar-dropdown" v-if="menu.children">
            <ul class="uk-nav uk-navbar-dropdown-nav">
                <nav-menu-item class="item" v-for="item in menu.children" :key="item.path" :menu="item"></nav-menu-item>
            </ul>
        </div>

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