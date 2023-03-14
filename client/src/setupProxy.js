const { createProxyMiddleware } = require('http-proxy-middleware');
const {local, dev} = require("./Config");

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: dev,
            changeOrigin: true,
        })
    );
};