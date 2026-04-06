import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useLogin, useRegister} from '@/hooks/useAuth'

export default function Register() {
    const navigate = useNavigate()
    const { mutate: register, isPending, isError, error } = useRegister()
    const { mutate: login, isPending: isLoginPending } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [username, setUsername] = useState('')

    const passwordMismatch = confirm.length > 0 && password !== confirm

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (passwordMismatch) return

        register(
            { email, password,username },
            {
                onSuccess: () => {
                    login(
                        {email,password},
                        {onSuccess:()=> navigate('/')}

                    )
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
            : 'Ocurrió un error. Intenta de nuevo.'

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl p-8">

                <h1 className="text-white text-2xl font-bold mb-6 text-center">
                    Crear cuenta
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-sm">Nombre de usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-sm">Confirmar contraseña</label>
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            className={`bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                                passwordMismatch
                                    ? 'focus:ring-red-500 ring-2 ring-red-500'
                                    : 'focus:ring-blue-500'
                            }`}
                        />
                        {passwordMismatch && (
                            <p className="text-red-400 text-xs mt-1">
                                Las contraseñas no coinciden
                            </p>
                        )}
                    </div>

                    {isError && (
                        <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending || isLoginPending || passwordMismatch}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors mt-2"
                    >
                        {isPending ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>

                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Inicia sesión
                    </Link>
                </p>

            </div>
        </div>
    )
}