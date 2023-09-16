const User = require("../models/user");
const Token = require("../models/token");
const { createSecretToken } = require("../utilities/SecretToken");
const sendEmail = require("../utilities/email/sendEmail");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({ email, password, username });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ message: "Please enter all the fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: "Invalid email or password" });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(200)
            .json({ message: "User logged in successfully", success: true, user });
    } catch (error) {
        console.error(error);
    }
};

module.exports.RequestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) throw new Error("User does not exist");

        let token = await Token.findOne({ userId: user._id });

        if (token) await token.deleteOne();

        let resetToken = crypto.randomBytes(32).toString("hex");

        const hash = await bcrypt.hash(resetToken, 10);

        await new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save();

        const link = `https://localhost:5173/passwordReset?token=${resetToken}&id=${user._id}`;
        sendEmail(
            user.email,
            "Password Reset Request",
            { name: user.name, link: link },
            "./template/requestResetPassword.handlebars"
        );

        res.status(200).json(link);
    } catch (error) {
        console.error(error);
    }
};

module.exports.ResetPassword = async (req, res, next) => {
    try {
        const { userId, token, password } = req.body;

        let passwordResetToken = await Token.findOne({ userId });

        if (!passwordResetToken) {
            throw new Error("Invalid or expired password reset token");
        }

        const isValid = await bcrypt.compare(token, passwordResetToken.token);

        if (!isValid) {
            throw new Error("Invalid or expired password reset token");
        }

        const hash = await bcrypt.hash(password, 10);

        await User.updateOne(
            { _id: userId },
            { $set: { password: hash } },
            { new: true }
        );

        await passwordResetToken.deleteOne();

        res.status(200).json("Password updated successfully");
    } catch (error) {
        console.error(error);
    }
};
