<template>
    <div class="uk-position-cover" style="background: #111111;">
        <div class="triangle-wrapper uk-position-center">
            <div v-for="(n, index ) in 5" class="triangle" :class="'triangle-' + index">
                <i v-html="require( '../svg/triangle.svg' )"></i>
            </div>
            <p class="triangle-loading" v-html="loadingText"></p>
        </div>
    </div>
</template>
<script>
    export default {
        /*mounted: () => {
            console.log("Loading from REST")
        },*/
        props: {
            loadingText: {
                default: 'Loading',
                type: String
            },
        }
    }
</script>