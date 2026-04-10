import {useParams} from "react-router-dom";
import {useGenres, useMovieByGender} from "@/hooks/useMovies.ts";
import {useState} from "react";
import {MovieCard} from "@/components/MovieCard.tsx";


export function Genres (){
    const [page] = useState(1);
    const { genreId  } = useParams<{ genreId: string; page?: string }>()
    const id = Number(genreId);
    const { data: movie,isLoading,isError} = useMovieByGender(id,page)
    const {data: genre}=useGenres()
    const genreName=genre?.find(gen=> gen.id == id)

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
    return(
        <>
            <div>
                <h1 className="text-white text-2xl my-1 text-center font-bold md:text-5xl">Genero:</h1>
                <h2 className="text-blue-500 text-xl text-center font-bold md:text-3xl"> {genreName?.name}</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-6 py-6">
                {movie?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </>

    )
}