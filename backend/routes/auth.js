const express = require("express");
const User = require("../models/User");
const router = express.Router();
const passport = require("passport");

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ authenticated: req.user });
});

router.post("/register", async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (await User.findOne({ username: username })) {
            throw new Error(`User with username '${username}' already exists`);
        }
        const newUser = await User.create({
            username,
            password,
            plaidData: { accessToken: null, itemId: null },
        });

        req.login(newUser, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({ register: newUser });
        });
            // return res.json({ register: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.json("Successfully logged out");
    });
});

module.exports = router;
