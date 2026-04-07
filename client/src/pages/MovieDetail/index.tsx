import { useParams } from 'react-router-dom'
import { useMovieDetail, useMovieCredits, useSimilarMovies } from '@/hooks/useMovies'
import { useMovieReviews } from '@/hooks/useReviews'
import { MovieCard } from '@/components/MovieCard'
import { getTmdbImage } from '@/lib/tmdb'
import {useAddToWatchlist, useRemoveFromWatchlist, useWatchlist} from "@/hooks/useWatchlist.ts";
import {useAuthStore} from "@/store/authStore.ts";
import {ReviewForm} from "@/components/ReviewForm.tsx";
import {ReviewItem} from "@/components/ReviewItem.tsx";

export default function MovieDetail() {
    const { id } = useParams<{ id: string }>()
    const movieId = Number(id)
    const { data: movie, isLoading, isError } = useMovieDetail(movieId)
    const { data: credits } = useMovieCredits(movieId)
    const { data: similar } = useSimilarMovies(movieId)
    const { data: reviews } = useMovieReviews(movieId)
    const { user } = useAuthStore()
    const { data: watchlist } = useWatchlist()
    const { mutate: addMovie, isPending: isAdding } = useAddToWatchlist()
    const { mutate: removeMovie, isPending: isRemoving } = useRemoveFromWatchlist()

    const currentReview= reviews?.some(r=> r.user.id === user?.id)
    const isInWatchlist = watchlist?.some((item) => item.movieId === movieId)

    function handleWatchlist() {
        if (isInWatchlist) {
            removeMovie(movieId)
        } else {
            addMovie(movieId)
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        )
    }

    if (isError || !movie) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-red-400">Error al cargar la película.</p>
            </div>
        )
    }


    const mainCast = credits?.cast.slice(0, 10) ?? []

    const director = credits?.crew.find((c) => c.job === 'Director')

    return (
        <div className="min-h-screen bg-gray-900">{/* Backdrop */}
            <div className="relative h-72 md:h-96 w-full">
                <img
                    src={getTmdbImage(movie.backdrop_path, 'original')}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-16">

                <div className="flex flex-col md:flex-row gap-8 -mt-24 relative z-10">
                    <img
                        src={getTmdbImage(movie.poster_path, 'w300')}
                        alt={movie.title}
                        className="w-40 md:w-56 rounded-xl shadow-2xl shrink-0 self-start"
                    />

                    <div className="flex flex-col gap-3 pt-4 md:pt-24">
                        <h1 className="text-white text-3xl font-bold">{movie.title}</h1>

                        {movie.tagline && (
                            <p className="text-gray-400 italic">"{movie.tagline}"</p>
                        )}

                        <div className="flex flex-wrap gap-3 text-sm">
              <span className="text-yellow-400 font-semibold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
                            {movie.runtime && (
                                <span className="text-gray-400">
                  🕐 {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
                            )}
                            <span className="text-gray-400">
                📅 {movie.release_date?.slice(0, 4)}
              </span>
                            {director && (
                                <span className="text-gray-400">
                  🎬 {director.name}
                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="bg-blue-600/30 text-blue-300 text-xs px-3 py-1 rounded-full"
                                >
                  {genre.name}
                </span>
                            ))}
                            {user && (
                                <button
                                    onClick={handleWatchlist}
                                    disabled={isAdding || isRemoving}
                                    className={`w-fit px-6 py-2 rounded-lg   cursor-pointer font-semibold text-sm transition-colors disabled:opacity-50 ${
                                        isInWatchlist
                                            ? 'bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white'
                                             : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                >
                                    {isAdding || isRemoving
                                        ? 'Cargando...'
                                        : isInWatchlist
                                            ? '❌ Quitar de Watchlist'
                                            : '+ Agregar a Watchlist'}
                                </button>
                            )}
                        </div>

                        <p className="text-gray-300 leading-relaxed max-w-2xl">
                            {movie.overview}
                        </p>
                    </div>
                </div>

                {mainCast.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-white text-xl font-bold mb-4">Reparto principal</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {mainCast.map((actor) => (
                                <div key={actor.id} className="shrink-0 w-24 text-center">
                                    <img
                                        src={getTmdbImage(actor.profile_path, 'w200')}
                                        alt={actor.name}
                                        className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                                    />
                                    <p className="text-white text-xs font-semibold truncate">
                                        {actor.name}
                                    </p>
                                    <p className="text-gray-400 text-xs truncate">
                                        {actor.character}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mt-12">
                    <h2 className="text-white text-xl font-bold mb-4">
                        Reviews {reviews && reviews.length > 0 && `(${reviews.length})`}
                    </h2>
                    {user && !currentReview &&(
                        <div className="mb-6">
                            <ReviewForm movieId={movieId} />
                        </div>
                    )}
                    {reviews?.length === 0 || !reviews ? (
                            <p className="text-gray-400">
                                No hay reviews todavía. ¡Sé el primero!
                            </p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {reviews.map((review) => (
                                <ReviewItem key={review.id} review={review} />
                            ))}
                        </div>
                    )}
                </section>

                {similar && similar.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-white text-xl font-bold mb-4">
                            Películas similares
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {similar.slice(0, 10).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    )
}