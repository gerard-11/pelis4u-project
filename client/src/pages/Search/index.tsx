import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchMovies } from '@/hooks/useMovies'
import { MovieCard } from '@/components/MovieCard'

export default function Search() {
    const [searchParams] = useSearchParams()
    const queryFromUrl = searchParams.get('q') ?? ''
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [queryFromUrl])

    const { data, isLoading, isError } = useSearchMovies(queryFromUrl, page)

    function handlePageChange(newPage: number) {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!queryFromUrl) {
        return (
            <main className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-gray-400 text-lg">
                    Escribe algo en el buscador para comenzar
                </p>
            </main>
        )
    }

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
                <p className="text-red-400">Error al buscar películas.</p>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-900 px-6 py-8">

            <h1 className="text-white text-2xl font-bold mb-2">
                Resultados para: <span className="text-blue-400">"{queryFromUrl}"</span>
            </h1>
            <p className="text-gray-400 text-sm mb-8">
                {data?.total_results ?? 0} resultados encontrados
            </p>

            {data?.results.length === 0 ? (
                <p className="text-gray-400 text-center mt-20">
                    No se encontraron películas para "{queryFromUrl}"
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {data?.results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    {data && data.total_pages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className="bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                ← Anterior
                            </button>

                            <span className="text-gray-400 text-sm">
                Página {page} de {data.total_pages}
              </span>

                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === data.total_pages}
                                className="bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </>
            )}

        </main>
    )
}