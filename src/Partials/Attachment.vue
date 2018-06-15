<template>
    <div>
        <div v-if="four04" v-html="require( '../svg/image-404.svg' )"></div>
        <div v-else-if="useInternalFallback" v-html="require( '../svg/vuew-logo.svg' )" class="uk-background-cover uk-position-cover">
            <slot></slot>
        </div>
        <div v-else-if="loaded && type === 'background'" class="uk-background-cover uk-position-cover"
             :style="imageStyles">
            <slot></slot>
        </div>
        <img v-else-if="loaded && type === 'standard'" :src="imageElement">
        <div v-else-if="pending" class="uk-background-cover">
            <slot></slot>
        </div>
    </div>
</template>
<script>

    //import PreLoader from "../Proxy/PreLoader";

    export default {
        //components: {PreLoader},
        props: {
            type: {
                default: 'standard',
                type: String
            },
            src: {
                default: '',
                type: String
            },
            useFallback: {
                default: true,
                type: Boolean
            }
        },

        data() {
            return {
                pending: true,
                loaded: false,
                imageElement: '',
                imageStyles: '',
                four04: false,
                fallBackImage: Vuew.config.customLogo,
                useInternalFallback: false
            };
        },

        mounted: function () {
            const vm = this;
            vm.$nextTick( function () {
                if ( vm.loaded || vm.isInView(vm.$el) ) {
                    vm.getImage(vm);
                }else{
                    window.addEventListener( 'scroll', vm.handleScroll );
                }
            });
        },

        /*watch: {
            loaded: function (v) {
                if(v){
                    window.removeEventListener( 'scroll', this.handleScroll );
                }
            }
        },*/

        destroyed: function () {
            window.removeEventListener( 'scroll', this.handleScroll );
        },

        methods: {
            handleScroll: function () {
                if( this.loaded || this.isInView(this.$el) ) {
                    this.getImage(this);
                }
            },
            isInView: (el) => {
                const rect = el.getBoundingClientRect();
                const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

                return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
            },
            getImage: (vm) => {

                window.removeEventListener( 'scroll', vm.handleScroll );

                const src = vm.src;

                vm.imageElement = '';
                vm.loaded = vm.pending = false;

                let imageCache = vm.$store.getters['cache/imageCached'](src);

                /**
                 * Image cache exist ?
                 */
                if (false !== imageCache) {
                    if (404 === imageCache.code) {
                        vm.four04 = true;
                    }
                    if (200 === imageCache.code) {
                        if (vm.type === 'background') {
                            vm.imageStyles = 'background-image: url(' + src + ');';
                        } else {
                            vm.imageElement = src;
                        }
                    }

                    vm.loaded = true;
                    return;
                }

                if ('' === src) {

                    if (vm.useFallback) {

                        if( ! vm.fallBackImage ){
                            vm.useInternalFallback = true;
                            vm.pending = false;
                            vm.loaded = true;
                            return;
                        }

                        if (vm.type === 'background') {
                            vm.imageStyles = 'background-image: url(' + vm.fallBackImage + ');';
                        } else {
                            vm.imageElement = vm.fallBackImage;
                        }

                    }

                    vm.pending = false;
                    vm.loaded = true;
                    return;
                }

                vm.pending = true;
                const image = new Image();

                image.onload = function () {

                    if ('naturalHeight' in this) {
                        if (this.naturalHeight + this.naturalWidth === 0) {
                            this.onerror();
                            return;
                        }
                    } else if ((this.width + this.height) === 0) {
                        this.onerror();
                        return;
                    }

                    vm.$nextTick(function () {
                        if (vm.type === 'background') {
                            vm.imageStyles = 'background-image: url(' + src + ');';
                        } else {
                            vm.imageElement = src;
                        }
                        if( ! vm.$store.getters['cache/imageCached'](src) )
                            vm.$store.dispatch('cache/addImagePath', {src: src, code: 200}, {root: true});
                        vm.pending = false;
                        vm.loaded = true;
                    });

                };

                image.onerror = function (e) {
                    console.error("Image load ERROR", e);
                    if( ! vm.$store.getters['cache/imageCached'](src) )
                        vm.$store.dispatch('cache/addImagePath', {src: src, code: 404}, {root: true});
                    vm.four04 = true;
                    vm.loaded = true;
                    vm.pending = false;
                };
                image.src = src;

            }
        }

    };
</script>