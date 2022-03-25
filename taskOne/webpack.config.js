const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/index.jsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    devServer: {
        port: 3000
    },
    module: {
		rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:["@babel/preset-env"]
                    }
                },
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:["@babel/preset-react", "@babel/preset-env"]
                    },
                },
            },
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpg|jpeg|pnh|svg)/,
                use: ['file-loader']
            }
        ]
	},
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
    },
	plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
	]
}