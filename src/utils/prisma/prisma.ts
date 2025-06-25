import { PrismaClient } from "@/generated/prisma";


type PrismaClientOptions = {
  log?: Array<'query' | 'info' | 'warn' | 'error'>;
};

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaOptions: PrismaClientOptions = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn'] : ['error'],
};

export const prisma = global.prisma || new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export type { PrismaClient };
