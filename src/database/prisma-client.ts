import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import mariadb from 'mariadb'


// const adapter = new PrismaBetterSqlite3({
//   url: process.env.DATABASE_URL!,
// })

const pool = mariadb.createPool({
  uri: process.env.DATABASE_URL!,
  
});

const adapter = new PrismaMariaDb(pool);

export const prisma = new PrismaClient({adapter})