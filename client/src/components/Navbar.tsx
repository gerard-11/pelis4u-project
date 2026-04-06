import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useLogout } from '@/hooks/useAuth'

export function Navbar() {
    const { user } = useAuthStore()
    const { mutate: logout, isPending } = useLogout()
    const navigate = useNavigate()
    const [query, setQuery] = useState('')

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
            setQuery('')
        }
    }

    function handleLogout() {
        logout(undefined, {
            onSuccess: () => navigate('/'),
        })
    }

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
                <Link
                    to="/"
                    className="text-white font-bold text-xl shrink-0"
                >
                    🎬 Pelis4U
                </Link>

                <form
                    onSubmit={handleSearch}
                    className="flex flex-1 items-center gap-2"
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar películas..."
                        className="flex-1 bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                        Buscar
                    </button>
                </form>

                <div className="flex items-center gap-3 shrink-0">
                    {user ? (
                        <>
                            <Link
                                to="/watchlist"
                                className="text-gray-300 hover:text-white text-sm transition-colors"
                            >
                                Mi Watchlist
                            </Link>
                            <Link
                                to="/profile"
                                className="text-gray-300 hover:text-white text-sm transition-colors"
                            >
                                {user.email.split('@')[0]}
                            </Link>
                            <button
                                onClick={handleLogout}
                                disabled={isPending}
                                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm px-3 py-2 rounded-lg transition-colors"
                            >
                                {isPending ? 'Saliendo...' : 'Salir'}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-300 hover:text-white text-sm transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg transition-colors"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    )
}