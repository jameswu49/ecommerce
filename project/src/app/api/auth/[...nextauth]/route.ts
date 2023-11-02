import { PrismaClient } from '@prisma/client';
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Username' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: { username: string; password: string | null }) {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { username: credentials.username, password: credentials.password },
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
        async jwt({ token, user }: { token: any; user: { id: number; username: string; password: string }; }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.username
                }
            }
            return token
        },
        async session({ session, token }: { session: Session; token: any }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
