const { createProxyMiddleware } = require('http-proxy-middleware');
const {local, dev} = require("./Config");
console.log(local)
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: dev,
            changeOrigin: true,
        })
    );
};