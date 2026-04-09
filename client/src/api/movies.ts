import { axiosClient } from '@/lib/axiosClient'
import type {Credits, Genre, Movie, MovieDetail, PaginatedResponse} from '@/types'

export async function getTrendingMovies(): Promise<Movie[]> {
    const { data } = await axiosClient.get<PaginatedResponse<Movie>>('/api/movies/trending')
    return data.results
}

export async function searchMovies(query: string, page = 1): Promise<PaginatedResponse<Movie>> {
    const { data } = await axiosClient.get<PaginatedResponse<Movie>>('/api/movies/search', {
        params: { q: query, page },
    })
    return data
}

export async function getMovieById(id: number): Promise<MovieDetail> {
    const { data } = await axiosClient.get<MovieDetail>(`/api/movies/${id}`)

    return data
}

export async function getMovieCredits(id: number): Promise<Credits> {
    const { data } = await axiosClient.get<Credits>(`/api/movies/${id}/credits`)
    return data
}

export async function getSimilarMovies(id: number): Promise<Movie[]> {
    const { data } = await axiosClient.get<PaginatedResponse<Movie>>(`/api/movies/${id}/similar`)
    return data.results
}

export async function getGenres(): Promise<Genre[]> {
    const { data } = await axiosClient.get<Genre[]>('/api/movies/genres')
    return data
}

export async function getMoviesById(
    genreId:number,
    page:number=1
): Promise<Movie[]> {
    const { data } = await axiosClient.get<Movie[]>(`/api/movies/genre/${genreId}`,{
        params: { page }
    }
    )
    return data
}