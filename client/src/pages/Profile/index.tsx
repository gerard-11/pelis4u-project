import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useLogout } from '@/hooks/useAuth'

export default function Profile() {
    const { user } = useAuthStore()
    const { mutate: logout, isPending } = useLogout()
    const navigate = useNavigate()

    function handleLogout() {
        logout(undefined, {
            onSuccess: () => navigate('/'),
        })
    }

    return (
        <main className="min-h-screen bg-gray-900 px-6 py-8">
            <div className="max-w-md mx-auto">

                <h1 className="text-white text-3xl font-bold mb-8">
                    Mi Perfil
                </h1>

                <div className="bg-gray-800 rounded-xl p-6 flex flex-col gap-6">

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                            {user?.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-white font-semibold text-lg">
                                {user?.username}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* Datos */}
                    <div className="flex flex-col gap-3 border-t border-gray-700 pt-4">
                        <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-xs uppercase tracking-wide">
                Usuario
              </span>
                            <span className="text-white">
                {user?.username}
              </span>
                        </div>
                        <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-xs uppercase tracking-wide">
                Email
              </span>
                            <span className="text-white">
                {user?.email}
              </span>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        disabled={isPending}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors mt-2"
                    >
                        {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
                    </button>

                </div>
            </div>
        </main>
    )
}