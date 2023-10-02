// pages/api/getUsers.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') { // Change the HTTP method to GET
        try {
            const data = await prisma.jackets.findMany(); // Query all users
            res.status(200).json(data); // Return the users as JSON
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Unable to fetch users' });
        } finally {
            await prisma.$disconnect(); // Disconnect from the database to release the connection
        }
    } else {
        res.status(405).end(); // Method not allowed for non-GET requests
    }
}
