/* eslint-disable */
import _ from 'lodash';

export default {
  anchor: {
    methods: {
      setMenuItemParams(post) {
        const vm = post.route;
        const type = vm.type;
        const type_value = vm.type_value;
        const breadcrumbs = vm.breadcrumbs;
        const base = breadcrumbs.length > 0 ? breadcrumbs[0] : '';

        const menu = {
          name: type,
          params: {
            base,
            type,
            id: post.id,
            type_value,
            rest_base: vm.rest_base,
          },
        };

        for (let i = 1, m = breadcrumbs.length; i < m; i++) {
          menu.params[`slug${i}`] = breadcrumbs[i];
        }

        return menu;
      },
    },
  },
  text: {
    methods: {
      truncate(string, count = 5, sliceFrom = 'start') {
        if (!string) return '';

        let stringPieces = string.split(' ');

        if (count > stringPieces.length) {
          return string;
        }

        if (sliceFrom === 'start') {
          stringPieces = stringPieces.slice(0, count);
          return `${stringPieces.join(' ')}...`;
        }
        if (sliceFrom === 'end') {
          stringPieces = stringPieces.slice(count, count + count);
          return stringPieces.join(' ');
        }

        return 'Cannot truncate text';
      },
      appendToText(
        text = null,
        appendText = '',
        appendStartElem = '',
        appendEndElem = '',
      ) {
        if (text === null) {
          console.error(
            'at least one argument is required by appendToText() method for ',
            this,
          );
          return '';
        }
        if (appendText === '') {
          return text;
        }

        return appendStartElem + appendText + appendEndElem + text;
      },
    },
  },
  loop: {
    methods: {
      getPostsFromPaths(postPaths) {
        if (!postPaths) {
          return {};
        }

        const postList = this.$store.getters['cache/getPostsCache'];
        const postsToDisplay = {};

        for (let i = 0, m = postPaths.length; i < m; i++) {
          postsToDisplay[i] = postList[postPaths[i]];
        }

        return postsToDisplay;
      },
    },
    computed: {
      queryData() {
        if (!this.query) {
          return {};
        }

        if (this.query.type === 'four04') {
          return this.query.path;
        }
        return this.getPostsFromPaths(this.query);
      },
    },
  },
  inViewPort: {
    mounted() {
      const vm = this;
      const delay = vm.$store.getters.isFirstLoad
        ? 0
        : Vuew.config.transitions.main;
      setTimeout(function() {
        if (vm.isComponentInViewport(vm.$el)) {
          vm.inView = true;
          vm.inViewPort();
        } else {
          window.addEventListener('scroll', vm.windowScroll);
        }
      }, delay);
    },
    data() {
      return {
        inView: false,
        throttle: 100,
      };
    },
    destroyed() {
      window.removeEventListener('scroll', this.windowScroll);
    },
    methods: {
      windowScroll: _.throttle(function() {
        this.inView = this.isComponentInViewport(this.$el);
        if (this.inView) {
          window.removeEventListener('scroll', this.windowScroll);
          this.inViewPort();
        }
      }, 100),
      isComponentInViewport: el => {
        const rect = el.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight && rect.top + rect.height >= 0;
      },
      inViewPort() {
        console.log.error(
          'This should be overridden using inViewPort() method.',
        );
      },
    },
  },
  viewPort: {
    methods: {
      // noinspection BadExpressionStatementJS
      componentInView: el => {
        const rect = el.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight && rect.top + rect.height >= 0;
      },
    },
  },
};
