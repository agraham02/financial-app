const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const plaidItemSchema = require("./PlaidItemSchema");

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    plaidItems: {
        type: [plaidItemSchema],
        required: true,
        default: [],
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
});

module.exports = model("User", userSchema);
