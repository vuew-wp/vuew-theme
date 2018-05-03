<template>
    <h3 v-html="theTitle" class="uk-card-title"></h3>
</template>

<script>

    export default {

        props: [
            'theTitle'
        ]

    };
</script>
