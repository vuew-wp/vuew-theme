<template>
    <div  class="uk-grid uk-grid-collapse">

        <PostVuew v-if="index <= offset" v-for="( post, index ) in getPosts" :key="post.path" :post="post" :columns="columns" />

        <Pagination class="uk-grid uk-grid-collapse uk-width-1-1 uk-padding-remove uk-margin-remove" :posts="getPosts" type="LoadMore" :post-count="queryData.post_count" :found-posts="queryData.found_posts" :columns="columns" :offset="offset" elem-type="PostVuew"/>

    </div>
</template>

<script>

    import Loop from "./Loop";
    import Pagination from "../Pagination/Pagination";
    import PostVuew from "./PostVuew";

    export default {
        extends: Loop,
        components:{
            Pagination,
            PostVuew
        },
    };

</script>
