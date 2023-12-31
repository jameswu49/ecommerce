// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password || username.trim() === '' || password.trim() === '') {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        try {
            const newUser = await prisma.user.create({
                data: {
                    username,
                    password,
                },
            });

            const newCart = await prisma.cart.create({
                data: {
                    userId: newUser.id,
                },
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Username already exists' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).end();
    }
};
