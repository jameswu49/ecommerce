import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Item = {
    id: number,
    cartId: number,
    productName: string,
    productPrice: number
    productImage: string | null,
    quantity: number
}

type Element = {
    id: number,
    name: string,
    price: number,
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
                return productData.some((element: Element) => element.image === item.productImage);
            });

            const newItem = productData.filter((element: any) => {
                return !user.cart?.cartItems?.some((item: Item) => element.image === item.productImage);
            });

            if (existingItem) {
                const updatedQuantity = existingItem.map((item: Item) => {
                    return item.quantity
                })

                const updatedCartItems = await Promise.all(existingItem.map(async (item: Item, index: number) => {
                    const updatedCartItem = await prisma.cartItem.update({
                        where: { id: item.id },
                        data: { quantity: item.quantity + updatedQuantity[index] },
                    });
                    return updatedCartItem;
                }));

                res.json(updatedCartItems);

            }

            if (newItem) {
                const createdCartItems = await Promise.all(newItem.map(async (element: Element) => {
                    const createdCartItem = await prisma.cartItem.create({
                        data: {
                            productName: element.name || '',
                            productPrice: element.price || 0,
                            productImage: element.image || '',
                            quantity: element.quantity || 1,
                            cart: { connect: { id: user.cart?.id } },
                        },
                    });
                    console.log(createdCartItem)
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
