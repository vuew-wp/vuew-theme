/* eslint-disable no-console */

/** Generic */
const webpack = require('webpack');
const glob = require('glob-all');
const path = require('path');

/** Config commons */
const merge = require('webpack-merge');

/** Plugins */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = new Promise(resolve => {
  common
    .then(data => {
      resolve(
        merge(data, {
          mode: 'production',
          output: {
            publicPath: '/wp-content/themes/vuew/dist/',
            path: path.resolve(__dirname, '../dist'),
          },
          devtool: '(none)',
          module: {
            rules: [
              /** SASS */
              {
                test: /\.less$/,
                use: [
                  'vue-style-loader',
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                  {
                    loader: 'less-loader',
                    options: {
                      includePaths: ['./node_modules'],
                      sourceMap: true,
                    },
                  },
                ],
              },
              {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                ],
              },
            ],
          },
          optimization: {
            minimizer: [
              new UglifyJsPlugin({
                cache: true,
                parallel: true,
              }),
              new OptimizeCSSAssetsPlugin({}),
            ],
            splitChunks: {
              cacheGroups: {
                default: false,
                common: {
                  name: 'common',
                  minChunks: 2,
                  chunks: 'async',
                  priority: 10,
                  reuseExistingChunk: true,
                  enforce: true,
                },
                vendors: {
                  reuseExistingChunk: true,
                },
              },
            },
          },
          plugins: [
            new MiniCssExtractPlugin({
              filename: '[name].css',
              chunkFilename: '[id].css',
            }),
            new PurgecssPlugin({
              paths: glob.sync([
                path.join(__dirname, 'index.html'),
                path.join(__dirname, '../src/**/*.js'),
                path.join(__dirname, '../src/**/*.vue'),
                path.join(__dirname, '../src/**/*.pug'),
              ]),
              whitelist: ['html'],
              whitelistPatterns: [/\bvw-off-canvas-.*?\b/],
            }),
          ],
        }), // eslint-disable-line comma-dangle
      );
    })
    .catch(e => console.log(e));
});
