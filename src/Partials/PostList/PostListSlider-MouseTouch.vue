<template>
    <div class="vw-slider-post"

         v-on:mouseup="mouseUp"
         v-on:mousedown="mouseDown"
         v-on:mousemove.prevent="mouseMove"
         v-on:mouseleave="mouseLeave"

         v-on:touchstart="onTouchStart"
         v-on:touchend="onTouchEnd"
         v-on:touchleave="onTouchEnd"

         v-on:scroll.passive="onScroll"

         :class="{active: isDown}"
    >

            <div v-for="(post, i) in posts" :key="post.path" class="vw-slider-post__slide" :style="{ width: getSlideWidth + 'vw' }" ref="postSlide">
                <!--<router-link :to="setMenuItemParams( post )" class="uk-display-block">-->
                <attachment :src="post.featured_media.thumbnail" :type="'background'"
                            style="padding-bottom: 80%; background-color: #444;"
                            class="uk-width-1-1 uk-position-relative">
                    <div class="vw-slider-post__title">
                        <h2 v-html="post.title" style="color: #ffffff;" class="uk-margin-remove"></h2>
                    </div>
                </attachment>
                <!--</router-link>-->
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

        currentSlide: 0,

        isDown: false,
        slider: null,
        startX: null,
        containerWidth: window.innerWidth,

      }
    },
    mounted() {
      this.slider = this.$el;
      this.containerWidth = this.$el.scrollWidth;
    },
    computed: {
      getSlideWidth() {
        return this.options.slideWidth.m;
      }
    },
    methods: {
      /**
       * MOUSE
       */
      mouseUp() {
        this.isDown = false;
        if(!this.isScrolling){
          this.snapSlide(this, this.$el);
        }
      },
      mouseLeave() {
        this.isDown = false;
        if(!this.isScrolling){
          this.snapSlide(this, this.$el);
        }
      },
      mouseDown(e) {
        this.isDown = true;
        this.startX = e.pageX - this.slider.offsetLeft;
        this.scrollLeft = this.slider.scrollLeft;
      },
      mouseMove(e) {
        if(!this.isDown) return;
        const x = e.pageX - this.slider.offsetLeft;
        const walk = (x - this.startX) * 3;
        this.slider.scrollLeft = this.scrollLeft - walk;
      },

      /**
       * SNAP SLIDE
       * @param vm
       * @param el
       */
      snapSlide: (vm, el) => {

        vm.isScrolling = false;
        const slideWidth    = Math.floor(vm.containerWidth / vm.count);
        const currentSlide  = (el.scrollLeft / slideWidth).toFixed();

        vm.$el.style.scrollBehavior = 'smooth';
        vm.$el.scrollLeft = currentSlide * slideWidth;
        vm.$el.style.scrollBehavior = 'auto';

      },
      onScroll() {

        const vm = this;
        vm.isScrolling = true;

        if(this.isDown){
          return;
        }

        if (vm.timer) {
          clearTimeout(vm.timer);
          vm.isScrolling = false;
        }

        vm.timer = setTimeout(function () {
          vm.timer = null;
          vm.snapSlide(vm, vm.$el);
          vm.isScrolling = false;
        }, 100);
      },

      onTouchStart() {
        this.isDown = true;
      },
      onTouchEnd() {
        this.isDown = false;
        if(!this.isScrolling){
          this.snapSlide(this, this.$el);
        }
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
        transition: all 0.2s;
        will-change: transform;
        user-select: none;
        cursor: pointer;

        &.active{
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
            background-color: rgba(0,0,0,0.7);
            right: 0;
            left: 0;
            white-space: normal
        }
    }
</style>
