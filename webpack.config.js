const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const styleLoaders = {
    css: ["vue-style-loader", "css-loader"],
    less: ["vue-style-loader", "css-loader", "less-loader"]
};

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

if (isProduction) {

    for (let key in styleLoaders) {
        let fallback = styleLoaders[key].shift();
        styleLoaders[key] = ExtractTextPlugin.extract({
            use: styleLoaders[key],
            fallback: fallback
        });
    }

}


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'https://localhost:8080/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: styleLoaders.css
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: process.env.NODE_ENV === "development"
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: process.env.NODE_ENV === "development"
                            }
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                }),
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|includes)/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },

        inline: true,

        https: true,
        cert: fs.readFileSync('./ssl/localhost.cert'),
        key: fs.readFileSync('./ssl/localhost.key')
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        // Some other plugins
        new webpack.DefinePlugin({
            VUEW_DEBUG: JSON.stringify(process.env.VUEW_DEBUG),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        extractLess
    ]
};

if (isProduction) {

    module.exports.devtool = '#source-map';

    //module.exports.plugins.push( extractLess );

    module.exports.output.publicPath = './wp-content/themes/vuew/assets/';

    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin(),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, './node_modules')
                    ) === 0
                )
            }
        })
    ])
}