import { razorpay } from "../Config/razorpay.js";
import Billing from "../Models/billing.model.js";
import crypto from "crypto";
import User from "../Models/user.model.js";
import { sendProUpgradeEmail } from "../Config/sendEmail.js";

export const verifyBilling = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;

        const userId = req.userId;

        const sign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (sign !== razorpay_signature) {
            return res.json({
                success: false,
                message: "Payment verification failed",
            });
        }

        const billing = await Billing.findOneAndUpdate(
            { orderId: razorpay_order_id },
            {
                paymentId: razorpay_payment_id,
                status: "paid",
            },
            { returnDocument: "after" },
        );

        const user = await User.findByIdAndUpdate(
            userId,
            {
                plan: "pro",
                proExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            },
            { returnDocument: "after" },
        );

        sendProUpgradeEmail(user.email, user.name, {
            planName: "Pro",
            amount: billing?.amount || 699,
            validTill: user.proExpiresAt.toLocaleDateString("en-IN"),
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
        });

        return res.json({ success: true, user });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `verifyBilling error ${error}` });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { plan } = req.body;
        const userId = req.userId;
        let amount = 0;
        if (plan === "pro") {
            amount = 699;
        }

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        await Billing.create({
            userId,
            amount,
            plan,
            orderId: order._id,
        });

        return res.json({ success: true, order });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `createOrder error ${error}` });
    }
};
