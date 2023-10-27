import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from '../../../../../node_modules/next-auth/index';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
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
    callbacks: {
        async jwt({ token, user, session }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.email
                }
            }
            return token
        },
        async session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
