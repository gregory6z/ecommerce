import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Exibe os dados do usuário autenticado no console
      console.log("Dados do usuário autenticado pelo Google:", {
        email: profile?.email,
        name: profile?.name,
        picture: profile?.picture,
      });

      // Permite o login
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        // Adiciona informações do token à sessão, se necessário
        session.user.email = token.email ?? "email@example.com"; // Valor padrão se token.email for null ou undefined
        session.user.name = token.name ?? "Nome Desconhecido";
      }
      return session;
    },
  },
});
