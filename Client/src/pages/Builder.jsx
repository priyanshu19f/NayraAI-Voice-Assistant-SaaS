import React, { useState } from "react";
import { FiCopy, FiPlus, FiTrash2, FiCheck, FiUpload } from "react-icons/fi";
import axios from "axios";
import { CLIENT_URL, ServerUrl } from "../App";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const THEMES = ["light", "dark", "glass", "neon"];
const TONES = ["friendly", "sales", "professional"];

function Builder({ user, setUser }) {
    const navigate = useNavigate();
    const [editAssistant, setEditAssistant] = useState(!user?.isSetupComplete);
    const [copied, setCopied] = useState(false);

    const isPro = user?.plan === "pro";

    const [customLogoUrl, setCustomLogoUrl] = useState(
        user?.customLogoUrl || "",
    );
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoFile, setLogoFile] = useState(null);

    const [enableNavigation, setEnableNavigation] = useState(
        isPro ? (user?.enableNavigation ?? false) : false,
    );

    const [assistantName, setAssistantName] = useState(
        user?.assistantName || "",
    );

    const [businessName, setBusinessName] = useState(user?.businessName || "");
    const [businessType, setBusinessType] = useState(user?.businessType || "");
    const [businessDescription, setBusinessDescription] = useState(
        user?.businessDescription || "",
    );

    const [theme, setTheme] = useState(user?.theme || "dark");
    const [tone, setTone] = useState(user?.tone || "friendly");
    const [geminiApiKey, setGeminiApiKey] = useState("");
    const hasExistingKey = user?.hasGeminiKey || false;

    const [pages, setPages] = useState(user?.pages || []);
    const [pageName, setPageName] = useState("");
    const [pagePath, setPagePath] = useState("");
    const [pageKeywords, setPageKeywords] = useState("");

    const [loading, setLoading] = useState(false);

    const addPage = () => {
        if (!pageName || !pagePath) return;
        const newPage = {
            name: pageName,
            path: pagePath,
            keywords: pageKeywords.split(",").map((k) => k.trim()),
        };
        setPages([...pages, newPage]);
        setPageName("");
        setPagePath("");
        setPageKeywords("");
    };

    const removePage = (index) => {
        const updatedPages = pages.filter((_, i) => i !== index);
        setPages(updatedPages);
    };

    const remainingMessages = Math.max(
        0,
        (user?.requestLimit || 0) - (user?.totalMessages || 0),
    );

    const remainingDays = user?.proExpiresAt
        ? Math.max(
              0,
              Math.ceil(
                  (new Date(user.proExpiresAt) - new Date()) /
                      (1000 * 60 * 60 * 24),
              ),
          )
        : 0;

    const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}" ></script>`;

    const saveAssistant = async () => {
        setLoading(true);

        try {
            const data = {
                assistantName,
                businessName,
                businessType,
                businessDescription,
                tone,
                theme,
                pages,
                enableNavigation,
            };

            if (geminiApiKey) {
                data.geminiApiKey = geminiApiKey;
            }

            const res = await axios.post(
                `${ServerUrl}/api/user/save-assistant`,
                data,
                { withCredentials: true },
            );

            setUser(res.data.user);
            setEditAssistant(false);
            toast.success("Assistant saved succesfully!");
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to save assistant!");
            setLoading(false);
        }
    };

    const handleLogoSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "image/svg+xml") {
            toast.error("Only SVG files are allowed");
            return;
        }

        if (file.size > 1 * 1024 * 1024) {
            toast.error("File size must be under 1MB");
            return;
        }

        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
    };

    const uploadLogo = async () => {
        if (!logoFile) return;
        setUploadingLogo(true);

        try {
            const formData = new FormData();
            formData.append("logo", logoFile);

            const res = await axios.post(
                `${ServerUrl}/api/user/upload-logo`,
                formData,
                { withCredentials: true },
            );

            setUser(res.data.user);
            setCustomLogoUrl(res.data.user.customLogoUrl);
            setLogoFile(null);
            setLogoPreview(null);
            toast.success("Logo uploaded successfully!");
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Failed to upload logo",
            );
        } finally {
            setUploadingLogo(false);
        }
    };

    const removeLogo = async () => {
        try {
            const res = await axios.post(
                `${ServerUrl}/api/user/remove-logo`,
                {},
                { withCredentials: true },
            );

            setUser(res.data.user);
            setCustomLogoUrl("");
            toast.success("Logo removed");
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove logo");
        }
    };
    return (
        <div className="min-h-screen bg-[#f7f8fc] px-4 py-8 ">
            <div className="max-w-4xl mx-auto ">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#081028] ">
                        Assitant Builder
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Customize your virtual assistant
                    </p>
                </div>

                {user.isSetupComplete && !editAssistant && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6 ">
                        <p className="text-sm text-gray-400 ">Assistant</p>
                        <h2 className="text-3xl font-bold text-[#081028] mt-1 ">
                            {user.assistantName}
                        </h2>
                        <p className="text-gray-500 mt-3 leading-7">
                            Your assistant is ready to use on your website.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 ">
                            <div className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-4 ">
                                <p className="text-sm text-gray-400 ">
                                    Current Plan
                                </p>
                                <h2 className="text-xl font-bold text-[#081028] mt-1 capitalize ">
                                    {user?.plan}
                                </h2>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-4 ">
                                <p className="text-sm text-gray-400 ">
                                    Gemini Status
                                </p>
                                <h2
                                    className={`text-xl font-bold mt-1 capitalize ${user?.geminiStatus === "active" ? "text-emerald-600" : user?.geminiStatus === "invalid" ? "text-red-500" : "text-amber-500"} `}
                                >
                                    {user?.geminiStatus}
                                </h2>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-4 ">
                                <p className="text-sm text-gray-400 ">
                                    {user?.plan === "free"
                                        ? "Messages Left"
                                        : "Plan Expiry"}
                                </p>
                                <h2 className="text-xl font-bold text-[#081028] mt-1 capitalize ">
                                    {user?.plan === "free"
                                        ? remainingMessages
                                        : `${remainingDays} Days`}
                                </h2>
                            </div>
                        </div>
                        <div className="mt-7">
                            <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 ">
                                <p className="text-sm font-semibold text-amber-900 ">
                                    Where to paste this script?
                                </p>

                                <p className="text-sm text-amber-700 mt-2 leading-6 ">
                                    Paste this script before the closing{" "}
                                    <span className="font-semibold">
                                        {"</body>"}
                                    </span>{" "}
                                    tag of your website HTML file.
                                    <br />
                                    <br />
                                    Example:
                                </p>

                                <pre className="code-scroll mt-3 bg-[#0b1020] text-emerald-400 rounded-xl p-3 text-xs font-mono overflow-x-auto ">
                                    {`<body>

    Your Website Content                                        
    <script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>
                                            
</body> `}
                                </pre>
                            </div>
                            <div className="text-sm font-medium text-[#081028] mb-3 mt-2 ">
                                Embed Code
                            </div>
                            <div className="relative">
                                <div className="code-scroll w-full h-18 bg-[#0b1020] text-emerald-400 rounded-2xl px-4 text-sm font-mono flex items-center overflow-x-auto whitespace-nowrap">
                                    {embedCode}
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            embedCode,
                                        );
                                        toast.success("Copied");
                                        setCopied(true);
                                        setTimeout(
                                            () => setCopied(false),
                                            1500,
                                        );
                                    }}
                                    className="absolute cursor-pointer top-4 right-4 w-10 h-10 rounded-xl bg-white flex items-center justify-center "
                                >
                                    <FiCheck
                                        size={18}
                                        className={`absolute text-emerald-500 transition-all duration-300 ${
                                            copied
                                                ? "opacity-100 scale-100"
                                                : "opacity-0 scale-50"
                                        }`}
                                    />
                                    <FiCopy
                                        size={18}
                                        className={`absolute transition-all duration-300 ${
                                            copied
                                                ? "opacity-0 scale-50"
                                                : "opacity-100 scale-100"
                                        }`}
                                    />
                                </button>
                            </div>
                            <button
                                onClick={() => setEditAssistant(true)}
                                className="mt-6 h-12 px-6 hover:shadow-md rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white font-medium cursor-pointer "
                            >
                                Edit Assistant
                            </button>
                        </div>
                    </div>
                )}

                {editAssistant && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-5">
                                Basic Information
                            </h2>

                            <div className="space-y-4">
                                <input
                                    onChange={(e) =>
                                        setAssistantName(e.target.value)
                                    }
                                    value={assistantName}
                                    type="text"
                                    placeholder="Assistant Name"
                                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 "
                                />

                                <input
                                    onChange={(e) =>
                                        setBusinessName(e.target.value)
                                    }
                                    value={businessName}
                                    type="text"
                                    placeholder="Business Name"
                                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 "
                                />

                                <input
                                    onChange={(e) =>
                                        setBusinessType(e.target.value)
                                    }
                                    value={businessType}
                                    type="text"
                                    placeholder="Business Type"
                                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 "
                                />

                                <textarea
                                    onChange={(e) =>
                                        setBusinessDescription(e.target.value)
                                    }
                                    value={businessDescription}
                                    rows={4}
                                    type="text"
                                    placeholder="Business Description"
                                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 resize-none"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 ">
                            <h2 className="text-lg font-semibold mb-5">
                                Appearance
                            </h2>

                            <div>
                                <label className="text-sm text-gray-600 mb-3 block ">
                                    Theme
                                </label>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ">
                                    {THEMES.map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setTheme(item)}
                                            className={`py-3 rounded-2xl border-2 capitalize cursor-pointer ${theme === item ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200"} `}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="text-sm text-gray-600 mb-3 block ">
                                    Assistant Tone
                                </label>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {TONES.map((item, index) => {
                                        const isLastOdd =
                                            TONES.length % 2 !== 0 &&
                                            index === TONES.length - 1;
                                        return (
                                            <button
                                                key={item}
                                                onClick={() => setTone(item)}
                                                className={`py-3 rounded-2xl border-2 capitalize cursor-pointer ${
                                                    tone === item
                                                        ? "border-purple-500 bg-purple-50 text-purple-700"
                                                        : "border-gray-200"
                                                } ${isLastOdd ? "col-span-2 sm:col-span-1" : ""}`}
                                            >
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between gap-4 flex-wrap mb-5 ">
                                <div>
                                    <h2 className="text-lg font-semibold ">
                                        Gemini API KEY
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1 ">
                                        Add your Gemini API Key to power your
                                        assistant
                                    </p>
                                </div>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://aistudio.google.com/api-keys"
                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium hover:scale-[1.02] transition-all"
                                >
                                    Get API Key
                                </a>
                            </div>
                            <input
                                onChange={(e) =>
                                    setGeminiApiKey(e.target.value)
                                }
                                value={geminiApiKey}
                                type="password"
                                placeholder={
                                    hasExistingKey
                                        ? "API key already saved — enter new key to change"
                                        : "AMxa79shA..."
                                }
                                className="w-full border bg-[#f7f8fc] border-gray-200 rounded-2xl px-4 py-3 text-md"
                            />
                            {hasExistingKey && (
                                <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                                    ✓ API key is saved. Leave blank to keep the
                                    current key.
                                </p>
                            )}
                            <p className="text-xs text-gray-400 mt-3 leading-6 ">
                                Your API Key is securely stored and only used
                                for generating AI responses.
                            </p>
                        </div>

                        {/* enabling navigation */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-lg font-semibold">
                                            Enable Navigation
                                        </h2>
                                        {!isPro && (
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 text-white">
                                                PRO
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {isPro
                                            ? "Assistant can redirect users to specific pages on your website"
                                            : "Upgrade to Pro to let your assistant navigate users across pages"}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        if (!isPro) {
                                            toast.error(
                                                "Navigation is a Pro feature",
                                            );
                                            return;
                                        }
                                        setEnableNavigation(!enableNavigation);
                                    }}
                                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 flex-shrink-0 ${
                                        !isPro
                                            ? "bg-gray-200 cursor-not-allowed opacity-60"
                                            : "cursor-pointer"
                                    } ${
                                        enableNavigation && isPro
                                            ? "bg-gradient-to-r from-purple-500 to-emerald-500"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                                            enableNavigation && isPro
                                                ? "translate-x-6"
                                                : "translate-x-0"
                                        }`}
                                    />
                                </button>
                            </div>

                            <div
                                className={`grid transition-all duration-500 ease-in-out ${
                                    enableNavigation && isPro
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-5 flex-wrap">
                                            <div>
                                                <h3 className="text-base font-semibold">
                                                    Navigation Pages
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    Add pages for website
                                                    navigation
                                                </p>
                                            </div>
                                            <button
                                                onClick={addPage}
                                                className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm"
                                            >
                                                <FiPlus />
                                                <span className="hidden sm:inline">
                                                    Add
                                                </span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <input
                                                type="text"
                                                placeholder="Page Name"
                                                onChange={(e) =>
                                                    setPageName(e.target.value)
                                                }
                                                value={pageName}
                                                className="border border-gray-200 rounded-2xl px-4 py-3"
                                            />

                                            <input
                                                type="text"
                                                placeholder="/page-path"
                                                onChange={(e) =>
                                                    setPagePath(e.target.value)
                                                }
                                                value={pagePath}
                                                className="border border-gray-200 rounded-2xl px-4 py-3"
                                            />

                                            <input
                                                type="text"
                                                placeholder="keywords - Pricing, Plans, etc "
                                                onChange={(e) =>
                                                    setPageKeywords(
                                                        e.target.value,
                                                    )
                                                }
                                                value={pageKeywords}
                                                className="border border-gray-200 rounded-2xl px-4 py-3"
                                            />
                                        </div>

                                        <div className="mt-5 space-y-3">
                                            <AnimatePresence>
                                                {pages.map((page, index) => (
                                                    <motion.div
                                                        key={page.path + index}
                                                        layout
                                                        initial={{
                                                            opacity: 0,
                                                            y: -8,
                                                            padding: 16,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                            padding: 16,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            x: -20,
                                                            height: 0,
                                                            padding: 0,
                                                            marginTop: 0,
                                                            marginBottom: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.25,
                                                            ease: "easeOut",
                                                        }}
                                                        className="flex items-center justify-between bg-[#f7f8fc] border border-gray-100 rounded-2xl overflow-hidden"
                                                    >
                                                        <div>
                                                            <p className="font-medium">
                                                                {page.name}
                                                            </p>
                                                            <p className="text-sm truncate text-gray-400">
                                                                {page.path}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                removePage(
                                                                    index,
                                                                )
                                                            }
                                                            className="text-red-500 cursor-pointer"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Custom Logo */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-lg font-semibold">
                                            Custom Logo
                                        </h2>
                                        {!isPro && (
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 text-white">
                                                PRO
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {isPro
                                            ? "Use your own logo on the floating assistant button"
                                            : "Upgrade to Pro to use your own branding on the floating button"}
                                    </p>
                                </div>
                            </div>

                            {isPro ? (
                                <div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl border border-gray-200 bg-[#f7f8fc] flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {logoPreview || customLogoUrl ? (
                                                <img
                                                    src={
                                                        logoPreview ||
                                                        customLogoUrl
                                                    }
                                                    alt="Logo preview"
                                                    className="w-full h-full object-contain p-2"
                                                />
                                            ) : (
                                                <span className="text-xs text-gray-400">
                                                    No logo
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex-1 flex flex-col sm:flex-row gap-3">
                                            <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
                                                <FiUpload size={16} />
                                                Choose SVG
                                                <input
                                                    type="file"
                                                    accept=".svg,image/svg+xml"
                                                    onChange={handleLogoSelect}
                                                    className="hidden"
                                                />
                                            </label>

                                            {logoFile && (
                                                <button
                                                    onClick={uploadLogo}
                                                    disabled={uploadingLogo}
                                                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium disabled:opacity-50 cursor-pointer"
                                                >
                                                    {uploadingLogo
                                                        ? "Uploading..."
                                                        : "Upload"}
                                                </button>
                                            )}

                                            {customLogoUrl && !logoFile && (
                                                <button
                                                    onClick={removeLogo}
                                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer"
                                                >
                                                    <FiTrash2 size={16} />
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-3 leading-6">
                                        * SVG format only, under 1MB. Square
                                        logos (500×500px) work best.
                                    </p>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        toast.error(
                                            "Custom logo is a Pro feature",
                                        );
                                        // navigate("/billing");
                                    }}
                                    className="w-full py-3 rounded-xl border border-dashed border-gray-300 text-sm text-gray-400 hover:border-purple-300 hover:text-purple-500 transition-colors cursor-pointer"
                                >
                                    Upgrade to Pro to unlock
                                </button>
                            )}
                        </div>

                        <button
                            onClick={saveAssistant}
                            disabled={
                                loading ||
                                !assistantName ||
                                !businessName ||
                                !businessType ||
                                !businessDescription ||
                                (!geminiApiKey && !hasExistingKey)
                            }
                            className="w-full h-14 rounded-2xl cursor-pointer bg-gradient-to-r from-purple-500 to-emerald-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Saving..."
                                : user.isSetupComplete
                                  ? "Update Assistant"
                                  : "Save Assistant"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Builder;
