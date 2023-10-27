// components/SignUpForm.tsx
'use client'
import { useState } from "react";

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                // User created successfully, handle success (e.g., redirect)
                console.log('User created successfully');
            } else {
                // Handle the case where user creation failed
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
                <div className="h-64 rounded-md w-80 border flex flex-col gap-y-5 justify-center pl-5">

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
                        <button type="submit" className="border p-2 bg-[red] text-white">Sign Up</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
