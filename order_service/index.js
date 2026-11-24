import express from 'express';
const app = express();

app.get('/api/order/:orderId', (req, res) => {
   const orderId = req.params.orderId;
   res.status(200).json({ orderId, message: `Order details for order ID: ${orderId}` });
});

app.listen(3001, () => {
  console.log('Order API Gateway is running on port 3001');
});