<template>
    <div v-if="queryData">
        <h1 v-html="queryData.payload.name"></h1>
        <div class="uk-block" v-html="queryData.payload.description"></div>
        <Loop :query-data="queryData.payload"></Loop>
    </div>
</template>

<script>
    import Archive from "../Archive/Archive";

    export default {
        extends : Archive
    };
</script>
