const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plaidDataSchema = new Schema({
    accessToken: { type: String },
    itemID: { type: String },
});

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    plaidData: { type: plaidDataSchema, required: true },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
});

module.exports = model("User", userSchema);
