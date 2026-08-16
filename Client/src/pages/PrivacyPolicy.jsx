import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

function PrivacyPolicy() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f7f8fc] px-4 py-10">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 cursor-pointer"
                >
                    <FiArrowLeft /> Back
                </button>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10">
                    <h1 className="text-3xl font-bold text-[#081028] mb-2">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-gray-400 mb-8">
                        Last updated:{" "}
                        {new Date().toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>

                    <div className="space-y-8 text-gray-600 leading-7">
                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                1. Introduction
                            </h2>
                            <p>
                                NayraAI ("we", "our", "us") provides a
                                voice-enabled AI assistant that businesses can
                                embed on their websites. This Privacy Policy
                                explains what information we collect, how we use
                                it, and the choices you have.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                2. Information We Collect
                            </h2>
                            <p className="mb-2">
                                <strong className="text-[#081028]">
                                    Account information:
                                </strong>{" "}
                                When you sign in with Google, we collect your
                                name and email address to create and manage your
                                account.
                            </p>
                            <p className="mb-2">
                                <strong className="text-[#081028]">
                                    Assistant configuration:
                                </strong>{" "}
                                Business name, business type, business
                                description, assistant tone, theme, and
                                navigation pages you configure in the Builder.
                            </p>
                            <p className="mb-2">
                                <strong className="text-[#081028]">
                                    Gemini API key:
                                </strong>{" "}
                                If you provide your own Gemini API key, it is
                                encrypted before being stored and is only
                                decrypted at the moment your assistant needs to
                                generate a response. We never display your full
                                API key back to you or any third party.
                            </p>
                            <p className="mb-2">
                                <strong className="text-[#081028]">
                                    Payment information:
                                </strong>{" "}
                                Payments are processed by Razorpay. We store the
                                plan, amount, order ID, and payment ID
                                associated with your transaction. We do not
                                store your card, UPI, or bank details — these
                                are handled entirely by Razorpay.
                            </p>
                            <p>
                                <strong className="text-[#081028]">
                                    Usage data:
                                </strong>{" "}
                                We track the number of AI messages your
                                assistant processes to enforce plan limits (e.g.
                                the free plan's message cap).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                3. How We Use Your Information
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>To create and authenticate your account</li>
                                <li>
                                    To power your embedded voice assistant and
                                    generate relevant responses
                                </li>
                                <li>
                                    To process payments and manage your
                                    subscription plan
                                </li>
                                <li>
                                    To send account-related emails, such as a
                                    welcome email or payment confirmation
                                </li>
                                <li>
                                    To enforce usage limits based on your plan
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                4. Website Visitor Data
                            </h2>
                            <p>
                                When your assistant is embedded on your website,
                                it processes the questions your visitors ask in
                                order to generate a response using your Gemini
                                API key. We do not use this conversation data
                                for any purpose other than generating the
                                response and, where applicable, counting it
                                toward your plan's message limit.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                5. Data Storage &amp; Security
                            </h2>
                            <p>
                                Your data is stored on secure, access-controlled
                                database infrastructure. Sensitive values such
                                as your Gemini API key are encrypted at rest
                                using industry-standard encryption before being
                                saved. Despite these measures, no method of
                                transmission or storage is 100% secure, and we
                                cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                6. Third-Party Services
                            </h2>
                            <p className="mb-2">
                                We rely on the following third parties to
                                operate NayraAI:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong className="text-[#081028]">
                                        Google
                                    </strong>{" "}
                                    — for authentication (Sign in with Google)
                                </li>
                                <li>
                                    <strong className="text-[#081028]">
                                        Google Gemini
                                    </strong>{" "}
                                    — to generate AI responses using your API
                                    key
                                </li>
                                <li>
                                    <strong className="text-[#081028]">
                                        Razorpay
                                    </strong>{" "}
                                    — to process payments
                                </li>
                            </ul>
                            <p className="mt-2">
                                Each of these providers has its own privacy
                                policy governing how they handle data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                7. Data Retention
                            </h2>
                            <p>
                                We retain your account and assistant
                                configuration data for as long as your account
                                is active. If you wish to delete your account
                                and associated data, contact us using the
                                details below.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                8. Your Rights
                            </h2>
                            <p>
                                You may request access to, correction of, or
                                deletion of your personal data at any time by
                                contacting us. You can also update most of your
                                assistant configuration directly from the
                                Builder page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                9. Changes to This Policy
                            </h2>
                            <p>
                                We may update this Privacy Policy from time to
                                time. Continued use of NayraAI after changes are
                                posted constitutes acceptance of the revised
                                policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                10. Contact Us
                            </h2>
                            <p>
                                If you have any questions about this Privacy
                                Policy, reach out to us at{" "}
                                <a
                                    href="mailto:gpriyanshuu4u@gmail.com"
                                    className="text-purple-600 hover:underline"
                                >
                                    {/* support@nayraai.com */}
                                    gpriyanshuu4u@gmail.com
                                </a>
                                .
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
