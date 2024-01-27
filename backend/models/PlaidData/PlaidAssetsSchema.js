const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plaidAssetsSchema = new Schema({
    value: { type: Number, default: 0 },
    description: { type: String },
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

module.exports = plaidAssetsSchema;
