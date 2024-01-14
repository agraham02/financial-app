const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.use((req, res, next) => {
    if (!req.user) {
        console.log("ACCOUNT: need to log in");
        res.status(401).json({ needToLogin: true });
        return;
    }
    next();
});

router.get("/", async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.json(user);
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

module.exports = router;
