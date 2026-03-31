// Auth

export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterCredentials {
    email: string
    password: string
}

export interface AuthResponse {
    accessToken: string
    user: {
        id: number
        email: string
    }
}

export interface AuthUser {
    id: number
    email: string
}

// Movies

export interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
    runtime: number | null
    status: string
    tagline: string
    budget: number
    revenue: number
    genres: Genre[]
    production_companies: ProductionCompany[]
}

export interface Genre {
    id: number
    name: string
}

export interface ProductionCompany {
    id: number
    name: string
    logo_path: string | null
}

//credits
export interface Cast {
    id: number
    name: string
    character: string
    profile_path: string | null
    order: number
}

export interface Crew {
    id: number
    name: string
    job: string
    department: string
    profile_path: string | null
}

export interface Credits {
    cast: Cast[]
    crew: Crew[]
}

// Paginación
export interface PaginatedResponse<T> {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}

// Watchlist
export interface WatchlistItem {
    id: number
    movieId: number
    userId: number
    createdAt: string
    movie: Movie
}
//reviews
export interface Review {
    id: number
    movieId: number
    userId: number
    rating: number              // 1 a 10
    content: string
    createdAt: string
    updatedAt: string
    user: {
        id: number
        email: string
    }
}

export interface CreateReviewBody {
    movieId: number
    rating: number              // 1-10
    content: string             // 10-500 caracteres
}

export interface UpdateReviewBody {
    rating?: number
    content?: string
}

// Errores del API

export interface ApiError {
    message: string
    statusCode: number
}