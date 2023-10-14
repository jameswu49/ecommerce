import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId, productData } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                cart: { include: { cartItems: true } },
            }
        });

        if (user && user.cart) {
            const newItem = {
                productName: productData.name || '',
                productPrice: productData.price || 0,
                productImage: productData.image || '',
                quantity: 1,
            };

            const updatedCartItems = await prisma.cartItem.create({
                data: {
                    ...newItem,
                    cart: {
                        connect: { id: user.cart.id },
                    },
                },
            });

            res.json(updatedCartItems);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Unable to fetch users' });
    } finally {
        await prisma.$disconnect();
    }
}
