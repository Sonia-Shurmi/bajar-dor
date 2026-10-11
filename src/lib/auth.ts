
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.BETTER_AUTH_DB_URI;

if (!mongoUri) {
  throw new Error("BETTER_AUTH_DB_URI is not configured");
}

const client = new MongoClient(mongoUri);

const db = client.db(process.env.MONGODB_DB_NAME || "bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
  },

account: {
  accountLinking: {
    enabled: true,
    trustedProviders: ["google", "github"],
    requireLocalEmailVerified: false,
  },
},

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
