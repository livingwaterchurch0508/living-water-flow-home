import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import Kakao from "@auth/core/providers/kakao";
import Naver from "@auth/core/providers/naver";
import Google from "@auth/core/providers/google";
import Apple from "@auth/core/providers/apple";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
    newUser: "/",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.email,
              password: credentials.password,
            }),
          },
        );

        if (!authResponse.ok) {
          return null;
        }
        const user = await authResponse.json();

        return user;
      },
    }),
    Kakao({
      authorization: {
        params: {
          scope: "account_email",
        },
      },
    }),
    Naver,
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Apple,
  ],
});
