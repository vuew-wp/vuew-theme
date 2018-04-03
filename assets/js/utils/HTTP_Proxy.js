import axios from 'axios';

export const HTTP_Proxy = axios.create( {
    baseURL: VuewConfig.root,
    headers: { 'X-WP-Nonce': VuewConfig.nonce }
} );
