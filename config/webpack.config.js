// webpack.config.js
"use strict";

const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common.js");
const ExtReloader = require("webpack-ext-reloader");
const glob = require("glob");
const path = require("path");

module.exports = (env, argv) => {
  console.log(argv.mode);
  return merge(common, {
    mode: argv.mode || "production",
    entry: glob.sync("./src/**/*.{js,ts,tsx}").reduce((obj, el) => {
      obj[path.parse(el).name] = path.resolve(el);
      return obj;
    }, {}),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
      ],
    },
    optimization: {
      minimize: argv.mode === "production",
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: argv.mode === "production",
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      argv.mode === "development"
          ? new ExtReloader({
            port: 9090,
            reloadPage: true,
            entries: {
              contentScript: "contentScript", // Key matches compiled output file
              background: "background",
            },
          })
          : false,
    ].filter(Boolean),
    devtool: argv.mode === "development" ? "source-map" : false,
  });
};
