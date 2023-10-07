import authApi from "@/services/api/login";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "42",
          name: "",
          password: "nextauth",
          role: "manager",
        };

        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const res = await authApi.postAuthLogin({ username, password });
        console.log(res);
        if (res) {
          user.name = `${res.data}`;
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
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
};
