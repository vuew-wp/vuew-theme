<template>
    <i v-if="four04" v-html="require( '../svg/image-404.svg' )"></i>
    <div v-else-if="loaded && type === 'background'" class="uk-background-cover"
         :style="imageStyles">
        <slot></slot>
    </div>
    <img v-else-if="loaded && type === 'standard'" :src="imageElement">
    <pre-loader v-else-if="pending" class="uk-background-cover"></pre-loader>
</template>
<script>

    import PreLoader from "../Proxy/PreLoader";
    export default {
        components: {PreLoader},
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
                loaded : false,
                imageElement: '',
                imageStyles: '',
                four04: false,
                fallBackImage: Vuew.config.customLogo
            };
        },

        mounted: function () {
            this.getImage( this );
        },

        watch:{
            src:function(){
                this.getImage( this );
            }
        },

        methods: {
            getImage: ( vm ) => {

                const src = vm.src;

                vm.imageElement  = '';
                vm.loaded       = vm.pending = false;

                if ( '' === src ) {

                    if( vm.useFallback ){

                        if( vm.type === 'background' ){
                            vm.imageStyles = 'background-image: url(' + vm.fallBackImage + ');';
                        }else{
                            vm.imageElement = vm.fallBackImage;
                        }

                    }

                    vm.pending = false;
                    vm.loaded = true;

                    return;
                }

                vm.pending = true;

                const imageCache = vm.$store.getters[ 'cache/imageCached' ]( src );

                /**
                 * Image cache exist ?
                 */
                if( false !== imageCache ) {
                    if( 404 === imageCache.code  ){
                        vm.four04 = true;
                    }
                    if( 200 === imageCache.code ) {
                        if (vm.type === 'background') {
                            vm.imageStyles = 'background-image: url(' + src + ');';
                        } else {
                            vm.imageElement = src;
                        }
                    }

                    vm.pending = false;
                    vm.loaded = true;

                    return;
                }

                const image = new Image();

                image.onload = function () {

                    if ('naturalHeight' in this) {
                        if (this.naturalHeight + this.naturalWidth === 0) {
                            this.onerror();
                            return;
                        }
                    } else if ( (this.width + this.height ) === 0) {
                        this.onerror();
                        return;
                    }

                    vm.$nextTick( function () {
                        if( vm.type === 'background' ){
                            vm.imageStyles = 'background-image: url(' + src + ');';
                        } else {
                            vm.imageElement = src;
                        }
                        vm.$store.dispatch( 'cache/addImagePath', { src: src, code: 200 }, { root:true } );
                        vm.pending = false;
                        vm.loaded = true;
                    });

                };

                image.onerror = function ( e ) {
                    console.error("Image load ERROR", e);
                    vm.$store.dispatch( 'cache/addImagePath', { src: src, code: 404 }, { root:true } );
                    vm.four04 = true;
                    vm.loaded = true;
                    vm.pending = false;
                };

                image.src = src;

            }
        }

    };
</script>