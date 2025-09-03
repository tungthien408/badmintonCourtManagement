import { getUserBranches } from "./branchUtils.js";
import PriceList from "../models/PriceList.js";
import mongoose from "mongoose";

export async function getPriceList(userId) {
    try {
        const branches = await getUserBranches(userId);
        if (!branches) throw new Error('Branch not found');
        const branchIds = branches.map(branch => branch._id);
        const priceList = await PriceList.find({ status: true, branchId: { $in: branchIds } }).populate('branchId');
        return priceList;
    } catch (error) {
        throw new Error('Failed to fetch price lists: ' + error.message);
    }
}

export async function isPriceListValid(userId, priceListId) {
    const priceLists = await getPriceList(userId);
    const priceListIds = priceLists.map(ob => ob._id);
    const priceListIdObj = new mongoose.Types.ObjectId(priceListId);
    if (!priceListIds.some(id => id.equals(priceListIdObj))) {
        return false;
    }
    return true;
}