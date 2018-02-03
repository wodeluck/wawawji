const config = require('../config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const opn = require('opn');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');
let proxypath;

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware

const server = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

const hotMiddleware = require('webpack-hot-middleware')(compiler);
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        });
        cb()
    })
});

const context = config.dev.context;

switch(process.env.NODE_ENV){
    case 'local': proxypath = 'http://localhost:8001'; break;
    case 'online': proxypath = 'http://wawa.app.xiaozhuschool.com/'; break;
    default:   proxypath = config.dev.proxypath;
}
const options = {
    target: proxypath,
    changeOrigin: true,
};
if (context.length) {
    server.use(proxyMiddleware(context, options));
    server.use(proxyMiddleware(['/geth5gw'], {target: 'https://h5cs-1.agoraio.cn:7668', changeOrigin: true}));
    server.use(proxyMiddleware(['/v1'], {target: 'https://h5gw-jiangmen-ctel-3.agoraio.cn:4000', changeOrigin: true}));
    server.use(proxyMiddleware(['/index.php'], {target: 'http://wawa.app.xiaozhuschool.com/index.php?g=Api&m=Record&a=api', changeOrigin: true}));
}

// handle fallback for HTML5 history API
server.use(require('connect-history-api-fallback')());

// serve webpack bundle output
server.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
server.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
server.use(staticPath, express.static('./static'));

module.exports = server.listen(port, function(err) {
    if (err) {
        console.log(err);
        return
    }
    const uri = '192.168.1.169:'+ port;
    console.log('Listening at ' + uri + '\n');

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri,{app: 'chrome'})
    }
});
