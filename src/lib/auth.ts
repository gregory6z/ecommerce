import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google as any],
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? "email@example.com";
        session.user.name = token.name ?? "Nome Desconhecido";
      }
      return session;
    },
  },
});
