import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useUpdateReview, useDeleteReview } from '@/hooks/useReviews'
import type { Review } from '@/types'
import {ConfirmModal} from "@/components/ComfirmModal.tsx";

interface ReviewItemProps {
    review: Review
}

export function ReviewItem({ review }: ReviewItemProps) {
    const { user } = useAuthStore()
    const { mutate: updateReview, isPending: isUpdating } = useUpdateReview()
    const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview()

    const [isEditing, setIsEditing] = useState(false)
    const [rating, setRating] = useState(review.rating)
    const [content, setContent] = useState(review.content)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const isOwner = user?.id === review.userId

    function handleUpdate(e: React.FormEvent) {
        e.preventDefault()
        updateReview(
            { reviewId: review.id, body: { rating, content } },
            { onSuccess: () => setIsEditing(false) }
        )
    }

    function handleDelete() {
        deleteReview(
            { reviewId: review.id, movieId: review.movieId },
            { onSuccess: () => setShowDeleteModal(false) }
        )
    }

    if (isEditing) {
        return (
            <form
                onSubmit={handleUpdate}
                className="bg-gray-800 rounded-xl p-4 flex flex-col gap-4"
            >
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
                </div>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                        {isUpdating ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false)
                            setRating(review.rating)
                            setContent(review.content)
                        }}
                        className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className="bg-gray-800 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
        <span className="text-white font-semibold text-sm">
          {review.user.email.split('@')[0]}
        </span>
                <div className="flex items-center gap-3">
          <span className="text-yellow-400 text-sm font-bold">
            ⭐ {review.rating}/10
          </span>

                    {isOwner && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="text-red-400 hover:text-red-300 text-xs transition-colors"
                            >
                                Eliminar
                            </button>
                            {showDeleteModal && (
                                <ConfirmModal
                                    title="Eliminar review"
                                    message="¿Estás seguro de que quieres eliminar tu review? Esta acción no se puede deshacer."
                                    confirmLabel="Eliminar"
                                    cancelLabel="Cancelar"
                                    isLoading={isDeleting}
                                    onConfirm={handleDelete}
                                    onCancel={() => setShowDeleteModal(false)}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
                {review.content}
            </p>
            <p className="text-gray-500 text-xs">
                {new Date(review.createdAt).toLocaleDateString('es-MX')}
                {review.updatedAt !== review.createdAt && ' (editada)'}
            </p>
        </div>
    )
}