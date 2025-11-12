'use client'

import React, { useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';

const ForgotPasswordEmailPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for email input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios.post('/api/users/forgotPassword', { email })
      .then(res => {
        console.log(res.data);
        setEmail('');
        setIsSubmitting(false);
        router.push('/login');
      })
      .catch(err => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-blue-900 to-black relative px-4">
      <div className="w-full max-w-md bg-black/70 rounded-2xl shadow-2xl overflow-hidden border border-blue-900/30 p-8 backdrop-blur-md z-10">
        <h1 className="text-3xl font-bold text-blue-200 mb-4 text-center tracking-tight">
          Forgot your password?
        </h1>
        <p className="text-blue-100 text-base mb-8 text-center">
          Enter your email address and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-blue-300 text-sm mb-3 font-semibold">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleInputChange}
            required
            placeholder="you@email.com"
            className="w-full px-4 py-3 mb-6 rounded-lg bg-gradient-to-tr from-black/50 via-blue-950/70 to-gray-900/70 border border-blue-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-200 placeholder-blue-500 transition-all duration-300 text-base"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-900 hover:from-blue-900 hover:to-blue-700 text-white text-base font-semibold shadow-md transition-all duration-200 ease-in-out relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {isSubmitting ? 'Submitting...' : 'Send Reset Link'}
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 animate-wave bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"></div>
            </div>
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-lg"></div>
            </div>
          </button>
        </form>
      </div>
      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(-100%);}
          100% { transform: translateX(100%);}
        }
        .animate-wave {
          animation: wave 1.4s ease-in-out infinite;
        }
      `}</style>
      {/* Blue glow / particles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-20 left-16 w-24 h-24 bg-blue-600 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-2/3 right-32 w-16 h-16 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-24 left-1/3 w-32 h-16 bg-cyan-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-14 bg-blue-300 rounded-full blur-2xl opacity-10 animate-ping"></div>
      </div>
    </div>
  );
};

export default ForgotPasswordEmailPage;
