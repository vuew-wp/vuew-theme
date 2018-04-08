import axios from 'axios';

export const HTTP = axios.create( {
    baseURL: Vuew.rest_root + 'wp/v2/',
    headers: { 'X-WP-Nonce': Vuew.nonce }
} );
