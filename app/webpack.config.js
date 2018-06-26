const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./source/index.js", "react-hot-loader/patch"],
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
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "source/index.html" }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./build",
    hot: true
  }
};
