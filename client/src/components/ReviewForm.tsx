import { useState } from 'react'
import { useCreateReview } from '@/hooks/useReviews'

interface ReviewFormProps {
    movieId: number
}

export function ReviewForm({ movieId }: ReviewFormProps) {
    const { mutate: createReview, isPending, isError, error } = useCreateReview()

    const [rating, setRating] = useState<number>(5)
    const [content, setContent] = useState('')

    const contentLength = content.length
    const isContentValid = contentLength >= 10 && contentLength <= 500

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!isContentValid) return

        createReview(
            { movieId, rating, content },
            {
                onSuccess: () => {
                    setRating(5)
                    setContent('')
                },
            }
        )
    }

    const errorMessage =
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data
            ? String(error.response.data.message)
            : 'Error al publicar la review.'

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-800 rounded-xl p-4 flex flex-col gap-4"
        >
            <h3 className="text-white font-semibold">Escribe tu review</h3>

            <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">
                    Rating: <span className="text-yellow-400 font-bold">{rating}/10</span>
                </label>
                <input
                    type="range"
                    min={1}
                    max={10}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="accent-blue-500"
                />
                <div className="flex justify-between text-gray-500 text-xs">
                    <span>1</span>
                    <span>10</span>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">
                    Review
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe tu opinión sobre la película... (mínimo 10 caracteres)"
                    rows={4}
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className={`text-xs text-right ${
                    contentLength > 500
                        ? 'text-red-400'
                        : contentLength >= 10
                            ? 'text-green-400'
                            : 'text-gray-500'
                }`}>
                    {contentLength}/500
                </p>
            </div>

            {isError && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
            )}

            <button
                type="submit"
                disabled={isPending || !isContentValid}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors"
            >
                {isPending ? 'Publicando...' : 'Publicar review'}
            </button>
        </form>
    )
}