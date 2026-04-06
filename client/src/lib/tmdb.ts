const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

type ImageSize = 'w200' | 'w300' | 'w500' | 'w780' | 'original'

export function getTmdbImage(
    path: string | null,
    size: ImageSize = 'w500'
): string {
    if (!path) {
        return 'https://placehold.co/500x750?text=No+Image'
    }
    return `${TMDB_IMAGE_BASE}/${size}${path}`
}