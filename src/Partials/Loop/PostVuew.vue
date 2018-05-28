<template>
    <article :class="[ 'uk-width-1-' + columns + '@m', displayExcerpt ? 'post-vuew-content-open' : 'post-vuew-content-closed']" class="uk-width-1-1@s uk-margin-bottom post-vuew">
        <div class="uk-position-relative uk-float-left uk-width-1-1">
            <attachment :src="post.featured_media.thumbnail" :type="'background'" class="post-vuew-image uk-position-cover"></attachment>
            <div class="post-vuew-title uk-position-bottom">
                <router-link :to="setMenuItemParams" class="uk-position-relative uk-float-left uk-width-1-1">
                    <h3 v-html="truncate( post.title, 4 )" class="uk-h3"></h3>
                </router-link>
                <a @click="toggleExcerpt" class="post-vuew-excerpt-toggle uk-margin-top uk-position-bottom-center" v-html="require( '../../svg/arrow-down.svg' )"></a>
            </div>
            <span v-text="post.date" class="post-vuew-date uk-position-top-left uk-background-primary uk-text-small"></span>
        </div>
        <div class="post-vuew-excerpt">
            <p v-html="appendToText( post.excerpt, truncate( post.title, 4, 'end' ), '<span class=\'uk-text-primary\'>...', '</span><br>' )"></p>
            <p>
                <router-link :to="setMenuItemParams" class="uk-button uk-width-1-1 uk-button-primary uk-button-small">
                    Read More
                </router-link>
            </p>
        </div>
    </article>
</template>
<script>

    import Post from "./Post";

    export default {
        extends: Post,
        data() {
            return {
                'displayExcerpt': false
            }
        },
        methods: {
            toggleExcerpt: function (){
                const vm = this;
                vm.displayExcerpt = ! vm.displayExcerpt;
                return vm.displayExcerpt;
            }
        }
    };

</script>
<style lang="less">
    @import "../../../assets/less/base/vars";
    @vw-post-vuew-svg-height: 25px;
    .post-vuew{

        div:first-child{
            padding-bottom: 100%;
        }

        p{
            margin: 0;
            font-size: 1rem;
            padding: 30px 30px 0;
            color: @vw-color-light;

            &:last-child{
             padding: 30px;
            }
        }

        h3{
            color: #ffffff;
            line-height: 1;
            font-size: 2rem;
            margin-top: 0;
            margin-bottom: @vw-post-vuew-svg-height;

        }

        &-date{
            color: #ffffff;
            padding: 4px 8px;
        }

        &-title{
            padding: 30px 30px ( 30px + @vw-post-vuew-svg-height ) 30px;
            background-color: fade( @vw-color-darkest, 30% );
        }

        &-excerpt{
            overflow: hidden;
            width: 100%;
            background-color: @vw-color-darker;

            a{
                color: @vw-color-darkest;
                text-transform: uppercase;
            }
        }

        &-content-closed .post-vuew-excerpt{
            max-height: 0;
            transition: max-height 0.5s ease-out;
        }

        &-content-open .post-vuew-excerpt{
            max-height: 1500px;
            transition: max-height 0.5s ease-in;
        }

        &-excerpt-toggle{
            min-height: @vw-post-vuew-svg-height;
            width: 100%;
            text-align: center;
            background-color: rgba(0,0,0,0.5);
            padding: 10px 0;

            svg{
                height: @vw-post-vuew-svg-height;
                transition: transform 0.5s;
            }
        }

        &-content-open .post-vuew-excerpt-toggle svg{
            transform: rotateX(180deg);
        }

    }
</style>