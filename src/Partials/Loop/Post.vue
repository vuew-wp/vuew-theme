<template>
    <article :class="'uk-width-1-' + columns + '@m'" class="uk-margin-bottom vw-article">
        <router-link :to="setMenuItemParams( post )" class="uk-float-left uk-width-1-1 uk-box-shadow-large uk-box-shadow-hover-small">
            <Attachment :src="post.featured_media.thumbnail" :type="'background'" class="uk-height-small uk-position-relative"></Attachment>
            <div class="uk-padding">
                <Title :theTitle="post.title" class="uk-article-title"></Title>
                <p v-text="post.date"></p>
                <div v-html="post.excerpt" class="uk-article-meta"></div>
            </div>
        </router-link>
    </article>
</template>
<script>
    import Title from "./Title";
    import Content from "./Content";
    import Attachment from "../Attachment";

    import mixins from '../../mixins/mixins';

    export default {
        props: [
            'post',
            'columns'
        ],
        components: {
            Title,
            Content,
            Attachment
        },
        mixins: [ mixins.anchor, mixins.text ]
    };

</script>
