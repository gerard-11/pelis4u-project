import { axiosClient } from '@/lib/axiosClient'
import type { WatchlistItem } from '@/types'

export async function getWatchlist(): Promise<WatchlistItem[]> {
    const { data } = await axiosClient.get<WatchlistItem[]>('/api/watchlist')
    return data
}

export async function addToWatchlist(movieId: number): Promise<WatchlistItem> {
    const { data } = await axiosClient.post<WatchlistItem>('/api/watchlist', { movieId })
    return data
}

export async function removeFromWatchlist(movieId: number): Promise<void> {
    await axiosClient.delete(`/api/watchlist/${movieId}`)
}