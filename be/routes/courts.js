
import { verifyRole } from '../middleware/middleware.js';
import { app } from '../config/config.js';
import Court from '../models/Court.js';

app.get('/api/courts', verifyRole('owner', 'staff'), async (req, res) => {
  try {
    const courts = await Court.find(); // Fetch all courts from database
    res.json({ courts });
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({ error: 'Failed to fetch courts' });
  }
});

app.get(`/api/courts/:id`, verifyRole('owner', 'staff'), async (req, res) => {
  try {
    const id = req.params.id;
    const court = await Court.findById(id);
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }
    res.json({ court });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});