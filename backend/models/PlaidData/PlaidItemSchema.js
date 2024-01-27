const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plaidItemSchema = new Schema({
    accessToken: { type: String, required: true },
    itemId: { type: String, required: true },
    institutionId: { type: String, required: true },
    status: { type: String, required: true },
    transactions_cursor: { type: String },
    accounts: { type: [], required: true, default: [] },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    // ... other fields specific to the item
});

module.exports = plaidItemSchema;
