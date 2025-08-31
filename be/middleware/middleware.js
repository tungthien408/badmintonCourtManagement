var jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
// todo
/* 
1. get the token
2. decode and verify
3. split the token
4. check the role
    if good => next('path-to-routes')
    if not => res.status(401).json({message: "Access denied"})
*/

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    
}