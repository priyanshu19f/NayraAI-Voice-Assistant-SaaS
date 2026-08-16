import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

const getKey = () => {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error("ENCRYPTION_KEY is not set in .env");
    }
    return Buffer.from(process.env.ENCRYPTION_KEY, "hex");
};

export const encrypt = (text) => {
    if (!text) return "";

    const KEY = getKey();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");

    return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};

export const decrypt = (encryptedData) => {
    if (!encryptedData) return "";

    const [ivHex, authTagHex, encrypted] = encryptedData.split(":");
    if (!ivHex || !authTagHex || !encrypted) return "";

    const KEY = getKey();
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
};
