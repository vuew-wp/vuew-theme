importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

workbox.core.setCacheNameDetails({
  prefix: 'vw-sw-cache-v1'
});

/**
 * CSS, scripts and images from the assets directory.
 */
workbox.routing.registerRoute(/wp-content\/themes\/vuew\/dist\/.+/, workbox.strategies.cacheFirst());

/**
 * CSS, scripts and images from the assets directory.
 */
workbox.routing.registerRoute(/wp-content\/uploads\/.+/, workbox.strategies.cacheFirst());

/**
 * Cache the homepage.
 */
workbox.routing.registerRoute('/', workbox.strategies.staleWhileRevalidate());

/**
 * Cache the response from the JSON API
 */
workbox.routing.registerRoute(/wp-json\/wp\/v2\/.+/, workbox.strategies.networkFirst());
