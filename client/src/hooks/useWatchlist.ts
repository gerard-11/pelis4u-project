import { useMutation, useQuery } from '@tanstack/react-query'
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '@/api/watchlist'
import { queryClient } from '@/lib/queryClient'

export const watchlistKeys = {
    all: ['watchlist'] as const,
}

export function useWatchlist() {
    return useQuery({
        queryKey: watchlistKeys.all,
        queryFn: getWatchlist,
        staleTime: 0,
    })
}

export function useAddToWatchlist() {
    return useMutation({
        mutationFn: (movieId: number) => addToWatchlist(movieId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: watchlistKeys.all })
        },
    })
}

export function useRemoveFromWatchlist() {
    return useMutation({
        mutationFn: (movieId: number) => removeFromWatchlist(movieId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: watchlistKeys.all })
        },
    })
}