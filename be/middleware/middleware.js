// var jwt = 'jsonwebtoken';
// require('dotenv').config();

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET;

function verifyRole(...allowedRoles) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Access denied" });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            if (!allowedRoles.includes(req.user.role) || !req.user.role) {
                return res.status(403).json({ message: "Forbidden" });    
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}

export { verifyRole };
