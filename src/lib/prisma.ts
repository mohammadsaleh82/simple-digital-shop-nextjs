import type * as PrismaType from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });
export type { PrismaType };
