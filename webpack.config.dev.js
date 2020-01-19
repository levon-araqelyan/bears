const Webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const dotenv = require("dotenv").config({ path: path.join(__dirname, "/.env") });

module.exports = env => {
  return {
    mode: "development",
    devtool: "source-map",
    entry: ["babel-polyfill", "./src/index.js"],
    resolve: {
      extensions: [".js", ".jsx", ".css"],
      symlinks: true
    },
    output: {
      path: path.join(__dirname, "/dist"),
      publicPath: "/",
      filename: "bundle.js"
    },
    devServer: {
      port: 8092,
      contentBase: "./dist",
      hot: true,
      inline: true,
      progress: true,
      compress: true,
      overlay: false,
      historyApiFallback: {
        disableDotRule: true
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components|cwb-react-ui-kit)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/react"],
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: /\.module.css$/,
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
        template: "public/index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "index.css"
      }),
      new Webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({ url: "http://localhost:8092" })
    ]
  };
};
