
import { verifyRole } from '../middleware/middleware.js';
import { app } from '../config/config.js';
import Court from '../models/Court.js';
import CourtType from '../models/CourtType.js';
import Branch from '../models/Branch.js';

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

// Create
app.post(`/api/courts`, verifyRole('owner'), async (req, res) => {
    try {
        const idbr = req.br.id 
        const br = await Branch.findOne({_id: idbr})
        const idty = req.br.id 
        const ty = await CourtType.findOne({_id: idty})
       

        const {name} = req.body;
        if (!name) {
            return res.status(400).json({message: "Missing required fields."});
        }
        const branch = await Branch.create({
            BranchID : br._id,
            TypeID : ty._id,
            name
        });
        res.status(201).json({message: "Create Court sucessfully", branch});
    } catch (error) {
        res.status(500).json({message: "Server error."});
        console.log(error);
    }
});

// Update
app.put('/api/courts/:id', verifyRole('owner'), async (req, res) => {
    try {
        const id = req.params.id;
        const { TypeID, name, isActive } = req.body;

        // Build update object dynamically
        const updateFields = {};
        if (TypeID !== undefined) updateFields.TypeID = TypeID;
        if (name !== undefined) updateFields.name = name;
        if (isActive !== undefined) updateFields.isActive = isActive;

        const court = await Court.findOneAndUpdate(
            { _id: id, isActive: true },
            updateFields,
            { new: true }
        );
        if (!court) {
            return res.status(404).json({ message: "Court not found." });
        }
        res.json({ message: "Court updated successfully", court: court });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
        console.log(error);
    }
});

// Delete
app.delete(`/api/courts/:id`, verifyRole('owner'), async (req, res) => {
    try {
        const id = req.params.id;
        const court = await Court.findByIdAndDelete(id);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }
        res.json({ message: 'Court deleted successfully' });
    } catch (error) {
        console.error('Error deleting court:', error);
        res.status(500).json({ error: 'Failed to delete court' });
    }
});