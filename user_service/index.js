import express from 'express';
const app = express();

app.get('/api/user/:userId', (req, res) => {
   const userId = req.params.userId;
   res.status(200).json({ userId, message: `User details for user ID: ${userId}` });
});

app.listen(3003, () => {
  console.log('User API Gateway is running on port 3003');
});