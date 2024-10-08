import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import { getAccount } from '@/utils/sign'

function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Simple validation
        if (!email || !password) {
            setError('Please fill in all fields.')
            return
        }

        try {
            const result = await getAccount(email)

            if (!result.user) {
                setError('User not found')
                return
            }

            const encryptedStoredPassword = result.user.password
            const secretKey = process.env.NEXT_PUBLIC_REACT_PASS_ENCRYPT

            // Decrypt the stored password
            const decryptedStoredPassword = CryptoJS.AES.decrypt(encryptedStoredPassword, secretKey).toString(CryptoJS.enc.Utf8)

            // Compare the decrypted stored password with the provided password
            if (decryptedStoredPassword === password) {
                alert('Signed in successfully')
                // Handle successful sign-in (e.g., redirect to dashboard)
            } else {
                setError('Incorrect password')
            }
        } catch (err) {
            console.error('Error during sign-in:', err)
            setError('An error occurred during sign-in.')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center">Sign In</h2>
                {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Sign In
                    </button>
                    <p className="mt-2">
                        No account?
                        <a href="/signup" className="ml-1 hover:text-blue-500">
                            <u>Sign up</u>
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signin
