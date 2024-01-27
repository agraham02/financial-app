const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plaidLinkEventsSchema = new Schema({
    type: { type: String, required: true },
    linkSessionId: { type: String },
    requestId: { type: String },
    errorType: { type: String },
    errorCode: { type: String },
    status: { type: String },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

module.exports = plaidLinkEventsSchema;
