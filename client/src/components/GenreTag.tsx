import {Link} from "react-router-dom";

export interface genreId {
    genreId: number
    name?: string
}

export function GenreTag ({ genreId , name}: genreId) {

        return (
            <Link
                to={`/genres/${genreId}`}
                className="tag"
            >
                <span>{name}</span>
            </Link>
        )

}