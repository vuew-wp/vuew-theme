<template>
    <div v-if="getComponents" class="vw-above-the-fold">
        <component v-for="component in getComponents" :key="component.name + query.type" :is="component.name"
                   :posts="component.posts" :title="component.title" :excerpt="component.excerpt" :options="component.options">
        </component>
    </div>
</template>

<script>

	/** Post List(s) */
	import PostList from "../Partials/PostList/PostList";
	import PostListThumbnail from "../Partials/PostList/PostListThumbnail";
	import PostListOverflow from "../Partials/PostList/PostListOverflow";
	import PostListSlider from "../Partials/PostList/PostListSlider";

	/** Mixins */
	import mixins from '../mixins/mixins';

	export default {
		name: "AboveTheFold",
		components: {
			PostList,
			PostListOverflow,
			PostListThumbnail,
			PostListSlider,
		},
		props: [
			'query'
		],
        data(){
			return {

            }
        },
		mixins: [ mixins.loop ],
        computed: {
			getComponents(){

				let components = Vuew.config.layout.archives[ this.query.type ];

				components = components.hasOwnProperty( 'atf' ) ? components.atf : false;

				if( false === components )
					return false;

				let offset = 0;

				for( let i = 0, m = components.length; i < m; i++ ){
                    let paths = this.query.payload.post_paths;
                    let posts = paths.slice( offset, offset + components[i].postsPerComponent );
					components[i].posts = this.getPostsFromPaths( posts );
					offset = components[i].postsPerComponent;
				}

				return components;

            },
			getPostListData(){
				return this.query;
            }
        }
	}
</script>
