'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    axios.post('/api/users/login', user).then(res => {
      setUser({
        email: "",
        password: "",
      })
      console.log(res.data);
      router.push('/profile');
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  // Add the forgot password click handler placeholder
  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/forgotPassword/email');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated Background - Darker and more intense */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-900/40 to-gray-900/30 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 60% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`,
          animation: 'float 8s ease-in-out infinite'
        }}></div>
      </div>

      {/* Floating particles - More varied */}
      <div className="absolute inset-0">
        <div className="absolute top-1/5 left-1/5 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-white rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-1/5 right-1/3 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-ping opacity-45"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm">
          {/* Tech Stack Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                {/* Stack layers */}
                <rect x="3" y="8" width="18" height="2" rx="1" fill="currentColor"/>
                <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" opacity="0.8"/>
                <rect x="3" y="14" width="18" height="2" rx="1" fill="currentColor" opacity="0.6"/>
                <rect x="3" y="17" width="18" height="2" rx="1" fill="currentColor" opacity="0.4"/>
                {/* Code brackets */}
                <path d="M7 4L5 6V18L7 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M17 4L19 6V18L17 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                {/* Tech dots */}
                <circle cx="12" cy="6" r="1" fill="currentColor"/>
                <circle cx="15" cy="6" r="1" fill="currentColor"/>
                <circle cx="9" cy="6" r="1" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Welcome back</h1>
            <p className="text-gray-400 text-base">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-base"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-base"
                  placeholder="Enter your password"
                />
              </div>

              {/* Sign In Button with Enhanced Wave Animation */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
              >
                <span className="relative z-10 text-base">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </span>

                {/* Enhanced Wave Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <div className="absolute inset-0 animate-wave bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>

                {/* Enhanced Ripple effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-600 rounded-xl"></div>
                </div>
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </a>
            </div>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-black/20 text-gray-500 rounded-full">or</span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Dont have an account?{' '}
                <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default LoginPage
