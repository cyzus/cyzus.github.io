module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'iOS >= 10',
        'Safari >= 10',
        'not dead'
      ]
    })
  ]
};
