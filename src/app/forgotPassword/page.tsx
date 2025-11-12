'use client'

import React, { useEffect, useState } from "react";
import axios from'axios';
import {useRouter} from 'next/navigation'

export default function ForgotPassword() {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        axios.post('/api/users/resetPassword', {token, oldPassword, newPassword})
        .then(res => {
            console.log(res.data);
            setSuccess(true);
            setLoading(false);
            router.push("/login");
        })
        .catch(err => {
            setError(err.response.data.message);
            setLoading(false);
        })
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setTimeout(() => setToken(urlToken || ""), 0);
    },[])

    return (
        <div className="min-h-screen bg-gradient-to-tl from-blue-900 via-black to-blue-700 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto px-6 py-12 rounded-3xl shadow-2xl bg-black bg-opacity-70 flex flex-col items-center relative">
                {/* Animated background waves */}
                <svg className="absolute -top-10 right-0 animate-pulse" width="120%" height="220" viewBox="0 0 1400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#1e3a8a" fillOpacity="0.27" d="M0,60 C480,220 960,40 1400,140 L1400,220 L0,220 Z"></path>
                </svg>
                <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6 text-center drop-shadow">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full z-10">
                    <div>
                        <label className="block text-blue-100 font-medium mb-1">Old Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            className="w-full px-4 py-2 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-blue-100 font-medium mb-1">New Password</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            className="w-full px-4 py-2 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-400 text-center font-bold py-2">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-400 text-center font-bold py-2">
                            Password changed successfully!
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`mt-3 w-full py-2 rounded-full bg-gradient-to-r from-blue-400 via-blue-700 to-blue-500 text-white font-semibold text-lg shadow-lg transition-all
                            ${loading ? "opacity-60 cursor-not-allowed" : "hover:from-blue-500 hover:to-blue-600 hover:scale-105"}
                        `}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
