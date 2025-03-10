import mongoose, {Mongoose} from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {Account} from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const accountBalance = asyncHandler(async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId,
    });

    if (!account) {
        return res.status(404).json({error: "Account not found"});
    }

    res.json({
        balance: account.balance,
    });
});

const transferMoney = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    try {
        const {amount, to} = req.body;

        const account = await Account.findOne({
            userId: req.userId,
        }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            throw new ApiError(400, "Insufficient Balance");
        }

        const toAccount = await Account.findOne({userId: to}).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            throw new ApiError(400, "Invalid receiver account.");
        }

        // Perform the transfer
        await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}, {session});
        await Account.updateOne({userId: to}, {$inc: {balance: amount}}, {session});

        await session.commitTransaction();
        return res.json(new ApiResponse(200, "Transfer Successfull"));
    } catch (error) {
        await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}, {session});
        await Account.updateOne({userId: to}, {$inc: {balance: amount}}, {session});
    } finally {
        session.endSession();
    }
});

export {accountBalance, transferMoney};
