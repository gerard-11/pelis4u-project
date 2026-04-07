import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/hooks/useAuth'

export default function Login() {
    const navigate = useNavigate()
    const { mutate: login, isPending, isError, error } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        login(
            { email, password },
            {
                onSuccess: () => navigate('/'),
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
            : 'Ocurrió un error. Intenta de nuevo.'

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl p-8">

                <h1 className="text-white text-2xl font-bold mb-6 text-center">
                    Iniciar sesión
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-sm">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {isError && (
                        <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors mt-2"
                    >
                        {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Regístrate
                    </Link>
                </p>

            </div>
        </div>
    )
}