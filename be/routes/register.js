const { app } = require('../config/config');
const Human = require('../models/Human');
const Account = require('../models/Account');
const crypto = require('crypto');

app.post('/api/users', async (req, res) => {
    try {
        const { name, phone, email, username, password } = req.body;
        const hash = crypto.createHash('sha256');
        hash.update(password);
        const digest = hash.digest('hex');
        const human = await Human.create({ name, phone, email });
        if (!human) {
            res.status(500).json({ message: 'Registration failed', error });
            return;    
        }
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