
import { verifyRole } from '../middleware/middleware.js';
import { app } from '../config/config.js';
import PriceList from '../models/PriceList.js';
import { getPriceList, isPriceListValid } from '../utils/priceListUtils.js';
import { getBranchIds } from '../utils/branchUtils.js';
import mongoose from 'mongoose';

// Lấy danh sách bảng giá 
app.get('/api/priceList', verifyRole('owner', 'staff'), async (req, res) => {
  try {
    const pricelist = await getPriceList(req.user.id);
    res.json({ pricelist });
  } catch (error) {
    console.error('Error fetching pricelist:', error);
    res.status(500).json({ message: 'Failed to fetch pricelist', error: error.message });
  }
});

// Thêm bảng giá mới
app.post(`/api/priceList`, verifyRole('owner'), async (req, res) => {
  try {
    const branchIds = await getBranchIds(req.user.id);
    if (branchIds.length == 0) {
      return res.status(400).json({ message: "No branch found" });
    }
    const { branchId, courtTypeId, price, date, startTime, endTime, status } = req.body;
    if (!branchId || !price || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const branchIdObj = new mongoose.Types.ObjectId(branchId);

    if (!branchIds.some(id => id.equals(branchIdObj))) {
      return res.status(400).json({ message: "Invalid branchId." });
    }
    const priceList = await PriceList.create({ branchId, courtTypeId: courtTypeId || null, price, date, startTime, endTime, status: status || true });
    res.status(201).json({ message: "Create pricelist sucessfully", pricelist: priceList});
  } catch (error) {
    res.status(500).json({ message: "Server error." });
    console.log(error);
  }
});

// Lấy chi tiết bảng giá của một chi nhánh 
app.get(`/api/priceList/:id`, verifyRole('owner', 'staff'), async (req, res) => {
  try {
    const id = req.params.id; // pricelistid
    if (!isPriceListValid(req.user.id, id)) {
      return res.status(400).json({ message: 'invalid pricelist id' })
    }
    const pricelist = await PriceList.findById(id);
    if (!pricelist) {
      return res.status(404).json({ message: 'pricelist not found' });
    }
    res.json({ pricelist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật thông tin bảng giá
app.put('/api/priceList/:id', verifyRole('owner'), async (req, res) => {
  try {
    // ERROR: CHƯA KIỂM TRA BẢNG GIÁ CÓ THUỘC CHI NHÁNH DO NGƯỜI DÙNG SỞ HỮU HAY KHÔNG
    const id = req.params.id;
    if (!isPriceListValid(req.user.id, id)) {
      return res.status(400).json({ message: 'invalid pricelist id' })
    }

    const { courtTypeID, price, date, isActive, endTime, startTime } = req.body;

    // Build update object dynamically
    const updateFields = {};
    if (courtTypeID !== undefined) updateFields.courtTypeID = courtTypeID;
    if (price !== undefined) updateFields.price = price;
    if (date !== undefined) updateFields.date = date;
    if (startTime !== undefined) updateFields.startTime = startTime;
    if (endTime !== undefined) updateFields.endTime = endTime;
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
