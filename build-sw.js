const { generateSW } = require('workbox-build');
const workboxConfig = require('./workbox-config.js');

console.log('Generating service worker...');

generateSW(workboxConfig).then(({count, size, warnings}) => {
  // In case there are any warnings from workbox-build, log them.
  warnings.forEach(console.warn);
  console.log(`${count} files will be precached, totaling ${size} bytes.`);
  console.log('Service worker generated successfully.');
}).catch(error => {
  console.error('Service worker generation failed:', error);
});
