<template>
    <div class="uk-container uk-margin-top">
        <h2 v-if="title" v-html="title"></h2>
        <ul class="uk-list">
            <li v-for="post in posts" :key="post.path">
                <router-link :to="setMenuItemParams( post )">
                    <attachment :src="post.featured_media.thumbnail" style="max-width: 50px;" class="uk-float-left uk-margin-right"></attachment>
                    <span v-html="post.title"></span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

	import PostList from "./PostList";

	export default {
		name: "PostListThumbnail",
		extends: PostList
	}
</script>