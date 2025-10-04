module.exports = {
  globDirectory: '_site/',
  globPatterns: [
    '**/*.{html,js,css,png,jpg,jpeg,gif,ico,webp,svg,woff,woff2,ttf,eot}'
  ],
  swDest: '_site/sw.js',
  ignoreURLParametersMatching: [
    /^utm_/,
    /^fbclid$/
  ],
  // Define runtime caching rules.
  runtimeCaching: [{
    // Match any request that ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

    // Apply a cache-first strategy.
    handler: 'CacheFirst',

    options: {
      // Use a custom cache name.
      cacheName: 'images',

      // Purge cached entries once this limit is reached.
      expiration: {
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      },
    },
  },{
    // Match any request for CSS or JS files.
    urlPattern: /\.(?:js|css)$/,

    // Apply a stale-while-revalidate strategy.
    handler: 'StaleWhileRevalidate',

    options: {
      cacheName: 'static-resources',
    }
  }],
};
