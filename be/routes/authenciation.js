require('dotenv').config();

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const { app } = require('../config/config');
const Account = require('../models/Account');
const Human = require('../models/Human');

app.post('/api/auth/login', async (req, res) => {
    try {
        const username = req.body['username'];
        const password = req.body['password'];

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters long' });
        }

        const hash = crypto.createHash('sha256');
        hash.update(password);
        const digest = hash.digest('hex');

        const human = (username.match(/.+\@.+\..+/)) ? await Human.findOne({email: username}) : (username.match(/^0(2|3|5|7|8|9)[0-9]{8}$/)) ? await Human.findOne({phone: username}) : null;
        const account = !human ? await Account.findOne({username: username}) : await Account.findOne({humanId: human._id});
        if (!account || account.passwordHash !== digest) {
            return res.status(401).json({ message: 'Cannot find user' });
        } else {
            var token = jwt.sign({date: Date.now(), id: account._id, role: account.role}, JWT_SECRET, {expiresIn: '1h'});
            return res.status(200).json({message: 'authenticate sucessfully', token: token});
        }

    } catch (error) {
        return res.status(500).json({ message: 'Server error' , error: error.message});
    }
});

