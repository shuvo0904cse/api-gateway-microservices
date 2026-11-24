import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

const services = {
    "order": "http://localhost:3001", // Order service
    "product": "http://localhost:3002", // Product service
    "user": "http://localhost:3003" // User
};

app.use((req, res, next) => {
    const path = req.path;
    const service = path.split('/')[2]; // Extract the service name from the path

    const target = services[service];
    if (!target) {
        return res.status(404).json({ message: 'Service not found' });
    }

    const proxyMiddleware = createProxyMiddleware({
        target: target,
        changeOrigin: true
    });

    return proxyMiddleware(req, res, next);
});

app.listen(3000, () => {
  console.log('API Gateway is running on port 3000');
});