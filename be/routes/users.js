const express = require('express');
const router = express.Router(); 
const authMiddleware = require('../middleware/middleware'); 
const User = require('../models/User');

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router; 