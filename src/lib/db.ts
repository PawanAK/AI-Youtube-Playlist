import { PrismaClient } from "@prisma/client";
import "server-only";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

  export async function getAllPlaylists() {
    return prisma.playlist.findMany({
      include: {
        videos: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;