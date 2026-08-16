import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Modal from "./Modal";

function Footer() {
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null); // "privacy" | "terms" | "contact" | null

    return (
        <>
            <footer className="bg-[#081028] px-6 py-10 ">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left  ">
                    <div>
                        <div
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer"
                        >
                            <img
                                src={logo}
                                alt="logo"
                                className="h-9 w-auto object-contain "
                            />
                            <h1 className="font-bold text-xl text-gray-100 leading-none ">
                                Nayra{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500">
                                    AI
                                </span>
                            </h1>
                        </div>

                        <p className="text-gray-400 text-sm font-medium mt-1 ">
                            Voice AI assistant for websites{" "}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                        <button
                            onClick={() => setActiveModal("privacy")}
                            className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            Privacy Policy
                        </button>
                        <button
                            onClick={() => setActiveModal("terms")}
                            className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            Terms of Service
                        </button>
                        <button
                            onClick={() => setActiveModal("contact")}
                            className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            Contact
                        </button>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm ">
                            © {new Date().getFullYear()} Nayra AI. All rights
                            reserved.
                        </p>
                        <a
                            href="https://www.linkedin.com/in/priyanshuguptaofficial/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 font-medium mt-1 text-sm flex items-center justify-center sm:justify-start gap-2 cursor-pointer"
                        >
                            About me <BsBoxArrowUpRight size={12} />
                        </a>
                    </div>
                </div>
            </footer>

            <Modal
                isOpen={activeModal === "privacy"}
                onClose={() => setActiveModal(null)}
                title="Privacy Policy"
            >
                {/* PrivacyPolicy block */}
                <div className="space-y-8 text-gray-600 leading-7">
                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            1. Introduction
                        </h2>
                        <p>
                            NayraAI ("we", "our", "us") provides a voice-enabled
                            AI assistant that businesses can embed on their
                            websites. This Privacy Policy explains what
                            information we collect, how we use it, and the
                            choices you have.
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
                            When you sign in with Google, we collect your name
                            and email address to create and manage your account.
                        </p>
                        <p className="mb-2">
                            <strong className="text-[#081028]">
                                Assistant configuration:
                            </strong>{" "}
                            Business name, business type, business description,
                            assistant tone, theme, and navigation pages you
                            configure in the Builder.
                        </p>
                        <p className="mb-2">
                            <strong className="text-[#081028]">
                                Gemini API key:
                            </strong>{" "}
                            If you provide your own Gemini API key, it is
                            encrypted before being stored and is only decrypted
                            at the moment your assistant needs to generate a
                            response. We never display your full API key back to
                            you or any third party.
                        </p>
                        <p className="mb-2">
                            <strong className="text-[#081028]">
                                Payment information:
                            </strong>{" "}
                            Payments are processed by Razorpay. We store the
                            plan, amount, order ID, and payment ID associated
                            with your transaction. We do not store your card,
                            UPI, or bank details — these are handled entirely by
                            Razorpay.
                        </p>
                        <p>
                            <strong className="text-[#081028]">
                                Usage data:
                            </strong>{" "}
                            We track the number of AI messages your assistant
                            processes to enforce plan limits (e.g. the free
                            plan's message cap).
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
                                To process payments and manage your subscription
                                plan
                            </li>
                            <li>
                                To send account-related emails, such as a
                                welcome email or payment confirmation
                            </li>
                            <li>To enforce usage limits based on your plan</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            4. Website Visitor Data
                        </h2>
                        <p>
                            When your assistant is embedded on your website, it
                            processes the questions your visitors ask in order
                            to generate a response using your Gemini API key. We
                            do not use this conversation data for any purpose
                            other than generating the response and, where
                            applicable, counting it toward your plan's message
                            limit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            5. Data Storage &amp; Security
                        </h2>
                        <p>
                            Your data is stored on secure, access-controlled
                            database infrastructure. Sensitive values such as
                            your Gemini API key are encrypted at rest using
                            industry-standard encryption before being saved.
                            Despite these measures, no method of transmission or
                            storage is 100% secure, and we cannot guarantee
                            absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            6. Third-Party Services
                        </h2>
                        <p className="mb-2">
                            We rely on the following third parties to operate
                            NayraAI:
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
                                — to generate AI responses using your API key
                            </li>
                            <li>
                                <strong className="text-[#081028]">
                                    Razorpay
                                </strong>{" "}
                                — to process payments
                            </li>
                        </ul>
                        <p className="mt-2">
                            Each of these providers has its own privacy policy
                            governing how they handle data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            7. Data Retention
                        </h2>
                        <p>
                            We retain your account and assistant configuration
                            data for as long as your account is active. If you
                            wish to delete your account and associated data,
                            contact us using the details below.
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
                            assistant configuration directly from the Builder
                            page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            9. Changes to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time.
                            Continued use of NayraAI after changes are posted
                            constitutes acceptance of the revised policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            10. Contact Us
                        </h2>
                        <p>
                            If you have any questions about this Privacy Policy,
                            reach out to us at{" "}
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
            </Modal>

            <Modal
                isOpen={activeModal === "terms"}
                onClose={() => setActiveModal(null)}
                title="Terms of Service"
            >
                {/* Terms block*/}

                <div className="space-y-8 text-gray-600 leading-7">
                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By creating an account or using NayraAI, you agree
                            to be bound by these Terms of Service. If you do not
                            agree, please do not use the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            2. The Service
                        </h2>
                        <p>
                            NayraAI lets you build and embed a voice-enabled AI
                            assistant on your website. The assistant answers
                            visitor questions based on the business information
                            you provide and, on eligible plans, can navigate
                            visitors to specific pages on your site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            3. Account Registration
                        </h2>
                        <p>
                            You must sign in with a valid Google account to use
                            NayraAI. You are responsible for maintaining the
                            confidentiality of your account and for all activity
                            that occurs under it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            4. Your Gemini API Key
                        </h2>
                        <p>
                            To power your assistant, you provide your own Google
                            Gemini API key. You are responsible for any usage or
                            charges incurred on that key through your Gemini
                            account. NayraAI encrypts your key at rest and uses
                            it solely to generate responses for your assistant.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            5. Plans &amp; Payments
                        </h2>
                        <p className="mb-2">
                            NayraAI offers a Free plan with limited AI messages
                            and a Pro plan with expanded features, billed as a
                            one-time payment for a fixed access period as shown
                            at checkout.
                        </p>
                        <p>
                            Payments are processed securely through Razorpay. By
                            upgrading to Pro, you authorize us to charge the
                            amount shown at checkout. Plan access expires at the
                            end of the period stated at the time of purchase
                            unless renewed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            6. Refunds
                        </h2>
                        <p>
                            Payments made for the Pro plan are generally
                            non-refundable once access has been granted. If you
                            believe a payment was made in error or a technical
                            issue prevented you from using the service, contact
                            us and we will review your request on a case-by-case
                            basis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            7. Acceptable Use
                        </h2>
                        <p className="mb-2">You agree not to:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>
                                Use NayraAI for any unlawful, harmful, or
                                fraudulent purpose
                            </li>
                            <li>
                                Configure your assistant to impersonate a person
                                or entity, or to mislead visitors
                            </li>
                            <li>
                                Attempt to reverse-engineer, disrupt, or gain
                                unauthorized access to the service
                            </li>
                            <li>
                                Exceed reasonable usage in a way that degrades
                                the service for other users
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            8. Service Availability
                        </h2>
                        <p>
                            We aim to keep NayraAI available and reliable, but
                            we do not guarantee uninterrupted access. The
                            service depends on third-party providers (including
                            Google Gemini and Razorpay), and outages on their
                            end may affect NayraAI's availability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            9. Limitation of Liability
                        </h2>
                        <p>
                            NayraAI is provided "as is" without warranties of
                            any kind. To the maximum extent permitted by law, we
                            are not liable for any indirect, incidental, or
                            consequential damages arising from your use of the
                            service, including responses generated by your
                            assistant.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            10. Termination
                        </h2>
                        <p>
                            We may suspend or terminate your access to NayraAI
                            if you violate these Terms. You may stop using the
                            service and request account deletion at any time by
                            contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            11. Changes to These Terms
                        </h2>
                        <p>
                            We may update these Terms from time to time.
                            Continued use of NayraAI after changes are posted
                            constitutes acceptance of the revised Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-[#081028] mb-2">
                            12. Contact Us
                        </h2>
                        <p>
                            Questions about these Terms can be sent to{" "}
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
            </Modal>

            <Modal
                isOpen={activeModal === "contact"}
                onClose={() => setActiveModal(null)}
                title="Contact Us"
            >
                <section>
                    <p>
                        Have a question, feedback, or need help with your
                        assistant? Reach out to us — we usually respond within
                        24 hours.
                    </p>
                    <p className="mt-4">
                        <strong className="text-[#081028]">Email:</strong>{" "}
                        <a
                            href="mailto:gpriyanshuu4u@gmail.com"
                            className="text-purple-600 hover:underline"
                        >
                            gpriyanshuu4u@gmail.com
                        </a>
                    </p>
                </section>
            </Modal>
        </>
    );
}

export default Footer;
