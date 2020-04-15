/* eslint-disable global-require */
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
      importFrom: ['./src/styles/variables.css'],
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
