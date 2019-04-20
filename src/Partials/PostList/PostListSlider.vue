<template>
    <div style="white-space: nowrap; overflow: scroll; -webkit-overflow-scrolling: touch; scroll-behavior: smooth;"
         v-on:scroll.passive="onScroll"
    >
        <div
            :style="{ width: ( count * getSlideWidth ) + 'vw' }"
        >
            <div v-for="(post, i) in posts" :key="post.path" class="uk-position-relative"
                 style="display: inline-block;" :style="{ width: getSlideWidth + 'vw' }" ref="postSlide">
                <router-link :to="setMenuItemParams( post )" class="uk-display-block">
                    <attachment :src="post.featured_media.thumbnail" :type="'background'"
                                style="padding-bottom: 80%; background-color: #444;"
                                class="uk-width-1-1 uk-position-relative">
                        <div style="position: absolute;bottom: 0;padding: 20px; color: #eaeaea; background-color: rgba(0,0,0,0.7); right: 0; left: 0; white-space: normal">
                            <h2 v-html="post.title" style="color: #ffffff;" class="uk-margin-remove"></h2>
                        </div>
                    </attachment>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

	import PostList from "./PostList";

	export default {
		name: "PostListSlider",
		extends: PostList,
		computed: {
			getSlideWidth() {
				return this.options.slideWidth.m;
			}
		},
		methods: {
			onScroll( el ) {

				console.log("SCROLLING!");

				const vm = this;

				if( vm.timer ) {
					clearTimeout( vm.timer );
					console.log("setTimeout");
				}

				vm.timer = setTimeout( function () {
					vm.timer = null;
                    vm.snapSlide(vm, vm.$el);
				}, 66 );
			},
			onTouchStart() {
				this.isTouching = true;
			},
			onTouchEnd(el) {
				console.log("TOUCH END!");
				this.isTouching = false;
				/**
                 * Extra precaution
                 * If no scrolling as taken place.
				 */
				this.$el.scrollLeft = this.$el.scrollLeft + 1;
			},
			snapSlide:( vm, el ) => {

				const slideWidth = Math.floor( ( vm.windowWidth / 100 ) * vm.options.slideWidth.m );
				const currentSlide = ( el.scrollLeft / slideWidth ).toFixed();

				vm.$el.scrollLeft = currentSlide * slideWidth;

			}
		},
		data() {
			return {
				timer: null /*setTimeout( () => {} )*/,

                isTouching: false,
                isScrolling: false,

				stripLastPos: 0,

				currentSlide: 0,
				windowWidth: window.innerWidth,
			}
		},
	}

</script>
