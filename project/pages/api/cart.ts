import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId, productData } = req.body
        console.log(req.body)

        const user = await prisma.user.findUnique({
            where: { id: 1 },
        });

        if (user && user.cart) {
            const newItem = {
                name: productData.name || '',
                price: productData.price || 0,
                image: productData.image || ''
            }

            await prisma.cart.update({
                where: { id: user.card.id },
                data: { items: { push: newItem } }
            })
            res.json(user.cart)

        } else {
            const newCart = await prisma.cart.create({
                data: {
                    userId,
                    items: [productData],
                },
            });
            res.json(newCart)
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Unable to fetch users' });
    } finally {
        await prisma.$disconnect();
    }
    res.status(405).end();
}