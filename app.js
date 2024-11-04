require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes')
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', authRoutes)

app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
  console.log(`Auth microservice running on http://localhost:${PORT}`);
});