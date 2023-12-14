<<<<<<< HEAD
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export const { signIn, signOut } = NextAuth(authConfig)
=======
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import CredentialsProvider from 'next-auth/providers/credentials';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [CredentialsProvider({
    name: 'Credentials',
    credentials: {
        username: {
            label: 'Username',
            type: 'text',
            placeholder: 'enter username ..',
        },
        password: {
            label: 'Password',
            type: 'password',
            placeholder: 'enter password ..',
        },
    },
    async authorize(credentials, req: Request | any) {
        const password = req.body?.password;
        const username = req.body?.username;
        if (username == 'admin' && password == 'assiy133') {
            const user: { id: number; name: string; username: string } | any = {
                id: 1,
                name: 'Alex Sirait',
                username: username,
            };
            return user;
        } else {
            return null;
        }
    },
}),],
});
>>>>>>> test
