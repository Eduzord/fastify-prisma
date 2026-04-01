import { PrismaClient } from "@prisma/client";

// O código do database será referenciado via const prisma
export const prisma = new PrismaClient();