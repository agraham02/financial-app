const express = require("express");
const User = require("../models/User");
const router = express.Router();
const plaidClient = require("../configs/plaidConfig");

router.use(async (req, res, next) => {
    if (!req.user) {
        console.log("ACCOUNT: need to log in");
        res.status(401).json({ needToLogin: true });
        return;
    } else {
        const userFromDataBase = await User.findById(req.user.id);
        req.user = userFromDataBase;
    }
    next();
});

router.get("/", async (req, res, next) => {
    // const userId = req.user.id;
    // const user = await User.findById(userId);
    res.json(req.user);
});

router.delete("/", async (req, res, next) => {
    const userId = req.user.id;
    try {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            console.log("Successfully logged out");
        });
        await User.findByIdAndDelete(userId);
        res.json({ deletedAccount: "successful" });
    } catch (error) {
        next(error);
    }
});

router.get("/items", (req, res, next) => {
    const plaidItems = req.user.plaidData.plaidItems;
    res.json(plaidItems);
});

router.get("/item-ids", (req, res, next) => {
    const plaidItems = req.user.plaidData.plaidItems;
    const plaidItemIds = plaidItems.map((item) => item.itemId);
    res.json(plaidItemIds);
});

const plaidRouter = express.Router();

const findPlaidItemIndex = (req, res, next) => {
    const { plaidItemId } = req.params;
    const { plaidItems } = req.user.plaidData;

    let foundIndex = -1;
    for (let i = 0; i < plaidItems.length; i++) {
        if (plaidItems[i].itemId === plaidItemId) {
            foundIndex = i;
            break;
        }
    }

    if (foundIndex === -1) {
        return res.status(404).send({ error: "Item not found" });
    }

    // Add the found index to the request object so it can be accessed in subsequent middleware/route handler
    req.foundIndex = foundIndex;
    next();
};

plaidRouter.get("/items/institution-info", async (req, res, next) => {
    try {
        const { plaidItems } = req.user.plaidData;

        const institutionsInfo = [];
        for (const item of plaidItems) {
            // const { itemId,  } = item;
            // console.log(itemId);

            const { institutionId, itemId } = item;
            const request = {
                institution_id: institutionId,
                country_codes: ["US"],
            };
            const plaidResponse = await plaidClient.institutionsGetById(
                request
            );
            const institutionInfo = plaidResponse.data.institution;
            institutionInfo.itemId = itemId;
            institutionsInfo.push(institutionInfo);
        }
        res.json(institutionsInfo);
    } catch (error) {
        next(error);
    }
});

plaidRouter.get(
    "/items/:plaidItemId",
    findPlaidItemIndex,
    async (req, res, next) => {
        try {
            console.log(req.foundIndex);
            const { institutionId } =
                req.user.plaidData.plaidItems[req.foundIndex];
            const request = {
                institution_id: institutionId,
                country_codes: ["US"],
            };
            const plaidResponse = await plaidClient.institutionsGetById(
                request
            );
            const institutionInfo = plaidResponse.data.institution;
            res.json(institutionInfo);
        } catch (error) {
            next(error);
        }
    }
);

plaidRouter.get(
    "/items/accounts/:plaidItemId",
    findPlaidItemIndex,
    async (req, res, next) => {
        try {
            const { accessToken } =
                req.user.plaidData.plaidItems[req.foundIndex];
            const plaidResponse = await plaidClient.accountsGet({
                access_token: accessToken,
            });
            console.log(plaidResponse);
            res.json(plaidResponse.data.accounts);
        } catch (error) {
            console.log(error);
            next();
        }
    }
);

plaidRouter.get("/net-worth", async (req, res, next) => {
    const DEPOSITORY = "depository";
    const INVESTMENT = "investment";
    const CREDIT = "credit";
    const LOAN = "loan";
    const BROKERAGE = "brokerage";
    const OTHER = "other";

    try {
        const { plaidItems } = req.user.plaidData;

        let cash = 0;
        let investments = 0;
        let creditCards = 0;
        let loans = 0;
        for (const item of plaidItems) {
            const { accessToken } = item;
            const plaidResponse = await plaidClient.accountsGet({
                access_token: accessToken,
            });
            const { accounts } = plaidResponse.data;
            // console.log(accounts);

            for (const account of accounts) {
                const { type } = account;

                const amountToAdd = account.balances.current;
                switch (type) {
                    case INVESTMENT:
                        investments += amountToAdd;
                        break;
                    case CREDIT:
                        creditCards += amountToAdd;
                        break;
                    case DEPOSITORY:
                        cash += amountToAdd;
                        break;
                    case LOAN:
                        loans += amountToAdd;
                        break;
                    case BROKERAGE:
                        investments += amountToAdd;
                        break;
                    default:
                        break;
                }
            }
        }

        const assets = cash + investments;
        const liabilities = creditCards + loans;
        const netWorth = assets - liabilities;
        res.json({
            cash,
            investments,
            creditCards,
            loans,
            assets,
            liabilities,
            netWorth,
        });
    } catch (error) {
        next(error);
    }
});

router.use("/plaid", plaidRouter);

module.exports = router;
