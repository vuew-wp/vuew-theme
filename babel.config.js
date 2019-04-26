module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'entry',
        corejs: 2,
        targets: {
          browsers: ['ie >= 11'],
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-transform-spread'],
    ['@babel/plugin-transform-destructuring'],
  ],
};
