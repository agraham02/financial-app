const mongoose = require("mongoose");
const plaidItemSchema = require("./PlaidItemSchema");
const { Schema, model } = mongoose;

const plaidApiEventsSchema = new Schema({
    itemId: { type: Schema.Types.ObjectId, ref: "plaidItemSchema", required: true },
    plaidMethod: { type: String, required: true },
    arguments: { type: String },
    requestId: { type: String },
    errorTypes: { type: String },
    errorCode: { type: String },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

module.exports = plaidApiEventsSchema;
