import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

class InvalidCredentialsError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "InvalidCredentialsError";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: {},
        email: {},
        password: {},
        confirmPassword: {},
        type: {},
      },
      // @ts-ignore
      authorize: async (credentials) => credentials,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user._id;
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.createdAt = user.createdAt;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        // @ts-ignore
        session.user = token;
      }

      return session;
    },
  },
});
