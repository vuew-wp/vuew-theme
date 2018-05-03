import axios from 'axios';

export const HTTP = axios.create( {
    baseURL: Vuew.restRoot + 'wp/v2/',
    headers: { 'X-WP-Nonce': Vuew.nonce },
    params: {
        vq: 1
    }
} );
