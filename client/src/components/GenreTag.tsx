import {Link} from "react-router-dom";

export interface genreId {
    genreId: number
    name?: string
}

export function GenreTag ({ genreId , name}: genreId) {

        return (
            <Link
                to={`/genres/${genreId}`}
                className="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-blue-50 text-xs font-bold uppercase tracking-tight rounded-md shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
                <span>{name}</span>
            </Link>
        )

}