import { sendWelcomeEmail } from "../Config/sendEmail.js";
import { genToken } from "../Config/token.js";
import User from "../Models/user.model.js";

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        return res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
        return res.status(500).json({ message: `logout error ${error}` });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res
                .status(400)
                .json({ message: "Name and Email are required" });
        }

        let user = await User.findOne({ email });
        let isNewUser = false;
        if (!user) {
            user = await User.create({ name, email });
            isNewUser = true;
        }

        if (isNewUser) {
            sendWelcomeEmail(user.email, user.name);
        }

        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `googleAuth error ${error}` });
    }
};
