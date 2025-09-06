import crypto from 'crypto';
import { Router } from 'express';
import Account from '../models/Account.js';
import Human from '../models/Human.js';
import { generateJWT } from '../utils/jwt.js';

const router = Router();

router.post('/login', async (req, res) => {
    const username = req.body['username'];
    const password = req.body['password'];

    // tấu hài

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const digest = hash.digest('hex');

    const human = await Human.findOne({$or: [{email: username}, {phone: username}]});
    const account = !human ? await Account.findOne({username: username}) : await Account.findOne({humanId: human._id});
    if (!account || account.passwordHash !== digest) {
        return res.status(401).json({ message: 'Cannot find user' });
    } else {
        var token = generateJWT(account._id, account.role);
        return res.status(200).json({message: 'authenticate successfully', token: token});
    }
});

export default router;

