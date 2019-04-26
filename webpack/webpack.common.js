/**
 * WebPack Common
 * @type {webpack}
 */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const featureFlagsPlugin = new webpack.DefinePlugin({
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  VUEW_DEBUG: JSON.stringify(process.env.VUEW_DEBUG),
});

module.exports = new Promise((resolve, reject) => {
  resolve({
    entry: {
      main: './src/main.js',
      blocks: './src/wpBlocks/index.jsx',
    },
    output: {
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.vue', '.scss', '.pug', '.html'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    module: {
      rules: [
        /** HTML */
        {
          test: /\.html$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
              },
            },
          ],
        },
        /** VUE */
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        /** JS/JSX */
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
        },
        /** ESLint */
        {
          test: /\.js$/,
          use: ['babel-loader', 'eslint-loader'],
        },
        /** SVG */
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
        /** Images */
        {
          test: /\.(png|ico|gif|jpe?g)(\?[a-z0-9]+)?$/,
          exclude: /node_modules/,
          loader: 'url-loader',
          options: {
            limit: 1000 /** Bytes */,
          },
        },
        /** Fonts */
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          exclude: /node_modules/,
          use: ['url-loader'],
        },
        /** Images */
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
        {
          test: /\.css$/,
          use: 'css-loader',
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(['dist']),
      featureFlagsPlugin,
    ],
  });
});
