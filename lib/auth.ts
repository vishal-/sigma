import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "facebook", "microsoft"],
      requireLocalEmailVerified: false,
    },
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "google_placeholder_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google_placeholder_secret",
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || "facebook_placeholder_id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "facebook_placeholder_secret",
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID || "microsoft_placeholder_id",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "microsoft_placeholder_secret",
    },
  },
});

