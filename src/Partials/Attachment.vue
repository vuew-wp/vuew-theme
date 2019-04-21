<template>
    <div class="uk-position-relative">
        <div v-if="inView">

            <div v-if="!getSource && four04" v-html="require( '../svg/image-404.svg' )"
                 class="uk-background-cover uk-position-cover">
                <slot></slot>
            </div>

            <div v-else-if="getSource && loaded && type === 'background'" class="uk-background-cover uk-position-cover"
                 :style="{ 'background-image': 'url(' + getSource + ')' }">
                <slot></slot>
            </div>

            <img v-else-if="getSource && loaded && type === 'standard'" :src="getSource">

            <div v-else-if="!getSource && useInternalFallback"
                 class="uk-background-cover uk-position-cover">
                <div class="uk-background-cover uk-position-cover uk-overflow-hidden" v-html="require( '../svg/vuew-logo.svg' )"></div>
                <slot></slot>
            </div>

            <div v-else-if="pending" class="uk-position-cover vw-attachment-loader">
                <div v-html="require( '../svg/loader.svg' )"></div>
                <slot></slot>
            </div>

        </div>
    </div>
</template>
<script>

    import inView from '../mixins/inView'
  export default {
    //components: {PreLoader},
    mixins: [inView],
    props: {
      type: {
        default: 'standard',
        type: String
      },
      src: {
        default: '',
        type: String
      },
      useFallback: {
        default: true,
        type: Boolean
      }
    },
    data() {
      return {
        loaded: false,
        four04: false,
        inView: false,
        pending: true,
        fallBackImage: Vuew.config.customLogo,
        useInternalFallback: false
      };
    },

    mounted: function () {
      const vm = this;
      const cacheExists = vm.$store.getters['cache/imageCached'](vm.src);
      const routeTransitionDelay = vm.$store.getters['isFirstLoad'] ? 0 : Vuew.config.transitions.main;
      if (cacheExists) {
        vm.inView = true;
      }
      setTimeout(function () {
        if (vm.isInView(vm.$el)) {
          vm.inView = true;
        } else {
          window.addEventListener('scroll', vm.handleScroll);
        }
      }, routeTransitionDelay);
    },

    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);
    },

    computed: {
      getSource() {
        return this.getImage();
      }
    },

    methods: {
      handleScroll: function () {
        this.inView = this.isInView(this.$el);
      },
      isInView: (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
      },
      getImage: function () {

        const vm = this;

        window.removeEventListener('scroll', vm.handleScroll);

        const src = vm.src;
        const imageCache = vm.$store.getters['cache/imageCached'](src);

        vm.loaded = vm.pending = false;

        /**
         * Image cache exist ?
         */
        if (false !== imageCache) {
          vm.loaded = true;
          if (404 === imageCache.code) {
            vm.four04 = true;
          }
          if (200 === imageCache.code) {
            return src;
          }
          return false;
        }

        if ('' === src) {

          if (vm.useFallback) {

            if (!vm.fallBackImage) {
              vm.useInternalFallback = true;
              vm.loaded = true;
            }

            return vm.fallBackImage;

          }
          vm.loaded = true;
          return false;

        }

        vm.pending = true;
        const image = new Image();

        image.onload = function () {

          if ('naturalHeight' in this) {
            if (this.naturalHeight + this.naturalWidth === 0) {
              this.onerror();
              return;
            }
          } else if ((this.width + this.height) === 0) {
            this.onerror();
            return;
          }

          vm.$nextTick(function () {
            if (!vm.$store.getters['cache/imageCached'](src)) {
              vm.$store.dispatch('cache/addImagePath', {
                src: src,
                code: 200
              }, { root: true });
            }
            vm.loaded = true;
            vm.pending = false;
            return src;
          });

        };

        image.onerror = function (e) {
          console.error('Image load ERROR', e);
          if (!vm.$store.getters['cache/imageCached'](src)) {
            vm.$store.dispatch('cache/addImagePath', {
              src: src,
              code: 404
            }, { root: true });
          }

          vm.four04 = true;

          vm.loaded = true;
          vm.pending = false;
          return false;
        };
        image.src = src;

      }
    }

  };
</script>
