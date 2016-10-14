var webpack = require('webpack');
var path = require('path');

// var web = require('./webpack.web.config');
var node = require('./webpack.node.config');
node.name = 'node';

module.exports = [
  node
];
