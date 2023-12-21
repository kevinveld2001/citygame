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
    app.use(
        '/socket.io/',
        createProxyMiddleware('/socket.io/', {
            target: 'http://localhost:3001',
            changeOrigin: true,
            ws: true, 
            logLevel: 'debug',
        })
    )
}