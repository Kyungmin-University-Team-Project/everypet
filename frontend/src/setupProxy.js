const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware(['/**'],{
            target: 'http://localhost:8080', // 백엔드 서버의 URL
            changeOrigin: true,
        })
    );
};
