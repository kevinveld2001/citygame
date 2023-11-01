const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/totoapi/*',
        createProxyMiddleware({
            target: 'https://api.toto.io/',
            changeOrigin: false,
            secure: false,
            pathRewrite: {
                '\/totoapi': ''
            },
            logger: console,
            logLevel: 'debug',
        })
    );
}