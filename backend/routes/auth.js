const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res, next) => {
    const userId = "65985a2a0675a46a48a2614d";
    const user = await User.findById(userId);
    res.json(user);
});

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    const user = await User.findOne({ username: username });

    if (password === user.password) {
        res.json({ login: { username, password, id: user.id } });
    } else {
        res.status(400).json({ login: "Failed" });
    }
});

router.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    try {
        if (await User.findOne({ username: username })) {
            throw new Error(`User with username '${username}' already exists`);
        }
        const newUser = await User.create({
            username,
            password,
            plaidData: { accessToken: null, itemId: null },
        });
        res.json({ register: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
