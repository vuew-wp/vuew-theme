<template>
    <h3 v-html="theTitle"></h3>
</template>

<script>

    export default {

        props: [
            'theTitle'
        ]

    };
</script>
