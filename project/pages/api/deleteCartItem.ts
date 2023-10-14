import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const { cartItemId } = req.query

        if (!cartItemId) {
            return res.status(400).json({ error: 'Cart Item ID is required' })
        }

        try {
            await prisma.cartItem.delete({
                where: { id: Number(cartItemId) }
            })

            res.status(204).end();
        } catch (error) {
            console.error('Error deleting cart item:', error)
            res.status(500).json({ error: 'Failed to delete cart item' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).end();
    }
}
