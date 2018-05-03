<template>
    <div v-if="queryData">
        <h1>HOME</h1>
        <h1>{{ queryData.title }}</h1>
        <div class="uk-block" v-html="queryData.content"></div>
    </div>
</template>

<script>
    export default {

        props:[
            'queryData',
        ],

        data(){
            return {
                loaded:false,
                title: 'Loading...',
            }
        }

    };
</script>
