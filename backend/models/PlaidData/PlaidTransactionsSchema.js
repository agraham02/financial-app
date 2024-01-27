const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plaidTransactionsSchema = new Schema({
    plaidTransactionId: { type: String, required: true },
    plaidCategoryId: { type: String },
    category: { type: String },
    subcategory: { type: String },
    type: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    isoCurrencyCode: { type: String },
    unofficialCurrencyCode: { type: String },
    date: {type: Date, required: true},
    pending: {type: Boolean, required: true},
    accountOwner: { type: String },
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

module.exports = plaidTransactionsSchema;
