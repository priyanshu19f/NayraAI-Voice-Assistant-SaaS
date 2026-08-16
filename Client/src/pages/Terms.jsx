import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

function Terms() {
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
                        Terms of Service
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
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By creating an account or using NayraAI, you
                                agree to be bound by these Terms of Service. If
                                you do not agree, please do not use the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                2. The Service
                            </h2>
                            <p>
                                NayraAI lets you build and embed a voice-enabled
                                AI assistant on your website. The assistant
                                answers visitor questions based on the business
                                information you provide and, on eligible plans,
                                can navigate visitors to specific pages on your
                                site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                3. Account Registration
                            </h2>
                            <p>
                                You must sign in with a valid Google account to
                                use NayraAI. You are responsible for maintaining
                                the confidentiality of your account and for all
                                activity that occurs under it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                4. Your Gemini API Key
                            </h2>
                            <p>
                                To power your assistant, you provide your own
                                Google Gemini API key. You are responsible for
                                any usage or charges incurred on that key
                                through your Gemini account. NayraAI encrypts
                                your key at rest and uses it solely to generate
                                responses for your assistant.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                5. Plans &amp; Payments
                            </h2>
                            <p className="mb-2">
                                NayraAI offers a Free plan with limited AI
                                messages and a Pro plan with expanded features,
                                billed as a one-time payment for a fixed access
                                period as shown at checkout.
                            </p>
                            <p>
                                Payments are processed securely through
                                Razorpay. By upgrading to Pro, you authorize us
                                to charge the amount shown at checkout. Plan
                                access expires at the end of the period stated
                                at the time of purchase unless renewed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                6. Refunds
                            </h2>
                            <p>
                                Payments made for the Pro plan are generally
                                non-refundable once access has been granted. If
                                you believe a payment was made in error or a
                                technical issue prevented you from using the
                                service, contact us and we will review your
                                request on a case-by-case basis.
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
                                    Configure your assistant to impersonate a
                                    person or entity, or to mislead visitors
                                </li>
                                <li>
                                    Attempt to reverse-engineer, disrupt, or
                                    gain unauthorized access to the service
                                </li>
                                <li>
                                    Exceed reasonable usage in a way that
                                    degrades the service for other users
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                8. Service Availability
                            </h2>
                            <p>
                                We aim to keep NayraAI available and reliable,
                                but we do not guarantee uninterrupted access.
                                The service depends on third-party providers
                                (including Google Gemini and Razorpay), and
                                outages on their end may affect NayraAI's
                                availability.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                9. Limitation of Liability
                            </h2>
                            <p>
                                NayraAI is provided "as is" without warranties
                                of any kind. To the maximum extent permitted by
                                law, we are not liable for any indirect,
                                incidental, or consequential damages arising
                                from your use of the service, including
                                responses generated by your assistant.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                10. Termination
                            </h2>
                            <p>
                                We may suspend or terminate your access to
                                NayraAI if you violate these Terms. You may stop
                                using the service and request account deletion
                                at any time by contacting us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[#081028] mb-2">
                                11. Changes to These Terms
                            </h2>
                            <p>
                                We may update these Terms from time to time.
                                Continued use of NayraAI after changes are
                                posted constitutes acceptance of the revised
                                Terms.
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
                </div>
            </div>
        </div>
    );
}

export default Terms;
