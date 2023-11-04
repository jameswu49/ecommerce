// pages/auth/signin.tsx
'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter()

    const handleSignIn = async (e) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            username,
            password,
            // callbackUrl: null, // Redirect URL after successful sign-in
        });

        if (result.error) {
            console.log(result.error)
            console.error("Sign-in error:", result.error);
        } else {
            router.push('/')
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}
