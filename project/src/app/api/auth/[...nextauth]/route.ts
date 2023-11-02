import { PrismaClient } from '@prisma/client';
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User as UserModel } from '@prisma/client'

const prisma = new PrismaClient();

type Credentials = {
    username: string,
    password: string
}

type User = {
    id: string,
    username: string,
    password: string
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Username' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: Credentials, req: any): Promise<User | null> {
                try {
                    const user = await prisma.user.findUnique({
                        where: { username: credentials?.username, password: credentials?.password },
                    });

                    if (user) {
                        return user
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
        async jwt({ token, user }: { token: any; user: any }) {
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
