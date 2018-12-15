<template>
    <div class="uk-overflow-auto" style="white-space: nowrap">
        <div v-for="post in posts" :key="post.path" class="uk-display-inline-block" style="display: inline-block; width: 90vw;">
            <router-link :to="setMenuItemParams( post )">
                <attachment :src="post.featured_media.thumbnail" :type="'background'" style="padding-bottom: 80%; background-color: #444;" class="uk-width-1-1 uk-position-relative">
                    <div style="position: absolute;bottom: 0;padding: 20px; color: #eaeaea; background-color: rgba(0,0,0,0.7); right: 0; left: 0; white-space: normal">
                        <h2 v-html="post.title" style="color: #ffffff;" class="uk-margin-remove"></h2>
                    </div>
                </attachment>
            </router-link>
        </div>
    </div>
</template>

<script>

	import PostList from "./PostList";

	export default {
		name: "PostListOverflow",
		extends: PostList
	}
</script>