interface ConfirmModalProps {
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    isLoading?: boolean
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmModal({
                                 title,
                                 message,
                                 confirmLabel = 'Confirmar',
                                 cancelLabel = 'Cancelar',
                                 isLoading = false,
                                 onConfirm,
                                 onCancel,
                             }: ConfirmModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
        >
            <div
                className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-white font-bold text-lg">{title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{message}</p>

                <div className="flex gap-3 mt-2">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white text-sm py-2 rounded-lg transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm py-2 rounded-lg font-semibold transition-colors"
                    >
                        {isLoading ? 'Eliminando...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}