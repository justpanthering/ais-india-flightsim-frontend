import axios from "axios";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        try {
          const res = await axios.post<{ email: string }>(
            `${process.env.NEXTAUTH_URL}/api/login`,
            credentials
          );
          const user = res.data;
          console.log(res.status, res.data, user);

          // If no error and we have user data, return it
          if (res.status === 200 && user) {
            return user;
          }
          // Return null if user data could not be retrieved
          return null;
        } catch (e) {
          console.error("error:", e.message);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    // maxAge: 30,
  },
});
