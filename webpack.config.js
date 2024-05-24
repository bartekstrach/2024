const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode: mode,
  entry: path.resolve(__dirname, "client"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"],
    modules: ["client", "public", "node_modules"],
    alias: {
      path: require.resolve("path-browserify"),
      "@client": path.resolve(__dirname, "client"),
      "@enums": path.resolve(__dirname, "common/enums"),
      "@server": path.resolve(__dirname, "server"),
      "@types": path.resolve(__dirname, "common/types"),
    },
    plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })],
  },
  module: {
    rules: [
      {
        test: /\.([jt]sx?)?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 2022,
  },
};