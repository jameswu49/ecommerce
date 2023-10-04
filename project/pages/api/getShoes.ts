import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const data = await prisma.shoes.findMany();
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Unable to fetch data' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).end();
    }
}
