import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useLogout } from '@/hooks/useAuth'

export function Navbar() {
    const { user } = useAuthStore()
    const { mutate: logout, isPending } = useLogout()
    const navigate = useNavigate()

    const [query, setQuery] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
            setQuery('')
            setMenuOpen(false)
        }
    }

    function handleLogout() {
        logout(undefined, {
            onSuccess: () => navigate('/'),
        })
        setMenuOpen(false)
    }

    return (
        <nav className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-white font-bold text-lg shrink-0"
                    onClick={() => setMenuOpen(false)}
                >
                    🎬 Pelis4U
                </Link>

                {/* Buscador — oculto en móvil, visible en md+ */}
                <form
                    onSubmit={handleSearch}
                    className="hidden md:flex flex-1 items-center gap-2"
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
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors shrink-0"
                    >
                        Buscar
                    </button>
                </form>

                <div className="hidden md:flex items-center gap-3 shrink-0">
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
                                {user.username}
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

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden ml-auto text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    {menuOpen ? '✕' : '☰'}
                </button>

            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-gray-800 px-4 py-4 flex flex-col gap-4">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar películas..."
                            className="flex-1 bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors shrink-0"
                        >
                            Buscar
                        </button>
                    </form>


                    {user ? (
                        <>
                            <Link
                                to="/watchlist"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-300 hover:text-white text-sm transition-colors"
                            >
                                Mi Watchlist
                            </Link>
                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-300 hover:text-white text-sm transition-colors"
                            >
                                {user.username}
                            </Link>
                            <button
                                onClick={handleLogout}
                                disabled={isPending}
                                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm px-3 py-2 rounded-lg transition-colors text-center"
                            >
                                {isPending ? 'Saliendo...' : 'Salir'}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-300 hover:text-white text-sm transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg transition-colors text-center"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}