import prisma from "../config/db.js";

export async function getWatchlist(userId: string) {
    return prisma.watchlist.findMany({
        where: { userId },
        orderBy: { addedAt: "desc" },
    });
}

export async function addToWatchlist(userId: string, movieId: number) {
    return prisma.watchlist.create({
        data: { userId, movieId },
    });
}

export async function removeFromWatchlist(userId: string, movieId: number) {
    return prisma.watchlist.deleteMany({
        where: { userId, movieId },
    });
}