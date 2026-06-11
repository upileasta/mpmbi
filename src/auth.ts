import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { z } from "zod"
import argon2 from "argon2"
import { db } from "./lib/db"

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await db.user.findUnique({ where: { email } })
          if (!user) return null
          
          const passwordsMatch = await argon2.verify(user.password, password)
          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
})
