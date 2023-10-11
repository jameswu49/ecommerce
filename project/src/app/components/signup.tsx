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

        // Send a POST request to your API route for user creation
        try {
            const response = await fetch('/api/signup', {
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    );
}
