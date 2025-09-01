
import { verifyRole } from '../middleware/middleware.js';
import { app } from '../config/config.js';
import CourtType from '../models/CourtType.js';
import Branch from '../models/Branch.js';
import PriceList from '../models/PriceList.js';

// Lấy danh sách bảng giá 
app.get('/api/priceList', verifyRole('owner', 'staff'), async (req, res) => {
  try {
    const pricelist = await PriceList.find(); 
    res.json({ pricelist });
  } catch (error) {
    console.error('Error fetching pricelist:', error);
    res.status(500).json({ error: 'Failed to fetch pricelist' });
  }
});

// Thêm bảng giá mới
app.post(`/api/priceList`, verifyRole('owner'), async (req, res) => {
    try {
        const idbr = req.br.id 
        const br = await Branch.findOne({_id: idbr})
        const idty = req.br.id 
        const ty = await CourtType.findOne({_id: idty})
       

        const {price,date} = req.body;
        if (!price || !date) {
            return res.status(400).json({message: "Missing required fields."});
        }
        const branch = await Branch.create({
            BranchID : br._id,
            TypeID : ty._id,
            price,
            date
        });
        res.status(201).json({message: "Create pricelist sucessfully", branch});
    } catch (error) {
        res.status(500).json({message: "Server error."});
        console.log(error);
    }
});

// Lấy chi tiết bảng giá
app.get(`/api/priceList/:id`, verifyRole('owner', 'staff'), async (req, res) => {
  try {
    const id = req.params.id;
    const pricelist = await PriceList.findById(id);
    if (!pricelist) {
      return res.status(404).json({ message: 'pricelist not found' });
    }
    res.json({ pricelist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Cập nhật thông tin bảng giá
app.put('/api/priceList/:id', verifyRole('owner'), async (req, res) => {
    try {
        const id = req.params.id;
        const { TypeID, price,date, isActive } = req.body;

        // Build update object dynamically
        const updateFields = {};
        if (TypeID !== undefined) updateFields.TypeID = TypeID;
        if (price !== undefined) updateFields.price = price;
        if (date !== undefined) updateFields.date = date;
        if (isActive !== undefined) updateFields.isActive = isActive;

        const pricelist = await PriceList.findOneAndUpdate(
            { _id: id, isActive: true },
            updateFields,
            { new: true }
        );
        if (!pricelist) {
            return res.status(404).json({ message: "pricelist not found." });
        }
        res.json({ message: "pricelist updated successfully", pricelist: pricelist });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
        console.log(error);
    }
});

// Xóa bảng giá
app.delete(`/api/priceList/:id`, verifyRole('owner'), async (req, res) => {
    try {
        const id = req.params.id;
        const pricelist = await PriceList.findByIdAndDelete(id);
        if (!pricelist) {
            return res.status(404).json({ message: 'priceList not found' });
        }
        res.json({ message: 'priceList deleted successfully' });
    } catch (error) {
        console.error('Error deleting priceList:', error);
        res.status(500).json({ error: 'Failed to delete priceList' });
    }
});