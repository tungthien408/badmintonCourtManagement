import jwt from 'jsonwebtoken';
import env from '../env.js';

const JWT_SECRET = env.JWT_SECRET;

/**
 * Generate a JWT token for the given account ID and role.
 *
 * @param {string} accountId - The ID of the account.
 * @param {string} accountRole - The role of the account (e.g., 'user', 'admin').
 * @returns {string} - The generated JWT token.
 */
function generateJWT(accountId, accountRole) {
    var token = jwt.sign({
            date: Date.now(), 
            id: accountId,
            role: accountRole
        }, 
        JWT_SECRET, 
        {expiresIn: '1h'}
    );
    return token;
}

/**
* Verify a JWT token and return the decoded payload if valid.
* @param {string} token - The JWT token to verify.
* @returns {{
*  date: number,
*  id: string,
* }|null} - The decoded token payload if valid, otherwise null.
*/
function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
}

export { generateJWT, verifyJWT };
