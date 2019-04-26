/**
 * WebPack Dev
 */
const path = require('path');

/** Config commons */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

/** Custom constants */
const publicPath = 'http://localhost:4000/dist/';

module.exports = new Promise(resolve => {
  common
    .then(data => {
      resolve(
        merge(data, {
          mode: 'development',
          output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath,
          },
          devServer: {
            /** Required for HMR */
            publicPath,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            contentBase: path.join(__dirname, '../dist'),
            port: 4000,
            // sockPath: 'http://localhost:4000/sockjs-node',
            // hotOnly: true,
            inline: true,
            disableHostCheck: true,
            // host: '0.0.0.0', // For Mac user(s) with Parallels
          },
          devtool: '#eval-source-map',
          module: {
            rules: [
              /** SASS/CSS */
              {
                test: /\.less$/,
                use: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                  {
                    loader: 'less-loader',
                    options: {
                      includePaths: ['./node_modules'],
                      sourceMap: true,
                    },
                  },
                ],
              },
            ],
          },
        }),
      );
    })
    .catch(e => console.log(e));
});
