const { app } = require('../config/config');
const Human = require('../models/Human');
const Account = require('../models/Account');
const crypto = require('crypto');

app.post('/api/users', async (req, res) => {
    try {
        const { name, phone, email, username, password } = req.body;
        if (!name || !phone || !username || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const hash = crypto.createHash('sha256');
        hash.update(password);
        const digest = hash.digest('hex');
        var existingUserPhone = await Human.findOne({ phone: phone });
        var existingUserMail = await Human.findOne({ email: email });
        var existingAccount = await Account.findOne({ username: username });
        if (existingUserPhone) {
            res.status(400).json({ message: 'Phone number existed' });
            return;
        }
        if (existingUserMail) {
            res.status(400).json({ message: 'Email existed' });
            return;
        }
        if (existingAccount) {
            res.status(400).json({ message: 'Account existed' });
            return;
        }
        const human = await Human.create({ name, phone, email });
        const account = await Account.create({
            humanId: human._id,
            username,
            passwordHash: digest,
            role: 'customer'
        });

        res.status(201).json({ message: 'Registration success', human, account });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
})