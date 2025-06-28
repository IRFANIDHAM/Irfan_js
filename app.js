const express = require('express');
const app = express();
const analyticsRoute = require('./analytics');

app.use('/analytics', analyticsRoute);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});