/**
 * WebPack Common
 * @type {webpack}
 */
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const nodeExternals = require('webpack-node-externals');

const featureFlagsPlugin = new webpack.DefinePlugin({
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
});

module.exports = {
  mode: 'production',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.vue', '.scss'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      /** VUE */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      /** JS/JSX */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      /** ESLint */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      /** Images */
      {
        test: /\.(png|ico|gif|svg|jpe?g)(\?[a-z0-9]+)?$/,
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
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), featureFlagsPlugin],
};
