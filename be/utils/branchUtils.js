import Account from '../models/Account.js';
import Human from '../models/Human.js';
import Branch from '../models/Branch.js';

// Reusable function to get branches for the current user
export async function getUserBranches(userId) {
    try {
        const acc = await Account.findOne({ _id: userId });
        if (!acc) throw new Error('Account not found');
        
        const human = await Human.findOne({ _id: acc.humanId });
        if (!human) throw new Error('Human not found');
        
        const branches = await Branch.find({ ownerId: human._id, isActive: true });
        return branches; // Returns an array of branch objects
    } catch (error) {
        throw new Error('Failed to fetch branches: ' + error.message);
    }
}