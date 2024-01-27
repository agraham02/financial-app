const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");

async function verifyPassword(password, storedPassword) {
    // try {
    //     return await bcrypt.compare(password, hash);
    // } catch (error) {
    //     console.log(error);
    // }
    // return false;

    return password === storedPassword;
}

async function initializeLocalStategy(username, password, done) {
    try {
        const user = await User.findOne({ username: username });
        // console.log(user);
        if (!user) {
            const errorMessage = `User with username ${username} not found`;
            console.log(errorMessage);
            return done(null, false, { message: errorMessage });
        }

        if (await verifyPassword(password, user.password)) {
            console.log("Successfully got user. Returning it...");
            return done(null, user);
        } else {
            const errorMessage = `Password does not match stored password`;
            console.log(errorMessage);
            return done(null, false, {
                message: errorMessage,
            });
        }
    } catch (error) {
        return done(error);
    }
}

passport.use(new LocalStrategy(initializeLocalStategy));

passport.serializeUser(function (user, done) {
    const userData = {
        id: user.id,
        username: user.username,
    };
    return done(null, userData);
});

passport.deserializeUser(function (user, done) {
    return done(null, user);
});
