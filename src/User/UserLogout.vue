<template>
  <div class="uk-padding-large">
    <h3 class="uk-h3" v-html="'Logout'"></h3>
    <p v-html="status"></p>
    <button @click="logUserOut">Logout</button>
  </div>
</template>
<script>
import { HTTP_Vuew } from '../common/http_proxy';

export default {
  name: 'UserLogout',
  data() {
    return {
      status: '',
    };
  },
  methods: {
    logUserOut(params) {
      this.status = 'Submitting info...';
      params['nonce'] = this.$store.getters['user/getNonce']('userAuth');
      HTTP_Vuew.post('user/logout', params, {
        headers: {
          'X-WP-Nonce': this.$store.getters['user/getNonce']('wpRest'),
        },
      })
        .then(response => {
          this.status = response.data.message.text;
          this.$store.dispatch(
            'user/updateUserId',
            response.data.message.userId,
          );
          this.$store.dispatch('user/updateNonce', {
            name: 'wpRest',
            nonce: response.data.message.wpRest,
          });
          this.$store.dispatch('user/updateNonce', {
            name: 'userAuth',
            nonce: response.data.message.userAuth,
          });
        })
        .catch(error => {
          this.handleError(error.response.data);
        });
    },
    handleError(data) {
      console.log(data);
      this.status = data.message;
    },
  },
};
</script>
