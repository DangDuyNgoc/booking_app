import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { config } from "../config/env.js";

export const prisma = new PrismaClient({
  adapter: new PrismaPg(config.databaseUrl)
});
