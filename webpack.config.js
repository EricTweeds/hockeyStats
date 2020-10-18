const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
      }, {});
    
    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "webpack.bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'style-loader' },
                        { 
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: "[name]__[local]___[hash:base64:5]",
                                },														
                                sourceMap: true
                            }
                        },
                        { 
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    autoprefixer({})
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'url-loader?limit=10000&name=img/[name].[ext]'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html',
                filename: 'index.html',
                inject: 'body'
            }),
            new webpack.DefinePlugin(envKeys)
        ]
    }
}