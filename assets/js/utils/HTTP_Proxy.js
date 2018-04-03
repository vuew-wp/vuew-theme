import axios from 'axios';

export const HTTP_Proxy = axios.create( {
    baseURL: VuewConfig.rest_root,
    headers: { 'X-WP-Nonce': VuewConfig.nonce }
} );
