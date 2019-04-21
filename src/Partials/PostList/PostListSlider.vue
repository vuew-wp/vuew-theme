<template>
    <div>
        <div class="vw-slider-post"

             v-on:mouseup="mouseUp"
             v-on:mousedown="mouseDown"
             v-on:mousemove.prevent="mouseMove"
             v-on:mouseleave="mouseLeave"

             v-on:touchstart="onTouchStart"
             v-on:touchend="onTouchEnd"
             v-on:touchleave="onTouchEnd"

             v-on:scroll.self.passive.stop="onScroll"

             ref="vwSlider"

             :class="{active: isDown}"
        >

            <div v-for="(post, i) in posts" :key="post.path" class="vw-slider-post__slide"
                 :style="{ width: options.slideWidth.m + 'vw' }" ref="postSlide">
                <router-link :to="setMenuItemParams( post )" class="uk-display-block">
                    <attachment :src="post.featured_media.thumbnail" :type="'background'"
                                style="padding-bottom: 80%; background-color: #444;"
                                class="uk-width-1-1 uk-position-relative">
                        <div class="vw-slider-post__title">
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
    data() {
      return {
        timer: null,

        isScrolling: false,
        isDown: false,

        slider: null,
        startX: null,
        containerWidth: window.innerWidth,

      }
    },
    mounted() {
      this.slider = this.$refs.vwSlider;
      this.containerWidth = this.slider.scrollWidth;
    },
    methods: {
      /**
       * MOUSE
       */
      mouseUp() {
        this.isDown = false;
        this.snapSlide(this);
      },
      mouseLeave() {
        this.isDown = false;
        this.snapSlide(this);
      },
      mouseDown(e) {
        this.isDown = true;
        this.startX = e.pageX - this.slider.offsetLeft;
        this.scrollLeft = this.slider.scrollLeft;
      },
      mouseMove(e) {
        if (!this.isDown) return;
        const x = e.pageX - this.slider.offsetLeft;
        const walk = (x - this.startX) * 3;
        this.slider.scrollLeft = this.scrollLeft - walk;
      },

      /**
       * SNAP SLIDE
       * @param vm
       * @param el
       */
      snapSlide(vm = this) {

        const slideWidth = Math.floor(vm.containerWidth / vm.count);
        const currentSlide = (vm.slider.scrollLeft / slideWidth).toFixed();

        vm.slider.style.scrollBehavior = 'smooth';
        vm.slider.scrollLeft = currentSlide * slideWidth;
        vm.slider.style.scrollBehavior = 'auto';

      },
      onScroll() {

        const vm = this;
        vm.isScrolling = true;

        if (vm.isDown) {
          return;
        }

        if (vm.timer) {
          clearTimeout(vm.timer);
        }

        vm.timer = setTimeout(function () {
          vm.timer = null;
          vm.snapSlide(vm);
          vm.isScrolling = false;
        }, 66);

      },

      onTouchStart() {
        this.isDown = true;
      },
      onTouchEnd() {
        this.isDown = false;
        if (this.isScrolling) {
          this.slider.scrollLeft += 1;
          return;
        }
        this.snapSlide(this);
      },
    }
  }

</script>
<style lang="less">
    .vw-slider-post {
        position: relative;
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        will-change: transform;
        user-select: none;
        cursor: pointer;

        &.active {
            cursor: grabbing;
            cursor: -webkit-grabbing;
        }

        &__slide {
            display: inline-block;
            position: relative;
        }

        &__title {
            position: absolute;
            bottom: 0;
            padding: 20px;
            color: #eaeaea;
            background-color: rgba(0, 0, 0, 0.7);
            right: 0;
            left: 0;
            white-space: normal
        }
    }
</style>
