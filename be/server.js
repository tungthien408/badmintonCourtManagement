// server.js - Main Express server for Badminton Court Management System
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🍃 Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Court Model (defines the structure of a court in the database)
const Court = mongoose.model('Court', {
  name: String,
  isAvailable: Boolean
});

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

// API routes - Now using MongoDB!
app.get('/api/courts', async (req, res) => {
  try {
    const courts = await Court.find(); // Fetch all courts from database
    res.json({ courts });
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({ error: 'Failed to fetch courts' });
  }
});

// Helper function to add sample data if database is empty
async function initializeSampleData() {
  try {
    const courtCount = await Court.countDocuments();
    if (courtCount === 0) {
      console.log('📝 Adding sample courts to database...');
      await Court.create([
        { name: "A", isAvailable: false },
        { name: "B", isAvailable: true },
        { name: "C", isAvailable: true }
      ]);
      console.log('✅ Sample courts added!');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🏸 Badminton Court Management Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  
  // Add sample data if database is empty
  await initializeSampleData();
});
