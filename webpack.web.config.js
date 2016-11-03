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
      "FB_APPID": JSON.stringify(process.env.FB_APPID || "1122984984444971"),
      "CLIENT_ID": JSON.stringify(process.env.CLIENT_ID || "checkpoints.web"),
      "API_BASE": JSON.stringify("/api")
    }
  })
];

if (prod)
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));

module.exports = {
  entry: {
    "app": ["./web/App.tsx"],
    "vendor": [
      "lodash",
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
      "redux-thunk",
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
      { test: /\.tsx?$/, loader: "ts" },
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
      }
    },
    historyApiFallback: true
  }
};