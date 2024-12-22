// webpack.common.js
"use strict";

const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PATHS = require("./paths");

const common = {
  output: {
    path: PATHS.build,
    filename: "[name].js",
  },
  stats: {
    all: false,
    errors: true,
    builtAt: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mjs"], // Add ".mjs" here
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/static",
          to: "./",
          globOptions: {
            ignore: ["**/*.map", "**/*.md", "**/compressed.tracemonkey-pldi-09.pdf"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};

module.exports = common;
