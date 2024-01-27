const mongoose = require("mongoose");
const plaidTransactionsSchema = require("./PlaidTransactionsSchema");
const { Schema, model } = mongoose;

const plaidAccountsSchema = new Schema({
    plaidAccountId: { type: String, required: true },
    name: { type: String, required: true },
    mask: { type: String, required: true },
    officialName: { type: String },
    currentBalance: { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 },
    isoCurrencyCode: { type: String },
    unofficialCurrencyCode: { type: String },
    type: { type: String, required: true },
    subType: { type: String, required: true },
    transactions: {
        type: [plaidTransactionsSchema],
        required: true,
        default: [],
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

module.exports = plaidAccountsSchema;
