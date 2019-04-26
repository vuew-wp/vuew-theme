/* eslint-disable */
export default {
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    if (typeof window.IntersectionObserver === 'function') {
      const config = {
        root: null, // avoiding 'root' or setting it to 'null' sets it to default value: viewport
        rootMargin: '0px',
        threshold: 0,
      };
      let isLeaving = false;
      this.observer = new IntersectionObserver((entries, SELF) => {
        entries.forEach(entry => {
          /*console.log('entrie: ', entries);
          console.log('SelF: ', SELF);*/
          if (entry.isIntersecting) {
            // we are ENTERING the "capturing frame". Set the flag.
            isLeaving = true;
            // Do something with entering entry
          } else if (isLeaving) {
            // we are EXITING the "capturing frame"
            isLeaving = false;
            // Do something with exiting entry
          }
        });
      }, config);
      this.observer.observe(this.$el);
    }
  },
  methods: {},
};
