const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Farmiva API' });
});

module.exports = app;
