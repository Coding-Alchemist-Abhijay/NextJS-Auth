'use client'

import React, {useState, useEffect} from "react"
import axios from 'axios'

export default function VerifyEmail() {
    const [isVerified, setIsVerified] = useState(false);
    const[token , setToken] = useState("");

    const verifyEmail = () => {
        axios.post('/api/users/verifyEmail', {token})
        .then(res => {
            setIsVerified(res.data.success);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setTimeout(() => setToken(urlToken || ""), 0);
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-gradient-to-tl from-blue-900 via-black to-blue-700 flex flex-col items-center justify-center relative">
            {/* Animated background waves */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute animate-pulse top-0 left-0" width="140%" height="350" viewBox="0 0 1440 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#1e3a8a" fillOpacity="0.4" d="M0,160 C480,350 960,50 1440,200 L1440,320 L0,320 Z"></path>
                </svg>
                <svg className="absolute animate-[pulse_7s_ease-in-out_infinite] bottom-0 right-0" width="140%" height="330" viewBox="0 0 1440 330" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#2563eb" fillOpacity="0.2" d="M0,200 C600,20 900,400 1440,110 L1440,320 L0,320 Z"></path>
                </svg>
            </div>
            <div className="z-10 w-full max-w-md mx-auto px-6 py-12 bg-black bg-opacity-60 rounded-3xl shadow-2xl flex flex-col items-center">
                <h1 className="text-4xl font-bold text-blue-400 drop-shadow mb-4 text-center">Verify Email</h1>
                <div className="mb-4 text-md flex flex-col items-center space-y-2 w-full">
                    <div className="w-full px-3 py-2 bg-blue-900 rounded-lg text-blue-100 flex justify-between items-center">
                        <span className="font-semibold">Token:</span>
                        <span className="break-all max-w-[180px] text-blue-200">{token || "No token"}</span>
                    </div>
                    <div className="w-full px-3 py-2 bg-blue-950 rounded-lg text-blue-200 flex justify-between items-center">
                        <span className="font-semibold">Verified:</span>
                        <span>
                            {isVerified 
                                ? <span className="text-green-400 font-bold drop-shadow">Yes</span>
                                : <span className="text-red-500 font-bold">No</span>
                            }
                        </span>
                    </div>
                </div>
                {isVerified && (
                    <a
                        href="/login"
                        className="mt-6 relative inline-block group"
                    >
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-blue-800 to-blue-400 blur opacity-60 transition-all duration-300 group-hover:blur-md group-hover:opacity-80 animate-waves"></span>
                        <span className="relative px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 via-blue-800 to-blue-400 text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:ring-4 group-hover:ring-blue-400 group-hover:ring-opacity-60 overflow-hidden">
                            Go to Login
                        </span>
                    </a>
                )}
            </div>
            <style jsx>{`
                .animate-waves {
                    animation: wavey 5s linear infinite alternate;
                }

                @keyframes wavey {
                    0% { left: 0 }
                    100% { left: 20px }
                }
            `}</style>
        </div>
    );
}