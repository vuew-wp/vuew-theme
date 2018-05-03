<template>

    <div v-if="loaded && type === 'background'" class="uk-background-cover uk-position-cover"
         :style="imageStyles"></div>
    <img v-else-if="loaded && type === 'standard'" :src="loadedImage">
    <p v-else-if="pending">Loading...</p>

</template>
<script>

    export default {

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
                loadedImage: '',
                imageStyles: '',
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

                vm.loadedImage  = '';
                vm.loaded       = vm.pending = false;

                if ( '' === src ) {

                    if( vm.useFallback ){

                        vm.loadedImage = vm.fallBackImage;

                        vm.pending = false;
                        vm.loaded = true;

                        if( vm.type === 'background' ){
                            vm.imageStyles = 'background-image: url(' + vm.fallBackImage + ');';
                            return;
                        }

                    } else {
                        vm.pending = false;
                        vm.loaded = false;
                    }

                    return;
                }

                vm.pending = true;

                const image = new Image();

                image.onload = function () {

                    vm.$nextTick( function () {
                        if( vm.type === 'background' ){
                            vm.imageStyles = 'background-image: url(' + src + ');';
                        }
                        vm.loadedImage = src;
                        vm.pending = false;
                        vm.loaded = true;
                    });

                };

                image.onerror = function () {
                    console.error("Image load ERROR");
                    vm.pending = false;
                };

                image.src = src;

            }
        }

    };
</script>
