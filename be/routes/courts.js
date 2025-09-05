
import { verifyRole } from '../middleware/middleware.js';
import { app } from '../config/config.js';
import { getBranchIds } from '../utils/branchUtils.js';
import Court from '../models/Court.js';
import CourtType from '../models/CourtType.js';
import Branch from '../models/Branch.js';
import mongoose from 'mongoose';

app.get('/api/courts', verifyRole('owner', 'staff'), async (req, res) => {
  try {
    const branchIds = await getBranchIds(req.user.id);
    if (branchIds.length === 0) {
      return res.status(200).json({ message: "No branches found, so no courts available." });
    }
    const courts = await Court.find({ branchId: { $in: branchIds } }); // Fetch all courts from database
    res.json({ courts });
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({ error: 'Failed to fetch courts' });
  }
});

app.get(`/api/courts/:id`, verifyRole('owner', 'staff'), async (req, res) => {
  try {
    const branchIds = await getBranchIds(req.user.id);
    if (branchIds.length === 0) {
      return res.status(200).json({ message: "No branches found, so no courts available." });
    }

    const id = req.params.id;
    const court = await Court.findOne({ _id: id, branchId: { $in: branchIds } }).populate('branchId');
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
    const { branchId, courtTypeId, name } = req.body;
    const branch = await Branch.findOne({ _id: branchId });
    const courtType = await CourtType.findOne({ _id: courtTypeId });

    if (!branch || (courtTypeId != null && !courtType)) {
      return res.status(400).json({message: "Cannot find branch"});
    } 

    if (!name) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const court = await Court.create({ branchId, courtTypeId: courtTypeId || null, name });
    res.status(201).json({ message: "Create Court sucessfully", court });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
    console.log(error);
  }
});

// Update
app.put('/api/courts/:id', verifyRole('owner'), async (req, res) => {
  try {
    const branchIds = await getBranchIds(req.user.id);
    if (branchIds.length === 0) {
      return res.status(200).json({ message: "No branches found, so no courts available." });
    }

    const id = new mongoose.Types.ObjectId(req.params.id);
    const { courtTypeId, name, isAvailable } = req.body;

    // Build update object dynamically
    const updateFields = {};
    if (courtTypeId !== undefined) updateFields.courtTypeId = courtTypeId;
    if (name !== undefined) updateFields.name = name;
    if (isAvailable !== undefined) updateFields.isAvailable = isAvailable;

    const court = await Court.findOneAndUpdate(
      { _id: id, branchId: { $in: branchIds } },
      updateFields,
      { new: true }
    );
    if (!court) {
      return res.status(404).json({ message: "Court not found." });
    }
    res.json({ message: "Court updated successfully", court: court });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
    console.log(error);
  }
});