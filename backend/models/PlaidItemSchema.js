const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plaidItemSchema = new Schema({
    itemId: { type: String, required: true },
    accessToken: { type: String, required: true },
    // ... other fields specific to the item
});

module.exports = plaidItemSchema;
