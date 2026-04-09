import { useQuery } from '@tanstack/react-query'
import {
    getTrendingMovies,
    searchMovies,
    getMovieById,
    getMovieCredits,
    getSimilarMovies,
    getMoviesByGenderId,
    getGenres
} from '@/api/movies'

export const movieKeys = {
    trending: ['movies', 'trending'] as const,
    genres: ['movies', 'genres'] as const,
    search: (query: string, page: number) => ['movies', 'search', query, page] as const,
    detail: (id: number) => ['movies', 'detail', id] as const,
    credits: (id: number) => ['movies', 'credits', id] as const,
    similar: (id: number) => ['movies', 'similar', id] as const,
    moviesGenre: (genderId:number,page: number) => ['movies', 'byGenre', genderId,page] as const,

}

export function useTrendingMovies() {
    return useQuery({
        queryKey: movieKeys.trending,
        queryFn: getTrendingMovies,
    })
}

export function useSearchMovies(query: string, page: number) {
    return useQuery({
        queryKey: movieKeys.search(query, page),
        queryFn: () => searchMovies(query, page),
        enabled: query.trim().length > 0,
    })
}

export function useMovieDetail(id: number) {
    return useQuery({
        queryKey: movieKeys.detail(id),
        queryFn: () => getMovieById(id),
        staleTime: 1000 * 60 * 30,
    })
}

export function useMovieCredits(id: number) {
    return useQuery({
        queryKey: movieKeys.credits(id),
        queryFn: () => getMovieCredits(id),
        staleTime: 1000 * 60 * 30,
    })
}

export function useSimilarMovies(id: number) {
    return useQuery({
        queryKey: movieKeys.similar(id),
        queryFn: () => getSimilarMovies(id),
    })
}

export function useGenres() {
    return useQuery({
        queryKey: movieKeys.genres,
        queryFn: getGenres,
    })
}

export function useMovieByGender(genreId: number,page: number) {
    return useQuery({
        queryKey: movieKeys.moviesGenre(genreId,page),
        queryFn: () => getMoviesByGenderId(genreId,page),
        staleTime: 1000 * 60 * 30,
    })
}