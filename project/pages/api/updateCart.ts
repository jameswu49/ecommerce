import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Item = {
    id: number,
    productName: string,
    name: string,
    productPrice: number
    price: number,
    productImage: string,
    image: string,
    quantity: number
}

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

            const existingItem = user.cart.cartItems.filter((item: Item) => {
                return productData.some((element: Item) => element.image === item.productImage);
            });

            const newItem = productData.filter((item: Item) => {
                return !user.cart.cartItems.some((element: Item) => element.productImage === item.image);
            });

            if (existingItem) {
                const updatedQuantity = existingItem.map((element: Item) => {
                    return element.quantity
                })

                const updatedCartItems = await Promise.all(existingItem.map(async (element: Item, index: number) => {
                    const updatedCartItem = await prisma.cartItem.update({
                        where: { id: element.id },
                        data: { quantity: element.quantity + updatedQuantity[index] },
                    });
                    return updatedCartItem;
                }));

                res.json(updatedCartItems);

            }

            if (newItem) {
                const createdCartItems = await Promise.all(newItem.map(async (element: Item) => {
                    const createdCartItem = await prisma.cartItem.create({
                        data: {
                            productName: element.name || '',
                            productPrice: element.price || 0,
                            productImage: element.image || '',
                            quantity: element.quantity || 1,
                            cart: { connect: { id: user.cart.id } },
                        },
                    });
                    return createdCartItem;
                }));

                res.json(createdCartItems);

            }
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Unable to fetch users' });
    } finally {
        await prisma.$disconnect();
    }
}
