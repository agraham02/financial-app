const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const plaidItemSchema = require("./PlaidData/PlaidItemSchema");
const plaidAssetsSchema = require("./PlaidData/PlaidAssetsSchema");
const plaidAccountsSchema = require("./PlaidData/PlaidAccountsSchema");
const plaidLinkEventsSchema = require("./PlaidData/PlaidLinkEventsSchema");
const plaidApiEventsSchema = require("./PlaidData/PlaidApiEventsSchema");

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    plaidData: {
        plaidItems: {
            type: [plaidItemSchema],
            required: true,
            default: [],
        },
        assets: { type: [plaidAssetsSchema], required: true, default: [] },
        accounts: { type: [plaidAccountsSchema], required: true, default: [] },
        linkEvents: {
            type: [plaidLinkEventsSchema],
            required: true,
            default: [],
        },
        plaidApiEvents: {
            type: [plaidApiEventsSchema],
            required: true,
            default: [],
        },
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

module.exports = model("User", userSchema);
