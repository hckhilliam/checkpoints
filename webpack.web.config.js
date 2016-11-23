var webpack = require("webpack");
var path = require("path");
var autoprefixer = require("autoprefixer");

var prod = (process.env.NODE_ENV === "production");

var plugins = [
  new webpack.ProvidePlugin({
    _: "lodash"
  }),
  new webpack.DefinePlugin({
    "process.env": {
      "CLIENT_ID": JSON.stringify(process.env.CLIENT_ID || "checkpoints.web"),
      "API_BASE": JSON.stringify("/api"),
      "CLOUDINARY": JSON.stringify({ cloud_name: "checkpoints" }),
      "NODE_ENV": JSON.stringify(process.env.NODE_ENV || "dev")
    }
  })
];

if (prod)
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));

module.exports = {
  entry: {
    "app": ["babel-polyfill", "./web/App.tsx"],
    "vendor": [
      "classnames",
      "dateformat",
      "flexboxgrid",
      "immutability-helper",
      "lodash",
      "querystring",
      "react-addons-css-transition-group",
      "react-addons-shallow-compare",
      "react-addons-transition-group",
      "react-dom",
      "react-dropzone",
      "react-geosuggest",
      "react-linkify",
      "react-measure",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
      "redux-form",
      "redux-thunk",
      "validator",
      "whatwg-fetch"
    ]
  },
  output: {
    path: path.join(__dirname, "web/dist"),
    filename: "bundle.js"
  },
  devtool: prod ? "none" : "eval",
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  plugins: plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      chunks: "bundle",
      filename: "vendor.bundle.js",
      minChunks: Infinity
    })
  ]),
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.scss$/, loaders: ["style", "css", "postcss", "sass"] },
      { test: /\.tsx?$/, loaders: prod ? ["babel-loader?presets[]=es2015", "ts"] : ["ts"] },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.png$/, loader: "url-loader", query: { mimetype: "image/png" } }
    ],
    preloaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  postcss: () => [autoprefixer],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false
      },
      "/static": {
        target: "http://localhost:3000",
        secure: false
      }
    },
    historyApiFallback: true
  },
  ts: {
    configFileName: 'tsconfig.web.json'
  }
};