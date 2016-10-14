var webpack = require("webpack");
var path = require("path");
var autoprefixer = require("autoprefixer");

var prod = (process.env.NODE_ENV === "production");

var plugins = [
  new webpack.ProvidePlugin({
    _: "lodash"
  })
];

if (prod)
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));

module.exports = {
  entry: ["whatwg-fetch", "./web/App.tsx"],
  output: {
    path: path.join(__dirname, "web/dist"),
    filename: "bundle.js"
  },
  devtool: prod ? "none" : "source-map",
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader",
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "postcss", "sass"]
      },
      {
        test: /\.tsx?$/,
        loader: "ts"
      }
    ],
    preloaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
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