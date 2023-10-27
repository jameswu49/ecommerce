import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            // Delete all records in the 'cartItem' table.
            await prisma.cartItem.deleteMany({});
            console.log('Table reset successfully.');
            res.status(200).json({ message: 'Table reset successfully.' });
        } catch (error) {
            console.error('Error resetting table:', error);
            res.status(500).json({ error: 'Error resetting table' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
