import { tmdbClient } from "../lib/tmdb.client.js";

export interface TmdbMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids?: number[];
    genres?: { id: number; name: string }[];
    runtime?: number | null;
}

export interface TmdbPaginatedResponse {
    page: number;
    results: TmdbMovie[];
    total_pages: number;
    total_results: number;
}

export interface TmdbCastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

export interface TmdbCredits {
    id: number;
    cast: TmdbCastMember[];
}


export async function getTrending(): Promise<TmdbPaginatedResponse> {
    const { data } = await tmdbClient.get<TmdbPaginatedResponse>(
        "/trending/movie/week"
    );
    return data;
}

export async function searchMovies(
    query: string,
    page: number = 1
): Promise<TmdbPaginatedResponse> {
    const { data } = await tmdbClient.get<TmdbPaginatedResponse>(
        "/search/movie",
        {
            params: { query, page },
        }
    );
    return data;
}

export async function getMovieById(movieId: number): Promise<TmdbMovie> {
    const { data } = await tmdbClient.get<TmdbMovie>(`/movie/${movieId}`);
    return data;
}

export async function getMovieCredits(movieId: number): Promise<TmdbCredits> {
    const { data } = await tmdbClient.get<TmdbCredits>(
        `/movie/${movieId}/credits`
    );
    return data;
}

export async function getSimilarMovies(
    movieId: number,
    page: number = 1
): Promise<TmdbPaginatedResponse> {
    const { data } = await tmdbClient.get<TmdbPaginatedResponse>(
        `/movie/${movieId}/similar`,
        {
            params: { page },
        }
    );
    return data;
}