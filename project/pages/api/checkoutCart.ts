import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const userId = parseInt(req.query?.userId, 10);

        if (userId) {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    include: { cart: { include: { cartItems: true } } },
                });

                const cartItems = user?.cart?.cartItems || [];

                console.log(cartItems.map((item: any) => item.id))

                await prisma.cartItem.deleteMany({
                    where: { id: { in: cartItems.map((item: any) => item.id) } },
                });

                res.status(200).json({ message: 'Cart items deleted successfully' });
            } catch (error) {
                console.error('Error deleting cart items:', error);
                res.status(500).json({ error: 'Internal server error' });
            } finally {
                await prisma.$disconnect();
            }
        }
    } else {
        res.status(405).end();
    }

}