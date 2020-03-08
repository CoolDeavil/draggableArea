const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

let dev_tools = '';
dev_tools = 'source-maps';

if(process.env.NODE_ENV === 'production') {
    module.exports = {
        plugins: [
            require('autoprefixer'),
            require('cssnano'),
        ]
    };
    dev_tools = 'source-maps'
}
const config = {
    entry: './assets/',
    entry_template: './assets/template/index.html',
    entry_scripts: './assets/js/',
    entry_styles: './assets/sass/',
    entry_images: './assets/images/',
    views: './assets/template/',

    output: './public',
    output_template: "./index.html",
};


const entries = ()=>{
    return {
        app: [
            './assets/js/main.js',
            './assets/scss/main.scss',
        ],

    }
};

module.exports = {
    context: path.resolve(__dirname, './'),
    devtool: dev_tools,
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader",
            // },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: '../images/',
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                            }
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: '../fonts/'
                        }
                    }
                ]
            },
        ]
    },
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 1000
    // },
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                sourceMap:true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            publicPath: '../',
            filename: "./css/[name].[hash].css",
            // filename: "./css/[name].min.css",
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new webpack.DefinePlugin({
            __GLOBALS__: JSON.stringify({
                style:'common',
                shopItems:[],
                GOOGLE_MAPS: 'api-key-from-google'
            })
        }),
        new HtmlWebPackPlugin({
          template: 'assets/template/index.html',
          filename: 'index.html',
          inject: 'head',
          tittle: 'ECMA6',
          data: 'some string data',
          language: 'en',
          minify: {
            removeComments: true,
            collapseWhitespace: true
          },
          'meta': {
            'theme-color': '#4285f4'
          }
        }),
        new WebpackNotifierPlugin({
            title: 'Micro PHP WebPack Ready',
            alwaysNotify: true,
            contentImage: path.join(__dirname, './public/favicon.ico')
        }),
        new CopyPlugin([
            {from: './assets/template/favicon.ico', to: path.resolve(__dirname, 'public/')},
        ]),
    ],
    entry: entries(),
    output: {
        path: path.resolve(__dirname, config.output),
        // filename: "./js/[name].min.js",
        filename: "./js/[name].[hash].js",
    },
    devServer: {
        contentBase: path.join(__dirname, config.output),
        compress: true,
        host: 'localhost',
        port: 3030,
        publicPath: 'http://localhost:3030/',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    performance: {
        hints: false
    }

};
