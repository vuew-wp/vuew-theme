<template>
    <div class="uk-container uk-margin-top">
        <h2 v-if="title" v-html="title + ':'" class="uk-heading-divider"></h2>
        <ul class="uk-list uk-list-divider">
            <li v-for="post in posts" :key="post.path">
                <router-link :to="setMenuItemParams( post )">
                    <h4 v-html="post.title" class="uk-h3"></h4>
                    <p v-if="excerpt" v-html="post.excerpt"></p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

	import Attachment from "../Attachment";
	import mixins from '../../mixins/mixins';

	export default {
		name: "PostList",
		components: {
			Attachment
		},
        mounted(){
			this.count = Object.keys(this.posts).length;
        },
		props: [
			'posts',
            'title',
            'excerpt',
            'options',
		],
		data() {
			return {
				count: 0
			}
		},
		mixins: [ mixins.anchor, mixins.text, mixins.viewPort  ]
	}
</script>
