import { verifyRole } from "../middleware/middleware.js";
import { app } from "../config/config.js";
import Account from "../models/Account.js";
import Human from "../models/Human.js";
import Branch from "../models/Branch.js";

app.get(`/api/branches`, verifyRole('owner'), async (req, res) => {
    try {
        const id = req.user.id // account
        const acc = await Account.findOne({_id: id})
        const human = await Human.findOne({_id: acc.humanId})
        const branches = await Branch.find({ ownerId: human._id, isActive: true });
        if (branches.length == 0) {
            res.status(200).json({message: "No branch created."});
        } else {
            res.json({branches})
        }
    } catch (error) {
        res.status(500).json({message: "Server error"});
        console.log(error)
    }
});

app.post(`/api/branches`, verifyRole('owner'), async (req, res) => {
    try {
        const id = req.user.id // account
        const acc = await Account.findOne({_id: id})
        const human = await Human.findOne({_id: acc.humanId})

        const {name, phone, address} = req.body;
        if (!name || !phone || !address) {
            return res.status(400).json({message: "Missing required fields."});
        }
        const branch = await Branch.create({
            ownerId: human._id,
            name,
            phone,
            address
        });
        res.status(201).json({message: "Create branch sucessfully", branch});
    } catch (error) {
        res.status(500).json({message: "Server error."});
        console.log(error);
    }
});

app.get(`/api/branches/:id`, verifyRole('owner'), async (req, res) => {
    try {
        const id = req.params.id

        const branch = await Branch.findOne({ _id: id, isActive: true });
        if (!branch) {
            res.status(200).json({message: "Branch not exists."});
        } else {
            res.json({branch})
        }
    } catch (error) {
        res.status(500).json({message: "Server error."});
        console.log(error);
    }
});

app.put(`/api/branches/:id`, verifyRole('owner'), async (req, res) => {
    try {
        const id = req.params.id
        const {name, phone, address, isActive} = req.body;

        // Build update object dynamically
        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (phone !== undefined) updateFields.phone = phone;
        if (address !== undefined) updateFields.address = address;
        if (isActive !== undefined) updateFields.isActive = isActive;

        const branch = await Branch.findOneAndUpdate(
            { _id: id, isActive: true },
            updateFields,
            { new: true }
        );
        if (!branch) {
            res.status(404).json({message: "Branch not exists."});
        } 
        res.json({message: "Branch updated successfully", branch: branch})
    } catch (error) {
        res.status(500).json({message: "Server error."});
        console.log(error);
    }
});