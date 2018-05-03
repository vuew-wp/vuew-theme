<template>
    <article class="uk-card uk-card-default uk-card-body uk-width-1-3">
        <router-link :to="setMenuItemParams">
            <Attachment style="max-height: 150px;" :src="post.featured_media.thumbnail"></Attachment>
            <Title :theTitle="post.title"></Title>
            <Content :theContent="post.excerpt"></Content>
        </router-link>
    </article>
</template>

<script>

    import Title from "./Title";
    import Content from "./Content";
    import Attachment from "../Attachment";

    export default {
        props: [
            'post'
        ],
        computed: {
            setMenuItemParams: function () {

                const vm = this.post.route;
                const type = vm.type;
                const type_value = vm.type_value;
                const breadcrumbs = vm.breadcrumbs;
                const base = breadcrumbs.length > 0 ? breadcrumbs[0] : '';

                let menu = {
                    name: type,
                    params: {
                        base: base,
                        type: type,
                        id: this.post.id,
                        type_value: type_value,
                        rest_base: vm.rest_base
                    }
                };

                for (let i = 1, m = breadcrumbs.length; i < m; i++) {
                    menu.params['slug' + i] = breadcrumbs[i];
                }

                return menu;
            }
        },
        components: {
            Title,
            Content,
            Attachment
        }
    };

</script>
