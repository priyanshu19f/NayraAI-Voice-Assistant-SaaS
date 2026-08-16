import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Builder from "./pages/Builder";
import Billing from "./pages/Billing";
import { Toaster } from "react-hot-toast";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

export const ServerUrl = "https://nayraaiserver.onrender.com";
export const CLIENT_URL = "http://localhost:5173";
function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await axios.get(
                    `${ServerUrl}/api/user/current-user`,
                    { withCredentials: true },
                );

                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchMe();
    }, []);
    return (
        <>
            <Toaster position="top-right" />
            <Routes>
                {!user && (
                    <Route
                        path="/login"
                        element={<Login setUser={setUser} />}
                    />
                )}

                <Route
                    path="/*"
                    element={
                        <ProtectedRoute user={user} loading={loading}>
                            <Navbar setUser={setUser} user={user} />
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Home user={user} />}
                                />
                                <Route
                                    path="/builder"
                                    element={
                                        <Builder
                                            user={user}
                                            setUser={setUser}
                                        />
                                    }
                                />
                                <Route
                                    path="/billing"
                                    element={
                                        <Billing
                                            user={user}
                                            setUser={setUser}
                                        />
                                    }
                                />

                                <Route
                                    path="/privacy-policy"
                                    element={<PrivacyPolicy />}
                                />

                                <Route path="/terms" element={<Terms />} />

                                <Route
                                    path="*"
                                    element={<Navigate to="/" replace />}
                                />
                            </Routes>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
