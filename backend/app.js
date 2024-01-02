const express = require("express");
require("dotenv").config();
const {
    Configuration,
    PlaidApi,
    Products,
    PlaidEnvironments,
} = require("plaid");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const moment = require("moment");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (
    process.env.PLAID_PRODUCTS || Products.Transactions
).split(",");

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || "US").split(
    ","
);

// Parameters used for the OAuth redirect Link flow.
//
// Set PLAID_REDIRECT_URI to 'http://localhost:3000'
// The OAuth redirect flow requires an endpoint on the developer's website
// that the bank website should redirect to. You will need to configure
// this redirect URI for your client ID through the Plaid developer dashboard
// at https://dashboard.plaid.com/team/api.
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || "";

// Parameter used for OAuth in Android. This should be the package name of your app,
// e.g. com.plaid.linksample
const PLAID_ANDROID_PACKAGE_NAME = process.env.PLAID_ANDROID_PACKAGE_NAME || "";

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
let ACCOUNT_ID = null;
// The payment_id is only relevant for the UK/EU Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store along with the Payment metadata, such as userId .
let PAYMENT_ID = null;
// The transfer_id and authorization_id are only relevant for Transfer ACH product.
// We store the transfer_id in memory - in production, store it in a secure
// persistent data store
let AUTHORIZATION_ID = null;
let TRANSFER_ID = null;

const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
        headers: {
            "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
            "PLAID-SECRET": PLAID_SECRET,
            "Plaid-Version": "2020-09-14",
        },
    },
});
const client = new PlaidApi(configuration);

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/plaid/create-link-token", async (req, res, next) => {
    const request = {
        user: {
            client_user_id: "user-id",
        },
        client_name: "Ahmad's Finance App",
        products: PLAID_PRODUCTS,
        language: "en",
        country_codes: PLAID_COUNTRY_CODES,
    };
    if (PLAID_REDIRECT_URI !== "") {
        configs.redirect_uri = PLAID_REDIRECT_URI;
    }
    if (PLAID_ANDROID_PACKAGE_NAME !== "") {
        configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
    }

    try {
        const createTokenResponse = await client.linkTokenCreate(request);
        res.json(createTokenResponse.data);
    } catch (error) {
        console.log(error);
        next();
    }
});

app.listen(PORT || 3001, () => {
    console.log(`App listening on port ${PORT}`);
});
