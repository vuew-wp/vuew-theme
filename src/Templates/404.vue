<template>
    <div class="uk-container">
        <h1>404</h1>
        <div class="uk-width-1-1">URL: <strong>{{siteUrl + queryData.path}}</strong>, could not be resolved.</div>
        <!--<Search/>-->
    </div>
</template>

<script>

    //import Search from '../Partials/Search';

    export default {

        props: [
            'queryData'
        ],

        /*components: {
            Search
        },*/

        data(){
            return {
                loaded:false,
                siteUrl: Vuew.baseUrl,
            }
        }

    };
</script>
