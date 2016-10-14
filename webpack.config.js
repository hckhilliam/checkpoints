var webpack = require('webpack');
var path = require('path');

var web = require('./webpack.web.config');
var node = require('./webpack.node.config');

web.name = 'web';
node.name = 'node';

module.exports = [
  web,
  node
];
