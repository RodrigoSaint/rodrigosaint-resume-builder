const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./app/client.js", "react-hot-loader/patch"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          presets: ["stage-2", "react"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "app/index.html" }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./build",
    hot: true
  }
};
