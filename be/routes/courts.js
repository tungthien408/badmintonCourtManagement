const { app } = require('../config/config');
const Court = require('../models/Court');

app.get('/api/courts', async (req, res) => {
  try {
    const courts = await Court.find(); // Fetch all courts from database
    res.json({ courts });
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({ error: 'Failed to fetch courts' });
  }
});