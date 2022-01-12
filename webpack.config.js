// Core packages.
const path = require("path");

// Npm modules.
const WebpackBar = require("webpackbar");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// ---

const rootDir = path.join(__dirname);
const srcDir = path.join(rootDir, "src");

module.exports = {
  entry: path.join(srcDir, "index.ts"),
  target: "node",
  mode: "production",
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@this": srcDir,
    },
  },
  output: {
    path: path.join(rootDir, "dist"),
    filename: "index.js"
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar()
    // This ensures that webpack bundles the 'saslprep' optional dependency of 'mongodb' with the
    // rest of the code.
    // https://stackoverflow.com/questions/58697934/webpack-how-do-you-require-an-optional-dependency-in-bundle-saslprep
  ],
  stats: {
    warnings: true
  },
};
