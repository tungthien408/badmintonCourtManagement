const { app } = require('../config/config');
const Human = require('../models/Human');

app.get('/api/human', async (req, res) => {
  try {
    const human = await Human.find(); // Fetch all human from database
    res.json({ human });
  } catch (error) {
    console.error('Error fetching human:', error);
    res.status(500).json({ error: 'Failed to fetch human' });
  }
});

app.get(`/api/human/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const Human = await Human.findById(id);
    if (!Human) {
      return res.status(404).json({ message: 'Human not found' });
    }
    res.json({ Human });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});