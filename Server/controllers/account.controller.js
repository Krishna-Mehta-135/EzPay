import mongoose, {Mongoose} from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {Account} from "../models/user.model.js";

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
        const parsedAmount = Number(amount); // Ensure amount is a number

        if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
            throw new ApiError(400, "Invalid amount");
        }

        const account = await Account.findOne({userId: req.userId}).session(session);

        if (!account) {
            throw new ApiError(400, "Sender account not found");
        }

        if (account.balance < parsedAmount) {
            throw new ApiError(400, "Insufficient Balance");
        }

        const toAccount = await Account.findOne({userId: to}).session(session);
        if (!toAccount) {
            throw new ApiError(400, "Invalid receiver account.");
        }

        if (req.userId === to) {
            throw new ApiError(400, "You cannot send money to yourself.");
        }

        await Account.updateOne({userId: req.userId}, {$inc: {balance: -parsedAmount}}, {session});
        await Account.updateOne({userId: to}, {$inc: {balance: parsedAmount}}, {session});

        await session.commitTransaction();
        res.json({success: true, message: "Transfer Successful"});
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({success: false, message: error.message || "Internal Server Error"});
    } finally {
        session.endSession();
    }
});

export {accountBalance, transferMoney};
