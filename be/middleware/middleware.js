import { verifyJWT } from "../utils/jwt.js";

function verifyRole(...allowedRoles) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Access denied" });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = verifyJWT(token);
            req.user = decoded;
            if (!allowedRoles.includes(req.user.role) || !req.user.role) {
                return res.status(403).json({ message: "Forbidden" });    
            } if (decoded.exp * 1000 < Date.now()) {
                return res.status(401).json({ message: "Invalid token" });    
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}

export { verifyRole };
