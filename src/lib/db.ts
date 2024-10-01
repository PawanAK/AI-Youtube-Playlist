import { PrismaClient } from "@prisma/client";
import "server-only";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getAllPlaylists() {
  try {
    return await prisma.playlist.findMany({
      include: {
        videos: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}