var webpack = require("webpack");
var path = require("path");
var fs = require('fs');

const facebookScope = [
  'email',
  'public_profile',
  'user_friends'
];

var nodeModules = {};
fs.readdirSync(path.join(__dirname, "node_modules"))
  .filter(x => x != ".bin")
  .forEach(mod => nodeModules[mod] = "commonjs " + mod)

module.exports = {
  entry: [
    path.join(__dirname, "server/bin/www")
  ],
  output: {
    path: path.join(__dirname, "server/dist"),
    filename: "www"
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: "lodash"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "FACEBOOK_CALLBACK": JSON.stringify('http://localhost:8080/api/auth/facebook/callback'),
        "MONGODB": JSON.stringify(process.env.MONGODB || "mongodb://dev:12345678@ds017688.mlab.com:17688/checkpoints_dev"),
        "FACEBOOK_APP_ID": JSON.stringify(process.env.FACEBOOK_APP_ID || "1122984984444971"),
        "FACEBOOK_APP_SECRET": JSON.stringify(process.env.FACEBOOK_APP_SECRET || "1aa31bc51756994148f7060891ffe3df"),
        "FACEBOOK_SCOPE": JSON.stringify(facebookScope),
        "SKYSCANNER_APIKEY": JSON.stringify("co498777447573845420689543475114"),
        "DEFAULT_PICTURE": JSON.stringify("static/default.png")
      }
    })
  ],
  resolve: {
    extensions: ["", ".ts", ".js"]
  },
  target: "node",
  externals: nodeModules,
  recordsPath: path.join(__dirname, "webpack-records"),
  ts: {
    configFileName: 'tsconfig.node.json'
  }
}