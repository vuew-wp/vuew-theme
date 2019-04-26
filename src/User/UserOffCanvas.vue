<template>
  <off-canvas target="userOffCanvas">
    <user-registration v-if="!isUserLoggedIn" />
    <user-login v-if="!isUserLoggedIn" />
    <user-logout v-else></user-logout>
  </off-canvas>
</template>
<script>
import UserRegistration from './UserRegistration';
import OffCanvas from '../Partials/OffCanvas/OffCanvas';
import UserLogin from './UserLogin';
import UserLogout from './UserLogout';

export default {
  components: {
    UserLogout,
    UserLogin,
    OffCanvas,
    UserRegistration,
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters['user/getId'] > -1;
    },
  },
};
</script>
