import { Router, Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = Router();

// Middleware to check for authentication token
router.use((req: Request, res: Response, next: NextFunction): void => {
  if (req.path === '/register' || req.path === '/login' || req.path === '/profile' || req.path.startsWith('/api/inventory')) {
    return next();
  }
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  req.headers['authorization'] = `Bearer ${token}`; // Forward the token to the service
  next();
});

// Proxy for User Service endpoints
router.post('/register', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: { '^/api/user/register': '/' },
}));

router.post('/login', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: { '^/api/user/login': '/' },
}));

router.get('/profile', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: { '^/api/user/profile': '/' },
}));

router.put('/update', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: { '^/api/user/update': '/' },
}));

// Add Todo
router.post('/todo', createProxyMiddleware({
  target: process.env.TODO_SERVICE_URL || 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: { '^/api/todo': '/' },
}));

// Get All Todos
router.get('/todo', createProxyMiddleware({
  target: process.env.TODO_SERVICE_URL || 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: { '^/api/todo': '/' },
}));

// Update Todo
router.put('/todo/:id', createProxyMiddleware({
  target: process.env.TODO_SERVICE_URL || 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: { '^/api/todo': '/' },
}));

// Delete Todo
router.delete('/todo/:id', createProxyMiddleware({
  target: process.env.TODO_SERVICE_URL || 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: { '^/api/todo': '/' },
}));

// Error handling middleware
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Proxy Error:', err);
  res.status(500).json({ message: 'Proxy Error' });
});

export default router;
