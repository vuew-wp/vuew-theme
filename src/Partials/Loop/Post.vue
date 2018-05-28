<template>
    <article :class="'uk-width-1-' + columns + '@m'" class="uk-margin-bottom vw-article">
        <router-link :to="setMenuItemParams" class="uk-float-left uk-width-1-1 uk-box-shadow-large uk-box-shadow-hover-small">
            <Attachment :src="post.featured_media.thumbnail" :type="'background'" class="uk-height-small"></Attachment>
            <div class="uk-padding">
                <Title :theTitle="post.title" class="uk-article-title"></Title>
                <p v-text="post.date"></p>
                <Content :theContent="post.excerpt" class="uk-article-meta"></Content>
            </div>
        </router-link>
    </article>
</template>
<script>
    import Title from "./Title";
    import Content from "./Content";
    import Attachment from "../Attachment";

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
        computed: {
            /**
             * @todo make reusable
             */
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
        methods: {
            truncate: function ( string, count = 5, sliceFrom = 'start') {
                if ( !string ) return '';

                /**
                 * Since we're working with arrays and 0 index
                 */
                    //const wordCount = count - 1;
                let stringPieces = string.split(' ');

                if( count > stringPieces.length )
                    return string;

                if( 'start' === sliceFrom ){
                    stringPieces = stringPieces.slice( 0, count );
                    return stringPieces.join( ' ' ) + '...';
                }
                if( 'end' === sliceFrom ){
                    //count = count - 1;
                    stringPieces = stringPieces.slice( count, count + count );
                    return stringPieces.join(' ');
                }

                return 'Cannot truncate text';
            },
            appendToText( text, appendText = '', appendStartElem = '', appendEndElem = '' ){
                if( ! text ) {
                    console.error('at least one argument is required by appendToText() method for ', this);
                    return '';
                }
                if( '' === appendText )
                    return text;

                return appendStartElem + appendText + appendEndElem + text;
            }
        },
    };

</script>
