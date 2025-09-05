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

// app.get('/api/auth/me', async (req, res) => {
//     // TODO
// });