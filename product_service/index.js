import express from 'express';
const app = express();

app.get('/api/product/:productId', (req, res) => {
   const productId = req.params.productId;
   res.status(200).json({ productId, message: `Product details for product ID: ${productId}` });
});

app.listen(3002, () => {
  console.log('Product API Gateway is running on port 3002');
});