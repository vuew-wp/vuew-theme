import axios from 'axios';

export const HTTP = axios.create({
  baseURL: Vuew.restRoot + 'wp/v2/',
  params: {
    vr: 1
  }
});

export const HTTP_Vuew = axios.create({
  baseURL: Vuew.restRoot + 'vuew/v2/',
  // headers: {'X-WP-Nonce': Vuew.nonces.wpRest},
  params: {
    vr: 1
  }
});
