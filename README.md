# checkpoints
SE464 Architectures project
View it here: checkpoints-demo.herokuapp.com

:)


### swagstructions
`npm install`

`typings install`

then,
`npm run`
```
"server": "set DEBUG=*&&node ./server/dist/www",
"webpack-web": "webpack-dev-server  --progress --colors --hot --inline --content-base web/dist/ --config webpack.web.config.js",
"webpack-server": "webpack -d --progress --watch --config webpack.node.config.js",
"build-web": "webpack --progress --config webpack.web.config.js",
"build-server": "webpack --progress --config webpack.node.config.js",
"build": "webpack --progress"
```
