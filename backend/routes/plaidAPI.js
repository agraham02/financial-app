const express = require("express");
const User = require("../models/User");
const router = express.Router();
const plaidClient = require("../configs/plaidConfig");

router.use((req, res, next) => {
    console.log(req.user);
    if (!req.user) {
        console.log("PLAID: need to log in");
        res.status(401).json({ needToLogin: true });
        return;
    }
    next();
});

router.post("/create-link-token", async (req, res, next) => {
    const userId = req.user.id;
    const request = {
        user: {
            client_user_id: userId,
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
        const createTokenResponse = await plaidClient.linkTokenCreate(request);
        res.json(createTokenResponse.data);
    } catch (error) {
        console.log(error);
        next();
    }
});

router.post("/exchange_public_token", async (req, res, next) => {
    const publicToken = req.body.public_token;
    const institutionId = req.body.institution_id;
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });
        console.log(response);

        // These values should be saved to a persistent database and
        // associated with the currently signed-in user
        const accessToken = response.data.access_token;
        const itemID = response.data.item_id;
        const status = "good";

        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log(user);
        const newPlaidItem = {
            itemId: itemID,
            accessToken: accessToken,
            institutionId: institutionId,
            status: status,
        };
        user.plaidData.plaidItems.push(newPlaidItem);
        await user.save();

        res.json({ public_token_exchange: "complete" });
    } catch (error) {
        console.log(error);
        next();
    }
});

module.exports = router;
