import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Username' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    // Find the user by username
                    const existingUser = await prisma.user.findUnique({
                        where: { username: credentials.username },
                    });

                    if (existingUser) {
                        console.log(existingUser)
                        return existingUser
                    }
                    return null;

                } catch (error) {
                    console.error("Error during authorization:", error);
                    throw new Error("Authentication failed");
                } finally {
                    await prisma.$disconnect();
                }
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
