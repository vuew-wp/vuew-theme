<template>
    <div v-if="queryData">
        <h1>Latest Posts</h1>
        <Loop :query-data="queryData.payload"></Loop>
    </div>
</template>

<script>
    import Archive from "../Archive/Archive";

    export default {
        extends : Archive
    };
</script>
