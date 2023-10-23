import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId as string) },
            include: {
                cart: {
                    include: {
                        cartItems: {
                            orderBy: {
                                id: 'asc'
                            }
                        },
                    },
                },
            },
        });

        if (user && user.cart) {
            const cartItems = user.cart.cartItems;

            res.json(cartItems);
        } else {
            res.status(404).json({ error: 'User or cart not found' });
        }
    } catch (error) {
        console.error('Error fetching user products:', error);
        res.status(500).json({ error: 'Unable to fetch user products' });
    } finally {
        await prisma.$disconnect();
    }
}
