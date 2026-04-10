import { useTrendingMovies } from '@/hooks/useMovies'
import { MovieCard } from '@/components/MovieCard'

export default function Home() {

    const { data: movies, isLoading, isError } = useTrendingMovies()

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-red-400">Error al cargar las películas.</p>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-900 px-6 py-8">
            <div className="flex space-between">
                <h1 className="text-blue-500 text-xl font-bold mb-8 md:text-5xl">
                    🎬 Tendencias
                </h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </main>
    )
}