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

        console.log(username)

        try {
            const newUser = await prisma.user.create({
                data: {
                    username,
                    password,
                },
            });

            console.log('User created:', newUser);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'User creation failed' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).end();
    }
};
