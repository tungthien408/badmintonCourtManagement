
import { verifyRole } from '../middleware/middleware.js';
import { app } from '../config/config.js';
import CourtType from '../models/CourtType.js';
import Branch from '../models/Branch.js';
import PriceList from '../models/PriceList.js';

// Lấy danh sách bảng giá 
app.get('/api/priceList', verifyRole('owner', 'staff'), async (req, res) => {
  try {
    // ERROR: Lấy bảng giá cho tất cả các chi nhánh mà chủ account đang sở hữu, KHÔNG PHẢI TẤT CẢ CHI NHÁNH TRONG HỆ THỐNG
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
        const branchId = await Branch.findOne({_id: idbr})
        const idty = req.br.id 
        const courtTypeId = await CourtType.findOne({_id: idty})
       

      const { price, startTime, endTime } = req.body;
        if (!price || !date) {
            return res.status(400).json({message: "Missing required fields."});
        }
        // ERROR: Tạo bảng giá mới, KHÔNG PHẢI TẠO NHÁNH MỚI
        // ERROR: THIẾU THUỘC TÍNH
        const branch = await Branch.create({
            BranchID : branchId._id,
            TypeID : courtTypeId._id,
            price,
            date,
            startTime,
            endTime
        });
        res.status(201).json({message: "Create pricelist sucessfully", branch});
    } catch (error) {
        res.status(500).json({message: "Server error."});
        console.log(error);
    }
});

// Lấy chi tiết bảng giá của một chi nhánh 
app.get(`/api/priceList/:id`, verifyRole('owner', 'staff'), async (req, res) => {
  try {
    // ERROR: CHƯA KIỂM TRA BẢNG GIÁ CÓ THUỘC CHI NHÁNH DO NGƯỜI DÙNG SỞ HỮU HAY KHÔNG
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

// Cập nhật thông tin bảng giá
app.put('/api/priceList/:id', verifyRole('owner'), async (req, res) => {
    try {
      // ERROR: CHƯA KIỂM TRA BẢNG GIÁ CÓ THUỘC CHI NHÁNH DO NGƯỜI DÙNG SỞ HỮU HAY KHÔNG
        const id = req.params.id;
        const { TypeID, price,date, isActive, endTime,startTime} = req.body;

        // Build update object dynamically
        const updateFields = {};
        if (TypeID !== undefined) updateFields.TypeID = TypeID;
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

// Xóa bảng giá
// app.delete(`/api/priceList/:id`, verifyRole('owner'), async (req, res) => {
//     try {
//         const id = req.params.id;
//         const pricelist = await PriceList.findByIdAndDelete(id);
//         if (!pricelist) {
//             return res.status(404).json({ message: 'priceList not found' });
//         }
//         res.json({ message: 'priceList deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting priceList:', error);
//         res.status(500).json({ error: 'Failed to delete priceList' });
//     }
// });