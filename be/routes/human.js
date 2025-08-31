import {verifyRole} from "../middleware/middleware.js";
import { app } from "../config/config.js";
import Human from "../models/Human.js";
import Account from "../models/Account.js";


app.get('/api/human', verifyRole("staff", "owner", "customer"), async (req, res) => {
  try {
    const human = await Human.find(); // Fetch all human from database
    res.json({ human });
  } catch (error) {
    console.error('Error fetching human:', error);
    res.status(500).json({ error: 'Failed to fetch human' });
  }
});

// app.get(`/api/human/:id`, verifyRole("staff", "owner", "customer"), async (req, res) => {
//   try {
//     const id = req.params.id;
//     const Human = await Human.findById(id);
//     if (!Human) {
//       return res.status(404).json({ message: 'Human not found' });
//     }
//     res.json({ Human });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// xem thông tin của mình
app.get('/api/users/me', verifyRole("staff", "owner", "customer"), async (req, res) => {
  try {
    const id = req.user.id;
    const acc = await Account.findById(id);
    if (!acc) return res.status(404).json({ message: 'Account not found' });
    const human = await Human.findById(acc.humanId);
    if (!human) return res.status(404).json({ message: 'Human not found' });
    res.status(200).json({ human });
  } catch (error) {
    res.status(500).json({ message: "Không lấy được thông tin cá nhân" });
    console.log(error.message);
  }
});