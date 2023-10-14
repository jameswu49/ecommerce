import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        // Fetch the user based on userId from your database
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId as string) }, // Parse userId as an integer
            include: {
                cart: {
                    include: {
                        cartItems: true,
                    },
                },
            },
        });

        if (user && user.cart) {
            // Extract cart items from the user's cart
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
