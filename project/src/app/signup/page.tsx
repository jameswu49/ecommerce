// components/SignUpForm.tsx
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react"

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState<string>('')

    const router = useRouter()

    const { status } = useSession();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async () => {
        const result = await signIn("credentials", {
            redirect: false,
            username: formData.username,
            password: formData.password,
        });

        if (result.error) {
            console.error("Sign-in error:", result.error);
        } else {
            router.push("/");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                setMessage('Account created successfully! Redirecting...')
                handleSignIn()
            } else {
                const data = await response.json();
                setMessage(data.error)
                console.error('User creation failed:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred during sign-up:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="h-screen flex flex-col items-center justify-center">
            <h1 className="font-bold text-xl my-4">Create An Account</h1>
            <div className="h-3/4">
                <div className="rounded-md w-80 border flex flex-col gap-y-5 justify-center pl-5">

                    {<p className="text-[red] font-bold text-center">{message}</p>}

                    <label className="flex flex-col">
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border border-black w-3/4"
                        />
                    </label>

                    <label className="flex flex-col">
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-black w-3/4"
                        />
                    </label>
                    <div>
                        <button type="submit" className="border p-1 mb-4 bg-[red] text-white w-1/2">Sign Up</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
