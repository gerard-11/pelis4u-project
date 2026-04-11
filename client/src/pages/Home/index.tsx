import {useGenres, useTrendingMovies} from '@/hooks/useMovies'
import { MovieCard } from '@/components/MovieCard'
import {GenreTag} from "@/components/GenreTag.tsx";

export default function Home() {

    const { data: movies, isLoading, isError } = useTrendingMovies()
    const {data:genres} = useGenres()
    console.log(genres)

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
        <main className="min-h-screen bg-gray-900 px-6 py-2">
            <div className="w-full px-3 text-center font-bold">
                <div className="mt-3 overflow-hidden">
                    <h2 className="section-title">
                        Generos
                    </h2>
                    <div className="flex gap-2 overflow-x-auto pb-3 pr-2 scroll-smooth">

                        {genres?.map((genre) => (
                            <GenreTag
                                key={genre.id}
                                genreId={genre.id}
                                name={genre.name}
                            />
                        ))}
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold my-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
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