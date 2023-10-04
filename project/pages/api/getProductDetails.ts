import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const productId = parseInt(req.query.id as string, 10);
            const category = req.query.category
            let product;

            if (category === 'Jackets') {
                product = await prisma.jackets.findUnique({
                    where: { id: productId + 1 },
                });
            } else if (category === 'Shirts') {
                product = await prisma.shirts.findUnique({
                    where: { id: productId + 1 },
                });
            } else if (category === 'Tops') {
                product = await prisma.tops.findUnique({
                    where: { id: productId + 1 },
                });
            } else if (category === 'Sweatshirts') {
                product = await prisma.sweatshirts.findUnique({
                    where: { id: productId + 1 },
                });
            } else if (category === 'Pants') {
                product = await prisma.pants.findUnique({
                    where: { id: productId + 1 },
                });
            } else if (category === 'Accessories') {
                product = await prisma.accessories.findUnique({
                    where: { id: productId + 1 },
                });
            } else if (category === 'Shoes') {
                product = await prisma.shoes.findUnique({
                    where: { id: productId + 1 },
                });
            }

            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ error: 'Unable to fetch product details' });
        }
        finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).end(); // Method not allowed for non-GET requests
    }
}
