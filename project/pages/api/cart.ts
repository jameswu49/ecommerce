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
            const productImage = productData.image
            const existingItem = user.cart.cartItems.find((item: any) => productImage === item.productImage)

            if (existingItem) {
                const updatedQuantity = existingItem.quantity + productData.quantity

                const updatedCartItem = await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: updatedQuantity },
                });
                res.json(updatedCartItem);

            } else {
                const newItem = {
                    productName: productData.name || '',
                    productPrice: productData.price || 0,
                    productImage: productData.image || '',
                    quantity: productData.quantity || 1,
                    cart: { connect: { id: user.cart.id } },
                };

                const createdCartItem = await prisma.cartItem.create({
                    data: {
                        ...newItem,
                        cart: {
                            connect: { id: user.cart.id },
                        },
                    },
                });
                res.json(createdCartItem);
            }
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Unable to fetch users' });
    } finally {
        await prisma.$disconnect();
    }
}
