import User from "../Models/user.model.js";
import { encrypt } from "../Config/encryption.js";
import { getCloudinary } from "../Config/cloudinary.js";

export const uploadCustomLogo = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res
                .status(400)
                .json({ message: "Failed to get current user" });
        }

        // Pro-only feature — enforce on backend regardless of frontend checks
        if (user.plan !== "pro") {
            return res.status(403).json({
                message: "Custom logo is a Pro feature",
            });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Convert buffer to base64 data URI for Cloudinary upload
        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const cloudinary = getCloudinary();
        const result = await cloudinary.uploader.upload(base64, {
            folder: "nayraai-logos",
            public_id: `logo_${user._id}`,
            overwrite: true,
            resource_type: "image",
        });

        user.customLogoUrl = result.secure_url;
        await user.save();

        const userResponse = user.toObject();
        delete userResponse.geminiApiKey;
        userResponse.hasGeminiKey = !!user.geminiApiKey;

        return res.status(200).json({
            message: "Logo uploaded successfully",
            user: userResponse,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `uploadCustomLogo error ${error}` });
    }
};

export const removeCustomLogo = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res
                .status(400)
                .json({ message: "Failed to get current user" });
        }

        user.customLogoUrl = "";
        await user.save();

        const userResponse = user.toObject();
        delete userResponse.geminiApiKey;
        userResponse.hasGeminiKey = !!user.geminiApiKey;

        return res.status(200).json({
            message: "Logo removed successfully",
            user: userResponse,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `removeCustomLogo error ${error}` });
    }
};

export const saveAssistant = async (req, res) => {
    try {
        const {
            assistantName,
            businessName,
            businessType,
            businessDescription,
            tone,
            theme,
            geminiApiKey,
            pages,
            enableNavigation,
        } = req.body;

        const user = await User.findById(req.userId);
        if (!user) {
            return res
                .status(400)
                .json({ message: "Failed to get current user" });
        }

        user.assistantName = assistantName;
        user.businessName = businessName;
        user.businessType = businessType;
        user.businessDescription = businessDescription;
        user.tone = tone;
        user.theme = theme;

        if (geminiApiKey) {
            user.geminiApiKey = encrypt(geminiApiKey);
        }

        // Navigation is a Pro-only feature — enforce regardless of what frontend sends
        user.enableNavigation =
            user.plan === "pro" ? !!enableNavigation : false;

        user.geminiStatus = "active";
        user.pages = pages || [];
        user.isSetupComplete = true;

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.geminiApiKey;
        userResponse.hasGeminiKey = !!user.geminiApiKey;

        return res.status(200).json({
            message: "Assistant saved successfully",
            user: userResponse,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `saveAssistant error ${error}` });
    }
};

export const genCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res
                .status(400)
                .json({ message: "Failed to get current user" });
        }

        const userResponse = user.toObject();
        userResponse.hasGeminiKey = !!userResponse.geminiApiKey;
        delete userResponse.geminiApiKey;

        return res.status(200).json(userResponse);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `genCurrentUser error ${error}` });
    }
};
