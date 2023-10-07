import authApi from '@/services/api/login'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string
    token: string
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log(credentials)
        const user = {
          id: '42',
          name: '',
          password: 'nextauth',
          role: 'manager',
        }

        const { username, password } = credentials as {
          username: string
          password: string
        }

        try {
          const res = await authApi.postAuthLogin({ username, password })
          console.log(res)
          return {
            id: 'test',
            token: res.data.token,
          }
        } catch (e) {
          console.log(e)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       if (user) token.role = user.role;
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       if (session?.user) session.user.role = token.role;
  //       return session;
  //     },
  //   },
}
