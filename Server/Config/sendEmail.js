import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// =========================
// sending welcome email
// =========================
export const sendWelcomeEmail = async (toEmail, userName) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"NayraAI" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            replyTo: process.env.EMAIL_USER,
            subject: "Welcome to NayraAI",
            text: `Welcome to NayraAI, ${userName}!

We're excited to have you with us.

NayraAI helps you add a smart, conversational voice assistant to your website. Your assistant can answer visitors' questions, provide information about your business, and help users navigate your website naturally through voice.

A quick tip for better responses:
When setting up your assistant, one of the most important things you can provide is your Business Description. The more detailed and accurate it is, the better your assistant can understand your business and provide relevant, helpful, and context-aware responses to your visitors.

What should you include?
You can include your products or services, features, pricing, policies, FAQs, business hours, support details, and anything else you want your assistant to know about your business.

Make your assistant yours:
Customize your assistant's name, conversation tone, and visual theme. You can also configure website navigation and embed your assistant on your website using a simple script.

Your account is ready, and we're looking forward to seeing what you build with NayraAI.

Welcome aboard!

— Team NayraAI
© ${new Date().getFullYear()} NayraAI. All rights reserved.`,
            html: `
                <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <style>
            body, table, td, div, p, a { -webkit-text-size-adjust: 100%; }

            @media only screen and (max-width: 600px) {
                .email-wrapper {
                    padding: 20px 10px !important;
                }
                .email-container {
                    border-radius: 12px !important;
                }
                .email-header {
                    padding: 22px 20px !important;
                }
                .email-header-title {
                    font-size: 20px !important;
                }
                .email-body {
                    padding: 24px 20px 22px !important;
                }
                .email-heading {
                    font-size: 21px !important;
                }
                .email-text {
                    font-size: 14px !important;
                }
                .email-tip-card,
                .email-custom-card {
                    padding: 16px !important;
                    margin: 18px 0 !important;
                }
                .email-footer {
                    padding: 18px 20px !important;
                }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0;">
        <div class="email-wrapper" style="
            margin: 0;
            padding: 40px 16px;
            background-color: #f6f7fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #172033;
        ">
            <div class="email-container" style="
                max-width: 600px;
                width: 100%;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #e8e8ef;
                border-radius: 18px;
                overflow: hidden;
                box-shadow: 0 8px 30px rgba(31, 41, 55, 0.06);
            ">

                <!-- Header -->
                <div class="email-header" style="
                    padding: 28px 32px;
                    background: linear-gradient(135deg, #8b3dff 0%, #667eea 50%, #00c98d 100%);
                ">
                    <div class="email-header-title" style="
                        font-size: 24px;
                        font-weight: 700;
                        color: #ffffff;
                        letter-spacing: -0.5px;
                    ">
                        Nayra <span style="opacity: 0.9;">AI</span>
                    </div>

                    <div style="
                        margin-top: 7px;
                        font-size: 13px;
                        color: rgba(255, 255, 255, 0.88);
                    ">
                        Voice AI for modern websites
                    </div>
                </div>


                <!-- Main Content -->
                <div class="email-body" style="padding: 34px 32px 30px;">

                    <h1 class="email-heading" style="
                        margin: 0 0 10px;
                        font-size: 26px;
                        line-height: 1.3;
                        font-weight: 700;
                        color: #111827;
                    ">
                        Welcome to NayraAI, ${userName}! 👋
                    </h1>

                    <p class="email-text" style="
                        margin: 0 0 20px;
                        font-size: 15px;
                        line-height: 1.7;
                        color: #5f6b7a;
                    ">
                        We're excited to have you with us.
                    </p>


                    <!-- Introduction -->
                    <p class="email-text" style="
                        margin: 0 0 18px;
                        font-size: 15px;
                        line-height: 1.75;
                        color: #4b5563;
                    ">
                        NayraAI helps you add a smart, conversational voice
                        assistant to your website. Your assistant can answer
                        visitors' questions, provide information about your
                        business, and help users navigate your website naturally
                        through voice.
                    </p>


                    <!-- Important Tip Card -->
                    <div class="email-tip-card" style="
                        margin: 26px 0;
                        padding: 20px;
                        background-color: #faf8ff;
                        border: 1px solid #e9ddff;
                        border-left: 4px solid #8b3dff;
                        border-radius: 12px;
                    ">

                        <div style="
                            margin-bottom: 8px;
                            font-size: 14px;
                            font-weight: 700;
                            color: #6d28d9;
                        ">
                            💡 A quick tip for better responses
                        </div>

                        <p class="email-text" style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.75;
                            color: #4b5563;
                        ">
                            When setting up your assistant, one of the most
                            important things you can provide is your
                            <strong style="color: #1f2937;">
                                Business Description
                            </strong>.
                            The more detailed and accurate it is, the better
                            your assistant can understand your business and
                            provide relevant, helpful, and context-aware
                            responses to your visitors.
                        </p>
                    </div>


                    <!-- What to Include -->
                    <p style="
                        margin: 0 0 12px;
                        font-size: 15px;
                        font-weight: 700;
                        color: #1f2937;
                    ">
                        What should you include?
                    </p>

                    <p class="email-text" style="
                        margin: 0 0 20px;
                        font-size: 14px;
                        line-height: 1.75;
                        color: #5f6b7a;
                    ">
                        You can include your products or services, features,
                        pricing, policies, FAQs, business hours, support
                        details, and anything else you want your assistant
                        to know about your business.
                    </p>


                    <!-- Customization -->
                    <div class="email-custom-card" style="
                        margin: 22px 0;
                        padding: 18px 20px;
                        background-color: #f8fafc;
                        border: 1px solid #e7ebf0;
                        border-radius: 12px;
                    ">

                        <p style="
                            margin: 0 0 10px;
                            font-size: 14px;
                            font-weight: 700;
                            color: #1f2937;
                        ">
                            ✨ Make your assistant yours
                        </p>

                        <p class="email-text" style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.7;
                            color: #5f6b7a;
                        ">
                            Customize your assistant's name, conversation
                            tone, and visual theme. You can also configure
                            website navigation and embed your assistant on
                            your website using a simple script.
                        </p>
                    </div>


                    <!-- Closing -->
                    <p class="email-text" style="
                        margin: 28px 0 0;
                        font-size: 15px;
                        line-height: 1.7;
                        color: #4b5563;
                    ">
                        Your account is ready, and we're looking forward to
                        seeing what you build with NayraAI.
                    </p>

                    <p style="
                        margin: 18px 0 0;
                        font-size: 15px;
                        font-weight: 700;
                        color: #172033;
                    ">
                        Welcome aboard! 🚀
                    </p>

                </div>


                <!-- Footer -->
                <div class="email-footer" style="
                    padding: 22px 32px;
                    background-color: #0b1228;
                    border-top: 1px solid #1c2742;
                ">

                    <div style="
                        font-size: 17px;
                        font-weight: 700;
                        color: #ffffff;
                    ">
                        Nayra <span style="color: #34d399;">AI</span>
                    </div>

                    <div style="
                        margin-top: 6px;
                        font-size: 12px;
                        color: #9aa5ba;
                    ">
                        Voice AI assistant for websites
                    </div>

                    <div style="
                        margin-top: 16px;
                        font-size: 11px;
                        line-height: 1.5;
                        color: #6f7b91;
                    ">
                        © ${new Date().getFullYear()} NayraAI. All rights reserved.
                    </div>

                </div>

            </div>
        </div>
    </body>
    </html>
            `,
        });
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};

// =========================
// plan upgrade email
// =========================

const generateReceiptPDF = (
    userName,
    userEmail,
    planName,
    amount,
    paymentDate,
    validUntil,
    paymentId,
    orderId,
) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: "A4",
                margin: 0,
                bufferPages: true,
            });

            const buffers = [];

            doc.on("data", buffers.push.bind(buffers));

            doc.on("end", () => {
                resolve(Buffer.concat(buffers));
            });

            doc.on("error", reject);

            // --------------------------------------------------
            // Colors
            // --------------------------------------------------

            const primary = "#7C3AED";
            const secondary = "#00B894";
            const dark = "#172033";
            const text = "#344054";
            const muted = "#667085";
            const lightBg = "#F8F7FF";
            const border = "#E8E5F2";
            const successBg = "#ECFDF5";
            const successText = "#047857";

            // --------------------------------------------------
            // Page Background
            // --------------------------------------------------

            doc.rect(0, 0, 595.28, 841.89).fill("#FFFFFF");

            // --------------------------------------------------
            // Top Gradient-like Brand Header
            // --------------------------------------------------

            doc.rect(0, 0, 595.28, 8).fill(primary);

            doc.rect(0, 8, 595.28, 4).fill(secondary);

            // --------------------------------------------------
            // Header
            // --------------------------------------------------

            doc.fontSize(26)
                .fillColor(dark)
                .font("Helvetica-Bold")
                .text("Nayra", 55, 55, {
                    continued: true,
                });

            doc.fillColor(secondary).text("AI");

            doc.fontSize(9)
                .fillColor(muted)
                .font("Helvetica")
                .text(
                    "AI-powered voice assistants for modern websites",
                    55,
                    88,
                );

            // Receipt label on right

            doc.fontSize(10)
                .fillColor(muted)
                .font("Helvetica")
                .text("PAYMENT RECEIPT", 390, 58, {
                    width: 150,
                    align: "right",
                });

            doc.fontSize(9)
                .fillColor("#98A2B3")
                .text("Official payment confirmation", 390, 75, {
                    width: 150,
                    align: "right",
                });

            // --------------------------------------------------
            // Divider
            // --------------------------------------------------

            doc.moveTo(55, 115)
                .lineTo(540, 115)
                .strokeColor(border)
                .lineWidth(1)
                .stroke();

            // --------------------------------------------------
            // Payment Successful Badge
            // --------------------------------------------------
            doc.roundedRect(55, 140, 485, 45, 8).fill(successBg);

            // Draw checkmark manually (instead of unicode ✓)
            doc.save();
            doc.lineWidth(2)
                .strokeColor(successText)
                .moveTo(78, 162)
                .lineTo(83, 167)
                .lineTo(92, 156)
                .stroke();
            doc.restore();

            doc.fontSize(11)
                .font("Helvetica-Bold")
                .fillColor(successText)
                .text("Payment Successful", 100, 156);

            // --------------------------------------------------
            // Title
            // --------------------------------------------------

            doc.fontSize(24)
                .font("Helvetica-Bold")
                .fillColor(dark)
                .text("Thank you for your purchase!", 55, 215);

            doc.fontSize(11)
                .font("Helvetica")
                .fillColor(muted)
                .text(
                    `Hi ${userName}, your NayraAI Pro subscription has been successfully activated.`,
                    55,
                    252,
                    {
                        width: 485,
                        lineGap: 4,
                    },
                );

            // --------------------------------------------------
            // Customer Information
            // --------------------------------------------------

            doc.fontSize(13)
                .font("Helvetica-Bold")
                .fillColor(dark)
                .text("Customer Details", 55, 305);

            doc.roundedRect(55, 330, 485, 82, 8).fill(lightBg);

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(muted)
                .text("CUSTOMER NAME", 75, 348);

            doc.fontSize(11)
                .font("Helvetica-Bold")
                .fillColor(text)
                .text(userName, 75, 364);

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(muted)
                .text("EMAIL", 330, 348);

            doc.fontSize(10)
                .font("Helvetica")
                .fillColor(text)
                .text(userEmail, 330, 364, {
                    width: 180,
                });

            // --------------------------------------------------
            // Plan Details
            // --------------------------------------------------

            doc.fontSize(13)
                .font("Helvetica-Bold")
                .fillColor(dark)
                .text("Subscription Details", 55, 450);

            doc.roundedRect(55, 475, 485, 145, 10)
                .lineWidth(1)
                .strokeColor(border)
                .stroke();

            // Plan

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(muted)
                .text("PLAN", 75, 497);

            doc.fontSize(16)
                .font("Helvetica-Bold")
                .fillColor(primary)
                .text(`NayraAI ${planName}`, 75, 514);

            // Amount

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(muted)
                .text("AMOUNT PAID", 330, 497);

            doc.fontSize(18)
                .font("Helvetica-Bold")
                .fillColor(dark)
                .text(`INR ${amount}`, 330, 513);

            // Date

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(muted)
                .text("PAYMENT DATE", 75, 555);

            doc.fontSize(11)
                .font("Helvetica")
                .fillColor(text)
                .text(paymentDate, 75, 572);

            // Valid Until

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(muted)
                .text("VALID UNTIL", 330, 555);

            doc.fontSize(11)
                .font("Helvetica-Bold")
                .fillColor(text)
                .text(validUntil, 330, 572);

            // --------------------------------------------------
            // Transaction Details
            // --------------------------------------------------

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(muted)
                .text("Payment ID", 55, 650);

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(text)
                .text(paymentId || "N/A", 145, 650, {
                    width: 395,
                });

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(muted)
                .text("Order ID", 55, 675);

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(text)
                .text(orderId || "N/A", 145, 675, {
                    width: 395,
                });

            // --------------------------------------------------
            // Footer Message
            // --------------------------------------------------

            doc.roundedRect(55, 720, 485, 52, 8).fill(lightBg);

            doc.fontSize(9)
                .font("Helvetica")
                .fillColor(muted)
                .text(
                    "This receipt confirms your payment for NayraAI Pro.",
                    75,
                    738,
                    {
                        width: 445,
                        align: "center",
                    },
                );

            // --------------------------------------------------
            // Footer
            // --------------------------------------------------

            doc.fontSize(8)
                .font("Helvetica")
                .fillColor("#98A2B3")
                .text("Thank you for choosing NayraAI.", 55, 805, {
                    width: 485,
                    align: "center",
                });

            doc.fontSize(8)
                .fillColor("#B0B7C3")
                .text(
                    "© NayraAI — AI-powered voice assistance for websites",
                    55,
                    820,
                    {
                        width: 485,
                        align: "center",
                    },
                );

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

export const sendProUpgradeEmail = async (
    userEmail,
    userName,
    planDetails = {},
) => {
    const {
        planName = "Pro",
        amount = "",
        validTill = "",
        paymentId = "",
        orderId = "",
    } = planDetails;

    const date = new Date().toLocaleDateString("en-IN");

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        const pdfBuffer = await generateReceiptPDF(
            userName,
            userEmail,
            planName,
            amount,
            date,
            validTill,
            paymentId,
            orderId,
        );

        await transporter.sendMail({
            from: `"NayraAI" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: "You're now on NayraAI Pro 🚀",

            html: `
                <div style="
    font-family: 'Montserrat', Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 24px;
    background-color: #ffffff;
    color: #172033;
">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
        <div style="
            display: inline-block;
            padding: 10px 18px;
            border-radius: 12px;
            background: linear-gradient(135deg, #9b4dff, #00b894);
            color: #ffffff;
            font-size: 22px;
            font-weight: 700;
        ">
            NayraAI
        </div>
    </div>

    <!-- Main Message -->
    <div style="text-align: center;">
        <h2 style="
            margin: 0 0 12px;
            font-size: 26px;
            color: #172033;
        ">
            You're now on NayraAI Pro 🚀
        </h2>

        <p style="
            margin: 0;
            font-size: 15px;
            line-height: 1.7;
            color: #667085;
        ">
            Hi ${userName}, your payment was successful and your
            NayraAI account has been upgraded to the Pro plan.
        </p>
    </div>

    <!-- Plan Details -->
    <div style="
        margin: 28px 0;
        padding: 22px;
        border-radius: 14px;
        background: #f8f7ff;
        border: 1px solid #ece8ff;
    ">

        <div style="margin-bottom: 14px;">
            <span style="color: #667085; font-size: 13px;">
                Current Plan
            </span>
            <div style="
                margin-top: 4px;
                font-size: 18px;
                font-weight: 700;
                color: #7c3aed;
            ">
                NayraAI Pro
            </div>
        </div>

        <div style="margin-bottom: 14px;">
            <span style="color: #667085; font-size: 13px;">
                Amount Paid
            </span>
            <div style="
                margin-top: 4px;
                font-size: 17px;
                font-weight: 600;
                color: #172033;
            ">
                ₹${amount}
            </div>
        </div>

        <div>
            <span style="color: #667085; font-size: 13px;">
                Valid Until
            </span>
            <div style="
                margin-top: 4px;
                font-size: 17px;
                font-weight: 600;
                color: #172033;
            ">
                ${validTill}
            </div>
        </div>

    </div>

    <!-- Receipt -->
    <div style="
        padding: 16px 18px;
        border-radius: 10px;
        background: #f6fffb;
        border-left: 3px solid #00b894;
        margin-bottom: 28px;
    ">
        <p style="
            margin: 0;
            font-size: 14px;
            line-height: 1.6;
            color: #344054;
        ">
            <strong>Payment receipt attached.</strong><br>
            We've attached your payment receipt to this email for your records.
        </p>
    </div>

    <p style="
        text-align: center;
        margin: 0;
        font-size: 14px;
        line-height: 1.7;
        color: #667085;
    ">
        Thank you for choosing NayraAI. We hope you enjoy the
        enhanced experience with Pro.
    </p>

    <!-- Footer -->
    <div style="
        margin-top: 36px;
        padding-top: 20px;
        border-top: 1px solid #eeeeee;
        text-align: center;
    ">
        <p style="
            margin: 0;
            font-size: 13px;
            color: #98a2b3;
        ">
            — Team NayraAI
        </p>
    </div>

</div>
            `,

            attachments: [
                {
                    filename: "NayraAI-Pro-Receipt.pdf",
                    content: pdfBuffer,
                    contentType: "application/pdf",
                },
            ],
        });

        console.log("Pro upgrade email sent to:", userEmail);
    } catch (error) {
        console.error("Error sending pro upgrade email:", error);
    }
};
