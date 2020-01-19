const Webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv").config({ path: path.join(__dirname, "/.env") });

module.exports = env => {
  return {
    mode: "production",
    entry: ["babel-polyfill", "./src/index.js"],
    resolve: {
      extensions: [".js", ".jsx", ".css"]
    },
    output: {
      path: path.join(__dirname, "/dist"),
      publicPath: env && env.REACT_APP_PUBLIC_PATH ? env.REACT_APP_PUBLIC_PATH : "/",
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/react"]
              }
            }
          ]
        },
        {
          test: /\.module\.css$/,
          loader: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[name]_[local]__[hash:base64:5]",
                camelCase: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: /\.module.css$/,
          loader: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|gif|svg|jpe?g)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name]_[hash:5].[ext]"
              }
            },
            "img-loader"
          ]
        },
        {
          test: /\.(woff|eot|ttf|woff2|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[name]_[hash:5].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new Webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parsed),
        "process.env.REACT_APP_BUILD": JSON.stringify(env && env.REACT_APP_BUILD ? env.REACT_APP_BUILD : "local"),
        "process.env.REACT_APP_PUBLIC_PATH": JSON.stringify(env && env.REACT_APP_PUBLIC_PATH ? env.REACT_APP_PUBLIC_PATH : "/")
      }),
      new HtmlWebpackPlugin({
        favicon: "public/favicon.ico",
        template: "public/index.html",
        env: process.env
      }),
      new Webpack.optimize.OccurrenceOrderPlugin(),
      new MiniCssExtractPlugin({
        filename: "index.js.css"
      })
    ]
  };
};
