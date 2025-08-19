// server.js - Main Express server for Badminton Court Management System
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON requests

// Basic route to test server
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Badminton Court Management API!',
    status: 'Server is running successfully' 
  });
});

// API routes (we'll add more later)
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString() 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏸 Badminton Court Management Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
