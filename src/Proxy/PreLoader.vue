<template>
    <div class="uk-position-relative">
        <div class="uk-position-center">
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